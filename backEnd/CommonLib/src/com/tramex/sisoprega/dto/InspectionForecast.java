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
  
}
