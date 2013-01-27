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
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.mail.util.ByteArrayDataSource;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

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
public class SmtpEmailSender implements EmailSender {
  private Properties props;
  private String username = null;
  private String password = null;

  public SmtpEmailSender() {
    props = new Properties();
    props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
    props.put("mail.smtp.auth", "true");
  }

  @Override
  public boolean sendEmail(Email email) {
    Session session = Session.getDefaultInstance(this.props, new javax.mail.Authenticator() {
      protected PasswordAuthentication getPasswordAuthentication() {
        return new PasswordAuthentication(SmtpEmailSender.this.username, SmtpEmailSender.this.password);
      }
    });
    
    return sendEmail(email, session);    
  }

  @Override
  public void setConfiguration(File xmlFile) throws InitEmailProviderException {
    DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
    try {
      DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
      Document doc = dBuilder.parse(xmlFile);
      doc.getDocumentElement().normalize();
      NodeList nodes = doc.getElementsByTagName("email");
      Node node = nodes.item(0);
      Element element = (Element) node;
      this.props.put("mail.smtp.host", getValue("host", element));
      this.props.put("mail.smtp.socketFactory.port", getValue("port", element));
      this.props.put("mail.smtp.port", getValue("port", element));
      this.username = getValue("username", element);
      this.password = getValue("password", element);
    } catch (Exception e) {
      throw new InitEmailProviderException("Error Parsing XML config File:".concat(e.getMessage()));
    }
  }

  private static String getValue(String tag, Element element) {
    NodeList nodes = element.getElementsByTagName(tag).item(0).getChildNodes();
    Node node = (Node) nodes.item(0);
    return node.getNodeValue();
  }
  
  private MimeMessage getMessage(Email email, Session session) throws AddressException, MessagingException{
    MimeMessage result = new MimeMessage(session);
    
    result.setFrom(new InternetAddress(email.getFrom()));
    result.setRecipients(Message.RecipientType.TO, InternetAddress.parse(email.getTo()));
    result.setSubject(email.getSubject());
    
    if(email.getAttachment() != null){
      // message body part
      MimeBodyPart messageBodyPart = new MimeBodyPart();
      messageBodyPart.setText(email.getMsg());
      
      Multipart multipart = new MimeMultipart();
      multipart.addBodyPart(messageBodyPart);
      
      MimeBodyPart attachmentPart = new MimeBodyPart();
      DataSource attachmentSource = new ByteArrayDataSource(email.getAttachment().getContent(), email.getAttachment().getAttachmentType());
      attachmentPart.setDataHandler(new DataHandler(attachmentSource));
      attachmentPart.setFileName(email.getAttachment().getFileName());
      
      multipart.addBodyPart(attachmentPart);
      
      result.setContent(multipart);
    }else{
      result.setContent(email.getMsg(), "text/plain");
    }
    
    return result;
  }

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

}
