/**
 * 
 */
package com.tramex.sisoprega.reporting.pdf;

import java.util.HashMap;
import java.util.Map;

import javax.ejb.EJB;
import javax.servlet.annotation.HttpConstraint;
import javax.servlet.annotation.ServletSecurity;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.tramex.sisoprega.reporting.BaseReportServlet;
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
 * Oct 16, 2013     Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 *
 * 
 */
@WebServlet("/Hermana_agencia")
@ServletSecurity(@HttpConstraint(rolesAllowed = { "usa_usr", "agency" }))
public class HermanaAgencia extends BaseReportServlet {

  /**
   * 
   */
  private static final long serialVersionUID = 6373016660541852091L;
  @EJB(lookup = "java:global/ComProxy/PdfHermanaAgencia")
  private Reporteable reporteHermana;
  
  /**
   * 
   */
  public HermanaAgencia() {
    super();
  }

  @Override
  protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws Exception {
    Map<String, Object> params = new HashMap<String, Object>();
    String hermanaId = request.getParameter("Id");
    log.fine("hermanaId: [" + hermanaId + "]");
    params.put("HermanaId", Long.parseLong(hermanaId));

    reporteHermana.setReportName("HermanaAgencia");
    reporteHermana.setParameters(params);
    // response.setHeader("Content-disposition","attachment; filename=GanadoRecibido.pdf");
    byte[] reportBytes = reporteHermana.getBytes();
    log.fine("Received [" + reportBytes.length + "] from EJB response.");
    this.processRequest(reportBytes, response);
  }

}
