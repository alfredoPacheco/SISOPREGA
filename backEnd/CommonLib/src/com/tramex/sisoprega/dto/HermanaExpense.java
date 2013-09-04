package com.tramex.sisoprega.dto;

public class HermanaExpense {
  private long hermanaExpenseId;
  private long conceptId;
  private double amount;
  private Hermana hermana;
  
  /**
   * @return the hermanaExpenseId
   */
  public long getHermanaExpenseId() {
    return hermanaExpenseId;
  }
  /**
   * @param hermanaExpenseId the expenseId to set
   */
  public void setHermanaExpenseId(long hermanaExpenseId) {
    this.hermanaExpenseId = hermanaExpenseId;
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
  
  /**
   * @return the hermana
   */
  public Hermana getHermana() {
    return hermana;
  }
  /**
   * @param hermana the hermana to set
   */
  public void setHermana(Hermana hermana) {
    this.hermana = hermana;
  }
  @Override
  public String toString() {
    return "expenseId:" + hermanaExpenseId + ";amount:" + amount + ";";
  }
}
