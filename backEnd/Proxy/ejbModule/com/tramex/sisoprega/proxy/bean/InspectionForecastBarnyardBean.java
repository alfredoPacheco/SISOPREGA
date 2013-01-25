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
import com.tramex.sisoprega.dto.InspectionForecastBarnyard;

/**
 * This proxy knows the logic to evaluate Inspection Forecast Barnayard information and
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
 * 01/13/2013  Diego Torres                  Initial Version.
 * 01/24/2013  Alfredo Pacheco				 Added FORECAST_BARNYARD_BY_FORECAST_DETAIL_ID implementatino for delete.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 */
@Stateless
public class InspectionForecastBarnyardBean extends BaseBean implements Cruddable {

  /* (non-Javadoc)
   * @see com.tramex.sisoprega.common.crud.Cruddable#Create(com.tramex.sisoprega.common.GatewayRequest)
   */
  @Override
  public CreateGatewayResponse Create(GatewayRequest request) {
    log.entering(this.getClass().getCanonicalName(), "Create");

    CreateGatewayResponse response = new CreateGatewayResponse();
    InspectionForecastBarnyard forecastBarnyard = null;
    try {
      forecastBarnyard = entityFromRequest(request, InspectionForecastBarnyard.class);

      log.fine("Received InspectionForecastBarnard in request: " + forecastBarnyard);

      if (validateEntity(forecastBarnyard)) {
        log.finer("InspectionForecastBarnyard succesfully validated");
        em.persist(forecastBarnyard);
        log.finer("InspectionForecastBarnyard persisted on database");
        em.flush();

        String sId = String.valueOf(forecastBarnyard.getIfbId());
        log.finer("Setting InspectionForecastBarnyard id in response: " + sId);
        response.setGeneratedId(sId);
        response.setError(new Error("0", "SUCCESS", "proxy.InspectionForecastBarnyardBean.Create"));
        log.info("Reception inspectionForecastBarnyard [" + forecastBarnyard.toString() + "] created by principal[" + getLoggedUser() + "]");
      } else {
        log.warning("Error de validación: " + error_description);
        response.setError(new Error("VAL01", "Error de validación: " + error_description, "proxy.InspectionForecastBarnyardBean.Create"));
      }

    } catch (Exception e) {
      log.severe("Exception found while creating InspectionForecastBarnyardBean");
      log.throwing(this.getClass().getName(), "Create", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01",
            "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos",
            "proxy.InspectionForecastBarnyardBean.Create"));
      else {
        response.setError(new Error("DB02", "Create exception: " + e.getMessage(), "proxy.InspectionForecastBarnyardBean.Create"));
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

    InspectionForecastBarnyard forecastBarnyard = null;
    try {
      forecastBarnyard = entityFromRequest(request, InspectionForecastBarnyard.class);

      log.fine("Got inspectionBarnyard query from request: " + forecastBarnyard);

      TypedQuery<InspectionForecastBarnyard> readQuery = null;
      String qryLogger = "";
      if (forecastBarnyard.getIfbId() != 0) {
        readQuery = em.createNamedQuery("FORECAST_BARNAYARD_BY_ID", InspectionForecastBarnyard.class);
        readQuery.setParameter("fdId", forecastBarnyard.getIfbId());
        qryLogger = "By ifbId [" + forecastBarnyard.getIfbId() + "]";
      } else if(forecastBarnyard.getFdId() != 0 ){    	  
        readQuery = em.createNamedQuery("FORECAST_BARNYARD_BY_FORECAST_DETAIL_ID", InspectionForecastBarnyard.class);
        log.info(String.valueOf(forecastBarnyard.getFdId()));
        readQuery.setParameter("fdId", forecastBarnyard.getFdId());
        qryLogger = "By getFdId [" + forecastBarnyard.getFdId() + "]";
      } else {
        response.setError(new Error("VAL03", "El filtro especificado no es válido para detalles de la lista de inspección de ganado.",
            "proxy.InspectionForecastBarnayrd.Read"));
        return response;
      }

      List<InspectionForecastBarnyard> queryResults = readQuery.getResultList();

      if (queryResults.isEmpty()) {
        response.setError(new Error("VAL02", "No se encontraron datos para el filtro seleccionado", "proxy.InspectionDetails.Read"));
      } else {
        response.getRecord().addAll(contentFromList(queryResults, InspectionForecastBarnyard.class));

        response.setError(new Error("0", "SUCCESS", "proxy.InspectionForecastBarnayrd.Read"));
        log.info("Read operation " + qryLogger + " executed by principal[" + getLoggedUser() + "] on InspectionForecastBarnayrd");
      }
    } catch (Exception e) {
      log.severe("Exception found while reading inspection forecast details filter");
      log.throwing(this.getClass().getCanonicalName(), "Read", e);

      response.setError(new Error("DB02", "Error en la base de datos: " + e.getMessage(), "proxy.InspectionForecastBarnayrd.Read"));
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
    InspectionForecastBarnyard forecastBarnyard = null;
    try {
      forecastBarnyard = entityFromRequest(request, InspectionForecastBarnyard.class);

      if (forecastBarnyard.getFdId() == 0) {
        log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id del registro al intentar actualizar sus datos.",
            "proxy.InspectionForecastBarnyard.Update"));
      } else {
        if (validateEntity(forecastBarnyard)) {
          em.merge(forecastBarnyard);
          em.flush();

          GatewayContent content = getContentFromEntity(forecastBarnyard, InspectionForecastBarnyard.class);
          response.setUpdatedRecord(content);

          response.setError(new Error("0", "SUCCESS", "proxy.InspectionForecastBarnyard.Update"));
          log.info("Forecast inspection barnyard [" + forecastBarnyard.toString() + "] updated by principal[" + getLoggedUser() + "]");
        } else {
          log.warning("Validation error:" + error_description);
          response.setError(new Error("VAL01", "Error de validación de datos:" + error_description, "proxy.InspectionForecastBarnyardBean.Update"));
        }
      }

    } catch (Exception e) {
      log.severe("Exception found while updating ForecastInspectionBarnyard");
      log.throwing(this.getClass().getName(), "Update", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, ",
            "proxy.InspectionForecastBarnyardBean.Update"));
      else {
        response.setError(new Error("DB02", "Error en la base de datos:[" + e.getMessage() + "]", "proxy.InspectionForecastBarnyardBean.Update"));
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
      InspectionForecastBarnyard forecastBarnyard = entityFromRequest(request, InspectionForecastBarnyard.class);
      
      if (forecastBarnyard.getFdId()!= 0){
    	  TypedQuery<InspectionForecastBarnyard> readQuery = em.createNamedQuery("FORECAST_BARNYARD_BY_FORECAST_DETAIL_ID", InspectionForecastBarnyard.class);
          readQuery.setParameter("fdId", forecastBarnyard.getFdId());
          forecastBarnyard = readQuery.getSingleResult();
          log.info("Deleting forecast barnyard [" + forecastBarnyard.toString() + "] by principal[" + getLoggedUser() + "]");
          em.merge(forecastBarnyard);
          em.remove(forecastBarnyard);
          em.flush();
          response.setError(new Error("0", "SUCCESS", "proxy.InspectionForecastBarnyard.Delete"));
          log.info("InspectionForecastBarnyard successfully deleted by principal [" + getLoggedUser() + "]");
      }else if(forecastBarnyard.getIfbId() != 0) {
          TypedQuery<InspectionForecastBarnyard> readQuery = em.createNamedQuery("FORECAST_BARNAYARD_BY_ID", InspectionForecastBarnyard.class);
          readQuery.setParameter("ifbId", forecastBarnyard.getIfbId());
          forecastBarnyard = readQuery.getSingleResult();
          log.info("Deleting forecast detail [" + forecastBarnyard.toString() + "] by principal[" + getLoggedUser() + "]");
          em.merge(forecastBarnyard);
          em.remove(forecastBarnyard);
          em.flush();
          response.setError(new Error("0", "SUCCESS", "proxy.InspectionForecastBarnyard.Delete"));
          log.info("InspectionForecastBarnyard successfully deleted by principal [" + getLoggedUser() + "]");                  
      } else {
        log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id de detalles de inspeccion al intentar eliminar el registro.", "proxy.InspectionDetails.Delete"));
      }
    } catch (Exception e) {
      log.severe("Exception found while deleting InspectionForecastBarnyard");
      log.throwing(this.getClass().getName(), "Delete", e);

      response.setError(new Error("DEL01",
          "Error al intentar borrar datos, es probable que esta entidad tenga otras entidades relacionadas, ",
          "proxy.InspectionForecastBarnyard.Delete"));
    }

    log.exiting(this.getClass().getCanonicalName(), "Delete");
    return response;
  }

}
