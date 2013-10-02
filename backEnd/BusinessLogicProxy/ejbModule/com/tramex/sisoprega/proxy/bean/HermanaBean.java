package com.tramex.sisoprega.proxy.bean;

import java.util.Iterator;
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
  
  private long getHermanaCattleType(Set<Reception> receptions){
    Iterator<Reception> iterator = receptions.iterator();
    if(iterator.hasNext()){
      Reception reception = iterator.next();
      return reception.getCattleType();
    }

    return 0;
  } 

}
