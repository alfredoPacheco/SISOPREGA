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
import com.tramex.sisoprega.dto.EnterpriseContact;

/**
 * This proxy knows the logic to evaluate Enterprise rancher's Contact
 * information and the way to the database in order to save their data. Also, it
 * is contained in EJB container, we can apply security and life cycle methods
 * for resources.<BR/>
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 11/11/2012  Diego Torres                 Initial Version.
 * 12/05/2012  Diego Torres                 Adding validation and standard error codes.
 * 12/16/2012  Diego Torres                 Adding log activity
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 */
@Stateless
public class EnterpriseContactBean extends BaseBean implements Cruddable {

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
    EnterpriseContact contact = null;

    try {
      contact = entityFromRequest(request, EnterpriseContact.class);

      log.fine("Received contact in request: {" + contact + "}");

      if (validateEntity(contact)) {
        log.finer("Contact succesfully validated.");
        em.persist(contact);
        em.flush();
        log.finer("Contact persisted on database");

        String sId = String.valueOf(contact.getContactId());
        log.finer("Setting contactId in response: " + sId);
        response.setGeneratedId(sId);
        response.setError(new Error("0", "SUCCESS", "proxy.EnterpriseContact.Create"));
        log.info("Enterprise Contact [" + contact.toString() + "] created by principal[" + getLoggedUser() + "]");
      } else {
        log.warning("Error de validación: " + error_description);
        response.setError(new Error("VAL01", "Error de validación: " + error_description, "proxy.EnterpriseContact.Create"));
      }
    } catch (Exception e) {
      log.severe("Exception found while creating enterprise contact");
      log.throwing(this.getClass().getName(), "Create", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, "
            + "muy probablemente el contacto que usted quiere agregar ya existe en la base de datos.",
            "proxy.EnterpriseContact.Create"));
      else {
        response.setError(new Error("DB02", "Create exception: " + e.getMessage(), "proxy.EnterpriseContact.Create"));
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

    EnterpriseContact contact = null;
    try {
      contact = entityFromRequest(request, EnterpriseContact.class);

      log.fine("Got contact from request: " + contact);
      TypedQuery<EnterpriseContact> readQuery = null;
      String qryLogger = "";
      if (contact.getEnterpriseId() != 0) {
        readQuery = em.createNamedQuery("ENTERPRISE_CONTACT_BY_ENTERPRISE_ID", EnterpriseContact.class);
        readQuery.setParameter("enterpriseId", contact.getEnterpriseId());
        qryLogger = "By enterpriseId [" + contact.getEnterpriseId() + "]";
      } else if (contact.getContactId() != 0) {
        readQuery = em.createNamedQuery("ENTERPRISE_CONTACT_BY_ID", EnterpriseContact.class);
        readQuery.setParameter("contactId", contact.getContactId());
        qryLogger = "By contactId [" + contact.getContactId() + "]";
      } else {
        response.setError(new Error("VAL03", "El filtro especificado no es válido en el catálogo de contactos",
            "proxy.EnterpriseContact.Read"));
        return response;
      }

      List<EnterpriseContact> queryResults = readQuery.getResultList();

      if (queryResults.isEmpty()) {
        response.setError(new Error("VAL02", "No se encontraron datos para el filtro seleccionado",
            "proxy.EnterpriseContact.Read"));
      } else {
        List<GatewayContent> records = contentFromList(queryResults, EnterpriseContact.class);
        response.getRecord().addAll(records);

        response.setError(new Error("0", "SUCCESS", "proxy.EnterpriseContact.Read"));
        log.info("Read operation " + qryLogger + " executed by principal[" + getLoggedUser() + "] on EnterpriseContactBean");
      }

    } catch (Exception e) {
      // something went wrong, alert the server and respond the client
      log.severe("Exception found while reading enterprise contact");
      log.throwing(this.getClass().getCanonicalName(), "Read", e);

      response.setError(new Error("DB02", "Read exception: " + e.getMessage(), "proxy.EnterpriseContact.Read"));
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
    EnterpriseContact contact = null;
    try {
      contact = entityFromRequest(request, EnterpriseContact.class);

      if (contact.getContactId() == 0) {
        log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id del contacto al intentar actualizar sus datos.",
            "proxy.EnterpriseContact.Update"));
      } else {
        if (validateEntity(contact)) {
          em.merge(contact);
          em.flush();

          GatewayContent content = getContentFromEntity(contact, EnterpriseContact.class);
          response.setUpdatedRecord(content);

          response.setError(new Error("0", "SUCCESS", "proxy.EnterpriseContact.Update"));
          log.info("EnterpriseContact[" + contact.toString() + "] updated by principal[" + getLoggedUser() + "]");
        } else {
          log.warning("Validation error: " + error_description);
          response.setError(new Error("VAL01", "Error de validación de datos:" + error_description,
              "proxy.EnterpriseContact.Update"));
        }
      }

    } catch (Exception e) {
      log.severe("Exception found while updating EnterpriseContactBean");
      log.throwing(this.getClass().getName(), "Update", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, "
            + "muy probablemente el contacto que usted quiere agregar ya se encuentra en la base de datos.",
            "proxy.EnterpriseContact.Update"));
      else {
        response.setError(new Error("DB02", "Error en la base de datos:[" + e.getMessage() + "]",
            "proxy.EnterpriseContact.Update"));
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
      EnterpriseContact contact = entityFromRequest(request, EnterpriseContact.class);
      if (contact.getContactId() == 0) {
        log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id del contacto al intentar eliminar el registro.",
            "proxy.EnterpriseContact.Delete"));
      } else {
        TypedQuery<EnterpriseContact> readQuery = em.createNamedQuery("ENTERPRISE_CONTACT_BY_ID", EnterpriseContact.class);
        readQuery.setParameter("contactId", contact.getContactId());
        contact = readQuery.getSingleResult();
        log.info("Deleting EnterpriseContact [" + contact.toString() + "] by principal[" + getLoggedUser() + "]");
        em.merge(contact);
        em.remove(contact);
        em.flush();

        response.setError(new Error("0", "SUCCESS", "proxy.EnterpriseContact.Delete"));
        log.info("EnterpriseContact successfully deleted by principal [" + getLoggedUser() + "]");
      }
    } catch (Exception e) {
      log.severe("Exception found while deleting contact");
      log.throwing(this.getClass().getName(), "Delete", e);

      response.setError(new Error("DEL01",
          "Error al intentar borrar datos. Por favor comunique el error al soporte de aplicaciones.",
          "proxy.EnterpriseContact.Delete"));
    }

    log.exiting(this.getClass().getCanonicalName(), "Delete");
    return response;
  }

  @Override
  protected boolean validateEntity(Object entity) {
    boolean valid = super.validateEntity(entity);
    EnterpriseContact contact = (EnterpriseContact) entity;
    
    // Validate address One
    if(valid){
      valid = contact.getAddressOne().length()<=100;
      if (!valid)
        error_description = "La dirección del contacto excede el tamaño permitido en la base de datos.";
    }
    
    if(valid){
      valid = contact.getAddressState().length()<=80;
      if(!valid)
        error_description = "El estado (Entidad Federativa) de la dirección excede el tamaño permitido en la base de datos.";
    }
    
    if(valid){
      valid = contact.getAddressTwo().length()<=100;
      if(!valid)
        error_description = "La línea secundaria de la dirección excede el tamaño permitido en la base de datos.";
    }
    
    if(valid){
      valid = contact.getAka().length()<=100;
      if(!valid)
        error_description = "El alias del contacto excede el tamaño permitido en la base de datos.";
    }
    
    if(valid){
      valid = contact.getCity().length()<=80;
      if(!valid)
        error_description = "El nombre de la ciudad del contacto excede el tamaño permitido en la base de datos.";
    }
    
    if(valid){
      valid = contact.getEmailAddress().length()<=150;
      if(!valid)
        error_description = "La dirección de correo electrónico excede el tamaño permitido en la base de datos.";
    }
    
    if(valid && contact.getEmailAddress() != null && contact.getEmailAddress().length()>0){
      valid = Utils.isValidEmail(contact.getEmailAddress());
      if(!valid)
        error_description = "La dirección de correo electrónico no cumple con un formato reconocible (correo@dominio.etc).";
    }
    
    if(valid){
      valid = contact.getFirstName().length()<=50;
      if(!valid)
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
    
    if(valid){
      valid = contact.getMotherName().length()<=50;
      if(!valid)
        error_description = "El apellido materno del contacto excede el tamaño permitido en la base de datos.";
    }
    
    if(valid){
      valid = contact.getTelephone().length()<=20;
      if(!valid)
        error_description = "El teléfono del contacto excede el tamaño permitido en la base de datos.";
    }
    
    if(valid){
      valid = contact.getZipCode().length()<=9;
      if(!valid)
        error_description = "El código postal de la dirección del contacto excede el tamaño permitido en la base de datos.";
    }
    
    if (valid) {
      valid = enterpriseExists(contact);
    }
    
    return valid;
  }

  private boolean enterpriseExists(EnterpriseContact contact) {
    boolean exists = true;

    TypedQuery<com.tramex.sisoprega.dto.EnterpriseRancher> readQuery = null;

    readQuery = em.createNamedQuery("ENTERPRISE_RANCHER_BY_ID", com.tramex.sisoprega.dto.EnterpriseRancher.class);
    readQuery.setParameter("enterpriseId", contact.getEnterpriseId());

    try {
      com.tramex.sisoprega.dto.EnterpriseRancher enterprise = readQuery.getSingleResult();
      exists = enterprise != null;
    } catch (NoResultException e) {
      exists = false;
      error_description = "La empresa " + contact.getEnterpriseId() + " a la cual desea agregar el contacto, "
          + "no existe en la base de datos.";
    }

    return exists;
  }

}
