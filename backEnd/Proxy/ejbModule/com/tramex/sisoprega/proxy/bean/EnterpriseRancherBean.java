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
import com.tramex.sisoprega.common.GatewayRequest;
import com.tramex.sisoprega.common.ReadGatewayResponse;
import com.tramex.sisoprega.common.UpdateGatewayResponse;
import com.tramex.sisoprega.common.crud.Cruddable;
import com.tramex.sisoprega.dto.EnterpriseRancher;

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
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 */
@Stateless
public class EnterpriseRancherBean extends BaseBean implements Cruddable {

  /**
   * @see Cruddable#Create(GatewayRequest)
   */
  @Override
  public CreateGatewayResponse Create(GatewayRequest request) {
    log.entering(EnterpriseRancherBean.class.getCanonicalName(), "Create");

    CreateGatewayResponse response = new CreateGatewayResponse();
    EnterpriseRancher enterpriseRancher = null;
    try {
      enterpriseRancher = entityFromRequest(request, EnterpriseRancher.class);

      log.fine("Received enterprise rancher in request: {" + enterpriseRancher.toString() + "}");

      if (validateEntity(enterpriseRancher)) {
        log.finer("Enterprise RancherBean succesfully validated");
        em.persist(enterpriseRancher);
        em.flush();
        log.finer("Enterprise RancherBean persisted on database");

        String sId = String.valueOf(enterpriseRancher.getEnterpriseId());
        log.finer("Setting enterprise rancher id in response [" + sId + "]");

        response.setGeneratedId(sId);
        response.setError(new Error("0", "SUCCESS", "proxy.EnterpriseRancher.Create"));
      } else {
        // Set validation error
        log.warning("Error de validación: " + error_description);
        response.setError(new Error("VAL01", "Error de validación: " + error_description, "proxy.EnterpriseRancherBean.Create"));
      }
    } catch (Exception e) {
      // Set exception details
      log.severe("Exception found while create enterprise rancher");
      log.throwing(this.getClass().getName(), "Create", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, "
            + "muy probablemente el ganadero que usted quiere agregar ya existe en la base de datos.",
            "proxy.EnterpriseRAncherBean.Create"));
      else {
        response.setError(new Error("DB02", "Create exception: " + e.getMessage(), "proxy.EnterpriseRancherBean.Create"));
      }
    }

