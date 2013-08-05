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

import com.tramex.sisoprega.datamodel.DataModelException;
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

  public void createDataModel(Object dataModel) throws DataModelException {
    try {
      em.persist(dataModel);
      em.flush();
      this.log.finer("Persisted data model in database.");
    } catch (Exception e) {
      this.log.warning("Unable to create record: " + dataModel);
      this.log.throwing(this.getClass().getCanonicalName(), "createDataModel", e);
      throw new DataModelException(e.getMessage());
    }
  }

  public <T> List<T> readDataModelList(String queryName, Map<String, Object> parameters, Class<T> type) throws DataModelException {
    try {
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
      for (Object obj : result) {
        em.refresh(obj);
      }

      log.fine("Read query executed, retrieved [" + result.size() + "] objects");

      return result;
    } catch (Exception e) {
      this.log.warning("Unable to read with selected query: " + queryName);
      this.log.throwing(this.getClass().getCanonicalName(), "readDataModelList", e);
      throw new DataModelException(e.getMessage());
    }
  }

  public <T> T readSingleDataModel(String queryName, String idName, long modelId, Class<T> type) throws DataModelException {
    try {
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
    } catch (Exception e) {
      this.log.warning("Unable to read with selected query: " + queryName);
      this.log.throwing(this.getClass().getCanonicalName(), "readSingleDataModel", e);
      throw new DataModelException(e.getMessage());
    }

  }

  public void updateDataModel(Object dataModel) throws DataModelException {
    try {
      this.log.fine("Updating entity in database: [" + dataModel + "]");
      em.merge(dataModel);
      em.flush();
      this.log.finer("Entity update persisted on database for object {" + dataModel + "}");
    } catch (Exception e) {
      this.log.warning("Unable to update model: " + dataModel);
      this.log.throwing(this.getClass().getCanonicalName(), "updateDataModel", e);
      throw new DataModelException(e.getMessage());
    }
  }

  public void deleteDataModel(Object dataModel, String principal) throws DataModelException {
    try {
      em.merge(dataModel);
      log.info("Deleting " + dataModel.getClass().getCanonicalName() + " [" + dataModel.toString() + "] by principal["
          + principal + "]");
      em.remove(dataModel);
      em.flush();
    } catch (Exception e) {
      this.log.warning("Unable to delete model: [" + dataModel + "] by principal [" + principal + "]");
      this.log.throwing(this.getClass().getCanonicalName(), "updateDataModel", e);
      throw new DataModelException(e.getMessage());
    }
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
