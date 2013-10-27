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
 * Oct 18, 2013     Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 *
 * 
 */

@WebServlet("/Inventory")
@ServletSecurity(@HttpConstraint(rolesAllowed = { "usa_usr"}))
public class Inventory extends BaseReportServlet {

  private static final long serialVersionUID = 4270835156713746572L;
  
  @EJB(lookup="java:global/ComProxy/PdfInventory")
  private Reporteable reporteInventory;

  /**
   * 
   */
  public Inventory() {
    super();
  }

  /* (non-Javadoc)
   * @see com.tramex.sisoprega.reporting.BaseReportServlet#processRequest(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse)
   */
  @Override
  protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws Exception {
    Map<String, Object> params = new HashMap<String, Object>();

    reporteInventory.setReportName("Inventory");
    reporteInventory.setParameters(params);
    byte[] reportBytes = reporteInventory.getBytes();
    log.fine("Received [" + reportBytes.length + "] from EJB response.");
    this.processRequest(reportBytes, response);
  }

}
