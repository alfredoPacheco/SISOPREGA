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
package com.tramex.sisoprega.communication.ejb;

import javax.ejb.Local;

import com.tramex.sisoprega.dto.EnterpriseRancher;
import com.tramex.sisoprega.dto.Rancher;

/**
 * Provides local interface for Messenger ejb, which knows how to send messages
 * to ranchers.
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * Jan 13, 2013     Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 * 
 */
@Local
public interface MessengerLocal {
  public boolean sendSimpleMessage(long rancherId, String message);
  public boolean sendReport(long rancherId, String reportName);
  public boolean sendReport(Rancher rancher, String reportName);
  public boolean sendReport(EnterpriseRancher rancher, String reportName);
  public boolean sendSimpleMessage(Rancher rancher, String message);
  public boolean sendSimpleMessage(EnterpriseRancher rancher, String message);
}
