package com.tramex.sisoprega.exporter.cross.reporting;
import javax.ejb.EJB;

import com.tramex.sisoprega.exporter.cross.reporting.common.BaseReport;
import com.tramex.sisoprega.reporting.Reporteable;

/**
 * 
 */

/**
 * USAGE COMMENT HERE
 *  
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * Jul 21, 2013     Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 *
 * 
 */
public class GanadoInspeccionadoReportBean extends BaseReport {

  @EJB(lookup = "java:global/ComProxy/PdfGanadoInspeccionado")
  private Reporteable reporteGanadoInspeccionado;

  @Override
  protected void setReporteable() {
    this.reporteable = reporteGanadoInspeccionado;
    this.getFilterBean().setReportName("GanadoInspeccionado");
  }

}
