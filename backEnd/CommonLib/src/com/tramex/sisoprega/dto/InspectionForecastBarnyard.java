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


/**
 * 
 * Defines the model for the Inspection Forecast Barnyard entity.<BR/>
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * Jan 13, 2013  Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 * 
 */
public class InspectionForecastBarnyard {
  private long inspectionForecastBarnyardId;
  private long fdId;
  private long barnyardId;
  /**
   * @return the inspectionForecastBarnyardId
   */
  public long getInspectionForecastBarnyardId() {
    return inspectionForecastBarnyardId;
  }
  /**
   * @param inspectionForecastBarnyardId the inspectionForecastBarnyardId to set
   */
  public void setInspectionForecastBarnyardId(long inspectionForecastBarnyardId) {
    this.inspectionForecastBarnyardId = inspectionForecastBarnyardId;
  }
  /**
   * @return the fdId
   */
  public long getFdId() {
    return fdId;
  }
  /**
   * @param fdId the fdId to set
   */
  public void setFdId(long fdId) {
    this.fdId = fdId;
  }
  /**
   * @return the barnyardId
   */
  public long getBarnyardId() {
    return barnyardId;
  }
  /**
   * @param barnyardId the barnyardId to set
   */
  public void setBarnyardId(long barnyardId) {
    this.barnyardId = barnyardId;
  }
  
}
