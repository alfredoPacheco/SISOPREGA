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
 * Defines the model for the Inspection Forecast details entity.<br/>
 *  
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * Jan 12, 2013     Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 *
 * 
 */
public class InspectionForecastDetail {
  private long fdId;
  private long forecastId;
  private long rancherId;
  private String auth;
  private String origin;
  private long cattleType;
  private long quantity;
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
   * @return the forecastId
   */
  public long getForecastId() {
    return forecastId;
  }
  /**
   * @param forecastId the forecastId to set
   */
  public void setForecastId(long forecastId) {
    this.forecastId = forecastId;
  }
  /**
   * @return the rancherId
   */
  public long getRancherId() {
    return rancherId;
  }
  /**
   * @param rancherId the rancherId to set
   */
  public void setRancherId(long rancherId) {
    this.rancherId = rancherId;
  }
  /**
   * @return the auth
   */
  public String getAuth() {
    return auth;
  }
  /**
   * @param auth the auth to set
   */
  public void setAuth(String auth) {
    this.auth = auth;
  }
  /**
   * @return the origin
   */
  public String getOrigin() {
    return origin;
  }
  /**
   * @param origin the origin to set
   */
  public void setOrigin(String origin) {
    this.origin = origin;
  }
  /**
   * @return the cattleType
   */
  public long getCattleType() {
    return cattleType;
  }
  /**
   * @param cattleType the cattleType to set
   */
  public void setCattleType(long cattleType) {
    this.cattleType = cattleType;
  }
  /**
   * @return the quantity
   */
  public long getQuantity() {
    return quantity;
  }
  /**
   * @param quantity the quantity to set
   */
  public void setQuantity(long quantity) {
    this.quantity = quantity;
  }
  
}
