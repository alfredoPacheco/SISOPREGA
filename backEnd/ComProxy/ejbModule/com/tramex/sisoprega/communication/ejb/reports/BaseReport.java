/**
 * 
 */
package com.tramex.sisoprega.communication.ejb.reports;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.annotation.Resource;
import javax.ejb.SessionContext;
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

  @Resource
  protected SessionContext ejbContext;
  protected String RANCHER_ROLE_NAME = "rancher";

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

  @PreDestroy
  private void preDestroy() {
    log.fine("Release resouces for BaseReport: " + this.getClass().getCanonicalName());
    if (conn != null) {
      try {
        conn.close();
        conn = null;
      } catch (SQLException se) {
        log.severe("Unable to release database connection.");
        log.throwing(this.getClass().getCanonicalName(), "preDestroy", se);
      }

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

  protected long loggedRancherId() {
    long result = 0;

    String rancherName = ejbContext.getCallerPrincipal().getName();

    String sqlString = "SELECT rancher_id FROM cat_rancher_user WHERE user_name=?";

    PreparedStatement ps = null;
    ResultSet rs = null;

    try {
      ps = conn.prepareStatement(sqlString);
      ps.setString(1, rancherName);

      log.fine("executing query: [" + sqlString + "]");
      rs = ps.executeQuery();

      if (rs.next()) {
        result = rs.getLong("rancher_id");
      }

    } catch (SQLException e) {
      this.log.severe("SQLException while reading receptions");
      this.log.throwing(this.getClass().getCanonicalName(), "byte[] getBytes(Map<String, Object>)", e);
    } finally {
      try {
        if (ps != null)
          ps.close();
      } catch (Exception e) {
        this.log.warning("Unable to release some resources.");
      }
    }

    return result;
  }

}
