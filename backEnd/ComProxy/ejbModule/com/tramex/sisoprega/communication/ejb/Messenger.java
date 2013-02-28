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

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.Authenticator;
import java.net.PasswordAuthentication;
import java.net.URL;
import java.net.URLConnection;
import java.util.Properties;
import java.util.logging.Logger;

import javax.annotation.Resource;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.mail.Session;

import com.tramex.sisoprega.common.messenger.Messageable;
import com.tramex.sisoprega.communication.dto.Attachment;
import com.tramex.sisoprega.communication.dto.Email;
import com.tramex.sisoprega.communication.dto.Sms;
import com.tramex.sisoprega.communication.email.EmailSender;
import com.tramex.sisoprega.communication.email.InitEmailProviderException;
import com.tramex.sisoprega.communication.sms.InitSmsProviderException;
import com.tramex.sisoprega.communication.sms.SmsProvider;
import com.tramex.sisoprega.datamodel.RemoteModelable;
import com.tramex.sisoprega.dto.EnterpriseRancher;
import com.tramex.sisoprega.dto.Rancher;

/**
 * This proxy knows the logic to send messages to ranchers.<BR/>
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 01/13/2013  Diego Torres                  Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 */
@Stateless
public class Messenger implements Messageable {

  private Logger log = Logger.getLogger(Messenger.class.getCanonicalName());

  private String userName;
  private String password;

  @EJB(lookup = "java:global/DataModel/BaseDataModel")
  private RemoteModelable dataModel;

  @EJB(lookup = "java:global/ComProxy/SmtpEmailSender")
  private EmailSender smtp;

  @EJB(lookup = "java:global/ComProxy/MasMensajesProvider")
  private SmsProvider smsMan;

  @Resource(lookup = "mail/sisoprega")
  private Session mailSession;

  @Resource(lookup = "comProxy/Properties")
  private Properties comProxyProps;

  private final static String REPORTING_URL_PROPERTY = "reporting.application";

  /**
   * Default constructor.
   * 
   * @throws InitSmsProviderException
   * @throws InitEmailProviderException
   */
  public Messenger() throws InitSmsProviderException, InitEmailProviderException {
  }

  /*
   * (non-Javadoc)
   * 
   * @see
   * com.tramex.sisoprega.communication.ejb.MessengerLocal#sendReport(com.tramex
   * .sisoprega.dto.Rancher, java.lang.String)
   */
  @Override
  public boolean sendReport(Rancher rancher, String reportName) {
    log.entering(this.getClass().getCanonicalName(), "sendReport");
    return sendReport(reportName, rancher.getPhone(), rancher.getEmailAddress());
  }

  /*
   * (non-Javadoc)
   * 
   * @see
   * com.tramex.sisoprega.communication.ejb.MessengerLocal#sendReport(com.tramex
   * .sisoprega.dto.EnterpriseRancher, java.lang.String)
   */
  @Override
  public boolean sendReport(EnterpriseRancher rancher, String reportName) {
    log.entering(this.getClass().getCanonicalName(), "sendReport(EnterpriseRancher, reportName)");
    return sendReport(reportName, rancher.getTelephone(), rancher.getEmail());
  }

  /*
   * (non-Javadoc)
   * 
   * @see
   * com.tramex.sisoprega.communication.ejb.MessengerLocal#sendSimpleMessage
   * (com.tramex.sisoprega.dto.Rancher, java.lang.String)
   */
  @Override
  public boolean sendSimpleMessage(Rancher rancher, String message) {
    return sendSMS(rancher.getPhone(), message) && sendSimpleEmail(rancher.getEmailAddress(), message);
  }

  /*
   * (non-Javadoc)
   * 
   * @see
   * com.tramex.sisoprega.communication.ejb.MessengerLocal#sendSimpleMessage
   * (com.tramex.sisoprega.dto.EnterpriseRancher, java.lang.String)
   */
  @Override
  public boolean sendSimpleMessage(EnterpriseRancher rancher, String message) {
    return sendSMS(rancher.getTelephone(), message) && sendSimpleEmail(rancher.getEmail(), message);
  }

  private boolean sendSMS(String to, String message) {
    String from = comProxyProps.getProperty("sms.from");
    if(to == null || to.equals(""))
      return false;
    Sms sms = new Sms(to, from, message);
    try {
      smsMan.setConfiguration(comProxyProps);

      String userId, password;
      userId = comProxyProps.getProperty("sms.user");
      password = comProxyProps.getProperty("sms.password");
      smsMan.doLogin(userId, password);

      smsMan.sendSMS(sms);
      log.info("SENT SMS: " + message);
      return true;
    } catch (Exception e) {
      return false;
    }
  }

  private boolean sendSimpleEmail(String to, String message) {
    String from = "tramex@sisoprega.com";
    String title = "Mensaje de Eastmann Livestock.";
    
    if(to.equals(""))
      return false;
    
    Email email = new Email(to, from, title, message);

    try {
      smtp.sendEmail(email, mailSession);
      return true;
    } catch (Exception e) {
      return false;
    }
  }

