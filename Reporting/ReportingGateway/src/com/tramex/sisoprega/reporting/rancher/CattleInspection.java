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
package com.tramex.sisoprega.reporting.rancher;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.jasperreports.engine.JRExporter;
import net.sf.jasperreports.engine.JRExporterParameter;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.export.JRPdfExporter;
import net.sf.jasperreports.engine.util.JRLoader;

/**
 * Servlet implementation class CattleInspection
 * 
 * This report shows feed order using inspectionDate and receptionId as parameters.
 * http://host/ReportingGateway/ReceivedCattleRacher?fromDate=[MM/dd/yyyy]&toDate=[MM/dd/yyyy]&rancherId=[0]
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 01/24/2013  Jaime Figueroa               Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Jaime Figueroa
 */

@WebServlet("/CattleInspection")
public class CattleInspection extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private Logger log = Logger.getLogger(ReporteAlimento.class.getCanonicalName());   
    /**
     * @see HttpServlet#HttpServlet()
     */
    public CattleInspection() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	  try {
        response.setContentType("application/pdf");
        ServletOutputStream out = response.getOutputStream();
        Class.forName("org.postgresql.Driver");
        Connection conexion = DriverManager.getConnection("jdbc:postgresql://localhost/sisoprega", "sisoprega", "sisoprega");
        JasperReport reporte = (JasperReport) JRLoader.loadObject(getServletContext().getRealPath("WEB-INF/Reports/Ranchers/InspeccionGanado.jasper"));
        //JRLoader.loadObject(file)
        //JRLoader.loadObject(InputStream)
        Map<String, Object> params=new HashMap<String, Object>();
        log.info("fromDate: [" + request.getParameter("fromDate") + "]");
        log.info("toDate: [" + request.getParameter("toDate") + "]");
        //log.info("rancherId: [" + request.getParameter("rancherId") + "]");      
        // return (String) session.getAttribute("userName");
        //request.getSession().getAttribute("userName")==null 
        
        Date fromDate = new SimpleDateFormat("MM/dd/yyyy").parse(request.getParameter("fromDate"));
        Date toDate = new SimpleDateFormat("MM/dd/yyyy").parse(request.getParameter("toDate"));
        params.put("CUS_FROM_DATE", fromDate);
        params.put("CUS_TO_DATE", toDate);
        
        params.put("CUS_RANCHER_ID", Integer.parseInt(request.getParameter("rancherId")));
        JasperPrint jasperPrint = JasperFillManager.fillReport(reporte, params, conexion);
        JRExporter exporter = new JRPdfExporter();
        exporter.setParameter(JRExporterParameter.JASPER_PRINT, jasperPrint);
        exporter.setParameter(JRExporterParameter.OUTPUT_STREAM, out);
        exporter.exportReport();
      } catch (Exception e) {
        e.printStackTrace();
      }
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

}
