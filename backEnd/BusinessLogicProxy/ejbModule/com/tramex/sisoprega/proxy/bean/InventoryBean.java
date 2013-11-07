/**
 * 
 */
package com.tramex.sisoprega.proxy.bean;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.annotation.security.RolesAllowed;
import javax.ejb.Stateless;

import com.tramex.sisoprega.dto.FeedUS;
import com.tramex.sisoprega.dto.Inventory;
import com.tramex.sisoprega.gateway.GatewayError;
import com.tramex.sisoprega.gateway.GatewayRecord;
import com.tramex.sisoprega.gateway.request.CreateRequest;
import com.tramex.sisoprega.gateway.response.ReadResponse;
import com.tramex.sisoprega.proxy.Cruddable;
import com.tramex.sisoprega.proxy.common.BaseInventory;

/**
 * USAGE COMMENT HERE
 *  
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * Aug 5, 2013     Diego Torres                 Initial Version.
 * 10/05/2013   Alfredo Pacheco             Overriding update in order to handle move of heads operation
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 *
 * 
 */
@Stateless
@RolesAllowed({"us_usr", "agency"})
public class InventoryBean extends BaseInventory implements Cruddable {
@Override
public ReadResponse Update(CreateRequest request) {
  this.log.entering(this.getClass().getCanonicalName(), "ReadResponse Create(CreateRequest)");

  ReadResponse response = new ReadResponse();
  try {
    GatewayRecord record = request.getParentRecord();
    Class<?> type = Class.forName(DTO_PACKAGE + record.getEntity());
    Inventory entity = (Inventory) getEntityFromRecord(record, type);
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
        
        Inventory inventory = getInventoryRecordById(entity.getInventoryId());
        if(inventory == null){
          this.log.severe("Inventory was not found.");
        }
        long want_to_move = inventory.getHeads() - entity.getHeads();
        
        if(inventory.getAvailableToSell() < want_to_move){
          this.log.warning("DB01 - AvailableToSell can not be greater than Heads in Inventory entity.");
          response.setError(new GatewayError("DB01", "La cantidad de cabezas en Inventario no puede ser menor a las cabezas disponibles para vender.", "Update"));
           
          return response;
        }
        
        entity.setAvailableToSell(inventory.getAvailableToSell() - want_to_move);        
        entity.setWeight(inventory.getWeight()/inventory.getHeads()*entity.getHeads());
        entity.setFeed(inventory.getFeed()/inventory.getHeads()*entity.getHeads());
        
        if(entity.getHeads() <= 0){
          entity.setCycleCompleted(new Date());          
        }
        
        Set<FeedUS> feedUS = entity.getFeedUS();
        for(FeedUS fus : feedUS){
          if(fus.getFeedUSId() == 0){
            entity.setFeed(fus.getQuantity() + inventory.getFeed());
          }
        }
        
        dataModel.updateDataModel(entity);

        String queryName = record.getEntity().toUpperCase() + "_BY_ID";
        log.fine("Retrieving updated object with Query: " + queryName);

        entity = (Inventory) dataModel.readSingleDataModel(queryName, "Id", idToUpdate, type);
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
}
