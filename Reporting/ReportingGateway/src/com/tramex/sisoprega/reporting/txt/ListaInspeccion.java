/**
 * THIS IS A COMMERCIAL PROGRAM PROVIDED FOR TRAMEX AND IT'S ASSOCIATES
 * BUILT BY EXTERNAL SOFTWARE PROVIDERS.
 * THE SOFTWARE COMPRISING THIS SYSTEM IS THE PROPERTY OF TRAMEX OR ITS
 * LICENSORS.
 * 
 * ALL COPYRIGHT, PATENT, TRADE SECRET, AND OTHER INTELLECTUAL PROPERTY RIGHTS
 * IN THE SOFTWARE COMPRISING THIS SYSTEM ARE, AND SHALL REMAIN, THE VALUABLE
 * PROPERTY OF TRAMEX OR ITS LICENSORS.
 * 
 * USE, DISCLOSURE, OR REPRODUCTION OF THIS SOFTWARE IS STRICTLY PROHIBITED,
 * EXCEPT UNDER WRITTEN LICENSE FROM TRAMEX OR ITS LICENSORS.
 * 
 * &copy; COPYRIGHT 2012 TRAMEX. ALL RIGHTS RESERVED.
 */
package com.tramex.sisoprega.reporting.txt;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.HttpConstraint;
import javax.servlet.annotation.ServletSecurity;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.tramex.sisoprega.reporting.BaseReportServlet;

/**
 * report to be used on inspection forecast.
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * Feb 21, 2013     Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 * 
 */
@WebServlet("/SMS/ListaInspeccion")
@ServletSecurity(@HttpConstraint(rolesAllowed = { "mx_usr" }))
public class ListaInspeccion extends BaseReportServlet {
  private static final long serialVersionUID = -1800375391744487338L;

  /**
   * 
   */
  public ListaInspeccion() {
    super();
  }

  @Override
  protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    this.log.entering(this.getClass().getCanonicalName(), "processRequest");

    this.log.fine("rancherId: [" + request.getParameter("rancherId") + "]");

    String sqlString = "SELECT quantity as cabezas, cattype_name as ganado, "
        + "array_to_string(array_agg(cb.barnyard_code),',')AS corrales " 
        + "FROM ctrl_inspection_forecast_detail cifd "
        + "INNER JOIN ctrl_inspection_forecast cif ON cifd.forecast_id = cif.id "
        + "INNER JOIN cat_cattle_type cct ON cifd.cattle_type = cct.cattype_id "
        + "INNER JOIN ctrl_inspection_forecast_barnyard cifb ON cifb.detail_id = cifd.id "
        + "INNER JOIN cat_barnyard cb ON cifb.barnyard_id = cb.barnyard_id " 
        + "WHERE rancher_id = ? AND cif.forecast_date >= CURRENT_DATE " 
        + "GROUP BY cattype_name, quantity";

    PreparedStatement ps = null;
    ResultSet rs = null;

    try {
      ps = conn.prepareStatement(sqlString);
      ps.setLong(1, Long.parseLong(request.getParameter("rancherId")));
      rs = ps.executeQuery();

      String registros = "";
      while (rs.next()) {
        registros += " " + rs.getLong("cabezas") + " cabezas de " + rs.getString("ganado") + ", corral(es) " + rs.getString("corrales") + " -";
      }

      if (registros.equals("")) {
        throw new ServletException("Error al obtener registro de lista de inspección.");
      } else {
        PrintWriter out = response.getWriter();
        String cadenaFinal = "Lista de cruce en UGRCH:" + registros;
        cadenaFinal=cadenaFinal.substring(0, cadenaFinal.length()-2);
        out.println(cadenaFinal);
        out.close();
      }

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

    log.exiting(this.getClass().getCanonicalName(), "processRequest");
  }

}
