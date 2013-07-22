package com.tramex.sisoprega.communication.ejb.reports.pdf;

import java.text.SimpleDateFormat;
import java.util.Date;
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
public class PdfGanadoRecibido extends BasePdfReport implements Reporteable {
  public void setParameters(Map<String, Object> parameters) throws Exception {
    Date fromDate = (Date) parameters.get("fromDate");
    log.finer("fromDate:[" + new SimpleDateFormat("MM/dd/yyyy").format(fromDate) + "]");
    Date toDate = (Date) parameters.get("toDate");
    log.finer("toDate:[" + new SimpleDateFormat("MM/dd/yyyy").format(toDate) + "]");

    long lRancherId = 0;
    if(ejbContext.isCallerInRole(RANCHER_ROLE_NAME)){
      // Calculate RANCHER_ID
      lRancherId = loggedRancherId();
    }else{
      lRancherId = (Long) parameters.get("Id");
    }
    
    String sRancherId = String.valueOf(lRancherId);
    
    int rancherId = Integer.parseInt(sRancherId);
    log.finer("rancherId:[" + rancherId + "]");

    this.parameters.put("CUS_FROM_DATE", fromDate);
    this.parameters.put("CUS_TO_DATE", toDate);
    this.parameters.put("CUS_RANCHER_ID", rancherId);
    
    if(rancherId != -1)
      this.setReportName("RecibidoPorGanadero");
    
    
  }
}
