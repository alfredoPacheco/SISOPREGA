package com.tramex.sisoprega.eastmann.servlet;

import java.io.IOException;
import java.util.logging.Logger;

import javax.annotation.Resource;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class EmailSender
 */
@WebServlet(description = "Uses communication proxy to send email for contact web page.", urlPatterns = { "/EmailSender" })
public class EmailSenderServlet extends HttpServlet {
  private static final long serialVersionUID = 1L;

  protected Logger log = Logger.getLogger(EmailSenderServlet.class.getCanonicalName());
  
  @Resource(lookup = "mail/sisoprega")
  private Session mailSession;

  /**
   * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
   *      response)
   */
  protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    doPost(request, response);
  }

  /**
   * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
   *      response)
   */
  protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    
    final String completed = "emailSent.html";
    
    String from = request.getParameter("email");
    String to = "aracelyq03@yahoo.com";
    String subject = request.getParameter("subject");
    String message = request.getParameter("message");
    
    MimeMessage msg = new MimeMessage(mailSession);
    try {
      String msgHeader = "Correo enviado a través de la página de Eastmann, firmado por: " + request.getParameter("contactName") + " (" + from + ")\r\n";
      message = msgHeader + message;
      
      msg.setText(message);
      msg.setSubject(subject);
      msg.setFrom(new InternetAddress(from));
      msg.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
      Transport.send(msg);
    } catch (AddressException e) {
      e.printStackTrace();
    } catch (MessagingException e) {
      e.printStackTrace();
    } finally {
      RequestDispatcher dispatcher = request.getRequestDispatcher(completed);
      dispatcher.forward(request, response);
    }
  }

}
