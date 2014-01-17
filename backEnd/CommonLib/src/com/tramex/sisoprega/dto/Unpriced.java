/**
 * 
 */
package com.tramex.sisoprega.dto;

import java.util.Date;

/**
 * @author Alfredo
 *
 */
public class Unpriced {
  private int id;
  private long recordId;
  private String operation;
  private Date operationTime;
  private long cattleTypeId;
  private String cattleTypeName;
  private long qualityId;
  private String qualityName;
  private long heads;
  private double weight;
  private double price;
 
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
   * @return the cattleTypeName
   */
  public String getCattleTypeName() {
    return cattleTypeName;
  }
  /**
   * @param cattleTypeName the cattleTypeName to set
   */
  public void setCattleTypeName(String cattleTypeName) {
    this.cattleTypeName = cattleTypeName;
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
   * @return the qualityName
   */
  public String getQualityName() {
    return qualityName;
  }
  /**
   * @param qualityName the qualityName to set
   */
  public void setQualityName(String qualityName) {
    this.qualityName = qualityName;
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
   * @return the price
   */
  public double getPrice() {
    return price;
  }
  /**
   * @param price the price to set
   */
  public void setPrice(double price) {
    this.price = price;
  }
  
}
