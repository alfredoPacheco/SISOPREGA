/**
 * 
 */
package com.tramex.sisoprega.exporter.cross;

import javax.ejb.EJB;

import com.tramex.sisoprega.identity.IdentityManagerException;
import com.tramex.sisoprega.identity.RemoteIdentity;

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
 * Jul 24, 2013     Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 *
 * 
 */
public class ChangePasswordBean {
  private String password;
  private String newPassword;
  
  @EJB(lookup = "java:global/BusinessLogicProxy/IdentityManagerBean")
  private RemoteIdentity identityManager;

  /**
   * @return the password
   */
  public String getPassword() {
    return password;
  }

  /**
   * @param password the password to set
   */
  public void setPassword(String password) {
    this.password = password;
  }

  /**
   * @return the newPassword
   */
  public String getNewPassword() {
    return newPassword;
  }

  /**
   * @param newPassword the newPassword to set
   */
  public void setNewPassword(String newPassword) {
    this.newPassword = newPassword;
  }
  
  public String changePassword() throws IdentityManagerException {
    if(identityManager.changePassword(password, newPassword))
      return "/exporter/chDataConfirmation";
    else
      return "/exporter/chDataFail";
  }
  
}
