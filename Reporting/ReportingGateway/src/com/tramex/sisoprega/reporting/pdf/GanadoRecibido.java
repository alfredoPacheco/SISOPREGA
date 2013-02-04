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

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.jasperreports.engine.JRException;

import com.tramex.sisoprega.reporting.BaseReportServlet;

/**
 * Servlet implementation class GanadoRecibido
 * 
 * This report shows feed order using dateAlloted and rancherId as parameters.
 * http
 * ://host/ReportingGateway/GanadoRecibido?fromDate=[MM/dd/yyyy]&toDate=[MM/dd
 * /yyyy]
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

@WebServlet("/GanadoRecibido")
public class GanadoRecibido extends BaseReportServlet {

  private static final long serialVersionUID = -3931253027518760935L;

  /**
   * @see HttpServlet#HttpServlet()
   */
  public GanadoRecibido() {
    super();
  }

  @Override
  protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException,
      ParseException, JRException {
    Map<String, Object> params = new HashMap<String, Object>();
    log.fine("fromDate: [" + request.getParameter("fromDate") + "]");
    log.fine("toDate: [" + request.getParameter("toDate") + "]");

    Date fromDate = new SimpleDateFormat("MM/dd/yyyy").parse(request.getParameter("fromDate"));
    Date toDate = new SimpleDateFormat("MM/dd/yyyy").parse(request.getParameter("toDate"));

    params.put("CUS_FROM_DATE", fromDate);
    params.put("CUS_TO_DATE", toDate);

    String reportURL = "WEB-INF/Reports/Tramex/GanadoRecibido.jasper";

    processRequest(reportURL, params, response);

  }
}
