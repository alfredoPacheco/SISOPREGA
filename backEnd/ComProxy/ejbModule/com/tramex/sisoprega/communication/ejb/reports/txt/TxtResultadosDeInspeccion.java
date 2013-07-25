/**
 * 
 */
package com.tramex.sisoprega.communication.ejb.reports.txt;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;

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
public class TxtResultadosDeInspeccion extends BaseTxtReport implements Reporteable {

  /*
   * (non-Javadoc)
   * 
   * @see com.tramex.sisoprega.reporting.Reporteable#getBytes(java.util.Map)
   */
  @Override
  public byte[] getBytes() throws Exception {
    this.log.entering(this.getClass().getCanonicalName(), "byte[] getBytes(Map<String, Object>)");

    long receptionId = (Long) this.parameters.get("Id");
    log.finer("reception:[" + receptionId + "]");

    String rechazos = getRechazosDetails(receptionId);
    String sResult = "";

    if (rechazos.trim().length() > 0) {
      log.finer("Inspection rejects found");
      sResult = getAcceptedDetails(receptionId) + rechazos;
      log.fine(sResult);
    } else {
      throw new Exception("No hay inspección para enviar.");
    }

    byte[] result = sResult.getBytes();

    this.log.fine("Got [" + result.length + "] bytes from report [" + this.getReportName() + "]");
    this.log.exiting(this.getClass().getCanonicalName(), "byte[] getBytes(Map<String, Object>)");
    return result;
  }

  private String getAcceptedDetails(long receptionId) throws ServletException, ParseException {
    String sqlString = "SELECT SUM(ctrl_reception_headcount.hc) as head_count, " + "SUM(ctrl_inspection_result.hc) as rejects, "
        + "cat_cattle_type.cattype_name " + "FROM ctrl_reception_headcount  "
        + "INNER JOIN ctrl_reception ON ctrl_reception_headcount.reception_id = ctrl_reception.reception_id "
        + "INNER JOIN cat_cattle_type ON ctrl_reception.cattle_type = cat_cattle_type.cattype_id "
        + "LEFT JOIN ctrl_inspection ON ctrl_reception_headcount.reception_id = ctrl_inspection.reception_id "
        + "LEFT JOIN ctrl_inspection_result ON ctrl_inspection.inspection_id = ctrl_inspection_result.inspection_id "
        + "WHERE ctrl_reception_headcount.reception_id=" + receptionId + " GROUP BY cat_cattle_type.cattype_name;";

    PreparedStatement ps = null;
    ResultSet rs = null;

    try {
      ps = conn.prepareStatement(sqlString);
      rs = ps.executeQuery();

      String result = "";

      if (rs.next()) {
        long accepted = rs.getLong("head_count") - rs.getLong("rejects");
        result = "Resultados de inspección de ganado: " + rs.getLong("head_count") + " " + rs.getString("cattype_name") + ". "
            + accepted + " Aceptados, " + rs.getLong("rejects") + " Rechazados: ";
      }

      return result;

    } catch (SQLException e) {
      log.severe("SQLException while reading inspection results");
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

  private String getRechazosDetails(long receptionId) throws ServletException, ParseException {
    String sqlString = "SELECT cat_inspection_code.inspection_code_description as inspection_code_description, "
        + "SUM(ctrl_inspection_result.hc) AS Rechazos, "
        + "array_to_string(array_agg(pen.barnyard_code), ', ') as corrales, "
        + "ctrl_inspection.comments "
        + "FROM public.ctrl_inspection ctrl_inspection "
        + "LEFT JOIN public.ctrl_inspection_result ctrl_inspection_result ON ctrl_inspection.inspection_id = ctrl_inspection_result.inspection_id "
        + "LEFT JOIN public.cat_inspection_code cat_inspection_code ON ctrl_inspection_result.inspection_code_id = cat_inspection_code.inspection_code_id "
        + "LEFT JOIN public.ctrl_inspection_barnyard ctrl_inspection_barnyard ON ctrl_inspection.inspection_id = ctrl_inspection_barnyard.inspection_id "
        + "LEFT JOIN public.cat_barnyard pen ON ctrl_inspection_barnyard.barnyard_id = pen.barnyard_id "
        + "WHERE ctrl_inspection.reception_id = " + receptionId
        + " GROUP BY inspection_code_description, ctrl_inspection.comments;";

    PreparedStatement ps = null;
    ResultSet rs = null;

    StringBuilder sDetails = new StringBuilder();
    try {
      ps = conn.prepareStatement(sqlString);
      rs = ps.executeQuery();

      String comment = "";
      String penString = "";

      while (rs.next()) {
        sDetails.append(rs.getString("inspection_code_description")).append(" - ").append(rs.getString("rechazos")).append("; ");
        comment = rs.getString("comments");
        penString = rs.getString("corrales");
      }

      String result = sDetails.toString() + ". Corrales: " + penString + ". Comentario: " + comment;

      return result;

    } catch (SQLException e) {
      log.severe("SQLException while reading inspection results");
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
