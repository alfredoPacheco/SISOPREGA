/**
 * THIS IS A COMMERCIAL PROGRAM PROVIDED FOR TRAMEX AND IT'S ASSOCIATES
 * BUILT BY EXTERNAL SOFTWARE PROVIDERS.
 * THE SOFTWARE COMPRISING THIS SYSTEM IS THE PROPERTY OF TRAMEX OR ITS
 * LICENSORS.
 * 
 * ALL COPYRIGHT, PATENT, TRADE SECRET, AND OTHER INTELLECTUAL PROPERTY RIGHTS
 * IN THE SOFTWARE COMPRISING THIS SYSTEM ARE, AND SHALL REMAIN, THE VALUABLE
 * PROPERTY OF TRAMEX OR ITS LICENSORS.
 * 
 * USE, DISCLOSURE, OR REPRODUCTION OF THIS SOFTWARE IS STRICTLY PROHIBITED,
 * EXCEPT UNDER WRITTEN LICENSE FROM TRAMEX OR ITS LICENSORS.
 * 
 * &copy; COPYRIGHT 2012 TRAMEX. ALL RIGHTS RESERVED.
 */
package com.tramex.sisoprega.dto;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * Defines the model for the Inspection Forecast entity.<BR/>
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 01/12/2012  Diego Torres              Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 */
public class InspectionForecast {
  private long inspectionForecastId;
  private Date forecastDate;
  private boolean locked = false;
  private Set<InspectionForecastDetail> inspectionForecastDetail;
  
  /**
   * @return the forecastDate
   */
  public Date getForecastDate() {
    return forecastDate;
  }
  /**
   * @param forecastDate the forecastDate to set
   */
  public void setForecastDate(Date forecastDate) {
    this.forecastDate = forecastDate;
  }
  /**
   * @return the inspectionForecastId
   */
  public long getInspectionForecastId() {
    return inspectionForecastId;
  }
  /**
   * @param inspectionForecastId the forecastId to set
   */
  public void setInspectionForecastId(long inspectionForecastId) {
    this.inspectionForecastId = inspectionForecastId;
  }
  /**
   * @return the locked
   */
  public boolean isLocked() {
    return locked;
  }
  /**
   * @param locked the locked to set
   */
  public void setLocked(boolean locked) {
    this.locked = locked;
  }
  /**
   * @return the inspectionForecastDetail
   */
  public Set<InspectionForecastDetail> getInspectionForecastDetail() {
    return inspectionForecastDetail;
  }
  /**
   * @param inspectionForecastDetail the inspectionForecastDetail to set
   */
  public void setInspectionForecastDetail(Set<InspectionForecastDetail> inspectionForecastDetail) {
    this.inspectionForecastDetail = inspectionForecastDetail;
  }
  
  public void addInspectionForecastDetail(InspectionForecastDetail detail){
    if(inspectionForecastDetail == null)
      inspectionForecastDetail = new HashSet<InspectionForecastDetail>();
    
    inspectionForecastDetail.add(detail);
    
    if(detail.getInspectionForecast() != this)
      detail.setInspectionForecast(this);
  }
  
  @Override
  public String toString() {
    return "inspectionForecastId:" + inspectionForecastId + ";forecastDate:" + forecastDate + ";isLocked:" + locked;
  }
  
  @Override
  public boolean equals(Object obj) {
    if(obj instanceof InspectionForecast)
      return inspectionForecastId == ((InspectionForecast) obj).getInspectionForecastId();
    
    return false;
  }
  
}
