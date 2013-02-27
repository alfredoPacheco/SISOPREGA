package com.tramex.sisoprega.reporting.pdf;

import java.io.IOException;
import java.text.ParseException;

import javax.servlet.ServletException;
import javax.servlet.annotation.HttpConstraint;
import javax.servlet.annotation.ServletSecurity;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.jasperreports.engine.JRException;

import com.tramex.sisoprega.reporting.BaseReportServlet;

@WebServlet("/ListaInspeccion")
@ServletSecurity(@HttpConstraint(rolesAllowed = {"mx_usr", "rancher"}))
public class ListaInspeccion extends BaseReportServlet {
  private static final long serialVersionUID = -1611007369662335476L;

  public ListaInspeccion() {
    super();
  }
  
  @Override
  protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException,
      ParseException, JRException {
    String reportURL = "WEB-INF/Reports/Tramex/ListaInspeccion.jasper";
    processRequest(reportURL, null, response);
  }

}
