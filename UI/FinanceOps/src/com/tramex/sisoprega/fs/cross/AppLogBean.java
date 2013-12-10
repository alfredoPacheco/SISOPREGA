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
 * Dec 10, 2013     Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 * 
 */
public class AppLogBean implements Serializable {
  private static final long serialVersionUID = -3309653340404041164L;

  private static final IconListItem[] mockData = {
      new IconListItem("images/appLog/sold.jpg", "Sold", "105 steers | 12,325 pounds | 117.4 avg", "javascript(0);"),
      new IconListItem("images/appLog/inspected.jpg", "Inspected", "85 heifers | 3 rejects", "javascript(0);"),
      new IconListItem("images/appLog/inspected.jpg", "Inspected", "85 steers | no rejects", "javascript(0);"),
      new IconListItem("images/appLog/received.jpg", "Received", "95 steers | 12,325 pounds | 129.7 avg", "javascript(0);"),
      new IconListItem("images/appLog/received.jpg", "Received", "75 heifers | 16,125 pounds | 215 avg", "javascript(0);"),
      new IconListItem("images/appLog/imported.jpg", "Imported", "65 steers | 12,325 pounds | 189.6 avg", "javascript(0);"),
      new IconListItem("images/appLog/purchased.jpg", "Purchased", "105 steers | 12,325 pounds | 117.4 avg", "javascript(0);"),
      new IconListItem("images/appLog/shipped.jpg", "Shipped", "105 steers | 117.4 avg | Hassco", "alert('hello');") };

  public List<IconListItem> getItemList() {
    List<IconListItem> mockArrayList = new ArrayList<IconListItem>();
    
    for(int i=0;i<mockData.length;i++){
      mockArrayList.add(mockData[i]);
    }

    return mockArrayList;
  }

}
