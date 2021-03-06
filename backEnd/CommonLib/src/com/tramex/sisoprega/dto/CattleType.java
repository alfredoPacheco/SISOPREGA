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
 * Defines the model for the Cattle Type entity.<BR/>
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 18/11/2012  Jaime Figueroa                 Initial Version.
 * 12/16/2012  Diego Torres                   Adding toString method.
 * ====================================================================================
 * </PRE>
 * 
 * @author Jaime Figueroa
 * 
 */

public class CattleType {
  private long cattleTypeId;
  private String cattypeName;
  private CattleClass cattleClass;
  

  /**
   * @return the cattleTypeId
   */
  public long getCattleTypeId() {
    return cattleTypeId;
  }

  /**
   * @param cattleTypeId
   *          the cattypeId to set
   */
  public void setCattleTypeId(long cattleTypeId) {
    this.cattleTypeId = cattleTypeId;
  }

  /**
   * @return the cattypeName
   */
  public String getCattypeName() {
    return cattypeName;
  }

  /**
   * @param cattypeName
   *          the cattypeName to set
   */
  public void setCattypeName(String cattypeName) {
    this.cattypeName = cattypeName;
  }

  /**
   * @return the cattleClass
   */
  public CattleClass getCattleClass() {
    return cattleClass;
  }

  /**
   * @param cattleClass the cattleClass to set
   */
  public void setCattleClass(CattleClass cattleClass) {
    this.cattleClass = cattleClass;
  }

  @Override
  public String toString() {
    return "cattypeId:" + cattleTypeId + ";cattypeName:" + cattypeName + ";";
  }
}
