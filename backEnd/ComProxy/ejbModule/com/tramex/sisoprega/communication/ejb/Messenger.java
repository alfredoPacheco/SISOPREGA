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
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.logging.Logger;

import javax.ejb.EJB;
import javax.ejb.Stateless;

import com.sisoprega.envoy.email.Attachment;
import com.sisoprega.envoy.email.Email;
import com.sisoprega.envoy.email.EmailFactory;
import com.sisoprega.envoy.email.EmailSender;
import com.sisoprega.envoy.email.InitEmailProviderException;
import com.sisoprega.envoy.sms.InitSmsProviderException;
import com.sisoprega.envoy.sms.Sms;
import com.sisoprega.envoy.sms.SmsFactory;
import com.sisoprega.envoy.sms.SmsProvider;
import com.tramex.sisoprega.common.messenger.Messageable;
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
  SmsProvider smsMan = null;
  EmailSender smtp = null;

  @EJB(name = "java:global/DataModel/BaseDataModel")
  protected RemoteModelable dataModel;

  /**
   * Default constructor.
   * 
   * @throws InitSmsProviderException
   * @throws InitEmailProviderException
   */
  public Messenger() throws InitSmsProviderException, InitEmailProviderException {
    log.info("Loading configuration for messenger.");
    File xmlFile = new File("/sisoprega/config/envoyConfig.xml");
    smsMan = SmsFactory.getProvider("clickatell");
    smsMan.setConfiguration(xmlFile);

    smtp = EmailFactory.getSender("smtp");
    smtp.setConfiguration(xmlFile);
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
    String to = rancher.getPhone();
    String message = "";

    try {
      URL url = new URL("http://localhost:8080/ReportingGateway/SMS/" + reportName);
      BufferedReader in = new BufferedReader(new InputStreamReader(url.openStream()));
      String str;
      while ((str = in.readLine()) != null) {
        message += str;
      }
      in.close();
      return sendSMS(to, message) && sendEmail(rancher.getEmailAddress(), reportName);
    } catch (Exception e) {
      log.severe("Unable to read file from localhost." + e.getMessage());
      log.throwing(this.getClass().getCanonicalName(), "sendReport(EnterpriseRancher, reportName)", e);
    }
    return false;
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
    String message = "";
    try {
      URL url = new URL("http://localhost:8080/ReportingGateway/" + reportName);
      BufferedReader in = new BufferedReader(new InputStreamReader(url.openStream()));
      String str;
      while ((str = in.readLine()) != null) {
        message += str;
      }
      in.close();
      return sendSMS(rancher.getTelephone(), message) && sendEmail(rancher.getEmail(), reportName);
    } catch (Exception e) {
      log.severe("Unable to read file from localhost." + e.getMessage());
      log.throwing(this.getClass().getCanonicalName(), "sendReport(EnterpriseRancher, reportName)", e);
    }

    return false;
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
    String from = "SISOPREGA";
    Sms sms = new Sms(to, from, message);
    try {
      smsMan.sendSMS(sms);
      log.info("SENT SMS: " + message);
      return true;
    } catch (Exception e) {
      return false;
    }
  }

  private boolean sendSimpleEmail(String to, String message) {
    String from = "tramex@sisoprega.com";
    String title = "Mensaje simple desde TRAMEX.";
    Email email = new Email(to, from, title, message);

    try {
      smtp.sendEmail(email);
      return true;
    } catch (Exception e) {
      return false;
    }
  }

  private boolean sendEmail(String to, String reportName) {

    try {
      URL url = new URL("http://localhost:8080/ReportingGateway/" + reportName);

      String from = "tramex@sisoprega.com";
      String content = "Encuentre anexo el reporte con los detalles de este mensaje.";
      Email email = new Email(to, from, reportName, content);

      Attachment attachment = new Attachment();
      attachment.setAttachmentType("application/pdf");
      attachment.setFileName(reportName);

      attachment.setContent(readPDF(url));
      email.setAttachment(attachment);

      smtp.sendEmail(email);
      log.info("sent email");
      return true;
    } catch (Exception e) {
      log.severe("Unable to read file from localhost." + e.getMessage());
      log.throwing(this.getClass().getCanonicalName(), "sendReport(EnterpriseRancher, reportName)", e);
      return false;
    }
  }

  private byte[] readPDF(URL url) throws IOException {

    ByteArrayOutputStream tmpOut = new ByteArrayOutputStream();

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

  @Override
  public boolean sendReport(long rancherId, String reportName) {

    Rancher person = dataModel.readSingleDataModel("RANCHER_BY_ID", "rancherId", rancherId, Rancher.class);

    if (person != null) {
      return sendReport(person, reportName);
    }

    EnterpriseRancher enterprise = dataModel.readSingleDataModel("ENTERPRISE_RANCHER_BY_ID", "enterpriseId", rancherId,
        EnterpriseRancher.class);
    if (enterprise != null) {
      return sendReport(enterprise, reportName);
    }

    return false;
  }

  @Override
  public boolean sendSimpleMessage(long rancherId, String message) {
    Rancher person = dataModel.readSingleDataModel("RANCHER_BY_ID", "rancherId", rancherId, Rancher.class);

    if (person != null) {
      return sendSimpleMessage(person, message);
    }

    EnterpriseRancher enterprise = dataModel.readSingleDataModel("ENTERPRISE_RANCHER_BY_ID", "enterpriseId", rancherId, EnterpriseRancher.class);
    if (enterprise != null) {
      return sendSimpleMessage(enterprise, message);
    }

    return false;
  }
}
