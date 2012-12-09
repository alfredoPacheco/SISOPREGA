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
import com.tramex.sisoprega.common.GatewayRequest;
import com.tramex.sisoprega.common.ReadGatewayResponse;
import com.tramex.sisoprega.common.UpdateGatewayResponse;
import com.tramex.sisoprega.common.Utils;
import com.tramex.sisoprega.common.crud.Cruddable;
import com.tramex.sisoprega.dto.Rancher;

/**
 * This proxy knows the logic to evaluate Ranchers and the way to the database
 * in order to save their data. Also, it is contained in EJB container, we can
 * apply security and life cycle methods for resources.<BR/>
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 10/27/2012  Diego Torres                 Initial Version.
 * 12/03/2012  Diego Torres                 Refactor rename for RancherBean.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 */

@Stateless
public class RancherBean extends BaseBean implements Cruddable {

  /**
   * @see Cruddable#Create(GatewayRequest)
   */
  @Override
  public CreateGatewayResponse Create(GatewayRequest request) {
    log.entering(this.getClass().getCanonicalName(), "Create");

    CreateGatewayResponse response = new CreateGatewayResponse();
    Rancher rancher = null;
    try {
      rancher = entityFromRequest(request, Rancher.class);

      log.fine("Received rancher in request:{" + rancher.toString() + "}");

      if (validateEntity(rancher)) {
        log.finer("RancherBean succesfully validated");
        em.persist(rancher);
        log.finer("RancherBean persisted on database");
        em.flush();

        String sId = String.valueOf(rancher.getRancherId());
        log.finer("Setting rancher id in response [" + sId + "]");
        response.setGeneratedId(sId);
        response.setError(new Error("0", "SUCCESS", "proxy.Rancher.Create"));
        log.finer("built successfull response");
      } else {
        log.warning("Validation error:" + error_description);
        response.setError(new Error("VAL01", "Error de validación de datos:" + error_description, "proxy.Rancher.Create"));
      }
    } catch (Exception e) {
      log.severe("Exception found while creating rancher");
      log.throwing(this.getClass().getName(), "Create", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, "
            + "muy probablemente el ganadero que usted quiere agregar ya existe en la base de datos.", "proxy.Rancher.Create"));
      else {
        response.setError(new Error("DB02", "Error en la base de datos:[" + e.getMessage() + "]", "proxy.Rancher.Create"));
      }
    }

