package com.tramex.sisoprega.gateway.ws;

import java.util.List;
import java.util.logging.Logger;

import javax.annotation.Resource;
import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.ejb.LocalBean;
import javax.ejb.SessionContext;
import javax.ejb.Stateless;
import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;
import javax.naming.Context;
import javax.naming.InitialContext;

import com.tramex.sisoprega.identity.IdentityManagerException;
import com.tramex.sisoprega.identity.RemoteIdentity;
import com.tramex.sisoprega.identity.dto.User;

/**
 * Session Bean implementation class IdentityGatewayBean
 */
@Stateless
@LocalBean
@WebService(name = "IdentityGateway")
@RolesAllowed({"sisoprega_admin", "mx_usr", "us_usr", "rancher"})
public class IdentityGatewayBean {

  private Logger log = Logger.getLogger(IdentityGatewayBean.class.getCanonicalName());

  @Resource
  private SessionContext ejbContext;

  @WebMethod
  @PermitAll
  public String Ping() {
    log.info("Ping service executed by [" + ejbContext.getCallerPrincipal().getName() + "]");
    return "OK";
  }

  /**
   * Creates a new user in database.
   * 
   * @param user
   * @return
   * @throws IdentityManagerException
   */
  @RolesAllowed("sisoprega_admin")
  @WebMethod(operationName = "CreateUser")
  public String CreateUser(@WebParam(name = "user") User user) throws IdentityManagerException {
    getIdentityManager().createUser(user);
    return "OK";
  }

  /**
   * Resets the password of an existing user
   * 
   * @param userName
   * @param newPassword
   * @return
   * @throws IdentityManagerException
   */
  @WebMethod(operationName = "ResetPassword")
  public String ResetPassword(@WebParam(name = "user_name") String userName, @WebParam(name = "password") String newPassword)
      throws IdentityManagerException {

    getIdentityManager().resetPassword(userName, newPassword);
    return "OK";
  }

  /**
   * try to change the password of a given user evaluating its given previous
   * password
   * 
   * @param userName
   * @param previousPassword
   * @param newPassword
   * @return
   * @throws IdentityManagerException
   */
  @WebMethod(operationName = "ChangePassword")
  public String ChangePassword(@WebParam(name = "user_name") String userName,
      @WebParam(name = "previous_password") String previousPassword, @WebParam(name = "new_password") String newPassword)
      throws IdentityManagerException {

    if (getIdentityManager().validateCurrentPassword(userName, previousPassword)) {
      return ResetPassword(userName, newPassword);
    } else {
      return "La contraseña actual no coincide.";
    }
  }

  /**
   * Add the specified group to the given user
   * 
   * @param userName
   * @param groupName
   * @return
   * @throws IdentityManagerException
   */
  @RolesAllowed("sisoprega_admin")
  @WebMethod(operationName = "AddGroup")
  public String addGroup(@WebParam(name = "user_name") String userName, @WebParam(name = "group_name") String groupName)
      throws IdentityManagerException {

    getIdentityManager().addGroup(userName, groupName);
    return "OK";
  }

  /**
   * Removes a specified group from a given user
   * 
   * @param userName
   * @param groupName
   * @return
   * @throws IdentityManagerException
   */
  @RolesAllowed("sisoprega_admin")
  @WebMethod(operationName = "RemoveGroup")
  public String removeGroup(@WebParam(name = "user_name") String userName, @WebParam(name = "group_name") String groupName)
      throws IdentityManagerException {

    getIdentityManager().removeGroup(userName, groupName);
    return "OK";
  }

  /**
   * Removes a user from database.
   * 
   * @param userName
   * @return
   * @throws IdentityManagerException
   */
  @RolesAllowed("sisoprega_admin")
  @WebMethod(operationName = "RemoveUser")
  public String removeUser(@WebParam(name = "user_name") String userName) throws IdentityManagerException {
    getIdentityManager().removeUser(userName);
    return "OK";
  }

  /**
   * Retrieves the list of all users
   * 
   * @return
   * @throws IdentityManagerException
   */
  @WebMethod(operationName = "ReadAllUsers")
  public List<User> readAllUsers() throws IdentityManagerException {

    log.info("Retrieving list of users.");

    return getIdentityManager().allUsers();
  }

  /**
   * Retrieves all role names for a given user name.
   * 
   * @param userName
   * @return
   * @throws IdentityManagerException
   */
  @WebMethod(operationName = "ReadUserRoles")
  public List<String> readUserRoles(@WebParam(name = "userName") String userName) throws IdentityManagerException {
    log.info("Retrieving list of users.");

    return getIdentityManager().readUserRoles(userName);
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
