package com.tramex.sisoprega.gateway.ws;

import java.util.List;
import java.util.logging.Logger;

import javax.annotation.Resource;
import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.ejb.EJB;
import javax.ejb.SessionContext;
import javax.ejb.Stateless;
import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;

import com.tramex.sisoprega.identity.IdentityManagerException;
import com.tramex.sisoprega.identity.RemoteIdentity;
import com.tramex.sisoprega.identity.dto.User;

/**
 * Session Bean implementation class IdentityGatewayBean
 */
@Stateless
@WebService(name = "IdentityGateway")
@RolesAllowed({"sisoprega_admin", "mx_usr", "us_usr", "rancher", "agency"})
public class IdentityGatewayBean {

  private Logger log = Logger.getLogger(IdentityGatewayBean.class.getCanonicalName());

  @Resource
  private SessionContext ejbContext;
  
  @EJB(lookup="java:global/BusinessLogicProxy/IdentityManagerBean")
  private RemoteIdentity identityManager;

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
    identityManager.createUser(user);
    return "OK";
  }

  /**
   * Creates a new rancherUser in database.
   * 
   * @param rancherId
   * @param userName
   * @param password
   * 
   * @return
   * @throws IdentityManagerException
   */
  @RolesAllowed("sisoprega_admin")
  @WebMethod(operationName = "CreateRancherUser")
  public String CreateRancherUser(@WebParam(name = "rancherId") Long rancherId,@WebParam(name = "userName") String userName, @WebParam(name = "password") String password) throws IdentityManagerException {
    log.info("Creating rancherUser: " + userName + " for Rancher with ID:" + rancherId);
    identityManager.createRancherUser(rancherId, userName, password);
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

    identityManager.resetPassword(userName, newPassword);
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

    if (identityManager.validateCurrentPassword(userName, previousPassword)) {
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

    identityManager.addGroup(userName, groupName);
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

    identityManager.removeGroup(userName, groupName);
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
    identityManager.removeUser(userName);
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

    return identityManager.allUsers();
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

    return identityManager.readUserRoles(userName);
  }
}
