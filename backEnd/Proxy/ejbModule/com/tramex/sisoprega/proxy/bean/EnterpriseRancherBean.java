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
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.annotation.security.DeclareRoles;
import javax.ejb.Stateless;

import com.tramex.sisoprega.common.BaseResponse;
import com.tramex.sisoprega.common.CreateGatewayResponse;
import com.tramex.sisoprega.common.Error;
import com.tramex.sisoprega.common.GatewayRequest;
import com.tramex.sisoprega.common.ReadGatewayResponse;
import com.tramex.sisoprega.common.UpdateGatewayResponse;
import com.tramex.sisoprega.common.Utils;
import com.tramex.sisoprega.common.crud.Cruddable;
import com.tramex.sisoprega.dto.EnterpriseRancher;
import com.tramex.sisoprega.dto.RancherInvoice;
import com.tramex.sisoprega.dto.RancherUser;

/**
 * This proxy knows the logic to evaluate Enterprise Ranchers and the way to the
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
 * 11/05/2012  Diego Torres                 Initial Version.
 * 12/08/2012  Diego Torres                 Add standard error codes and validation.
 * 12/16/2012  Diego Torres                 Adding log activity
 * 01/22/2013  Diego Torres                 Implementing DataModel interfacing
 * 02/04/2013  Diego Torres                 Logged user details read request.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 */
@Stateless
@DeclareRoles({ "sisoprega_admin", "mx_usr", "rancher" })
public class EnterpriseRancherBean extends BaseBean implements Cruddable {

