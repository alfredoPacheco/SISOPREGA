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
import com.tramex.sisoprega.dto.Barnyard;

/**
 * This proxy knows the logic to evaluate Barnyards' information and the
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
 *             Jaime Figueroa                Initial Version.
 * 12/04/2012  Diego Torres                  Fixing delete operation, adding flower box
 *                                           and adding read functionality.
 * ====================================================================================
 * </PRE>
 * 
 * @author Jaime Figueroa
 * 
 */
@Stateless
public class BarnyardBean extends BaseBean implements Cruddable {

  /*
   * (non-Javadoc)
   * 
   * @see com.tramex.sisoprega.common.crud.Cruddable#Create(com.tramex.sisoprega
   * .common.GatewayRequest)
   */
  @Override
  public CreateGatewayResponse Create(GatewayRequest request) {
    log.entering(this.getClass().getCanonicalName(), "Create");

    CreateGatewayResponse response = new CreateGatewayResponse();
    Barnyard barnyard = null;
    try {
      barnyard = entityFromRequest(request, Barnyard.class);

      log.fine("Received Barnyard in request: " + barnyard);

      if (validateEntity(barnyard)) {
        log.finer("Barnyard succesfully validated");
        em.persist(barnyard);
        log.finer("Barnyard persisted on database");
        em.flush();

        String sId = String.valueOf(barnyard.getBarnyardId());
        log.finer("Setting Barnyard id in response: " + sId);
        response.setGeneratedId(sId);
        response.setError(new Error("0", "SUCCESS", "proxy.BarnyardBean.Create"));
      } else {
        log.warning("Error de validación: " + error_description);
        response.setError(new Error("VAL01", "Error de validación: " + error_description, "proxy.BarnyardBean.Create"));
      }

    } catch (Exception e) {
      log.severe("Exception found while creating BarnyardBean");
      log.throwing(this.getClass().getName(), "Create", e);

      if (e instanceof javax.persistence.PersistenceException)
        response
            .setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, "
                + "muy probablemente el corral que usted quiere agregar ya existe en la base de datos.",
                "proxy.BarnyardBean.Create"));
      else {
        response.setError(new Error("DB02", "Create exception: " + e.getMessage(), "proxy.BarnyardBean.Create"));
      }
    }

    log.exiting(this.getClass().getCanonicalName(), "Create");
    return response;
  }

  /*
   * (non-Javadoc)
   * 
   * @see com.tramex.sisoprega.common.crud.Cruddable#Read(com.tramex.sisoprega.
   * common.GatewayRequest)
   */
  @Override
  public ReadGatewayResponse Read(GatewayRequest request) {
    log.entering(this.getClass().getCanonicalName(), "Read");

    ReadGatewayResponse response = new ReadGatewayResponse();
    response.setEntityName(request.getEntityName());

    Barnyard barnyard = null;
    try {
      barnyard = entityFromRequest(request, Barnyard.class);
      log.fine("Got barnyard from request: " + barnyard);

      TypedQuery<Barnyard> tQuery = null;
      if (barnyard.getBarnyardId() != 0) {
        tQuery = em.createNamedQuery("BARNYARD_BY_ID", Barnyard.class);
        tQuery.setParameter("barnyardId", barnyard.getBarnyardId());
      } else if (barnyard.getLocationId() != 0) {
        tQuery = em.createNamedQuery("BARNYARD_BY_LOCATION", Barnyard.class);
        tQuery.setParameter("locationId", barnyard.getLocationId());
      } else {
        tQuery = em.createNamedQuery("ALL_BARNYARDS", Barnyard.class);
      }

      List<Barnyard> results = tQuery.getResultList();
      if (results.isEmpty()) {
        response.setError(new Error("VAL02", "No se encontraron datos para el filtro seleccionado", "proxy.BarnyardBean.Read"));
      } else {
        List<GatewayContent> records = contentFromList(results, Barnyard.class);
        response.getRecord().addAll(records);

        response.setError(new Error("0", "SUCCESS", "proxy.BarnyardBean.Read"));
      }

    } catch (Exception e) {
      // something went wrong, alert the server and respond the client
      log.severe("Exception found while reading BarnyardBean");
      log.throwing(this.getClass().getCanonicalName(), "Read", e);

      response.setError(new Error("DB02", "Read exception: " + e.getMessage(), "proxy.BarnyardBean.Read"));
    }

    log.exiting(this.getClass().getCanonicalName(), "Read");
    return response;
  }

  /*
   * (non-Javadoc)
   * 
   * @see com.tramex.sisoprega.common.crud.Cruddable#Update(com.tramex.sisoprega
   * .common.GatewayRequest)
   */
  @Override
  public UpdateGatewayResponse Update(GatewayRequest request) {
    log.entering(this.getClass().getCanonicalName(), "Update");
    UpdateGatewayResponse response = new UpdateGatewayResponse();
    Barnyard barnyard = null;
    try {
      barnyard = entityFromRequest(request, Barnyard.class);

      if (barnyard.getBarnyardId() == 0) {
        log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id del corral al intentar actualizar sus datos.", "proxy.Barnyard.Update"));
      } else {
        if (validateEntity(barnyard)) {
          em.merge(barnyard);
          em.flush();

          GatewayContent content = getContentFromEntity(barnyard, Barnyard.class);
          response.setUpdatedRecord(content);

          response.setError(new Error("0", "SUCCESS", "proxy.Barnyard.Update"));
        } else {
          log.warning("Validation error:" + error_description);
          response.setError(new Error("VAL01", "Error de validación de datos:" + error_description, "proxy.BarnyardBean.Update"));
        }
      }

    } catch (Exception e) {
      log.severe("Exception found while updating Barnyard");
      log.throwing(this.getClass().getName(), "Update", e);

      if (e instanceof javax.persistence.PersistenceException)
        response
            .setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, "
                + "muy probablemente el corral que usted quiere agregar ya existe en la base de datos.",
                "proxy.BarnyardBean.Update"));
      else {
        response.setError(new Error("DB02", "Error en la base de datos:[" + e.getMessage() + "]", "proxy.BarnyardBean.Update"));
      }
    }

    log.exiting(this.getClass().getCanonicalName(), "Update");
    return response;
  }

  /*
   * (non-Javadoc)
   * 
   * @see com.tramex.sisoprega.common.crud.Cruddable#Delete(com.tramex.sisoprega
   * .common.GatewayRequest)
   */
  @Override
  public BaseResponse Delete(GatewayRequest request) {
    log.entering(this.getClass().getCanonicalName(), "Delete");
    BaseResponse response = new BaseResponse();

    try {
      Barnyard barnyard = entityFromRequest(request, Barnyard.class);
      if (barnyard.getBarnyardId() == 0) {
        log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id del corral al intentar eliminar el registro.", "proxy.Barnyard.Delete"));
      } else {
        TypedQuery<Barnyard> readQuery = em.createNamedQuery("BARNYARD_BY_ID", Barnyard.class);
        readQuery.setParameter("barnyardId", barnyard.getBarnyardId());
        barnyard = readQuery.getSingleResult();
        em.merge(barnyard);
        em.remove(barnyard);
        em.flush();

        response.setError(new Error("0", "SUCCESS", "proxy.Barnyard.Delete"));
      }
    } catch (Exception e) {
      log.severe("Exception found while deleting barnyard");
      log.throwing(this.getClass().getName(), "Delete", e);

      response.setError(new Error("DEL01",
          "Error al intentar borrar datos, es probable que esta entidad tenga otras entidades relacionadas, "
              + "por ejemplo, un corral que cuenta con recepciones no puede ser eliminado sin antes resolver la recepción.",
          "proxy.Barnyard.Delete"));
    }

    log.exiting(this.getClass().getCanonicalName(), "Delete");
    return response;
  }
}
