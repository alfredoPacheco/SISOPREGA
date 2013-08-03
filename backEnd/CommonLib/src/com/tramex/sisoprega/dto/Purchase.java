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
import java.util.HashSet;
import java.util.Set;

/**
 * Cattle purchase data model for us operations.
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
public class Purchase {
  private long purchaseId;
  private long sellerId;
  private long cattleTypeId;
  private Date purchaseDate = new Date();
  private Set<PurchaseDetail> purchaseDetail;
  
  /**
   * @return the purchaseId
   */
  public long getPurchaseId() {
    return purchaseId;
  }
  /**
   * @param purchaseId the purchaseId to set
   */
  public void setPurchaseId(long purchaseId) {
    this.purchaseId = purchaseId;
  }
  /**
   * @return the sellerId
   */
  public long getSellerId() {
    return sellerId;
  }
  /**
   * @param sellerId the sellerId to set
   */
  public void setSellerId(long sellerId) {
    this.sellerId = sellerId;
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
  
  /**
   * @return the purchaseDate
   */
  public Date getPurchaseDate() {
    return purchaseDate;
  }
  /**
   * @param purchaseDate the purchaseDate to set
   */
  public void setPurchaseDate(Date purchaseDate) {
    this.purchaseDate = purchaseDate;
  }
  /**
   * @return the purchaseDetail
   */
  public Set<PurchaseDetail> getPurchaseDetail() {
    return purchaseDetail;
  }
  /**
   * @param purchaseDetail the purchaseDetail to set
   */
  public void setPurchaseDetail(Set<PurchaseDetail> purchaseDetail) {
    this.purchaseDetail = purchaseDetail;
  }
  
  public void addPurchaseDetail(PurchaseDetail detail){
    if(purchaseDetail == null)
      purchaseDetail = new HashSet<PurchaseDetail>();

    
    purchaseDetail.add(detail);
    
    if(detail.getPurchase() != this)
      detail.setPurchase(this);
    
  }
  
  @Override
  public String toString() {
    return "purchaseId:" + purchaseId + ";sellerId:" + sellerId + ";cattleTypeId:" + cattleTypeId + ";";
  }

}
