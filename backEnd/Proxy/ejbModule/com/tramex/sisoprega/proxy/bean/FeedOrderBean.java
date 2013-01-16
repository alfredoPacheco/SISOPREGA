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
import com.tramex.sisoprega.dto.FeedOrder;

/**
 * This proxy knows the logic to evaluate Feed Order information and the way to
 * the database in order to save their data. Also, it is contained in EJB
 * container, we can apply security and life cycle methods for resources.<BR/>
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 12/08/2012  Jaime Figueroa                 Initial Version.
 * 12/09/2012  Diego Torres                   Add standard error codes and validation.
 * 12/16/2012  Diego Torres                   Adding log activity
 * 12/17/2012  Diego Torres                   Setting originator from logged user on create operation.
 * ====================================================================================
 * </PRE>
 * 
 * @author Jaime Figueroa
 * 
 */
@Stateless
public class FeedOrderBean extends BaseBean implements Cruddable {

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
    FeedOrder feedOrd = null;
    try {
      feedOrd = entityFromRequest(request, FeedOrder.class);
      feedOrd.setFeedOriginator(getLoggedUser());

      log.fine("Received FeedOrder in request: " + feedOrd);

      if (validateEntity(feedOrd)) {
        log.finer("FeedOrder succesfully validated");
        em.persist(feedOrd);
        log.finer("FeedOrder persisted on database");
        em.flush();

        String sId = String.valueOf(feedOrd.getOrderId());
        log.finer("Setting FeedOrder id in response: " + sId);
        response.setGeneratedId(sId);
        response.setError(new Error("0", "SUCCESS", "proxy.FeedOrderBean.Create"));
        log.info("Feed Order [" + feedOrd.toString() + "] created by principal[" + getLoggedUser() + "]");
      } else {
        log.warning("Error de validación: " + error_description);
        response.setError(new Error("VAL01", "Error de validación: " + error_description, "proxy.FeedOrderBean.Create"));
      }

    } catch (Exception e) {
      log.severe("Exception found while creating FeedOrderBean");
      log.throwing(this.getClass().getName(), "Create", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos",
            "proxy.FeedOrderBean.Create"));
      else {
        response.setError(new Error("DB02", "Create exception: " + e.getMessage(), "proxy.FeedOrderBean.Create"));
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

    FeedOrder order = null;
    try {
      order = entityFromRequest(request, FeedOrder.class);
      log.fine("Got Feed Order from request: " + order);

      TypedQuery<FeedOrder> readQuery = null;
      String qryLogger = "";
      if (order.getOrderId() != 0) {
        readQuery = em.createNamedQuery("CRT_FEEDORDER_BY_ID", FeedOrder.class);
        log.fine("Query by Id: " + order.getOrderId());
        readQuery.setParameter("orderId", order.getOrderId());
        qryLogger = "By orderId [" + order.getOrderId() + "]";
      } else if (order.getReceptionId() != 0) {
        readQuery = em.createNamedQuery("FEEDORDER_BY_RECEPTION_ID", FeedOrder.class);
        log.fine("Query by ReceptionId: " + order.getReceptionId());
        readQuery.setParameter("receptionId", order.getReceptionId());
        qryLogger = "By receptionId [" + order.getReceptionId() + "]";
      } else {
        response.setError(new Error("VAL03", "El filtro especificado no es válido para las órdenes de alimento",
            "proxy.FeedOrderDetail.Read"));
        return response;
      }

      // Query the results through the jpa using a typedQuery
      List<FeedOrder> queryResults = readQuery.getResultList();

      if (queryResults.isEmpty()) {
        response.setError(new Error("VAL02", "No se encontraron datos para el filtro seleccionado", "proxy.FeedOrderBean.Read"));
      } else {
        // Add query results to response
        response.getRecord().addAll(contentFromList(queryResults, FeedOrder.class));

        // Add success message to response
        response.setError(new Error("0", "SUCCESS", "proxy.FeedOrder.Read"));
        log.info("Read operation " + qryLogger + " executed by principal[" + getLoggedUser() + "] on FeedOrderBean");
      }
    } catch (Exception e) {
      // something went wrong, alert the server and respond the client
      log.severe("Exception found while reading feed order");
      log.throwing(this.getClass().getCanonicalName(), "Read", e);

      response.setError(new Error("DB02", "Read exception: " + e.getMessage(), "proxy.FeedOrderBean.Read"));
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
    FeedOrder feedOrd = null;
    try {
      feedOrd = entityFromRequest(request, FeedOrder.class);
      feedOrd.setFeedOriginator(getLoggedUser());
      
      if (feedOrd.getOrderId() == 0) {
        log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id de la orden de alimentación al intentar actualizar sus datos.",
            "proxy.FeedOrder.Update"));
      } else {
        if (validateEntity(feedOrd)) {
          em.merge(feedOrd);
          em.flush();

          GatewayContent content = getContentFromEntity(feedOrd, FeedOrder.class);
          response.setUpdatedRecord(content);

          response.setError(new Error("0", "SUCCESS", "proxy.FeedOrder.Update"));
          log.info("FeedOrder[" + feedOrd.toString() + "] updated by principal[" + getLoggedUser() + "]");
        } else {
          log.warning("Validation error:" + error_description);
          response
              .setError(new Error("VAL01", "Error de validación de datos:" + error_description, "proxy.FeedOrderBean.Update"));
        }
      }

    } catch (Exception e) {
      log.severe("Exception found while updating FeedOrder");
      log.throwing(this.getClass().getName(), "Update", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos",
            "proxy.FeedOrderBean.Update"));
      else {
        response.setError(new Error("DB02", "Error en la base de datos:[" + e.getMessage() + "]", "proxy.FeedOrderBean.Update"));
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
      FeedOrder feedOrd = entityFromRequest(request, FeedOrder.class);
      if (feedOrd.getOrderId() == 0) {
        log.warning("VAL04 - Entity ID Omission.");

        response.setError(new Error("VAL04", "Se ha omitido el id de la orden de alimentación al intentar eliminar el registro.",
            "proxy.FeedOrder.Delete"));
      } else {
        TypedQuery<FeedOrder> readQuery = em.createNamedQuery("CRT_FEEDORDER_BY_ID", FeedOrder.class);
        readQuery.setParameter("orderId", feedOrd.getOrderId());
        feedOrd = readQuery.getSingleResult();
        log.info("Deleting Feed Order [" + feedOrd.toString() + "] by principal[" + getLoggedUser() + "]");
        em.merge(feedOrd);
        em.remove(feedOrd);
        em.flush();

        response.setError(new Error("0", "SUCCESS", "proxy.FeedOrder.Delete"));
        log.info("Feed Order successfully deleted by principal [" + getLoggedUser() + "]");
      }
    } catch (Exception e) {
      log.severe("Exception found while deleting FeedOrder");
      log.throwing(this.getClass().getName(), "Delete", e);

      response.setError(new Error("DEL01",
          "Error al intentar borrar datos, es probable que esta entidad tenga otras entidades relacionadas",
          "proxy.FeedOrder.Delete"));
    }

    log.exiting(this.getClass().getCanonicalName(), "Delete");
    return response;
  }
}
