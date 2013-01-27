/**
 * 
 */
package com.tramex.sisoprega.communication.sms;

import java.util.Properties;

import com.tramex.sisoprega.communication.dto.Sms;


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
  void setConfiguration(Properties props) throws InitSmsProviderException;

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

