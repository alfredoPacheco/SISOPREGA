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
 * 01/22/2013  Diego Torres                  Implementing DataModel.
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
    this.log.entering(this.getClass().getCanonicalName(), "Create");

    CreateGatewayResponse response = new CreateGatewayResponse();
    InspectionForecastBarnyard forecastBarnyard = null;
    try {
      forecastBarnyard = entityFromRequest(request, InspectionForecastBarnyard.class);

      this.log.fine("Received InspectionForecastBarnard in request: " + forecastBarnyard);

      if (validateEntity(forecastBarnyard)) {
        this.log.finer("InspectionForecastBarnyard succesfully validated");
        dataModel.createDataModel(forecastBarnyard);

        String sId = String.valueOf(forecastBarnyard.getIfbId());
        this.log.finer("Setting InspectionForecastBarnyard id in response: " + sId);
        response.setGeneratedId(sId);
        response.setError(new Error("0", "SUCCESS", "proxy.InspectionForecastBarnyardBean.Create"));
        this.log.info("Reception inspectionForecastBarnyard [" + forecastBarnyard.toString() + "] created by principal[" + getLoggedUser() + "]");
      } else {
        this.log.warning("Error de validación: " + error_description);
        response.setError(new Error("VAL01", "Error de validación: " + error_description, "proxy.InspectionForecastBarnyardBean.Create"));
      }

    } catch (Exception e) {
      this.log.severe("Exception found while creating InspectionForecastBarnyardBean");
      this.log.throwing(this.getClass().getName(), "Create", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01",
            "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos",
            "proxy.InspectionForecastBarnyardBean.Create"));
      else {
        response.setError(new Error("DB02", "Create exception: " + e.getMessage(), "proxy.InspectionForecastBarnyardBean.Create"));
      }
    }

    this.log.exiting(this.getClass().getCanonicalName(), "Create");
    return response;
  }

  /* (non-Javadoc)
   * @see com.tramex.sisoprega.common.crud.Cruddable#Read(com.tramex.sisoprega.common.GatewayRequest)
   */
  @Override
  public ReadGatewayResponse Read(GatewayRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "Read");

    ReadGatewayResponse response = new ReadGatewayResponse();
    response.setEntityName(request.getEntityName());

    InspectionForecastBarnyard forecastBarnyard = null;
    try {
      forecastBarnyard = entityFromRequest(request, InspectionForecastBarnyard.class);

      this.log.fine("Got inspectionBarnyard query from request: " + forecastBarnyard);

      String qryLogger = "";
      String queryName = "";
      Map<String, Object> parameters = new HashMap<String, Object>();
      if (forecastBarnyard.getIfbId() != 0) {
        queryName = "FORECAST_BARNAYARD_BY_ID";
        parameters.put("fdId", forecastBarnyard.getIfbId());
        qryLogger = "By ifbId [" + forecastBarnyard.getIfbId() + "]";
      } else if(forecastBarnyard.getFdId() != 0 ){
        queryName = "FORECAST_BARNYARD_BY_FORECAST_DETAIL_ID";
        parameters.put("getFdId", forecastBarnyard.getFdId());
        qryLogger = "By getFdId [" + forecastBarnyard.getFdId() + "]";
      } else {
        response.setError(new Error("VAL03", "El filtro especificado no es válido para detalles de la lista de inspección de ganado.",
            "proxy.InspectionForecastBarnayrd.Read"));
        return response;
      }

      List<InspectionForecastBarnyard> queryResults = dataModel.readDataModelList(queryName, parameters, InspectionForecastBarnyard.class);

      if (queryResults.isEmpty()) {
        response.setError(new Error("VAL02", "No se encontraron datos para el filtro seleccionado", "proxy.InspectionDetails.Read"));
      } else {
        response.getRecord().addAll(contentFromList(queryResults, InspectionForecastBarnyard.class));

        response.setError(new Error("0", "SUCCESS", "proxy.InspectionForecastBarnayrd.Read"));
        this.log.info("Read operation " + qryLogger + " executed by principal[" + getLoggedUser() + "] on InspectionForecastBarnayrd");
      }
    } catch (Exception e) {
      this.log.severe("Exception found while reading inspection forecast details filter");
      this.log.throwing(this.getClass().getCanonicalName(), "Read", e);

      response.setError(new Error("DB02", "Error en la base de datos: " + e.getMessage(), "proxy.InspectionForecastBarnayrd.Read"));
    }

    this.log.exiting(this.getClass().getCanonicalName(), "Read");
    return response;
  }

  /* (non-Javadoc)
   * @see com.tramex.sisoprega.common.crud.Cruddable#Update(com.tramex.sisoprega.common.GatewayRequest)
   */
  @Override
  public UpdateGatewayResponse Update(GatewayRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "Update");
    UpdateGatewayResponse response = new UpdateGatewayResponse();
    InspectionForecastBarnyard forecastBarnyard = null;
    try {
      forecastBarnyard = entityFromRequest(request, InspectionForecastBarnyard.class);

      if (forecastBarnyard.getFdId() == 0) {
        this.log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id del registro al intentar actualizar sus datos.",
            "proxy.InspectionForecastBarnyard.Update"));
      } else {
        if (validateEntity(forecastBarnyard)) {
          dataModel.updateDataModel(forecastBarnyard);

          GatewayContent content = getContentFromEntity(forecastBarnyard, InspectionForecastBarnyard.class);
          response.setUpdatedRecord(content);

          response.setError(new Error("0", "SUCCESS", "proxy.InspectionForecastBarnyard.Update"));
          this.log.info("Forecast inspection barnyard [" + forecastBarnyard.toString() + "] updated by principal[" + getLoggedUser() + "]");
        } else {
          this.log.warning("Validation error:" + error_description);
          response.setError(new Error("VAL01", "Error de validación de datos:" + error_description, "proxy.InspectionForecastBarnyardBean.Update"));
        }
      }

    } catch (Exception e) {
      this.log.severe("Exception found while updating ForecastInspectionBarnyard");
      this.log.throwing(this.getClass().getName(), "Update", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, ",
            "proxy.InspectionForecastBarnyardBean.Update"));
      else {
        response.setError(new Error("DB02", "Error en la base de datos:[" + e.getMessage() + "]", "proxy.InspectionForecastBarnyardBean.Update"));
      }
    }

    this.log.exiting(this.getClass().getCanonicalName(), "Update");
    return response;
  }

  /* (non-Javadoc)
   * @see com.tramex.sisoprega.common.crud.Cruddable#Delete(com.tramex.sisoprega.common.GatewayRequest)
   */
  @Override
  public BaseResponse Delete(GatewayRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "Delete");
    BaseResponse response = new BaseResponse();

    try {
      InspectionForecastBarnyard forecastBarnyard = entityFromRequest(request, InspectionForecastBarnyard.class);
      if (forecastBarnyard.getIfbId() == 0) {
        this.log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id de detalles de inspeccion al intentar eliminar el registro.", "proxy.InspectionDetails.Delete"));
      } else {
        forecastBarnyard = dataModel.readSingleDataModel("FORECAST_BARNYARD_BY_ID", "ifbId", forecastBarnyard.getIfbId(), InspectionForecastBarnyard.class);
        this.log.info("Deleting InspectionForecastBarnyard [" + forecastBarnyard.toString() + "] by principal[" + getLoggedUser() + "]");
        dataModel.deleteDataModel(forecastBarnyard, getLoggedUser());
        response.setError(new Error("0", "SUCCESS", "proxy.InspectionForecastBarnyard.Delete"));
      }
    } catch (Exception e) {
      this.log.severe("Exception found while deleting InspectionForecastBarnyard");
      this.log.throwing(this.getClass().getName(), "Delete", e);

      response.setError(new Error("DEL01",
          "Error al intentar borrar datos, es probable que esta entidad tenga otras entidades relacionadas, ",
          "proxy.InspectionForecastBarnyard.Delete"));
    }

    this.log.exiting(this.getClass().getCanonicalName(), "Delete");
    return response;
  }

}
