/**
 * 
 */
package com.tramex.sisoprega.proxy.common;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.tramex.sisoprega.datamodel.DataModelException;
import com.tramex.sisoprega.dto.Inventory;

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
 * Sep 22, 2013     Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 * 
 */
public abstract class BaseInventory extends BaseBean {

  /**
   * Retrieve inventory record based on cattle type, quality and date
   * 
   * @param cattleType
   * @param qualityId
   * @param date
   * @return
   * @throws DataModelException
   */
  protected Inventory getInventoryRecord(long penId) throws DataModelException {
    Map<String, Object> parameters = new HashMap<String, Object>();
    parameters.put("penId", penId);
    List<Inventory> inventoryRecord = dataModel.readDataModelList("INVENTORY_BY_PENID", parameters, Inventory.class);

    if (inventoryRecord != null && !inventoryRecord.isEmpty()) {
      return inventoryRecord.get(0);
    } else {
      return null;
    }
  }

  protected Inventory getInventoryRecordById(long id) throws DataModelException {
    Map<String, Object> parameters = new HashMap<String, Object>();
    parameters.put("Id", id);
    List<Inventory> inventoryRecord = dataModel.readDataModelList("INVENTORY_BY_ID", parameters, Inventory.class);

    if (inventoryRecord != null && !inventoryRecord.isEmpty()) {
      return inventoryRecord.get(0);
    } else {
      return null;
    }
  }

  public void addToInventory(Inventory inventory, long heads, double weight, long qualityId, long penId, long cattleTypeId)
      throws DataModelException {

    long availableToSell = heads;

    if (inventory != null) {
      if(inventory.getCattypeId() == cattleTypeId && inventory.getQualityId() == qualityId){
     // Update inventory record
        heads += inventory.getHeads();
        weight += inventory.getWeight();
        availableToSell += inventory.getAvailableToSell();

        inventory.setHeads(heads);
        inventory.setWeight(weight);
        inventory.setAvailableToSell(availableToSell);

        dataModel.updateDataModel(inventory);  
      }else{
        throw new DataModelException("No se ha podido agregar ganado a este corral debido a que contiene un tipo o calidad distinta.");
      }
      
    } else {
      // Create inventory Record
      inventory = new Inventory();
      inventory.setCattypeId(cattleTypeId);
      inventory.setHeads(heads);
      inventory.setQualityId(qualityId);
      inventory.setPenId(penId);
      inventory.setWeight(weight);
      inventory.setAvailableToSell(availableToSell);

      dataModel.createDataModel(inventory);
    }
  }
}
