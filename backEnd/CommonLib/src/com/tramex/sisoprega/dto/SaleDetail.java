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
 * sale detail data model.
 *  
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * Apr 18, 2013     Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 *
 * 
 */
public class SaleDetail {
  private long saleDetailId;
  private long penId;
  private long qualityId;
  private long heads;
  private double weight;
  private Sale sale;
  
  /**
   * @return the saleDetailId
   */
  public long getSaleDetailId() {
    return saleDetailId;
  }
  /**
   * @param saleDetailId the saleDetailId to set
   */
  public void setSaleDetailId(long saleDetailId) {
    this.saleDetailId = saleDetailId;
  }
  /**
   * @return the penId
   */
  public long getPenId() {
    return penId;
  }
  /**
   * @param penId the penId to set
   */
  public void setPenId(long penId) {
    this.penId = penId;
  }
  /**
   * @return the qualityId
   */
  public long getQualityId() {
    return qualityId;
  }
  /**
   * @param qualityId the qualityId to set
   */
  public void setQualityId(long qualityId) {
    this.qualityId = qualityId;
  }
  /**
   * @return the heads
   */
  public long getHeads() {
    return heads;
  }
  /**
   * @param heads the heads to set
   */
  public void setHeads(long heads) {
    this.heads = heads;
  }
  /**
   * @return the weight
   */
  public double getWeight() {
    return weight;
  }
  /**
   * @param weight the weight to set
   */
  public void setWeight(double weight) {
    this.weight = weight;
  }

  /**
   * @return the sale
   */
  public Sale getSale() {
    return sale;
  }
  /**
   * @param sale the sale to set
   */
  public void setSale(Sale sale) {
    this.sale = sale;
  }
  
  @Override
  public String toString() {
    return "recordId:" + saleDetailId + ";penId:" + penId + ";qualityId:" + qualityId + ";heads:" + heads + ";weight:" + weight + ";";
  }
  
}