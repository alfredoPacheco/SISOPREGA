/**
 * 
 */
package com.tramex.sisoprega.fs.cross;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import javax.ejb.EJB;

import com.tramex.sisoprega.datamodel.DataModelException;
import com.tramex.sisoprega.datamodel.RemoteModelable;
import com.tramex.sisoprega.dto.HermanaCorteExportador;
import com.tramex.sisoprega.dto.PaymentToSchedule;
import com.tramex.sisoprega.dto.PurchaseDetail;
import com.tramex.sisoprega.dto.SaleDetail;

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
 * 03/17/2014   Alfredo Pacheco             Bean for handle payments to schedule's logic
 * ====================================================================================
 * </PRE>
 * 
 * @author Alfredo Pacheco
 * 
 * 
 */

public class PaymentsToScheduleBean implements Serializable {
  private static final long serialVersionUID = -2335874382819709929L;

  private static Logger log = Logger.getLogger(PaymentsToScheduleBean.class.getName());

  @EJB(lookup = "java:global/DataModel/BaseDataModel")
  private RemoteModelable dataModel;

  private PaymentToSchedule selectedItem;

  /**
   * @return the selectedItem
   */
  public PaymentToSchedule getSelectedItem() {
    return selectedItem;
  }

  /**
   * @param selectedItem
   *          the selectedItem to set
   */
  public void setSelectedItem(PaymentToSchedule selectedItem) {
    this.selectedItem = selectedItem;
  }

  public void update() {

    if (this.selectedItem.getOperation().equals("HERMANA")) {
      HermanaCorteExportador hce;
      try {
        hce = dataModel.readSingleDataModel("HERMANA_CORTE_EXPORTADOR_BY_ID", "Id", this.selectedItem.getRecordId(),
            HermanaCorteExportador.class);
        hce.setPaidDate(this.selectedItem.getWhenToPay());
        dataModel.updateDataModel(hce);
      } catch (DataModelException e) {
        log.severe("An error has occurred: " + e.getMessage());
      }
    }
    if (this.selectedItem.getOperation().equals("PURCHASE")) {
      PurchaseDetail pd;
      try {
        pd = dataModel.readSingleDataModel("PURCHASE_DETAIL_BY_ID", "Id", this.selectedItem.getRecordId(), PurchaseDetail.class);
        pd.setPaidDate(this.selectedItem.getWhenToPay());
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
        sd.setCollectedDate(this.selectedItem.getWhenToPay());
        dataModel.updateDataModel(sd);
      } catch (DataModelException e) {
        log.severe("An error has occurred: " + e.getMessage());
      }
    }
  }

  public List<PaymentToSchedule> getPaymentsToSchedule() throws DataModelException {
    Map<String, Object> parameters = new HashMap<String, Object>();
    List<PaymentToSchedule> listPaymentsToSchedule = dataModel.readDataModelList("PAYMENTS_TO_SCHEDULE", parameters,
        PaymentToSchedule.class);

    log.info("[" + listPaymentsToSchedule.size() + "] records retrieved from Payments to Schedule list.");

    return listPaymentsToSchedule;
  }
}
