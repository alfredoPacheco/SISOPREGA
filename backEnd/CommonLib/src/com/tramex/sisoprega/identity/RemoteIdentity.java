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
package com.tramex.sisoprega.identity;

import java.util.List;

import com.tramex.sisoprega.identity.dto.User;

/**
 * Interfaces the data model for objects with database.
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * Feb 1, 2013     Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 * 
 */
public interface RemoteIdentity {
  /**
   * Create a user
   * @param user
   * @throws IdentityManagerException
   */
  void createUser(User user) throws IdentityManagerException;
  
  /**
   * Create a rancher. Encrypts password.
   * @param rancherId
   * @param userName
   * @param password
   * @throws IdentityManagerException
   */
  void createRancherUser(Long rancherId, String userName, String password) throws IdentityManagerException;

  /**
   * Reset user password. Encrypts password.
   * @param userName
   * @param newPassword
   * @throws IdentityManagerException
   */
  void resetPassword(String userName, String newPassword) throws IdentityManagerException;

  /**
   * Add group to user.
   * @param userName
   * @param groupName
   * @throws IdentityManagerException
   */
  void addGroup(String userName, String groupName) throws IdentityManagerException;

  /**
   * Remove group from user
   * @param userName
   * @param groupName
   * @throws IdentityManagerException
   */
  void removeGroup(String userName, String groupName) throws IdentityManagerException;
  
  void removeUser(String userName) throws IdentityManagerException;

  /**
   * Validate current password
   * @param userName
   * @param password
   * @return
   * @throws IdentityManagerException
   */
  boolean validateCurrentPassword(String userName, String password) throws IdentityManagerException;

  /**
   * Retrieve all users from database.
   * @return
   * @throws IdentityManagerException
   */
  List<User> allUsers() throws IdentityManagerException;
  
  /**
   * Retrieve a list of roles to which the user belongs.
   * @param userName
   * @return
   * @throws IdentityManagerException
   */
  List<String> readUserRoles(String userName) throws IdentityManagerException;

}
