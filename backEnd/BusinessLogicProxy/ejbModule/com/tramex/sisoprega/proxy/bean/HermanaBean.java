package com.tramex.sisoprega.proxy.bean;

import java.util.ArrayList;
import java.util.HashMap;
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

      // Create purchase
      response = super.Create(request);
      
      GatewayRecord recordPersisted = response.getParentRecord().get(0);
      Class<?> typePersisted = Class.forName(DTO_PACKAGE + recordPersisted.getEntity());
      Hermana entityPersisted = (Hermana) getEntityFromRecord(recordPersisted, typePersisted);
      // Add corte to inventory
      for (HermanaCorte detail : entityPersisted.getHermanaCorte()) {
        addToInventory(detail.getBarnyardId(), entityPersisted.getHermanaId(), 2, detail.getHermanaCorteId(),
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
          log.severe("running updatePreviousInventory");
          updatePreviousRecord(entity);

          // Updating Hermana entity:
          dataModel.updateDataModel(entity);

          String queryName = record.getEntity().toUpperCase() + "_BY_ID";
          log.severe("Retrieving updated object with Query: " + queryName);

          entity = (Hermana) dataModel.readSingleDataModel(queryName, "Id", idToUpdate, type);
          log.severe("got updated record: [" + entity + "]");
          log.severe("hermana corte updated: [" + entity.getHermanaCorte() + "]");

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
  private void updatePreviousRecord(Hermana newEntity) throws DataModelException,
      ClassNotFoundException {

    Hermana previousRecord = dataModel.readSingleDataModel("HERMANA_BY_ID", "Id", newEntity.getHermanaId(), Hermana.class);
    // Evaluate each record from previous Hermana against new updated
    // Hermana
    for (HermanaCorte previuosDetail : previousRecord.getHermanaCorte()) {
      updateExistingDetail(newEntity, previuosDetail);
      removeUnincluded(newEntity, previuosDetail);
    }
  }

  /**
   * @param entity
   * @param detail
   * @throws DataModelException
   */
  private void updateExistingDetail(Hermana newEntity, HermanaCorte previousDetail) throws DataModelException {
    for (HermanaCorte newDetail : newEntity.getHermanaCorte()) {
      if (previousDetail.getHermanaCorteId() == newDetail.getHermanaCorteId()) {
        long delta = newDetail.getHeads() - previousDetail.getHeads();
        double deltaWeight = newDetail.getWeight() - previousDetail.getWeight();
        if (delta != 0) {
          Inventory inventory = getInventoryRecord(newEntity.getHermanaId(), 2, previousDetail.getHermanaCorteId());
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
            addToInventory(newDetail.getBarnyardId(), newEntity.getHermanaId(), 2, newDetail.getHermanaCorteId(),
                newDetail.getCattleTypeId(), newDetail.getQualityId(), newDetail.getHeads(), newDetail.getWeight());
          }
        }
        return;
      }
    }
  }

  private void removeUnincluded(Hermana newEntity, HermanaCorte previousDetail) throws DataModelException,
      ClassNotFoundException {
    for (HermanaCorte updated : newEntity.getHermanaCorte()) {
      if (previousDetail.getHermanaCorteId() == updated.getHermanaCorteId()) {
        return;
      }
    }

    // Remove previous record heads from inventory
    long delta = previousDetail.getHeads();
    Inventory inventory = getInventoryRecord(newEntity.getHermanaId(), 2, previousDetail.getHermanaCorteId());
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

  private void addNonExistingInventory(Hermana newEntity) throws DataModelException {
    for (HermanaCorte detail : newEntity.getHermanaCorte()) {
      Inventory inventory = getInventoryRecord(newEntity.getHermanaId(), 2, detail.getHermanaCorteId());
      if (inventory == null) {
        addToInventory(detail.getBarnyardId(), newEntity.getHermanaId(), 2, detail.getHermanaCorteId(),
            detail.getCattleTypeId(), detail.getQualityId(), detail.getHeads(), detail.getWeight());
      }
    }
  }

}
