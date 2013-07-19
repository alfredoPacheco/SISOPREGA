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

import java.util.HashSet;
import java.util.Set;

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
  private long inspectionForecastDetailId;
  private long rancherId;
  private long zoneId;
  private String auth;
  private long origin;
  private long cattleType;
  private long quantity;
  private long inspection_seq;
  private InspectionForecast inspectionForecast;
  private Set<Pen> pen;

  /**
   * @return the inspectionForecastDetailId
   */
  public long getInspectionForecastDetailId() {
    return inspectionForecastDetailId;
  }

  /**
   * @param inspectionForecastDetailId
   *          the fdId to set
   */
  public void setInspectionForecastDetailId(long inspectionForecastDetailId) {
    this.inspectionForecastDetailId = inspectionForecastDetailId;
  }

  /**
   * @return the rancherId
   */
  public long getRancherId() {
    return rancherId;
  }

  /**
   * @param rancherId
   *          the rancherId to set
   */
  public void setRancherId(long rancherId) {
    this.rancherId = rancherId;
  }

  /**
   * @return the auth
   */
  /**
   * @return the zoneId
   */
  public long getZoneId() {
    return zoneId;
  }

  /**
   * @param rancherId
   *          the rancherId to set
   */
  public void setZoneId(long zoneId) {
    this.zoneId = zoneId;
  }

  /**
   * @return the auth
   */
  public String getAuth() {
    return auth;
  }

  /**
   * @param auth
   *          the auth to set
   */
  public void setAuth(String auth) {
    this.auth = auth;
  }

  /**
   * @return the origin
   */
  public long getOrigin() {
    return origin;
  }

  /**
   * @param origin
   *          the origin to set
   */
  public void setOrigin(long origin) {
    this.origin = origin;
  }

  /**
   * @return the cattleType
   */
  public long getCattleType() {
    return cattleType;
  }

  /**
   * @param cattleType
   *          the cattleType to set
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
   * @param quantity
   *          the quantity to set
   */
  public void setQuantity(long quantity) {
    this.quantity = quantity;
  }

  /**
   * @return the inspection_seq
   */
  public long getInspection_seq() {
    return inspection_seq;
  }

  /**
   * @param inspection_seq the inspection_seq to set
   */
  public void setInspection_seq(long inspection_seq) {
    this.inspection_seq = inspection_seq;
  }

  /**
   * @return the inspectionForecast
   */
  public InspectionForecast getInspectionForecast() {
    return inspectionForecast;
  }

  /**
   * @param inspectionForecast
   *          the inspectionForecast to set
   */
  public void setInspectionForecast(InspectionForecast inspectionForecast) {
    this.inspectionForecast = inspectionForecast;
  }

  /**
   * @return the pen
   */
  public Set<Pen> getPen() {
    return pen;
  }

  /**
   * @param pen the pen to set
   */
  public void setPen(Set<Pen> pen) {
    this.pen = pen;
  }
  
  public void addPen(Pen inPen){
    if(pen == null)
      pen = new HashSet<Pen>();
    
    pen.add(inPen);
  }

  @Override
  public String toString() {
    return "auth:" + auth + ";cattleType:" + cattleType + ";inspectionForecastDetailId:" + inspectionForecastDetailId
        + ";origin:" + origin + ";quantity:" + quantity + ";rancherId:" + rancherId + ";zoneId:" + zoneId + ";";
  }
  
  @Override
  public boolean equals(Object obj) {
    if(obj instanceof InspectionForecastDetail){
      return inspectionForecastDetailId == ((InspectionForecastDetail) obj).getInspectionForecastDetailId();
    }
    return false;
  }

}
