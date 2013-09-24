/**
 * 
 */
package com.tramex.sisoprega.proxy.common;

import java.util.Date;
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
  protected Inventory getInventoryRecord(long cattleType, long qualityId, long penId, Date date) throws DataModelException {
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
