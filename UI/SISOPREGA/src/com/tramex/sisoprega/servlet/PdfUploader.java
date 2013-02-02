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

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.Scanner;

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

  protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    response.setContentType("text/html;charset=UTF-8");
    PrintWriter out = response.getWriter();

    try {
      // Access the file
      Part file = request.getPart("pdfFile");
      InputStream is = file.getInputStream();

      // TODO: Define metadata.
      // read filename
      Part pFileName = request.getPart("fileName");
      Scanner s = new Scanner(pFileName.getInputStream());
      String fileName = s.nextLine();
      s.close();

      // String outputfile = this.getServletContext().getRealPath(fileName);
      String outputfile = "/temp/" + fileName + ".pdf";
      FileOutputStream os = new FileOutputStream(outputfile);

      // write bytes.
      int ch = is.read();
      while (ch != -1) {
        os.write(ch);
        ch = is.read();
      }

      os.close();
      out.println("OK");
    } catch (Exception e) {
      out.println("Exception while uploading the file: " + e.getMessage());
    } finally {
      out.close();
    }
  }

}
