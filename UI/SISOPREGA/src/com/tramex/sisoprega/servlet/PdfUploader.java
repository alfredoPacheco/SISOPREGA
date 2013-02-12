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
package com.tramex.sisoprega.servlet;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Properties;
import java.util.Scanner;
import java.util.logging.Logger;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;


/**
 * Uploads pdf files to ranchers database.
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * Jan 28, 2013     Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 * 
 */
@WebServlet(name = "PdfUploader", urlPatterns = "/PdfUploader")
@MultipartConfig
public class PdfUploader extends HttpServlet {
  private static final long serialVersionUID = 3471374815554430971L;
  protected Logger log = Logger.getLogger(PdfUploader.class.getCanonicalName());
  
  @Resource(name="pdfUploader")
  private Properties PDF_UPLOADER_PROPERTIES;

  protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    log.entering(this.getClass().getCanonicalName(), "Post");
    response.setContentType("text/html;charset=UTF-8");
    PrintWriter out = response.getWriter();

    try {
      // Access the file
      Part file = request.getPart("pdfFile");
      InputStream is = file.getInputStream();

      String rancherId = getValue("rancher_id", request);
      String requestFormDate = getValue("exp_date", request);
      String requestFormId = getValue("folio_id", request);

      log.fine("rancher_id: " + rancherId);
      log.fine("fechaPedimento: " + requestFormDate);
      log.fine("requestFormId: " + requestFormId);
      
      Date dRequestFormDate = new SimpleDateFormat("yyyy/MM/dd").parse(requestFormDate);
      String dateDirName = new SimpleDateFormat("yyyyMMdd").format(dRequestFormDate);
      
      String directoryName = PDF_UPLOADER_PROPERTIES.getProperty("uploadPath") + "/" + rancherId;
      
      if(checkFileExists(directoryName, true)){
        if(!checkFileExists(directoryName + "/" + requestFormId + ".pdf", false)){
          createFile(directoryName, requestFormId, is);
          appendFile(directoryName + "/" + dateDirName, requestFormId);
          out.println("OK");
          log.fine("Uploaded file [" + directoryName + "/" + requestFormId + "] and record added to " + dateDirName);
        }else{
          out.println("File previously uploaded.");
          log.fine("File previously uploaded.");
        }
      }else{
        out.println("Unable to create directory.");
        log.fine("Unable to create directory.");
      }
      
      
    } catch (Exception e) {
      log.throwing(this.getClass().getCanonicalName(), "Post", e);
      out.println("Exception while uploading the file: " + e.getMessage());
    } finally {
      out.close();
    }
  }
  
  private String getValue(String fieldName, HttpServletRequest request) throws IOException, ServletException{
    String result = null;
    try{
      Part origin = request.getPart(fieldName);
      Scanner scanner = new Scanner(origin.getInputStream());
      result = scanner.nextLine();
      scanner.close();
    }catch(Exception e){
      log.fine("Could not find value for " + fieldName + " on part processing, trying parameters");
      result = request.getParameter(fieldName);
      log.fine("got [" + result + "] from parameter");
    }
    return result;
  }

  private boolean checkFileExists(String dirName, boolean create){
    boolean result = true;
    File f = new File(dirName);
    if(!f.exists()){
      log.finest("Folder already exists");
      if(create)
        result = f.mkdirs();
      else
        result = false;
    }
    log.finest("folder [" + dirName + "] exists? : " + result);
    return result;
  }
  
  private void createFile(String directoryName, String requestFormId, InputStream is) throws IOException{
    String outputfile = directoryName + "/" + requestFormId + ".zip";
    log.fine("writing to [" + outputfile + "]");
    FileOutputStream os = new FileOutputStream(outputfile);
    ZipOutputStream zos = new ZipOutputStream(os);
    ZipEntry ze = new ZipEntry(requestFormId + ".pdf");
    zos.putNextEntry(ze);

    // TODO: Evaluate file size and file type before upload.
    // write bytes.
    int ch = is.read();
    while (ch != -1) {
      zos.write(ch);
      ch = is.read();
    }
    
    is.close();
    zos.closeEntry();
    
    zos.close();
  }
  
  private void appendFile(String fileName, String requestFormId) throws IOException{
    PrintWriter out = null;
    try{
      out = new PrintWriter(new BufferedWriter(new FileWriter(fileName, true)));
      out.println(requestFormId);
    }finally{
      out.close();
    }
  }
  
}
