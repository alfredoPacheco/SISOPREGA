/**
 * 
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

@WebServlet("/Purchase")
@ServletSecurity(@HttpConstraint(rolesAllowed = { "usa_usr"}))
public class Purchase extends BaseReportServlet {

  private static final long serialVersionUID = 4270835156713746572L;
  
  @EJB(lookup="java:global/ComProxy/PdfPurchase")
  private Reporteable reportePurchase;

  /**
   * 
   */
  public Purchase() {
    super();
  }

  /* (non-Javadoc)
   * @see com.tramex.sisoprega.reporting.BaseReportServlet#processRequest(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse)
   */
  @Override
  protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws Exception {
    Map<String, Object> params = new HashMap<String, Object>();
    log.fine("fromDate: [" + request.getParameter("fromDate") + "]");
    log.fine("toDate: [" + request.getParameter("toDate") + "]");
    String sellerId = request.getParameter("Id");

    log.fine("customerId: [" + sellerId + "]");

    Date fromDate = new SimpleDateFormat("MM/dd/yyyy").parse(request.getParameter("fromDate"));
    Date toDate = new SimpleDateFormat("MM/dd/yyyy").parse(request.getParameter("toDate"));
    params.put("FROM_DATE", fromDate);
    params.put("TO_DATE", toDate);
    
    if(sellerId!=null)
      params.put("SELLER_ID", Long.parseLong(sellerId));

    params.put("SELLER_TYPE", request.getParameter("sellerType"));
    reportePurchase.setReportName("Purchase");
    reportePurchase.setParameters(params);
    byte[] reportBytes = reportePurchase.getBytes();
    log.fine("Received [" + reportBytes.length + "] from EJB response.");
    this.processRequest(reportBytes, response);
  }

}
