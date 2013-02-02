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
package com.tramex.sisoprega.identity.dto;

import java.util.LinkedList;
import java.util.List;

/**
 * Data model for Users
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
public class User {

  private String userName;
  private String password;
  private List<Role> groups = new LinkedList<Role>();
  
  /**
   * @return the groups
   */
  public List<Role> getGroups() {
    return groups;
  }

  /**
   * @param groups the groups to set
   */
  public void setGroups(List<Role> groups) {
    this.groups = groups;
  }

  /**
   * @return the userName
   */
  public String getUserName() {
    return userName;
  }
  
  /**
   * @param userName the userName to set
   */
  public void setUserName(String userName) {
    this.userName = userName;
  }
  
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
   * Adds the given group name to user entity
   * @param groupName
   */
  public void addGroup(Role group){
    this.groups.add(group);
  }
  
  /**
   * Removes the given group name from user entity.
   * @param groupName
   */
  public void removeGroup(Role group){
    this.groups.remove(group);
    if(!group.getUser().equals(this))
      group.setUser(this);
  }
  
  @Override
  public boolean equals(Object obj) {
    if(obj instanceof User){
      return this.getUserName().equals(((User) obj).getUserName());
    }else{
      return false;
    }
  }
}
