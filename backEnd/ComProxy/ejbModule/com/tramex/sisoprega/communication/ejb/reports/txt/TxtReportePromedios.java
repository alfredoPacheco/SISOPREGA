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
public class TxtReportePromedios extends BaseTxtReport implements Reporteable {

  /*
   * (non-Javadoc)
   * 
   * @see com.tramex.sisoprega.reporting.Reporteable#getBytes(java.util.Map)
   */
  @Override
  public byte[] getBytes() throws Exception {
    this.log.entering(this.getClass().getCanonicalName(), "byte[] getBytes(Map<String, Object>)");

    long recordId = (Long) this.parameters.get("Id");
    log.finer("recordId:[" + recordId + "]");

    String sqlString = "SELECT reception.reception_id as folio, headcount.hc as cabezas," + "cattle.cattype_name as ganado," + "headcount.weight as kilos, "
        + "headcount.weight * 2.2046 as libras," + "headcount.weight/headcount.hc as pKilos, "
        + "headcount.weight * 2.2046/headcount.hc as pLibras," + "array_to_string(array_agg(b.barnyard_code), ', ') as corrales "
        + "FROM ctrl_reception reception "
        + "INNER JOIN ctrl_reception_headcount headcount ON reception.reception_id = headcount.reception_id "
        + "INNER JOIN cat_cattle_type cattle ON reception.cattle_type = cattle.cattype_id "
        + "LEFT JOIN ctrl_reception_barnyard crb ON reception.reception_id = crb.reception_id "
        + "LEFT JOIN cat_barnyard b ON crb.barnyard_id = b.barnyard_id "
        + "WHERE reception.reception_id = ? AND headcount.hc > 0 "
        + "GROUP BY folio, headcount.hc, cattle.cattype_name, headcount.weight "
        + "ORDER BY folio";

    PreparedStatement ps = null;
    ResultSet rs = null;
    String sResult = "";

    try {
      ps = conn.prepareStatement(sqlString);

      ps.setLong(1, recordId);

      rs = ps.executeQuery();

      if (!rs.next()) {
        sResult = "Error: No se encontró el registro de recepción: [" + recordId + "].";
        log.severe("Error al obtener registro de recepción.");
      } else {
        String sKilos = rounded2Decs(rs.getDouble("kilos"));
        String sLibras = rounded2Decs(rs.getDouble("libras"));
        String sPKilos = rounded2Decs(rs.getDouble("pkilos"));
        String sPLibras = rounded2Decs(rs.getDouble("plibras"));

        sResult = "Tramex - Promedios (Folio #" + rs.getLong("folio") + "): " + rs.getLong("cabezas") + " cabezas de " + rs.getString("ganado") + ", " + sKilos
            + " kg. (" + sLibras + " lbs.). Prom por Kg.: " + sPKilos + "; Prom por Lb.: " + sPLibras + ". Corrales: "
            + rs.getString("corrales");
      }

    } catch (SQLException e) {
      this.log.severe("SQLException while reading receptions");
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
