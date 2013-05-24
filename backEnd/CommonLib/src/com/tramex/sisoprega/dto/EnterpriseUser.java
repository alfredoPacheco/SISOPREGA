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
public class EnterpriseUser {

  private long enterpriseUserId;
  private String user_name;
  private EnterpriseRancher rancher;

  /**
   * @return the rancher
   */
  public EnterpriseRancher getRancher() {
    return rancher;
  }

  /**
   * @param rancher
   *          the rancher to set
   */
  public void setRancher(EnterpriseRancher rancher) {
    this.rancher = rancher;
  }

  /**
   * @return the rancherUserId
   */
  public long getEnterpriseUserId() {
    return enterpriseUserId;
  }

  /**
   * @param rancherUserId
   *          the rancherUserId to set
   */
  public void setEnterpriseUserId(long rancherUserId) {
    this.enterpriseUserId = rancherUserId;
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
}
