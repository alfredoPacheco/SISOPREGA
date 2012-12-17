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
import com.tramex.sisoprega.dto.CattleClass;

/**
 * This proxy knows the logic to evaluate Cattle class entities information and
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
 * 11/15/2012  Diego Torres                 Initial Version.
 * 12/05/2012  Diego Torres                 Standard error descriptions.
 * 12/16/2012  Diego Torres                 Adding user log activity.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 */
@Stateless
public class CattleClassBean extends BaseBean implements Cruddable {

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
    CattleClass cattle = null;
    try {
      cattle = entityFromRequest(request, CattleClass.class);

      log.fine("Received cattle class in request: " + cattle);

      if (validateEntity(cattle)) {
        log.finer("Cattle class succesfully validated");
        em.persist(cattle);
        log.finer("Cattle class persisted on database");
        em.flush();

        String sId = String.valueOf(cattle.getCatclassId());
        log.finer("Setting cattle class id in response: " + sId);
        response.setGeneratedId(sId);
        response.setError(new Error("0", "SUCCESS", "proxy.CattleClassBean.Create"));
        log.info("Cattle class [" + cattle.toString() + "] created by principal[" + getLoggedUser() + "]");
      } else {
        log.warning("Error de validación: " + error_description);
        response.setError(new Error("VAL01", "Error de validación: " + error_description, "proxy.CattleClassBean.Create"));
      }
    } catch (Exception e) {
      log.severe("Exception found while creating cattle class");
      log.throwing(this.getClass().getName(), "Create", e);

      if (e instanceof javax.persistence.PersistenceException)
        response
            .setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, "
                + "muy probablemente la clase de ganado que usted quiere agregar ya existe en la base de datos.",
                "proxy.CattleClassBean.Create"));
      else {
        response.setError(new Error("DB02", "Create exception: " + e.getMessage(), "proxy.CattleClassBean.Create"));
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

    CattleClass cattle = null;
    try {
      cattle = entityFromRequest(request, CattleClass.class);

      log.fine("Got cattle class from request: " + cattle);
      TypedQuery<CattleClass> readQuery = null;
      String qryLogger = "";
      if (cattle.getCatclassId() != 0) {
        readQuery = em.createNamedQuery("CATTLE_CLASS_BY_ID", CattleClass.class);
        readQuery.setParameter("catclassId", cattle.getCatclassId());
        qryLogger = "By catclassId[" + cattle.getCatclassId() + "]";
      } else {
        readQuery = em.createNamedQuery("ALL_CATTLE_CLASSES", CattleClass.class);
        qryLogger = "By ALL_CATTLE_CLASSES";
      }

      List<CattleClass> queryResults = readQuery.getResultList();

      if (queryResults.isEmpty()) {
        response.setError(new Error("VAL02", "No se encontraron datos para el filtro seleccionado", "proxy.CattleClassBean.Read"));
      } else {
        List<GatewayContent> records = contentFromList(queryResults, CattleClass.class);
        response.getRecord().addAll(records);
        
        response.setError(new Error("0", "SUCCESS", "proxy.CattleClass.Read"));
        log.info("Read operation " + qryLogger + " executed by principal[" + getLoggedUser() + "] on CattleClassBean");
      }

    } catch (Exception e) {
      log.severe("Exception found while reading Cattle Class");
      log.throwing(this.getClass().getCanonicalName(), "Read", e);

      response.setError(new Error("DB02", "Read exception: " + e.getMessage(), "proxy.CattleClass.Read"));
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
    CattleClass cattle = null;
    try {
      cattle = entityFromRequest(request, CattleClass.class);

      if (cattle.getCatclassId() == 0) {
        log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id de la clase de ganado al intentar actualizar sus datos.", "proxy.CattleClassBean.Update"));
      } else {
        if (validateEntity(cattle)) {
          em.merge(cattle);
          em.flush();

          GatewayContent content = getContentFromEntity(cattle, CattleClass.class);
          response.setUpdatedRecord(content);

          response.setError(new Error("0", "SUCCESS", "proxy.CattleClass.Update"));
          log.info("CattleClass[" + cattle.toString() + "] updated by principal[" + getLoggedUser() + "]");
        } else {
          log.warning("Validation error: " + error_description);
          response.setError(new Error("VAL01", "Error de validación de datos:" + error_description, "proxy.CattleClass.Update"));
        }
      }

    } catch (Exception e) {
      log.severe("Exception found while updating CattleClass");
      log.throwing(this.getClass().getName(), "Update", e);

      if (e instanceof javax.persistence.PersistenceException)
        response
            .setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, "
                + "muy probablemente la clase de ganado que usted quiere agregar ya existe en la base de datos.",
                "proxy.CattleClass.Update"));
      else {
        response.setError(new Error("DB02", "Error en la base de datos:[" + e.getMessage() + "]", "proxy.CattleClassBean.Update"));
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
      CattleClass cattle = entityFromRequest(request, CattleClass.class);
      if (cattle.getCatclassId() == 0) {
        log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id de la clase de ganado al intentar eliminar el registro.", "proxy.CattleClassBean.Delete"));
      } else {
        TypedQuery<CattleClass> readQuery = em.createNamedQuery("CATTLE_CLASS_BY_ID", CattleClass.class);
        readQuery.setParameter("catclassId", cattle.getCatclassId());
        cattle = readQuery.getSingleResult();
        log.info("Deleting CattleClass[" + cattle.toString() + "] by principal[" + getLoggedUser() + "]");
        em.merge(cattle);
        em.remove(cattle);
        em.flush();

        response.setError(new Error("0", "SUCCESS", "proxy.CattleClass.Delete"));
        log.info("CattleClass successfully deleted by principal [" + getLoggedUser() + "]");
      }
    } catch (Exception e) {
      log.severe("Exception found while deleting cattle class");
      log.throwing(this.getClass().getName(), "Delete", e);

      response.setError(new Error("DEL01",
          "Error al intentar borrar datos, es probable que esta entidad tenga otras entidades relacionadas, "
              + "por ejemplo, una clase de ganado que cuenta con registros de capacidad de corrales no puede ser eliminado sin antes eliminar tal relación.",
          "proxy.CattleClassBean.Delete"));
    }

    log.exiting(this.getClass().getCanonicalName(), "Delete");
    return response;
  }
}
