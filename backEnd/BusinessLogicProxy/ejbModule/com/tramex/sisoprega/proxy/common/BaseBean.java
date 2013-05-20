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
package com.tramex.sisoprega.proxy.common;

import java.lang.reflect.Field;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import javax.annotation.Resource;
import javax.ejb.EJB;
import javax.ejb.SessionContext;

import com.tramex.sisoprega.datamodel.RemoteModelable;
import com.tramex.sisoprega.gateway.GatewayError;
import com.tramex.sisoprega.gateway.GatewayField;
import com.tramex.sisoprega.gateway.GatewayRecord;
import com.tramex.sisoprega.gateway.request.CreateRequest;
import com.tramex.sisoprega.gateway.request.ReadRequest;
import com.tramex.sisoprega.gateway.response.CreateResponse;
import com.tramex.sisoprega.gateway.response.ReadResponse;

/**
 * Common functionality for all business logic instances.
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * May 19, 2013     Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 * 
 */
public abstract class BaseBean {

  public static String DTO_PACKAGE = "com.tramex.sisoprega.dto.";

  protected Logger log = Logger.getLogger(BaseBean.class.getCanonicalName());
  protected String error_description = "";

  @Resource
  protected SessionContext ejbContext;

  @EJB(lookup = "java:global/DataModel/BaseDataModel")
  protected RemoteModelable dataModel;

  public BaseBean() {
    this.log = Logger.getLogger(this.getClass().getCanonicalName());
  }

  public CreateResponse Create(CreateRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "CreateResponse Create(CreateRequest)");

    CreateResponse response = new CreateResponse();
    try {

      GatewayRecord record = request.getParentRecord();
      Class<?> type = Class.forName(DTO_PACKAGE + record.getEntity());
      Object entity = getEntityFromRecord(record, type);
      this.log.fine("Found entity from Record [" + entity + "]");

      if (this.validateEntity(entity)) {
        this.log.fine("Valid entity found");

        dataModel.createDataModel(entity);

        // Retrieve generated id value.
        Class<?>[] params = null;
        Object[] invokeParams = null;
        long generatedId = (Long) type.getMethod("get" + record.getEntity() + "Id", params).invoke(entity, invokeParams);
        response.setGeneratedId(generatedId);

        response.setError(new GatewayError("0", "SUCCESS", "Create"));

      } else {
        this.log.warning("Error de validación: " + error_description);
        response.setError(new GatewayError("VAL01", "Error de validación: " + error_description, "Create"));
        return response;
      }

    } catch (Exception e) {
      this.log.severe("Exception found while creating cattle class");
      this.log.throwing(this.getClass().getName(), "Create", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new GatewayError("DB01",
            "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, "
                + "muy probablemente el registro que usted quiere agregar ya existe en la base de datos.", "Create"));
      else {
        response.setError(new GatewayError("DB02", "Create exception: " + e.getMessage(), "Create"));
      }
    }

