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
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.annotation.HttpConstraint;
import javax.servlet.annotation.ServletSecurity;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.tramex.sisoprega.reporting.BaseReportServlet;

/**
 * Servlet implementation class Pesage
 */
@WebServlet("/SMS/RecibidoPorGanadero")
@ServletSecurity(@HttpConstraint(rolesAllowed = { "mx_usr" }))
public class Pesage extends BaseReportServlet {
  private static final long serialVersionUID = 1L;

  private Logger log = Logger.getLogger(Pesage.class.getCanonicalName());

  /**
   * @see HttpServlet#HttpServlet()
   */
  public Pesage() {
    super();
  }

  @Override
  protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    this.log.entering(this.getClass().getCanonicalName(), "processRequest");

    this.log.fine("fromDate: [" + request.getParameter("fromDate") + "]");
    this.log.fine("toDate: [" + request.getParameter("toDate") + "]");
    this.log.fine("rancherId: [" + request.getParameter("rancherId") + "]");

    String sqlString = "SELECT headcount.hc as cabezas," + "cattle.cattype_name as ganado," + "headcount.weight as kilos, "
        + "headcount.weight * 2.2046 as libras," + "headcount.weight/headcount.hc as pKilos, "
        + "headcount.weight * 2.2046/headcount.hc as pLibras," + "array_to_string(array_agg(b.barnyard_code), ', ') as corrales "
        + "FROM ctrl_reception reception "
        + "INNER JOIN ctrl_reception_headcount headcount ON reception.reception_id = headcount.reception_id "
        + "INNER JOIN cat_cattle_type cattle ON reception.cattle_type = cattle.cattype_id "
        + "LEFT JOIN ctrl_reception_barnyard crb ON reception.reception_id = crb.reception_id "
        + "LEFT JOIN cat_barnyard b ON crb.barnyard_id = b.barnyard_id "
        + "WHERE reception.date_allotted >= ? AND reception.date_allotted <= ? AND reception.rancher_id = ? "
        + "GROUP BY reception.reception_id, headcount.hc," + "cattle.cattype_name," + "headcount.weight "
        + "ORDER BY reception.reception_id desc";

    PreparedStatement ps = null;
    ResultSet rs = null;

    try {
      ps = conn.prepareStatement(sqlString);

      Date fromDate = new SimpleDateFormat("MM/dd/yyyy").parse(request.getParameter("fromDate"));
      Date toDate = new SimpleDateFormat("MM/dd/yyyy").parse(request.getParameter("toDate"));

      ps.setDate(1, new java.sql.Date(fromDate.getTime()));
      ps.setDate(2, new java.sql.Date(toDate.getTime()));
      ps.setLong(3, Long.parseLong(request.getParameter("rancherId")));

      rs = ps.executeQuery();

      if (!rs.next()) {
        throw new ServletException("Error al obtener registro de recepción.");
      } else {

        PrintWriter out = response.getWriter();

        double dLibras = rounded2Decs(rs.getDouble("libras"));
        double dPKilos = rounded2Decs(rs.getDouble("pkilos"));
        double dPLibras = rounded2Decs(rs.getDouble("plibras"));

        out.println("Ganado Recibido: " + rs.getLong("cabezas") + " cabezas de " + rs.getString("ganado") + ", "
            + rs.getDouble("kilos") + " kg. (" + dLibras + " lbs.). Prom por Kg.: " + dPKilos + "; Prom por Lb.: " + dPLibras
            + ". Corrales: " + rs.getString("corrales") + ".");

        out.close();
      }

    } catch (SQLException e) {
      log.severe("SQLException while reading receptions");
      log.throwing(this.getClass().getCanonicalName(), "processReques", e);
      throw new ServletException(e);
    } catch (ParseException e) {
      log.severe("ParseException while reading parameters");
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

  private double rounded2Decs(double amount) {
    amount *= 100;
    amount = Math.ceil(amount);
    amount *= 0.01d;
    return amount;
  }

}
