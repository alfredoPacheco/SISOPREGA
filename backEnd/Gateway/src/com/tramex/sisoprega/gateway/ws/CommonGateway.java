package com.tramex.sisoprega.gateway.ws;

import java.util.logging.Logger;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import javax.xml.ws.WebServiceContext;
import javax.xml.ws.WebServiceException;
import javax.xml.ws.handler.MessageContext;

import com.sun.appserv.security.ProgrammaticLogin;

public abstract class CommonGateway {

  @Resource
  protected WebServiceContext wsContext;

  protected Logger log = Logger.getLogger(CommonGateway.class.getCanonicalName());

  protected final static String REALM_NAME = "security";
  
  public CommonGateway(){
    this.log = Logger.getLogger(this.getClass().getCanonicalName());
  }
  
  protected String getSessionUserName() {
    HttpSession session = getSession();
    if (session == null)
      throw new WebServiceException("No session in WebServiceContext");

    return (String) session.getAttribute("userName");
  }

  protected String getSessionPassword() {
    HttpSession session = getSession();
    if (session == null)
      throw new WebServiceException("No session in WebServiceContext");

    return (String) session.getAttribute("password");
  }

  protected HttpSession getSession() {
	log.info("asignando message context");
	log.info(wsContext.toString());
    MessageContext mc = this.wsContext.getMessageContext();
    return ((javax.servlet.http.HttpServletRequest) mc.get(MessageContext.SERVLET_REQUEST)).getSession();
  }

  protected boolean logIn(ProgrammaticLogin pl) throws Exception {
    boolean propagateException = false;
    return pl.login(getSessionUserName(), getSessionPassword().toCharArray(), REALM_NAME, propagateException);
  }

  protected boolean logOut(ProgrammaticLogin pl) {
    return pl.logout();
  }

}
