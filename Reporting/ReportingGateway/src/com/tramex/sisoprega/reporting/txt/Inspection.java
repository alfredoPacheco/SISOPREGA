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
 * Servlet implementation class Inspections
 */
@WebServlet("/SMS/CattleInspection")
@ServletSecurity(@HttpConstraint(rolesAllowed = { "mx_usr" }))
public class Inspection extends BaseReportServlet {
  private static final long serialVersionUID = 1L;

  private Logger log = Logger.getLogger(Inspection.class.getCanonicalName());

  /**
   * @see HttpServlet#HttpServlet()
   */
  public Inspection() {
    super();
  }

  @Override
  protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    this.log.entering(this.getClass().getCanonicalName(), "processRequest");

    this.log.fine("fromDate: [" + request.getParameter("fromDate") + "]");
    this.log.fine("toDate: [" + request.getParameter("toDate") + "]");
    this.log.fine("rancherId: [" + request.getParameter("rancherId") + "]");

    try {

      Date fromDate = new SimpleDateFormat("MM/dd/yyyy").parse(request.getParameter("fromDate"));
      Date toDate = new SimpleDateFormat("MM/dd/yyyy").parse(request.getParameter("toDate"));

      String rechazos = getRechazosDetails(fromDate, toDate, Long.parseLong(request.getParameter("rancherId")));

      PrintWriter out = response.getWriter();

      if (rechazos.trim().length() > 0) {
        out.print("Reporte de Rechazos:" + rechazos);
      }else{
        out.print("Su ganado ha cruzado sin rechazos el dia de hoy.");
      }

      out.close();
    } catch (ParseException e) {
      log.severe("ParseException while reading parameters");
      log.throwing(this.getClass().getCanonicalName(), "processReques", e);
      throw new ServletException(e);
    }

    log.exiting(this.getClass().getCanonicalName(), "processRequest");
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