  private boolean sendEmail(String to, String reportName) {

    try {
      
      if(to==null || to.equals(""))
        return false;
      
      URL url = new URL(comProxyProps.getProperty(REPORTING_URL_PROPERTY) + reportName);

      String from = "tramex@sisoprega.com";
      String content = "Encuentre anexo el reporte con los detalles de este mensaje.";
      reportName = reportName.substring(0, reportName.indexOf('?'));
      Email email = new Email(to, from, reportName, content);

      Attachment attachment = new Attachment();
      attachment.setAttachmentType("application/pdf");
      String[] pathParts = url.getPath().split("/");
      int iFileNamePart = pathParts.length - 1;
      attachment.setFileName(pathParts[iFileNamePart] + ".pdf");

      attachment.setContent(readPDF(url));
      email.setAttachment(attachment);

      smtp.sendEmail(email, mailSession);
      log.info("sent email");
      return true;
    } catch (Exception e) {
      log.severe("Unable to read file from localhost." + e.getMessage());
      log.throwing(this.getClass().getCanonicalName(), "sendReport(EnterpriseRancher, reportName)", e);
      return false;
    }
  }

  @Override
  public boolean sendReport(long rancherId, String reportName) {
    log.entering(this.getClass().getCanonicalName(), "sendReport(rancherId, reportName)");

    Rancher person = null;
    try {
      log.fine("Reading person rancher [" + rancherId + "] from dataModel");
      person = dataModel.readSingleDataModel("RANCHER_BY_ID", "rancherId", rancherId, Rancher.class);
      log.finer("person obtained from dataModel:" + person);

      if (person != null) {
        log.fine("Sending reportName: " + reportName);
        return sendReport(person, reportName);
      }
    } catch (Exception e) {
      log.fine("Person not found with provided id [" + rancherId + "]");
    }

    EnterpriseRancher enterprise = null;
    try {
      log.fine("Reading enterprise rancher [" + rancherId + "] from dataModel");
      enterprise = dataModel.readSingleDataModel("ENTERPRISE_RANCHER_BY_ID", "enterpriseId", rancherId, EnterpriseRancher.class);
      log.finer("enterprise obtained from dataModel: " + enterprise);
      if (enterprise != null) {
        log.fine("Sending reportName: " + reportName);
        return sendReport(enterprise, reportName);
      }
    } catch (Exception e) {
      log.fine("Enterprise not found with provided id [" + rancherId + "]");
    }

    return false;
  }

  @Override
  public boolean sendSimpleMessage(long rancherId, String message) {
    Rancher person = dataModel.readSingleDataModel("RANCHER_BY_ID", "rancherId", rancherId, Rancher.class);

    if (person != null) {
      return sendSimpleMessage(person, message);
    }

    EnterpriseRancher enterprise = dataModel.readSingleDataModel("ENTERPRISE_RANCHER_BY_ID", "enterpriseId", rancherId,
        EnterpriseRancher.class);
    if (enterprise != null) {
      return sendSimpleMessage(enterprise, message);
    }

    return false;
  }

  private byte[] readPDF(URL url) throws IOException {

    ByteArrayOutputStream tmpOut = new ByteArrayOutputStream();

    Authenticator.setDefault(new SisopregaAuthenticator(this.userName, this.password) {
      protected PasswordAuthentication getPasswordAuthentication() {
        return new PasswordAuthentication(this.getUserName(), this.getPassword().toCharArray());
      }
    });
    URLConnection connection = url.openConnection();
    InputStream in = connection.getInputStream();
    int contentLength = connection.getContentLength();

    if (contentLength != -1) {
      tmpOut = new ByteArrayOutputStream(contentLength);
    }

    byte[] buf = new byte[512];
    while (true) {
      int len = in.read(buf);
      if (len == -1) {
        break;
      }
      tmpOut.write(buf, 0, len);
    }
    in.close();
    tmpOut.close();

    return tmpOut.toByteArray();
  }

  private boolean sendReport(String reportName, String phone, String email) {
    log.entering(this.getClass().getCanonicalName(), "sendReport(reportName, phone, email)");
    String message = "";
    try {
      Authenticator.setDefault(new SisopregaAuthenticator(this.userName, this.password) {
        protected PasswordAuthentication getPasswordAuthentication() {
          return new PasswordAuthentication(this.getUserName(), this.getPassword().toCharArray());
        }
      });
      URL url = new URL(comProxyProps.getProperty(REPORTING_URL_PROPERTY) + "SMS/" + reportName);
      log.fine("Formed url: " + url.getPath());

      URLConnection connection = url.openConnection();
      BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
      String str;
      while ((str = in.readLine()) != null) {
        message += str;
      }
      in.close();
      log.fine("Message from report: " + message);
      boolean smsSent = sendSMS(phone, message);
      boolean emailSent = sendEmail(email, reportName);
      return smsSent && emailSent;
    } catch (Exception e) {
      log.severe("Unable to read file from localhost." + e.getMessage());
      log.throwing(this.getClass().getCanonicalName(), "sendReport(EnterpriseRancher, reportName)", e);
    }

    return false;
  }

  @Override
  public void login(String userName, String password) {
    this.userName = userName;
    this.password = password;
  }

  private class SisopregaAuthenticator extends Authenticator {
    private final String userName;
    private final String password;

    public SisopregaAuthenticator(String userName, String password) {
      this.userName = userName;
      this.password = password;
    }

    public String getUserName() {
      return this.userName;
    }

    public String getPassword() {
      return this.password;
    }

    protected PasswordAuthentication getPasswordAuthentication() {
      return new PasswordAuthentication(this.userName, this.password.toCharArray());
    }
  }

}
