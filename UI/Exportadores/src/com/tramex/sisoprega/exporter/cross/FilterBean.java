package com.tramex.sisoprega.exporter.cross;

import java.util.Date;
import java.util.logging.Logger;

import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;

public class FilterBean {
  private static Logger log = Logger.getLogger(FilterBean.class.getName());
  
  private Date fromDate = new Date();
  private Date toDate = new Date();
  private String reportName;

  /**
   * @return the fromDate
   */
  public Date getFromDate() {
    return fromDate;
  }

  /**
   * @param fromDate
   *          the fromDate to set
   */
  public void setFromDate(Date fromDate) {
    log.fine("Setting date to value:" + fromDate);
    this.fromDate = fromDate;
  }

  /**
   * @return the toDate
   */
  public Date getToDate() {
    return toDate;
  }

  /**
   * @param toDate
   *          the toDate to set
   */
  public void setToDate(Date toDate) {
    if (toDate.before(fromDate))
      FacesContext.getCurrentInstance().addMessage(null, new FacesMessage("Revise su selección de fechas, el rango final no debe ser menor al rango inicial!"));
    
    this.toDate = toDate;
  }

  /**
   * @return the reportName
   */
  public String getReportName() {
    return reportName;
  }

  /**
   * @param reportName the reportName to set
   */
  public void setReportName(String reportName) {
    this.reportName = reportName;
  }
}
