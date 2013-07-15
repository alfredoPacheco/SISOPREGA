package com.tramex.sisoprega.gateway.ws;

import java.util.ArrayList;
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

import com.tramex.sisoprega.gateway.GatewayError;
import com.tramex.sisoprega.gateway.GatewayField;
import com.tramex.sisoprega.gateway.GatewayRecord;
import com.tramex.sisoprega.gateway.request.ReadRequest;
import com.tramex.sisoprega.gateway.response.ReadResponse;
import com.tramex.sisoprega.identity.IdentityManagerException;
import com.tramex.sisoprega.identity.RemoteIdentity;
import com.tramex.sisoprega.identity.dto.Role;
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
  
  @EJB(name="PresentorBean")
  private PresentorBean presentor;

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
  public ReadResponse CreateUser(@WebParam(name = "user") User user) throws IdentityManagerException {
    ReadResponse response = new ReadResponse();
    try{
      identityManager.createUser(user);
      
      log.fine("User created: [" + user + "]");
      List<GatewayRecord> parentRecord = new ArrayList<GatewayRecord>();
      GatewayRecord userRecord = new GatewayRecord();
      userRecord.setEntity("User");
      userRecord.addField(new GatewayField("user_name", user.getUserName()));
      
      for(Role role : user.getGroups()){
        log.fine("found role in user: [" + role + "]");
        GatewayRecord roleRecord = new GatewayRecord();
        roleRecord.setEntity("Role");
        roleRecord.addField(new GatewayField("role_name", role.getRole_name()));
        userRecord.addChildRecord(roleRecord);
        log.fine("role added to result record");
      }
      
      parentRecord.add(userRecord);
      response.setParentRecord(parentRecord);
      response.setError(new GatewayError("0", "SUCCESS", "CreateUser"));
      log.fine("User created with response as [" + response + "]");
    }catch(IdentityManagerException e){
      log.severe("Unable to create user due to the following error: " + e.getMessage());
      log.throwing(this.getClass().getCanonicalName(), "ReadResponse CreateUser()", e);
      
      response.setError(new GatewayError("GW01", "Error when creating user: " + e.getMessage(), "CreateUser"));
    }
    
    return response;
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
  public ReadResponse CreateRancherUser(@WebParam(name = "rancherId") Long rancherId,@WebParam(name = "userName") String userName, @WebParam(name = "password") String password) throws IdentityManagerException {
    log.info("Creating rancherUser: " + userName + " for Rancher with ID:" + rancherId);
    identityManager.createRancherUser(rancherId, userName, password);
    
    ReadRequest request = new ReadRequest();
    GatewayRecord filter = new GatewayRecord();
    filter.setEntity("Rancher");
    List<GatewayField> fields = new ArrayList<GatewayField>();
    fields.add(new GatewayField("id", String.valueOf(rancherId)));
    filter.setField(fields);
    request.setFilter(filter);
    
    ReadResponse response = presentor.Read(request);
    
    if(response.getError().getExceptionId().equals("VAL02")){
      filter.setEntity("EnterpriseRancher");
      response = presentor.Read(request);
    }
    log.info("CreateRancherUser executed with result [" + response + "]");
    return response;
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
  public ReadResponse ResetPassword(@WebParam(name = "user_name") String userName, @WebParam(name = "password") String newPassword)
      throws IdentityManagerException {

    String loggedUser = ejbContext.getCallerPrincipal().getName();
    identityManager.resetPassword(userName, newPassword);
    
    if(userName.equalsIgnoreCase(loggedUser))
      return null;
    
    
    ReadRequest request = new ReadRequest();
    GatewayRecord filter = new GatewayRecord();
    filter.setEntity("RancherUser");
    List<GatewayField> fields = new ArrayList<GatewayField>();
    fields.add(new GatewayField("userName", userName));
    filter.setField(fields);
    request.setFilter(filter);
    
    ReadResponse response = presentor.Read(request);
    if(response.getError().getExceptionId().equals("VAL02")){
      // reset requested for rancherUser
      filter.setEntity("Rancher");
      response = presentor.Read(request);
      if(response.getError().getExceptionId().equals("VAL02")){
        filter.setEntity("EnterpriseRancher");
        response = presentor.Read(request);
      }
    }else{
      response.setError(new GatewayError("0", "SUCCESS", "ResetPassword"));
    }
    
    return response;
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
  public ReadResponse ChangePassword(@WebParam(name = "user_name") String userName,
      @WebParam(name = "previous_password") String previousPassword, @WebParam(name = "new_password") String newPassword)
      throws IdentityManagerException {

    if (identityManager.validateCurrentPassword(userName, previousPassword)) {
      return ResetPassword(userName, newPassword);
    } else {
      ReadResponse response = new ReadResponse();
      response.setError(new GatewayError("PWD01", "La contraseña actual no coincide", "ChangePassowrd"));
      return response;
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
  @PermitAll
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
