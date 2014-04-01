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

import org.primefaces.extensions.event.timeline.TimelineSelectEvent;
import org.primefaces.extensions.model.timeline.TimelineEvent;
import org.primefaces.extensions.model.timeline.TimelineModel;

import com.tramex.sisoprega.datamodel.DataModelException;
import com.tramex.sisoprega.datamodel.RemoteModelable;
import com.tramex.sisoprega.dto.HermanaCorteExportador;
import com.tramex.sisoprega.dto.TimeLine;
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
 * 03/21/2014   Alfredo Pacheco             Bean for handle payments to schedule's logic
 * ====================================================================================
 * </PRE>
 * 
 * @author Alfredo Pacheco
 * 
 * 
 */

public class TimeLineBean implements Serializable {
  private static final long serialVersionUID = -2335874382819709929L;

  private static Logger log = Logger.getLogger(TimeLineBean.class.getName());

  @EJB(lookup = "java:global/DataModel/BaseDataModel")
  private RemoteModelable dataModel;

  private TimelineModel model;
  private TimeLine selectedItem;

  /**
   * @return the selectedItem
   */
  public TimeLine getSelectedItem() {
    return selectedItem;
  }

  /**
   * @param selectedItem
   *          the selectedItem to set
   */
  public void setSelectedItem(TimeLine selectedItem) {
    this.selectedItem = selectedItem;
  }

  public void onSelect(TimelineSelectEvent e) {
    log.severe("entro a on select");
    TimelineEvent timelineEvent = e.getTimelineEvent();
    this.selectedItem = (TimeLine) timelineEvent.getData();
  }

  public void savePayment() {
    log.severe("Entro a save payment");
    log.severe(this.selectedItem.getWho());
    return;
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

  public TimelineModel getTimeLineOperations() throws DataModelException {
    Map<String, Object> parameters = new HashMap<String, Object>();
    List<TimeLine> listTimeLineOp = dataModel.readDataModelList("TIMELINE", parameters, TimeLine.class);

    log.info("[" + listTimeLineOp.size() + "] records retrieved from TimeLine list.");
    model = new TimelineModel();
    for (TimeLine tl : listTimeLineOp) {
      // TimelineEvent tle = new TimelineEvent(tl.getOperation() + " " +
      // tl.getWho(), tl.getWhenToPay());
      TimelineEvent tle;
//      if (tl.isSettled()) {
//        tle = new TimelineEvent("<div style='display:none' recordId=" + tl.getRecordId()
//            + " ></div><div style='width:50px;height:50px;background-color:blue;'>" + tl.getOperation() + " " + tl.getWho()
//            + "</div>", tl.getWhenToPay());
//      } else {
//        tle = new TimelineEvent("<div style='display:none' recordId=" + tl.getRecordId()
//            + "></div><div style='width:50px;height:50px;'>" + tl.getOperation() + " " + tl.getWho() + "</div>",
//            tl.getWhenToPay());
//      }
      tle = new TimelineEvent(tl, tl.getWhenToPay());
      model.add(tle);
    }
    return model;
  }
}
