/**
 * 
 */
package com.tramex.sisoprega.dto;

import java.util.Date;

/**
 * @author Alfredo
 *
 */
public class Collected {
  private int id;
  private String saleClass;
  private long recordId;
  private int folio;
  private Date collectedDate;
  private String customer;
  private String description;
  private float amount;
  /**
   * @return the id
   */
  public int getId() {
    return id;
  }
  /**
   * @param id the id to set
   */
  public void setId(int id) {
    this.id = id;
  }
  /**
   * @return the saleClass
   */
  public String getSaleClass() {
    return saleClass;
  }
  /**
   * @param saleClass the saleClass to set
   */
  public void setSaleClass(String saleClass) {
    this.saleClass = saleClass;
  }
  /**
   * @return the recordId
   */
  public long getRecordId() {
    return recordId;
  }
  /**
   * @param recordId the recordId to set
   */
  public void setRecordId(long recordId) {
    this.recordId = recordId;
  }
  /**
   * @return the folio
   */
  public int getFolio() {
    return folio;
  }
  /**
   * @param folio the folio to set
   */
  public void setFolio(int folio) {
    this.folio = folio;
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
   * @return the customer
   */
  public String getCustomer() {
    return customer;
  }
  /**
   * @param customer the customer to set
   */
  public void setCustomer(String customer) {
    this.customer = customer;
  }
  /**
   * @return the description
   */
  public String getDescription() {
    return description;
  }
  /**
   * @param description the description to set
   */
  public void setDescription(String description) {
    this.description = description;
  }
  /**
   * @return the amount
   */
  public float getAmount() {
    return amount;
  }
  /**
   * @param amount the amount to set
   */
  public void setAmount(float amount) {
    this.amount = amount;
  }
  
  
}
