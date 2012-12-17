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
import javax.persistence.NoResultException;
import javax.persistence.TypedQuery;

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
    log.entering(this.getClass().getCanonicalName(), "Create");

    CreateGatewayResponse response = new CreateGatewayResponse();
    RancherContact contact = null;

    try {
      contact = entityFromRequest(request, RancherContact.class);

      log.fine("Received contact in request: {" + contact + "}");

      if (validateEntity(contact)) {
        em.persist(contact);
        em.flush();

        String sId = String.valueOf(contact.getContactId());
        response.setGeneratedId(sId);
        response.setError(new Error("0", "SUCCESS", "proxy.RancherContact.Create"));
        log.info("Rancher Contact [" + contact.toString() + "] created by principal[" + getLoggedUser() + "]");
      } else {
        log.warning("Validation error:" + error_description);
        response.setError(new Error("VAL01", "Error de validación de datos:" + error_description, "proxy.RancherContact.Create"));
      }
    } catch (Exception e) {
      log.severe("Exception found while creating rancher contact");
      log.throwing(this.getClass().getName(), "Create", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, "
            + "muy probablemente el contacto que usted quiere agregar ya existe en la base de datos.",
            "proxy.RancherContact.Create"));
      else {
        response.setError(new Error("DB02", "Error en la base de datos:[" + e.getMessage() + "]", "proxy.RancherContact.Create"));
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

    RancherContact contact = null;
    try {
      contact = entityFromRequest(request, RancherContact.class);

      log.fine("Got contact from request: " + contact);

      TypedQuery<RancherContact> readQuery = null;
      String qryLogger  = "";
      if (contact.getRancherId() != 0) {
        readQuery = em.createNamedQuery("RANCHER_CONTACT_BY_RANCHER_ID", RancherContact.class);
        readQuery.setParameter("rancherId", contact.getRancherId());
        qryLogger = "By rancherId [" + contact.getRancherId() + "]";
      } else if (contact.getContactId() != 0) {
        readQuery = em.createNamedQuery("RANCHER_CONTACT_BY_ID", RancherContact.class);
        readQuery.setParameter("contactId", contact.getContactId());
        qryLogger = "By contactId [" + contact.getContactId() + "]";
      } else {
        response.setError(new Error("VAL03", "El filtro especificado no es válido en el catálogo de contactos.",
            "proxy.RancherContact.Read"));
        return response;
      }

      List<RancherContact> queryResults = readQuery.getResultList();

      if (queryResults.isEmpty()) {
        response.setError(new Error("VAL02", "No se encontraron datos para el filtro seleccionado", "proxy.RancherContact.Read"));
      } else {
        List<GatewayContent> records = contentFromList(queryResults, RancherContact.class);
        response.getRecord().addAll(records);

        response.setError(new Error("0", "SUCCESS", "proxy.RancherContact.Read"));
        log.info("Read operation " + qryLogger + " executed by principal[" + getLoggedUser() + "] on RancherContactBean");
      }

    } catch (Exception e) {
      // something went wrong, alert the server and respond the client
      log.severe("Exception found while reading rancher contact");
      log.throwing(this.getClass().getCanonicalName(), "Read", e);

      response.setError(new Error("DB02", "Error en la base de datos: " + e.getMessage(), "proxy.RancherContact.Read"));
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
    RancherContact contact = null;
    try {
      contact = entityFromRequest(request, RancherContact.class);

      if (contact.getContactId() == 0) {
        log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id del contacto al intentar actualizar sus datos.",
            "proxy.RancherContactBean.Update"));
      } else {
        // Received Id.
        if (validateEntity(contact)) {
          em.merge(contact);
          em.flush();

          GatewayContent content = getContentFromEntity(contact, RancherContact.class);
          response.setUpdatedRecord(content);

          response.setError(new Error("0", "SUCCESS", "proxy.RancherContact.Update"));
          log.info("Rancher Contact [" + contact.toString() + "] updated by principal[" + getLoggedUser() + "]");
        } else {
          log.warning("Validation error: " + error_description);
          response.setError(new Error("VAL01", "Error de validación de datos: " + error_description,
              "proxy.RancherContact.Update"));
        }
      }
    } catch (Exception e) {
      log.severe("Exception found while updating RanacherContact");
      log.throwing(this.getClass().getName(), "Update", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, "
            + "muy probablemente el contacto que usted quiere agregar ya existe en la base de datos.",
            "proxy.RancherContact.Create"));
      else {
        response.setError(new Error("DB02", "Error en la base de datos:[" + e.getMessage() + "]", "proxy.RancherContact.Update"));
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
      RancherContact contact = entityFromRequest(request, RancherContact.class);
      if (contact.getContactId() == 0) {
        log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id del contacto al intentar eliminar el registro.",
            "proxy.RancherContactBean.Delete"));
      } else {
        TypedQuery<RancherContact> readQuery = em.createNamedQuery("RANCHER_CONTACT_BY_ID", RancherContact.class);
        readQuery.setParameter("contactId", contact.getContactId());
        contact = readQuery.getSingleResult();
        log.info("Deleting Rancher Contact [" + contact.toString() + "] by principal[" + getLoggedUser() + "]");
        em.merge(contact);
        em.remove(contact);
        em.flush();

        response.setError(new Error("0", "SUCCES", "proxy.RancherContact.Delete"));
        log.info("Rancher Contact successfully deleted by principal [" + getLoggedUser() + "]");
      }
    } catch (Exception e) {
      log.severe("Exception found while deleting contact");
      log.throwing(this.getClass().getName(), "Delete", e);

      response.setError(new Error("DEL01",
          "Error al intentar borrar datos. Es muy probable que la entidad que usted quiere eliminar "
              + "cuente con otras entidades relacionadas.", "proxy.RancherContactBean.Delete"));
    }

    log.exiting(this.getClass().getCanonicalName(), "Delete");
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
        error_description = "La dirección del contacto excede el tamaño permitido en la base de datos.";
    }

    if (valid) {
      valid = contact.getAddressState().length() <= 80;
      if (!valid)
        error_description = "El estado (Entidad Federativa) de la dirección excede el tamaño permitido en la base de datos.";
    }

    if (valid) {
      valid = contact.getAddressTwo().length() <= 100;
      if (!valid)
        error_description = "La línea secundaria de la dirección excede el tamaño permitido en la base de datos.";
    }

    if (valid) {
      valid = contact.getAka().length() <= 100;
      if (!valid)
        error_description = "El alias del contacto excede el tamaño permitido en la base de datos.";
    }

    if (valid) {
      valid = contact.getCity().length() <= 80;
      if (!valid)
        error_description = "El nombre de la ciudad del contacto excede el tamaño permitido en la base de datos.";
    }

    if (valid) {
      valid = contact.getEmailAddress().length() <= 150;
      if (!valid)
        error_description = "La dirección de correo electrónico excede el tamaño permitido en la base de datos.";
    }

    if (valid && contact.getEmailAddress() != null && contact.getEmailAddress().length() > 0) {
      valid = Utils.isValidEmail(contact.getEmailAddress());
      if (!valid)
        error_description = "La dirección de correo electrónico no cumple con un formato reconocible (correo@dominio.etc).";
    }

    if (valid) {
      valid = contact.getFirstName().length() <= 50;
      if (!valid)
        error_description = "El nombre del contacto excede el tamaño permitido en la base de datos.";
    }

    if (valid) {
      valid = contact.getFirstName().trim().length() > 0;
      if (!valid)
        error_description = "El nombre del contacto es un campo requerido.";
    }

    if (valid) {
      valid = contact.getLastName().length() <= 50;
      if (!valid)
        error_description = "El apellido paterno del contacto excede el tamaño permitido en la base de datos.";
    }

    if (valid) {
      valid = contact.getLastName().trim().length() > 0;
      if (!valid)
        error_description = "El apellido del contact es un campo requerido.";
    }

    if (valid) {
      valid = contact.getMotherName().length() <= 50;
      if (!valid)
        error_description = "El apellido materno del contacto excede el tamaño permitido en la base de datos.";
    }

    if (valid) {
      valid = contact.getTelephone().length() <= 20;
      if (!valid)
        error_description = "El teléfono del contacto excede el tamaño permitido en la base de datos.";
    }

    if (valid) {
      valid = contact.getZipCode().length() <= 9;
      if (!valid)
        error_description = "El código postal de la dirección del contacto excede el tamaño permitido en la base de datos.";
    }

    if (valid) {
      valid = rancherExists(contact);
    }

    return valid;
  }

  private boolean rancherExists(RancherContact contact) {
    boolean exists = true;

    TypedQuery<com.tramex.sisoprega.dto.Rancher> readQuery = null;

    readQuery = em.createNamedQuery("RANCHER_BY_ID", com.tramex.sisoprega.dto.Rancher.class);
    readQuery.setParameter("rancherId", contact.getRancherId());

    try {
      com.tramex.sisoprega.dto.Rancher enterprise = readQuery.getSingleResult();
      exists = enterprise != null;
    } catch (NoResultException e) {
      exists = false;
      error_description = "RancherId " + contact.getRancherId() + " does not exists on database";
    }

    return exists;
  }

}
