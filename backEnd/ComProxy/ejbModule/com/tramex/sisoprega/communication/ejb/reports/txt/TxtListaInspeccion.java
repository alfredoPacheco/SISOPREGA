/**
 * 
 */
package com.tramex.sisoprega.communication.ejb.reports.txt;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.annotation.security.RolesAllowed;
import javax.ejb.Stateless;

import com.tramex.sisoprega.communication.ejb.reports.BaseTxtReport;
import com.tramex.sisoprega.reporting.Reporteable;

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
@Stateless
@RolesAllowed({ "mx_usr", "us_usr" })
public class TxtListaInspeccion extends BaseTxtReport implements Reporteable {

  /*
   * (non-Javadoc)
   * 
   * @see com.tramex.sisoprega.reporting.Reporteable#getBytes(java.util.Map)
   */
  @Override
  public byte[] getBytes() throws Exception {
    this.log.entering(this.getClass().getCanonicalName(), "byte[] getBytes(Map<String, Object>)");

    long rancherId = Long.parseLong((String) this.parameters.get("rancherId"));
    log.finer("rancherId:[" + rancherId + "]");
    long recordId = (Long) this.parameters.get("Id");
    log.finer("recordId:[" + recordId + "]");

    String sqlString = "SELECT SUM(details.quantity) as heads, cattle.cattype_name, forecast.forecast_date, "
        + "array_to_string(array_agg(barnyard.barnyard_code), ', ') as corrales "
        + "FROM ctrl_inspection_forecast_detail details "
        + "INNER JOIN ctrl_inspection_forecast forecast ON details.forecast_id = forecast.id "
        + "INNER JOIN cat_cattle_type cattle ON details.cattle_type = cattle.cattype_id "
        + "INNER JOIN ctrl_inspection_forecast_barnyard pens ON details.id = pens.detail_id "
        + "INNER JOIN cat_barnyard barnyard ON barnyard.barnyard_id = pens.barnyard_id " 
        + "WHERE details.rancher_id = ? AND forecast_id = ? " 
        + "GROUP BY cattle.cattype_name, forecast.forecast_date;";

    log.fine(sqlString);
    
    PreparedStatement ps = null;
    ResultSet rs = null;
    String sResult = "";

    try {
      ps = conn.prepareStatement(sqlString);

      ps.setLong(1, rancherId);
      ps.setLong(2, recordId);
      log.fine("parameters assigned");

      rs = ps.executeQuery();

      if (!rs.next()) {
        sResult = "Error: No se encontró el registro de inspección: [" + recordId + "].";
        log.severe("Error al obtener registro de recepción.");
      } else {

        Date dInspectionDate = rs.getDate("forecast_date");
        log.fine("read forecast date in date object");
        
        String inspectionDate = new SimpleDateFormat("dd/MMM/yyyy").format(dInspectionDate);
        log.fine("forecastDate: " + inspectionDate);
        log.fine("heads: " + rs.getLong("heads"));
        log.fine("cattle: " + rs.getString("cattype_name"));

        sResult = "Tramex le informa que sus " + rs.getLong("heads") + " cabezas de " + rs.getString("cattype_name")
            + " estan programadas para ser inspeccionadas el " + inspectionDate;
      }

    } catch (SQLException e) {
      e.printStackTrace();
      this.log.severe("SQLException while reading TxtListaInspeccion");
      this.log.throwing(this.getClass().getCanonicalName(), "byte[] getBytes(Map<String, Object>)", e);

      sResult = "Error: SQLException: " + e.getMessage();
    } finally {
      try {
        if (ps != null)
          ps.close();
      } catch (Exception e) {
        this.log.warning("Unable to release some resources.");
      }
    }

    byte[] result = sResult.getBytes();

    this.log.fine("Got [" + result.length + "] bytes from report [" + this.getReportName() + "]");
    this.log.exiting(this.getClass().getCanonicalName(), "byte[] getBytes(Map<String, Object>)");
    return result;
  }

}
