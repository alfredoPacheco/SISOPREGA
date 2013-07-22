package com.tramex.sisoprega.communication.ejb.reports.pdf;

import java.util.Map;

import javax.annotation.security.DeclareRoles;
import javax.annotation.security.RolesAllowed;
import javax.ejb.Stateless;

import com.tramex.sisoprega.communication.ejb.reports.BasePdfReport;
import com.tramex.sisoprega.reporting.Reporteable;

/**
 * Session Bean implementation class PdfGanadoRecibido
 */
@Stateless
@DeclareRoles({"mx_usr", "us_usr", "rancher"})
@RolesAllowed({ "mx_usr", "us_usr", "rancher" })
public class PdfEntregaAlimento extends BasePdfReport implements Reporteable {
  @Override
  public void setParameters(Map<String, Object> parameters) throws Exception {
    super.setParameters(parameters);    

    long lRancherId = 0;
    if(parameters.get("Id")!=null)
      lRancherId = (Long) parameters.get("Id");
    
    if(lRancherId == -1)
      this.setReportName("TodaEntregaAlimento");

  }
}
