/**
 * 
 */
package com.tramex.sisoprega.identity.dto;

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
 * Feb 2, 2013     Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 * 
 */
public class Role {

  private String role_name;
  private String user_name;
  private long record_id;

  /**
   * @return the role_name
   */
  public String getRole_name() {
    return role_name;
  }

  /**
   * @param role_name
   *          the role_name to set
   */
  public void setRole_name(String role_name) {
    this.role_name = role_name;
  }

  /**
   * @return the user_name
   */
  public String getUser_name() {
    return user_name;
  }

  /**
   * @param user_name
   *          the user_name to set
   */
  public void setUser_name(String user_name) {
    this.user_name = user_name;
  }
  
  @Override
  public boolean equals(Object obj) {
    if(obj instanceof Role){
      return this.getRole_name().equals(((Role) obj).getRole_name());
    }else if (obj instanceof String){
      return this.getRole_name().equals(obj);
    } else {
      return false;
    }
  }

  /**
   * @return the record_id
   */
  public long getRecord_id() {
    return record_id;
  }

  /**
   * @param record_id the record_id to set
   */
  public void setRecord_id(long record_id) {
    this.record_id = record_id;
  }

}
