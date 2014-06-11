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
 * Sale data model for us operations.
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
public class Sale {
  private long saleId;
  private long customerId;
  private Date saleDate = new Date();
  private Set<SaleDetail> SaleDetail;
  
  /**
   * @return the saleId
   */
  public long getSaleId() {
    return saleId;
  }
  /**
   * @param saleId the saleId to set
   */
  public void setSaleId(long saleId) {
    this.saleId = saleId;
  }
  /**
   * @return the customerId
   */
  public long getCustomerId() {
    return customerId;
  }
  /**
   * @param customerId the customerId to set
   */
  public void setCustomerId(long customerId) {
    this.customerId = customerId;
  }
  
  /**
   * @return the saleDate
   */
  public Date getSaleDate() {
    return saleDate;
  }
  /**
   * @param saleDate the saleDate to set
   */
  public void setSaleDate(Date saleDate) {
    this.saleDate = saleDate;
  }
  /**
   * @return the SaleDetail
   */
  public Set<SaleDetail> getSaleDetail() {
    return SaleDetail;
  }
  /**
   * @param SaleDetail the SaleDetail to set
   */
  public void setSaleDetail(Set<SaleDetail> SaleDetail) {
    this.SaleDetail = SaleDetail;
  }
  
  public void addSaleDetail(SaleDetail detail){
    if(SaleDetail == null)
      SaleDetail = new HashSet<SaleDetail>();

    
    SaleDetail.add(detail);
    
    if(detail.getSale() != this)
      detail.setSale(this);
    
  }
  
  @Override
  public String toString() {
    return "saleId:" + saleId + ";customerId:" + customerId + ";";
  }

}
