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
package com.tramex.sisoprega.identity.proxy.bean;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.ejb.Stateless;

import com.tramex.sisoprega.dto.EnterpriseRancher;
import com.tramex.sisoprega.dto.EnterpriseUser;
import com.tramex.sisoprega.dto.Rancher;
import com.tramex.sisoprega.dto.RancherUser;
import com.tramex.sisoprega.identity.IdentityManagerException;
import com.tramex.sisoprega.identity.RemoteIdentity;
import com.tramex.sisoprega.identity.dto.Role;
import com.tramex.sisoprega.identity.dto.User;
import com.tramex.sisoprega.proxy.common.BaseBean;

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
 * 02/01/2013  Diego Torres                 Initial Version.
 * 02/06/2013  Diego Torres                 Add group only when group is not assigned to user.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 */
@Stateless
@RolesAllowed("sisoprega_admin")
public class IdentityManagerBean extends BaseBean implements RemoteIdentity {

  /*
   * (non-Javadoc)
   * 
   * @see
   * com.tramex.sisoprega.identity.RemoteIdentity#createUser(com.tramex.sisoprega
   * .identity.dto.User)
   */
  @Override
  public void createUser(User user) throws IdentityManagerException {
    if (validateEntity(user)) {
      user.setPassword(hashPassword(user.getPassword()));
      dataModel.createDataModel(user);
    }
  }

  /*
   * (non-Javadoc)
   * 
   * @see
   * com.tramex.sisoprega.identity.RemoteIdentity#createRancherUser(com.tramex
   * .sisoprega.dto.RancherUser, java.lang.String)
   */
  @Override
  public void createRancherUser(Long rancherId, String userName, String password) throws IdentityManagerException {
    log.info("Entering to IdentityBean");
    Rancher rancher = dataModel.readSingleDataModel("RANCHER_BY_ID", "Id", rancherId, Rancher.class);
    if (rancher != null) {
      log.info("Retrieving rancher successfull");
      RancherUser rancherUser = getRancherUser(userName, password);

      rancher.addRancherUser(rancherUser);
      dataModel.updateDataModel(rancher);

    } else {
      EnterpriseRancher er = dataModel.readSingleDataModel("ENTERPRISERANCHER_BY_ID", "Id", rancherId, EnterpriseRancher.class);
      if(er != null){
        log.info("Retrieving enterprise rancher successfull");
        EnterpriseUser enterpriseUser = getEnterpriseUser(userName, password);
        
        er.addEnterpriseUser(enterpriseUser);
        dataModel.updateDataModel(er);
      }else{
        throw new IdentityManagerException("Ganadero no encontrado.");
      }
    }
  }
  
  private RancherUser getRancherUser(String userName, String password) throws IdentityManagerException{
    saveUserForRancher(userName, password);

    RancherUser rancherUser = new RancherUser();
    rancherUser.setUser_name(userName);
    
    return rancherUser;
  }

  private EnterpriseUser getEnterpriseUser(String userName, String password) throws IdentityManagerException{
    saveUserForRancher(userName, password);
    
    EnterpriseUser rancherUser = new EnterpriseUser();
    rancherUser.setUser_name(userName);
    
    return rancherUser;

  }
  
  private void saveUserForRancher(String userName, String password) throws IdentityManagerException {
    User user = new User();

    user.setUserName(userName);
    user.setPassword(password);

    Role role = new Role();
    role.setRole_name("rancher");
    role.setUser_name(userName);
    user.addGroup(role);
    
    createUser(user);
  }

  /*
   * (non-Javadoc)
   * 
   * @see
   * com.tramex.sisoprega.identity.RemoteIdentity#resetPassword(java.lang.String
   * , java.lang.String)
   */
  @Override
  public void resetPassword(String userName, String newPassword) throws IdentityManagerException {

    User user = getUserFromName(userName);
    newPassword = hashPassword(newPassword);
    user.setPassword(newPassword);
    dataModel.updateDataModel(user);

  }

  /*
   * (non-Javadoc)
   * 
   * @see
   * com.tramex.sisoprega.identity.RemoteIdentity#addGroup(java.lang.String,
   * java.lang.String)
   */
  @Override
  public void addGroup(String userName, String groupName) throws IdentityManagerException {
    User user = getUserFromName(userName);
    if (!user.getGroups().contains(groupName)) {
      log.fine("group not found in user to be added:" + groupName);
      Role newGroup = new Role();
      newGroup.setRole_name(groupName);
      newGroup.setUser_name(userName);

      user.getGroups().add(newGroup);
      log.fine("Updating records on database");
      dataModel.updateDataModel(user);
    }
  }

