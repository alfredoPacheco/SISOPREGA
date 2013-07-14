/**
 * 
 */
package com.tramex.sisoprega.reporting;

import java.util.Map;

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
public interface Reporteable {
  byte[] getBytes() throws Exception;
  String getReportName();
  void setReportName(String reportName);
  void setParameters(Map<String, Object> parameters) throws Exception;
}
