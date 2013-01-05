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
 * 01/04/2013  Alfredo Pacheco				 Update by orderId and foodId added
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
    log.entering(this.getClass().getCanonicalName(), "Create");

    CreateGatewayResponse response = new CreateGatewayResponse();
    FeedOrderDetails feedOrdDeta = null;
    try {
      feedOrdDeta = entityFromRequest(request, FeedOrderDetails.class);

      log.fine("Received FeedOrderDetails in request: " + feedOrdDeta);

      if (validateEntity(feedOrdDeta)) {
        log.finer("FeedOrderDetails succesfully validated");
        em.persist(feedOrdDeta);
        log.finer("FeedOrderDetails persisted on database");
        em.flush();

        String sId = String.valueOf(feedOrdDeta.getFodId());
        log.finer("Setting FeedOrderDetails id in response: " + sId);
        response.setGeneratedId(sId);
        response.setError(new Error("0", "SUCCESS", "proxy.FeedOrderDetailsBean.Create"));
        log.info("Feed Order Detail [" + feedOrdDeta.toString() + "] created by principal[" + getLoggedUser() + "]");
      } else {
        log.warning("Error de validación: " + error_description);
        response.setError(new Error("VAL01", "Error de validación: " + error_description, "proxy.FeedOrderDetailsBean.Create"));
      }

    } catch (Exception e) {
      log.severe("Exception found while creating FeedOrderDetailsBean");
      log.throwing(this.getClass().getName(), "Create", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01",
            "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, ",
            "proxy.FeedOrderDetailsBean.Create"));
      else {
        response.setError(new Error("DB02", "Create exception: " + e.getMessage(), "proxy.FeedOrderDetailsBean.Create"));
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

    FeedOrderDetails order = null;
    try {
      order = entityFromRequest(request, FeedOrderDetails.class);
      log.fine("Got Feed Order Details from request: " + order);

      TypedQuery<FeedOrderDetails> readQuery = null;
      String qryLogger = "";
      if (order.getFodId() != 0) {
        readQuery = em.createNamedQuery("CRT_FEEDORDERDETAILS_BY_ID", FeedOrderDetails.class);
        log.fine("Query by Id: " + order.getFodId());
        readQuery.setParameter("fodId", order.getFodId());
        qryLogger = "By fodId [" + order.getFodId() + "]";
      } else if (order.getOrderId() != 0) {
        readQuery = em.createNamedQuery("FOD_BY_ORDER_ID", FeedOrderDetails.class);
        log.fine("Query by OrderId: " + order.getOrderId());
        readQuery.setParameter("orderId", order.getOrderId());
        qryLogger = "By orderId [" + order.getOrderId() + "]";
      } else {
        response.setError(new Error("VAL03", "El filtro especificado no es válido para las órdenes de alimento",
            "proxy.FeedOrderDetailsDetail.Read"));
        return response;
      }

      // Query the results through the jpa using a typedQuery
      List<FeedOrderDetails> queryResults = readQuery.getResultList();

      if (queryResults.isEmpty()) {
        response.setError(new Error("VAL02", "No se encontraron datos para el filtro seleccionado", "proxy.FeedOrderDetailsBean.Read"));
      } else {
        // Add query results to response
        response.getRecord().addAll(contentFromList(queryResults, FeedOrderDetails.class));

        // Add success message to response
        response.setError(new Error("0", "SUCCESS", "proxy.FeedOrderDetails.Read"));
        log.info("Read operation " + qryLogger + " executed by principal[" + getLoggedUser() + "] on FeedOrderDetailsBean");
      }
    } catch (Exception e) {
      // something went wrong, alert the server and respond the client
      log.severe("Exception found while reading feed order");
      log.throwing(this.getClass().getCanonicalName(), "Read", e);

      response.setError(new Error("DB02", "Read exception: " + e.getMessage(), "proxy.FeedOrderDetailsBean.Read"));
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
    FeedOrderDetails feedOrdDeta = null;
    try {
      feedOrdDeta = entityFromRequest(request, FeedOrderDetails.class);

      if(feedOrdDeta.getOrderId()!=0 && feedOrdDeta.getFoodId()!=0){
          TypedQuery<FeedOrderDetails> readQuery = em.createNamedQuery("FEED_ORDER_DETAILS_BY_ORDER_ID_AND_FOOD_ID", FeedOrderDetails.class);
          readQuery.setParameter("order_id", feedOrdDeta.getOrderId());
          readQuery.setParameter("food_id", feedOrdDeta.getFoodId());
          feedOrdDeta = readQuery.getSingleResult();
          log.info("Updating Feed Order Details [" + feedOrdDeta.toString() + "] by orderId and foodId[" + getLoggedUser() + "]");
          em.merge(feedOrdDeta);          
          em.flush();

          response.setError(new Error("0", "SUCCESS", "proxy.FeedOrderDetails.Update"));
          log.info("FeedOrderDetails[" + feedOrdDeta.toString() + "] updated by orderId and foodId [" + getLoggedUser() + "]");
        }
       	else if (feedOrdDeta.getFodId() == 0) {
           log.warning("VAL04 - Entity ID Omission.");
           response.setError(new Error("VAL04", "Se ha omitido el id del corral al intentar actualizar sus datos.",
               "proxy.FeedOrderDetails.Update"));        
         }else {
        if (validateEntity(feedOrdDeta)) {
          em.merge(feedOrdDeta);         
          em.flush();

          GatewayContent content = getContentFromEntity(feedOrdDeta, FeedOrderDetails.class);
          response.setUpdatedRecord(content);

          response.setError(new Error("0", "SUCCESS", "proxy.FeedOrderDetails.Update"));
          log.info("FeedOrderDetails[" + feedOrdDeta.toString() + "] updated by principal[" + getLoggedUser() + "]");
        } else {
          log.warning("Validation error:" + error_description);
          response.setError(new Error("VAL01", "Error de validación de datos:" + error_description,
              "proxy.FeedOrderDetailsBean.Update"));
        }
      }

    } catch (Exception e) {
      log.severe("Exception found while updating FeedOrderDetails");
      log.throwing(this.getClass().getName(), "Update", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01",
            "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, ",
            "proxy.FeedOrderDetailsBean.Update"));
      else {
        response.setError(new Error("DB02", "Error en la base de datos:[" + e.getMessage() + "]",
            "proxy.FeedOrderDetailsBean.Update"));
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
      FeedOrderDetails details = entityFromRequest(request, FeedOrderDetails.class);
      if (details.getFodId() == 0) {
        log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id del corral al intentar eliminar el registro.",
            "proxy.FeedOrderDetails.Delete"));
      } else {
        TypedQuery<FeedOrderDetails> readQuery = em.createNamedQuery("CRT_FEEDORDERDETAILS_BY_ID", FeedOrderDetails.class);
        readQuery.setParameter("fodId", details.getFodId());
        details = readQuery.getSingleResult();
        log.info("Deleting Feed Order Details [" + details.toString() + "] by principal[" + getLoggedUser() + "]");
        em.merge(details);
        em.remove(details);
        em.flush();

        response.setError(new Error("0", "SUCCESS", "proxy.FeedOrderDetails.Delete"));
        log.info("Feed Order Details successfully deleted by principal [" + getLoggedUser() + "]");
      }
    } catch (Exception e) {
      log.severe("Exception found while deleting feedOrdDeta");
      log.throwing(this.getClass().getName(), "Delete", e);

      response.setError(new Error("DEL01",
          "Error al intentar borrar datos, es probable que esta entidad tenga otras entidades relacionadas, ",
          "proxy.FeedOrderDetails.Delete"));
    }

    log.exiting(this.getClass().getCanonicalName(), "Delete");
    return response;
  }

}
