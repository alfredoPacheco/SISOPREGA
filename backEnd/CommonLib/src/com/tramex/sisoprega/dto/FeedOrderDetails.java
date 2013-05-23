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
 * Defines the model for the Cattle Type entity.<BR/>
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 12/12/2012  Jaime Figueroa                 Initial Version.
 * 12/16/2012  Diego Torres                   Adding toString implementation.
 * ====================================================================================
 * </PRE>
 * 
 * @author Jaime Figueroa
 * 
 */
public class FeedOrderDetails {
  private long feedOrderDetailsId;
  private long orderId;
  private long foodId;
  private double quantity;

  /**
   * @return the feedOrderDetailsid
   */
  public long getFeedOrderDetailsId() {
    return feedOrderDetailsId;
  }

  /**
   * @param feedOrderDetailsid
   *          the id to set
   */
  public void setFeedOrderDetailsId(long feedOrderDetailsId) {
    this.feedOrderDetailsId = feedOrderDetailsId;
  }

  /**
   * @return the orderId
   */
  public long getOrderId() {
    return orderId;
  }

  /**
   * @param orderId
   *          the orderId to set
   */
  public void setOrderId(long orderId) {
    this.orderId = orderId;
  }

  /**
   * @return the foodId
   */
  public long getFoodId() {
    return foodId;
  }

  /**
   * @param foodId
   *          the foodId to set
   */
  public void setFoodId(long foodId) {
    this.foodId = foodId;
  }

  /**
   * @return the quantity
   */
  public double getQuantity() {
    return quantity;
  }

  /**
   * @param quantity
   *          the quantity to set
   */
  public void setQuantity(double quantity) {
    this.quantity = quantity;
  }

  @Override
  public String toString(){
    return "fodId:" + feedOrderDetailsId + ";foodId:" + foodId + ";orderId:" + orderId + ";quantity:" + quantity + ";";
  }
}
