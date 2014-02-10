/**
 * 
 */
package com.tramex.sisoprega.dto;

import java.util.Date;

/**
 * @author Alfredo
 *
 */
public class Ballance {
	private long id;
	private String transactionType;
	private String transactionClass;
	private long operationId;
	private Date operationDate;
	private float amount;
	private String debtorOrCreditor;
	private String description;
	/**
	 * @return the id
	 */
	public long getId() {
		return id;
	}
	/**
	 * @param id the id to set
	 */
	public void setId(long id) {
		this.id = id;
	}
	/**
	 * @return the transactionType
	 */
	public String getTransactionType() {
		return transactionType;
	}
	/**
	 * @param transactionType the transactionType to set
	 */
	public void setTransactionType(String transactionType) {
		this.transactionType = transactionType;
	}
	/**
	 * @return the transactionClass
	 */
	public String getTransactionClass() {
		return transactionClass;
	}
	/**
	 * @param transactionClass the transactionClass to set
	 */
	public void setTransactionClass(String transactionClass) {
		this.transactionClass = transactionClass;
	}
	/**
	 * @return the operationId
	 */
	public long getOperationId() {
		return operationId;
	}
	/**
	 * @param operationId the operationId to set
	 */
	public void setOperationId(long operationId) {
		this.operationId = operationId;
	}
	/**
	 * @return the operationDate
	 */
	public Date getOperationDate() {
		return operationDate;
	}
	/**
	 * @param operationDate the operationDate to set
	 */
	public void setOperationDate(Date operationDate) {
		this.operationDate = operationDate;
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
	 * @return the debtorOrCreditor
	 */
	public String getDebtorOrCreditor() {
		return debtorOrCreditor;
	}
	/**
	 * @param debtorOrCreditor the debtorOrCreditor to set
	 */
	public void setDebtorOrCreditor(String debtorOrCreditor) {
		this.debtorOrCreditor = debtorOrCreditor;
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
}
