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
package com.tramex.sisoprega.gateway.ws;

import java.util.List;
import java.util.logging.Logger;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;
import javax.naming.Context;
import javax.naming.InitialContext;

import com.tramex.sisoprega.identity.IdentityManagerException;
import com.tramex.sisoprega.identity.RemoteIdentity;
import com.tramex.sisoprega.identity.dto.User;

/**
 * IdentityGateway provides the web service and the web methods that will be
 * consumed by the UI applications to administer users, groups and passwords.<BR/>
 * The IdentityGateway must decide which proxy will attend the request.
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 02/01/2012  Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 */
@WebService(serviceName = "IdentityService")
public class IdentityGateway {
  
  protected Logger log = Logger.getLogger(IdentityGateway.class.getCanonicalName());
  
  /**
   * Creates a new user in database.
   * @param user
   * @return
   * @throws IdentityManagerException 
   */
  @WebMethod(operationName = "CreateUser")
  public String CreateUser(@WebParam(name = "user") User user) throws IdentityManagerException{
    getIdentityManager().createUser(user);
    return "OK";
  }
  
  /**
   * Resets the password of an existing user
   * @param userName
   * @param newPassword
   * @return
   * @throws IdentityManagerException 
   */
  @WebMethod(operationName = "ResetPassword")
  public String ResetPassword(@WebParam(name = "user_name") String userName, @WebParam(name = "password") String newPassword) throws IdentityManagerException{
    getIdentityManager().resetPassword(userName, newPassword);
    return "OK";
  }
  
  /**
   * try to change the password of a given user evaluating its given previous password
   * @param userName
   * @param previousPassword
   * @param newPassword
   * @return
   * @throws IdentityManagerException 
   */
  @WebMethod(operationName = "ChangePassword")
  public String ChangePassword(@WebParam(name = "user_name") String userName, @WebParam(name = "previous_password") String previousPassword, @WebParam(name = "new_password") String newPassword) throws IdentityManagerException{
    if(getIdentityManager().validateCurrentPassword(userName, previousPassword)){
      return ResetPassword(userName, newPassword);
    }else{
      return "La contraseña actual no coincide.";
    }
  }
  
  /**
   * Add the specified group to the given user
   * @param userName
   * @param groupName
   * @return
   * @throws IdentityManagerException
   */
  @WebMethod(operationName = "AddGroup")
  public String addGroup(@WebParam(name = "user_name") String userName, @WebParam(name = "group_name") String groupName) throws IdentityManagerException{
    getIdentityManager().addGroup(userName, groupName);
    return "OK";
  }

  /**
   * Removes a specified group from a given user
   * @param userName
   * @param groupName
   * @return
   * @throws IdentityManagerException
   */
  @WebMethod(operationName = "RemoveGroup")
  public String removeGroup(@WebParam(name = "user_name") String userName, @WebParam(name = "group_name") String groupName) throws IdentityManagerException{
    getIdentityManager().removeGroup(userName, groupName);
    return "OK";
  }
  
  /**
   * Retrieves the list of all users
   * @return
   * @throws IdentityManagerException
   */
  @WebMethod(operationName = "ReadAllUsers")
  public List<User> readAllUsers() throws IdentityManagerException{
    return getIdentityManager().allUsers();
  }
  
  private RemoteIdentity getIdentityManager() {
    Context jndiContext = null;
    RemoteIdentity im = null;
    try {
      jndiContext = new InitialContext();
      im = (RemoteIdentity) jndiContext.lookup("java:global/Proxy/IdentityManager");
    } catch (java.lang.Exception e) {
      log.severe("Unable to load jndi context component");
      log.throwing(this.getClass().getName(), "getCruddable", e);
    }
    return im;
  }
  
}
