package com.tramex.sisoprega.gateway.ws;

import java.util.logging.Logger;

import javax.annotation.Resource;
import javax.annotation.security.RolesAllowed;
import javax.ejb.EJB;
import javax.ejb.LocalBean;
import javax.ejb.SessionContext;
import javax.ejb.Stateless;
import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;

import com.tramex.sisoprega.common.messenger.Messageable;

/**
 * Session Bean implementation class EchoesGatewayBean
 */
@Stateless
@LocalBean
@WebService(name = "EchoesGateway")
@RolesAllowed({ "mx_usr", "us_usr" })
public class EchoesGatewayBean {

  private Logger log = Logger.getLogger(EchoesGatewayBean.class.getCanonicalName());

  @Resource
  private SessionContext ejbContext;

  @EJB(lookup = "java:global/ComProxy/Messenger")
  private Messageable messenger;

  @WebMethod
  public String Ping() {
    log.info("Ping service executed by [" + ejbContext.getCallerPrincipal().getName() + "]");
    return "OK";
  }

  /**
   * Operation to send email and sms reports to ranchers.
   * 
   * @param rancherId
   * @param message
   * @return
   */
  @WebMethod(operationName = "SendSimpleMessage")
  public String sendMessage(@WebParam(name = "rancherId") long rancherId, @WebParam(name = "message") String message,
      @WebParam(name = "userName") String userName, @WebParam(name = "password") String password) {

    messenger.login(userName, password);
    
    if (!messenger.sendSimpleMessage(rancherId, message)) {
      return "Error al enviar mensaje.";
    }

    return "OK";
  }

  /**
   * Send a PDF file by email and route to the PDF file by SMS.
   * 
   * @param rancherId
   * @param reportName
   * @return
   */
  @WebMethod(operationName = "SendReport")
  public String sendReport(@WebParam(name = "rancherId") long rancherId, @WebParam(name = "reportName") String reportName,
      @WebParam(name = "userName") String userName, @WebParam(name = "password") String password) {

    messenger.login(userName, password);
    
    if (!messenger.sendReport(rancherId, reportName)) {
      return "Error al enviar mensaje.";
    }

    return "OK";

  }

}
