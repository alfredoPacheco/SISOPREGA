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
 * data model for hermana corte records.
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
public class HermanaCorte {
  private long hermanaCorteId;
  private long barnyardId;
  private long qualityId;
  private long heads;
  private double weight;
  private Hermana hermana;
  private long cutSeq;
  private Date paidDate;
  private double paidAmount = 0.0d;
  private double purchasePrice = 0.0d;
  private boolean settled=false;
  
  
  /**
   * @return the hermanaCorteId
   */
  public long getHermanaCorteId() {
    return hermanaCorteId;
  }
  /**
   * @param hermanaCorteId the hermanaCorteId to set
   */
  public void setHermanaCorteId(long hermanaCorteId) {
    this.hermanaCorteId = hermanaCorteId;
  }
  /**
   * @return the barnyardId
   */
  public long getBarnyardId() {
    return barnyardId;
  }
  /**
   * @param barnyardId the barnyardId to set
   */
  public void setBarnyardId(long barnyardId) {
    this.barnyardId = barnyardId;
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
   * @return the hermana
   */
  public Hermana getHermana() {
    return hermana;
  }
  /**
   * @return the cutSeq
   */
  public long getCutSeq() {
    return cutSeq;
  }
  /**
   * @param cutSeq the cutSeq to set
   */
  public void setCutSeq(long cutSeq) {
    this.cutSeq = cutSeq;
  }
  /**
   * @param hermana the hermana to set
   */
  public void setHermana(Hermana hermana) {
    this.hermana = hermana;
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
    return "corte:" + hermanaCorteId + ";barnyardId:" + barnyardId + ";qualityId:" + qualityId + ";heads:" + heads + ";weight:" + weight + ";";
  }
  
}
