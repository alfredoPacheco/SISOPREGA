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
 * cattle purchase details data model.
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
public class PurchaseDetail {
  private long purchaseDetailId;
  private long penId;
  private long qualityId;
  private long heads;
  private double weight;
  private Purchase purchase;
  private double purchasePrice = 0.0d;
  private Date paidDate;
  private double paidAmount = 0.0d;
  private boolean settled=false;
  private long cattleTypeId;
  
  /**
   * @return the purchaseDetailId
   */
  public long getPurchaseDetailId() {
    return purchaseDetailId;
  }
  /**
   * @param purchaseDetailId the purchaseDetailId to set
   */
  public void setPurchaseDetailId(long purchaseDetailId) {
    this.purchaseDetailId = purchaseDetailId;
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
   * @return the purchase
   */
  public Purchase getPurchase() {
    return purchase;
  }
  /**
   * @param purchase the purchase to set
   */
  public void setPurchase(Purchase purchase) {
    this.purchase = purchase;
  }
  
  /**
   * @return the purchasePrice
   */
  public double getPurchasePrice() {
    return purchasePrice;
  }
  /**
   * @param purchasePrice the purchasePrice to set
   */
  public void setPurchasePrice(double purchasePrice) {
    this.purchasePrice = purchasePrice;
  }
  /**
   * @return the paidDate
   */
  public Date getPaidDate() {
    return paidDate;
  }
  /**
   * @param paidDate the paidDate to set
   */
  public void setPaidDate(Date paidDate) {
    this.paidDate = paidDate;
  }
  /**
   * @return the paidAmount
   */
  public double getPaidAmount() {
    return paidAmount;
  }
  /**
   * @param paidAmount the paidAmount to set
   */
  public void setPaidAmount(double paidAmount) {
    this.paidAmount = paidAmount;
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
  
  /**
   * @return the cattleTypeId
   */
  public long getCattleTypeId() {
    return cattleTypeId;
  }
  /**
   * @param cattleTypeId the cattleTypeId to set
   */
  public void setCattleTypeId(long cattleTypeId) {
    this.cattleTypeId = cattleTypeId;
  }
  
  
  @Override
  public String toString() {
    return "recordId:" + purchaseDetailId + ";penId:" + penId + ";cattleTypeId:" + cattleTypeId + ";qualityId:" + qualityId + ";heads:" + heads + ";weight:" + weight + ";purchasePrice:" + purchasePrice + ";";
  }
  
}
