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
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.ParameterizedType;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
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
import com.tramex.sisoprega.gateway.response.BaseResponse;
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

  /**
   * Default functionality
   * 
   * @param request
   * @return
   */
  public ReadResponse Create(CreateRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "CreateResponse Create(CreateRequest)");

    ReadResponse response = new ReadResponse();
    try {

      GatewayRecord record = request.getParentRecord();
      Class<?> type = Class.forName(DTO_PACKAGE + record.getEntity());
      Object entity = getEntityFromRecord(record, type);
      this.log.fine("Found entity from Record [" + entity + "]");

      if (this.validateEntity(entity)) {
        this.log.fine("Valid entity found");

        dataModel.createDataModel(entity);

        List<Object> updatedRecordList = new ArrayList<Object>();
        log.fine("Setting as response object: {" + entity + "}");
        updatedRecordList.add(entity);

        response.setParentRecord(getRecordsFromList(updatedRecordList, type));
        response.setError(new GatewayError("0", "SUCCESS", "Update"));

      } else {
        this.log.warning("Error de validaci�n: " + error_description);
        response.setError(new GatewayError("VAL01", "Error de validaci�n: " + error_description, "Create"));
        return response;
      }

    } catch (Exception e) {
      this.log.severe("Exception found while creating entity: " + e.getMessage());
      this.log.throwing(this.getClass().getName(), "Create", e);

      response.setError(new GatewayError("DB01",
          "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, "
              + "muy probablemente el registro que usted quiere agregar ya existe en la base de datos.", "Create"));
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
        parameters.put("Id", Long.parseLong(id));
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
        log.info("Records from query: [" + results.size() + "]");
        response.setParentRecord(getRecordsFromList(results, type));
        response.setError(new GatewayError("0", "SUCCESS", "Read"));
      }

    } catch (Exception e) {
      this.log.severe("Exception found while reading [" + request + "]");
      this.log.throwing(this.getClass().getCanonicalName(), "ReadResponse Read(ReadRequest)", e);

      response.setError(new GatewayError("DB02", "Error al leer datos", "entity: [" + request.getFilter().getEntity() + "]"));
    }

    log.exiting(this.getClass().getCanonicalName(), "ReadResponse Read(ReadRequest)");
    return response;
  }

  public ReadResponse Update(CreateRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "ReadResponse Create(CreateRequest)");

    ReadResponse response = new ReadResponse();
    try {
      GatewayRecord record = request.getParentRecord();
      Class<?> type = Class.forName(DTO_PACKAGE + record.getEntity());
      Object entity = getEntityFromRecord(record, type);
      this.log.fine("Found entity from Record [" + entity + "]");

      if (this.validateEntity(entity)) {
        this.log.fine("Valid entity found");

        Class<?>[] params = null;
        Object[] invokeParams = null;
        String entityCamelCaseName = "get" + record.getEntity() + "Id";

        log.fine("Executing method [" + entityCamelCaseName + "]");

        long idToUpdate = (Long) type.getMethod(entityCamelCaseName, params).invoke(entity, invokeParams);

        if (idToUpdate == 0) {
          this.log.warning("VAL04 - Entity ID Omission.");
          response.setError(new GatewayError("VAL04", "Se ha omitido el id en la entidad [" + record.getEntity()
              + "] al intentar actualizar sus datos.", "Update"));
        } else {
          dataModel.updateDataModel(entity);

          String queryName = record.getEntity().toUpperCase() + "_BY_ID";
          log.fine("Retrieving updated object with Query: " + queryName);

          entity = dataModel.readSingleDataModel(queryName, "Id", idToUpdate, type);
          log.fine("got updated record: [" + entity + "]");

          List<Object> updatedRecordList = new ArrayList<Object>();
          updatedRecordList.add(entity);

          response.setParentRecord(getRecordsFromList(updatedRecordList, type));
          response.setError(new GatewayError("0", "SUCCESS", "Update"));
        }
      } else {
        this.log.warning("Error de validaci�n: " + error_description);
        response.setError(new GatewayError("VAL01", "Error de validaci�n: " + error_description, "Update"));
        return response;
      }

    } catch (Exception e) {
      this.log.severe("Exception found while updating entity: " + e.getMessage());
      this.log.throwing(this.getClass().getName(), "Update", e);

      response.setError(new GatewayError("DB01",
          "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, "
              + "muy probablemente el registro que usted quiere agregar ya existe en la base de datos.", "Update"));
    }

    this.log.exiting(this.getClass().getCanonicalName(), "ReadResponse Update(CreateRequest)");
    return response;
  }

  public BaseResponse Delete(ReadRequest request) {
    log.entering(this.getClass().getCanonicalName(), "ReadResponse Delete(ReadRequest)");

    ReadResponse response = new ReadResponse();
    try {
      String id = request.getFilter().getFieldValue("id");
      String queryName = request.getFilter().getEntity().toUpperCase();

      if (id == null) {
        this.log.warning("VAL04 - Entity ID Omission.");
        response.setError(new GatewayError("VAL04", "Se ha omitido el id en la entidad [" + request.getFilter().getEntity()
            + "] al intentar eliminar sus datos.", "Delete"));
      } else {
        // Read single record and remove
        String idName = "Id";
        queryName += "_BY_ID";

        Class<?> type = Class.forName(DTO_PACKAGE + request.getFilter().getEntity());
        // Remove record from database
        dataModel.deleteDataModel(dataModel.readSingleDataModel(queryName, idName, Long.parseLong(id), type), getLoggedUser());

        response.setError(new GatewayError("0", "SUCCESS", "Delete"));
      }
    } catch (Exception e) {
      this.log.severe("Exception found while deleting [" + request + "]");
      this.log.throwing(this.getClass().getCanonicalName(), "ReadResponse Delete(ReadRequest)", e);

      response.setError(new GatewayError("DB02", "Error al borrar datos.", "entity: [" + request.getFilter().getEntity() + "]"));
    }

    log.exiting(this.getClass().getCanonicalName(), "ReadResponse Delete(ReadRequest)");
    return response;
  }

  protected GatewayRecord getRecordFromContent(Object content, Class<?> type, List<String> parentType)
      throws IllegalArgumentException, IllegalAccessException, InvocationTargetException, NoSuchMethodException,
      SecurityException {
    GatewayRecord record = new GatewayRecord();
    record.setEntity(type.getSimpleName());

    Field[] clsField = type.getDeclaredFields();
    for (Field field : clsField) {
      field.setAccessible(true);
      String fieldName = field.getName();
      String fieldTypeName = field.getType().getName();

      this.log.finest("Identified field in entity:{" + fieldName + "} of type {" + fieldTypeName + "}");

      if (fieldTypeName.equals("java.util.Set") || fieldTypeName.equals("java.util.List")) {

        this.log.fine("reading collection contents for [" + fieldName + "]");

        ParameterizedType listType = (ParameterizedType) field.getGenericType();
        Class<?> genericType = (Class<?>) listType.getActualTypeArguments()[0];

        this.log.fine("Found list type [" + genericType.getName() + "]");

        String methodName = "get" + fieldName.substring(0, 1).toUpperCase() + fieldName.substring(1, fieldName.length());
        this.log.finer("Method to be executed in order to obtain one to many : [" + methodName + "]");

        if (parentType == null)
          parentType = new ArrayList<String>();

        if (genericType.getName().contains("com.tramex.sisoprega") && !parentType.contains(genericType.getName())) {
          this.log.fine(genericType.getName() + " is not as parent [" + parentType + "]");
          Class<?>[] params = null;
          Object[] invokeParams = null;

          Collection<?> memberList = null;

          if (fieldTypeName.equals("java.util.List")) {
            log.fine("Casting List collection to Set");
            memberList = (List<?>) type.getMethod(methodName, params).invoke(content, invokeParams);
          } else {
            log.finest("Found set, getting values");
            memberList = (Set<?>) type.getMethod(methodName, params).invoke(content, invokeParams);
          }

          this.log.fine("memberList: [" + memberList + "]");
          if (memberList != null && !memberList.isEmpty()) {
            for (Object member : memberList) {
              log.fine("found list member of type: " + member.getClass());

              parentType.add(type.getName());
              record.addChildRecord(getRecordFromContent(member, member.getClass(), parentType));
            }
          } else {
            log.fine("Empty child records list");
          }
        } else {
          log.fine("Unsuported list type found: [" + genericType + "] in entity [" + type.getSimpleName() + "]");
        }

      } else if (!fieldTypeName.contains("com.tramex.sisoprega")) {
        if (fieldTypeName.contains("Date")) {
          if (field.get(content) != null) {
            Date dValue = (Date) field.get(content);
            record.getField().add(new GatewayField(fieldName, String.valueOf(dValue.getTime())));
          }
        } else {
          if (field.get(content) != null)
            record.getField().add(new GatewayField(fieldName, field.get(content).toString()));
        }
      } else {
        log.fine("voided content of type [" + fieldTypeName + "]");
      }
    }

    return record;
  }

  protected List<GatewayRecord> getRecordsFromList(List<?> results, Class<?> type) throws IllegalArgumentException,
      IllegalAccessException, InvocationTargetException, NoSuchMethodException, SecurityException {
    List<GatewayRecord> records = new ArrayList<GatewayRecord>();

    for (Object record : results) {
      log.finer("===========  Extracting record - BEGIN  ==============");
      log.finer("record: {" + record + "}");
      records.add(getRecordFromContent(record, type, null));
      log.finer("===========  Extracting record - END  ==============");
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
      error_description = "La entidad que usted trata de modificar est� vac�a.";
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
   * @throws SecurityException
   * @throws NoSuchFieldException
   * @throws ClassNotFoundException
   * @throws NoSuchMethodException
   * @throws InvocationTargetException
   * @throws IllegalArgumentException
   */
  protected <T> T getEntityFromRecord(GatewayRecord record, Class<T> type) throws InstantiationException, IllegalAccessException,
      SecurityException, ClassNotFoundException, IllegalArgumentException, InvocationTargetException, NoSuchMethodException {
    log.fine("Casting " + type + " from " + record);
    T entity = type.newInstance();

    List<GatewayField> recordFields = record.getField();

    for (GatewayField gField : recordFields) {
      try {
        Field field = type.getDeclaredField(gField.getName());
        field.setAccessible(true);

        if (field.getType() == String.class) {
          this.log.finest("found String field [" + gField.getName() + "], setting direct value from request ["
              + gField.getValue() + "]");
          field.set(entity, gField.getValue());
        } else {
          String sValue = gField.getValue();
          this.log.finest("The field [" + gField.getName() + "] is a [" + field.getType().getCanonicalName()
              + "], will cast it's value [" + sValue + "] in the request");

          if (sValue != null && !sValue.trim().equals(""))
            field.set(entity, castValueFromString(sValue, field.getType()));
        }

      } catch (NoSuchFieldException e) {
        log.finer("field not found and will be voided: [" + gField.getName() + "]");
        log.throwing(this.getClass().getCanonicalName(), "getEntityFromRecord", e);
      }
    }

    List<GatewayRecord> childRecords = record.getChildRecord();
    if (childRecords != null && !childRecords.isEmpty()) {
      log.fine("found [" + childRecords.size() + "] child records in the request");

      for (GatewayRecord childRecord : childRecords) {
        log.finest("----------  CASTING CHILD RECORD  --------------");
        Class<?> childType = Class.forName(DTO_PACKAGE + childRecord.getEntity());

        Object childEntity = getEntityFromRecord(childRecord, childType);
        log.fine("Got childRecord [" + childEntity + "] from type [" + childType.getName() + "]");

        Class<?>[] params = new Class<?>[1];
        params[0] = childType;
        Object[] invokeParams = new Object[1];
        invokeParams[0] = childEntity;

        String methodName = "add" + childRecord.getEntity();
        log.fine("Looking for method [" + methodName + "]");
        type.getMethod(methodName, params).invoke(entity, invokeParams);
        log.finest("----------  END OF CHILD RECORD CASTING --------------");
      }
    } else {
      log.finer("No child records found in the request.");
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
    log.fine("casting value to [" + type.getName() + "]");
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
        log.fine("parsed date value using format " + f);
      } catch (Exception e) {
        log.fine("unable parse [" + value + "] to format: " + f);
        f = "MM/dd/yyyy";
        log.finer("trying to parse [" + value + "] to format: " + f);
        try {
          Date dValue = new SimpleDateFormat(f).parse(value);
          result = dValue;
          log.fine("parsed date value using format " + f);
        } catch (Exception ex) {
          log.finer("unable parse [" + value + "] to format: " + f);
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
