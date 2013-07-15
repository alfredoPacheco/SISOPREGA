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
 * Defines the model for the Rancher Contact entity.<BR/>
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 11/11/2012  Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 */

public class CattleClass {
  private long cattleClassId;
  private String catclassName;
  private Set<CattleType> cattleType;

  /**
   * @return the catclassId
   */
  public long getCattleClassId() {
    return cattleClassId;
  }

  /**
   * @param catclassId
   *          the catclassId to set
   */
  public void setCattleClassId(long cattleClassId) {
    this.cattleClassId = cattleClassId;
  }

  /**
   * @return the catclassName
   */
  public String getCatclassName() {
    return catclassName;
  }

  /**
   * @param catclassName
   *          the catclassName to set
   */
  public void setCatclassName(String catclassName) {
    this.catclassName = catclassName;
  }

  /**
   * @return the cattleType
   */
  public Set<CattleType> getCattleType() {
    return cattleType;
  }

  /**
   * @param cattleType the cattleType to set
   */
  public void setCattleType(Set<CattleType> cattleType) {
    this.cattleType = cattleType;
  }
  
  public void addCattleType(CattleType type){
    if(cattleType == null)
      cattleType = new HashSet<CattleType>();
    
    if(!cattleType.contains(type))
      cattleType.add(type);
    
    if(type.getCattleClass() != this)
      type.setCattleClass(this);
  }
  
  @Override
  public boolean equals(Object obj) {
    if(obj instanceof CattleClass){
      return this.getCattleClassId() == ((CattleClass) obj).getCattleClassId();
    }
    return false;
  }
  
  @Override
  public String toString() {
    return "catclassId:" + cattleClassId + ";catclassName:" + catclassName + ";";
  }
  
}
