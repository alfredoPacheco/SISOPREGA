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
package com.tramex.sisoprega.datamodel;

import java.util.List;
import java.util.Map;

/**
 * Interfaces the data model for objects with database.<BR/>
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
public interface RemoteModelable {
  /**
   * Create a given model in database.
   * @param model
   */
  void createDataModel(Object model) throws DataModelException;
  
  /**
   * Delete a given model from database
   * @param model
   * @param principal
   */
  void deleteDataModel(Object model, String principal) throws DataModelException;
  
  /**
   * Read a list of model from database using a given query.
   * @param queryName
   * @param parameters
   * @param type
   * @return
   */
  <T> List<T> readDataModelList(String queryName, Map<String, Object> parameters, Class<T> type) throws DataModelException;
  
  /**
   * Read a single record from database given an id.
   * @param queryName
   * @param idName
   * @param modelId
   * @param type
   * @return
   */
  <T> T readSingleDataModel(String queryName, String idName,  long modelId, Class<T> type) throws DataModelException;
  
  /**
   * Update a given data model in database.
   * @param dataModel
   */
  void updateDataModel(Object dataModel) throws DataModelException;
  
  /**
   * Delete a list of records by a given id.
   * @param query
   * @param parameters
   * @param principal
   * @return
   */
  boolean deleteBatch(String query, Map<Integer, Object> parameters, String principal) throws DataModelException;
  
  
}
