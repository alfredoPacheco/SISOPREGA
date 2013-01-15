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

import java.io.File;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import com.sisoprega.envoy.email.Email;
import com.sisoprega.envoy.email.EmailFactory;
import com.sisoprega.envoy.email.EmailSender;
import com.sisoprega.envoy.email.InitEmailProviderException;
import com.sisoprega.envoy.sms.InitSmsProviderException;
import com.sisoprega.envoy.sms.Sms;
import com.sisoprega.envoy.sms.SmsFactory;
import com.sisoprega.envoy.sms.SmsProvider;
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
@LocalBean
public class Messenger implements MessengerLocal {

  @PersistenceContext
  private EntityManager em;

  SmsProvider smsMan = null;
  EmailSender smtp = null;

  /**
   * Default constructor.
   * 
   * @throws InitSmsProviderException
   * @throws InitEmailProviderException
   */
  public Messenger() throws InitSmsProviderException, InitEmailProviderException {
    // TODO: Configure using properties bean configurator
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
   * com.tramex.sisoprega.communication.ejb.MessengerLocal#sendSimpleMessage
   * (long, java.lang.String)
   */
  @Override
  public boolean sendSimpleMessage(long rancherId, String message) {
    Rancher rancher = null;
    TypedQuery<Rancher> readQuery = em.createNamedQuery("RANCHER_BY_ID", Rancher.class);
    readQuery.setParameter("rancherId", rancherId);

    try {
      rancher = readQuery.getSingleResult();
      return sendSimpleMessage(rancher, message);
    } catch (Exception e) {
    }

    EnterpriseRancher enterpriseRancher = null;
    TypedQuery<EnterpriseRancher> readEnterpriseQuery = em.createNamedQuery("ENTERPRISE_RANCHER_BY_ID", EnterpriseRancher.class);
    readEnterpriseQuery.setParameter("enterpriseId", rancherId);

    try {
      enterpriseRancher = readEnterpriseQuery.getSingleResult();
      return sendSimpleMessage(enterpriseRancher, message);
    } catch (Exception e) {
    }

    return false;
  }

  /*
   * (non-Javadoc)
   * 
   * @see com.tramex.sisoprega.communication.ejb.MessengerLocal#sendReport(long,
   * java.lang.String)
   */
  @Override
  public boolean sendReport(long rancherId, String reportName) {
    Rancher rancher = null;
    TypedQuery<Rancher> readQuery = em.createNamedQuery("RANCHER_BY_ID", Rancher.class);
    readQuery.setParameter("rancherId", rancherId);

    try {
      rancher = readQuery.getSingleResult();
      return sendReport(rancher, reportName);
    } catch (Exception e) {
    }

    EnterpriseRancher enterpriseRancher = null;
    TypedQuery<EnterpriseRancher> readEnterpriseQuery = em.createNamedQuery("ENTERPRISE_RANCHER_BY_ID", EnterpriseRancher.class);
    readEnterpriseQuery.setParameter("enterpriseId", rancherId);

    try {
      enterpriseRancher = readEnterpriseQuery.getSingleResult();
      return sendReport(enterpriseRancher, reportName);
    } catch (Exception e) {
    }

    return false;
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
    // TODO: Retrieve SMS Message from text output report bean.
    String message = "TestMessage";
    return sendSMS(to, message) && sendEmail(rancher.getEmailAddress(), reportName);
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
    // TODO: Retrieve SMS Message from text output report bean.
    String message = "TestMessage";
    return sendSMS(rancher.getTelephone(), message) && sendEmail(rancher.getEmail(), reportName);
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
      return true;
    } catch (Exception e) {
      return false;
    }
  }

  private boolean sendSimpleEmail(String to, String message){
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
    String from = "tramex@sisoprega.com";
    String content = "Encuentre anexo el reporte con los detalles de este mensaje.";
    Email email = new Email(to, from, reportName, content);

    // TODO: Retrieve attachment from byte array output report bean.
    // Attachment attachment = new Attachment();
    // attachment.setAttachmentType("application/pdf");
    // attachment.setFileName(reportName);
    // attachment.setContent(content);
    // email.setAttachment(attachment);

    try {
      smtp.sendEmail(email);
      return true;
    } catch (Exception e) {
      return false;
    }
  }

}
