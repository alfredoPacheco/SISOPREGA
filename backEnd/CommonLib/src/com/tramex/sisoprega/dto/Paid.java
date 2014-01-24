/**
 * 
 */
package com.tramex.sisoprega.dto;

import java.util.Date;

/**
 * @author Alfredo
 *
 */
public class Paid {
  private int id;
  private long recordId;
  private String paymentClass;
  private Date paymentDate;
  private float amount;
  private String concept;
  private String description;
  private String creditor;
  
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
   * @return the recordId
   */
  public long getRecordId() {
    return recordId;
  }
  /**
   * @param recordId the record_id to set
   */
  public void setRecordId(long record_id) {
    this.recordId = record_id;
  }
  /**
   * @return the paymentClass
   */
  public String getPaymentClass() {
    return paymentClass;
  }
  /**
   * @param paymentClass the paymentClass to set
   */
  public void setPaymentClass(String paymentClass) {
    this.paymentClass = paymentClass;
  }
  /**
   * @return the paymentDate
   */
  public Date getPaymentDate() {
    return paymentDate;
  }
  /**
   * @param paymentDate the paymentDate to set
   */
  public void setPaymentDate(Date paymentDate) {
    this.paymentDate = paymentDate;
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
  /**
   * @return the concept
   */
  public String getConcept() {
    return concept;
  }
  /**
   * @param concept the concept to set
   */
  public void setConcept(String concept) {
    this.concept = concept;
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
   * @return the creditor
   */
  public String getCreditor() {
    return creditor;
  }
  /**
   * @param creditor the creditor to set
   */
  public void setCreditor(String creditor) {
    this.creditor = creditor;
  }
  
  
}