    log.exiting(RancherBean.class.getCanonicalName(), "Create");
    return response;
  }

  /**
   * @see Cruddable#Read(GatewayRequest)
   */
  @Override
  public ReadGatewayResponse Read(GatewayRequest request) {
    log.entering(RancherBean.class.getCanonicalName(), "Read");

    ReadGatewayResponse response = new ReadGatewayResponse();
    response.setEntityName(request.getEntityName());

    Rancher rancher = null;
    try {
      rancher = entityFromRequest(request, Rancher.class);

      log.fine("Got rancher from request: " + rancher);

      TypedQuery<Rancher> readQuery = null;

      if (rancher.getRancherId() != 0) {
        readQuery = em.createNamedQuery("RANCHER_BY_ID", Rancher.class);
        log.fine("Query by Id [" + rancher.getRancherId() + "]");
        readQuery.setParameter("rancherId", rancher.getRancherId());
      } else {
        // No other filter expected for ranchers, only by Id
        readQuery = em.createNamedQuery("ALL_RANCHERS", Rancher.class);
      }

      // Query the results through the persistence
      // Using a typedQuery to retrieve a list of Ranchers.
      List<Rancher> queryResults = readQuery.getResultList();

      if (queryResults.isEmpty()) {
        response.setError(new Error("RD01", "No se encontraron los datos requeridos.", "proxy.Rancher.Read"));
      } else {
        // Add query results to response
        response.getRecord().addAll(contentFromList(queryResults, Rancher.class));

        // Add success message to response
        response.setError(new Error("0", "SUCCESS", "proxy.Rancher.Read"));
      }
    } catch (Exception e) {
      // something went wrong, alert the server and respond the client
      log.severe("Exception found while reading rancher filter");
      log.throwing(this.getClass().getName(), "Read", e);

      response.setError(new Error("DB02", "Error en la base de datos:[" + e.getMessage() + "]", "proxy.Rancher.Read"));
    }

    // end and respond.
    log.exiting(RancherBean.class.getCanonicalName(), "Read");
    return response;
  }

  /**
   * @see Cruddable#Update(GatewayRequest)
   */
  @Override
  public UpdateGatewayResponse Update(GatewayRequest request) {
    log.entering(RancherBean.class.getCanonicalName(), "Update");
    UpdateGatewayResponse response = new UpdateGatewayResponse();
    Rancher rancher = null;
    try {
      rancher = entityFromRequest(request, Rancher.class);
      if (rancher.getRancherId() == 0) {
        log.warning("RU01 - Invalid rancherId.");
        response.setError(new Error("UPD01", "No se ha especificado un Id de ganadero para ser modificado.",
            "proxy.Rancher.Update"));
      } else {
        if (validateEntity(rancher)) {
          em.merge(rancher);
          em.flush();

          response.setUpdatedRecord(getContentFromEntity(rancher, Rancher.class));
          response.setEntityName(request.getEntityName());
          response.setError(new Error("0", "SUCCESS", "proxy.Rancher.Update"));
        } else {
          log.warning("Validation error: " + error_description);
          response.setError(new Error("VAL01", "Error de validación de datos: " + error_description, "proxy.Rancher.Update"));
        }
      }
    } catch (Exception e) {
      log.severe("Exception found while updating rancher");
      log.throwing(this.getClass().getName(), "Update", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, "
            + "muy probablemente el ganadero que usted quiere agregar ya existe en la base de datos.", "proxy.Rancher.Create"));
      else {
        response.setError(new Error("DB02", "Error en la base de datos:[" + e.getMessage() + "]", "proxy.Rancher.Update"));
      }
    }

    log.exiting(RancherBean.class.getCanonicalName(), "Update");
    return response;
  }

  /**
   * @see Cruddable#Delete(GatewayRequest)
   */
  @Override
  public BaseResponse Delete(GatewayRequest request) {
    log.entering(RancherBean.class.getCanonicalName(), "Delete");
    BaseResponse response = new BaseResponse();
    try {
      Rancher rancher = entityFromRequest(request, Rancher.class);
      if (rancher.getRancherId() == 0) {
        log.warning("RD01 - Invalid rancherId.");
        response.setError(new Error("RD01", "Invalid rancherId", "proxy.Rancher.Delete"));
      } else {
        TypedQuery<Rancher> readQuery = em.createNamedQuery("RANCHER_BY_ID", Rancher.class);
        readQuery.setParameter("rancherId", rancher.getRancherId());
        rancher = readQuery.getSingleResult();
        em.merge(rancher);
        em.remove(rancher);
        em.flush();

        response.setError(new Error("0", "SUCCESS", "proxy.Rancher.Delete"));
      }
    } catch (Exception e) {
      log.severe("Exception found while deleting rancher");
      log.throwing(this.getClass().getName(), "Delete", e);

      response.setError(new Error("RU02", "Delete exception: " + e.getMessage(), "proxy.Rancher.Delete"));
    }

    log.exiting(RancherBean.class.getCanonicalName(), "Delete");
    return response;
  }

  @Override
  protected boolean validateEntity(Object entity) {
    boolean result = super.validateEntity(entity);
    Rancher rancher = (Rancher) entity;

    if (result) {
      result = rancher.getAka().length() <= 100;
      if (!result)
        error_description = "El alias del ganadero es más grande de lo permitido";
    }

    if (result) {
      result = rancher.getFirstName().length() <= 50;
      if (!result)
        error_description = "El nombre del ganadero es más grande de lo permitido";
    }

    if (result) {
      result = rancher.getFirstName().length() <= 50;
      if (!result)
        error_description = "El nombre del ganadero es más grande de lo permitido";
    }

    if (result) {
      result = rancher.getLastName().length() <= 50;
      if (!result)
        error_description = "El apellido paterno del ganadero es más grande de lo permitido";
    }

    if (result) {
      result = rancher.getMotherName().length() <= 50;
      if (!result)
        error_description = "El apellido materno del ganadero es más grande de lo permitido";
    }

    // Validate email address
    if (result) {

      if (rancher.getEmailAddress() != null && !rancher.getEmailAddress().trim().equals(""))
        result = Utils.isValidEmail(rancher.getEmailAddress());
      if (!result)
        error_description = "La dirección de correo electrónico no cumple con un formato reconocible (correo@dominio.etc).";
    }

    return result;
  }

}
