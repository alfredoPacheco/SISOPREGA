package com.tramex.sisoprega.proxy.bean;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import com.tramex.sisoprega.proxy.common.BaseBean;

/**
 * Session Bean implementation class PurchaseBean
 */
@Stateless
@RolesAllowed({ "sisoprega_admin", "mx_usr", "us_usr", "rancher", "agency" })
public class PurchaseBean extends BaseBean implements Cruddable {

  ReadResponse response = new ReadResponse();
  
  @Override
  public ReadResponse Create(CreateRequest request) {
    // Use purchase to create inventory
    try {
      GatewayRecord record = request.getParentRecord();
      Class<?> type = Class.forName(DTO_PACKAGE + record.getEntity());
      Purchase entity = (Purchase) getEntityFromRecord(record, type);
      this.log.fine("Found entity from Record [" + entity + "]");

      // Add purchase to inventory
      for (PurchaseDetail detail : entity.getPurchaseDetail()) {
        Inventory inventory = getInventoryRecord(entity.getCattleTypeId(), detail.getQualityId(), detail.getPenId(), entity.getPurchaseDate());

        long heads = detail.getHeads();
        double weight = detail.getWeight();

        if (inventory != null) {
          // Update inventory record
          heads += inventory.getHeads();
          weight += inventory.getWeight();

          inventory.setHeads(heads);
          inventory.setWeight(weight);

          dataModel.updateDataModel(inventory);
        } else {
          // Create inventory Record
          inventory = new Inventory();
          inventory.setCattypeId(entity.getCattleTypeId());
          inventory.setHeads(detail.getHeads());
          inventory.setQualityId(detail.getQualityId());
          inventory.setPenId(detail.getPenId());
          inventory.setWeight(detail.getWeight());

          dataModel.createDataModel(inventory);
        }
        
        // Create purchase
        response = super.Create(request);
      }
    } catch (Exception e) {
      this.log.severe("Exception found while creating inventory record: " + e.getMessage());
      this.log.throwing(this.getClass().getName(), "Create", e);

      response
          .setError(new GatewayError("DB01", "Fue imposible actualizar el inventario con los datos proporcionados.", "Create"));
    }

    return response;
  }

  /**
   * Retrieve inventory record based on cattle type, quality and date
   * 
   * @param cattleType
   * @param qualityId
   * @param date
   * @return
   * @throws DataModelException
   */
  private Inventory getInventoryRecord(long cattleType, long qualityId, long penId, Date date) throws DataModelException {
    Map<String, Object> parameters = new HashMap<String, Object>();
    parameters.put("cattleType", cattleType);
    parameters.put("qualityId", qualityId);
    parameters.put("penId", penId);
    List<Inventory> inventoryRecord = dataModel
        .readDataModelList("INVENTORY_UNIQUE_RECORD", parameters, Inventory.class);

    if (inventoryRecord != null && !inventoryRecord.isEmpty()) {
      return inventoryRecord.get(0);
    } else {
      return null;
    }
  }

}
