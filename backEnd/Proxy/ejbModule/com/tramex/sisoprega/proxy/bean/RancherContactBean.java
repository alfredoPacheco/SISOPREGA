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
import com.tramex.sisoprega.common.GatewayContent;
import com.tramex.sisoprega.common.GatewayRequest;
import com.tramex.sisoprega.common.ReadGatewayResponse;
import com.tramex.sisoprega.common.UpdateGatewayResponse;
import com.tramex.sisoprega.common.Utils;
import com.tramex.sisoprega.common.crud.Cruddable;
import com.tramex.sisoprega.dto.RancherContact;

/**
 * This proxy knows the logic to evaluate RancherBean's Contact information and
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
 * 11/11/2012  Diego Torres                 Initial Version.
 * 12/08/2012  Diego Torres                 Fixing standard error codes and validation.
 * 12/16/2012  Diego Torres                 Adding log activity
 * 01/22/2013  Diego Torres                  Implementing DataModel.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 */
@Stateless
public class RancherContactBean extends BaseBean implements Cruddable {

  /*
   * (non-Javadoc)
   * 
   * @see com.tramex.sisoprega.common.crud.Cruddable#Create(com.tramex.sisoprega
   * .common.GatewayRequest)
   */
  @Override
  public CreateGatewayResponse Create(GatewayRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "Create");

    CreateGatewayResponse response = new CreateGatewayResponse();
    RancherContact contact = null;

