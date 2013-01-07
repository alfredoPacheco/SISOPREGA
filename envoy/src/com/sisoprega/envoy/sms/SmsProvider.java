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
package com.sisoprega.envoy.sms;

import java.io.File;

/**
 * This is the contract that will be implemented by SMS providers.<BR/>
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 *             Alan del Rio                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Alan del Rio
 * 
 */
public interface SmsProvider {
  enum response {
    OK, WARNING, ERROR
  }

  /**
   * Perfom login on SMS provider
   * 
   * @param userID
   * @param passWord
   * @throws LoginSmsException
   */
  void doLogin(final String userID, final String passWord) throws LoginSmsException;

  /**
   * send SMS
   * 
   * @param sms
   * @throws SendSmsException
   */
  void sendSMS(Sms sms) throws SendSmsException;

  /**
   * Load configuration instructions from XML
   * 
   * @param xmlFile
   * @throws InitSmsProviderException
   */
  void setConfiguration(File xmlFile) throws InitSmsProviderException;

  /**
   * Wait and retrieve message response.
   * 
   * @return
   */
  String getResponseMsg();

  /**
   * Acknowlege message received.
   * 
   * @return
   */
  response getAck();
}
