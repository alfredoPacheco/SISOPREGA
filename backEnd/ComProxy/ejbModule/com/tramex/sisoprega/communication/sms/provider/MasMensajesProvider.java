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
package com.tramex.sisoprega.communication.sms.provider;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.Properties;
import java.util.logging.Logger;

import javax.annotation.security.RolesAllowed;
import javax.ejb.Stateless;

import com.tramex.sisoprega.communication.dto.Sms;
import com.tramex.sisoprega.communication.sms.InitSmsProviderException;
import com.tramex.sisoprega.communication.sms.LoginSmsException;
import com.tramex.sisoprega.communication.sms.SendSmsException;
import com.tramex.sisoprega.communication.sms.SmsProvider;

/**
 * Send SMS Messages using Clickatell provider.<BR/>
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 *             Alan del Rio                 Initial Version.
 * 01/26/2013  Diego Torres                 Implement as EJB.           
 * 02/25/2013  Alfredo Pacheco & Diego T.   Cutting msg to 160 characters max 
 * ====================================================================================
 * </PRE>
 * 
 * @author Alan del Rio
 * 
 */
@Stateless
@RolesAllowed({ "mx_usr", "us_usr" })
public class MasMensajesProvider implements SmsProvider {
  
  private Logger log = Logger.getLogger(MasMensajesProvider.class.getCanonicalName());
  
  private String apiID;
  private static final String REQUEST_GET = "GET";
  private static final String API_URL = "https://www.masmensajes.com.mx/wss/smsapi13.php";
  private static final String REQUEST = "%s?usuario=%s&password=%s&celular=%s&mensaje=%s";

  private String userID;
  private String passWord;
  private String responseMsg;
  private response ack;

  @Override
  public void doLogin(final String userID, final String passWord) throws LoginSmsException {
    log.entering(this.getClass().getCanonicalName(), "void doLogin(userID[" + userID + "], password)");
    this.userID = userID;
    this.passWord = passWord;
    log.exiting(this.getClass().getCanonicalName(), "void doLogin(userID, password)");
  }  

  @Override
  public void sendSMS(final Sms sms) throws SendSmsException {
    log.entering(this.getClass().getCanonicalName(), "void sendSMS(sms[" + sms + "]");
    final String sRequest;
    final URL url;
    try {
    	
	  if(sms.getMsg().length() > 160){
		  sms.setMsg(sms.getMsg().substring(0, 157));
		  sms.setMsg(sms.getMsg() + "...");
		  log.fine("Message cut due to over size : [" + sms.getMsg() + "]");
	  }
      sRequest = String.format(REQUEST, API_URL, this.userID, this.passWord, sms.getTo(),URLEncoder.encode(sms.getMsg(), "UTF-8"));
      log.fine("formed GET HTTP Request:[" + sRequest + "]");
      
      url = new URL(sRequest);
      HttpURLConnection conn = (HttpURLConnection) url.openConnection();
      conn.setRequestMethod(REQUEST_GET);
      conn.connect();
      log.fine("connected to GET URL");
      
      this.setResponse(conn);
      log.fine("Response from HTTP: Ack [" + this.getAck() + "] : Response [" + this.getResponse() + "] : ResponseMessage : [" + this.getResponseMsg() + "]");
      conn.disconnect();
      log.fine("HTTP Disconnected");
    } catch (MalformedURLException e) {
      throw new SendSmsException("Error Creating URL Request: " + e.getMessage());
    } catch (UnsupportedEncodingException e) {
      throw new SendSmsException("Invalid Encoding: ".concat(e.getMessage()));
    } catch (IOException e) {
      throw new SendSmsException("Error Establishing Connection: " + e.getMessage());
    } catch (Exception e) {
      throw new SendSmsException("Run Time Exception " + e.getMessage());
    }
    log.exiting(this.getClass().getCanonicalName(), "void sendSMS(sms[" + sms + "]");
  }

  public response getResponse() {
    return this.ack;
  }

  private void setResponse(final HttpURLConnection conn) throws SendSmsException {
    log.entering(this.getClass().getCanonicalName(), "void setResponse(final HttpURLConnection[" + conn + "])");
    try {
      BufferedReader br;
      if (conn.getResponseCode() != 200) {
        this.ack = response.ERROR;
        this.responseMsg = "Request Failed, HTTP code : " + conn.getResponseCode();
      } else {
        br = new BufferedReader(new InputStreamReader((conn.getInputStream())));
        if ((this.responseMsg = br.readLine()) != null) {
          String[] split = this.responseMsg.split(":");
          if (split[0].equalsIgnoreCase("ERR")) {
            this.ack = response.ERROR;
          } else {
            this.ack = response.OK;
          }
        } else {
          this.responseMsg = "Empty Response";
          this.ack = response.WARNING;
        }
      }
    } catch (IOException e) {
      log.severe(e.getMessage());
      log.throwing(this.getClass().getCanonicalName(), "void setResponse(final HttpURLConnection)", e);
      System.out.println(e.getMessage());
      throw new SendSmsException("Failed to get response: " + e.getMessage());
    }
    log.exiting(this.getClass().getCanonicalName(), "void setResponse(final HttpURLConnection)");
  }

  public static String getREQUEST_GET() {
    return REQUEST_GET;
  }

  public static String getAPI_URL() {
    return API_URL;
  }

  public String getApiID() {
    return apiID;
  }

  public static String getREQUEST() {
    return REQUEST;
  }

  public String getUserID() {
    return userID;
  }

  public String getPassWord() {
    return passWord;
  }

  public String getResponseMsg() {
    return responseMsg;
  }

  public response getAck() {
    return ack;
  }

  @Override
  public void setConfiguration(Properties props) throws InitSmsProviderException {
    try {
      this.doLogin(props.getProperty("sms.user"), props.getProperty("sms.password"));
    } catch (Exception e) {
      throw new InitSmsProviderException("Error retrieving sms properties.");
    }
  }
}
