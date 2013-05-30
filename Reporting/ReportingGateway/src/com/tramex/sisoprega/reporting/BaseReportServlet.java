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

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import javax.annotation.Resource;
import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JRExporter;
import net.sf.jasperreports.engine.JRExporterParameter;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.export.JRPdfExporter;
import net.sf.jasperreports.engine.util.JRLoader;

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
public class BaseReportServlet extends HttpServlet {

  private static final long serialVersionUID = -8325869766939791546L;
  protected Logger log = Logger.getLogger(BaseReportServlet.class.getCanonicalName());

  @Resource(name = "jdbc/sisoprega")
  protected DataSource ds;

  @EJB(lookup = "java:global/DataModel/BaseDataModel")
  protected RemoteModelable dataModel;

  protected Connection conn = null;

  public BaseReportServlet() {
    super();
    this.log = Logger.getLogger(this.getClass().getCanonicalName());
  }

  public void init() throws ServletException {
    try {
      conn = ds.getConnection();
    } catch (SQLException se) {
      log.severe("Unable to initiate sisoprega datasource connection");
      log.throwing(this.getClass().getCanonicalName(), "init", se);
    }
  }

  public void destroy() {
    try {
      if (conn != null)
        conn.close();
    } catch (SQLException se) {
      log.severe("SQLException: " + se.getMessage());
    }
  }

  protected void processRequest(String relativeReportURL, Map<String, Object> parameters, HttpServletResponse response)
      throws IOException, JRException {
    log.fine("loading report: " + relativeReportURL);
    response.setContentType("application/pdf");

    // response.setHeader("Content-disposition","attachment; filename=sisoprega.pdf");
    ServletOutputStream out = response.getOutputStream();
    InputStream is = new FileInputStream(getServletContext().getRealPath(relativeReportURL));
    JasperReport reporte = (JasperReport) JRLoader.loadObject(is);
    JasperPrint jasperPrint = JasperFillManager.fillReport(reporte, parameters, conn);
    JRExporter exporter = new JRPdfExporter();
    exporter.setParameter(JRExporterParameter.JASPER_PRINT, jasperPrint);
    exporter.setParameter(JRExporterParameter.OUTPUT_STREAM, out);
    exporter.exportReport();
  }

  protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException,
      ParseException, JRException {

    throw new ServletException("Unimplemented report servlet request.");

  }

  /**
   * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
   *      response)
   */
  protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    try {
      log.info("Executing Report by [" + request.getUserPrincipal().getName() + "]");
      processRequest(request, response);
    } catch (ParseException e) {
      log.severe("parameter parse exception");
      log.throwing(this.getClass().getCanonicalName(), "doGet", e);
      throw new ServletException(e);
    } catch (JRException e) {
      log.severe("Jasper reports exception");
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
