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


/**
 * Data model for Roles
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
public class Role {

  private long recordId;
  private User user;
  private String role_name;
  /**
   * @return the recordId
   */
  public long getRecordId() {
    return recordId;
  }
  /**
   * @param recordId the recordId to set
   */
  public void setRecordId(long recordId) {
    this.recordId = recordId;
  }
  /**
   * @return the role_name
   */
  public String getRole_name() {
    return role_name;
  }
  /**
   * @param role_name the role_name to set
   */
  public void setRole_name(String role_name) {
    this.role_name = role_name;
  }
  /**
   * @return the user
   */
  public User getUser() {
    return user;
  }
  /**
   * @param user the user to set
   */
  public void setUser(User user) {
    this.user = user;
    if(!user.getGroups().contains(this))
      user.getGroups().add(this);
  }
  
  @Override
  public boolean equals(Object obj) {
    if(obj instanceof Role){
      return this.getRole_name().equals(((Role) obj).getRole_name());
    }else{
      return false;
    }
  }
  
}
