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
package com.tramex.sisoprega.communication.email.provider;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.annotation.security.RolesAllowed;
import javax.ejb.Stateless;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.mail.util.ByteArrayDataSource;

import com.tramex.sisoprega.communication.dto.Email;
import com.tramex.sisoprega.communication.email.EmailSender;

/**
 * This implementation uses smtp to send email.<BR/>
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 *             Alan Del Rio                 Initial Version.
 * 01/05/2013  Diego Torres                 Add implementation for email attachment.
 * ====================================================================================
 * </PRE>
 * 
 * @author Alan Del Rio
 * 
 */
@Stateless
@RolesAllowed({ "mx_usr", "us_usr" })
public class SmtpEmailSender implements EmailSender {
  
  @Override
  public boolean sendEmail(Email email, Session session) {
    try {
      Message message = getMessage(email, session);
      Transport.send(message);
      return true;
    } catch (MessagingException e) {
      throw new RuntimeException(e);
    }
  }
  
  private MimeMessage getMessage(Email email, Session session) throws AddressException, MessagingException {
    MimeMessage result = new MimeMessage(session);

    result.setFrom(new InternetAddress(email.getFrom()));
    result.setRecipients(Message.RecipientType.TO, InternetAddress.parse(email.getTo()));
    result.setSubject(email.getSubject());

    if (email.getAttachment() != null) {
      // message body part
      MimeBodyPart messageBodyPart = new MimeBodyPart();
      messageBodyPart.setText(email.getMsg());

      Multipart multipart = new MimeMultipart();
      multipart.addBodyPart(messageBodyPart);

      MimeBodyPart attachmentPart = new MimeBodyPart();
      DataSource attachmentSource = new ByteArrayDataSource(email.getAttachment().getContent(), email.getAttachment()
          .getAttachmentType());
      attachmentPart.setDataHandler(new DataHandler(attachmentSource));
      attachmentPart.setFileName(email.getAttachment().getFileName());

      multipart.addBodyPart(attachmentPart);

      result.setContent(multipart);
    } else {
      result.setContent(email.getMsg(), "text/plain");
    }

    return result;
  }

}
