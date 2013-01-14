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
import com.tramex.sisoprega.dto.InspectionForecastDetail;

/**
 * This proxy knows the logic to evaluate Inspection Forecast Detail information and
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
 * 01/12/2013  Diego Torres                  Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 */
@Stateless
public class InspectionForecastDetailBean extends BaseBean implements Cruddable {

  /* (non-Javadoc)
   * @see com.tramex.sisoprega.common.crud.Cruddable#Create(com.tramex.sisoprega.common.GatewayRequest)
   */
  @Override
  public CreateGatewayResponse Create(GatewayRequest request) {
    log.entering(this.getClass().getCanonicalName(), "Create");

    CreateGatewayResponse response = new CreateGatewayResponse();
    InspectionForecastDetail forecastDetail = null;
    try {
      forecastDetail = entityFromRequest(request, InspectionForecastDetail.class);

      log.fine("Received InspectionForecastDetail in request: " + forecastDetail);

      if (validateEntity(forecastDetail)) {
        log.finer("InspectionForecastDetail succesfully validated");
        em.persist(forecastDetail);
        log.finer("InspectionForecastDetail persisted on database");
        em.flush();

        String sId = String.valueOf(forecastDetail.getForecastId());
        log.finer("Setting InspectionForecastDetail id in response: " + sId);
        response.setGeneratedId(sId);
        response.setError(new Error("0", "SUCCESS", "proxy.InspectionForecastDetailBean.Create"));
        log.info("Reception inspectionForecastDetail [" + forecastDetail.toString() + "] created by principal[" + getLoggedUser() + "]");
      } else {
        log.warning("Error de validación: " + error_description);
        response.setError(new Error("VAL01", "Error de validación: " + error_description, "proxy.InspectionForecastDetailBean.Create"));
      }

    } catch (Exception e) {
      log.severe("Exception found while creating InspectionForecastDetailBean");
      log.throwing(this.getClass().getName(), "Create", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01",
            "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos",
            "proxy.InspectionForecastDetailBean.Create"));
      else {
        response.setError(new Error("DB02", "Create exception: " + e.getMessage(), "proxy.InspectionForecastDetailBean.Create"));
      }
    }

