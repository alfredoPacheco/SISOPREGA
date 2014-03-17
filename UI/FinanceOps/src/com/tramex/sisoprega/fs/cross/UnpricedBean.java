/**
 * 
 */
package com.tramex.sisoprega.fs.cross;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import javax.ejb.EJB;

import com.tramex.sisoprega.datamodel.DataModelException;
import com.tramex.sisoprega.datamodel.RemoteModelable;
import com.tramex.sisoprega.dto.HermanaCorteExportador;
import com.tramex.sisoprega.dto.PurchaseDetail;
import com.tramex.sisoprega.dto.SaleDetail;
import com.tramex.sisoprega.dto.Unpriced;

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
 * Dec 28, 2013     Diego Torres                 Initial Version.
 * Mar 10, 2013     Alfredo Pacheco              Update functionality complete.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 * 
 */

public class UnpricedBean implements Serializable {
  private static final long serialVersionUID = -2335874382819709929L;

  private static Logger log = Logger.getLogger(UnpricedBean.class.getName());

  @EJB(lookup = "java:global/DataModel/BaseDataModel")
  private RemoteModelable dataModel;

  private Unpriced selectedItem;

  /**
   * @return the selectedItem
   */
  public Unpriced getSelectedItem() {
    return selectedItem;
  }

  /**
   * @param selectedItem
   *          the selectedItem to set
   */
  public void setSelectedItem(Unpriced selectedItem) {
    this.selectedItem = selectedItem;
  }

  public void update() {

    if (this.selectedItem.getOperation().equals("HERMANA")) {
      HermanaCorteExportador hce;
      try {
        hce = dataModel.readSingleDataModel("HERMANA_CORTE_EXPORTADOR_BY_ID", "Id", this.selectedItem.getRecordId(),
            HermanaCorteExportador.class);
        hce.setPurchasePrice(this.selectedItem.getPrice());
        dataModel.updateDataModel(hce);
      } catch (DataModelException e) {
        log.severe("An error has occurred: " + e.getMessage());
      }
    }
    if (this.selectedItem.getOperation().equals("PURCHASE")) {
      PurchaseDetail pd;
      try {
        pd = dataModel.readSingleDataModel("PURCHASE_DETAIL_BY_ID", "Id", this.selectedItem.getRecordId(), PurchaseDetail.class);
        pd.setPurchasePrice(this.selectedItem.getPrice());
        dataModel.updateDataModel(pd);
      } catch (DataModelException e) {
        log.severe("An error has occurred: " + e.getMessage());
      }
    }
    if (this.selectedItem.getOperation().equals("SALE")) {
      SaleDetail sd;
      log.severe("entro a if sale");
      try {
        sd = dataModel.readSingleDataModel("SALE_DETAIL_BY_ID", "Id", this.selectedItem.getRecordId(), SaleDetail.class);
        sd.setSalePrice(this.selectedItem.getPrice());
        dataModel.updateDataModel(sd);
      } catch (DataModelException e) {
        log.severe("An error has occurred: " + e.getMessage());
      }
    }
  }

  public List<Unpriced> getUnpricedImports() throws DataModelException {
    Map<String, Object> parameters = new HashMap<String, Object>();
    List<Unpriced> listUnpriced = dataModel.readDataModelList("UNPRICED", parameters, Unpriced.class);

    log.info("[" + listUnpriced.size() + "] records retrieved from Unpriced list. Filtering by Hermanas.");

    List<Unpriced> result = new ArrayList<Unpriced>();
    for (Unpriced unpriced : listUnpriced) {
      if (unpriced.getOperation().equals("HERMANA")) {
        result.add(unpriced);
      }
    }

    return result;
  }

  public List<Unpriced> getUnpricedPurchases() throws DataModelException {
    Map<String, Object> parameters = new HashMap<String, Object>();
    List<Unpriced> listUnpriced = dataModel.readDataModelList("UNPRICED", parameters, Unpriced.class);

    log.fine("[" + listUnpriced.size() + "] records retrieved from Unpriced list. Filtering by Purchases.");

    List<Unpriced> result = new ArrayList<Unpriced>();
    for (Unpriced unpriced : listUnpriced) {
      if (unpriced.getOperation().equals("PURCHASE")) {
        result.add(unpriced);
      }
    }

    return result;
  }

  public List<Unpriced> getUnpricedSales() throws DataModelException {
    Map<String, Object> parameters = new HashMap<String, Object>();
    List<Unpriced> listUnpriced = dataModel.readDataModelList("UNPRICED", parameters, Unpriced.class);

    log.fine("[" + listUnpriced.size() + "] records retrieved from Unpriced list. Filtering by Sales.");

    List<Unpriced> result = new ArrayList<Unpriced>();
    for (Unpriced unpriced : listUnpriced) {
      if (unpriced.getOperation().equals("SALE")) {
        result.add(unpriced);
      }
    }

    return result;
  }
}
