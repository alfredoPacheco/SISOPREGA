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
public class MeasurementUnit {
  private long unitId;
  private String unitName;
  private String unitAbreviation;

  /**
   * @return the unitId
   */
  public long getUnitId() {
    return unitId;
  }

  /**
   * @param unitId
   *          the unitId to set
   */
  public void setUnitId(long unitId) {
    this.unitId = unitId;
  }

  /**
   * @return the unitName
   */
  public String getUnitName() {
    return unitName;
  }

  /**
   * @param unitName
   *          the unitName to set
   */
  public void setUnitName(String unitName) {
    this.unitName = unitName;
  }

  /**
   * @return the unitAbreviation
   */
  public String getUnitAbreviation() {
    return unitAbreviation;
  }

  /**
   * @param unitAbreviation
   *          the unitAbreviation to set
   */
  public void setUnitAbreviation(String unitAbreviation) {
    this.unitAbreviation = unitAbreviation;
  }
  
  @Override
  public String toString(){
    return "unitAbrebiation:" + unitAbreviation + ";unitId:" + unitId + ";unitName:" + unitName + ";";
  }
}
