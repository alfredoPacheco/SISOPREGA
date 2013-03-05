package com.tramex.sisoprega.reporting.html;

import java.io.IOException;
import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.HttpConstraint;
import javax.servlet.annotation.ServletSecurity;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.jasperreports.engine.JRException;

@WebServlet("/HTML/RecepcionGanadoId")
@ServletSecurity(@HttpConstraint(rolesAllowed = {"mx_usr"}))
public class RecepcionGanadoId extends BaseHTMLServlet {
	private static final long serialVersionUID = 1L;
    
    /**
     * @see HttpServlet#HttpServlet()
     */
    public RecepcionGanadoId() {
        super();
    }

    @Override
    protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException,
        ParseException, JRException {
      Map<String, Object> params = new HashMap<String, Object>();
      log.fine("receptionId: [" + request.getParameter("receptionId") + "]");

      params.put("CUS_RECEPTION_ID", Integer.parseInt(request.getParameter("receptionId")));

      String reportURL = "WEB-INF/Reports/Tramex/RecepcionGanadoId.jasper";

      processRequest(reportURL, params, response);

    }

}