  /**
   * @see Cruddable#Create(GatewayRequest)
   */
  @Override
  public CreateGatewayResponse Create(GatewayRequest request) {
    this.log.entering(EnterpriseRancherBean.class.getCanonicalName(), "Create");

    CreateGatewayResponse response = new CreateGatewayResponse();
    EnterpriseRancher enterpriseRancher = null;
    try {
      enterpriseRancher = entityFromRequest(request, EnterpriseRancher.class);

      this.log.fine("Received enterprise rancher in request: {" + enterpriseRancher.toString() + "}");

      if (validateEntity(enterpriseRancher)) {
        this.log.finer("Enterprise RancherBean succesfully validated");
        dataModel.createDataModel(enterpriseRancher);
        this.log.finer("Enterprise RancherBean persisted on database");

        String sId = String.valueOf(enterpriseRancher.getEnterpriseId());
        this.log.finer("Setting enterprise rancher id in response [" + sId + "]");

        response.setGeneratedId(sId);
        response.setError(new Error("0", "SUCCESS", "proxy.EnterpriseRancher.Create"));
        this.log.info("Enterprise Rancher [" + enterpriseRancher.toString() + "] created by principal[" + getLoggedUser() + "]");
      } else {
        // Set validation error
        this.log.warning("Error de validación: " + error_description);
        response.setError(new Error("VAL01", "Error de validación: " + error_description, "proxy.EnterpriseRancherBean.Create"));
      }
    } catch (Exception e) {
      // Set exception details
      if (e instanceof javax.persistence.PersistenceException) {
        this.log.severe("Exception found while create enterprise rancher");
        this.log.throwing(this.getClass().getName(), "Create", e);

        response.setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, "
            + "muy probablemente el ganadero que usted quiere agregar ya existe en la base de datos.",
            "proxy.EnterpriseRAncherBean.Create"));
      } else {
        response.setError(new Error("DB02", "Create exception: " + e.getMessage(), "proxy.EnterpriseRancherBean.Create"));
      }
    }

    this.log.exiting(EnterpriseRancherBean.class.getCanonicalName(), "Create");
    return response;
  }

  /**
   * @see Cruddable#Read(GatewayRequest)
   */
  @Override
  public ReadGatewayResponse Read(GatewayRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "Read");

    ReadGatewayResponse response = new ReadGatewayResponse();
    response.setEntityName(request.getEntityName());

    EnterpriseRancher enterpriseRancher = null;
    try {
      enterpriseRancher = entityFromRequest(request, EnterpriseRancher.class);
      this.log.fine("Got rancher from request: " + enterpriseRancher);

      String qryLogger = "";
      String queryName = "";
      Map<String, Object> parameters = new HashMap<String, Object>();

      if (ejbContext.isCallerInRole("rancher")) {
        log.exiting(this.getClass().getCanonicalName(), "Read");
        return readLoggedRancherDetails(request.getEntityName());
      } else if (enterpriseRancher.getEnterpriseId() != 0) {
        queryName = "ENTERPRISE_RANCHER_BY_ID";
        parameters.put("enterpriseId", enterpriseRancher.getEnterpriseId());
        qryLogger = "By enterpriseId [" + enterpriseRancher.getEnterpriseId() + "]";
      } else {
        queryName = "ALL_ENTERPRISE_RANCHERS";
        qryLogger = "By ALL_ENTERPRISE_RANCHERS";
      }

      // Query the results through the jpa using a typedQuery
      List<EnterpriseRancher> queryResults = dataModel.readDataModelList(queryName, parameters, EnterpriseRancher.class);

      if (queryResults.isEmpty()) {
        response.setError(new Error("VAL02", "No se encontraron datos para el filtro seleccionado",
            "proxy.EnterpriseRancherBean.Read"));
      } else {
        // Add query results to response
        response.getRecord().addAll(contentFromList(queryResults, EnterpriseRancher.class));

        // Add success message to response
        response.setError(new Error("0", "SUCCESS", "proxy.EnterpriseRancher.Read"));
        this.log.info("Read operation " + qryLogger + " executed by principal[" + getLoggedUser() + "] on EnterpriseRancherBean");
      }
    } catch (Exception e) {
      // something went wrong, alert the server and respond the client
      this.log.severe("Exception found while reading enterprise contact");
      this.log.throwing(this.getClass().getCanonicalName(), "Read", e);

      response.setError(new Error("DB02", "Read exception: " + e.getMessage(), "proxy.EnterpriseRancherBean.Read"));
    }

    // end and respond.
    this.log.exiting(this.getClass().getCanonicalName(), "Read");
    return response;
  }

  /**
   * @see Cruddable#Update(GatewayRequest)
   */
  @Override
  public UpdateGatewayResponse Update(GatewayRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "Update");
    UpdateGatewayResponse response = new UpdateGatewayResponse();
    com.tramex.sisoprega.dto.EnterpriseRancher enterpriseRancher = null;
    try {
      enterpriseRancher = entityFromRequest(request, com.tramex.sisoprega.dto.EnterpriseRancher.class);
      if (enterpriseRancher.getEnterpriseId() == 0) {
        this.log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id del ganadero al intentar actualizar sus datos.",
            "proxy.EnterpriseRancher.Update"));
      } else {
        if (validateEntity(enterpriseRancher)) {
          dataModel.updateDataModel(enterpriseRancher);

          response.setUpdatedRecord(getContentFromEntity(enterpriseRancher, com.tramex.sisoprega.dto.EnterpriseRancher.class));
          response.setEntityName(request.getEntityName());
          response.setError(new Error("0", "SUCCESS", "proxy.EnterpriseRancher.Update"));
          this.log.info("EnterpriseRancher[" + enterpriseRancher.toString() + "] updated by principal[" + getLoggedUser() + "]");
        } else {
          this.log.warning("Validation error: " + error_description);
          response.setError(new Error("VAL01", "Error de validación de datos:" + error_description,
              "proxy.EnterpriseRancherBean.Update"));
        }
      }
    } catch (Exception e) {
      this.log.severe("Exception found while updating enterpriseRancher");
      this.log.throwing(this.getClass().getName(), "Update", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, "
            + "muy probablemente el contacto que usted quiere agregar ya se encuentra en la base de datos.",
            "proxy.EnterpriseContact.Update"));
      else {
        response.setError(new Error("DB02", "Error en la base de datos:[" + e.getMessage() + "]",
            "proxy.EnterpriseContact.Update"));
      }
    }

    this.log.exiting(this.getClass().getCanonicalName(), "Update");
    return response;
  }

  /**
   * @see Cruddable#Delete(GatewayRequest)
   */
  @Override
  public BaseResponse Delete(GatewayRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "Delete");

    BaseResponse response = new BaseResponse();
    try {

      EnterpriseRancher enterpriseRancher = entityFromRequest(request, EnterpriseRancher.class);
      if (enterpriseRancher.getEnterpriseId() == 0) {
        this.log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id del contacto al intentar eliminar el registro.",
            "proxy.EnterpriseContact.Delete"));
      } else {
        enterpriseRancher = dataModel.readSingleDataModel("ENTERPRISE_RANCHER_BY_ID", "enterpriseId",
            enterpriseRancher.getEnterpriseId(), EnterpriseRancher.class);
        this.log.info("Deleting EnterpriseRancher [" + enterpriseRancher.toString() + "] by principal[" + getLoggedUser() + "]");
        dataModel.deleteDataModel(enterpriseRancher, getLoggedUser());

        response.setError(new Error("0", "SUCCESS", "proxy.EnterpriseRancher.Delete"));
        this.log.info("EnterpriseRancher successfully deleted by principal [" + getLoggedUser() + "]");
      }
    } catch (Exception e) {
      this.log.severe("Exception found while deleting contact");
      this.log.throwing(this.getClass().getName(), "Delete", e);

      response.setError(new Error("DEL01",
          "Error al intentar borrar datos. Es muy probable que la entidad que usted quiere eliminar "
              + "cuente con otras entidades relacionadas.", "proxy.EnterpriseRancher.Delete"));
    }

    this.log.exiting(this.getClass().getCanonicalName(), "Delete");
    return response;
  }

  /**
   * Override functionality, evaluating over EnterpriseRancherBean for
   * duplicates.
   */
  @Override
  protected boolean validateEntity(Object entity) {
    boolean valid = super.validateEntity(entity);
    EnterpriseRancher rancher = (EnterpriseRancher) entity;

    if (valid) {
      // Validate address one.
      valid = rancher.getAddressOne().length() <= 100;
      if (!valid)
        error_description = "La dirección es más grande de lo permitido en la base de datos.";
    }

    if (valid) {
      valid = rancher.getAddressTwo().length() <= 100;
      if (!valid)
        error_description = "La dirección es más grande de lo permitido en la base de datos.";
    }

    if (valid) {
      valid = rancher.getCity().length() <= 80;
      if (!valid)
        error_description = "La ciudad es más grande de lo permitido en la base de datos.";
    }

    if (valid) {
      valid = rancher.getLegalId().length() <= 13;
      if (!valid)
        error_description = "El RFC es más grande de lo permitido en la base de datos.";
    }

    if (valid) {
      valid = rancher.getLegalName().length() <= 100;
      if (!valid)
        error_description = "La razón social es más grande de lo permitido en la base de datos.";
    }

    if (valid) {
      valid = rancher.getLegalName().trim().length() > 0;
      if (!valid)
        error_description = "La razón social de la empresa es un campo requerido en la base de datos.";
    }

    if (valid) {
      valid = rancher.getState().length() <= 80;
      if (!valid)
        error_description = "El estado de la dirección de la empresa es más grande de lo requerido.";
    }

    if (valid) {
      valid = rancher.getTelephone().length() <= 20;
      if (!valid)
        error_description = "El teléfono de la empresa es más grande de lo permitido en la base de datos.";
    }
    
    if (valid) {
        valid = rancher.getTelephone2().length() <= 20;
        if (!valid)
          error_description = "El teléfono 2 de la empresa es más grande de lo permitido en la base de datos.";
    }
    
    if (valid) {
        valid = rancher.getTelephone3().length() <= 20;
        if (!valid)
          error_description = "El teléfono 3 de la empresa es más grande de lo permitido en la base de datos.";
    }

    if (valid) {
      valid = rancher.getZipCode().length() <= 9;
      if (!valid)
        error_description = "El código postal de la empresa es más grande de lo permitido en la base de datos.";
    }

    if (valid && rancher.getEmail() != null && rancher.getEmail().trim().length() > 0) {
      valid = Utils.isValidEmail(rancher.getEmail());
      if (!valid)
        error_description = "La dirección de correo electrónico no cumple con un formato reconocible (correo@dominio.etc).";
    }

    if (valid) {
      valid = !duplicateRancher(rancher);
    }

    return valid;
  }

  private boolean duplicateRancher(EnterpriseRancher rancher) {

    boolean duplicate = false;

    duplicate = duplicateRFC(rancher);
    if (!duplicate) {
      duplicate = duplicateLegalName(rancher);
    }

    return duplicate;
  }

  private boolean duplicateRFC(EnterpriseRancher rancher) {

    Map<String, Object> parameters = new HashMap<String, Object>();
    parameters.put("rfc", rancher.getLegalId());
    List<RancherInvoice> invoices = dataModel.readDataModelList("RANCHER_INVOICE_BY_RFC", parameters, RancherInvoice.class);

    error_description = "El RFC ya esta en uso por otro ganadero";

    return !invoices.isEmpty();
  }

  private boolean duplicateLegalName(EnterpriseRancher rancher) {
    Map<String, Object> parameters = new HashMap<String, Object>();
    parameters.put("legalName", rancher.getLegalName());
    List<RancherInvoice> invoices = dataModel
        .readDataModelList("RANCHER_INVOICE_BY_LEGAL_NAME", parameters, RancherInvoice.class);

    error_description = "La razón social ya esta en uso por otro ganadero.";

    return !invoices.isEmpty();
  }

  private ReadGatewayResponse readLoggedRancherDetails(String entityName) throws IllegalArgumentException, IllegalAccessException {
    log.entering(this.getClass().getCanonicalName(), "readLoggedRancherReceptions");

    ReadGatewayResponse response = new ReadGatewayResponse();
    response.setEntityName(entityName);

    Map<String, Object> parameters = new HashMap<String, Object>();
    parameters.put("userName", getLoggedUser());

    List<RancherUser> ranchers = dataModel.readDataModelList("RANCHER_USER_BY_USER_NAME", parameters, RancherUser.class);

    if (!ranchers.isEmpty()) {
      RancherUser loggedRancher = ranchers.get(0);

      EnterpriseRancher rancher = dataModel.readSingleDataModel("ENTERPRISE_RANCHER_BY_ID", "enterpriseId",
          loggedRancher.getRancherId(), EnterpriseRancher.class);

      if (rancher != null) {
        List<EnterpriseRancher> rancherList = new LinkedList<EnterpriseRancher>();
        rancherList.add(rancher);

        response.getRecord().addAll(contentFromList(rancherList, EnterpriseRancher.class));

        response.setError(new Error("0", "SUCCESS", "proxy.RancherBean.Read"));
        log.info("Read operation RANCHER BY LOGGED RANCHER executed by principal[" + getLoggedUser() + "] on RancherBean");

      } else {
        response.setError(new Error("VAL02", "No se encontraron datos para el filtro seleccionado", "proxy.RancherBean.Read"));
      }
    } else {
      response.setError(new Error("VAL02", "No se encontraron datos para el filtro seleccionado", "proxy.Reception.Read"));
    }

    log.exiting(this.getClass().getCanonicalName(), "readLoggedRancherReceptions");
    return response;
  }

}
