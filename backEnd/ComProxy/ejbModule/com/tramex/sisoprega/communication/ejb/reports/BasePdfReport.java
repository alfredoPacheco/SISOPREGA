/**
 * 
 */
package com.tramex.sisoprega.communication.ejb.reports;

import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.Map;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.JasperRunManager;
import net.sf.jasperreports.engine.util.JRLoader;

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
 * Jul 13, 2013     Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 * 
 */
public abstract class BasePdfReport extends BaseReport {
  
  /**
   * @throws FileNotFoundException 
   * @throws JRException 
   * @see Reporteable#getBytes(Map<String,Object>)
   */
  public byte[] getBytes(Map<String, Object> parameters) throws FileNotFoundException, JRException {
    this.log.entering(this.getClass().getCanonicalName(), "byte[] getBytes(Map<String, Object)");
    String fileName = "com/tramex/sisoprega/communication/ejb/reports/jasper/" + this.getReportName() + ".jasper";
    
    InputStream is = getClass().getClassLoader().getResourceAsStream(fileName);
    this.log.fine("instantiated file: [" + fileName + "]");
    
    JasperReport report = (JasperReport) JRLoader.loadObject(is);
    this.log.fine("file loaded into JasperReport instance");
    byte[] bytes = JasperRunManager.runReportToPdf(report, parameters, conn);
    this.log.fine("Got [" + bytes.length + "] bytes from report [" + this.getReportName() + "]");

    this.log.exiting(this.getClass().getCanonicalName(), "byte[] getBytes(Map<String, Object)");
    return bytes;
  }
}
