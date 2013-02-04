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

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ejb.Stateless;

import com.tramex.sisoprega.common.BaseResponse;
import com.tramex.sisoprega.common.CreateGatewayResponse;
import com.tramex.sisoprega.common.Error;
import com.tramex.sisoprega.common.GatewayContent;
import com.tramex.sisoprega.common.GatewayRequest;
import com.tramex.sisoprega.common.ReadGatewayResponse;
import com.tramex.sisoprega.common.UpdateGatewayResponse;
import com.tramex.sisoprega.common.crud.Cruddable;
import com.tramex.sisoprega.dto.Location;

/**
 * This proxy knows the logic to evaluate Cattle class entities information and
 * the way to the database in order to save their data. Also, it is contained in
 * EJB container, we can apply security and life cycle methods for resources.<BR/>
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 11/23/2012  Jaime Figueroa                 Initial Version.
 * 12/08/2012  Diego Torres                   Add standard error codes and validation.
 * 12/16/2012  Diego Torres                   Adding log activity
 * 01/22/2013  Diego Torres                  Implementing DataModel.
 * ====================================================================================
 * </PRE>
 * 
 * @author Jaime Figueroa
 * 
 */
@Stateless
public class LocationBean extends BaseBean implements Cruddable {

  /*
   * (non-Javadoc)
   * 
   * @see
   * com.tramex.sisoprega.common.crud.Cruddable#Create(com.tramex.sisoprega.
   * common.GatewayRequest)
   */
  @Override
  public CreateGatewayResponse Create(GatewayRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "Create");

