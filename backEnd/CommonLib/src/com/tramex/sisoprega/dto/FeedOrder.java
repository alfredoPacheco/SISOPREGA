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
 * Defines the model for the Feed Order Type entity.<BR/>
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 12/01/2012  Jaime Figueroa                 Initial Version.
 * 12/16/2012  Diego Torres                   Adding toString implementation.
 * ====================================================================================
 * </PRE>
 * 
 * @author Jaime Figueroa
 * 
 */
public class FeedOrder {
  private long feedOrderId;
  private Date feedDate;
  private String feedOriginator;
  private String handling;
  private Reception reception;
  private Set<FeedOrderDetails> feedOrderDetails;
  private Set<Pen> pen;

  /**
   * @return the feedOrderId
   */
  public long getFeedOrderId() {
    return feedOrderId;
  }

  /**
   * @param feedOrderId
   *          the orderId to set
   */
  public void setFeedOrderId(long feedOrderId) {
    this.feedOrderId = feedOrderId;
  }

  /**
   * @return the feedDate
   */
  public Date getFeedDate() {
    return feedDate;
  }

  /**
   * @param feedDate
   *          the feedDate to set
   */
  public void setFeedDate(Date feedDate) {
    this.feedDate = feedDate;
  }

  /**
   * @return the feedOriginator
   */
  public String getFeedOriginator() {
    return feedOriginator;
  }

  /**
   * @param feedOriginator
   *          the feedOriginator to set
   */
  public void setFeedOriginator(String feedOriginator) {
    this.feedOriginator = feedOriginator;
  }

  /**
   * @return the handling
   */
  public String getHandling() {
    return handling;
  }

  /**
   * @param handling
   *          the handling to set
   */
  public void setHandling(String handling) {
    this.handling = handling;
  }

  /**
   * @return the reception
   */
  public Reception getReception() {
    return reception;
  }

  /**
   * @param reception the reception to set
   */
  public void setReception(Reception reception) {
    this.reception = reception;
  }

  /**
   * @return the feedOrderDetails
   */
  public Set<FeedOrderDetails> getFeedOrderDetails() {
    return feedOrderDetails;
  }

  /**
   * @param feedOrderDetails the feedOrderDetails to set
   */
  public void setFeedOrderDetails(Set<FeedOrderDetails> feedOrderDetails) {
    this.feedOrderDetails = feedOrderDetails;
  }
  
  public void addFeedOrderDetails(FeedOrderDetails orderDetails){
    if(feedOrderDetails == null)
      feedOrderDetails = new HashSet<FeedOrderDetails>();
    
    feedOrderDetails.add(orderDetails);
    
    if(orderDetails.getFeedOrder() != this)
      orderDetails.setFeedOrder(this);
  }

  /**
   * @return the pen
   */
  public Set<Pen> getPen() {
    return pen;
  }

  /**
   * @param pen the pen to set
   */
  public void setPen(Set<Pen> pen) {
    this.pen = pen;
  }
  
  public void addPen(Pen inPen){
    if(pen==null)
      pen = new HashSet<Pen>();
  }

  @Override
  public boolean equals(Object obj) {
    if(obj instanceof FeedOrder){
      return this.getFeedOrderId() == ((FeedOrder) obj).getFeedOrderId();
    }
    return false;
  }
  
  @Override
  public String toString() {
    return "feedDate:" + feedDate + ";feedOriginator:" + feedOriginator + ";handling:" + handling + ";orderId:" + feedOrderId
        + ";";
  }
}
