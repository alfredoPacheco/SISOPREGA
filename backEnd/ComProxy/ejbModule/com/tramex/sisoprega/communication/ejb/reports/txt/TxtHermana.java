/**
 * 
 */
package com.tramex.sisoprega.communication.ejb.reports.txt;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

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
 * Oct 17, 2013     Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 * 
 */
@Stateless
@RolesAllowed({ "us_usr" })
public class TxtHermana extends BaseTxtReport implements Reporteable {

  /*
   * (non-Javadoc)
   * 
   * @see com.tramex.sisoprega.reporting.Reporteable#getBytes()
   */
  @Override
  public byte[] getBytes() throws Exception {
    this.log.entering(this.getClass().getCanonicalName(), "byte[] getBytes(Map<String, Object>)");

    String sHermanaId = (String) this.parameters.get("HermanaId");

    Long hermanaId = Long.parseLong(sHermanaId);
    log.finer("hermanaId:[" + hermanaId + "]");

    String sqlString = "SELECT chr.hermana_id, ct.cattype_name as cattle_type, rh.hc as heads, rh.weight as weight, "
        + " rh.weight * 2.2046 as pounds, (rh.weight * 2.2046)/rh.hc as avg_pounds, "
        + " COALESCE(SUM(ir.hc),0) AS rejects, SUM(inspection.weight) as rejects_weight, "
        + " rh.hc - COALESCE(SUM(ir.hc),0) as net_heads, rh.weight - SUM(inspection.weight) as net_weight, "
        + " (rh.weight - SUM(inspection.weight)) * 2.2046 as net_pounds, "
        + " ((rh.weight - SUM(inspection.weight)) * 2.2046)/(rh.hc-COALESCE(SUM(ir.hc),0)) as net_avg, "
        + " SUM(expo.heads) AS imported_heads, SUM(expo.weight) as imported_pounds, "
        + " SUM(expo.weight)/2.2046 as imported_kilos,  SUM(expo.weight)/SUM(expo.heads) as imported_avg, "
        + " SUM(expo.weight) - ((rh.weight - SUM(inspection.weight))*2.2046) as delta_weight, "
        + " (SUM(expo.weight) - (((rh.weight - SUM(inspection.weight))*2.2046)))/(((rh.weight - SUM(inspection.weight)))*2.2046) as delta_pct "
        + " FROM ctrl_hermana_reception chr "
        + " INNER JOIN ctrl_reception reception ON chr.reception_id = reception.reception_id "
        + " INNER JOIN ctrl_reception_headcount rh ON reception.reception_id = rh.reception_id "
        + " INNER JOIN cat_cattle_type ct ON reception.cattle_type = ct.cattype_id "
        + " INNER JOIN ctrl_inspection inspection ON reception.reception_id = inspection.reception_id "
        + " LEFT JOIN ctrl_inspection_result ir ON inspection.inspection_id = ir.inspection_id "
        + " INNER JOIN ctrl_hermana_corte_exportador expo ON expo.hermana_id = chr.hermana_id " + " WHERE chr.hermana_id = ? "
        + " GROUP BY chr.hermana_id, ct.cattype_name, rh.hc, rh.weight;";

    PreparedStatement ps = null;
    ResultSet rs = null;
    String sResult = "";

    try {
      ps = conn.prepareStatement(sqlString);
      ps.setLong(1, hermanaId);

      log.fine("executing query: [" + sqlString + "]");
      rs = ps.executeQuery();

      if (!rs.next()) {
        sResult = "Error: No se encontró el registro de importación en la base de datos [" + hermanaId + "].";
        log.severe("Error al obtener registro de recepción.");
      } else {
        String sKilos = rounded2Decs(rs.getDouble("net_weight"));
        String sLibras = rounded2Decs(rs.getDouble("net_pounds"));
        String sPLibras = rounded2Decs(rs.getDouble("net_avg"));

        String sDelta = rounded2Decs(rs.getDouble("delta_weight"));
        String sDeltaPct = rounded2Decs(rs.getDouble("delta_pct") * 100);

        sResult = "Resumen de exportacion: " + rs.getLong("net_heads") + " cabezas de " + rs.getString("cattle_type") + ", "
            + sKilos + " kg. (" + sLibras + " lbs.); Prom por Lb.: " + sPLibras + ". Aumento/Merma: " + sDelta + " (" + sDeltaPct
            + "%).";
      }

    } catch (SQLException e) {
      this.log.severe("SQLException while reading import record summary");
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
