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
 * Defines the model for the Cattle Type entity.<BR/>
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 12/12/2012  Jaime Figueroa                 Initial Version.
 * 12/16/2012  Diego Torres                   Adding toString implementation.
 * ====================================================================================
 * </PRE>
 * 
 * @author Jaime Figueroa
 * 
 */
public class Reception {
  private long receptionId;
  private long rancherId;
  private Date dateAllotted;
  private long cattleType;
  private long locationId;
  private long zoneId;

  /**
   * @return the receptionId
   */
  public long getReceptionId() {
    return receptionId;
  }

  /**
   * @param receptionId
   *          the receptionId to set
   */
  public void setReceptionId(long receptionId) {
    this.receptionId = receptionId;
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
   * @return the dateAllotted
   */
  public Date getDateAllotted() {
    return dateAllotted;
  }

  /**
   * @param dateAllotted
   *          the dateAllotted to set
   */
  public void setDateAllotted(Date dateAllotted) {
    this.dateAllotted = dateAllotted;
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
   * @return the locationId
   */
  public long getLocationId() {
    return locationId;
  }

  /**
   * @param locationId
   *          the locationId to set
   */
  public void setLocationId(long locationId) {
    this.locationId = locationId;
  }
  
  /**
   * @return the zoneId
   */
  public long getZoneId() {
    return zoneId;
  }

  /**
   * @param zoneId
   *          the zoneId to set
   */
  public void setZoneId(long zoneId) {
    this.zoneId = zoneId;
  }
  

  @Override
  public String toString() {
    return "cattleType:" + cattleType + ";dateAllotted:" + dateAllotted + ";locationId:" + locationId + ";zoneId:" + zoneId + ";rancherId:" + rancherId
        + ";receptionId:" + receptionId + ";";
  }
  
  @Override
  public boolean equals(Object obj) {
    if(obj instanceof Reception){
      return this.getReceptionId() == ((Reception) obj).getReceptionId();
    }
    return false;
  }
}
