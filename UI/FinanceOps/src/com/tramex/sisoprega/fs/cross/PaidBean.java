/**
 * 
 */
package com.tramex.sisoprega.fs.cross;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import javax.ejb.EJB;

import com.tramex.sisoprega.datamodel.DataModelException;
import com.tramex.sisoprega.datamodel.RemoteModelable;
import com.tramex.sisoprega.dto.Paid;
import com.tramex.sisoprega.fs.cross.dto.IconListItem;

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
 * Dec 15, 2013     Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 * 
 */
public class PaidBean implements Serializable {
  private static final long serialVersionUID = -5421725073091018628L;

  private static Logger log = Logger.getLogger(AppLogBean.class.getName());

  @EJB(lookup = "java:global/DataModel/BaseDataModel")
  private RemoteModelable dataModel;
//  private static final IconListItem[] mockData = {
//      new IconListItem("images/payments/freight.png", "$750.00 sipping cattle to Hasco",
//          "By Moving-U @ 12/8/2013 | 105 steers | plates MVU-1234", "javascript(0);"),
//      new IconListItem("images/payments/cattle.png", "$2,580.00 imported cattle from Albaro Bustillos",
//          "45 heifers | 405 avg pounds", "javascript(0);"),
//      new IconListItem("images/payments/purchased_cattle.png", "$2,310.00 purchased cattle from Miranda",
//          "73 steers | 350 avg pounds", "javascript(0);"),
//      new IconListItem("images/payments/other-payment.png", "$120.00 other payment: services - electric company",
//          " Invoice ref # 33224455 Paisano office", "javascript(0);"),
//      new IconListItem("images/payments/other-payment.png", "$350.00 other payment: Computer purchase",
//          " New employment equipment", "javascript(0);"),
//      new IconListItem("images/payments/cattle.png", "$2,580.00 imported cattle from MARIA ACHAVAL",
//          "45 heifers | 405 avg pounds", "javascript(0);"),
//      new IconListItem("images/payments/cattle.png", "$2,580.00 imported cattle from PALANTE VERACRUZ",
//          "45 heifers | 405 avg pounds", "javascript(0);"),
//      new IconListItem("images/payments/cattle.png", "$2,580.00 imported cattle from PALANTE CHIHUAHUA",
//          "45 heifers | 405 avg pounds", "javascript(0);"),
//      new IconListItem("images/payments/purchased_cattle.png", "$2,310.00 purchased cattle from WILLIAM HAYES",
//          "73 steers | 350 avg pounds", "javascript(0);"),
//      new IconListItem("images/payments/purchased_cattle.png", "$2,310.00 purchased cattle from RAMON CABRAL",
//          "73 steers | 350 avg pounds", "javascript(0);"),
//      new IconListItem("images/payments/purchased_cattle.png", "$2,310.00 purchased cattle from Miranda",
//          "73 steers | 350 avg pounds", "javascript(0);") };

public List<IconListItem> getItemList() throws DataModelException {
    
    List<Paid> list = getOperationsLog();
    List<IconListItem> ilis = new ArrayList<IconListItem>();
    for(Paid oLog : list){
      String sIconRoot = "";
      String sTitle = new SimpleDateFormat("MMM dd").format(oLog.getPaymentDate()) + " " + oLog.getConcept() + " " + oLog.getAmount();
      String sDescription = oLog.getDescription();
      String sClickAction = "javascript(0)";
      
      log.info("Payment class = " + oLog.getPaymentClass());
      if(oLog.getPaymentClass().equals("OTHER")) sIconRoot = "images/payments/other-payment.png";
      if(oLog.getPaymentClass().equals("SHIPMENT")) sIconRoot = "images/payments/freight.png";
      if(oLog.getPaymentClass().equals("IMPORTATION")) sIconRoot = "images/payments/cattle.png";
      if(oLog.getPaymentClass().equals("PURCHASE")) sIconRoot = "images/payments/purchased_cattle.png";
      
      IconListItem ili = new IconListItem(sIconRoot, sTitle, sDescription, sClickAction);
      ilis.add(ili);
    }
    return ilis;
  }

  public List<Paid> getOperationsLog() throws DataModelException {
    Map<String, Object> parameters = new HashMap<String, Object>();
    List<Paid> listPaid = dataModel.readDataModelList("PAID", parameters, Paid.class);

    log.fine("[" + listPaid.size() + "] records retrieved from Paid list");
    return listPaid;
  }

}
