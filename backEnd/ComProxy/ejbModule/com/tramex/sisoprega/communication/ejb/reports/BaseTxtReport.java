/**
 * 
 */
package com.tramex.sisoprega.communication.ejb.reports;

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
  protected String rounded2Decs(double amount) {

    String sAmount = String.valueOf(amount);
    Integer index = sAmount.indexOf(".");

    if (index > -1 && index < sAmount.length() - 2) {
      sAmount = sAmount.substring(0, sAmount.indexOf(".") + 3);
    }

    return sAmount;

  }
}
