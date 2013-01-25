/**
 * THIS IS A COMMERCIAL PROGRAM PROVIDED FOR TRAMEX AND IT'S ASSOCIATES
 * BUILT BY EXTERNAL SOFTWARE PROVIDERS.
 * THE SOFTWARE COMPRISING THIS SYSTEM IS THE PROPERTY OF TRAMEX OR ITS
 * LICENSORS.
 * 
 * ALL COPYRIGHT, PATENT, TRADE SECRET, AND OTHER INTELLECTUAL PROPERTY RIGHTS
 * IN THE SOFTWARE COMPRISING THIS SYSTEM ARE, AND SHALL REMAIN, THE VALUABLE
 * PROPERTY OF TRAMEX OR ITS LICENSORS.
 * 
 * USE, DISCLOSURE, OR REPRODUCTION OF THIS SOFTWARE IS STRICTLY PROHIBITED,
 * EXCEPT UNDER WRITTEN LICENSE FROM TRAMEX OR ITS LICENSORS.
 * 
 * &copy; COPYRIGHT 2012 TRAMEX. ALL RIGHTS RESERVED.
 */
package com.tramex.sisoprega.datamodel.bean;

import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import com.tramex.sisoprega.datamodel.RemoteModelable;

/**
 * Provides basic functionality for all data models.<BR/>
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 01/22/2013  Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 */
@Stateless
public class BaseDataModel implements RemoteModelable {
  
  protected Logger log = Logger.getLogger(BaseDataModel.class.getCanonicalName());
  
  @PersistenceContext
  protected EntityManager em;
  
  public BaseDataModel(){
    this.log = Logger.getLogger(this.getClass().getCanonicalName());
  }
  
  public void createDataModel(Object dataModel){
    em.persist(dataModel);
    em.flush();
    this.log.finer("Persisted data model in database.");
  }
  
  public <T> List<T> readDataModelList(String queryName, Map<String, Object> parameters, Class<T> type){
    TypedQuery<T> readQuery = null;
    
    readQuery = em.createNamedQuery(queryName, type);
    
    if(parameters != null){
      for(Map.Entry<String, Object> entry : parameters.entrySet()){
        readQuery.setParameter(entry.getKey(), entry.getValue());
        this.log.finer("Set query parameter [" + entry.getKey() + "] with value [" + entry.getValue() + "]");
      }
    }
    
    return readQuery.getResultList();
  }
  
  public <T> T readSingleDataModel(String queryName, String idName,  long modelId, Class<T> type){
    TypedQuery<T> readQuery = em.createNamedQuery(queryName, type);
    
    readQuery.setParameter(idName, modelId);
    return readQuery.getSingleResult();
  }
  
  public void updateDataModel(Object dataModel){
    em.merge(dataModel);
    em.flush();
    this.log.finer("Reception update persisted on database");
  }
  
  public void deleteDataModel(Object dataModel, String principal){
    em.merge(dataModel);
    log.info("Deleting " + dataModel.getClass().getCanonicalName() + " [" + dataModel.toString() + "] by principal[" + principal + "]");
    em.remove(dataModel);
    em.flush();
  }
  
}
