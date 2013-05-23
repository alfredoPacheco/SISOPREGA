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
 * 12/16/2012  Diego Torres                   Enable toString method functionality.
 * ====================================================================================
 * </PRE>
 * 
 * @author Jaime Figueroa
 * 
 */
public class PenCapacity {
  private long penCapacityId;
  private long catclassId;
  private long headCount;
  private Pen pen;

  /**
   * @return the pen
   */
  public Pen getPen() {
    return pen;
  }

  /**
   * @param pen
   *          the pen to set
   */
  public void setPen(Pen pen) {
    this.pen = pen;
  }

  /**
   * @return the penCapacityId
   */
  public long getPenCapacityId() {
    return penCapacityId;
  }

  /**
   * @param penCapacityId
   *          the penCapacityId to set
   */
  public void setCapacityId(long penCapacityId) {
    this.penCapacityId = penCapacityId;
  }

  /**
   * @return the catclassId
   */
  public long getCatclassId() {
    return catclassId;
  }

  /**
   * @param catclassId
   *          the catclassId to set
   */
  public void setCatclassId(long catclassId) {
    this.catclassId = catclassId;
  }

  /**
   * @return the headCount
   */
  public long getHeadCount() {
    return headCount;
  }

  /**
   * @param headCount
   *          the headCount to set
   */
  public void setHeadCount(long headCount) {
    this.headCount = headCount;
  }

  @Override
  public String toString() {
    return "capacityId:" + penCapacityId + ";catclassId:" + catclassId + ";headCount:" + headCount + ";";
  }

  @Override
  public boolean equals(Object obj) {
    System.out.println("Comparing current [" + this + "] against: " + obj);
    if (obj instanceof PenCapacity) {
      PenCapacity pcObj = (PenCapacity) obj;
      if (pcObj.getPen() != null && pen != null)
        return pcObj.getCatclassId() == catclassId;
      else
        return false;
    } else
      return false;

  }
}
