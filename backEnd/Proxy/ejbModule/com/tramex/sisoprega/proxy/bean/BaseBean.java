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
package com.tramex.sisoprega.proxy.bean;

import java.lang.reflect.Field;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.tramex.sisoprega.common.GatewayContent;
import com.tramex.sisoprega.common.GatewayRequest;
import com.tramex.sisoprega.common.Utils;

/**
 * Provides basic functionality for all beans.<BR/>
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 11/06/2012  Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 */
public class BaseBean {
  protected Logger log = Logger.getLogger(BaseBean.class.getCanonicalName());

  protected String error_description = "";

  @PersistenceContext
  protected EntityManager em;

  /**
   * Validates the entity, default validation includes only null, will need to
   * override when complex validation is required in entity.
   * 
   * @param entity
   * @return
   */
  protected boolean validateEntity(Object entity) {
    boolean result = true;

    if (entity == null) {
      error_description = "Provided entity can't be null";
      result = false;
    }

    return result;
  }

  /**
   * Retrieval of an entity by using the provided content.
   * 
   * @param entity
   * @param type
   * @return
   * @throws IllegalArgumentException
   * @throws IllegalAccessException
   */
  protected GatewayContent getContentFromEntity(Object entity, Class<?> type) throws IllegalArgumentException,
      IllegalAccessException {
    GatewayContent content = new GatewayContent();

    Field[] clsField = type.getDeclaredFields();
    for (Field field : clsField) {
      field.setAccessible(true);
      String fieldName = field.getName();
      log.finest("Identified field in entity:{" + fieldName + "}");

      com.tramex.sisoprega.common.Field contentField = new com.tramex.sisoprega.common.Field();
      contentField.setName(fieldName);
      if (field.get(entity) != null)
        contentField.setValue(field.get(entity).toString());

      content.getFields().add(contentField);
    }
    return content;
  }

  /**
   * Groups a list of entities in a record of gateway content.
   * 
   * @param entities
   * @param type
   * @return
   * @throws IllegalArgumentException
   * @throws IllegalAccessException
   */
  protected List<GatewayContent> contentFromList(List<?> entities, Class<?> type) throws IllegalArgumentException,
      IllegalAccessException {

    List<GatewayContent> result = new ArrayList<GatewayContent>();
    for (Object entity : entities) {
      result.add(getContentFromEntity(entity, type));
    }

    log.finest("contentFromList Result: " + result.toString());
    return result;
  }

  /**
   * Retrieves a provided entity from a list of names and values in the gateway
   * request
   * 
   * @param request
   * @param type
   * @return
   * @throws InstantiationException
   * @throws IllegalAccessException
   * @throws ParseException
   */
  public <T> T entityFromRequest(GatewayRequest request, Class<T> type) throws InstantiationException, IllegalAccessException,
      ParseException {

    T entity = type.newInstance();
    Field[] clsField = type.getDeclaredFields();

    for (Field field : clsField) {
      field.setAccessible(true);
      String fieldName = field.getName();
      log.finer("Identified field in entity:{" + fieldName + "}");
      if (field.getType() == String.class) {
        log.finest("The field is an String, setting value from request.");
        field.set(entity, Utils.valueFromRequest(request, fieldName));
      } else {
        log.finest("The field is not an String, is a [" + field.getType() + "]");
        Object val = Utils.valueFromRequest(request, fieldName, field.getType());
        log.finer("Value to be set: " + val);
        if (val != null) {
          field.set(entity, val);
        }
      }
    }

    return entity;
  }

}
