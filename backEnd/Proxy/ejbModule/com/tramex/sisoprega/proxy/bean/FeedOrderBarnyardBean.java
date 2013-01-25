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
import com.tramex.sisoprega.dto.FeedOrderBarnyard;

/**
 * This proxy knows the logic to evaluate Feed Order Barnyard information and
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
 * 12/09/2012  Jaime Figueroa                Initial Version.
 * 12/09/2012  Diego Torres                  Set read functionality
 * 12/16/2012  Diego Torres                  Adding log activity
 * 12/16/2012  Alfredo Pacheco				 Changed filter FEED_ORDER_FOR_BARNYARD_BY_RECEPTION_ID 
 *                                           to FEED_ORDER_FOR_BARNYARD_BY_ORDER_ID
 * 01/22/2013  Diego Torres                  Implementing DataModel.
 * ====================================================================================
 * </PRE>
 * 
 * @author Jaime Figueroa
 * 
 */
@Stateless
public class FeedOrderBarnyardBean extends BaseBean implements Cruddable {

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
    FeedOrderBarnyard feedOrdBarn = null;
    try {
      feedOrdBarn = entityFromRequest(request, FeedOrderBarnyard.class);

      this.log.fine("Received FeedOrderBarnyard in request: " + feedOrdBarn);

      if (validateEntity(feedOrdBarn)) {
        this.log.finer("FeedOrderBarnyard succesfully validated");
        dataModel.createDataModel(feedOrdBarn);

        String sId = String.valueOf(feedOrdBarn.getFeedOrdBarnId());
        this.log.finer("Setting FeedOrderBarnyard id in response: " + sId);
        response.setGeneratedId(sId);
        response.setError(new Error("0", "SUCCESS", "proxy.FeedOrderBarnyardBean.Create"));
        this.log.info("Feed Order Barnyard [" + feedOrdBarn.toString() + "] created by principal[" + getLoggedUser() + "]");
      } else {
        this.log.warning("Error de validación: " + error_description);
        response.setError(new Error("VAL01", "Error de validación: " + error_description, "proxy.FeedOrderBarnyardBean.Create"));
      }

    } catch (Exception e) {
      this.log.severe("Exception found while creating FeedOrderBarnyardBean");
      this.log.throwing(this.getClass().getName(), "Create", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01",
            "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, ",
            "proxy.FeedOrderBarnyardBean.Create"));
      else {
        response.setError(new Error("DB02", "Create exception: " + e.getMessage(), "proxy.FeedOrderBarnyardBean.Create"));
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

    FeedOrderBarnyard order = null;
    try {
      order = entityFromRequest(request, FeedOrderBarnyard.class);
      this.log.fine("Got Feed Order Barnyard from request: " + order);

      String qryLogger = "";
      String queryName = "";
      Map<String, Object> parameters = new HashMap<String, Object>();
      if (order.getFeedOrdBarnId() != 0) {
        queryName = "CAT_FEEDORDERBARNYARD_BY_ID";
        parameters.put("feedOrdBarnId", order.getOrderId());
        qryLogger = "By feedOrdBarnId [" + order.getFeedOrdBarnId() + "]";
      } else if (order.getOrderId() != 0) {
        queryName = "FEED_ORDER_FOR_BARNYARD_BY_ORDER_ID";
        parameters.put("orderId", order.getOrderId());  
        qryLogger = "By orderId [" + order.getOrderId() + "]";
      } else {
        response.setError(new Error("VAL03", "El filtro especificado no es válido para las órdenes de alimento",
            "proxy.FeedOrderBarnyardDetail.Read"));
        return response;
      }

      // Query the results through the jpa using a typedQuery
      List<FeedOrderBarnyard> queryResults = dataModel.readDataModelList(queryName, parameters, FeedOrderBarnyard.class);

      if (queryResults.isEmpty()) {
        response.setError(new Error("VAL02", "No se encontraron datos para el filtro seleccionado",
            "proxy.FeedOrderBarnyardBean.Read"));
      } else {
        // Add query results to response
        response.getRecord().addAll(contentFromList(queryResults, FeedOrderBarnyard.class));

        // Add success message to response
        response.setError(new Error("0", "SUCCESS", "proxy.FeedOrderBarnyard.Read"));
        this.log.info("Read operation " + qryLogger + " executed by principal[" + getLoggedUser() + "] on FeedOrderBarnyardBean");
      }
    } catch (Exception e) {
      // something went wrong, alert the server and respond the client
      this.log.severe("Exception found while reading feed order");
      this.log.throwing(this.getClass().getCanonicalName(), "Read", e);

      response.setError(new Error("DB02", "Read exception: " + e.getMessage(), "proxy.FeedOrderBarnyardBean.Read"));
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
    FeedOrderBarnyard feedOrdBarn = null;
    try {
      feedOrdBarn = entityFromRequest(request, FeedOrderBarnyard.class);

      if (feedOrdBarn.getFeedOrdBarnId() == 0) {
        this.log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id del corral al intentar actualizar sus datos.",
            "proxy.FeedOrderBarnyard.Update"));
      } else {
        if (validateEntity(feedOrdBarn)) {
          dataModel.updateDataModel(feedOrdBarn);

          GatewayContent content = getContentFromEntity(feedOrdBarn, FeedOrderBarnyard.class);
          response.setUpdatedRecord(content);

          response.setError(new Error("0", "SUCCESS", "proxy.FeedOrderBarnyard.Update"));
          this.log.info("FeddOrderBarnyard[" + feedOrdBarn.toString() + "] updated by principal[" + getLoggedUser() + "]");
        } else {
          this.log.warning("Validation error:" + error_description);
          response.setError(new Error("VAL01", "Error de validación de datos:" + error_description,
              "proxy.FeedOrderBarnyardBean.Update"));
        }
      }

    } catch (Exception e) {
      this.log.severe("Exception found while updating FeedOrderBarnyard");
      this.log.throwing(this.getClass().getName(), "Update", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01",
            "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, ",
            "proxy.FeedOrderBarnyardBean.Update"));
      else {
        response.setError(new Error("DB02", "Error en la base de datos:[" + e.getMessage() + "]",
            "proxy.FeedOrderBarnyardBean.Update"));
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
      FeedOrderBarnyard feedOrdBarn = entityFromRequest(request, FeedOrderBarnyard.class);
      if (feedOrdBarn.getFeedOrdBarnId() == 0) {
        this.log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id al intentar eliminar el registro.",
            "proxy.FeedOrderBarnyard.Delete"));
      } else {
        feedOrdBarn = dataModel.readSingleDataModel("CAT_FEEDORDERBARNYARD_BY_ID", "feedOrdBarnId", feedOrdBarn.getFeedOrdBarnId(), FeedOrderBarnyard.class);
        this.log.info("Deleting FeedOrderBarnyard [" + feedOrdBarn.toString() + "] by principal[" + getLoggedUser() + "]");
        dataModel.deleteDataModel(feedOrdBarn, getLoggedUser());

        response.setError(new Error("0", "SUCCESS", "proxy.FeedOrderBarnyard.Delete"));
        this.log.info("Feed Order Barnyard successfully deleted by principal [" + getLoggedUser() + "]");
      }
    } catch (Exception e) {
      this.log.severe("Exception found while deleting FeedOrderBarnyard");
      this.log.throwing(this.getClass().getName(), "Delete", e);

      response.setError(new Error("DEL01",
          "Error al intentar borrar datos, es probable que esta entidad tenga otras entidades relacionadas, ",
          "proxy.FeedOrderBarnyard.Delete"));
    }

    this.log.exiting(this.getClass().getCanonicalName(), "Delete");
    return response;
  }

}
