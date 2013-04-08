package com.tramex.sisoprega.dto;

public class HermanaExpense {
  private long expenseId;
  private long conceptId;
  private long hermanaId;
  private double amount;
  /**
   * @return the expenseId
   */
  public long getExpenseId() {
    return expenseId;
  }
  /**
   * @param expenseId the expenseId to set
   */
  public void setExpenseId(long expenseId) {
    this.expenseId = expenseId;
  }
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
   * @return the conceptId
   */
  public long getConceptId() {
    return conceptId;
  }
  /**
   * @param conceptId the conceptId to set
   */
  public void setConceptId(long conceptId) {
    this.conceptId = conceptId;
  }
  
  @Override
  public String toString() {
    return "expenseId:" + expenseId + ";hermanaId:" + hermanaId + ";amount:" + amount + ";";
  }
}
