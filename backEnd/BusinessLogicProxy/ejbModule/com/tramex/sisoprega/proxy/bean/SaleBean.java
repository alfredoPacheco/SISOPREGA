package com.tramex.sisoprega.proxy.bean;

import javax.annotation.security.RolesAllowed;
import javax.ejb.Stateless;

import com.tramex.sisoprega.dto.Inventory;
import com.tramex.sisoprega.dto.Sale;
import com.tramex.sisoprega.dto.SaleDetail;
import com.tramex.sisoprega.gateway.GatewayError;
import com.tramex.sisoprega.gateway.GatewayRecord;
import com.tramex.sisoprega.gateway.request.CreateRequest;
import com.tramex.sisoprega.gateway.response.ReadResponse;
import com.tramex.sisoprega.proxy.Cruddable;
import com.tramex.sisoprega.proxy.common.BaseInventory;

/**
 * Session Bean implementation class SaleBean
 */
@Stateless
@RolesAllowed({ "sisoprega_admin", "mx_usr", "us_usr", "rancher", "agency" })
public class SaleBean extends BaseInventory implements Cruddable {
  
  @Override
  public ReadResponse Create(CreateRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "CreateResponse Create(CreateRequest)");

    ReadResponse response = new ReadResponse();
    try {

      GatewayRecord record = request.getParentRecord();
      Class<?> type = Class.forName(DTO_PACKAGE + record.getEntity());
      Sale entity = (Sale) getEntityFromRecord(record, type);
      this.log.fine("Found entity from Record [" + entity + "]");

     //Update inventory
      for(SaleDetail detail : entity.getSaleDetail()){
        Inventory inventory = getInventoryRecordById(detail.getInventoryId());
        
        long headsSold = detail.getHeads();       
        if (inventory != null) {
          // Update inventory record
         
          inventory.setAvailableToSell(inventory.getAvailableToSell() - headsSold);
          inventory.setSold(inventory.getSold() + headsSold);
          inventory.setAvailableToProgramShip(inventory.getAvailableToProgramShip() + headsSold);

          dataModel.updateDataModel(inventory);
        }else{
          this.log.severe("Iventory was not found for update in Sale Bean.");
        }
      }
      
      
    } catch (Exception e) {
      this.log.severe("Exception found while creating inventory record: " + e.getMessage());
      this.log.throwing(this.getClass().getName(), "Create", e);

      response
          .setError(new GatewayError("DB01", "Fue imposible actualizar el inventario con los datos proporcionados.", "Create"));
    }
    
    // Create sale
    response = super.Create(request);
    return response;
  }
}
