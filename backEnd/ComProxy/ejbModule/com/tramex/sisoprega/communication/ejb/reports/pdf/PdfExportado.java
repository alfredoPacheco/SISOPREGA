package com.tramex.sisoprega.communication.ejb.reports.pdf;

import javax.annotation.security.DeclareRoles;
import javax.annotation.security.RolesAllowed;
import javax.ejb.Stateless;

import com.tramex.sisoprega.communication.ejb.reports.BasePdfReport;
import com.tramex.sisoprega.reporting.Reporteable;

@Stateless
@DeclareRoles({ "rancher" })
@RolesAllowed({ "rancher" })
public class PdfExportado extends BasePdfReport implements Reporteable {

}