    log.exiting(EnterpriseRancherBean.class.getCanonicalName(), "Create");
    return response;
  }

  /**
   * @see Cruddable#Read(GatewayRequest)
   */
  @Override
  public ReadGatewayResponse Read(GatewayRequest request) {
    log.entering(this.getClass().getCanonicalName(), "Read");

    ReadGatewayResponse response = new ReadGatewayResponse();
    response.setEntityName(request.getEntityName());

    EnterpriseRancher enterpriseRancher = null;
    try {
      enterpriseRancher = entityFromRequest(request, EnterpriseRancher.class);
      log.fine("Got rancher from request: " + enterpriseRancher);

      TypedQuery<EnterpriseRancher> readQuery = null;

      if (enterpriseRancher.getEnterpriseId() != 0) {
        readQuery = em.createNamedQuery("ENTERPRISE_RANCHER_BY_ID", EnterpriseRancher.class);
        log.fine("Query by Id: " + enterpriseRancher.getEnterpriseId());
        readQuery.setParameter("enterpriseId", enterpriseRancher.getEnterpriseId());
      } else {
        // No other filter expected for enterprise ranchers, return all
        readQuery = em.createNamedQuery("ALL_ENTERPRISE_RANCHERS", EnterpriseRancher.class);
      }

      // Query the results through the jpa using a typedQuery
      List<EnterpriseRancher> queryResults = readQuery.getResultList();

      if (queryResults.isEmpty()) {
        response.setError(new Error("VAL02", "No se encontraron datos para el filtro seleccionado",
            "proxy.EnterpriseRancherBean.Read"));
      } else {
        // Add query results to response
        response.getRecord().addAll(contentFromList(queryResults, EnterpriseRancher.class));

        // Add success message to response
        response.setError(new Error("0", "SUCCESS", "proxy.EnterpriseRancher.Read"));
      }
    } catch (Exception e) {
      // something went wrong, alert the server and respond the client
      log.severe("Exception found while reading enterprise contact");
      log.throwing(this.getClass().getCanonicalName(), "Read", e);

      response.setError(new Error("DB02", "Read exception: " + e.getMessage(), "proxy.EnterpriseRancherBean.Read"));
    }

    // end and respond.
    log.exiting(this.getClass().getCanonicalName(), "Read");
    return response;
  }

  /**
   * @see Cruddable#Update(GatewayRequest)
   */
  @Override
  public UpdateGatewayResponse Update(GatewayRequest request) {
    log.entering(this.getClass().getCanonicalName(), "Update");
    UpdateGatewayResponse response = new UpdateGatewayResponse();
    com.tramex.sisoprega.dto.EnterpriseRancher enterpriseRancher = null;
    try {
      enterpriseRancher = entityFromRequest(request, com.tramex.sisoprega.dto.EnterpriseRancher.class);
      if (enterpriseRancher.getEnterpriseId() == 0) {
        log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id del ganadero al intentar actualizar sus datos.",
            "proxy.EnterpriseRancher.Update"));
      } else {
        if (validateEntity(enterpriseRancher)) {
          em.merge(enterpriseRancher);
          em.flush();

          response.setUpdatedRecord(getContentFromEntity(enterpriseRancher, com.tramex.sisoprega.dto.EnterpriseRancher.class));
          response.setEntityName(request.getEntityName());
          response.setError(new Error("0", "SUCCESS", "proxy.EnterpriseRancher.Update"));
        } else {
          log.warning("Validation error: " + error_description);
          response.setError(new Error("VAL01", "Error de validación de datos:" + error_description,
              "proxy.EnterpriseRancherBean.Update"));
        }
      }
    } catch (Exception e) {
      log.severe("Exception found while updating enterpriseRancher");
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

  /**
   * @see Cruddable#Delete(GatewayRequest)
   */
  @Override
  public BaseResponse Delete(GatewayRequest request) {
    log.entering(this.getClass().getCanonicalName(), "Delete");

    BaseResponse response = new BaseResponse();
    try {

      EnterpriseRancher enterpriseRancher = entityFromRequest(request, EnterpriseRancher.class);
      if (enterpriseRancher.getEnterpriseId() == 0) {
        log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id del contacto al intentar eliminar el registro.",
            "proxy.EnterpriseContact.Delete"));
      } else {
        TypedQuery<EnterpriseRancher> readQuery = em.createNamedQuery("ENTERPRISE_RANCHER_BY_ID", EnterpriseRancher.class);
        readQuery.setParameter("enterpriseId", enterpriseRancher.getEnterpriseId());
        enterpriseRancher = readQuery.getSingleResult();
        em.merge(enterpriseRancher);
        em.remove(enterpriseRancher);
        em.flush();

        response.setError(new Error("0", "SUCCESS", "proxy.EnterpriseRancher.Delete"));
      }
    } catch (Exception e) {
      log.severe("Exception found while deleting contact");
      log.throwing(this.getClass().getName(), "Delete", e);

      response.setError(new Error("DEL01",
          "Error al intentar borrar datos. Es muy probable que la entidad que usted quiere eliminar "
              + "cuente con otras entidades relacionadas.", "proxy.EnterpriseRancher.Delete"));
    }

    log.exiting(this.getClass().getCanonicalName(), "Delete");
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
      // Validar vacio en address one.
      valid = rancher.getAddressOne().trim().length() > 0;
      if (!valid)
        error_description = "La direccion de la empresa es requerida.";
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
      valid = rancher.getCity().trim().length() > 0;
      if (!valid)
        error_description = "La ciudad en la dirección de la empresa es un campo requerido.";
    }

    if (valid) {
      valid = rancher.getLegalId().length() <= 13;
      if (!valid)
        error_description = "El RFC es más grande de lo permitido en la base de datos.";
    }

    if (valid) {
      valid = rancher.getLegalId().trim().length() > 0;
      if(!valid)
        error_description = "El RFC de la empresa es un campo requerido.";
    }
    
    if(valid){
      valid = rancher.getLegalName().length() <= 100;
      if(!valid)
        error_description = "La razón social es un campo requerido en la base de datos.";
    }
    
    if(valid){
      valid = rancher.getLegalName().trim().length() >0;
      if(!valid)
        error_description = "La razón social de la empresa es un campo requerido en la base de datos.";
    }
    
    if(valid){
      valid = rancher.getState().length() <= 80;
      if(!valid)
        error_description = "El estado de la dirección de la empresa es más grande de lo requerido.";
    }
    
    if(valid){
      valid = rancher.getState().trim().length() > 0;
      if(!valid)
        error_description = "El estado de la dirección de la empresa es un campo requerido.";
    }
    
    if(valid){
      valid = rancher.getTelephone().length()<=20;
      if(!valid)
        error_description = "El teléfono de la empresa es más grande de lo permitido en la base de datos.";
    }
    
    if(valid){
      valid = rancher.getZipCode().length()<=9;
      if(!valid)
        error_description = "El código postal de la empresa es más grande de lo permitido en la base de datos.";
    }
    
    if(valid){
      valid = rancher.getZipCode().trim().length() > 0;
      if(!valid)
        error_description = "El código postal de la empresa es un campo requerido.";
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

  private boolean duplicateRFC(com.tramex.sisoprega.dto.EnterpriseRancher rancher) {
    boolean duplicate = false;

    TypedQuery<com.tramex.sisoprega.dto.RancherInvoice> readQuery = null;

    readQuery = em.createNamedQuery("RANCHER_INVOICE_BY_RFC", com.tramex.sisoprega.dto.RancherInvoice.class);
    readQuery.setParameter("rfc", rancher.getLegalId());

    try {
      com.tramex.sisoprega.dto.RancherInvoice enterprise = readQuery.getSingleResult();
      duplicate = enterprise != null;
      error_description = "RFC (legal_id) is already in use by a rancher";
    } catch (NoResultException e) {
      duplicate = false;
    }

    return duplicate;
  }

  private boolean duplicateLegalName(com.tramex.sisoprega.dto.EnterpriseRancher rancher) {
    boolean duplicate = false;

    TypedQuery<com.tramex.sisoprega.dto.RancherInvoice> readQuery = null;

    readQuery = em.createNamedQuery("RANCHER_INVOICE_BY_LEGAL_NAME", com.tramex.sisoprega.dto.RancherInvoice.class);
    readQuery.setParameter("legalName", rancher.getLegalName());

    try {
      com.tramex.sisoprega.dto.RancherInvoice enterprise = readQuery.getSingleResult();
      duplicate = enterprise != null;
      error_description = "Legal name is already in use by a rancher";
    } catch (NoResultException e) {
      duplicate = false;
    }

    return duplicate;
  }
}
