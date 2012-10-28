package com.tramex.sisoprega.common;

public class UpdateGatewayResponse {
	private String entityName;
	private GatewayContent updatedRecord;
	private com.tramex.sisoprega.common.Exception exception;
	/**
	 * @return the entityName
	 */
	public String getEntityName() {
		return entityName;
	}
	/**
	 * @param entityName the entityName to set
	 */
	public void setEntityName(String entityName) {
		this.entityName = entityName;
	}
	/**
	 * @return the updatedRecord
	 */
	public GatewayContent getUpdatedRecord() {
		return updatedRecord;
	}
	/**
	 * @param updatedRecord the updatedRecord to set
	 */
	public void setUpdatedRecord(GatewayContent updatedRecord) {
		this.updatedRecord = updatedRecord;
	}
	/**
	 * @return the exception
	 */
	public com.tramex.sisoprega.common.Exception getException() {
		return exception;
	}
	/**
	 * @param exception the exception to set
	 */
	public void setException(com.tramex.sisoprega.common.Exception exception) {
		this.exception = exception;
	}
}
