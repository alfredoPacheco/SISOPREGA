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

    String sqlString = 
    		 "SELECT "+
    	     	"SUM(ctrl_inspection_result.hc) AS Rechazos,"+
    	     	"ctrl_reception_headcount.hc - SUM(ctrl_inspection_result.hc) AS Aceptadas,"+
    	     	"vw_rancher.rancher_name AS vw_rancher_rancher_name,"+
    	     	"ctrl_inspection_result.note AS ctrl_inspection_result_note,"+
    	     	"ctrl_reception.reception_id AS ctrl_reception_reception_id,"+
    	     	"cat_cattle_type.cattype_name AS cat_cattle_type_cattype_name,"+
    	     	"ctrl_inspection.inspection_date AS ctrl_inspection_inspection_date,"+
    	     	"ctrl_reception_headcount.hc AS TotalCabezas "+
    	 " FROM "+
    	      "public.cat_cattle_type cat_cattle_type INNER JOIN public.ctrl_reception ctrl_reception ON cat_cattle_type.cattype_id = ctrl_reception.cattle_type"+
    	      " INNER JOIN public.ctrl_inspection ctrl_inspection ON ctrl_reception.reception_id = ctrl_inspection.reception_id"+
    	      " INNER JOIN public.ctrl_reception_headcount ctrl_reception_headcount ON ctrl_reception.reception_id = ctrl_reception_headcount.reception_id"+
    	      " INNER JOIN public.vw_rancher vw_rancher ON ctrl_reception.rancher_id = vw_rancher.rancher_id"+
    	      " INNER JOIN public.ctrl_inspection_result ctrl_inspection_result ON ctrl_inspection.inspection_id = ctrl_inspection_result.inspection_id"+
    	 " WHERE "+
    	      " ctrl_inspection.inspection_date >= ? " +
    	      " AND ctrl_inspection.inspection_date <= ? "+
    	      " AND ctrl_reception.rancher_id = ? "+
    	 " GROUP BY "+
    	      "vw_rancher_rancher_name,"+
    	      "ctrl_reception_reception_id,"+
    	      "cat_cattle_type_cattype_name,"+
    	      "ctrl_inspection_inspection_date,"+
    	      "TotalCabezas,"+
    	      "ctrl_inspection_result_note"+
    	 " ORDER BY "+
    	      "ctrl_inspection.inspection_date ASC,"+
    	      "vw_rancher.rancher_name ASC";
    
    PreparedStatement ps = null;
    ResultSet rs = null;
    
    StringBuilder sDetails=new StringBuilder();
    try {
      ps = conn.prepareStatement(sqlString);

      Date fromDate = new SimpleDateFormat("MM/dd/yyyy").parse(request.getParameter("fromDate"));
      Date toDate = new SimpleDateFormat("MM/dd/yyyy").parse(request.getParameter("toDate"));

      ps.setDate(1, new java.sql.Date(fromDate.getTime()));
      ps.setDate(2, new java.sql.Date(toDate.getTime()));
      ps.setLong(3, Long.parseLong(request.getParameter("rancherId")));

      rs = ps.executeQuery();

      while(rs.next()) {    	     	
    	sDetails.append(rs.getString("ctrl_inspection_result_note")).append(" - ").
    			 append(rs.getString("rechazos")).append("; ");
      }
      
      PrintWriter out = response.getWriter();
	  
	  if(sDetails.toString().trim().length() > 0){
		  out.println("Reporte de Rechazos: ");
		  out.println(sDetails);}
	  else{
		  out.println("Su ganado a cruzado exitosamente sin rechazos.");
	  }
		  
	  out.close();
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
}
