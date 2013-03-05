package com.tramex.sisoprega.reporting.html;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JRExporter;
import net.sf.jasperreports.engine.JRExporterParameter;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.export.JRHtmlExporter;
import net.sf.jasperreports.engine.util.JRLoader;

import com.tramex.sisoprega.reporting.BaseReportServlet;

public class BaseHTMLServlet extends BaseReportServlet{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public BaseHTMLServlet(){
		super();
	}
	
	@Override
	protected void processRequest(String relativeReportURL, Map<String, Object> parameters, HttpServletResponse response)
		      throws IOException, JRException {
		ServletOutputStream out = response.getOutputStream();
	    InputStream is = new FileInputStream(getServletContext().getRealPath(relativeReportURL));
	    JasperReport reporte = (JasperReport) JRLoader.loadObject(is);
	    JasperPrint jasperPrint = JasperFillManager.fillReport(reporte, parameters, conn);
	    JRExporter exporter = new JRHtmlExporter();
	    exporter.setParameter(JRExporterParameter.JASPER_PRINT, jasperPrint);
	    exporter.setParameter(JRExporterParameter.OUTPUT_STREAM, out);
	    exporter.exportReport();
	    
	}
	
	
	
}
