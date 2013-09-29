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
 * USAGE COMMENT HERE
 *  
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 09/23/2013  Alfredo Pacheco              Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Alfredo Pacheco
 *
 * 
 */
public class FeedUS {
  private long feedUSId;
  private Date dateTime = new Date();  
  private double quantity;  
  private Inventory inventory;
  
  /**
   * @return the feedUSId
   */
  public long getFeedUSId() {
    return feedUSId;
  }
  /**
   * @param feedUSId the feedUSId to set
   */
  public void setFeedUSId(long feedUSId) {
    this.feedUSId = feedUSId;
  }
  /**
   * @return the quantity
   */
  public double getQuantity() {
    return quantity;
  }
  /**
   * @param quantity the quantity to set
   */
  public void setQuantity(double quantity) {
    this.quantity = quantity;
  }
  /**
   * @return the dateTime
   */
  public Date getDateTime() {
    return dateTime;
  }
  /**
   * @param dateTime the dateTime to set
   */
  public void setDateTime(Date dateTime) {
    this.dateTime = dateTime;
  }
  /**
   * @return the inventory
   */
  public Inventory getInventory() {
    return inventory;
  }
  /**
   * @param inventory the comment to set
   */
  public void setInventory(Inventory inventory) {
    this.inventory = inventory;
  }
}