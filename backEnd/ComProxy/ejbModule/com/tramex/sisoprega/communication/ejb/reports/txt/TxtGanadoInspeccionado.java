/**
 * 
 */
package com.tramex.sisoprega.communication.ejb.reports.txt;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.annotation.security.RolesAllowed;
import javax.ejb.Stateless;
import javax.servlet.ServletException;

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
public class TxtGanadoInspeccionado extends BaseTxtReport implements Reporteable {

  /*
   * (non-Javadoc)
   * 
   * @see com.tramex.sisoprega.reporting.Reporteable#getBytes(java.util.Map)
   */
  @Override
  public byte[] getBytes() throws Exception {
    this.log.entering(this.getClass().getCanonicalName(), "byte[] getBytes(Map<String, Object>)");

    Date fromDate = (Date) this.parameters.get("fromDate");
    log.finer("fromDate:[" + new SimpleDateFormat("MM/dd/yyyy").format(fromDate) + "]");
    Date toDate = (Date) this.parameters.get("toDate");
    log.finer("toDate:[" + new SimpleDateFormat("MM/dd/yyyy").format(toDate) + "]");
    long rancherId = (Long) this.parameters.get("Id");
    log.finer("rancherId:[" + rancherId + "]");

    String rechazos = getRechazosDetails(fromDate, toDate, rancherId);
    String sResult = "TRAMEX se complace en informarle que su ganado ha cruzado sin rechazos el dia de hoy. "
        + "Para mas detalles consulte el reporte en linea";

    if (rechazos.trim().length() > 0) {
      log.finer("Inspection rejects found");
      sResult = "Reporte de Rechazos:" + rechazos;
    } 

    byte[] result = sResult.getBytes();

    this.log.fine("Got [" + result.length + "] bytes from report [" + this.getReportName() + "]");
    this.log.exiting(this.getClass().getCanonicalName(), "byte[] getBytes(Map<String, Object>)");
    return result;
  }

  private String getRechazosDetails(Date fromDate, Date toDate, long rancherId) throws ServletException, ParseException {
    String sqlString = "SELECT "
        + "SUM(ctrl_inspection_result.hc) AS Rechazos, "
        + "vw_rancher.rancher_name AS vw_rancher_rancher_name, "
        + "ctrl_inspection_result.note AS ctrl_inspection_result_note, "
        + "ctrl_inspection.inspection_date AS ctrl_inspection_inspection_date "
        + "FROM  "
        + "public.ctrl_reception ctrl_reception "
        + "INNER JOIN public.ctrl_inspection ctrl_inspection ON ctrl_reception.reception_id = ctrl_inspection.reception_id "
        + "INNER JOIN public.vw_rancher vw_rancher ON ctrl_reception.rancher_id = vw_rancher.rancher_id "
        + "LEFT JOIN public.ctrl_inspection_result ctrl_inspection_result ON ctrl_inspection.inspection_id = ctrl_inspection_result.inspection_id "
        + " WHERE " + " ctrl_inspection.inspection_date >= ? " + " AND ctrl_inspection.inspection_date <= ? "
        + " AND ctrl_reception.rancher_id = ? " + " GROUP BY " + "vw_rancher_rancher_name," + "ctrl_inspection_inspection_date,"
        + "ctrl_inspection_result_note" + " ORDER BY " + "ctrl_inspection.inspection_date ASC";

    PreparedStatement ps = null;
    ResultSet rs = null;

    StringBuilder sDetails = new StringBuilder();
    try {
      ps = conn.prepareStatement(sqlString);

      ps.setDate(1, new java.sql.Date(fromDate.getTime()));
      ps.setDate(2, new java.sql.Date(toDate.getTime()));
      ps.setLong(3, rancherId);

      rs = ps.executeQuery();

      while (rs.next()) {
        String resultNote = rs.getString("ctrl_inspection_result_note");
        if (resultNote != null) {
          sDetails.append(rs.getString("ctrl_inspection_result_note")).append(" - ").append(rs.getString("rechazos"))
              .append("; ");
        }
      }

      return sDetails.toString();

    } catch (SQLException e) {
      log.severe("SQLException while reading receptions");
      log.throwing(this.getClass().getCanonicalName(), "processReques", e);
      throw new ServletException(e);
    } finally {
      try {
        if (ps != null)
          ps.close();
      } catch (Exception e) {
        log.info("Unable to release some resources.");
      }

    }
  }

}
