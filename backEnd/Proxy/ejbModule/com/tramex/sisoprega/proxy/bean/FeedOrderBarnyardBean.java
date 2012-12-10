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

import javax.persistence.TypedQuery;

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
 * ====================================================================================
 * </PRE>
 * 
 * @author Jaime Figueroa
 * 
 */
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
    log.entering(this.getClass().getCanonicalName(), "Create");

    CreateGatewayResponse response = new CreateGatewayResponse();
    FeedOrderBarnyard feedOrdBarn = null;
    try {
      feedOrdBarn = entityFromRequest(request, FeedOrderBarnyard.class);

      log.fine("Received FeedOrderBarnyard in request: " + feedOrdBarn);

      if (validateEntity(feedOrdBarn)) {
        log.finer("FeedOrderBarnyard succesfully validated");
        em.persist(feedOrdBarn);
        log.finer("FeedOrderBarnyard persisted on database");
        em.flush();

        String sId = String.valueOf(feedOrdBarn.getFeedOrdBarnId());
        log.finer("Setting FeedOrderBarnyard id in response: " + sId);
        response.setGeneratedId(sId);
        response.setError(new Error("0", "SUCCESS", "proxy.FeedOrderBarnyardBean.Create"));
      } else {
        log.warning("Error de validaci�n: " + error_description);
        response.setError(new Error("VAL01", "Error de validaci�n: " + error_description, "proxy.FeedOrderBarnyardBean.Create"));
      }

    } catch (Exception e) {
      log.severe("Exception found while creating FeedOrderBarnyardBean");
      log.throwing(this.getClass().getName(), "Create", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01",
            "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, ",
            "proxy.FeedOrderBarnyardBean.Create"));
      else {
        response.setError(new Error("DB02", "Create exception: " + e.getMessage(), "proxy.FeedOrderBarnyardBean.Create"));
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
    // TODO Auto-generated method stub
    return null;
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
    FeedOrderBarnyard feedOrdBarn = null;
    try {
      feedOrdBarn = entityFromRequest(request, FeedOrderBarnyard.class);

      if (feedOrdBarn.getOrderId() == 0) {
        log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id del corral al intentar actualizar sus datos.",
            "proxy.FeedOrderBarnyard.Update"));
      } else {
        if (validateEntity(feedOrdBarn)) {
          em.merge(feedOrdBarn);
          em.flush();

          GatewayContent content = getContentFromEntity(feedOrdBarn, FeedOrderBarnyard.class);
          response.setUpdatedRecord(content);

          response.setError(new Error("0", "SUCCESS", "proxy.FeedOrderBarnyard.Update"));
        } else {
          log.warning("Validation error:" + error_description);
          response.setError(new Error("VAL01", "Error de validaci�n de datos:" + error_description,
              "proxy.FeedOrderBarnyardBean.Update"));
        }
      }

    } catch (Exception e) {
      log.severe("Exception found while updating FeedOrderBarnyard");
      log.throwing(this.getClass().getName(), "Update", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01",
            "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, ",
            "proxy.FeedOrderBarnyardBean.Update"));
      else {
        response.setError(new Error("DB02", "Error en la base de datos:[" + e.getMessage() + "]",
            "proxy.FeedOrderBarnyardBean.Update"));
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
      FeedOrderBarnyard feedOrdBarn = entityFromRequest(request, FeedOrderBarnyard.class);
      if (feedOrdBarn.getFeedOrdBarnId() == 0) {
        log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id al intentar eliminar el registro.",
            "proxy.FeedOrderBarnyard.Delete"));
      } else {
        TypedQuery<FeedOrderBarnyard> readQuery = em.createNamedQuery("CAT_FEEDORDERBARNYARD_BY_ID", FeedOrderBarnyard.class);
        readQuery.setParameter("feedOrdBarnId", feedOrdBarn.getFeedOrdBarnId());
        feedOrdBarn = readQuery.getSingleResult();
        em.merge(feedOrdBarn);
        em.remove(feedOrdBarn);
        em.flush();

        response.setError(new Error("0", "SUCCESS", "proxy.FeedOrderBarnyard.Delete"));
      }
    } catch (Exception e) {
      log.severe("Exception found while deleting FeedOrderBarnyard");
      log.throwing(this.getClass().getName(), "Delete", e);

      response.setError(new Error("DEL01",
          "Error al intentar borrar datos, es probable que esta entidad tenga otras entidades relacionadas, ",
          "proxy.FeedOrderBarnyard.Delete"));
    }

    log.exiting(this.getClass().getCanonicalName(), "Delete");
    return response;
  }

}
