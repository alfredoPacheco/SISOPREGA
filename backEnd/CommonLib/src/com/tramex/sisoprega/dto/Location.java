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
 * Defines the model for the Rancher Contact entity.<BR/>
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 11/23/2012  Jaime Figueroa                Initial Version.
 * 12/16/2012  Diego Torres                  Adding toString implementation.
 * ====================================================================================
 * </PRE>
 * 
 * @author Jaime Figueroa
 * 
 */

public class Location {
  private long locationId;
  private String locationName;

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
   * @return the locationName
   */
  public String getLocationName() {
    return locationName;
  }

  /**
   * @param locationName
   *          the locationName to set
   */
  public void setLocationName(String locationName) {
    this.locationName = locationName;
  }

  @Override
  public String toString() {
    return "locationId:" + locationId + ";locationName:" + locationName + ";";
  }
}