    CreateGatewayResponse response = new CreateGatewayResponse();
    Location location = null;
    try {
      location = entityFromRequest(request, Location.class);

      this.log.fine("Received catalog location in request: " + location);

      if (validateEntity(location)) {
        this.log.finer("cat location succesfully validated");
        dataModel.createDataModel(location);

        String sId = String.valueOf(location.getLocationId());
        this.log.finer("Setting cat location id in response: " + sId);
        response.setGeneratedId(sId);
        response.setError(new Error("0", "SUCCESS", "proxy.LocationBean.Create"));
        this.log.info("Location [" + location.toString() + "] created by principal[" + getLoggedUser() + "]");
      } else {
        this.log.warning("Error de validación: " + error_description);
        response.setError(new Error("VAL01", "Error de validación: " + error_description, "proxy.LocationBean.Create"));
      }

    } catch (Exception e) {
      this.log.severe("Exception found while creating cat location");
      this.log.throwing(this.getClass().getName(), "Create", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, "
            + "muy probablemente el ganadero que usted quiere agregar ya existe en la base de datos.",
            "proxy.LocationBean.Create"));
      else {
        response.setError(new Error("DB02", "Create exception: " + e.getMessage(), "proxy.LocationBean.Create"));
      }
    }

    this.log.exiting(this.getClass().getCanonicalName(), "Create");
    return response;
  }

  /*
   * (non-Javadoc)
   * 
   * @see
   * com.tramex.sisoprega.common.crud.Cruddable#Read(com.tramex.sisoprega.common
   * .GatewayRequest)
   */
  @Override
  public ReadGatewayResponse Read(GatewayRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "Read");

    ReadGatewayResponse response = new ReadGatewayResponse();
    response.setEntityName(request.getEntityName());

    Location catalog = null;
    try {
      catalog = entityFromRequest(request, Location.class);

      this.log.fine("Got location from request: " + catalog);
      
      String qryLogger = "";
      String queryName = "";
      Map<String, Object> parameters = new HashMap<String, Object>();
      if (catalog.getLocationId() != 0) {
        queryName = "CAT_LOCATION_BY_ID";
        parameters.put("catclassId", catalog.getLocationId());
        qryLogger = "By catclassId [" + catalog.getLocationId() + "]";
      } else {
        queryName = "ALL_CAT_LOCATION";
        qryLogger = "By ALL_CAT_LOCATION";
      }

      List<Location> queryResults = dataModel.readDataModelList(queryName, parameters, Location.class);

      if (queryResults.isEmpty()) {
        response.setError(new Error("VAL02", "No se encontraron datos para el filtro seleccionado", "proxy.LocationBEan.Read"));
      } else {
        List<GatewayContent> records = contentFromList(queryResults, Location.class);
        response.getRecord().addAll(records);
        response.setError(new Error("0", "SUCCESS", "proxy.LocationBean.Read"));
        this.log.info("Read operation " + qryLogger + " executed by principal[" + getLoggedUser() + "] on LocationBean");
      }

    } catch (Exception e) {
      this.log.severe("Exception found while reading Cat Location");
      this.log.throwing(this.getClass().getCanonicalName(), "Read", e);

      response.setError(new Error("DB02", "Error en la base de datos: " + e.getMessage(), "proxy.LocationBean.Read"));
    }

    this.log.exiting(this.getClass().getCanonicalName(), "Read");
    return response;
  }

  /*
   * (non-Javadoc)
   * 
   * @see
   * com.tramex.sisoprega.common.crud.Cruddable#Update(com.tramex.sisoprega.
   * common.GatewayRequest)
   */
  @Override
  public UpdateGatewayResponse Update(GatewayRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "Update");
    UpdateGatewayResponse response = new UpdateGatewayResponse();
    Location location = null;
    try {
      location = entityFromRequest(request, Location.class);

      if (location.getLocationId() == 0) {
        this.log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id de la localización al intentar actualizar sus datos.",
            "proxy.LocationBean.Update"));
      } else {
        if (validateEntity(location)) {
          dataModel.updateDataModel(location);

          GatewayContent content = getContentFromEntity(location, Location.class);
          response.setUpdatedRecord(content);

          response.setError(new Error("0", "SUCCESS", "proxy.CatLocation.Update"));
          this.log.info("Location [" + location.toString() + "] updated by principal[" + getLoggedUser() + "]");
        } else {
          this.log.warning("Validation error: " + error_description);
          response.setError(new Error("VAL01", "Error de validación de datos:" + error_description, "proxy.LocationBean.Update"));
        }
      }

    } catch (Exception e) {
      this.log.severe("Exception found while updating Location");
      this.log.throwing(this.getClass().getName(), "Update", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, "
            + "muy probablemente la localización que usted quiere agregar ya se encuentra en la base de datos.",
            "proxy.LocationBean.Update"));
      else {
        response.setError(new Error("DB02", "Error en la base de datos:[" + e.getMessage() + "]", "proxy.LocationBean.Update"));
      }
    }

    this.log.exiting(this.getClass().getCanonicalName(), "Update");
    return response;
  }

  /*
   * (non-Javadoc)
   * 
   * @see
   * com.tramex.sisoprega.common.crud.Cruddable#Delete(com.tramex.sisoprega.
   * common.GatewayRequest)
   */
  @Override
  public BaseResponse Delete(GatewayRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "Delete");
    BaseResponse response = new BaseResponse();

    try {
      Location location = entityFromRequest(request, Location.class);
      if (location.getLocationId() == 0) {
        this.log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id de la localización al intentar eliminar el registro.",
            "proxy.LocationBean.Delete"));
      } else {
        location = dataModel.readSingleDataModel("CAT_LOCATION_BY_ID", "locationId", location.getLocationId(), Location.class);
        this.log.info("Deleting Location [" + location.toString() + "] by principal[" + getLoggedUser() + "]");
        dataModel.deleteDataModel(location, getLoggedUser());
        response.setError(new Error("0", "SUCCESS", "proxy.LocationBean.Delete"));
      }
    } catch (Exception e) {
      this.log.severe("Exception found while deleting catalog");
      this.log.throwing(this.getClass().getName(), "Delete", e);

      response.setError(new Error("DEL01",
          "Error al intentar borrar datos. Es muy probable que la entidad que usted quiere eliminar "
              + "cuente con otras entidades relacionadas.", "proxy.LocationBean.Delete"));
    }

    this.log.exiting(this.getClass().getCanonicalName(), "Delete");
    return response;
  }

  @Override
  protected boolean validateEntity(Object entity) {
    boolean valid = super.validateEntity(entity);
    Location loc = (Location) entity;
    if (valid) {
      valid = loc.getLocationName().length() <= 50;
      if (!valid)
        error_description = "El nombre de la localización es más grande de lo permitido en la base de datos.";
    }

    return valid;
  }

}
