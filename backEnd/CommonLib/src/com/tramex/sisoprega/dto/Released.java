package com.tramex.sisoprega.dto;

public class Released {
  private long receptionId;
  private long rancherId;
  private long cattleType;
  private String cattleName;
  private long heads;
  private double weight;
  private long rejects_heads;
  private double rejects_weight;
  /**
   * @return the receptionId
   */
  public long getReceptionId() {
    return receptionId;
  }
  /**
   * @param receptionId the receptionId to set
   */
  public void setReceptionId(long receptionId) {
    this.receptionId = receptionId;
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
   * @return the cattleType
   */
  public long getCattleType() {
    return cattleType;
  }
  /**
   * @param cattleType the cattleType to set
   */
  public void setCattleType(long cattleType) {
    this.cattleType = cattleType;
  }
  /**
   * @return the cattleName
   */
  public String getCattleName() {
    return cattleName;
  }
  /**
   * @param cattleName the cattleName to set
   */
  public void setCattleName(String cattleName) {
    this.cattleName = cattleName;
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
   * @return the rejects_heads
   */
  public long getRejects_heads() {
    return rejects_heads;
  }
  /**
   * @param rejects_heads the rejects_heads to set
   */
  public void setRejects_heads(long rejects_heads) {
    this.rejects_heads = rejects_heads;
  }
  /**
   * @return the rejects_weight
   */
  public double getRejects_weight() {
    return rejects_weight;
  }
  /**
   * @param rejects_weight the rejects_weight to set
   */
  public void setRejects_weight(double rejects_weight) {
    this.rejects_weight = rejects_weight;
  }
}
