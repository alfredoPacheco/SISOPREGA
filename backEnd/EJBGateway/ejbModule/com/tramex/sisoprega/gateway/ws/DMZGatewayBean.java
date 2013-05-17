package com.tramex.sisoprega.gateway.ws;

import java.util.logging.Logger;

import javax.annotation.security.RunAs;
import javax.ejb.EJB;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;

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

  @EJB(lookup="java:global/Proxy/IdentityManager")
  private RemoteIdentity iden;
  
  @WebMethod
  public String Ping() {
    log.info("Ping succeed on DMZ");
    return "OK";
  }

  @WebMethod
  public String Login(@WebParam(name = "userName") String userName, @WebParam(name = "password") String password) throws Exception {
    
    log.info("Trying login with user [" + userName + "]");
    
    if(iden.validateCurrentPassword(userName, password))
      return "OK";
    else
      return "FAIL";
  }

}
