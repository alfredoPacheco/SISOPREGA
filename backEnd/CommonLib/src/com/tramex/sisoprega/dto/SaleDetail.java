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
  private long sale_seq;
  private long inventoryId;
  private Sale sale;
  private double salePrice = 0.0d;
  private Date collectedDate;
  private double collectedAmount = 0.0d;
  private boolean settled=false;
  
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
  
  /**
   * @return the sale_seq
   */
  public long getSale_seq() {
    return sale_seq;
  }
  /**
   * @param sale_seq the sale_seq to set
   */
  public void setSale_seq(long sale_seq) {
    this.sale_seq = sale_seq;
  }
  /**
   * @return the inventoryId
   */
  public long getInventoryId() {
    return inventoryId;
  }
  /**
   * @param inventoryId the inventoryId to set
   */
  public void setInventoryId(long inventoryId) {
    this.inventoryId = inventoryId;
  }
  /**
   * @return the salePrice
   */
  public double getSalePrice() {
    return salePrice;
  }
  /**
   * @param salePrice the salePrice to set
   */
  public void setSalePrice(double salePrice) {
    this.salePrice = salePrice;
  }
  /**
   * @return the collectedDate
   */
  public Date getCollectedDate() {
    return collectedDate;
  }
  /**
   * @param collectedDate the collectedDate to set
   */
  public void setCollectedDate(Date collectedDate) {
    this.collectedDate = collectedDate;
  }
  /**
   * @return the collectedAmount
   */
  public double getCollectedAmount() {
    return collectedAmount;
  }
  /**
   * @param collectedAmount the collectedAmount to set
   */
  public void setCollectedAmount(double collectedAmount) {
    this.collectedAmount = collectedAmount;
  }
 
  /**
   * @return the settled
   */
  public boolean isSettled() {
    return settled;
  }
  /**
   * @param settled the settled to set
   */
  public void setSettled(boolean settled) {
    this.settled = settled;
  }
  @Override
  public String toString() {
    return "recordId:" + saleDetailId + ";penId:" + penId + ";qualityId:" + qualityId + ";heads:" + heads + ";weight:" + weight + ";sale_seq:" + sale_seq + ";inventoryId:" + inventoryId + ";salePrice:" + salePrice + ";";
  }
  
}
