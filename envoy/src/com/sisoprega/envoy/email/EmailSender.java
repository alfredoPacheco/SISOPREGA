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
package com.sisoprega.envoy.email;

import java.io.File;

/**
 * Defines the contract that each email sender must implement.<BR/>
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 *             Alan Del Rio                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Alan Del Rio
 * 
 */
public interface EmailSender {
  /**
   * Build and send the email to the configured recipient.
   * 
   * @param email
   * @return
   */
  boolean sendEmail(final Email email);

  /**
   * Configures the email communication.
   * 
   * @param xmlFile
   * @throws InitEmailProviderException
   */
  void setConfiguration(File xmlFile) throws InitEmailProviderException;
}
