package com.tramex.sisoprega.proxy.bean;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.security.RolesAllowed;
import javax.ejb.Stateless;

import com.tramex.sisoprega.datamodel.DataModelException;
import com.tramex.sisoprega.dto.Inventory;
import com.tramex.sisoprega.dto.Purchase;
import com.tramex.sisoprega.dto.PurchaseDetail;
import com.tramex.sisoprega.gateway.GatewayError;
import com.tramex.sisoprega.gateway.GatewayRecord;
import com.tramex.sisoprega.gateway.request.CreateRequest;
import com.tramex.sisoprega.gateway.response.ReadResponse;
import com.tramex.sisoprega.proxy.Cruddable;
import com.tramex.sisoprega.proxy.common.BaseInventory;

/**
 * Session Bean implementation class PurchaseBean
 */
@Stateless
@RolesAllowed({ "sisoprega_admin", "mx_usr", "us_usr", "rancher", "agency" })
public class PurchaseBean extends BaseInventory implements Cruddable {
  
  @Override
  public ReadResponse Create(CreateRequest request) {
    ReadResponse response = new ReadResponse();
    
    // Use purchase to create inventory
    try {
      GatewayRecord record = request.getParentRecord();
      Class<?> type = Class.forName(DTO_PACKAGE + record.getEntity());
      Purchase entity = (Purchase) getEntityFromRecord(record, type);
      this.log.fine("Found entity from Record [" + entity + "]");

      // Add purchase to inventory
      for (PurchaseDetail detail : entity.getPurchaseDetail()) {
        Inventory inventory = getInventoryRecord(detail.getPenId());

        addToInventory(inventory, detail.getHeads(), detail.getWeight(), detail.getQualityId(), detail.getPenId(), entity.getCattleTypeId());
      }
      // Create purchase
      response = super.Create(request);
    } catch (Exception e) {
      this.log.severe("Exception found while creating inventory record: " + e.getMessage());
      this.log.throwing(this.getClass().getName(), "Create", e);

      response
          .setError(new GatewayError("DB01", "Fue imposible actualizar el inventario con los datos proporcionados.", "Create"));
    }

    return response;
  }
  
  public ReadResponse Update(CreateRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "ReadResponse Create(CreateRequest)");

    ReadResponse response = new ReadResponse();
    try {
      GatewayRecord record = request.getParentRecord();
      Class<?> type = Class.forName(DTO_PACKAGE + record.getEntity());
      Purchase entity = (Purchase) getEntityFromRecord(record, type);
      this.log.fine("Found entity from Record [" + entity + "]");

      
      long cattleType = entity.getCattleTypeId();

      if (this.validateEntity(entity)) {
        this.log.fine("Valid entity found");

        Class<?>[] params = null;
        Object[] invokeParams = null;
        String entityCamelCaseName = "get" + record.getEntity() + "Id";

        log.fine("Executing method [" + entityCamelCaseName + "]");

        long idToUpdate = (Long) type.getMethod(entityCamelCaseName, params).invoke(entity, invokeParams);

        if (idToUpdate == 0) {
          this.log.warning("VAL04 - Entity ID Omission.");
          response.setError(new GatewayError("VAL04", "Se ha omitido el id en la entidad [" + record.getEntity()
              + "] al intentar actualizar sus datos.", "Update"));
        } else {
          updateInventory(entity, cattleType);
          dataModel.updateDataModel(entity);

          String queryName = record.getEntity().toUpperCase() + "_BY_ID";
          log.fine("Retrieving updated object with Query: " + queryName);

          entity = (Purchase) dataModel.readSingleDataModel(queryName, "Id", idToUpdate, type);
          log.fine("got updated record: [" + entity + "]");

          List<Object> updatedRecordList = new ArrayList<Object>();
          updatedRecordList.add(entity);

          response.setParentRecord(getRecordsFromList(updatedRecordList, type));
          response.setError(new GatewayError("0", "SUCCESS", "Update"));
        }
      } else {
        this.log.warning("Error de validación: " + error_description);
        response.setError(new GatewayError("VAL01", "Error de validación: " + error_description, "Update"));
        return response;
      }

    } catch (Exception e) {
      this.log.severe("Exception found while updating entity: " + e.getMessage());
      this.log.throwing(this.getClass().getName(), "Update", e);

      response.setError(new GatewayError("DB01",
          "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, "
              + "muy probablemente el registro que usted quiere agregar ya existe en la base de datos." + e.getMessage(),
          "Update"));
    }

