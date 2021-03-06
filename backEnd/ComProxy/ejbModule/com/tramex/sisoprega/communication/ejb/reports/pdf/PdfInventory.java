package com.tramex.sisoprega.communication.ejb.reports.pdf;

import java.util.Map;

import javax.annotation.security.DeclareRoles;
import javax.annotation.security.RolesAllowed;
import javax.ejb.Stateless;

import com.tramex.sisoprega.communication.ejb.reports.BasePdfReport;
import com.tramex.sisoprega.reporting.Reporteable;

/**
 * Session Bean implementation class PdfHermana
 */
@Stateless
@DeclareRoles({ "us_usr", "rancher" })
@RolesAllowed({ "us_usr", "rancher" })
public class PdfInventory extends BasePdfReport implements Reporteable {

  @Override
  public void setParameters(Map<String, Object> parameters) throws Exception {
    String subReportDir = "com/tramex/sisoprega/communication/ejb/reports/jasper/";
    this.parameters.put("SUBREPORT_DIR", subReportDir);
  }
}
