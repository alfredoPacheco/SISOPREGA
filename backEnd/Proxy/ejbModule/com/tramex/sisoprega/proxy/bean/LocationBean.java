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

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.TypedQuery;

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
    log.entering(this.getClass().getCanonicalName(), "Create");

    CreateGatewayResponse response = new CreateGatewayResponse();
    Location location = null;
    try {
      location = entityFromRequest(request, Location.class);

      log.fine("Received catalog location in request: " + location);

      if (validateEntity(location)) {
        log.finer("cat location succesfully validated");
        em.persist(location);
        log.finer("cat location persisted on database");
        em.flush();

        String sId = String.valueOf(location.getLocationId());
        log.finer("Setting cat location id in response: " + sId);
        response.setGeneratedId(sId);
        response.setError(new Error("0", "SUCCESS", "proxy.LocationBean.Create"));
        log.info("Location [" + location.toString() + "] created by principal[" + getLoggedUser() + "]");
      } else {
        log.warning("Error de validación: " + error_description);
        response.setError(new Error("VAL01", "Error de validación: " + error_description, "proxy.LocationBean.Create"));
      }

    } catch (Exception e) {
      log.severe("Exception found while creating cat location");
      log.throwing(this.getClass().getName(), "Create", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, "
            + "muy probablemente el ganadero que usted quiere agregar ya existe en la base de datos.",
            "proxy.LocationBean.Create"));
      else {
        response.setError(new Error("DB02", "Create exception: " + e.getMessage(), "proxy.LocationBean.Create"));
      }
    }

    log.exiting(this.getClass().getCanonicalName(), "Create");
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
    log.entering(this.getClass().getCanonicalName(), "Read");

    ReadGatewayResponse response = new ReadGatewayResponse();
    response.setEntityName(request.getEntityName());

    Location catalog = null;
    try {
      catalog = entityFromRequest(request, Location.class);

      log.fine("Got contact from request: " + catalog);
      TypedQuery<Location> readQuery = null;
      String qryLogger = "";
      if (catalog.getLocationId() != 0) {
        readQuery = em.createNamedQuery("CAT_LOCATION_BY_ID", Location.class);
        readQuery.setParameter("catclassId", catalog.getLocationId());
        qryLogger = "By catclassId [" + catalog.getLocationId() + "]";
      } else {
        readQuery = em.createNamedQuery("ALL_CAT_LOCATION", Location.class);
        qryLogger = "By ALL_CAT_LOCATION";
      }

      List<Location> queryResults = readQuery.getResultList();

      if (queryResults.isEmpty()) {
        response.setError(new Error("VAL02", "No se encontraron datos para el filtro seleccionado", "proxy.LocationBEan.Read"));
      } else {
        List<GatewayContent> records = contentFromList(queryResults, Location.class);
        response.getRecord().addAll(records);
        response.setError(new Error("0", "SUCCESS", "proxy.LocationBean.Read"));
        log.info("Read operation " + qryLogger + " executed by principal[" + getLoggedUser() + "] on LocationBean");
      }

    } catch (Exception e) {
      log.severe("Exception found while reading Cat Location");
      log.throwing(this.getClass().getCanonicalName(), "Read", e);

      response.setError(new Error("DB02", "Error en la base de datos: " + e.getMessage(), "proxy.LocationBean.Read"));
    }

    log.exiting(this.getClass().getCanonicalName(), "Read");
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
    log.entering(this.getClass().getCanonicalName(), "Update");
    UpdateGatewayResponse response = new UpdateGatewayResponse();
    Location location = null;
    try {
      location = entityFromRequest(request, Location.class);

      if (location.getLocationId() == 0) {
        log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id de la localización al intentar actualizar sus datos.",
            "proxy.LocationBean.Update"));
      } else {
        if (validateEntity(location)) {
          em.merge(location);
          em.flush();

          GatewayContent content = getContentFromEntity(location, Location.class);
          response.setUpdatedRecord(content);

          response.setError(new Error("0", "SUCCESS", "proxy.CatLocation.Update"));
          log.info("Location [" + location.toString() + "] updated by principal[" + getLoggedUser() + "]");
        } else {
          log.warning("Validation error: " + error_description);
          response.setError(new Error("VAL01", "Error de validación de datos:" + error_description, "proxy.LocationBean.Update"));
        }
      }

    } catch (Exception e) {
      log.severe("Exception found while updating Location");
      log.throwing(this.getClass().getName(), "Update", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, "
            + "muy probablemente la localización que usted quiere agregar ya se encuentra en la base de datos.",
            "proxy.LocationBean.Update"));
      else {
        response.setError(new Error("DB02", "Error en la base de datos:[" + e.getMessage() + "]", "proxy.LocationBean.Update"));
      }
    }

    log.exiting(this.getClass().getCanonicalName(), "Update");
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
    log.entering(this.getClass().getCanonicalName(), "Delete");
    BaseResponse response = new BaseResponse();

    try {
      Location location = entityFromRequest(request, Location.class);
      if (location.getLocationId() == 0) {
        log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id de la localización al intentar eliminar el registro.",
            "proxy.LocationBean.Delete"));
      } else {
        TypedQuery<Location> readQuery = em.createNamedQuery("CAT_LOCATION_BY_ID", Location.class);
        readQuery.setParameter("locationId", location.getLocationId());
        location = readQuery.getSingleResult();
        log.info("Deleting Location [" + location.toString() + "] by principal[" + getLoggedUser() + "]");
        em.merge(location);
        em.remove(location);
        em.flush();

        response.setError(new Error("0", "SUCCESS", "proxy.LocationBean.Delete"));
        log.info("Location successfully deleted by principal [" + getLoggedUser() + "]");
      }
    } catch (Exception e) {
      log.severe("Exception found while deleting catalog");
      log.throwing(this.getClass().getName(), "Delete", e);

      response.setError(new Error("DEL01",
          "Error al intentar borrar datos. Es muy probable que la entidad que usted quiere eliminar "
              + "cuente con otras entidades relacionadas.", "proxy.LocationBean.Delete"));
    }

    log.exiting(this.getClass().getCanonicalName(), "Delete");
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