    this.log.exiting(this.getClass().getCanonicalName(), "ReadResponse Update(CreateRequest)");
    return response;
  }
  
  /**
   * @param entity
   * @param cattleType
   * @throws DataModelException
   */
  private void updateInventory(Purchase entity, long cattleType) throws DataModelException {
    Purchase previousRecord = dataModel.readSingleDataModel("PURCHASE_BY_ID", "Id", entity.getPurchaseId(), Purchase.class);

    // Evaluate each record from previous Purchase against new updated
    // Purchase
    for (PurchaseDetail detail : previousRecord.getPurchaseDetail()) {
      updateExistingDetail(entity, cattleType, detail);
      removeUnincluded(entity, cattleType, detail);
    }

    // Add non existent new records to inventory
    for (PurchaseDetail updated : entity.getPurchaseDetail()) {
      addNonExistent(updated, cattleType, previousRecord);
    }

  }
  
  /**
   * @param entity
   * @param cattleType
   * @param detail
   * @throws DataModelException
   */
  private void updateExistingDetail(Purchase entity, long cattleType, PurchaseDetail detail) throws DataModelException {
    for (PurchaseDetail updated : entity.getPurchaseDetail()) {
      if (detail.getQualityId() == updated.getQualityId() && detail.getPenId() == updated.getPenId()) {
        long delta = updated.getHeads() - detail.getHeads();
        double deltaWeight = updated.getWeight() - detail.getWeight();
        Inventory inventory = getInventoryRecord(detail.getPenId());
        if (inventory != null) {
          if (inventory.getAvailableToSell() + delta < 0) {
            log.warning("Tryal for removing more heads than available.");
            throw new DataModelException("No hay suficientes cabezas en el registro de inventario para completar esta operación");
          } else {
            inventory.setHeads(inventory.getHeads() + delta);
            inventory.setAvailableToSell(inventory.getAvailableToSell() + delta);
            inventory.setWeight(inventory.getWeight() + deltaWeight);

            dataModel.updateDataModel(inventory);
          }
        } else {
          if (delta > 0) {
            // Create inventory Record with difference
            inventory = new Inventory();
            inventory.setCattypeId(cattleType);
            inventory.setHeads(delta);
            inventory.setQualityId(detail.getQualityId());
            inventory.setPenId(detail.getPenId());
            inventory.setWeight(deltaWeight);
            inventory.setAvailableToSell(delta);

            dataModel.createDataModel(inventory);
          }
        }
      }
    }
  }

  private void removeUnincluded(Purchase entity, long cattleType, PurchaseDetail detail) throws DataModelException {
    for (PurchaseDetail updated : entity.getPurchaseDetail()) {
      if (detail.getQualityId() == updated.getQualityId() && detail.getPenId() == updated.getPenId()) {
        return;
      }
    }

    // Remove previous record heads from inventory
    long delta = detail.getHeads();
    double deltaWeight = detail.getWeight();
    Inventory inventory = getInventoryRecord(detail.getPenId());
    if (inventory != null) {
      if (inventory.getAvailableToSell() - delta < 0) {
        log.warning("Attempt for removing more heads than available.");
        throw new DataModelException("No hay suficientes cabezas en el registro de inventario para completar esta operación");
      } else {
        inventory.setWeight(inventory.getWeight() - deltaWeight);
        inventory.setHeads(inventory.getHeads() - delta);
        inventory.setAvailableToSell(inventory.getAvailableToSell() - delta);

        dataModel.updateDataModel(inventory);
      }
    } else {
      log.warning("Tryal for removing more heads than available.");
      throw new DataModelException("No hay suficientes cabezas en el registro de inventario para completar esta operación");
    }

  }
  private void addNonExistent(PurchaseDetail updated, long cattleType, Purchase previousRecord) throws DataModelException {
    for (PurchaseDetail previous : previousRecord.getPurchaseDetail()) {
      if (updated.getQualityId() == previous.getQualityId() && updated.getPenId() == previous.getPenId()) {
        return;
      }
    }

    // Add inventory Record with new detail
    Inventory inventory = getInventoryRecord(updated.getPenId());
    if (inventory != null) {
      long updatedHeads = inventory.getHeads() + updated.getHeads();
      double updatedWeight = inventory.getWeight() + updated.getWeight();
      log.info("Updating existing inventory to [" + updatedHeads + "] heads and [" + updatedWeight + "] weight");
      inventory.setWeight(inventory.getWeight() + updated.getWeight());
      inventory.setHeads(updatedHeads);
      inventory.setAvailableToSell(inventory.getAvailableToSell() + updated.getHeads());

      dataModel.updateDataModel(inventory);
    } else {
      // Create inventory Record with difference
      log.info("Creating new inventory with [" + updated.getHeads() + "] heads and [" + updated.getWeight() + "] weight");
      inventory = new Inventory();
      inventory.setCattypeId(cattleType);
      inventory.setHeads(updated.getHeads());
      inventory.setQualityId(updated.getQualityId());
      inventory.setPenId(updated.getPenId());
      inventory.setWeight(updated.getWeight());
      inventory.setAvailableToSell(updated.getHeads());

      dataModel.createDataModel(inventory);
    }

  }
  
}
