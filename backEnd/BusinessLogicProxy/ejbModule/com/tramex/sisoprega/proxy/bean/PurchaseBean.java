package com.tramex.sisoprega.proxy.bean;

import javax.annotation.security.RolesAllowed;
import javax.ejb.Stateless;

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

}