    log.exiting(this.getClass().getCanonicalName(), "Create");
    return response;
  }

  /* (non-Javadoc)
   * @see com.tramex.sisoprega.common.crud.Cruddable#Read(com.tramex.sisoprega.common.GatewayRequest)
   */
  @Override
  public ReadGatewayResponse Read(GatewayRequest request) {
    log.entering(this.getClass().getCanonicalName(), "Read");

    ReadGatewayResponse response = new ReadGatewayResponse();
    response.setEntityName(request.getEntityName());

    InspectionForecastDetail forecastDetail = null;
    try {
      forecastDetail = entityFromRequest(request, InspectionForecastDetail.class);

      log.fine("Got inspectionDetails query from request: " + forecastDetail);

      TypedQuery<InspectionForecastDetail> readQuery = null;
      String qryLogger = "";
      if (forecastDetail.getFdId() != 0) {
        readQuery = em.createNamedQuery("FORECAST_DETAIL_BY_ID", InspectionForecastDetail.class);
        readQuery.setParameter("fdId", forecastDetail.getFdId());
        qryLogger = "By forecastDetailsId [" + forecastDetail.getFdId() + "]";
      } else if(forecastDetail.getForecastId() != 0 ){
        readQuery = em.createNamedQuery("FORECAST_DETAIL_BY_FORECAST_ID", InspectionForecastDetail.class);
        readQuery.setParameter("forecastId", forecastDetail.getForecastId());
        qryLogger = "By forecastId [" + forecastDetail.getForecastId() + "]";
      } else {
        response.setError(new Error("VAL03", "El filtro especificado no es válido para detalles de la lista de inspección de ganado.",
            "proxy.InspectionForecastDetail.Read"));
        return response;
      }

      List<InspectionForecastDetail> queryResults = readQuery.getResultList();

      if (queryResults.isEmpty()) {
        response.setError(new Error("VAL02", "No se encontraron datos para el filtro seleccionado", "proxy.InspectionDetails.Read"));
      } else {
        response.getRecord().addAll(contentFromList(queryResults, InspectionForecastDetail.class));

        response.setError(new Error("0", "SUCCESS", "proxy.InspectionForecastDetail.Read"));
        log.info("Read operation " + qryLogger + " executed by principal[" + getLoggedUser() + "] on InspectionForecastDetailBean");
      }
    } catch (Exception e) {
      log.severe("Exception found while reading inspection forecast details filter");
      log.throwing(this.getClass().getCanonicalName(), "Read", e);

      response.setError(new Error("DB02", "Error en la base de datos: " + e.getMessage(), "proxy.InspectionForecastDetail.Read"));
    }

    log.exiting(this.getClass().getCanonicalName(), "Read");
    return response;
  }

  /* (non-Javadoc)
   * @see com.tramex.sisoprega.common.crud.Cruddable#Update(com.tramex.sisoprega.common.GatewayRequest)
   */
  @Override
  public UpdateGatewayResponse Update(GatewayRequest request) {
    log.entering(this.getClass().getCanonicalName(), "Update");
    UpdateGatewayResponse response = new UpdateGatewayResponse();
    InspectionForecastDetail forecastDetails = null;
    try {
      forecastDetails = entityFromRequest(request, InspectionForecastDetail.class);

      if (forecastDetails.getFdId() == 0) {
        log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id del registro al intentar actualizar sus datos.",
            "proxy.InspectionForecastDetails.Update"));
      } else {
        if (validateEntity(forecastDetails)) {
          em.merge(forecastDetails);
          em.flush();

          GatewayContent content = getContentFromEntity(forecastDetails, InspectionForecastDetail.class);
          response.setUpdatedRecord(content);

          response.setError(new Error("0", "SUCCESS", "proxy.InspectionForecastDetails.Update"));
          log.info("Forecast inspection Details [" + forecastDetails.toString() + "] updated by principal[" + getLoggedUser() + "]");
        } else {
          log.warning("Validation error:" + error_description);
          response.setError(new Error("VAL01", "Error de validación de datos:" + error_description, "proxy.InspectionForecastDetailBean.Update"));
        }
      }

    } catch (Exception e) {
      log.severe("Exception found while updating InspectionDetails");
      log.throwing(this.getClass().getName(), "Update", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, ",
            "proxy.InspectionDetailsBean.Update"));
      else {
        response.setError(new Error("DB02", "Error en la base de datos:[" + e.getMessage() + "]", "proxy.InspectionDetailsBean.Update"));
      }
    }

    log.exiting(this.getClass().getCanonicalName(), "Update");
    return response;
  }

  /* (non-Javadoc)
   * @see com.tramex.sisoprega.common.crud.Cruddable#Delete(com.tramex.sisoprega.common.GatewayRequest)
   */
  @Override
  public BaseResponse Delete(GatewayRequest request) {
    log.entering(this.getClass().getCanonicalName(), "Delete");
    BaseResponse response = new BaseResponse();

    try {
      InspectionForecastDetail forecastDetail = entityFromRequest(request, InspectionForecastDetail.class);
      if (forecastDetail.getFdId() == 0) {
        log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id de detalles de inspeccion al intentar eliminar el registro.", "proxy.InspectionDetails.Delete"));
      } else {
        TypedQuery<InspectionForecastDetail> readQuery = em.createNamedQuery("FORECAST_DETAIL_BY_ID", InspectionForecastDetail.class);
        readQuery.setParameter("fdId", forecastDetail.getFdId());
        forecastDetail = readQuery.getSingleResult();
        log.info("Deleting forecast detail [" + forecastDetail.toString() + "] by principal[" + getLoggedUser() + "]");
        em.merge(forecastDetail);
        em.remove(forecastDetail);
        em.flush();

        response.setError(new Error("0", "SUCCESS", "proxy.InspectionForecastDetail.Delete"));
        log.info("InspectionForecastDetail successfully deleted by principal [" + getLoggedUser() + "]");
      }
    } catch (Exception e) {
      log.severe("Exception found while deleting InspectionDetails");
      log.throwing(this.getClass().getName(), "Delete", e);

      response.setError(new Error("DEL01",
          "Error al intentar borrar datos, es probable que esta entidad tenga otras entidades relacionadas, ",
          "proxy.InspectionForecastDetails.Delete"));
    }

    log.exiting(this.getClass().getCanonicalName(), "Delete");
    return response;
  }

}
