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
package com.tramex.sisoprega.common.messenger;

import com.tramex.sisoprega.dto.EnterpriseRancher;
import com.tramex.sisoprega.dto.Rancher;

/**
 * The interface presents the contract that each Messenger proxy should apply.<BR/>
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 01/16/2013  Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 */
public interface Messageable {
  
  /**
   * Send a given report by name to a rancher
   * @param rancherId
   * @param reportName
   * @return
   */
  boolean sendReport(long rancherId, String reportName);
  
  /**
   * Send a simple message to a given rancher id.
   * @param rancherId
   * @param message
   * @return
   */
  boolean sendSimpleMessage(long rancherId, String message);
  
  
  /**
   * Send a given report by name to a person rancher.
   * @param rancher
   * @param reportName
   * @return
   */
  boolean sendReport(Rancher rancher, String reportName);

  /**
   * Send a given report by name to an enterprise rancher.
   * @param rancher
   * @param reportName
   * @return
   */
  boolean sendReport(EnterpriseRancher rancher, String reportName);

  /**
   * Send a simple message to a given person rancher.
   * @param rancher
   * @param message
   * @return
   */
  boolean sendSimpleMessage(Rancher rancher, String message);

  /**
   * Send a simple message to a given enterprise rancher.
   * @param rancher
   * @param message
   * @return
   */
  boolean sendSimpleMessage(EnterpriseRancher rancher, String message);
  
  /**
   * Set credentials
   * @param userName
   * @param password
   */
  void login(String userName, String password);
}
