package com.tramex.sisoprega.proxy.bean;

import java.util.logging.Logger;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.tramex.sisoprega.login.LoginRemote;

/**
 * Session Bean implementation class Login
 */
@Stateless
public class Login implements LoginRemote {

  protected Logger log = Logger.getLogger(BaseBean.class.getCanonicalName());

  @PersistenceContext
  protected EntityManager em;

  @Override
  public String login(String userName, String password) {
    log.entering(this.getClass().getCanonicalName(), "login");
    
    log.exiting(this.getClass().getCanonicalName(), "login");
    return "OK";
  }

  @Override
  public void logout(String sessionId) {
    log.entering(this.getClass().getCanonicalName(), "logout");
    // TODO Auto-generated method stub

    log.exiting(this.getClass().getCanonicalName(), "logout");
  }

  @Override
  public void lockUser(String userName) {
    // TODO Auto-generated method stub

  }
}
