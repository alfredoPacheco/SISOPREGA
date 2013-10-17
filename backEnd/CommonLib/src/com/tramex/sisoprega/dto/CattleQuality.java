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
 * Cattle Quality data model
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * Apr 7, 2013     Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 * 
 */
public class CattleQuality {
  private long cattleQualityId;
  private String qualityName;
  private double minWeight;
  private double maxWeight;
  private boolean forHorses = false;

  /**
   * @return the cattleQualityId
   */
  public long getCattleQualityId() {
    return cattleQualityId;
  }

  /**
   * @param cattleQualityId
   *          the cattleQualityId to set
   */
  public void setCattleQualityId(long qualityId) {
    this.cattleQualityId = qualityId;
  }

  /**
   * @return the qualityName
   */
  public String getQualityName() {
    return qualityName;
  }

  /**
   * @param qualityName
   *          the qualityName to set
   */
  public void setQualityName(String qualityName) {
    this.qualityName = qualityName;
  }

  /**
   * @return the minWeight
   */
  public double getMinWeight() {
    return minWeight;
  }

  /**
   * @param minWeight
   *          the minWeight to set
   */
  public void setMinWeight(double minWeight) {
    this.minWeight = minWeight;
  }

  /**
   * @return the maxWeight
   */
  public double getMaxWeight() {
    return maxWeight;
  }

  /**
   * @param maxWeight
   *          the maxWeight to set
   */
  public void setMaxWeight(double maxWeight) {
    this.maxWeight = maxWeight;
  }

  /**
   * @return the forHorses
   */
  public boolean isForHorses() {
    return forHorses;
  }

  /**
   * @param forHorses the forHorses to set
   */
  public void setForHorses(boolean forHorses) {
    this.forHorses = forHorses;
  }

  @Override
  public String toString() {
    return "qualityId:" + cattleQualityId + ";qualityName:" + qualityName + ";minWeight:" + minWeight + ";maxWeight:" + maxWeight + ";isForHorses:" + forHorses + ";";
  }
}
