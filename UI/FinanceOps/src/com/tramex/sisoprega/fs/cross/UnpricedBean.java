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
import com.tramex.sisoprega.dto.Unpriced;
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
 * Dec 28, 2013     Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 * 
 */
public class UnpricedBean implements Serializable {
  private static final long serialVersionUID = -2335874382819709929L;

  private static Logger log = Logger.getLogger(UnpricedBean.class.getName());

  @EJB(lookup = "java:global/DataModel/BaseDataModel")
  private RemoteModelable dataModel;

  public List<Unpriced> getUnpricedItems() throws DataModelException {
    Map<String, Object> parameters = new HashMap<String, Object>();
    List<Unpriced> listUnpriced = dataModel.readDataModelList("UNPRICED", parameters, Unpriced.class);

    log.fine("[" + listUnpriced.size() + "] records retrieved from Unpriced list");
    return listUnpriced;
  }
  
//  private static final IconListItem[] mockData = {
//      new IconListItem("images/appLog/imported.jpg", "Imported 215's", "73 heifers | 215's | 15,914 pounds | 218 avg. weigh ",
//          "javascript(alert('price me!'));"),
//      new IconListItem("images/appLog/purchased.jpg", "Purchased 215's", "52 steers | 315's | 18,914 pounds | 312 avg. weigh ",
//          "javascript(alert('price me!'));") };

  public List<IconListItem> getItemList()  throws DataModelException {
    List<Unpriced> unpricedList = getUnpricedItems();
    List<IconListItem> ilis = new ArrayList<IconListItem>();
    for(Unpriced unp : unpricedList){
      String sIconRoot = "";
      String sDescription = "";
      String sTitle = "";
      
      log.info("operation type = " + unp.getOperation());
      if(unp.getOperation().equals("PURCHASE")) {
        sIconRoot = "/app/images/appLog/purchased.jpg";
        sTitle = "Purchased: " + unp.getCattleTypeName();
      }
      if(unp.getOperation().equals("HERMANA")) {
        sIconRoot = "/app/images/appLog/imported.jpg";
        sTitle= "Imported: " + unp.getCattleTypeName();
      }                      
      if(unp.getOperation().equals("SALE")) {
        sIconRoot = "/app/images/appLog/sold.jpg";
        sTitle = "Sold: " + unp.getCattleTypeName();
      }
      
      sDescription =  new SimpleDateFormat("MMM dd HH:mm").format(unp.getOperationTime()) + "<br />Heads: " + unp.getQualityName() + "<br />" + unp.getHeads() + "/" + unp.getWeight() + " lb<br />"; 
      IconListItem ili = new IconListItem(sIconRoot, sTitle, sDescription, "javascript(0)");
      ilis.add(ili);
    }
    return ilis;
  }

}
