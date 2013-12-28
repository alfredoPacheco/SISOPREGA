package com.tramex.sisoprega.dto;

import java.util.Date;

public class AppLog {

	private int id;
	private String operation;
	private Date operationTime;
	private int heads;
	private float weight;
	private String description;
	
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getOperation() {
		return operation;
	}
	public void setOperation(String operation) {
		this.operation = operation;
	}
	public Date getOperationTime() {
		return operationTime;
	}
	public void setOperationTime(Date operationTime) {
		this.operationTime = operationTime;
	}
	public int getHeads() {
		return heads;
	}
	public void setHeads(int heads) {
		this.heads = heads;
	}
	public float getWeight() {
		return weight;
	}
	public void setWeight(float weight) {
		this.weight = weight;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
	
}
