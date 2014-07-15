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

      // Create purchase
      response = super.Create(request);

      GatewayRecord recordPersisted = response.getParentRecord().get(0);
      Class<?> typePersisted = Class.forName(DTO_PACKAGE + recordPersisted.getEntity());
      Purchase entityPersisted = (Purchase) getEntityFromRecord(recordPersisted, typePersisted);
      // Add purchase to inventory
      for (PurchaseDetail detail : entityPersisted.getPurchaseDetail()) {
        addToInventory(entityPersisted.getSellerId(), detail.getPenId(), entityPersisted.getPurchaseId(), Inventory.SOURCE_TYPE.PURCHASE, detail.getPurchaseDetailId(),
            detail.getCattleTypeId(), detail.getQualityId(), detail.getHeads(), detail.getWeight());
      }

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
          // Updating inventory previous records:
          

          log.severe("running updatePreviousInventory");
          updatePreviousRecord(entity);

          // Updating Purchase entity:
          dataModel.updateDataModel(entity);

          String queryName = record.getEntity().toUpperCase() + "_BY_ID";
          log.severe("Retrieving updated object with Query: " + queryName);

          entity = (Purchase) dataModel.readSingleDataModel(queryName, "Id", idToUpdate, type);
          log.severe("got updated record: [" + entity + "]");
          log.severe("purchase detail updated: [" + entity.getPurchaseDetail() + "]");

          addNonExistingInventory(entity);

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

  /*
   * NEW*********************************************************************
   * STRUCTURE***************************************************************
   */
  /**
   * @param entity
   * @throws DataModelException
   * @throws ClassNotFoundException
   */
  private void updatePreviousRecord(Purchase newEntity) throws DataModelException,
      ClassNotFoundException {

    Purchase previousRecord = dataModel.readSingleDataModel("PURCHASE_BY_ID", "Id", newEntity.getPurchaseId(), Purchase.class);
    // Evaluate each record from previous Purchase against new updated
    // Purchase
    for (PurchaseDetail previuosDetail : previousRecord.getPurchaseDetail()) {
      updateExistingDetail(newEntity, previuosDetail);
      removeUnincluded(newEntity, previuosDetail);
    }

  }

  /**
   * @param entity
   * @param detail
   * @throws DataModelException
   */
  private void updateExistingDetail(Purchase newEntity, PurchaseDetail previousDetail) throws DataModelException {
    for (PurchaseDetail newDetail : newEntity.getPurchaseDetail()) {
      if (previousDetail.getPurchaseDetailId() == newDetail.getPurchaseDetailId()) {
        long delta = newDetail.getHeads() - previousDetail.getHeads();
        double deltaWeight = newDetail.getWeight() - previousDetail.getWeight();
        if (delta != 0) {
          Inventory inventory = getInventoryRecord(newEntity.getPurchaseId(), 2, previousDetail.getPurchaseDetailId());
          if (inventory != null) {
            if (inventory.getAvailableToSell() + delta < 0) {
              log.warning("Tryal for removing more heads than available.");
              throw new DataModelException(
                  "No hay suficientes cabezas en el registro de inventario para completar esta operación");
            } else {
              inventory.setHeads(inventory.getHeads() + delta);
              inventory.setAvailableToSell(inventory.getAvailableToSell() + delta);
              inventory.setWeight(inventory.getWeight() + deltaWeight);

              dataModel.updateDataModel(inventory);
            }
          } else {
            // Create inventory Record with difference
            addToInventory(newEntity.getSellerId(), newDetail.getPenId(), newEntity.getPurchaseId(), Inventory.SOURCE_TYPE.PURCHASE, newDetail.getPurchaseDetailId(),
                newDetail.getCattleTypeId(), newDetail.getQualityId(), newDetail.getHeads(), newDetail.getWeight());
          }
        }
        return;
      }
    }
  }

  private void removeUnincluded(Purchase newEntity, PurchaseDetail previousDetail) throws DataModelException,
      ClassNotFoundException {
    for (PurchaseDetail updated : newEntity.getPurchaseDetail()) {
      if (previousDetail.getPurchaseDetailId() == updated.getPurchaseDetailId()) {
        return;
      }
    }

    // Remove previous record heads from inventory
    long delta = previousDetail.getHeads();
    Inventory inventory = getInventoryRecord(newEntity.getPurchaseId(), 2, previousDetail.getPurchaseDetailId());
    if (inventory != null) {
      if (inventory.getAvailableToSell() - delta < 0) {
        log.warning("Attempt for removing more heads than available.");
        throw new DataModelException("No hay suficientes cabezas en el registro de inventario para completar esta operación");
      } else {
        // Remove record from database
        Class<?> type = Class.forName(DTO_PACKAGE + "Inventory");
        dataModel.deleteDataModel(dataModel.readSingleDataModel("INVENTORY_BY_ID", "Id", inventory.getInventoryId(), type),
            getLoggedUser());
      }
    } else {
      log.warning("Tryal for removing more heads than available.");
      throw new DataModelException("No hay suficientes cabezas en el registro de inventario para completar esta operación");
    }

  }

  private void addNonExistingInventory(Purchase newEntity) throws DataModelException {
    for (PurchaseDetail detail : newEntity.getPurchaseDetail()) {
      Inventory inventory = getInventoryRecord(newEntity.getPurchaseId(), 2, detail.getPurchaseDetailId());
      if (inventory == null) {
        addToInventory(newEntity.getSellerId(), detail.getPenId(), newEntity.getPurchaseId(), Inventory.SOURCE_TYPE.PURCHASE, detail.getPurchaseDetailId(),
            detail.getCattleTypeId(), detail.getQualityId(), detail.getHeads(), detail.getWeight());
      }
    }
  }

}
