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
import com.tramex.sisoprega.common.crud.Cruddable;
import com.tramex.sisoprega.dto.RancherUser;

/**
 * This proxy knows the logic to evaluate Rancher's User information and
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
 * 01/29/2013  Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 */
@Stateless
public class RancherUserBean extends BaseBean implements Cruddable {

  /* (non-Javadoc)
   * @see com.tramex.sisoprega.common.crud.Cruddable#Create(com.tramex.sisoprega.common.GatewayRequest)
   */
  @Override
  public CreateGatewayResponse Create(GatewayRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "Create");

    CreateGatewayResponse response = new CreateGatewayResponse();
    RancherUser user = null;

    try {
      user = entityFromRequest(request, RancherUser.class);

      this.log.fine("Received rancherInvoice in request:{" + user + "}");

      if (validateEntity(user)) {
        this.log.finer("rancherInvoice successfully validated");
        dataModel.createDataModel(user);

        String sId = String.valueOf(user.getRecordId());
        response.setGeneratedId(sId);
        response.setError(new Error("0", "SUCCESS", "proxy.RancherUser.Create"));
        this.log.info("Rancher User [" + user.toString() + "] created by principal[" + getLoggedUser() + "]");
      } else {
        this.log.warning("Validation error:" + error_description);
        response.setError(new Error("VAL01", "Error de validación de datos:" + error_description, "proxy.RancherUser.Create"));
      }
    } catch (Exception e) {
      this.log.severe("Exception found while creating rancher invoicing info");
      this.log.throwing(this.getClass().getName(), "Create", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, "
            + "muy probablemente los datos de usuario que usted quiere agregar ya existen en la base de datos.",
            "proxy.RancherUser.Create"));
      else {
        response.setError(new Error("DB02", "Error en la base de datos:[" + e.getMessage() + "]", "proxy.RancherUser.Create"));
      }
    }

    this.log.exiting(this.getClass().getCanonicalName(), "Create");
    return response;
  }

  /* (non-Javadoc)
   * @see com.tramex.sisoprega.common.crud.Cruddable#Read(com.tramex.sisoprega.common.GatewayRequest)
   */
  @Override
  public ReadGatewayResponse Read(GatewayRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "Read");

    ReadGatewayResponse response = new ReadGatewayResponse();
    response.setEntityName(request.getEntityName());

    RancherUser user = null;
    try {
      user = entityFromRequest(request, RancherUser.class);

      this.log.fine("Got rancher user from request: " + user);

      String qryLogger = "";
      String queryName = "";
      Map<String, Object> parameters = new HashMap<String, Object>();
      if (user.getRecordId() != 0) {
        queryName = "RANCHER_USER_BY_RECORD_ID";
        parameters.put("recordId", user.getRecordId());
        qryLogger = "By recordId [" + user.getRecordId() + "]";
      } else if (user.getRancherId() != 0) {
        queryName = "RANCHER_USER_BY_RANCHER_ID";
        parameters.put("rancherId", user.getRancherId());
        qryLogger = "By rancherId [" + user.getRancherId() + "]";
      } else if (user.getUser_name() != null && !user.getUser_name().trim().equals("")) {
        queryName  = "RANCHER_USER_BY_USER_NAME";
        parameters.put("userName", user.getUser_name());
        qryLogger = "By userName [" + user.getRancherId() + "]";
      } else {
        response.setError(new Error("VAL03", "El filtro especificado no es válido para usuarios de ganaderos.",
            "proxy.RancherUser.Read"));
        return response;
      }

      List<RancherUser> queryResults = dataModel.readDataModelList(queryName, parameters, RancherUser.class);

      if (queryResults.isEmpty()) {
        response.setError(new Error("VAL02", "No se encontraron datos para el filtro seleccionado", "proxy.RancherUser.Read"));
      } else {
        response.getRecord().addAll(contentFromList(queryResults, RancherUser.class));

        response.setError(new Error("0", "SUCCESS", "proxy.RancherUser.Read"));
        this.log.info("Read operation " + qryLogger + " executed by principal[" + getLoggedUser() + "] on RancherUser");
      }
    } catch (Exception e) {
      this.log.severe("Exception found while reading rancher user filter");
      this.log.throwing(this.getClass().getCanonicalName(), "Read", e);

      response.setError(new Error("DB02", "Error en la base de datos: " + e.getMessage(), "proxy.RancherUser.Read"));
    }

    this.log.exiting(this.getClass().getCanonicalName(), "Read");
    return response;
  }

  /* (non-Javadoc)
   * @see com.tramex.sisoprega.common.crud.Cruddable#Update(com.tramex.sisoprega.common.GatewayRequest)
   */
  @Override
  public UpdateGatewayResponse Update(GatewayRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "Update");
    UpdateGatewayResponse response = new UpdateGatewayResponse();

    RancherUser user = null;

    try {
      user = entityFromRequest(request, RancherUser.class);

      if (user.getRecordId() == 0) {
        this.log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id del usuario al intentar actualizarlo.",
            "proxy.RancherUser.Update"));
      } else {
        if (validateEntity(user)) {
          dataModel.updateDataModel(user);

          response.setUpdatedRecord(getContentFromEntity(user, RancherUser.class));
          response.setEntityName(request.getEntityName());
          response.setError(new Error("0", "SUCCESS", "proxy.RancherUser.Update"));
          this.log.info("Rancher Invoice [" + user.toString() + "] updated by principal[" + getLoggedUser() + "]");
        } else {
          this.log.warning("Validation error: " + error_description);
          response.setError(new Error("VAL01", "Error de validación de datos: " + error_description,
              "proxy.RancherUser.Update"));
        }
      }

    } catch (Exception e) {
      this.log.severe("Exception found while updating rancher user");
      this.log.throwing(this.getClass().getName(), "Update", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, "
            + "muy probablemente los datos de facturación que usted quiere agregar ya existe en la base de datos.",
            "proxy.RancherUser.Create"));
      else {
        response.setError(new Error("DB02", "Error en la base de datos:[" + e.getMessage() + "]", "proxy.RancherUser.Update"));
      }
    }

    this.log.exiting(this.getClass().getCanonicalName(), "Update");
    return response;
  }

  /* (non-Javadoc)
   * @see com.tramex.sisoprega.common.crud.Cruddable#Delete(com.tramex.sisoprega.common.GatewayRequest)
   */
  @Override
  public BaseResponse Delete(GatewayRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "Delete");
    BaseResponse response = new BaseResponse();

    try {
      RancherUser user = entityFromRequest(request, RancherUser.class);
      if (user.getRecordId() == 0) {
        this.log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id del registro de usuario de ganadero al intentar eliminarlo.",
            "proxy.RancherUser.Delete"));
      } else {
        user = dataModel.readSingleDataModel("RANCHER_USER_BY_RECORD_ID", "recordId", user.getRecordId(), RancherUser.class);
        this.log.info("Deleting RancherUser [" + user.toString() + "] by principal[" + getLoggedUser() + "]");
        dataModel.deleteDataModel(user, getLoggedUser());
        response.setError(new Error("0", "SUCCESS", "proxy.RancherUser.Delete"));
      }
    } catch (Exception e) {
      this.log.severe("Exception found while deleting rancher user info");
      this.log.throwing(this.getClass().getName(), "Delete", e);

      response.setError(new Error("DEL01",
          "Error al intentar borrar datos. Es muy probable que la entidad que usted quiere eliminar "
              + "cuente con otras entidades relacionadas.", "proxy.RancherUser.Delete"));
    }

    this.log.exiting(this.getClass().getCanonicalName(), "Delete");
    return response;
  }

}
