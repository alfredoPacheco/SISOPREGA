package com.tramex.sisoprega.exporter.cross;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import javax.ejb.EJB;
import javax.faces.context.FacesContext;
import javax.servlet.http.HttpServletRequest;

import com.tramex.sisoprega.datamodel.DataModelException;
import com.tramex.sisoprega.datamodel.RemoteModelable;
import com.tramex.sisoprega.dto.EnterpriseRancher;
import com.tramex.sisoprega.dto.Location;
import com.tramex.sisoprega.dto.Pen;
import com.tramex.sisoprega.dto.Rancher;
import com.tramex.sisoprega.dto.Reception;
import com.tramex.sisoprega.dto.ReceptionHeadcount;
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
 * Jul 20, 2013     Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 *
 * 
 */
public class ReceptionBean {
  private static Logger log = Logger.getLogger(ReceptionBean.class.getName());
  
  @EJB(lookup = "java:global/DataModel/BaseDataModel")
  private RemoteModelable dataModel;
  
  public String getReceptions() throws DataModelException{
    FacesContext context = FacesContext.getCurrentInstance();
    HttpServletRequest request = (HttpServletRequest) context.getExternalContext().getRequest();
    
    String loggedinUser = request.getUserPrincipal().getName();
    log.fine("Loading pen map reception results for user [" + loggedinUser + "]");
    
    Map<String, Object> parameters = new HashMap<String, Object>();
    parameters.put("userName", loggedinUser);
    
    log.fine("Looking for rancher entity");
    List<Rancher> personRanchers = dataModel.readDataModelList("RANCHER_BY_USER_NAME", parameters, Rancher.class);
    long rancherId =0;
    if(personRanchers.isEmpty()){
      List<EnterpriseRancher> enterprises = dataModel.readDataModelList("ENTERPRISE_BY_USER_NAME", parameters, EnterpriseRancher.class);
      rancherId = enterprises.get(0).getEnterpriseRancherId();
      log.fine("Found [" + rancherId + "] as enterprise");
    }else{
      rancherId = personRanchers.get(0).getRancherId();
      log.fine("Found [" + rancherId + "] as person");
    }
    
    parameters.clear();
    parameters.put("rancherID", rancherId);
    List<Reception> receptions = dataModel.readDataModelList("RECEPTIONS_BY_RANCHER_ID", parameters, Reception.class);

    log.fine("[" + receptions.size() + "] records retrieved from reception list");
    String json = "[";
    for(Reception reception : receptions){
      String receptionJson = reception.toString();
      log.fine("got reception:" + receptionJson);
      receptionJson = receptionJson.substring(0, receptionJson.length()-1) + ",";
      
      if(reception.getCattleType()==1){
        receptionJson +="\"cattype_name\":\"Novillos\",";
      }
      if(reception.getCattleType()==2){
        receptionJson +="\"cattype_name\":\"Vaquillas\",";
      }
      if(reception.getCattleType()==3){
        receptionJson +="\"cattype_name\":\"Caballos\",";
      }
      
      Location location = dataModel.readSingleDataModel("CAT_LOCATION_BY_ID", "Id", reception.getLocationId(), Location.class);
      receptionJson += "\"location_name\":\"" + location.getLocationName() + "\"";
      
      receptionJson += ", \"Pens\":[";
      
      for(Pen pen : reception.getPen()){
        log.fine("got pen: " + pen.toString());
        receptionJson += pen.toString() + ",";
      }
      
      receptionJson = receptionJson.substring(0, receptionJson.length()-1) + "], \"headcounts\":[";
      
      for(ReceptionHeadcount hc : reception.getReceptionHeadcount()){
        log.fine("got hc: " + hc.toString());
        receptionJson += hc.toString() + ",";
      }
      json += receptionJson.substring(0, receptionJson.length()-1) + "]},";
      log.fine("reception transformed json:" + json);
    }
    
    json = json.substring(0, json.length()-1) + "]";
    
    log.fine(json);
    
    return json;
  }
}
