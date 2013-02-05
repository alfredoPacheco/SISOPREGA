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
package com.tramex.sisoprega.dto;

import java.util.List;

/**
 * Defines the model for the Rancher invoice information.
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * Jan 29, 2013     Diego Torres                 Initial Version.
 * 02/04/2013   Diego Torres                Adding one-to-one relationship with rancher.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 * 
 */
public class RancherUser {

  private long recordId;
  private long rancherId;
  private String user_name;
  private List<Reception> receptions;
  
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
   * @return the rancherId
   */
  public long getRancherId() {
    return rancherId;
  }
  /**
   * @param rancherId the rancherId to set
   */
  public void setRancherId(long rancherId) {
    this.rancherId = rancherId;
  }
  /**
   * @return the user_name
   */
  public String getUser_name() {
    return user_name;
  }
  /**
   * @param user_name the user_name to set
   */
  public void setUser_name(String user_name) {
    this.user_name = user_name;
  }
  /**
   * @return the receptions
   */
  public List<Reception> getReceptions() {
    return receptions;
  }
  /**
   * @param receptions the receptions to set
   */
  public void setReceptions(List<Reception> receptions) {
    this.receptions = receptions;
  }
  
  public void addReception(Reception reception){
    this.receptions.add(reception);
  }
  
  public void remoreReception(Reception reception){
    this.receptions.remove(reception);
  }
  
}
