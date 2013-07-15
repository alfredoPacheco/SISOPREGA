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
package com.tramex.sisoprega.reporting;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.jasperreports.engine.JRException;

import com.tramex.sisoprega.datamodel.RemoteModelable;
import com.tramex.sisoprega.dto.RancherUser;

/**
 * All reporting servlets are based on this class.
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * Jan 26, 2013     Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 * 
 */
public abstract class BaseReportServlet extends HttpServlet {

  private static final long serialVersionUID = -8325869766939791546L;
  protected Logger log = Logger.getLogger(BaseReportServlet.class.getCanonicalName());
  
  @EJB(lookup = "java:global/DataModel/BaseDataModel")
  protected RemoteModelable dataModel;

  public BaseReportServlet() {
    super();
    this.log = Logger.getLogger(this.getClass().getCanonicalName());
  }

  protected void processRequest(byte[] reportBytes, HttpServletResponse response)
      throws IOException, JRException {
    log.entering(this.getClass().getCanonicalName(), "void processRequest(byte[" + reportBytes.length + "], response )");
    response.setContentType("application/pdf");
    response.setContentLength(reportBytes.length);
    // response.setHeader("Content-disposition","attachment; filename=sisoprega.pdf");
    
    ServletOutputStream out = response.getOutputStream();
    out.write(reportBytes);
  }

  protected abstract void processRequest(HttpServletRequest request, HttpServletResponse response) throws Exception;

  /**
   * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
   *      response)
   */
  protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    try {
      log.info("Executing Report by [" + request.getUserPrincipal().getName() + "]");
      processRequest(request, response);
    } catch (Exception e) {
      log.severe("process request exception");
      log.throwing(this.getClass().getCanonicalName(), "doGet", e);
      throw new ServletException(e);
    } 
  }

  /**
   * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
   *      response)
   */
  protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    doGet(request, response);
  }

  protected String rancherFromLoggedUser(HttpServletRequest request) {
    log.entering(this.getClass().getCanonicalName(), "getLoggedRancherId");

    long result = 0;

    Map<String, Object> parameters = new HashMap<String, Object>();
    parameters.put("userName", request.getUserPrincipal().getName());

    List<RancherUser> ranchers = dataModel.readDataModelList("RANCHER_USER_BY_USER_NAME", parameters, RancherUser.class);

    if (!ranchers.isEmpty()) {
      RancherUser loggedRancher = ranchers.get(0);
      if (loggedRancher.getRancher() != null)
        result = loggedRancher.getRancher().getRancherId();
    }

    log.fine("Retrieved rancherId[" + result + "] from userName[" + request.getUserPrincipal().getName() + "]");
    return String.valueOf(result);
  }

}
