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

import java.util.ArrayList;
import java.util.List;

/**
 * Defines the model for the Barnyard entity.<BR/>
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 11/25/2012  Jaime Figueroa                 Initial Version.
 * 12/16/2012  Diego Torres                   Enable toString override functionality.
 * 05/21/2013  Diego Torres                   Rename from barnyard and handle capacity inside.
 * ====================================================================================
 * </PRE>
 * 
 * @author Jaime Figueroa
 * 
 */
public class Pen {
  private long penId;
  private String barnyardCode;
  private boolean available;
  private long locationId;
  private List<PenCapacity> penCapacity = new ArrayList<PenCapacity>();

  /**
   * @return the penCapacity
   */
  public List<PenCapacity> getPenCapacity() {
    return penCapacity;
  }

  /**
   * @param penCapacity
   *          the penCapacity to set
   */
  public void setPenCapacity(List<PenCapacity> penCapacity) {
    this.penCapacity = penCapacity;
  }

  public void addPenCapacity(PenCapacity capacity) {
    if (!penCapacity.contains(capacity))
      penCapacity.add(capacity);
  }

  /**
   * @return the barnyardId
   */
  public long getPenId() {
    return penId;
  }

  /**
   * @param barnyardId
   *          the barnyardId to set
   */
  public void setPenId(long penId) {
    this.penId = penId;
  }

  /**
   * @return the barnyardCode
   */
  public String getBarnyardCode() {
    return barnyardCode;
  }

  /**
   * @param barnyardCode
   *          the barnyardCode to set
   */
  public void setBarnyardCode(String barnyardCode) {
    this.barnyardCode = barnyardCode;
  }

  /**
   * @return the available
   */
  public boolean isAvailable() {
    return available;
  }

  /**
   * @param available
   *          the available to set
   */
  public void setAvailable(boolean available) {
    this.available = available;
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

  @Override
  public String toString() {
    return "available:" + available + ";barnyardCode:" + barnyardCode + ";barnyardId:" + penId + ";locationId:" + locationId
        + ";";
  }
}
