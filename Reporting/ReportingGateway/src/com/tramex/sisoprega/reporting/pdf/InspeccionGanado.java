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

package com.tramex.sisoprega.reporting.pdf;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.ejb.EJB;
import javax.servlet.annotation.HttpConstraint;
import javax.servlet.annotation.ServletSecurity;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.tramex.sisoprega.reporting.BaseReportServlet;
import com.tramex.sisoprega.reporting.Reporteable;

/**
 * Servlet implementation class ReceivedCattleRacher
 * 
 * This report shows feed order using dateAlloted and rancherId as parameters.
 * http
 * ://host/ReportingGateway/RecibidoPorGanadero?fromDate=[MM/dd/yyyy]&toDate=
 * [MM/dd/yyyy]&rancherId=[0]
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 01/17/2013  Jaime Figueroa               Initial Version.
 * 01/27/2013  Diego Torres                 Implementing subclassed version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Jaime Figueroa
 * 
 */

@WebServlet("/InspeccionGanado")
@ServletSecurity(@HttpConstraint(rolesAllowed = { "mx_usr", "rancher" }))
public class InspeccionGanado extends BaseReportServlet {

  private static final long serialVersionUID = -6219583962715558016L;
  
  @EJB(lookup="java:global/ComProxy/PdfGanadoInspeccionado")
  private Reporteable reporteInspeccionGanado;

  /**
   * @see HttpServlet#HttpServlet()
   */
  public InspeccionGanado() {
    super();
  }

  @Override
  protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws Exception {
    Map<String, Object> params = new HashMap<String, Object>();
    log.fine("fromDate: [" + request.getParameter("fromDate") + "]");
    log.fine("toDate: [" + request.getParameter("toDate") + "]");
    String rancherId = request.getParameter("rancherId");
    log.fine("rancherId: [" + rancherId + "]");

    Date fromDate = new SimpleDateFormat("MM/dd/yyyy").parse(request.getParameter("fromDate"));
    Date toDate = new SimpleDateFormat("MM/dd/yyyy").parse(request.getParameter("toDate"));
    params.put("fromDate", fromDate);
    params.put("toDate", toDate);
    
    if(rancherId!=null)
      params.put("Id", Long.parseLong(rancherId));

    reporteInspeccionGanado.setReportName("GanadoInspeccionado");
    reporteInspeccionGanado.setParameters(params);
    byte[] reportBytes = reporteInspeccionGanado.getBytes();
    log.fine("Received [" + reportBytes.length + "] from EJB response.");
    this.processRequest(reportBytes, response);

  }
}
