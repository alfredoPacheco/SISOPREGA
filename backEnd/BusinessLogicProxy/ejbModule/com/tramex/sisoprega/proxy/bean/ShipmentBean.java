package com.tramex.sisoprega.proxy.bean;

import java.util.Date;
import java.util.Set;

import javax.annotation.security.RolesAllowed;
import javax.ejb.Stateless;

import com.tramex.sisoprega.dto.Inventory;
import com.tramex.sisoprega.dto.Shipment;
import com.tramex.sisoprega.dto.ShipmentDetail;
import com.tramex.sisoprega.dto.ShipmentRelease;
import com.tramex.sisoprega.gateway.GatewayError;
import com.tramex.sisoprega.gateway.GatewayRecord;
import com.tramex.sisoprega.gateway.request.CreateRequest;
import com.tramex.sisoprega.gateway.response.ReadResponse;
import com.tramex.sisoprega.proxy.Cruddable;
import com.tramex.sisoprega.proxy.common.BaseInventory;

/**
 * Session Bean implementation class ShipmentBean
 */
@Stateless
@RolesAllowed({ "sisoprega_admin", "mx_usr", "us_usr", "rancher", "agency" })
public class ShipmentBean extends BaseInventory implements Cruddable {
  
  @Override
  public ReadResponse Create(CreateRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "CreateResponse Create(CreateRequest)");

    ReadResponse response = new ReadResponse();
    try {

      GatewayRecord record = request.getParentRecord();
      Class<?> type = Class.forName(DTO_PACKAGE + record.getEntity());
      Shipment entity = (Shipment) getEntityFromRecord(record, type);
      this.log.fine("Found entity from Record [" + entity + "]");
      
      for(ShipmentDetail detail : entity.getShipmentDetail()){
        Inventory inventory = getInventoryRecordById(detail.getInventoryId());

        long headsProgrammed = detail.getHeads();
        if (inventory != null) {
          // Update inventory record
          
          inventory.setAvailableToProgramShip(inventory.getAvailableToProgramShip() - headsProgrammed);
          inventory.setProgrammedToShip(inventory.getProgrammedToShip() + headsProgrammed);
          inventory.setAvailableToShip(inventory.getAvailableToShip() + headsProgrammed);
          
          dataModel.updateDataModel(inventory);
        }else{
          //TODO throw exception because the inventory was not found.
        }
      }
      

    } catch (Exception e) {
      this.log.severe("Exception found while creating inventory record: " + e.getMessage());
      this.log.throwing(this.getClass().getName(), "Create", e);

      response
          .setError(new GatewayError("DB01", "Fue imposible actualizar el inventario con los datos proporcionados.", "Create"));
    }

    // Create shipment
    response = super.Create(request);
    return response;
  }
  
  @Override
  public ReadResponse Update(CreateRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "ReadResponse Create(CreateRequest)");

    ReadResponse response = new ReadResponse();
    try {
      GatewayRecord record = request.getParentRecord();
      Class<?> type = Class.forName(DTO_PACKAGE + record.getEntity());
      Shipment entity = (Shipment) getEntityFromRecord(record, type);
      this.log.fine("Found entity from Record [" + entity + "]");

      log.severe("Debug begin");
      for(ShipmentRelease release : entity.getShipmentRelease()){
        
        log.severe("Debug: " + release.getShipmentReleaseId());
        if(release.getShipmentReleaseId() == 0){
          
         Set<ShipmentDetail> shipmentDetail = release.getShipment().getShipmentDetail();
        
        if(shipmentDetail.size() > 0){
          for(ShipmentDetail detail : shipmentDetail){
            Inventory inventory = getInventoryRecordById(detail.getInventoryId());
            
            long headsShipped = detail.getHeads();
            
            if (inventory != null) {
                // Update inventory record
                
                inventory.setAvailableToShip(inventory.getAvailableToShip()-headsShipped);
                inventory.setShipped(inventory.getShipped() + headsShipped);
                inventory.setHeads(inventory.getHeads() - headsShipped);
              
                if((inventory.getHeads()-headsShipped) <= 0 ){
                  inventory.setCycleCompleted(new Date());
                }
                dataModel.updateDataModel(inventory);   
              
            }else{
              //TODO throw exception because the inventory was not found.
            }
          }
        }
        }
      }

    } catch (Exception e) {
      this.log.severe("Exception found while creating inventory record: " + e.getMessage());
      this.log.throwing(this.getClass().getName(), "Create", e);

      response
          .setError(new GatewayError("DB01", "Fue imposible actualizar el inventario con los datos proporcionados.", "Create"));
    }

 // Create shipment
    response = super.Update(request);
    log.severe("End Debug");
    return response;
  }
}
