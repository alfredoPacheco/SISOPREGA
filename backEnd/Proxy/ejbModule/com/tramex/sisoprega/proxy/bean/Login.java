package com.tramex.sisoprega.proxy.bean;

import java.util.logging.Logger;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import com.tramex.sisoprega.dto.Tokenizer;
import com.tramex.sisoprega.dto.User;
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
    // Evaluating username and password
    TypedQuery<User> readQuery = em.createNamedQuery("USER_BY_NAME", User.class);
    readQuery.setParameter("userName", userName);
    User user = readQuery.getSingleResult();

    String result = null;

    if (user.getPassword().equals(password)) {
      // Password evaluated, provide a sessionId
      log.fine("creating a new session for userId [" + user.getUserId() + "]");
      result = "userId:" + user.getUserId();
    }

    log.exiting(this.getClass().getCanonicalName(), "login");
    return result;
  }

  @Override
  public void logout(String sessionId) {
    log.entering(this.getClass().getCanonicalName(), "logout");
    TypedQuery<Tokenizer> readQuery = em.createNamedQuery("TOKEN_BY_CONTENT", Tokenizer.class);
    readQuery.setParameter("sessionId", sessionId);

    Tokenizer token = readQuery.getSingleResult();
    em.merge(token);
    em.remove(token);
    
    log.exiting(this.getClass().getCanonicalName(), "logout");
  }

  @Override
  public void lockUser(String userName) {
    // TODO Auto-generated method stub

  }  
}
