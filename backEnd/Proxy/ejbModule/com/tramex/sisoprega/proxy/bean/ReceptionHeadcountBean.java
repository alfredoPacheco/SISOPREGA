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
import com.tramex.sisoprega.dto.ReceptionHeadcount;

/**
 * * This proxy knows the logic to evaluate Reception Head Count information and
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
 * 12/07/2012   Jaime Figueroa               Initial Version.
 * 12/16/2012   Diego Torres                 Adding log activity
 * ====================================================================================
 * </PRE>
 * 
 * @author Jaime Figueroa
 * 
 */
@Stateless
public class ReceptionHeadcountBean extends BaseBean implements Cruddable {

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
    ReceptionHeadcount headCount = null;
    try {
      headCount = entityFromRequest(request, ReceptionHeadcount.class);

      log.fine("Received ReceptionHeadcount in request: " + headCount);

      if (validateEntity(headCount)) {
        log.finer("ReceptionHeadcount succesfully validated");
        em.persist(headCount);
        log.finer("ReceptionHeadcount persisted on database");
        em.flush();

        String sId = String.valueOf(headCount.getHeadcountId());
        log.finer("Setting ReceptionHeadcount id in response: " + sId);
        response.setGeneratedId(sId);
        response.setError(new Error("0", "SUCCESS", "proxy.ReceptionHeadcountBean.Create"));
        log.info("Reception Headcount [" + headCount.toString() + "] created by principal[" + getLoggedUser() + "]");
      } else {
        log.warning("Error de validación: " + error_description);
        response.setError(new Error("VAL01", "Error de validación: " + error_description, "proxy.ReceptionHeadcountBean.Create"));
      }

    } catch (Exception e) {
      log.severe("Exception found while creating ReceptionHeadcountBean");
      log.throwing(this.getClass().getName(), "Create", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01",
            "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, ",
            "proxy.ReceptionHeadcountBean.Create"));
      else {
        response.setError(new Error("DB02", "Create exception: " + e.getMessage(), "proxy.ReceptionHeadcountBean.Create"));
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

    ReceptionHeadcount recHc = null;
    try {
      recHc = entityFromRequest(request, ReceptionHeadcount.class);

      log.fine("Got headcount query from request: " + recHc);

      TypedQuery<ReceptionHeadcount> readQuery = null;
      String qryLogger = "";
      if (recHc.getHeadcountId() != 0) {
        readQuery = em.createNamedQuery("CRT_RECEPTIONHEADCOUNT_BY_ID", ReceptionHeadcount.class);
        readQuery.setParameter("headcountId", recHc.getHeadcountId());
        qryLogger = "By headcountId [" + recHc.getHeadcountId() + "]";
      } else if(recHc.getReceptionId() != 0 ){
        readQuery = em.createNamedQuery("RECEPTION_HEADCOUNT_BY_RECEPTION_ID", ReceptionHeadcount.class);
        readQuery.setParameter("receptionId", recHc.getReceptionId());
        qryLogger = "By receptionId [" + recHc.getReceptionId() + "]";
      } else {
        response.setError(new Error("VAL03", "El filtro especificado no es válido para datos de recepciones de ganado.",
            "proxy.ReceptionHeadcount.Read"));
        return response;
      }

      List<ReceptionHeadcount> queryResults = readQuery.getResultList();

      if (queryResults.isEmpty()) {
        response.setError(new Error("VAL02", "No se encontraron datos para el filtro seleccionado", "proxy.ReceptionHeadcount.Read"));
      } else {
        response.getRecord().addAll(contentFromList(queryResults, ReceptionHeadcount.class));

        response.setError(new Error("0", "SUCCESS", "proxy.ReceptionHeadcount.Read"));
        log.info("Read operation " + qryLogger + " executed by principal[" + getLoggedUser() + "] on ReceptionHeadcountBean");
      }
    } catch (Exception e) {
      log.severe("Exception found while reading rancher invoice filter");
      log.throwing(this.getClass().getCanonicalName(), "Read", e);

      response.setError(new Error("DB02", "Error en la base de datos: " + e.getMessage(), "proxy.ReceptionHeadcount.Read"));
    }

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
    ReceptionHeadcount headCount = null;
    try {
      headCount = entityFromRequest(request, ReceptionHeadcount.class);

      if (headCount.getHeadcountId() == 0) {
        log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id del corral al intentar actualizar sus datos.",
            "proxy.ReceptionHeadcount.Update"));
      } else {
        if (validateEntity(headCount)) {
          em.merge(headCount);
          em.flush();

          GatewayContent content = getContentFromEntity(headCount, ReceptionHeadcount.class);
          response.setUpdatedRecord(content);

          response.setError(new Error("0", "SUCCESS", "proxy.ReceptionHeadcount.Update"));
          log.info("Reception Headcount [" + headCount.toString() + "] updated by principal[" + getLoggedUser() + "]");
        } else {
          log.warning("Validation error:" + error_description);
          response.setError(new Error("VAL01", "Error de validación de datos:" + error_description, "proxy.ReceptionHeadcountBean.Update"));
        }
      }

    } catch (Exception e) {
      log.severe("Exception found while updating ReceptionHeadcount");
      log.throwing(this.getClass().getName(), "Update", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, ",
            "proxy.ReceptionHeadcountBean.Update"));
      else {
        response.setError(new Error("DB02", "Error en la base de datos:[" + e.getMessage() + "]", "proxy.ReceptionHeadcountBean.Update"));
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
      ReceptionHeadcount headCount = entityFromRequest(request, ReceptionHeadcount.class);
      if (headCount.getHeadcountId() == 0) {
        log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id del corral al intentar eliminar el registro.", "proxy.ReceptionHeadcount.Delete"));
      } else {
        TypedQuery<ReceptionHeadcount> readQuery = em.createNamedQuery("CRT_RECEPTIONHEADCOUNT_BY_ID", ReceptionHeadcount.class);
        readQuery.setParameter("headcountId", headCount.getHeadcountId());
        headCount = readQuery.getSingleResult();
        log.info("Deleting Reception Headcount [" + headCount.toString() + "] by principal[" + getLoggedUser() + "]");
        em.merge(headCount);
        em.remove(headCount);
        em.flush();

        response.setError(new Error("0", "SUCCESS", "proxy.ReceptionHeadcount.Delete"));
        log.info("Reception Headcount successfully deleted by principal [" + getLoggedUser() + "]");
      }
    } catch (Exception e) {
      log.severe("Exception found while deleting ReceptionHeadcount");
      log.throwing(this.getClass().getName(), "Delete", e);

      response.setError(new Error("DEL01",
          "Error al intentar borrar datos, es probable que esta entidad tenga otras entidades relacionadas, ",
          "proxy.ReceptionHeadcount.Delete"));
    }

    log.exiting(this.getClass().getCanonicalName(), "Delete");
    return response;
  }

}
