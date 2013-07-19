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

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.logging.Logger;

import javax.annotation.Resource;
import javax.annotation.security.RolesAllowed;
import javax.ejb.Asynchronous;
import javax.ejb.EJB;
import javax.ejb.SessionContext;
import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.mail.Session;
import javax.naming.Context;
import javax.naming.InitialContext;

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
import com.tramex.sisoprega.reporting.Messageable;
import com.tramex.sisoprega.reporting.Reporteable;

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
@RolesAllowed({ "mx_usr", "us_usr" })
public class Messenger implements Messageable {

  private Logger log = Logger.getLogger(Messenger.class.getCanonicalName());

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

  @Resource
  private SessionContext ejbContext;

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
  public void sendReport(Rancher rancher, String reportName) {
    log.entering(this.getClass().getCanonicalName(), "sendReport(Rancher[" + rancher + "], reportName[" + reportName + "])");
    sendReport(reportName, formatPhoneNumber(rancher.getSmsPhone()), rancher.getEmailAddress());
  }

  /*
   * (non-Javadoc)
   * 
   * @see
   * com.tramex.sisoprega.communication.ejb.MessengerLocal#sendReport(com.tramex
   * .sisoprega.dto.EnterpriseRancher, java.lang.String)
   */
  @Override
  public void sendReport(EnterpriseRancher rancher, String reportName) {
    log.entering(this.getClass().getCanonicalName(), "sendReport(EnterpriseRancher[" + rancher + "], reportName[" + reportName
        + "])");
    sendReport(reportName, formatPhoneNumber(rancher.getSmsPhone()), rancher.getEmail());
  }

  /*
   * (non-Javadoc)
   * 
   * @see
   * com.tramex.sisoprega.communication.ejb.MessengerLocal#sendSimpleMessage
   * (com.tramex.sisoprega.dto.Rancher, java.lang.String)
   */
  @Override
  public void sendSimpleMessage(Rancher rancher, String message) {
    sendSMS(formatPhoneNumber(rancher.getSmsPhone()), message);
    sendSimpleEmail(rancher.getEmailAddress(), message);
  }

  /*
   * (non-Javadoc)
   * 
   * @see
   * com.tramex.sisoprega.communication.ejb.MessengerLocal#sendSimpleMessage
   * (com.tramex.sisoprega.dto.EnterpriseRancher, java.lang.String)
   */
  @Override
  public void sendSimpleMessage(EnterpriseRancher rancher, String message) {
    sendSMS(formatPhoneNumber(rancher.getSmsPhone()), message);
    sendSimpleEmail(rancher.getEmail(), message);
  }

  private boolean sendSMS(String to, String message) {
    String from = comProxyProps.getProperty("sms.from");
    if (to == null || to.equals(""))
      return false;
    Sms sms = new Sms(to, from, message);
    try {
      smsMan.setConfiguration(comProxyProps);

      String userId, password;
      userId = comProxyProps.getProperty("sms.user");
      password = comProxyProps.getProperty("sms.password");
      smsMan.doLogin(userId, password);

      smsMan.sendSMS(sms);
      log.info("SENT SMS: " + message + ", responded as [" + smsMan.getResponseMsg() + "]");
      return true;
    } catch (Exception e) {
      return false;
    }
  }

