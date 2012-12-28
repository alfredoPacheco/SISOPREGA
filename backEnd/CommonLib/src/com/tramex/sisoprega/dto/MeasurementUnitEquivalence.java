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
 * 12/16/2012  Diego Torres                   Adding toString implementation.
 * ====================================================================================
 * </PRE>
 * 
 * @author Jaime Figueroa
 * 
 */
public class MeasurementUnitEquivalence {
  private long equivalenceId;
  private long unitSrc;
  private long unitDest;
  private double equivalence;

  /**
   * @return the equivalenceId
   */
  public long getEquivalenceId() {
    return equivalenceId;
  }

  /**
   * @param equivalenceId
   *          the equivalenceId to set
   */
  public void setEquivalenceId(long equivalenceId) {
    this.equivalenceId = equivalenceId;
  }

  /**
   * @return the unitSrc
   */
  public long getUnitSrc() {
    return unitSrc;
  }

  /**
   * @param unitSrc
   *          the unitSrc to set
   */
  public void setUnitSrc(long unitSrc) {
    this.unitSrc = unitSrc;
  }

  /**
   * @return the unitDest
   */
  public long getUnitDest() {
    return unitDest;
  }

  /**
   * @param unitDest
   *          the unitDest to set
   */
  public void setUnitDest(long unitDest) {
    this.unitDest = unitDest;
  }

  /**
   * @return the equivalence
   */
  public Double getEquivalence() {
    return equivalence;
  }

  /**
   * @param equivalence
   *          the equivalence to set
   */
  public void setEquivalence(Double equivalence) {
    this.equivalence = equivalence;
  }

  @Override
  public String toString() {
    return "equivalence:" + equivalence + ";equivalenceId:" + equivalenceId + ";unitDest:" + unitDest + ";unitSrc:" + unitSrc
        + ";";
  }
}
