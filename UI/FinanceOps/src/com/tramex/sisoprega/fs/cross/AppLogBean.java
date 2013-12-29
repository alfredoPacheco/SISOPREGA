/**
 * 
 */
package com.tramex.sisoprega.fs.cross;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import javax.ejb.EJB;

import com.tramex.sisoprega.datamodel.DataModelException;
import com.tramex.sisoprega.datamodel.RemoteModelable;
import com.tramex.sisoprega.dto.AppLog;
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

  public List<IconListItem> getItemList() throws DataModelException {
    
    List<AppLog> appLog = getOperationsLog();
    List<IconListItem> ilis = new ArrayList<IconListItem>();
    for(AppLog aLog : appLog){
      String iconRoot = "";
      log.info("operation type = " + aLog.getOperation());
      if(aLog.getOperation().equals("RECEPTION")) iconRoot = "/app/images/appLog/received.jpg";
      if(aLog.getOperation().equals("INSPECTION")) iconRoot = "/app/images/appLog/inspected.jpg";
      if(aLog.getOperation().equals("PURCHASE")) iconRoot = "/app/images/appLog/purchased.jpg";
      if(aLog.getOperation().equals("HERMANA")) iconRoot = "/app/images/appLog/imported.jpg";
      if(aLog.getOperation().equals("SALE")) iconRoot = "/app/images/appLog/sold.jpg";
      if(aLog.getOperation().equals("SHIP SCHEDULE")) iconRoot = "/app/images/appLog/other.jpg";
      if(aLog.getOperation().equals("SHIP RELEASE")) iconRoot = "/app/images/appLog/shipped.jpg";
      IconListItem ili = new IconListItem(iconRoot, aLog.getOperation(), aLog.getDescription(), "javascript(0)");
      ilis.add(ili);
    }
    return ilis;
  }

  private static Logger log = Logger.getLogger(AppLogBean.class.getName());

  @EJB(lookup = "java:global/DataModel/BaseDataModel")
  private RemoteModelable dataModel;

  public List<AppLog> getOperationsLog() throws DataModelException {
    Map<String, Object> parameters = new HashMap<String, Object>();
    List<AppLog> listAppLog = dataModel.readDataModelList("TODAY_APP_LOG", parameters, AppLog.class);

    log.fine("[" + listAppLog.size() + "] records retrieved from appLog list");
    return listAppLog;
  }

}
