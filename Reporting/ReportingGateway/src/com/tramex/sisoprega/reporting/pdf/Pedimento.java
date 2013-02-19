/**
 * 
 */
package com.tramex.sisoprega.reporting.pdf;

import java.io.FileInputStream;
import java.io.IOException;
import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.HttpConstraint;
import javax.servlet.annotation.ServletSecurity;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.jasperreports.engine.JRException;

import com.tramex.sisoprega.reporting.BaseReportServlet;


/**
 * Retrieves the zipped pedimento file and extracts pdf for response.
 *  
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * Feb 17, 2013     Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 *
 * 
 */
@WebServlet("/Pedimento")
@ServletSecurity(@HttpConstraint(rolesAllowed = {"mx_usr", "rancher"}))
public class Pedimento extends BaseReportServlet {
  private static final long serialVersionUID = 6365656749779257000L;
  
  
  @Resource(name = "pdfUploader")
  private Properties PDF_UPLOADER_PROPERTIES;
  
  /**
   * @see HttpServlet#HttpServlet()
   */
  public Pedimento() {
    super();
  }
  
  @Override
  protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException,
      ParseException, JRException {
    Map<String, Object> params = new HashMap<String, Object>();
    String rancherId = request.getParameter("rancherId");
    
    if(request.isUserInRole("rancher"))
      rancherId = rancherFromLoggedUser(request);
    
    log.fine("rancherId: [" + rancherId + "]");
    log.fine("folio: [" + request.getParameter("folio") + "]");
    
    params.put("CUS_RANCHER_ID", Integer.parseInt(rancherId));
    params.put("CUS_FOLIO", request.getParameter("folio"));

    String uploadPath = PDF_UPLOADER_PROPERTIES.getProperty("uploadPath");
    String zipFile = uploadPath + "/" + rancherId + "/" + request.getParameter("folio") + ".zip";

    processRequest(zipFile, params, response);
  }
  
  @Override
  protected void processRequest(String relativeReportURL, Map<String, Object> parameters, HttpServletResponse response)
      throws IOException, JRException {
    response.setContentType("application/pdf");
    ServletOutputStream out = response.getOutputStream();
    
    byte[] buffer = new byte[1024];
    
    ZipInputStream zis = new ZipInputStream(new FileInputStream(relativeReportURL));
    ZipEntry ze = zis.getNextEntry();
    if(ze != null){
      int len;
      while((len = zis.read(buffer))>0){
        out.write(buffer, 0, len);
      }
    }
    
    out.close();
    zis.closeEntry();
    zis.close();
  }
}
