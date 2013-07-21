package com.tramex.sisoprega.communication.ejb.reports.pdf;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import javax.annotation.security.RolesAllowed;
import javax.ejb.Stateless;

import com.tramex.sisoprega.communication.ejb.reports.BasePdfReport;
import com.tramex.sisoprega.reporting.Reporteable;

/**
 * Session Bean implementation class PdfGanadoRecibido
 */
@Stateless
@RolesAllowed({ "mx_usr", "us_usr", "rancher" })
public class PdfListaInspeccionHistorica extends BasePdfReport implements Reporteable {
  @Override
  public void setParameters(Map<String, Object> parameters) throws Exception {
    Date fromDate = (Date) parameters.get("fromDate");
    log.finer("fromDate:[" + new SimpleDateFormat("MM/dd/yyyy").format(fromDate) + "]");
    Date toDate = (Date) parameters.get("toDate");
    log.finer("toDate:[" + new SimpleDateFormat("MM/dd/yyyy").format(toDate) + "]");

    this.parameters.put("CUS_FROM_DATE", fromDate);
    this.parameters.put("CUS_TO_DATE", toDate);
  }
}