  private boolean sendSimpleEmail(String to, String message) {
    String from = "tramex@sisoprega.com";
    String title = "Mensaje de Eastmann Livestock.";

    if (to.equals(""))
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

      if (to == null || to.equals("")) {
        log.fine("No email found to send report.");
        return false;
      }

      String adaptedReportName = getReportNameAdapter(reportName);
      Map<String, Object> parameters = getAdaptedParameters(reportName);

      String reporteableInstanceName = "Pdf" + adaptedReportName;
      Reporteable reporteableInstance = getReporteableInstance(reporteableInstanceName);
      reporteableInstance.setReportName(adaptedReportName);
      reporteableInstance.setParameters(parameters);
      byte[] data = reporteableInstance.getBytes();

      String from = "tramex@sisoprega.com";
      String content = "Encuentre anexo el reporte con los detalles de este mensaje.";
      reportName = reportName.substring(0, reportName.indexOf('?'));
      Email email = new Email(to, from, reportName, content);

      Attachment attachment = new Attachment();
      attachment.setAttachmentType("application/pdf");
      attachment.setFileName(adaptedReportName + ".pdf");

      attachment.setContent(data);
      email.setAttachment(attachment);

      smtp.sendEmail(email, mailSession);
      log.info("sent email");
      return true;
    } catch (Exception e) {
      log.severe("Unable to read file from localhost. " + e.getMessage());
      log.throwing(this.getClass().getCanonicalName(), "sendReport(EnterpriseRancher, reportName)", e);
      return false;
    }
  }

  @Override
  @Asynchronous
  @TransactionAttribute(TransactionAttributeType.REQUIRES_NEW)
  public void sendReport(long rancherId, String reportName) {
    log.entering(this.getClass().getCanonicalName(), "sendReport(rancherId[" + rancherId + "], reportName[" + reportName + "])");

    Rancher person = null;
    try {
      log.fine("Reading person rancher [" + rancherId + "] from dataModel");
      person = dataModel.readSingleDataModel("RANCHER_BY_ID", "Id", rancherId, Rancher.class);
      log.finer("person obtained from dataModel:" + person);

      if (person != null) {
        log.fine("Sending reportName: " + reportName);
        sendReport(person, reportName);
      }
    } catch (Exception e) {
      log.info("Person not found with provided id [" + rancherId + "]");
    }

    if (person == null) {
      EnterpriseRancher enterprise = null;
      try {
        log.fine("Reading enterprise rancher [" + rancherId + "] from dataModel");
        enterprise = dataModel.readSingleDataModel("ENTERPRISERANCHER_BY_ID", "Id", rancherId, EnterpriseRancher.class);
        log.finer("enterprise obtained from dataModel: " + enterprise);
        if (enterprise != null) {
          log.fine("Sending reportName: " + reportName);
          sendReport(enterprise, reportName);
        }
      } catch (Exception e) {
        log.fine("Enterprise not found with provided id [" + rancherId + "]");
      }
    }
  }

  @Override
  public void sendSimpleMessage(long rancherId, String message) {
    try {
      Rancher person = dataModel.readSingleDataModel("RANCHER_BY_ID", "Id", rancherId, Rancher.class);

      if (person != null) {
        sendSimpleMessage(person, message);
      }

      EnterpriseRancher enterprise = dataModel.readSingleDataModel("ENTERPRISERANCHER_BY_ID", "Id", rancherId,
          EnterpriseRancher.class);
      if (enterprise != null) {
        sendSimpleMessage(enterprise, message);
      }
    } catch (Exception e) {
      log.warning("Unable to send message [" + message + "] to rancherId: " + rancherId);
      log.throwing(this.getClass().getCanonicalName(), "sendSimpleMessage", e);
    }
  }

  private String formatPhoneNumber(String phoneNumber) {
    if (phoneNumber.trim().equals(""))
      return "";

    String result = "+52";
    for (int i = 0; i < phoneNumber.length(); i++) {

      // If we find a non-digit character we return false.
      if (Character.isDigit(phoneNumber.charAt(i)))
        result += phoneNumber.charAt(i);
    }
    return result;
  }

  private boolean sendReport(String reportName, String phone, String email) {
    log.entering(this.getClass().getCanonicalName(), "boolean sendReport(reportName[" + reportName + "], phone[" + phone
        + "], email[" + email + "])");
    try {
      boolean smsSent = false;

      if (!phone.equals("")) {
        String adaptedReportName = getReportNameAdapter(reportName);
        Map<String, Object> parameters = getAdaptedParameters(reportName);

        String reporteableInstanceName = "Txt" + adaptedReportName;
        Reporteable reporteableInstance = getReporteableInstance(reporteableInstanceName);
        reporteableInstance.setReportName(adaptedReportName);
        reporteableInstance.setParameters(parameters);
        byte[] data = reporteableInstance.getBytes();

        String message = new String(data);

        log.fine("Message from report: " + message);

        if (!message.startsWith("Error"))
          smsSent = sendSMS(phone, message);

        log.finer("smsSent [" + smsSent + "]");
      } else {
        log.fine("No phone for SMS found, will try only email");
      }

      boolean emailSent = sendEmail(email, reportName);
      log.finer("emailSent [" + emailSent + "]");
      return smsSent && emailSent;
    } catch (Exception e) {
      log.severe("Unable to read file from localhost. " + e.getMessage());
      log.throwing(this.getClass().getCanonicalName(), "sendReport(reportName, phone, email)", e);
    }

    return false;
  }

  private Reporteable getReporteableInstance(String implementationName) {
    this.log.entering(this.getClass().getCanonicalName(), "Reporteable getReporteableInstance(" + implementationName + ")");
    Context jndiContext = null;
    Reporteable instance = null;
    String commonPrefix = "java:global/ComProxy/";
    try {
      jndiContext = new InitialContext();
      instance = (Reporteable) jndiContext.lookup(commonPrefix + implementationName);
      log.fine("Reporteable instance created for entity [" + implementationName + "]");
    } catch (java.lang.Exception e) {
      log.severe("Unable to load jndi context component");
      log.throwing(this.getClass().getName(), "Reporteable getReporteableInstance(String)", e);
    }
    return instance;
  }

  private String getReportNameAdapter(String inReportName) {
    String[] reportNameSplitted = inReportName.split("\\?");
    if (reportNameSplitted.length >= 1) {
      return reportNameSplitted[0];
    } else {
      log.finer("No parameters found in report name");
      return inReportName;
    }
  }

  private Map<String, Object> getAdaptedParameters(String inReportName) throws ParseException {
    String[] reportNameSplitted = inReportName.split("\\?");
    if (reportNameSplitted.length >= 1) {
      String sParameters = reportNameSplitted[1];
      log.fine("Splitting parameters to adapt: [" + sParameters + "]");
      String[] splittedParams = sParameters.split("\\&");
      if (splittedParams.length >= 1) {
        Map<String, Object> result = new HashMap<String, Object>();
        for (int i = 0; i < splittedParams.length; i++) {
          String param = splittedParams[i];
          log.finer("parameter found: [" + param + "]");
          String[] splittedParam = param.split("\\=");
          String key = splittedParam[0];
          if (key.equals("Id")) {
            log.finest("reading Id parameter with value [" + splittedParam[1] + "]");
            Long value = Long.parseLong(splittedParam[1]);
            result.put(key, value);
          } else if (key.equals("fromDate")) {
            log.finest("reading fromDate parameter with value [" + splittedParam[1] + "]");
            Date value = new SimpleDateFormat("MM/dd/yyyy").parse(splittedParam[1]);
            result.put(key, value);
          } else if (key.equals("toDate")) {
            log.finest("reading toDate parameter with value [" + splittedParam[1] + "]");
            Date value = new SimpleDateFormat("MM/dd/yyyy").parse(splittedParam[1]);
            result.put(key, value);
          } else if (key.equals("recordId")) {
            log.finest("reading recordId parameter with value [" + splittedParam[1] + "]");
            Long value = Long.parseLong(splittedParam[1]);
            result.put(key, value);
          } else {
            log.finest("reading parameter with value [" + splittedParam[1] + "]");
            result.put(key, splittedParam[1]);
          }
        }
        return result;
      } else {
        log.fine("Parameters found but more than 2 are expected.");
        return null;
      }
    } else {
      log.fine("No parameters found in request.");
      return null;
    }
  }

}
