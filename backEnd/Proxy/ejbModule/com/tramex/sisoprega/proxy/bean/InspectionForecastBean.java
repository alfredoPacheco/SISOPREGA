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

import com.tramex.sisoprega.common.BaseResponse;
import com.tramex.sisoprega.common.CreateGatewayResponse;
import com.tramex.sisoprega.common.Error;
import com.tramex.sisoprega.common.GatewayRequest;
import com.tramex.sisoprega.common.ReadGatewayResponse;
import com.tramex.sisoprega.common.UpdateGatewayResponse;
import com.tramex.sisoprega.common.crud.Cruddable;
import com.tramex.sisoprega.dto.InspectionForecast;

/**
 * This proxy knows the logic to evaluate Inspection Forecast information and
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
 * 01/12/2013  Diego Torres              Initial Version.
 * 01/22/2013  Diego Torres                  Implementing DataModel.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 */
@Stateless
public class InspectionForecastBean extends BaseBean implements Cruddable {

  /* (non-Javadoc)
   * @see com.tramex.sisoprega.common.crud.Cruddable#Create(com.tramex.sisoprega.common.GatewayRequest)
   */
  @Override
  public CreateGatewayResponse Create(GatewayRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "Create");

    CreateGatewayResponse response = new CreateGatewayResponse();
    InspectionForecast forecast = null;
    try {
      forecast = entityFromRequest(request, InspectionForecast.class);

      this.log.fine("Received InspectionForecast in request: " + forecast);

      if (validateEntity(forecast)) {
        this.log.finer("InspectionForecast succesfully validated");
        dataModel.createDataModel(forecast);

        String sId = String.valueOf(forecast.getForecastId());
        this.log.finer("Setting InspectionForecast id in response: " + sId);
        response.setGeneratedId(sId);
        response.setError(new Error("0", "SUCCESS", "proxy.InspectionForecastBean.Create"));
        this.log.info("Reception inspectionForecast [" + forecast.toString() + "] created by principal[" + getLoggedUser() + "]");
      } else {
        this.log.warning("Error de validación: " + error_description);
        response.setError(new Error("VAL01", "Error de validación: " + error_description, "proxy.InspectionForecastBean.Create"));
      }

    } catch (Exception e) {
      this.log.severe("Exception found while creating InspectionForecastBean");
      this.log.throwing(this.getClass().getName(), "Create", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01",
            "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos",
            "proxy.InspectionForecastBean.Create"));
      else {
        response.setError(new Error("DB02", "Create exception: " + e.getMessage(), "proxy.InspectionForecastBean.Create"));
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

    InspectionForecast forecast = null;
    try {
      forecast = entityFromRequest(request, InspectionForecast.class);

      this.log.fine("Got inspection forecast query from request: " + forecast);

      String queryName = "TODAY_INSPECTION_FORECAST";
      String qryLogger = "By TODAY_INSPECTION_FORECAST";

      List<InspectionForecast> queryResults = dataModel.readDataModelList(queryName, null, InspectionForecast.class);

      if (queryResults.isEmpty()) {
        response.setError(new Error("VAL02", "No se encontraron datos para el filtro seleccionado", "proxy.InspectionDetails.Read"));
      } else {
        response.getRecord().addAll(contentFromList(queryResults, InspectionForecast.class));

        response.setError(new Error("0", "SUCCESS", "proxy.InspectionForecast.Read"));
        this.log.info("Read operation " + qryLogger + " executed by principal[" + getLoggedUser() + "] on InspectionForecastBean");
      }
    } catch (Exception e) {
      this.log.severe("Exception found while reading inspection forecast filter");
      this.log.throwing(this.getClass().getCanonicalName(), "Read", e);

      response.setError(new Error("DB02", "Error en la base de datos: " + e.getMessage(), "proxy.InspectionForecast.Read"));
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
    response.setError(new Error("VAL01", "La actualización no es permitida para la lista de inspección", "proxy.InspectionForecastBean.Update"));

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
    response.setError(new Error("VAL04", "Borrado no permitido en la lista de inspección.", "proxy.InspectionDetails.Delete"));
    return response;
  }
}
