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
 * 12/16/2012  Diego Torres                 Adding log activity
 * 01/22/2013  Diego Torres                  Implementing DataModel.
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
    this.log.entering(this.getClass().getCanonicalName(), "Create");

    CreateGatewayResponse response = new CreateGatewayResponse();
    Rancher rancher = null;
    try {
      rancher = entityFromRequest(request, Rancher.class);

      this.log.fine("Received rancher in request:{" + rancher.toString() + "}");

      if (validateEntity(rancher)) {
        this.log.finer("RancherBean succesfully validated");
        dataModel.createDataModel(rancher);

        String sId = String.valueOf(rancher.getRancherId());
        this.log.finer("Setting rancher id in response [" + sId + "]");
        response.setGeneratedId(sId);
        response.setError(new Error("0", "SUCCESS", "proxy.Rancher.Create"));
        this.log.info("Rancher [" + rancher.toString() + "] created by principal[" + getLoggedUser() + "]");
      } else {
        this.log.warning("Validation error:" + error_description);
        response.setError(new Error("VAL01", "Error de validación de datos:" + error_description, "proxy.Rancher.Create"));
      }
    } catch (Exception e) {
      this.log.severe("Exception found while creating rancher");
      this.log.throwing(this.getClass().getName(), "Create", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, "
            + "muy probablemente el ganadero que usted quiere agregar ya existe en la base de datos.", "proxy.Rancher.Create"));
      else {
        response.setError(new Error("DB02", "Error en la base de datos:[" + e.getMessage() + "]", "proxy.Rancher.Create"));
      }
    }

    this.log.exiting(RancherBean.class.getCanonicalName(), "Create");
    return response;
  }

  /**
   * @see Cruddable#Read(GatewayRequest)
   */
  @Override
  public ReadGatewayResponse Read(GatewayRequest request) {
    this.log.entering(RancherBean.class.getCanonicalName(), "Read");

    ReadGatewayResponse response = new ReadGatewayResponse();
    response.setEntityName(request.getEntityName());

    Rancher rancher = null;
    try {
      rancher = entityFromRequest(request, Rancher.class);

      this.log.fine("Got rancher from request: " + rancher);

      String qryLogger = "";
      String queryName = "";
      Map<String, Object> parameters = new HashMap<String, Object>();
      if (rancher.getRancherId() != 0) {
        queryName = "RANCHER_BY_ID";
        this.log.fine("Query by Id [" + rancher.getRancherId() + "]");
        parameters.put("rancherId", rancher.getRancherId());
        qryLogger = "By rancherId [" + rancher.getRancherId() + "]";
      } else {
        // No other filter expected for ranchers, only by Id
        queryName = "ALL_RANCHERS";
        qryLogger = "By ALL_RANCHERS";
      }

      // Query the results through the persistence
      // Using a typedQuery to retrieve a list of Ranchers.
      List<Rancher> queryResults = dataModel.readDataModelList(queryName, parameters, Rancher.class);

      if (queryResults.isEmpty()) {
        response.setError(new Error("VAL02", "No se encontraron datos para el filtro seleccionado", "proxy.RancherBean.Read"));
      } else {
        // Add query results to response
        response.getRecord().addAll(contentFromList(queryResults, Rancher.class));

        // Add success message to response
        response.setError(new Error("0", "SUCCESS", "proxy.Rancher.Read"));
        this.log.info("Read operation " + qryLogger + " executed by principal[" + getLoggedUser() + "] on RancherBean");
      }
    } catch (Exception e) {
      // something went wrong, alert the server and respond the client
      this.log.severe("Exception found while reading rancher filter");
      this.log.throwing(this.getClass().getName(), "Read", e);

      response.setError(new Error("DB02", "Error en la base de datos:[" + e.getMessage() + "]", "proxy.Rancher.Read"));
    }

    // end and respond.
    this.log.exiting(RancherBean.class.getCanonicalName(), "Read");
    return response;
  }

  /**
   * @see Cruddable#Update(GatewayRequest)
   */
  @Override
  public UpdateGatewayResponse Update(GatewayRequest request) {
    this.log.entering(RancherBean.class.getCanonicalName(), "Update");
    UpdateGatewayResponse response = new UpdateGatewayResponse();
    Rancher rancher = null;
    try {
      rancher = entityFromRequest(request, Rancher.class);
      if (rancher.getRancherId() == 0) {
        this.log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id del ganadero al intentar actualizar sus datos.",
            "proxy.RancherBean.Update"));
      } else {
        if (validateEntity(rancher)) {
          dataModel.updateDataModel(rancher);

          response.setUpdatedRecord(getContentFromEntity(rancher, Rancher.class));
          response.setEntityName(request.getEntityName());
          response.setError(new Error("0", "SUCCESS", "proxy.Rancher.Update"));
          this.log.info("Rancher [" + rancher.toString() + "] updated by principal[" + getLoggedUser() + "]");
        } else {
          this.log.warning("Validation error: " + error_description);
          response.setError(new Error("VAL01", "Error de validación de datos: " + error_description, "proxy.Rancher.Update"));
        }
      }
    } catch (Exception e) {
      this.log.severe("Exception found while updating rancher");
      this.log.throwing(this.getClass().getName(), "Update", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, "
            + "muy probablemente el ganadero que usted quiere agregar ya existe en la base de datos.", "proxy.Rancher.Create"));
      else {
        response.setError(new Error("DB02", "Error en la base de datos:[" + e.getMessage() + "]", "proxy.Rancher.Update"));
      }
    }

    this.log.exiting(RancherBean.class.getCanonicalName(), "Update");
    return response;
  }

  /**
   * @see Cruddable#Delete(GatewayRequest)
   */
  @Override
  public BaseResponse Delete(GatewayRequest request) {
    this.log.entering(RancherBean.class.getCanonicalName(), "Delete");
    BaseResponse response = new BaseResponse();
    try {
      Rancher rancher = entityFromRequest(request, Rancher.class);
      if (rancher.getRancherId() == 0) {
        this.log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id del ganadero al intentar eliminar el registro.",
            "proxy.RancherBean.Delete"));
      } else {
        rancher = dataModel.readSingleDataModel("RANCHER_BY_ID", "rancherId", rancher.getRancherId(), Rancher.class);
        this.log.info("Deleting Rancher [" + rancher.toString() + "] by principal[" + getLoggedUser() + "]");
        dataModel.deleteDataModel(rancher, getLoggedUser());
        response.setError(new Error("0", "SUCCESS", "proxy.Rancher.Delete"));
      }
    } catch (Exception e) {
      this.log.severe("Exception found while deleting rancher");
      this.log.throwing(this.getClass().getName(), "Delete", e);

      response.setError(new Error("DEL01",
          "Error al intentar borrar datos. Es muy probable que la entidad que usted quiere eliminar "
              + "cuente con otras entidades relacionadas.", "proxy.RancherBean.Delete"));
    }

    this.log.exiting(RancherBean.class.getCanonicalName(), "Delete");
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
