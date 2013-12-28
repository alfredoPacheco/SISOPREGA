/**
 * 
 */
package com.tramex.sisoprega.fs.cross;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

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

  private static final IconListItem[] mockData = {
      new IconListItem("images/payments/freight.png", "$750.00 sipping cattle to Hasco",
          "By Moving-U @ 12/8/2013 | 105 steers | plates MVU-1234", "javascript(0);"),
      new IconListItem("images/payments/cattle.png", "$2,580.00 imported cattle from Albaro Bustillos",
          "45 heifers | 405 avg pounds", "javascript(0);"),
      new IconListItem("images/payments/purchased_cattle.png", "$2,310.00 purchased cattle from Miranda",
          "73 steers | 350 avg pounds", "javascript(0);"),
      new IconListItem("images/payments/other-payment.png", "$120.00 other payment: services - electric company",
          " Invoice ref # 33224455 Paisano office", "javascript(0);"),
      new IconListItem("images/payments/other-payment.png", "$350.00 other payment: Computer purchase",
          " New employment equipment", "javascript(0);"),
      new IconListItem("images/payments/cattle.png", "$2,580.00 imported cattle from MARIA ACHAVAL",
          "45 heifers | 405 avg pounds", "javascript(0);"),
      new IconListItem("images/payments/cattle.png", "$2,580.00 imported cattle from PALANTE VERACRUZ",
          "45 heifers | 405 avg pounds", "javascript(0);"),
      new IconListItem("images/payments/cattle.png", "$2,580.00 imported cattle from PALANTE CHIHUAHUA",
          "45 heifers | 405 avg pounds", "javascript(0);"),
      new IconListItem("images/payments/purchased_cattle.png", "$2,310.00 purchased cattle from WILLIAM HAYES",
          "73 steers | 350 avg pounds", "javascript(0);"),
      new IconListItem("images/payments/purchased_cattle.png", "$2,310.00 purchased cattle from RAMON CABRAL",
          "73 steers | 350 avg pounds", "javascript(0);"),
      new IconListItem("images/payments/purchased_cattle.png", "$2,310.00 purchased cattle from Miranda",
          "73 steers | 350 avg pounds", "javascript(0);") };

  public List<IconListItem> getItemList() {
    List<IconListItem> mockArrayList = new ArrayList<IconListItem>();

    for (int i = 0; i < mockData.length; i++) {
      mockArrayList.add(mockData[i]);
    }

    return mockArrayList;
  }

}
