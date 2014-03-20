/**
 * 
 */
package com.tramex.sisoprega.dto;

import java.util.Date;

/**
 * @author Alfredo
 *
 */
public class PaymentToSchedule {
  private int id;
  private long recordId;
  private String operation;
  private String who;
  private Date operationTime;
  private String description;
  private long heads;
  private double weight;
  private double amount;
  private Date whenToPay;
 
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
   * @param recordId the recordId to set
   */
  public void setRecordId(long recordId) {
    this.recordId = recordId;
  }
  /**
   * @return the operation
   */
  public String getOperation() {
    return operation;
  }
  /**
   * @param operation the operation to set
   */
  public void setOperation(String operation) {
    this.operation = operation;
  }
  /**
   * @return the operationTime
   */
  public Date getOperationTime() {
    return operationTime;
  }
  /**
   * @param operationTime the operationTime to set
   */
  public void setOperationTime(Date operationTime) {
    this.operationTime = operationTime;
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
   * @return the who
   */
  public String getWho() {
    return who;
  }
  /**
   * @param who the who to set
   */
  public void setWho(String who) {
    this.who = who;
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
  public double getAmount() {
    return amount;
  }
  /**
   * @param amount the amount to set
   */
  public void setAmount(double amount) {
    this.amount = amount;
  }
  /**
   * @return the whenToPay
   */
  public Date getWhenToPay() {
    return whenToPay;
  }
  /**
   * @param whenToPay the whenToPay to set
   */
  public void setWhenToPay(Date whenToPay) {
    this.whenToPay = whenToPay;
  }
  
}
