package com.tramex.sisoprega.proxy.bean;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.security.RolesAllowed;
import javax.ejb.Stateless;

import com.tramex.sisoprega.dto.InspectionForecast;
import com.tramex.sisoprega.dto.InspectionForecastDetail;
import com.tramex.sisoprega.dto.Pen;
import com.tramex.sisoprega.dto.Reception;
import com.tramex.sisoprega.dto.ReceptionHeadcount;
import com.tramex.sisoprega.gateway.GatewayError;
import com.tramex.sisoprega.gateway.GatewayRecord;
import com.tramex.sisoprega.gateway.request.CreateRequest;
import com.tramex.sisoprega.gateway.response.ReadResponse;
import com.tramex.sisoprega.proxy.Cruddable;
import com.tramex.sisoprega.proxy.common.BaseBean;

/**
 * Session Bean implementation class ReceptionBean
 */
@Stateless
@RolesAllowed({ "sisoprega_admin", "mx_usr", "us_usr", "rancher", "agency" })
public class ReceptionBean extends BaseBean implements Cruddable {

  @Override
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

        log.fine("Reception record created, setting InspectionForecast");
        Reception reception = (Reception) entity;
        setInspectionForecast(reception);

        List<Object> updatedRecordList = new ArrayList<Object>();
        log.fine("Setting as response object: {" + entity + "}");
        updatedRecordList.add(entity);

        response.setParentRecord(getRecordsFromList(updatedRecordList, type));
        response.setError(new GatewayError("0", "SUCCESS", "Update"));

      } else {
        this.log.warning("Error de validación: " + error_description);
        response.setError(new GatewayError("VAL01", "Error de validación: " + error_description, "Create"));
        return response;
      }

    } catch (Exception e) {
      this.log.severe("Exception found while creating entity: " + e.getMessage());
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

  @Override
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
          log.fine("got updated record: [" + entity + "], setting inspection forecast");

          Reception reception = (Reception) entity;
          setInspectionForecast(reception);

          List<Object> updatedRecordList = new ArrayList<Object>();
          updatedRecordList.add(entity);

          response.setParentRecord(getRecordsFromList(updatedRecordList, type));
          response.setError(new GatewayError("0", "SUCCESS", "Update"));
        }
      } else {
        this.log.warning("Error de validación: " + error_description);
        response.setError(new GatewayError("VAL01", "Error de validación: " + error_description, "Update"));
        return response;
      }

    } catch (Exception e) {
      this.log.severe("Exception found while updating entity: " + e.getMessage());
      this.log.throwing(this.getClass().getName(), "Update", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new GatewayError("DB01",
            "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, "
                + "muy probablemente el registro que usted quiere agregar ya existe en la base de datos.", "Update"));
      else {
        response.setError(new GatewayError("DB02", "Update exception: " + e.getMessage(), "Update"));
      }
    }

    this.log.exiting(this.getClass().getCanonicalName(), "ReadResponse Update(CreateRequest)");
    return response;
  }

  private void setInspectionForecast(Reception reception) {
    this.log.entering(this.getClass().getCanonicalName(), "void setInspectionForecast(Reception)");
    InspectionForecast ifc = getInspectionForecast(reception.getDateAllotted());
    log.fine("got InspectionForecast:[" + ifc + "]");
    InspectionForecastDetail ifd = getInspectionForecastDetail(ifc, reception);
    log.fine("got InspectionForecastDetail:[" + ifd + "]");

    if (ifd.getInspectionForecastDetailId() == 0)
      ifc.addInspectionForecastDetail(ifd);

    if (ifc.getInspectionForecastId() == 0)
      dataModel.createDataModel(ifc);
    else
      dataModel.updateDataModel(ifc);

    this.log.exiting(this.getClass().getCanonicalName(), "void setInspectionForecast(Reception)");
  }

  @Override
  protected boolean validateEntity(Object entity) {
    Reception reception = null;
    if (entity instanceof Reception)
      reception = (Reception) entity;
    else
      return super.validateEntity(entity);

    if (reception.getPen() == null || reception.getPen().size() == 0) {
      error_description = "El registro de recepcion que esta intentando agregar no ha requerido el uso de ningún corral. "
          + "Toda recepción debe estar relacionada a por lo menos un corral del mapa de operaciones.";
      return false;
    }

    return true;
  }

  private InspectionForecastDetail getInspectionForecastDetail(InspectionForecast forecast, Reception reception) {
    // calculate headcount
    long headCount = 0;
    for (ReceptionHeadcount rh : reception.getReceptionHeadcount()) {
      headCount += rh.getHc();
    }

    if (headCount > 0) {
      InspectionForecastDetail ifd = getInspectionForecastDetail(forecast, reception.getPen());
      ifd.setCattleType(reception.getCattleType());
      ifd.setOrigin(reception.getLocationId());
      ifd.setPen(reception.getPen());
      ifd.setRancherId(reception.getRancherId());
      ifd.setZoneId(reception.getZoneId());

      ifd.setQuantity(headCount);
      return ifd;
    } else
      return null;
  }

  private InspectionForecastDetail getInspectionForecastDetail(InspectionForecast forecast, Set<Pen> pen) {
    InspectionForecastDetail ifd = new InspectionForecastDetail();

    if (forecast.getInspectionForecastDetail() != null && forecast.getInspectionForecastDetail().size() > 0) {
      for (InspectionForecastDetail detail : forecast.getInspectionForecastDetail()) {
        for (Pen detailPen : detail.getPen()) {
          if (pen.contains(detailPen))
            return detail;
        }
      }
    }

    return ifd;
  }

  private InspectionForecast getInspectionForecast(Date inspectionDate) {

    InspectionForecast ifc = null;

    // calculate tomorrow of reception date alloted.
    Calendar cal1 = Calendar.getInstance();
    cal1.setTime(inspectionDate);
    cal1.add(Calendar.DATE, 1); // For tomorrow

    Map<String, Object> parameters = new HashMap<String, Object>();
    parameters.put("forecastDate", cal1.getTime());

    List<InspectionForecast> ifcList = dataModel.readDataModelList("INSPECTIONFORECAST_BY_DATE", parameters,
        InspectionForecast.class);

    if (ifcList == null || ifcList.isEmpty()) {
      ifc = new InspectionForecast();
      ifc.setForecastDate(cal1.getTime());
    } else {
      ifc = ifcList.get(0);
    }

    return ifc;
  }
}
