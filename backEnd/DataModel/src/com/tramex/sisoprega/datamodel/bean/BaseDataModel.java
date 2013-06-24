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
import javax.persistence.Query;
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

  public void createDataModel(Object dataModel) {
    em.persist(dataModel);
    em.flush();
    this.log.finer("Persisted data model in database.");
  }

  public <T> List<T> readDataModelList(String queryName, Map<String, Object> parameters, Class<T> type) {
    log.fine("JPA EntityManager Flushed away");
    TypedQuery<T> readQuery = em.createNamedQuery(queryName, type);

    log.finer("Setting up parameters for readQuery [" + readQuery + "]");
    
    if (parameters != null) {
      for (Map.Entry<String, Object> entry : parameters.entrySet()) {
        readQuery.setParameter(entry.getKey(), entry.getValue());
        this.log.finer("Set query parameter [" + entry.getKey() + "] with value [" + entry.getValue() + "]");
      }
    }
    
    List<T> result = readQuery.getResultList();
    log.finest("read query successfully executed.!");
    for(Object obj : result){
      em.refresh(obj);
    }
    
    log.fine("Read query executed, retrieved [" + result.size() + "] objects");
    
    return result;
  }

  public <T> T readSingleDataModel(String queryName, String idName, long modelId, Class<T> type) {
    log.fine("JPA EntityManager Flushed away");
    TypedQuery<T> readQuery = em.createNamedQuery(queryName, type);

    readQuery.setParameter(idName, modelId);
    T result = null;
    try {
      result = readQuery.getSingleResult();
      em.refresh(result);
    } catch (Exception e) {
      log.fine("Could not find single data model: " + e.getMessage());
    }

    log.fine("Single Object retrieved from database: [" + result + "]");
    return result;
  }

  public void updateDataModel(Object dataModel) {
    em.merge(dataModel);
    em.flush();
    this.log.finer("Reception update persisted on database");
  }

  public void deleteDataModel(Object dataModel, String principal) {
    em.merge(dataModel);
    log.info("Deleting " + dataModel.getClass().getCanonicalName() + " [" + dataModel.toString() + "] by principal[" + principal
        + "]");
    em.remove(dataModel);
    em.flush();
  }

  @Override
  public boolean deleteBatch(String query, Map<Integer, Object> parameters, String principal) {
    Query deleteQuery = em.createNativeQuery(query);

    if (parameters != null) {
      for (Map.Entry<Integer, Object> entry : parameters.entrySet()) {
        deleteQuery.setParameter(entry.getKey(), entry.getValue());
        this.log.finer("Set query parameter [" + entry.getKey() + "] with value [" + entry.getValue() + "]");
      }
    }

    return deleteQuery.executeUpdate() >= 0;
  }

}
