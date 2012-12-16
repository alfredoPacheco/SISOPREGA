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
import com.tramex.sisoprega.dto.InspectionBarnyard;

/**
 * This proxy knows the logic to evaluate Inspection Barnyard and the way to the
 * database in order to save their data. Also, it is contained in EJB container,
 * we can apply security and life cycle methods for resources.<BR/>
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 12/09/2012  Jaime Figueroa                Initial Version.
 * 12/13/2012  Diego Torres                  Enable Read Operation.
 * 12/16/2012  Diego Torres                  Adding log activity
 * ====================================================================================
 * </PRE>
 * 
 * @author Jaime Figueroa
 * 
 */
@Stateless
public class InspectionBarnyardBean extends BaseBean implements Cruddable {

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
    InspectionBarnyard inspBarnyard = null;
    try {
      inspBarnyard = entityFromRequest(request, InspectionBarnyard.class);

      log.fine("Received InspectionBarnyard in request: " + inspBarnyard);

      if (validateEntity(inspBarnyard)) {
        log.finer("InspectionBarnyard succesfully validated");
        em.persist(inspBarnyard);
        log.finer("InspectionBarnyard persisted on database");
        em.flush();

        String sId = String.valueOf(inspBarnyard.getIbId());
        log.finer("Setting InspectionBarnyard id in response: " + sId);
        response.setGeneratedId(sId);
        response.setError(new Error("0", "SUCCESS", "proxy.InspectionBarnyardBean.Create"));
        log.info("Inspection Barnyard [" + inspBarnyard.toString() + "] created by principal[" + getLoggedUser() + "]");
      } else {
        log.warning("Error de validación: " + error_description);
        response.setError(new Error("VAL01", "Error de validación: " + error_description, "proxy.InspectionBarnyardBean.Create"));
      }

    } catch (Exception e) {
      log.severe("Exception found while creating InspectionBarnyardBean");
      log.throwing(this.getClass().getName(), "Create", e);
      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01",
            "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, ",
            "proxy.InspectionBarnyardBean.Create"));
      else {
        response.setError(new Error("DB02", "Create exception: " + e.getMessage(), "proxy.InspectionBarnyardBean.Create"));
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

    InspectionBarnyard inspection = null;
    try {
      inspection = entityFromRequest(request, InspectionBarnyard.class);
      log.fine("Got inspection from request: " + inspection);

      TypedQuery<InspectionBarnyard> readQuery = null;
      String qryLogger = "";
      if (inspection.getIbId() != 0) {
        readQuery = em.createNamedQuery("CRT_INSPECTIONBARNYARD_BY_ID", InspectionBarnyard.class);
        log.fine("Query by Id: " + inspection.getIbId());
        readQuery.setParameter("ibId", inspection.getIbId());
        qryLogger = "By ibId [" + inspection.getIbId() + "]";
      } else if (inspection.getInspectionId() != 0) {
        readQuery = em.createNamedQuery("IB_BY_INSPECTION_ID", InspectionBarnyard.class);
        log.fine("Query by InspectionId: " + inspection.getInspectionId());
        readQuery.setParameter("inspectionId", inspection.getInspectionId());
        qryLogger = "By inspectionId [" + inspection.getInspectionId() + "]";
      } else {
        response.setError(new Error("VAL03", "El filtro especificado no es válido para las inspecciones de ganado",
            "proxy.InspectionBarnyardDetail.Read"));
        return response;
      }

      // Query the results through the jpa using a typedQuery
      List<InspectionBarnyard> queryResults = readQuery.getResultList();

      if (queryResults.isEmpty()) {
        response.setError(new Error("VAL02", "No se encontraron datos para el filtro seleccionado", "proxy.InspectionBarnyardBean.Read"));
      } else {
        // Add query results to response
        response.getRecord().addAll(contentFromList(queryResults, InspectionBarnyard.class));

        // Add success message to response
        response.setError(new Error("0", "SUCCESS", "proxy.InspectionBarnyard.Read"));
        log.info("Read operation " + qryLogger + " executed by principal[" + getLoggedUser() + "] on InspectionBarnyardBean");
      }
    } catch (Exception e) {
      // something went wrong, alert the server and respond the client
      log.severe("Exception found while reading feed inspection");
      log.throwing(this.getClass().getCanonicalName(), "Read", e);

      response.setError(new Error("DB02", "Read exception: " + e.getMessage(), "proxy.InspectionBarnyardBean.Read"));
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
    InspectionBarnyard inspBarnyard = null;
    try {
      inspBarnyard = entityFromRequest(request, InspectionBarnyard.class);

      if (inspBarnyard.getIbId() == 0) {
        log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id del corral al intentar actualizar sus datos.",
            "proxy.InspectionBarnyard.Update"));
      } else {
        if (validateEntity(inspBarnyard)) {
          em.merge(inspBarnyard);
          em.flush();

          GatewayContent content = getContentFromEntity(inspBarnyard, InspectionBarnyard.class);
          response.setUpdatedRecord(content);

          response.setError(new Error("0", "SUCCESS", "proxy.InspectionBarnyard.Update"));
          log.info("InspectionBarnyard [" + inspBarnyard.toString() + "] updated by principal[" + getLoggedUser() + "]");
        } else {
          log.warning("Validation error:" + error_description);
          response.setError(new Error("VAL01", "Error de validación de datos:" + error_description,
              "proxy.InspectionBarnyardBean.Update"));
        }
      }

    } catch (Exception e) {
      log.severe("Exception found while updating inspBarnyard");
      log.throwing(this.getClass().getName(), "Update", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01",
            "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, ",
            "proxy.InspectionBarnyardBean.Update"));
      else {
        response.setError(new Error("DB02", "Error en la base de datos:[" + e.getMessage() + "]",
            "proxy.InspectionBarnyardBean.Update"));
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
      InspectionBarnyard inspBarnyard = entityFromRequest(request, InspectionBarnyard.class);
      if (inspBarnyard.getBarnyardId() == 0) {
        log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id del corral al intentar eliminar el registro.",
            "proxy.Barnyard.Delete"));
      } else {
        TypedQuery<InspectionBarnyard> readQuery = em.createNamedQuery("CRT_INSPECTIONBARNYARD_BY_ID", InspectionBarnyard.class);
        readQuery.setParameter("ibId", inspBarnyard.getBarnyardId());
        inspBarnyard = readQuery.getSingleResult();
        log.info("Deleting InspectionBarnyard [" + inspBarnyard.toString() + "] by principal[" + getLoggedUser() + "]");
        em.merge(inspBarnyard);
        em.remove(inspBarnyard);
        em.flush();

        response.setError(new Error("0", "SUCCESS", "proxy.InspectionBarnyard.Delete"));
        log.info("InspectionBarnyard successfully deleted by principal [" + getLoggedUser() + "]");
      }
    } catch (Exception e) {
      log.severe("Exception found while deleting inspBarnyard");
      log.throwing(this.getClass().getName(), "Delete", e);

      response.setError(new Error("DEL01",
          "Error al intentar borrar datos, es probable que esta entidad tenga otras entidades relacionadas, ",
          "proxy.InspectionBarnyard.Delete"));
    }

    log.exiting(this.getClass().getCanonicalName(), "Delete");
    return response;
  }

}
