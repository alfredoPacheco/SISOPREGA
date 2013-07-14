package com.tramex.sisoprega.communication.ejb.reports.pdf;

import java.io.FileNotFoundException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.security.RolesAllowed;
import javax.ejb.Stateless;

import net.sf.jasperreports.engine.JRException;

import com.tramex.sisoprega.communication.ejb.reports.BasePdfReport;
import com.tramex.sisoprega.reporting.Reporteable;

/**
 * Session Bean implementation class PdfGanadoRecibido
 */
@Stateless
@RolesAllowed({ "mx_usr", "us_usr" })
public class PdfGanadoRecibido extends BasePdfReport implements Reporteable {

  @Override
  public byte[] getBytes(Map<String, Object> parameters) throws FileNotFoundException, JRException {
    Map<String, Object> params = new HashMap<String, Object>();
    
    Date fromDate = (Date) parameters.get("fromDate");
    log.finer("fromDate:[" + new SimpleDateFormat("MM/dd/yyyy").format(fromDate) + "]");
    Date toDate = (Date) parameters.get("toDate");
    log.finer("toDate:[" + new SimpleDateFormat("MM/dd/yyyy").format(toDate) + "]");
    long rancherId = (Long) parameters.get("Id");
    log.finer("rancherId:[" + rancherId + "]");
    
    params.put("CUS_FROM_DATE", fromDate);
    params.put("CUS_TO_DATE", toDate);
    params.put("CUS_RANCHER_ID", rancherId);
    
    return super.getBytes(params);
  }

}
