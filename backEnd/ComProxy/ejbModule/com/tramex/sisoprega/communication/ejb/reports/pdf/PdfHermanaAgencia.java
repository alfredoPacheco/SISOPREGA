/**
 * 
 */
package com.tramex.sisoprega.communication.ejb.reports.pdf;

import javax.annotation.security.DeclareRoles;
import javax.annotation.security.RolesAllowed;
import javax.ejb.Stateless;

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
 * Oct 16, 2013     Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 *
 * 
 */
@Stateless
@DeclareRoles({ "us_usr", "rancher" })
@RolesAllowed({ "us_usr", "rancher" })
public class PdfHermanaAgencia extends PdfHermana {

}
