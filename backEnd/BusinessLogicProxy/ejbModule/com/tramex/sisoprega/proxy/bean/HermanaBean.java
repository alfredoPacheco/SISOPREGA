package com.tramex.sisoprega.proxy.bean;

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
  
  private long getHermanaCattleType(Set<Reception> receptions){
    Iterator<Reception> iterator = receptions.iterator();
    if(iterator.hasNext()){
      Reception reception = iterator.next();
      return reception.getCattleType();
    }

    return 0;
  } 

}
