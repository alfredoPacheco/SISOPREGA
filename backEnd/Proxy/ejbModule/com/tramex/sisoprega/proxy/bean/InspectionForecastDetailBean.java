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
 * 01/22/2013  Diego Torres                  Implementing DataModel.
 * 01/22/2013  Alfredo Pacheco				 Returning fdId instead forecastId when creating this.
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
    this.log.entering(this.getClass().getCanonicalName(), "Create");

    CreateGatewayResponse response = new CreateGatewayResponse();
    InspectionForecastDetail forecastDetail = null;
    try {
      forecastDetail = entityFromRequest(request, InspectionForecastDetail.class);

      this.log.fine("Received InspectionForecastDetail in request: " + forecastDetail);

      if (validateEntity(forecastDetail)) {
        this.log.finer("InspectionForecastDetail succesfully validated");
        dataModel.createDataModel(forecastDetail);

        String sId = String.valueOf(forecastDetail.getFdId());
        log.finer("Setting InspectionForecastDetail id in response: " + sId);
		
        response.setGeneratedId(sId);
        response.setError(new Error("0", "SUCCESS", "proxy.InspectionForecastDetailBean.Create"));
        this.log.info("Reception inspectionForecastDetail [" + forecastDetail.toString() + "] created by principal[" + getLoggedUser() + "]");
      } else {
        this.log.warning("Error de validación: " + error_description);
        response.setError(new Error("VAL01", "Error de validación: " + error_description, "proxy.InspectionForecastDetailBean.Create"));
      }

    } catch (Exception e) {
      this.log.severe("Exception found while creating InspectionForecastDetailBean");
      this.log.throwing(this.getClass().getName(), "Create", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01",
            "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos",
            "proxy.InspectionForecastDetailBean.Create"));
      else {
        response.setError(new Error("DB02", "Create exception: " + e.getMessage(), "proxy.InspectionForecastDetailBean.Create"));
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

    InspectionForecastDetail forecastDetail = null;
    try {
      forecastDetail = entityFromRequest(request, InspectionForecastDetail.class);

      this.log.fine("Got inspectionDetails query from request: " + forecastDetail);

      String qryLogger = "";
      String queryName = "";
      Map<String, Object> parameters = new HashMap<String, Object>();
      if (forecastDetail.getFdId() != 0) {
        queryName = "FORECAST_DETAIL_BY_ID";
        parameters.put("fdId", forecastDetail.getFdId());
        qryLogger = "By forecastDetailsId [" + forecastDetail.getFdId() + "]";
      } else if(forecastDetail.getForecastId() != 0 ){
        queryName = "FORECAST_DETAIL_BY_FORECAST_ID";
        parameters.put("forecastId", forecastDetail.getForecastId());
        qryLogger = "By forecastId [" + forecastDetail.getForecastId() + "]";
      } else {
        response.setError(new Error("VAL03", "El filtro especificado no es válido para detalles de la lista de inspección de ganado.",
            "proxy.InspectionForecastDetail.Read"));
        return response;
      }

      List<InspectionForecastDetail> queryResults = dataModel.readDataModelList(queryName, parameters, InspectionForecastDetail.class);

      if (queryResults.isEmpty()) {
        response.setError(new Error("VAL02", "No se encontraron datos para el filtro seleccionado", "proxy.InspectionDetails.Read"));
      } else {
        response.getRecord().addAll(contentFromList(queryResults, InspectionForecastDetail.class));

        response.setError(new Error("0", "SUCCESS", "proxy.InspectionForecastDetail.Read"));
        this.log.info("Read operation " + qryLogger + " executed by principal[" + getLoggedUser() + "] on InspectionForecastDetailBean");
      }
    } catch (Exception e) {
      this.log.severe("Exception found while reading inspection forecast details filter");
      this.log.throwing(this.getClass().getCanonicalName(), "Read", e);

      response.setError(new Error("DB02", "Error en la base de datos: " + e.getMessage(), "proxy.InspectionForecastDetail.Read"));
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
    InspectionForecastDetail forecastDetails = null;
    try {
      forecastDetails = entityFromRequest(request, InspectionForecastDetail.class);

      if (forecastDetails.getFdId() == 0) {
        this.log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id del registro al intentar actualizar sus datos.",
            "proxy.InspectionForecastDetails.Update"));
      } else {
        if (validateEntity(forecastDetails)) {
          dataModel.updateDataModel(forecastDetails);

          GatewayContent content = getContentFromEntity(forecastDetails, InspectionForecastDetail.class);
          response.setUpdatedRecord(content);

          response.setError(new Error("0", "SUCCESS", "proxy.InspectionForecastDetails.Update"));
          this.log.info("Forecast inspection Details [" + forecastDetails.toString() + "] updated by principal[" + getLoggedUser() + "]");
        } else {
          this.log.warning("Validation error:" + error_description);
          response.setError(new Error("VAL01", "Error de validación de datos:" + error_description, "proxy.InspectionForecastDetailBean.Update"));
        }
      }

    } catch (Exception e) {
      this.log.severe("Exception found while updating InspectionDetails");
      this.log.throwing(this.getClass().getName(), "Update", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, ",
            "proxy.InspectionDetailsBean.Update"));
      else {
        response.setError(new Error("DB02", "Error en la base de datos:[" + e.getMessage() + "]", "proxy.InspectionDetailsBean.Update"));
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
      InspectionForecastDetail forecastDetail = entityFromRequest(request, InspectionForecastDetail.class);
      if (forecastDetail.getFdId() == 0) {
        this.log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id de detalles de inspeccion al intentar eliminar el registro.", "proxy.InspectionDetails.Delete"));
      } else {
        
        forecastDetail = dataModel.readSingleDataModel("FORECAST_DETAIL_BY_ID", "fdId", forecastDetail.getFdId(), InspectionForecastDetail.class);
        this.log.info("Deleting InspectionForecastDetail [" + forecastDetail.toString() + "] by principal[" + getLoggedUser() + "]");
        dataModel.deleteDataModel(forecastDetail, getLoggedUser());
        response.setError(new Error("0", "SUCCESS", "proxy.InspectionForecastDetail.Delete"));
      }
    } catch (Exception e) {
      this.log.severe("Exception found while deleting InspectionDetails");
      this.log.throwing(this.getClass().getName(), "Delete", e);

      response.setError(new Error("DEL01",
          "Error al intentar borrar datos, es probable que esta entidad tenga otras entidades relacionadas, ",
          "proxy.InspectionForecastDetails.Delete"));
    }

    this.log.exiting(this.getClass().getCanonicalName(), "Delete");
    return response;
  }

}
