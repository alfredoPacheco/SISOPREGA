/**
 * 
 */
package com.tramex.sisoprega.communication.ejb.reports;

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
public abstract class BaseTxtReport extends BaseReport {
  
  public void setParameters(Map<String, Object> parameters) throws Exception {
    if(parameters!=null)
      this.parameters.putAll(parameters);
  }
  
  protected String rounded2Decs(double amount) {

    String sAmount = String.valueOf(amount);
    Integer index = sAmount.indexOf(".");

    if (index > -1 && index < sAmount.length() - 2) {
      sAmount = sAmount.substring(0, sAmount.indexOf(".") + 3);
    }

    return sAmount;

  }
}
