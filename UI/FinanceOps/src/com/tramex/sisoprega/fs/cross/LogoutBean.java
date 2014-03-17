package com.tramex.sisoprega.fs.cross;

import java.util.logging.Logger;

import javax.faces.context.FacesContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;


public class LogoutBean {
  private static Logger log = Logger.getLogger(LogoutBean.class.getName());

  public String logout() {
    String result = "/app/home?faces-redirect=true";

    FacesContext context = FacesContext.getCurrentInstance();
    HttpServletRequest request = (HttpServletRequest) context.getExternalContext().getRequest();

    try {
      request.logout();
    } catch (ServletException e) {
      log.severe("Failed to logout user!");
      result = "/no_access?faces-redirect=true";
    }

    return result;
  }
}
