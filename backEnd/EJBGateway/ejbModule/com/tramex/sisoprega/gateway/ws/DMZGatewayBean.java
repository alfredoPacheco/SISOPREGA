package com.tramex.sisoprega.gateway.ws;

import java.util.logging.Logger;

import javax.annotation.security.RunAs;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;
import javax.naming.Context;
import javax.naming.InitialContext;

import com.tramex.sisoprega.identity.RemoteIdentity;

/**
 * Session Bean implementation class DMZGatewayBean
 */
@Stateless
@LocalBean
@WebService(name = "DMZGateway")
@RunAs("sisoprega_admin")
public class DMZGatewayBean {

  private Logger log = Logger.getLogger(DMZGatewayBean.class.getCanonicalName());

  @WebMethod
  public String Ping() {
    log.info("Ping succeed on DMZ");
    return "OK";
  }

  @WebMethod
  public String Login(@WebParam(name = "userName") String userName, @WebParam(name = "password") String password) throws Exception {
    
    log.info("Trying login with user [" + userName + "]");
    
    Context jndiContext = null;
    RemoteIdentity idenMgr = null;
    String identityManagerBeanName = "java:global/Proxy/IdentityManager";
    try {
      jndiContext = new InitialContext();
      idenMgr = (RemoteIdentity) jndiContext.lookup(identityManagerBeanName);
      
      if(idenMgr.validateCurrentPassword(userName, password)){
        log.info("Login succeed with user [" + userName + "]");
        return "OK";
      } else {
        log.info("Login failed with user [" + userName + "]");
        return "FAIL";
      }
    } catch (Exception e) {
      log.severe("Unable to load jndi context component");
      log.throwing(this.getClass().getName(), "Login", e);
      throw new Exception(e);
    }
  }

}