    this.log.exiting(this.getClass().getCanonicalName(), "CreateResponse Create(CreateRequest)");
    return response;
  }

  /**
   * Default Read Operation, reads by Id or returns all.
   * 
   * @param request
   * @return
   * @throws BusinessLogicException
   */
  public ReadResponse Read(ReadRequest request) {
    log.entering(this.getClass().getCanonicalName(), "ReadResponse Read(ReadRequest)");

    ReadResponse response = new ReadResponse();
    try {
      String id = request.getFilter().getFieldValue("id");
      String queryName = request.getFilter().getEntity().toUpperCase();

      Map<String, Object> parameters = new HashMap<String, Object>();

      if (id != null) {
        parameters.put(queryName.toLowerCase() + "Id", Long.parseLong(id));
        queryName += "_BY_ID";
      } else {
        queryName = "ALL_" + queryName + "S";
      }
      log.fine("Executing query [" + queryName + "]");

      Class<?> type = Class.forName(DTO_PACKAGE + request.getFilter().getEntity());

      List<?> results = dataModel.readDataModelList(queryName, parameters, type);
      if (results.isEmpty()) {
        log.info("Query resulted in empty list [" + queryName + "] by []");
        response.setError(new GatewayError("VAL02", "No se encontraron datos para el filtro seleccionado", "entity: ["
            + request.getFilter().getEntity() + "]"));
      } else {
        response.setParentRecord(getRecordsFromList(results, type));
        response.setError(new GatewayError("0", "SUCCESS", "Read"));
      }

    } catch (Exception e) {
      this.log.severe("Exception found while reading [" + request + "]");
      this.log.throwing(this.getClass().getCanonicalName(), "ReadResponse Read(ReadRequest)", e);

      response.setError(new GatewayError("DB02", "Read exception: " + e.getMessage(), "entity: ["
          + request.getFilter().getEntity() + "]"));
    }

    log.exiting(this.getClass().getCanonicalName(), "ReadGateway");
    return response;
  }

  protected GatewayRecord getRecordFromContent(Object content, Class<?> type) throws IllegalArgumentException,
      IllegalAccessException {
    GatewayRecord record = new GatewayRecord();
    record.setEntity(type.getSimpleName());

    Field[] clsField = type.getDeclaredFields();
    for (Field field : clsField) {
      field.setAccessible(true);
      String fieldName = field.getName();
      String fieldTypeName = field.getType().getName();

      this.log.finest("Identified field in entity:{" + fieldName + "} of type {" + fieldTypeName + "}");

      if (field.get(content) != null)
        record.getField().add(new GatewayField(fieldName, field.get(content).toString()));

    }

    return record;
  }

  protected List<GatewayRecord> getRecordsFromList(List<?> results, Class<?> type) throws IllegalArgumentException,
      IllegalAccessException {
    List<GatewayRecord> records = new ArrayList<GatewayRecord>();

    for (Object record : results) {
      records.add(getRecordFromContent(record, type));
    }

    return records;
  }

  protected String getLoggedUser() {
    return ejbContext.getCallerPrincipal().getName();
  }

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
      error_description = "La entidad que usted trata de modificar está vacía.";
      result = false;
    }

    return result;
  }

  /**
   * Gets the object value to a dto from the request record.
   * 
   * @param record
   * @param type
   * @return
   * @throws InstantiationException
   * @throws IllegalAccessException
   */
  protected <T> T getEntityFromRecord(GatewayRecord record, Class<T> type) throws InstantiationException, IllegalAccessException {
    T entity = type.newInstance();
    Field[] clsField = type.getDeclaredFields();

    for (Field field : clsField) {
      field.setAccessible(true);
      String fieldName = field.getName();
      this.log.finer("Field found in entity: [" + fieldName + "]");
      if (field.getType() == String.class) {
        this.log.finest("found String field, setting direct value from request");

        field.set(entity, record.getFieldValue(fieldName));
      } else {
        this.log.finest("The field is a [" + field.getType().getCanonicalName() + "], will cast it's value in the request");

        String sValue = record.getFieldValue(fieldName);

        if (sValue != null && !sValue.trim().equals(""))
          field.set(entity, castValueFromString(sValue, field.getType()));
      }
    }
    return entity;
  }

  /**
   * Receives an string value and casts its contents to a given type. Current
   * coded types: int, long, date (as MM/dd/yyyy HH:mm and MM/dd/yyyy), boolean
   * and double. If type not coded, it will return null.
   * 
   * @param value
   * @param type
   * @return
   */
  protected Object castValueFromString(String value, Class<?> type) {
    Object result = null;
    if (type.getName().equals("int")) {
      result = Integer.parseInt(value);
    }
    if (type.getName().equals("long")) {
      result = Long.parseLong(value);
    }
    if (type.getName().equals(Date.class.getName())) {
      String f = "MM/dd/yyyy HH:mm";
      try {
        Date dValue = new SimpleDateFormat(f).parse(value);
        result = dValue;
      } catch (Exception e) {
        log.severe("unable parse [" + value + "] to format: " + f);
        f = "MM/dd/yyyy";
        log.severe("trying to parse [" + value + "] to format: " + f);
        try {
          Date dValue = new SimpleDateFormat(f).parse(value);
          result = dValue;
        } catch (Exception ex) {
          log.severe("unable parse [" + value + "] to format: " + f);
        }
      }
    }
    if (type.getName().equals("boolean")) {
      result = Boolean.parseBoolean(value);
    }
    if (type.getName().equals("double")) {
      result = Double.parseDouble(value);
    }
    return result;
  }

}
