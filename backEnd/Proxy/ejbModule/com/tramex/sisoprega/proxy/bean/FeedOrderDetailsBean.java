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
import com.tramex.sisoprega.dto.FeedOrderDetails;

/**
 * This proxy knows the logic to evaluate Feed Order Details information and the
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
 * 12/08/2012  Jaime Figueroa                Initial Version.
 * 12/16/2012  Diego Torres                  Adding log activity
 * 01/22/2013  Diego Torres                  Implementing DataModel.
 * ====================================================================================
 * </PRE>
 * @author Jaime Figueroa
 * 
 */
@Stateless
public class FeedOrderDetailsBean extends BaseBean implements Cruddable {

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
    FeedOrderDetails feedOrdDeta = null;
    try {
      feedOrdDeta = entityFromRequest(request, FeedOrderDetails.class);

      this.log.fine("Received FeedOrderDetails in request: " + feedOrdDeta);

      if (validateEntity(feedOrdDeta)) {
        this.log.finer("FeedOrderDetails succesfully validated");
        dataModel.createDataModel(feedOrdDeta);

        String sId = String.valueOf(feedOrdDeta.getFodId());
        this.log.finer("Setting FeedOrderDetails id in response: " + sId);
        response.setGeneratedId(sId);
        response.setError(new Error("0", "SUCCESS", "proxy.FeedOrderDetailsBean.Create"));
        this.log.info("Feed Order Detail [" + feedOrdDeta.toString() + "] created by principal[" + getLoggedUser() + "]");
      } else {
        this.log.warning("Error de validaci�n: " + error_description);
        response.setError(new Error("VAL01", "Error de validaci�n: " + error_description, "proxy.FeedOrderDetailsBean.Create"));
      }

    } catch (Exception e) {
      this.log.severe("Exception found while creating FeedOrderDetailsBean");
      this.log.throwing(this.getClass().getName(), "Create", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01",
            "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, ",
            "proxy.FeedOrderDetailsBean.Create"));
      else {
        response.setError(new Error("DB02", "Create exception: " + e.getMessage(), "proxy.FeedOrderDetailsBean.Create"));
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

    FeedOrderDetails order = null;
    try {
      order = entityFromRequest(request, FeedOrderDetails.class);
      this.log.fine("Got Feed Order Details from request: " + order);

      String qryLogger = "";
      String queryName = "";
      Map<String, Object> parameters = new HashMap<String, Object>();
      if (order.getFodId() != 0) {
        queryName = "CRT_FEEDORDERDETAILS_BY_ID";
        parameters.put("fodId", order.getFodId());
        qryLogger = "By fodId [" + order.getFodId() + "]";
      } else if (order.getOrderId() != 0) {
        queryName = "FOD_BY_ORDER_ID";
        parameters.put("orderId", order.getOrderId());
        qryLogger = "By orderId [" + order.getOrderId() + "]";
      } else {
        response.setError(new Error("VAL03", "El filtro especificado no es v�lido para las �rdenes de alimento",
            "proxy.FeedOrderDetailsDetail.Read"));
        return response;
      }

      // Query the results through the jpa using a typedQuery
      List<FeedOrderDetails> queryResults = dataModel.readDataModelList(queryName, parameters, FeedOrderDetails.class);

      if (queryResults.isEmpty()) {
        response.setError(new Error("VAL02", "No se encontraron datos para el filtro seleccionado", "proxy.FeedOrderDetailsBean.Read"));
      } else {
        // Add query results to response
        response.getRecord().addAll(contentFromList(queryResults, FeedOrderDetails.class));

        // Add success message to response
        response.setError(new Error("0", "SUCCESS", "proxy.FeedOrderDetails.Read"));
        this.log.info("Read operation " + qryLogger + " executed by principal[" + getLoggedUser() + "] on FeedOrderDetailsBean");
      }
    } catch (Exception e) {
      // something went wrong, alert the server and respond the client
      this.log.severe("Exception found while reading feed order");
      this.log.throwing(this.getClass().getCanonicalName(), "Read", e);

      response.setError(new Error("DB02", "Read exception: " + e.getMessage(), "proxy.FeedOrderDetailsBean.Read"));
    }

    // end and respond.
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
    FeedOrderDetails feedOrdDeta = null;
    try {
      feedOrdDeta = entityFromRequest(request, FeedOrderDetails.class);

      if (feedOrdDeta.getFodId() == 0) {
        this.log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id del corral al intentar actualizar sus datos.",
            "proxy.FeedOrderDetails.Update"));
      } else {
        if (validateEntity(feedOrdDeta)) {
          dataModel.updateDataModel(feedOrdDeta);

          GatewayContent content = getContentFromEntity(feedOrdDeta, FeedOrderDetails.class);
          response.setUpdatedRecord(content);

          response.setError(new Error("0", "SUCCESS", "proxy.FeedOrderDetails.Update"));
          this.log.info("FeedOrderDetails[" + feedOrdDeta.toString() + "] updated by principal[" + getLoggedUser() + "]");
        } else {
          this.log.warning("Validation error:" + error_description);
          response.setError(new Error("VAL01", "Error de validaci�n de datos:" + error_description,
              "proxy.FeedOrderDetailsBean.Update"));
        }
      }

    } catch (Exception e) {
      this.log.severe("Exception found while updating FeedOrderDetails");
      this.log.throwing(this.getClass().getName(), "Update", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01",
            "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, ",
            "proxy.FeedOrderDetailsBean.Update"));
      else {
        response.setError(new Error("DB02", "Error en la base de datos:[" + e.getMessage() + "]",
            "proxy.FeedOrderDetailsBean.Update"));
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
      FeedOrderDetails details = entityFromRequest(request, FeedOrderDetails.class);
      if (details.getFodId() == 0) {
        this.log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id del corral al intentar eliminar el registro.",
            "proxy.FeedOrderDetails.Delete"));
      } else {
        
        details = dataModel.readSingleDataModel("CRT_FEEDORDERDETAILS_BY_ID", "foodId", details.getFoodId(), FeedOrderDetails.class);
        this.log.info("Deleting FeedOrderDetails [" + details.toString() + "] by principal[" + getLoggedUser() + "]");
        dataModel.deleteDataModel(details, getLoggedUser());
        response.setError(new Error("0", "SUCCESS", "proxy.FeedOrderDetails.Delete"));
      }
    } catch (Exception e) {
      this.log.severe("Exception found while deleting feedOrdDeta");
      this.log.throwing(this.getClass().getName(), "Delete", e);

      response.setError(new Error("DEL01",
          "Error al intentar borrar datos, es probable que esta entidad tenga otras entidades relacionadas, ",
          "proxy.FeedOrderDetails.Delete"));
    }

    this.log.exiting(this.getClass().getCanonicalName(), "Delete");
    return response;
  }

}
