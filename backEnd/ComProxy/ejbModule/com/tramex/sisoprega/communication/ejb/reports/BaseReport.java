/**
 * 
 */
package com.tramex.sisoprega.communication.ejb.reports;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import javax.sql.DataSource;

/**
 * USAGE COMMENT HERE
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * Jul 13, 2013     Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 * 
 */
public abstract class BaseReport {
  protected Logger log = Logger.getLogger(BaseReport.class.getCanonicalName());

  @Resource(name = "jdbc/sisoprega")
  protected DataSource ds;
  protected Connection conn = null;

  protected Map<String, Object> parameters = new HashMap<String, Object>();

  private String reportName;

  public BaseReport() {
    this.log = Logger.getLogger(this.getClass().getCanonicalName());
  }

  @PostConstruct
  private void init() {
    System.out.println("Initializing BaseReport for " + this.getClass().getCanonicalName());
    try {
      conn = ds.getConnection();
    } catch (SQLException se) {
      log.severe("Unable to initiate sisoprega datasource connection");
      log.throwing(this.getClass().getCanonicalName(), "init", se);
    }
  }

  /**
   * @return the reportName
   */
  public String getReportName() {
    return reportName;
  }

  /**
   * @param reportName
   *          the reportName to set
   */
  public void setReportName(String reportName) {
    this.reportName = reportName;
  }
}
