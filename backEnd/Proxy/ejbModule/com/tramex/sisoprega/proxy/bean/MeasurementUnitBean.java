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
import com.tramex.sisoprega.dto.MeasurementUnit;

/**
 * This proxy knows the logic to evaluate Measurement units information and the
 * way to the database in order to save their data. Also, it is contained in EJB
 * container, we can apply security and life cycle methods for resources.<BR/>
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 12/09/2012  Jaime Figueroa                Initial Version.
 * 12/13/2012  Diego Torres                  Enable read operation and standard error codes.
 * 12/16/2012  Diego Torres                  Adding log activity
 * ====================================================================================
 * </PRE>
 * 
 * @author Jaime Figueroa
 * 
 */
@Stateless
public class MeasurementUnitBean extends BaseBean implements Cruddable {

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
    MeasurementUnit unit = null;
    try {
      unit = entityFromRequest(request, MeasurementUnit.class);

      log.fine("Received MeasurementUnit in request: " + unit);

      if (validateEntity(unit)) {
        log.finer("MeasurementUnit succesfully validated");
        em.persist(unit);
        log.finer("MeasurementUnit persisted on database");
        em.flush();

        String sId = String.valueOf(unit.getUnitId());
        log.finer("Setting MeasurementUnit id in response: " + sId);
        response.setGeneratedId(sId);
        response.setError(new Error("0", "SUCCESS", "proxy.MeasurementUnitdBean.Create"));
        log.info("Measurement Unit [" + unit.toString() + "] created by principal[" + getLoggedUser() + "]");
      } else {
        log.warning("Error de validación: " + error_description);
        response.setError(new Error("VAL01", "Error de validación: " + error_description, "proxy.MeasurementUnitBean.Create"));
      }

    } catch (Exception e) {
      log.severe("Exception found while creating Measurement Unit");
      log.throwing(this.getClass().getName(), "Create", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01",
            "Los datos que usted ha intentado ingresar no son permitidos por la base de datos",
            "proxy.MeasurementUnitBean.Create"));
      else {
        response.setError(new Error("DB02", "Create exception: " + e.getMessage(), "proxy.MeasurementUnitBean.Create"));
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

    MeasurementUnit mu = null;
    try {
      mu = entityFromRequest(request, MeasurementUnit.class);
      log.fine("Got MeasurementUnit from request: " + mu);

      TypedQuery<MeasurementUnit> readQuery = null;
      
      String qryLogger = "";
      if (mu.getUnitId() != 0) {
        readQuery = em.createNamedQuery("CAT_MEASUREMENTUNIT_BY_ID", MeasurementUnit.class);
        log.fine("Query by unitId: " + mu.getUnitId());
        readQuery.setParameter("unitId", mu.getUnitId());
        qryLogger = "By unitId [" + mu.getUnitId() + "]";
      } else {
        readQuery = em.createNamedQuery("ALL_MEASUREMENT_UNITS", MeasurementUnit.class);;
        qryLogger = "By ALL_MEASUREMENT_UNITS";
      }

      // Query the results through the jpa using a typedQuery
      List<MeasurementUnit> queryResults = readQuery.getResultList();

      if (queryResults.isEmpty()) {
        response.setError(new Error("VAL02", "No se encontraron datos para el filtro seleccionado", "proxy.MeasurementUnit.Read"));
      } else {
        // Add query results to response
        response.getRecord().addAll(contentFromList(queryResults, MeasurementUnit.class));

        // Add success message to response
        response.setError(new Error("0", "SUCCESS", "proxy.MeasurementUnit.Read"));
        log.info("Read operation " + qryLogger + " executed by principal[" + getLoggedUser() + "] on MeasurementUnitBean");
      }
    } catch (Exception e) {
      // something went wrong, alert the server and respond the client
      log.severe("Exception found while reading feed MeasurementUnit");
      log.throwing(this.getClass().getCanonicalName(), "Read", e);

      response.setError(new Error("DB02", "Read exception: " + e.getMessage(), "proxy.MeasurementUnit.Read"));
    }

    // end and respond.
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
    MeasurementUnit unit = null;
    try {
      unit = entityFromRequest(request, MeasurementUnit.class);

      if (unit.getUnitId() == 0) {
        log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id de la unidad de medida al intentar actualizar sus datos.",
            "proxy.MeasurementUnit.Update"));
      } else {
        if (validateEntity(unit)) {
          em.merge(unit);
          em.flush();

          GatewayContent content = getContentFromEntity(unit, MeasurementUnit.class);
          response.setUpdatedRecord(content);

          response.setError(new Error("0", "SUCCESS", "proxy.MeasurementUnit.Update"));
          log.info("Measurement Unit [" + unit.toString() + "] updated by principal[" + getLoggedUser() + "]");
        } else {
          log.warning("Validation error: " + error_description);
          response.setError(new Error("VAL01", "Error de validación de datos:" + error_description,
              "proxy.MeasurementUnit.Update"));
        }
      }

    } catch (Exception e) {
      log.severe("Exception found while updating MeasurementUnit");
      log.throwing(this.getClass().getName(), "Update", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, "
            + "muy probablemente la unidad de medida ya existe.",
            "proxy.MeasurementUnit.Update"));
      else {
        response.setError(new Error("DB02", "Error en la base de datos:[" + e.getMessage() + "]",
            "proxy.MeasurementUnit.Update"));
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
      MeasurementUnit unit = entityFromRequest(request, MeasurementUnit.class);
      if (unit.getUnitId() == 0) {
        log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id de la unidad de medida al intentar eliminar el registro.",
            "proxy.MeasurementUnit.Delete"));
      } else {
        TypedQuery<MeasurementUnit> readQuery = em.createNamedQuery("CAT_MEASUREMENTUNIT_BY_ID", MeasurementUnit.class);
        readQuery.setParameter("unitId", unit.getUnitId());
        unit = readQuery.getSingleResult();
        log.info("Deleting Measurement Unit [" + unit.toString() + "] by principal[" + getLoggedUser() + "]");
        em.merge(unit);
        em.remove(unit);
        em.flush();

        response.setError(new Error("0", "SUCCESS", "proxy.MeasurementUnit.Delete"));
        log.info("Measurement Unit successfully deleted by principal [" + getLoggedUser() + "]");
      }
    } catch (Exception e) {
      log.severe("Exception found while deleting contact");
      log.throwing(this.getClass().getName(), "Delete", e);

      response.setError(new Error("DEL01",
          "Error al intentar borrar datos, es probable que esta entidad tenga otras entidades relacionadas",
          "proxy.MeasurementUnit.Delete"));
    }

    log.exiting(this.getClass().getCanonicalName(), "Delete");
    return response;
  }

}