  /*
   * (non-Javadoc)
   * 
   * @see
   * com.tramex.sisoprega.identity.RemoteIdentity#removeGroup(java.lang.String,
   * java.lang.String)
   */
  @Override
  public void removeGroup(String userName, String groupName) throws IdentityManagerException {
    log.entering(this.getClass().getCanonicalName(), "removeGroup");
    User user = getUserFromName(userName);

    log.fine("checking if group [" + groupName + "] is contained in user");
    Role groupToRemove = null;

    for (Role group : user.getGroups()) {
      if (group.getRole_name().equalsIgnoreCase(groupName)) {
        groupToRemove = group;
        log.fine("Deleting group record on database");
        dataModel.deleteDataModel(group, "");
        break;
      }
    }

    log.fine("group found in user to be removed:" + groupName);
    user.getGroups().remove(groupToRemove);

    dataModel.updateDataModel(user);
    log.fine("Updating user record with new set of groups");
    return;
  }

  @Override
  public void removeUser(String userName) throws IdentityManagerException {
    log.entering(this.getClass().getCanonicalName(), "removeGroup");

    User user = getUserFromName(userName);
    dataModel.deleteDataModel(user, "");

    log.fine("User record removed");
    return;
  }

  /*
   * (non-Javadoc)
   * 
   * @see com.tramex.sisoprega.identity.RemoteIdentity#allUsers()
   */
  @PermitAll
  @Override
  public List<User> allUsers() throws IdentityManagerException {
    List<User> users = dataModel.readDataModelList("ALL_NO_RANCHER_USERS", null, User.class);
    List<User> result = new ArrayList<User>();
    for (User user : users) {
      User uCopy = new User();
      uCopy.setUserName(user.getUserName());
      uCopy.setPassword("!$NoChanged$!");
      uCopy.setGroups(new ArrayList<Role>());
      uCopy.getGroups().addAll(user.getGroups());
      result.add(uCopy);
    }

    return result;
  }

  /*
   * (non-Javadoc)
   * 
   * @see
   * com.tramex.sisoprega.identity.RemoteIdentity#validateCurrentPassword(java
   * .lang.String, java.lang.String)
   */
  @Override
  public boolean validateCurrentPassword(String userName, String password) throws IdentityManagerException {
    log.fine("validatingCurrenPassword using [" + getLoggedUser() + "] as principal");
    User user = getUserFromName(userName);
    log.fine("[" + user.getPassword() + "] == [" + hashPassword(password) + "] ?");
    return user.getPassword().equals(hashPassword(password));
  }

  @RolesAllowed({ "sisoprega_admin", "agency", "us_usr" })
  @Override
  public List<String> readUserRoles(String userName) throws IdentityManagerException {
    User user = getUserFromName(userName);
    List<String> result = new LinkedList<String>();
    for (Role role : user.getGroups()) {
      result.add(role.getRole_name());
    }

    return result;
  }

  private User getUserFromName(String userName) throws IdentityManagerException {
    Map<String, Object> parameters = new HashMap<String, Object>();
    parameters.put("userName", userName);
    List<User> users = dataModel.readDataModelList("USER_BY_NAME", parameters, User.class);

    if (!users.isEmpty()) {
      return users.get(0);
    } else {
      throw new IdentityManagerException("Unable to find given user.");
    }
  }

  private String hashPassword(String password) throws IdentityManagerException {
    char[] HEXADECIMAL = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f' };
    MessageDigest md;
    try {
      md = MessageDigest.getInstance("MD5");
    } catch (NoSuchAlgorithmException e) {
      throw new IdentityManagerException(e);
    }

    md.reset();

    byte[] bytes = md.digest(password.getBytes());
    StringBuilder sb = new StringBuilder(2 * bytes.length);
    for (int i = 0; i < bytes.length; i++) {
      int low = (int) (bytes[i] & 0x0f);
      int high = (int) ((bytes[i] & 0xf0) >> 4);
      sb.append(HEXADECIMAL[high]);
      sb.append(HEXADECIMAL[low]);
    }
    return sb.toString();
  }

}
