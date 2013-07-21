package com.tramex.sisoprega.exporter.cross;

import java.util.logging.Logger;

import javax.faces.context.FacesContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

public class LogoutBean {
  private static Logger log = Logger.getLogger(LogoutBean.class.getName());

  public String logout() {
    String result = "/exporter/exportador?faces-redirect=true";

    FacesContext context = FacesContext.getCurrentInstance();
    HttpServletRequest request = (HttpServletRequest) context.getExternalContext().getRequest();

    try {
      request.logout();
    } catch (ServletException e) {
      log.severe("Failed to logout user!");
      result = "/loginError?faces-redirect=true";
    }

    return result;
  }
}
