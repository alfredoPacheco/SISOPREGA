package com.tramex.sisoprega.proxy.bean;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.security.RolesAllowed;
import javax.ejb.Stateless;

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
@RolesAllowed({"sisoprega_admin", "mx_usr", "us_usr", "rancher", "agency"})
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
        Inventory inventory = getInventoryRecord(cattleType, detail.getQualityId(), detail.getBarnyardId(), entity.getDeWhen());

        long heads = detail.getHeads();
        double weight = detail.getWeight();
        long availableToSell = heads;

        if (inventory != null) {
          // Update inventory record
          heads += inventory.getHeads();
          weight += inventory.getWeight();
          availableToSell += inventory.getAvailableToSell();

          inventory.setHeads(heads);
          inventory.setWeight(weight);
          inventory.setAvailableToSell(availableToSell);

          dataModel.updateDataModel(inventory);
        } else {
          // Create inventory Record
          inventory = new Inventory();
          inventory.setCattypeId(cattleType);
          inventory.setHeads(detail.getHeads());
          inventory.setQualityId(detail.getQualityId());
          inventory.setPenId(detail.getBarnyardId());
          inventory.setWeight(detail.getWeight());
          inventory.setAvailableToSell(availableToSell);

          dataModel.createDataModel(inventory);
        }
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
        if(sEntryNo.equals("*")){
          queryName = "ACTIVE_HERMANAS";
        }else{
          return super.Read(request);
        }
      } else {
        return super.Read(request);
      }

      log.fine("Executing query [" + queryName + "]");

      List<?> results = dataModel.readDataModelList(queryName, parameters,
          Class.forName("com.tramex.sisoprega.dto." + request.getFilter().getEntity()));
      if (results.isEmpty()) {
        log.info("Query resulted in empty list [" + queryName + "] by []");
        response.setError(new GatewayError("VAL02", "No se encontraron datos para el filtro seleccionado", "entity: ["
            + request.getFilter().getEntity() + "]"));
      } else {
        response.setParentRecord(getRecordsFromList(results,
            Class.forName("com.tramex.sisoprega.dto." + request.getFilter().getEntity())));
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
      Object entity = getEntityFromRecord(record, type);
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
          // TODO: Evaluate inventory record.
          dataModel.updateDataModel(entity);

          String queryName = record.getEntity().toUpperCase() + "_BY_ID";
          log.fine("Retrieving updated object with Query: " + queryName);

          entity = dataModel.readSingleDataModel(queryName, "Id", idToUpdate, type);
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
              + "muy probablemente el registro que usted quiere agregar ya existe en la base de datos.", "Update"));
    }

    this.log.exiting(this.getClass().getCanonicalName(), "ReadResponse Update(CreateRequest)");
    return response;
  }
  
  private long getHermanaCattleType(Set<Reception> receptions){
    Iterator<Reception> iterator = receptions.iterator();
    if(iterator.hasNext()){
      Reception reception = iterator.next();
      return reception.getCattleType();
    }

    return 0;
  } 

}
