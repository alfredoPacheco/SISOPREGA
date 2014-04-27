package com.tramex.sisoprega.proxy.bean;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.security.RolesAllowed;
import javax.ejb.Stateless;

import com.tramex.sisoprega.datamodel.DataModelException;
import com.tramex.sisoprega.dto.Hermana;
import com.tramex.sisoprega.dto.HermanaCorte;
import com.tramex.sisoprega.dto.Inventory;
import com.tramex.sisoprega.dto.Reception;
import com.tramex.sisoprega.gateway.GatewayError;
import com.tramex.sisoprega.gateway.GatewayRecord;
import com.tramex.sisoprega.gateway.request.CreateRequest;
import com.tramex.sisoprega.gateway.request.ReadRequest;
import com.tramex.sisoprega.gateway.response.ReadResponse;
import com.tramex.sisoprega.proxy.Cruddable;
import com.tramex.sisoprega.proxy.common.BaseInventory;

/**
 * Session Bean implementation class HermanaBean
 */
@Stateless
@RolesAllowed({ "sisoprega_admin", "mx_usr", "us_usr", "rancher", "agency" })
public class HermanaBean extends BaseInventory implements Cruddable {

  @Override
  public ReadResponse Create(CreateRequest request) {
    ReadResponse response = new ReadResponse();

    // Use purchase to create inventory
    try {
      GatewayRecord record = request.getParentRecord();
      Class<?> type = Class.forName(DTO_PACKAGE + record.getEntity());
      Hermana entity = (Hermana) getEntityFromRecord(record, type);
      this.log.fine("Found entity from Record [" + entity + "]");

      long cattleType = this.getHermanaCattleType(entity.getReception());

      // Add purchase to inventory
      for (HermanaCorte detail : entity.getHermanaCorte()) {
        Inventory inventory = getInventoryRecord(detail.getBarnyardId());

        addToInventory(inventory, detail.getHeads(), detail.getWeight(), detail.getQualityId(), detail.getBarnyardId(), cattleType);
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

  @Override
  public ReadResponse Read(ReadRequest request) {
    log.entering(this.getClass().getCanonicalName(), "ReadResponse Read(ReadRequest)");

    ReadResponse response = new ReadResponse();
    try {
      String sEntryNo = request.getFilter().getFieldValue("entryNo");
      String queryName = "";
      Map<String, Object> parameters = new HashMap<String, Object>();

      if (sEntryNo != null) {
        if (sEntryNo.equals("*")) {
          queryName = "ACTIVE_HERMANAS";
        } else {
          return super.Read(request);
        }
      } else {
        return super.Read(request);
      }

      log.info("Executing query [" + queryName + "]");

      List<Hermana> results = dataModel.readDataModelList(queryName, parameters, Hermana.class);
      if (results.isEmpty()) {
        log.info("Query resulted in empty list [" + queryName + "] by []");
        response.setError(new GatewayError("VAL02", "No se encontraron datos para el filtro seleccionado", "entity: ["
            + request.getFilter().getEntity() + "]"));
      } else {
        // Include receptions in the response.
        for(Hermana hermana : results){
          Set<Reception> receptions = hermana.getReception();
          log.fine("Got [" + receptions.size() + "] receptions");
          for(Reception reception : receptions){
            int inspections = reception.getInspection().size();
            int headcounts = reception.getReceptionHeadcount().size(); 
            log.fine(inspections + " inspections.");
            log.fine( headcounts + " headcounts.");
          }
        }
        response.setParentRecord(getRecordsFromList(results,Hermana.class));
        response.setError(new GatewayError("0", "SUCCESS", "Read"));
      }
    } catch (Exception e) {
      this.log.severe("Exception found while reading [" + request + "]");
      this.log.throwing(this.getClass().getCanonicalName(), "ReadResponse Read(ReadRequest)", e);

      response.setError(new GatewayError("DB02", "Read exception: " + e.getMessage(), "entity: ["
          + request.getFilter().getEntity() + "]"));
    }

    log.exiting(this.getClass().getCanonicalName(), "ReadResponse Read(ReadRequest)");
    return response;
  }

  public ReadResponse Update(CreateRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "ReadResponse Create(CreateRequest)");

    ReadResponse response = new ReadResponse();
    try {
      GatewayRecord record = request.getParentRecord();
      Class<?> type = Class.forName(DTO_PACKAGE + record.getEntity());
      Hermana entity = (Hermana) getEntityFromRecord(record, type);
      this.log.fine("Found entity from Record [" + entity + "]");

      long cattleType = this.getHermanaCattleType(entity.getReception());

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

          entity = (Hermana) dataModel.readSingleDataModel(queryName, "Id", idToUpdate, type);
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
  private void updateInventory(Hermana entity, long cattleType) throws DataModelException {
    Hermana previousRecord = dataModel.readSingleDataModel("HERMANA_BY_ID", "Id", entity.getHermanaId(), Hermana.class);

    // Evaluate each record from previous hermana against new updated
    // hermana
    for (HermanaCorte detail : previousRecord.getHermanaCorte()) {
      updateExistingDetail(entity, cattleType, detail);
      removeUnincluded(entity, cattleType, detail);
    }

    // Add non existent new records to inventory
    for (HermanaCorte updated : entity.getHermanaCorte()) {
      addNonExistent(updated, cattleType, previousRecord, entity.getDeWhen());
    }

  }

  private void addNonExistent(HermanaCorte updated, long cattleType, Hermana previousRecord, Date deWhen) throws DataModelException {
    for (HermanaCorte previous : previousRecord.getHermanaCorte()) {
      if (updated.getQualityId() == previous.getQualityId() && updated.getBarnyardId() == previous.getBarnyardId()) {
        return;
      }
    }

    // Add inventory Record with new detail
    Inventory inventory = getInventoryRecord(updated.getBarnyardId());
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
      inventory.setPenId(updated.getBarnyardId());
      inventory.setWeight(updated.getWeight());
      inventory.setAvailableToSell(updated.getHeads());

      dataModel.createDataModel(inventory);
    }

  }

  private void removeUnincluded(Hermana entity, long cattleType, HermanaCorte detail) throws DataModelException {
    for (HermanaCorte updated : entity.getHermanaCorte()) {
      if (detail.getQualityId() == updated.getQualityId() && detail.getBarnyardId() == updated.getBarnyardId()) {
        return;
      }
    }

    // Remove previous record heads from inventory
    long delta = detail.getHeads();
    double deltaWeight = detail.getWeight();
    Inventory inventory = getInventoryRecord(detail.getBarnyardId());
    if (inventory != null) {
      if (inventory.getAvailableToSell() - delta < 0 && inventory.getWeight() - deltaWeight < 0) {
        log.warning("Tryal for removing more heads than available.");
        throw new DataModelException("No hay suficientes cabezas en el registro de inventario para completar esta operación");
      } else {
        
        inventory.setWeight(inventory.getWeight() - deltaWeight);
        inventory.setHeads(inventory.getHeads() - delta);
        inventory.setAvailableToSell(inventory.getAvailableToSell() - delta);
        if(inventory.getHeads() > 0){
          dataModel.updateDataModel(inventory);
        }
        else{
          dataModel.deleteDataModel(inventory, getLoggedUser());
        }
      }
    } else {
      log.warning("Tryal for removing more heads than available.");
      throw new DataModelException("No hay suficientes cabezas en el registro de inventario para completar esta operación");
    }

  }

  /**
   * @param entity
   * @param cattleType
   * @param detail
   * @throws DataModelException
   */
  private void updateExistingDetail(Hermana entity, long cattleType, HermanaCorte detail) throws DataModelException {
    for (HermanaCorte updated : entity.getHermanaCorte()) {
      if (detail.getQualityId() == updated.getQualityId() && detail.getBarnyardId() == updated.getBarnyardId()) {
        long delta = updated.getHeads() - detail.getHeads();
        double deltaWeight = updated.getWeight() - detail.getWeight();
        Inventory inventory = getInventoryRecord(detail.getBarnyardId());
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
            inventory.setPenId(detail.getBarnyardId());
            inventory.setWeight(deltaWeight);
            inventory.setAvailableToSell(delta);

            dataModel.createDataModel(inventory);
          }
        }
      }
    }
  }

  private long getHermanaCattleType(Set<Reception> receptions) {
    Iterator<Reception> iterator = receptions.iterator();
    if (iterator.hasNext()) {
      Reception reception = iterator.next();
      return reception.getCattleType();
    }

    return 0;
  }

}
