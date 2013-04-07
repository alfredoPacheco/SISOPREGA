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
 * Defines the model for the Hermana entity.<BR/>
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 04/06/2013  Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 */
public class Hermana {

  private long hermanaId;
  private String entryNo;
  private String refNo;
  private String consignee;
  private String accountOf;
  private long rancherId;
  private Date deWhen = new Date();
  private String hermanaBy;

  /**
   * @return the hermanaId
   */
  public long getHermanaId() {
    return hermanaId;
  }

  /**
   * @param hermanaId the hermanaId to set
   */
  public void setHermanaId(long hermanaId) {
    this.hermanaId = hermanaId;
  }

  /**
   * @return the entryNo
   */
  public String getEntryNo() {
    return entryNo;
  }

  /**
   * @param entryNo the entryNo to set
   */
  public void setEntryNo(String entryNo) {
    this.entryNo = entryNo;
  }

  /**
   * @return the refNo
   */
  public String getRefNo() {
    return refNo;
  }

  /**
   * @param refNo the refNo to set
   */
  public void setRefNo(String refNo) {
    this.refNo = refNo;
  }

  /**
   * @return the consignee
   */
  public String getConsignee() {
    return consignee;
  }

  /**
   * @param consignee the consignee to set
   */
  public void setConsignee(String consignee) {
    this.consignee = consignee;
  }

  /**
   * @return the accountOf
   */
  public String getAccountOf() {
    return accountOf;
  }

  /**
   * @param accountOf the accountOf to set
   */
  public void setAccountOf(String accountOf) {
    this.accountOf = accountOf;
  }

  /**
   * @return the rancherId
   */
  public long getRancherId() {
    return rancherId;
  }

  /**
   * @param rancherId the rancherId to set
   */
  public void setRancherId(long rancherId) {
    this.rancherId = rancherId;
  }

  /**
   * @return the deWhen
   */
  public Date getDeWhen() {
    return deWhen;
  }

  /**
   * @param deWhen the deWhen to set
   */
  public void setDeWhen(Date deWhen) {
    this.deWhen = deWhen;
  }

  /**
   * @return the hermanaBy
   */
  public String getHermanaBy() {
    return hermanaBy;
  }

  /**
   * @param hermanaBy the hermanaBy to set
   */
  public void setHermanaBy(String hermanaBy) {
    this.hermanaBy = hermanaBy;
  }

  @Override
  public String toString() {
    return "hermanaId:" + hermanaId + ";entryNo:" + entryNo + ";refNo:" + refNo + ";consignee:" + consignee + ";accountOf:"
        + accountOf + ";rancherId:" + rancherId + ";hermanaBy:" + hermanaBy + ";";
  }

}