    try {
      contact = entityFromRequest(request, RancherContact.class);

      this.log.fine("Received contact in request: {" + contact + "}");

      if (validateEntity(contact)) {
        dataModel.createDataModel(contact);

        String sId = String.valueOf(contact.getContactId());
        response.setGeneratedId(sId);
        response.setError(new Error("0", "SUCCESS", "proxy.RancherContact.Create"));
        this.log.info("Rancher Contact [" + contact.toString() + "] created by principal[" + getLoggedUser() + "]");
      } else {
        this.log.warning("Validation error:" + error_description);
        response.setError(new Error("VAL01", "Error de validaci�n de datos:" + error_description, "proxy.RancherContact.Create"));
      }
    } catch (Exception e) {
      this.log.severe("Exception found while creating rancher contact");
      this.log.throwing(this.getClass().getName(), "Create", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, "
            + "muy probablemente el contacto que usted quiere agregar ya existe en la base de datos.",
            "proxy.RancherContact.Create"));
      else {
        response.setError(new Error("DB02", "Error en la base de datos:[" + e.getMessage() + "]", "proxy.RancherContact.Create"));
      }
    }

    this.log.exiting(this.getClass().getCanonicalName(), "Create");
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
    this.log.entering(this.getClass().getCanonicalName(), "Read");

    ReadGatewayResponse response = new ReadGatewayResponse();
    response.setEntityName(request.getEntityName());

    RancherContact contact = null;
    try {
      contact = entityFromRequest(request, RancherContact.class);

      this.log.fine("Got contact from request: " + contact);

      String qryLogger = "";
      String queryName = "";
      Map<String, Object> parameters = new HashMap<String, Object>();
      if (contact.getRancherId() != 0) {
        queryName = "RANCHER_CONTACT_BY_RANCHER_ID";
        parameters.put("rancherId", contact.getRancherId());
        qryLogger = "By rancherId [" + contact.getRancherId() + "]";
      } else if (contact.getContactId() != 0) {
        queryName = "RANCHER_CONTACT_BY_ID";
        parameters.put("contactId", contact.getContactId());
        qryLogger = "By contactId [" + contact.getContactId() + "]";
      } else {
        response.setError(new Error("VAL03", "El filtro especificado no es v�lido en el cat�logo de contactos.",
            "proxy.RancherContact.Read"));
        return response;
      }

      List<RancherContact> queryResults = dataModel.readDataModelList(queryName, parameters, RancherContact.class);

      if (queryResults.isEmpty()) {
        response.setError(new Error("VAL02", "No se encontraron datos para el filtro seleccionado", "proxy.RancherContact.Read"));
      } else {
        List<GatewayContent> records = contentFromList(queryResults, RancherContact.class);
        response.getRecord().addAll(records);

        response.setError(new Error("0", "SUCCESS", "proxy.RancherContact.Read"));
        this.log.info("Read operation " + qryLogger + " executed by principal[" + getLoggedUser() + "] on RancherContactBean");
      }

    } catch (Exception e) {
      // something went wrong, alert the server and respond the client
      this.log.severe("Exception found while reading rancher contact");
      this.log.throwing(this.getClass().getCanonicalName(), "Read", e);

      response.setError(new Error("DB02", "Error en la base de datos: " + e.getMessage(), "proxy.RancherContact.Read"));
    }

    this.log.exiting(this.getClass().getCanonicalName(), "Read");
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
    this.log.entering(this.getClass().getCanonicalName(), "Update");
    UpdateGatewayResponse response = new UpdateGatewayResponse();
    RancherContact contact = null;
    try {
      contact = entityFromRequest(request, RancherContact.class);

      if (contact.getContactId() == 0) {
        this.log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id del contacto al intentar actualizar sus datos.",
            "proxy.RancherContactBean.Update"));
      } else {
        // Received Id.
        if (validateEntity(contact)) {
          dataModel.updateDataModel(contact);

          GatewayContent content = getContentFromEntity(contact, RancherContact.class);
          response.setUpdatedRecord(content);

          response.setError(new Error("0", "SUCCESS", "proxy.RancherContact.Update"));
          this.log.info("Rancher Contact [" + contact.toString() + "] updated by principal[" + getLoggedUser() + "]");
        } else {
          this.log.warning("Validation error: " + error_description);
          response.setError(new Error("VAL01", "Error de validaci�n de datos: " + error_description,
              "proxy.RancherContact.Update"));
        }
      }
    } catch (Exception e) {
      this.log.severe("Exception found while updating RanacherContact");
      this.log.throwing(this.getClass().getName(), "Update", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, "
            + "muy probablemente el contacto que usted quiere agregar ya existe en la base de datos.",
            "proxy.RancherContact.Create"));
      else {
        response.setError(new Error("DB02", "Error en la base de datos:[" + e.getMessage() + "]", "proxy.RancherContact.Update"));
      }
    }

    this.log.exiting(this.getClass().getCanonicalName(), "Update");
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
    this.log.entering(this.getClass().getCanonicalName(), "Delete");
    BaseResponse response = new BaseResponse();

    try {
      RancherContact contact = entityFromRequest(request, RancherContact.class);
      if (contact.getContactId() == 0) {
        this.log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id del contacto al intentar eliminar el registro.",
            "proxy.RancherContactBean.Delete"));
      } else {
        contact = dataModel.readSingleDataModel("RANCHER_CONTACT_BY_ID", "contactId", contact.getContactId(), RancherContact.class);
        this.log.info("Deleting RancherContact [" + contact.toString() + "] by principal[" + getLoggedUser() + "]");
        dataModel.deleteDataModel(contact, getLoggedUser());
        response.setError(new Error("0", "SUCCES", "proxy.RancherContact.Delete"));
      }
    } catch (Exception e) {
      this.log.severe("Exception found while deleting contact");
      this.log.throwing(this.getClass().getName(), "Delete", e);

      response.setError(new Error("DEL01",
          "Error al intentar borrar datos. Es muy probable que la entidad que usted quiere eliminar "
              + "cuente con otras entidades relacionadas.", "proxy.RancherContactBean.Delete"));
    }

    this.log.exiting(this.getClass().getCanonicalName(), "Delete");
    return response;
  }

  @Override
  protected boolean validateEntity(Object entity) {
    boolean valid = true;
    valid = super.validateEntity(entity);

    RancherContact contact = (RancherContact) entity;

    // Validate address One
    if (valid) {
      valid = contact.getAddressOne().length() <= 100;
      if (!valid)
        error_description = "La direcci�n del contacto excede el tama�o permitido en la base de datos.";
    }

    if (valid) {
      valid = contact.getAddressState().length() <= 80;
      if (!valid)
        error_description = "El estado (Entidad Federativa) de la direcci�n excede el tama�o permitido en la base de datos.";
    }

    if (valid) {
      valid = contact.getAddressTwo().length() <= 100;
      if (!valid)
        error_description = "La l�nea secundaria de la direcci�n excede el tama�o permitido en la base de datos.";
    }

    if (valid) {
      valid = contact.getAka().length() <= 100;
      if (!valid)
        error_description = "El alias del contacto excede el tama�o permitido en la base de datos.";
    }

    if (valid) {
      valid = contact.getCity().length() <= 80;
      if (!valid)
        error_description = "El nombre de la ciudad del contacto excede el tama�o permitido en la base de datos.";
    }

    if (valid) {
      valid = contact.getEmailAddress().length() <= 150;
      if (!valid)
        error_description = "La direcci�n de correo electr�nico excede el tama�o permitido en la base de datos.";
    }

    if (valid && contact.getEmailAddress() != null && contact.getEmailAddress().length() > 0) {
      valid = Utils.isValidEmail(contact.getEmailAddress());
      if (!valid)
        error_description = "La direcci�n de correo electr�nico no cumple con un formato reconocible (correo@dominio.etc).";
    }

    if (valid) {
      valid = contact.getFirstName().length() <= 50;
      if (!valid)
        error_description = "El nombre del contacto excede el tama�o permitido en la base de datos.";
    }

    if (valid) {
      valid = contact.getFirstName().trim().length() > 0;
      if (!valid)
        error_description = "El nombre del contacto es un campo requerido.";
    }

    if (valid) {
      valid = contact.getLastName().length() <= 50;
      if (!valid)
        error_description = "El apellido paterno del contacto excede el tama�o permitido en la base de datos.";
    }

    if (valid) {
      valid = contact.getLastName().trim().length() > 0;
      if (!valid)
        error_description = "El apellido del contact es un campo requerido.";
    }

    if (valid) {
      valid = contact.getMotherName().length() <= 50;
      if (!valid)
        error_description = "El apellido materno del contacto excede el tama�o permitido en la base de datos.";
    }

    if (valid) {
      valid = contact.getTelephone().length() <= 20;
      if (!valid)
        error_description = "El tel�fono del contacto excede el tama�o permitido en la base de datos.";
    }

    if (valid) {
      valid = contact.getZipCode().length() <= 9;
      if (!valid)
        error_description = "El c�digo postal de la direcci�n del contacto excede el tama�o permitido en la base de datos.";
    }

    return valid;
  }
}
