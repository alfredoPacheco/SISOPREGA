package com.sisoprega.envoy.email;

import java.io.File;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.sisoprega.envoy.sms.ClickatellProvider;
import com.sisoprega.envoy.sms.InitSmsProviderException;

public class SmtpEmailSender implements EmailProvider {
	private Properties props;
	private String username=null;
	private String password=null;
	public SmtpEmailSender() {
		props = new Properties();
		props.put("mail.smtp.socketFactory.class","javax.net.ssl.SSLSocketFactory");
		props.put("mail.smtp.auth", "true");		

	}
	@Override
	public boolean sendEmail(Email email) {
		Session session = Session.getDefaultInstance(this.props,
				new javax.mail.Authenticator() {
					protected PasswordAuthentication getPasswordAuthentication() {
						return new PasswordAuthentication(SmtpEmailSender.this.username,
								                          SmtpEmailSender.this.password);
					}
				});
	 
			try {	
				Message message = new MimeMessage(session);
				message.setFrom(new InternetAddress(email.getFrom()));
				message.setRecipients(Message.RecipientType.TO,
						InternetAddress.parse(email.getTo()));
				message.setSubject(email.getSubject());
				message.setContent(email.getMsg(),email.getContentType());
				Transport transport = session.getTransport("smtp");
				System.out.println("HERE");
				transport.connect();
				Transport.send(message);				
				transport.close();					 
			} catch (MessagingException e) {
				throw new RuntimeException(e);
			}
		return false;
	}
	@Override
	public void setConfiguration(File xmlFile)
			throws InitEmailProviderException {
		DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
		try{
			DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
			Document doc = dBuilder.parse(xmlFile);
			doc.getDocumentElement().normalize();			
			NodeList nodes = doc.getElementsByTagName("email");
			Node node = nodes.item(0);
			Element element = (Element) node;			
			this.props.put("mail.smtp.host",getValue("host",element));
			this.props.put("mail.smtp.socketFactory.port",getValue("port",element));
			this.props.put("mail.smtp.port",getValue("port",element));
			this.username=getValue("username",element);
			this.password=getValue("password",element);
		}catch(Exception e){
			throw new InitEmailProviderException("Error Parsing XML config File:".concat(e.getMessage()));
		}		
	}
	private static String getValue(String tag, Element element) {
		NodeList nodes = element.getElementsByTagName(tag).item(0).getChildNodes();
		Node node = (Node) nodes.item(0);
		return node.getNodeValue();
	}
}
