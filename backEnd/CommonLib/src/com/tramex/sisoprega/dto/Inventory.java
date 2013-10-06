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
 * USAGE COMMENT HERE
 *  
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * Aug 4, 2013     Diego Torres                 Initial Version.
 * 09/28/2013   Alfredo Pacheco             Fields added for controlling heads in pen
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 *
 * 
 */
public class Inventory {
  private long inventoryId;
  private long cattypeId;
  private long qualityId;
  private long penId;
  private long heads;
  private double weight;
  private double feed;
  private long availableToSell;
  private long sold;
  private long availableToProgramShip;
  private long programmedToShip;
  private long availableToShip;
  private long shipped;
  private Date cycleCompleted = null;
  
  
  private Set<Shrinkage> shrinkage;
  private Set<FeedUS> feedUS;
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
   * @return the cattypeId
   */
  public long getCattypeId() {
    return cattypeId;
  }
  /**
   * @param cattypeId the cattypeId to set
   */
  public void setCattypeId(long cattypeId) {
    this.cattypeId = cattypeId;
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
   * @return the barnyardId
   */
  public long getPenId() {
    return penId;
  }
  /**
   * @param barnyardId the barnyardId to set
   */
  public void setPenId(long penId) {
    this.penId = penId;
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
   * @return the feed
   */
  public double getFeed() {
    return feed;
  }
  /**
   * @param feed the feed to set
   */
  public void setFeed(double feed) {
    this.feed = feed;
  }
  /**
   * @return the shrinkage
   */
  public Set<Shrinkage> getShrinkage() {
    return shrinkage;
  }
  /**
   * @param shrinkage the shrinkage to set
   */
  public void setShrinkage(Set<Shrinkage> shrinkage) {
    this.shrinkage = shrinkage;
  }
  
  public void addShrinkage(Shrinkage objShrinkage){
    if(shrinkage == null)
      shrinkage = new HashSet<Shrinkage>();

    
    shrinkage.add(objShrinkage);
    
    if(objShrinkage.getInventory() != this)
      objShrinkage.setInventory(this);
    
  }
  /**
   * @return the feedUS
   */
  public Set<FeedUS> getFeedUS() {
    return feedUS;
  }
  /**
   * @param feedUS the feedUS to set
   */
  public void setFeedUS(Set<FeedUS> feedUS) {
    this.feedUS = feedUS;
  }
  
  public void addFeedUS(FeedUS objFeedUS){
    if(feedUS == null)
      feedUS = new HashSet<FeedUS>();
    
    feedUS.add(objFeedUS);
    
    if(objFeedUS.getInventory() != this)
      objFeedUS.setInventory(this);
    
  }
  /**
   * @return the availableToSell
   */
  public long getAvailableToSell() {
    return availableToSell;
  }
  /**
   * @param availableToSell the availableToSell to set
   */
  public void setAvailableToSell(long availableToSell) {
    this.availableToSell = availableToSell;
  }
  /**
   * @return the sold
   */
  public long getSold() {
    return sold;
  }
  /**
   * @param sold the sold to set
   */
  public void setSold(long sold) {
    this.sold = sold;
  }
  /**
   * @return the availableToProgramShip
   */
  public long getAvailableToProgramShip() {
    return availableToProgramShip;
  }
  /**
   * @param availableToProgramShip the availableToProgramShip to set
   */
  public void setAvailableToProgramShip(long availableToProgramShip) {
    this.availableToProgramShip = availableToProgramShip;
  }
  /**
   * @return the programmedToShip
   */
  public long getProgrammedToShip() {
    return programmedToShip;
  }
  /**
   * @param programmedToShip the programmedToShip to set
   */
  public void setProgrammedToShip(long programmedToShip) {
    this.programmedToShip = programmedToShip;
  }
  /**
   * @return the availableToShip
   */
  public long getAvailableToShip() {
    return availableToShip;
  }
  /**
   * @param availableToShip the availableToShip to set
   */
  public void setAvailableToShip(long availableToShip) {
    this.availableToShip = availableToShip;
  }
  /**
   * @return the shipped
   */
  public long getShipped() {
    return shipped;
  }
  /**
   * @param shipped the shipped to set
   */
  public void setShipped(long shipped) {
    this.shipped = shipped;
  }
  /**
   * @return the cycleCompleted
   */
  public Date getCycleCompleted() {
    return cycleCompleted;
  }
  /**
   * @param cycleCompleted the cycleCompleted to set
   */
  public void setCycleCompleted(Date cycleCompleted) {
    this.cycleCompleted = cycleCompleted;
  }
  
}
