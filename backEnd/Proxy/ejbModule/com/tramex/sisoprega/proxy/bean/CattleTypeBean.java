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
import com.tramex.sisoprega.dto.CattleType;

/**
 * This proxy knows the logic to evaluate cattle type information and the way to
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
 * 18/11/2012  Jaime Figueroa                 Initial Version.
 * 23/11/2012  Diego Torres		              Fixing Read operation.
 * 12/02/2012  Diego Torres                   Fixing Detele operation, change cattleClassId for cattleTypeId.
 * 12/02/2012  Jaime Figueroa                 Fixing Update operation, change cattleClassId for cattleTypeId.
 * 12/05/2012  Diego Torres                   Adding validation and standard error codes.
 * ====================================================================================
 * </PRE>
 * 
 * @author Jaime Figueroa
 * 
 */
@Stateless
public class CattleTypeBean extends BaseBean implements Cruddable {

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
    CattleType cattle = null;
    try {
      cattle = entityFromRequest(request, CattleType.class);

      log.fine("Received cattle type in request: " + cattle);

      if (validateEntity(cattle)) {
        log.finer("Cattle type succesfully validated");
        em.persist(cattle);
        em.flush();
        log.finer("Cattle type persisted on database");

        String sId = String.valueOf(cattle.getCattypeId());
        log.finer("Setting cattle type id in response: " + sId);
        response.setGeneratedId(sId);
        response.setError(new Error("0", "SUCCESS", "proxy.CattleTypeBean.Create"));
      } else {
        log.warning("Error de validación: " + error_description);
        response.setError(new Error("VAL01", "Error de validación: " + error_description, "proxy.CattleTypeBean.Create"));
      }

    } catch (Exception e) {
      log.severe("Exception found while creating cattle type");
      log.throwing(this.getClass().getName(), "Create", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, "
            + "muy probablemente el tipo de ganado que usted quiere agregar ya existe en la base de datos.",
            "proxy.CattleTypeBean.Create"));
      else {
        response.setError(new Error("DB02", "Create exception: " + e.getMessage(), "proxy.CattleTypeBean.Create"));
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

    CattleType cattle = null;
    try {
      cattle = entityFromRequest(request, CattleType.class);

      log.fine("Got contact from request: " + cattle);
      TypedQuery<CattleType> readQuery = null;

      if (cattle.getCattypeId() != 0) {
        readQuery = em.createNamedQuery("CATTLE_TYPE_BY_ID", CattleType.class);
        readQuery.setParameter("cattypeId", cattle.getCattypeId());
      } else if (cattle.getCatclassId() != 0) {
        readQuery = em.createNamedQuery("CATTLE_TYPE_BY_CLASS_ID", CattleType.class);
        readQuery.setParameter("catClassId", cattle.getCatclassId());
      } else {
        readQuery = em.createNamedQuery("ALL_CATTLE_TYPE", CattleType.class);
      }

      List<CattleType> queryResults = readQuery.getResultList();

      if (queryResults.isEmpty()) {
        response.setError(new Error("VAL02", "No se encontraron datos para el filtro seleccionado", "proxy.CattleTypeBean.Read"));
      } else {
        List<GatewayContent> records = contentFromList(queryResults, CattleType.class);
        response.getRecord().addAll(records);
        response.setError(new Error("0", "SUCCESS", "proxy.CattleType.Read"));

      }

    } catch (Exception e) {
      log.severe("Exception found while reading Cattle Class");
      log.throwing(this.getClass().getCanonicalName(), "Read", e);

      response.setError(new Error("DB02", "Read exception: " + e.getMessage(), "proxy.CattleType.Read"));
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
    CattleType cattle = null;
    try {
      cattle = entityFromRequest(request, CattleType.class);

      if (cattle.getCattypeId() == 0) {
        log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id del tipo de ganado al intentar actualizar sus datos.",
            "proxy.CattleTypeBean.Update"));
      } else {
        if (validateEntity(cattle)) {
          em.merge(cattle);
          em.flush();

          GatewayContent content = getContentFromEntity(cattle, CattleType.class);
          response.setUpdatedRecord(content);

          response.setError(new Error("0", "SUCCESS", "proxy.CattleType.Update"));
        } else {
          log.warning("Validation error: " + error_description);
          response
              .setError(new Error("VAL01", "Error de validación de datos:" + error_description, "proxy.CattleTypeBean.Update"));
        }
      }

    } catch (Exception e) {
      log.severe("Exception found while updating CattleType");
      log.throwing(this.getClass().getName(), "Update", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, "
            + "muy probablemente el tipo de ganado que usted quiere agregar ya existe en la base de datos.",
            "proxy.CattleType.Update"));
      else {
        response.setError(new Error("DB02", "Error en la base de datos:[" + e.getMessage() + "]", "proxy.CattleTypeBean.Update"));
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
      CattleType cattleType = entityFromRequest(request, CattleType.class);
      if (cattleType.getCattypeId() == 0) {
        log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id del tipo de ganado al intentar eliminar el registro.",
            "proxy.CattleTypeBean.Delete"));
      } else {
        TypedQuery<CattleType> readQuery = em.createNamedQuery("CATTLE_TYPE_BY_ID", CattleType.class);
        readQuery.setParameter("cattypeId", cattleType.getCattypeId());
        cattleType = readQuery.getSingleResult();
        em.merge(cattleType);
        em.remove(cattleType);
        em.flush();

        response.setError(new Error("0", "SUCCESS", "proxy.CattleType.Delete"));
      }
    } catch (Exception e) {
      log.severe("Exception found while deleting cattle type");
      log.throwing(this.getClass().getName(), "Delete", e);

      response
          .setError(new Error(
              "DEL01",
              "Error al intentar borrar datos, es probable que esta entidad tenga otras entidades relacionadas, "
                  + "por ejemplo, un tipo de ganado que cuenta con registros de recepción no puede ser eliminado sin antes eliminar tal relación.",
              "proxy.CattleTypeBean.Delete"));
    }

    log.exiting(this.getClass().getCanonicalName(), "Delete");
    return response;
  }

  @Override
  protected boolean validateEntity(Object entity) {
    boolean result = super.validateEntity(entity);
    CattleType cattle = (CattleType) entity;
    if (result) {
      if (cattle.getCattypeName().length() > 50) {
        result = false;
        error_description = "El nombre del tipo de ganado es más grande de lo permitido.";
      }
    }

    if (result) {
      if (cattle.getCattypeName() == null || cattle.getCattypeName().trim().length() == 0) {
        result = false;
        error_description = "El nombre del tipo de ganado es un capo requerido.";
      }
    }

    return result;
  }

}
