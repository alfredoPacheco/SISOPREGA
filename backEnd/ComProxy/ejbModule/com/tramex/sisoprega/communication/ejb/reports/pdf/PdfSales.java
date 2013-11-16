package com.tramex.sisoprega.communication.ejb.reports.pdf;

import java.util.Calendar;
import java.util.Date;
import java.util.Map;

import javax.annotation.security.DeclareRoles;
import javax.annotation.security.RolesAllowed;
import javax.ejb.Stateless;

import com.tramex.sisoprega.communication.ejb.reports.BasePdfReport;
import com.tramex.sisoprega.reporting.Reporteable;

@Stateless
@DeclareRoles({ "us_usr" })
@RolesAllowed({ "us_usr" })
public class PdfSales extends BasePdfReport implements Reporteable {

  @Override
  public void setParameters(Map<String, Object> parameters) throws Exception {
    Date fromDate = (Date) parameters.get("FROM_DATE");
    Date toDate = (Date) parameters.get("TO_DATE");
    Long customerId = (Long) parameters.get("CUSTOMER_ID");
    
    Calendar cal = Calendar.getInstance();
    cal.setTime(fromDate);
    cal.set(Calendar.HOUR, 0);
    cal.set(Calendar.MINUTE, 0);
    
    Calendar cal2 = Calendar.getInstance();
    cal2.setTime(toDate);
    cal2.set(Calendar.HOUR, 23);
    cal2.set(Calendar.MINUTE, 59);
    
    this.parameters.put("FROM_DATE", cal.getTime());
    this.parameters.put("TO_DATE", cal2.getTime());

    if(customerId == null)
      customerId = 0L;
    
    this.parameters.put("CUSTOMER_ID", customerId);
  }

}
