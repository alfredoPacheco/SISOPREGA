package com.tramex.sisoprega.dto;

public class PrintLog {
  
  private long printLogId;
  private String reportName;
  private String destinationName;

  /**
   * @return the printLogId
   */
  public long getPrintLogId() {
    return printLogId;
  }

  /**
   * @param printLog the printLog to set
   */
  public void setPrintLogId(long printLogId) {
    this.printLogId = printLogId;
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
    return "id:" + this.printLogId + ";reportName:" + this.reportName + ";destinationName:" + this.destinationName + ";";
  }

}
