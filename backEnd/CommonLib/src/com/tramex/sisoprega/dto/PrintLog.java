package com.tramex.sisoprega.dto;

public class PrintLog {
  
  private long recordId;
  private String reportName;
  private String destinationName;

  /**
   * @return the id
   */
  public long getRecordId() {
    return recordId;
  }

  /**
   * @param id the id to set
   */
  public void setRecordId(long recordId) {
    this.recordId = recordId;
  }

  /**
   * @return the reportName
   */
  public String getReportName() {
    return reportName;
  }

  /**
   * @param reportName the reportName to set
   */
  public void setReportName(String reportName) {
    this.reportName = reportName;
  }

  /**
   * @return the destinationName
   */
  public String getDestinationName() {
    return destinationName;
  }

  /**
   * @param destinationName the destinationName to set
   */
  public void setDestinationName(String destinationName) {
    this.destinationName = destinationName;
  }

  @Override
  public String toString() {
    return "id:" + this.recordId + ";reportName:" + this.reportName + ";destinationName:" + this.destinationName + ";";
  }

}
