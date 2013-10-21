package com.tramex.sisoprega.communication.ejb.reports.pdf;

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
public class PdfPurchase extends BasePdfReport implements Reporteable {

  @Override
  public void setParameters(Map<String, Object> parameters) throws Exception {
    Date fromDate = (Date) parameters.get("FROM_DATE");
    Date toDate = (Date) parameters.get("TO_DATE");
    Long sellerId = (Long) parameters.get("SELLER_ID");
    String sellerType = (String) parameters.get("SELLER_TYPE");
    this.parameters.put("FROM_DATE", fromDate);
    this.parameters.put("TO_DATE", toDate);
    this.parameters.put("SELLER_ID", sellerId);
    this.parameters.put("SELLER_TYPE", sellerType);
  }

}
