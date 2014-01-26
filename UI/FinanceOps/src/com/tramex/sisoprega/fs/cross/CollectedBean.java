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
import com.tramex.sisoprega.dto.Collected;
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
public class CollectedBean implements Serializable {
  private static final long serialVersionUID = 7991717521741091074L;
  
  private static Logger log = Logger.getLogger(AppLogBean.class.getName());

  @EJB(lookup = "java:global/DataModel/BaseDataModel")
  private RemoteModelable dataModel;
  
//  private static final IconListItem[] mockData = {
//    new IconListItem("images/appLog/sold.jpg", "$1,580.00 from sold cattle", "Alvaro Reyes | case #103 | 105 steers", "javascript(0);"),
//    new IconListItem("images/appLog/other.jpg", "$580.00 from other sale", "Pablo Roman | case #108 | miscelaneous", "javascript(0);"),
//    new IconListItem("images/appLog/sold.jpg", "$2,310.00 from sold cattle", "Hasco | case #98 | 73 heifers", "javascript(0);"),
//    new IconListItem("images/appLog/sold.jpg", "$920.00 from sold cattle", "Eastmann | case #83 | 45 steers", "javascript(0);"),
//    new IconListItem("images/appLog/other.jpg", "$1,580.00 from other sale", "Public | case #109 | miscelaneous", "javascript(0);"),
//    new IconListItem("images/appLog/other.jpg", "$580.00 from other sale", "Ruben Flores | case #102 | tools for cattle management", "javascript(0);"),
//    new IconListItem("images/appLog/other.jpg", "$2,310.00 from other sale", "Javier Mendoza | case #100 | office computer", "javascript(0);"),
//    new IconListItem("images/appLog/sold.jpg", "$920.00 from sold cattle", "Hasco | case #93 | 73 heifers", "javascript(0);"),
//    new IconListItem("images/appLog/sold.jpg", "$730.00 from sold cattle", "MY CATTLE | case #78 | 105 steers", "javascript(0);"),
//    new IconListItem("images/appLog/sold.jpg", "$22,540.00 from sold cattle", "THEIR CATTLE | case #15 | 105 steers | 12,325 pounds | 117.4 avg", "javascript(0);"),
//    new IconListItem("images/appLog/other.jpg", "$2,310.00 from other sale", "Javier Mendoza | case #100 | office computer", "javascript(0);"),
//    new IconListItem("images/appLog/sold.jpg", "$920.00 from sold cattle", "Hasco | case #93 | 73 heifers", "javascript(0);"),
//    new IconListItem("images/appLog/sold.jpg", "$180.00 from sold cattle", "EL PASO CATTLE | case #32 | 105 heifers", "javascript(0);") };
  
  public List<IconListItem> getItemList() throws DataModelException {
    List<Collected> list = getOperationsLog();
    List<IconListItem> ilis = new ArrayList<IconListItem>();
    for(Collected oLog : list){
      String sIconRoot = "";
      String sTitle = new SimpleDateFormat("MMM dd").format(oLog.getCollectedDate()) + " " + oLog.getSaleClass() + " " + oLog.getAmount();
      String sDescription = oLog.getDescription();
      String sClickAction = "javascript(0)";
      
      log.info("Collected class = " + oLog.getSaleClass());
      if(oLog.getSaleClass().equals("CATTLE SOLD")) sIconRoot = "images/appLog/sold.jpg";
      if(oLog.getSaleClass().equals("OTHER SOLD")) sIconRoot = "images/appLog/other.jpg";
      
      IconListItem ili = new IconListItem(sIconRoot, sTitle, sDescription, sClickAction);
      ilis.add(ili);
    }
    return ilis;
  }
 

  public List<Collected> getOperationsLog() throws DataModelException {
    Map<String, Object> parameters = new HashMap<String, Object>();
    List<Collected> listCollected = dataModel.readDataModelList("COLLECTED", parameters, Collected.class);

    log.fine("[" + listCollected.size() + "] records retrieved from Collected list");
    return listCollected;
  }
  
}
