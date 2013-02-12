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
 * ====================================================================================
 * </PRE>
 * 
 * @author Alan del Rio
 * 
 */
@Stateless
public class MasMensajesProvider implements SmsProvider {
  private static final String REQUEST_GET = "GET";
  private static final String API_URL = "http://www.masmensajes.com.mx/wss/smsapi11.php";
  private String apiID;
  private static final String REQUEST = "%s?usuario=%s&password=%s&celular=%s&mensaje=%s";
  private String userID;
  private String passWord;
  private String responseMsg;
  private response ack;

  @Override
  public void doLogin(final String userID, final String passWord) throws LoginSmsException {
    this.userID = userID;
    this.passWord = passWord;
  }  

  @Override
  public void sendSMS(final Sms sms) throws SendSmsException {
    final String sRequest;
    final URL url;
    try {
      sRequest = String.format(REQUEST, API_URL, this.userID, this.passWord, sms.getTo(),URLEncoder.encode(sms.getMsg(), "UTF-8"));
      url = new URL(sRequest);
      HttpURLConnection conn = (HttpURLConnection) url.openConnection();
      conn.setRequestMethod(REQUEST_GET);
      conn.connect();
      this.setResponse(conn);
      conn.disconnect();
    } catch (MalformedURLException e) {
      throw new SendSmsException("Error Creating URL Request: " + e.getMessage());
    } catch (UnsupportedEncodingException e) {
      throw new SendSmsException("Invalid Encoding: ".concat(e.getMessage()));
    } catch (IOException e) {
      throw new SendSmsException("Error Establishing Connection: " + e.getMessage());
    } catch (Exception e) {
      throw new SendSmsException("Run Time Exception " + e.getMessage());
    }
  }

  public response getResponse() {
    return this.ack;
  }

  private void setResponse(final HttpURLConnection conn) throws SendSmsException {
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
          }
        } else {
          this.responseMsg = "Empty Response";
          this.ack = response.WARNING;
        }
      }
    } catch (IOException e) {
      System.out.println(e.getMessage());
      throw new SendSmsException("Failed to get response: " + e.getMessage());
    }

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
      this.doLogin(props.getProperty("masmensajes.user"), props.getProperty("masmensajes.password"));
    } catch (Exception e) {
      throw new InitSmsProviderException("Error retrieving sms properties.");
    }
  }
}
