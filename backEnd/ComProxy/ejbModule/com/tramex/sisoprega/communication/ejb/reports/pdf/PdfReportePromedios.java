package com.tramex.sisoprega.communication.ejb.reports.pdf;

import java.util.Map;

import javax.annotation.security.RolesAllowed;
import javax.ejb.Stateless;

import com.tramex.sisoprega.communication.ejb.reports.BasePdfReport;
import com.tramex.sisoprega.reporting.Reporteable;

/**
 * Session Bean implementation class PdfGanadoRecibido
 */
@Stateless
@RolesAllowed({ "mx_usr", "us_usr" })
public class PdfReportePromedios extends BasePdfReport implements Reporteable {
  @Override
  public void setParameters(Map<String, Object> parameters) throws Exception {
    long lRecordId = (Long) parameters.get("Id");
    this.parameters.put("CUS_RECEPTION_ID", lRecordId);
  }
}
