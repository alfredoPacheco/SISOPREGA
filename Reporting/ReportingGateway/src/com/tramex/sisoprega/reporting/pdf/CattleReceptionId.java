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
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.HttpConstraint;
import javax.servlet.annotation.ServletSecurity;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.jasperreports.engine.JRException;

import com.tramex.sisoprega.reporting.BaseReportServlet;

/**
 * Servlet implementation class CattleReceptionId
 * 
 * This report shows feed order using inspectionDate and receptionId as
 * parameters.
 * http://host/ReportingGateway/ReceivedCattleReceptionId?fromDate=[MM/dd/
 * yyyy]&toDate=[MM/dd/yyyy]&receptionId=[0]
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 01/24/2013  Jaime Figueroa               Initial Version.
 * 01/27/2013  Diego Torres                 Implementing sub classed version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Jaime Figueroa
 */
@WebServlet("/CattleReceptionId")
@ServletSecurity(@HttpConstraint(rolesAllowed = {"sisoprega_admin", "mex_user"}))
public class CattleReceptionId extends BaseReportServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public CattleReceptionId() {
        super();
    }

    @Override
    protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException,
        ParseException, JRException {
      Map<String, Object> params = new HashMap<String, Object>();
      log.fine("receptionId: [" + request.getParameter("receptionId") + "]");

      params.put("CUS_RECEPTION_ID", Integer.parseInt(request.getParameter("receptionId")));

      String reportURL = "WEB-INF/Reports/Tramex/CattleReceptionId.jasper";

      processRequest(reportURL, params, response);

    }

  }

