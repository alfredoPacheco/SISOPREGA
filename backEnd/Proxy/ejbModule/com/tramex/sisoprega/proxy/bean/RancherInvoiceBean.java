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
import com.tramex.sisoprega.dto.RancherInvoice;

/**
 * This proxy knows the logic to evaluate Rancher's Invoice information and
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
 * 11/09/2012  Diego Torres                 Initial Version.
 * 12/08/2012  Diego Torres                 Fixing standard error codes and validation.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 */
@Stateless
public class RancherInvoiceBean extends BaseBean implements Cruddable {

  /**
   * @see Cruddable#Create(GatewayRequest)
   */
  @Override
  public CreateGatewayResponse Create(GatewayRequest request) {
    log.entering(this.getClass().getCanonicalName(), "Create");

    CreateGatewayResponse response = new CreateGatewayResponse();
    RancherInvoice invoiceInfo = null;

    try {
      invoiceInfo = entityFromRequest(request, RancherInvoice.class);

      log.fine("Received rancherInvoice in request:{" + invoiceInfo + "}");

      if (validateEntity(invoiceInfo)) {
        log.finer("rancherInvoice successfully validated");
        em.persist(invoiceInfo);
        log.finer("rancherInvoice persisted on database");
        em.flush();

        String sId = String.valueOf(invoiceInfo.getRancherInvoiceId());
        response.setGeneratedId(sId);
        response.setError(new Error("0", "SUCCESS", "proxy.RancherInvoice.Create"));
        log.finer("built successfull response");
      } else {
        log.warning("Validation error:" + error_description);
        response.setError(new Error("VAL01", "Error de validación de datos:" + error_description, "proxy.RancherContact.Create"));
      }
    } catch (Exception e) {
      log.severe("Exception found while creating rancher invoicing info");
      log.throwing(this.getClass().getName(), "Create", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, "
            + "muy probablemente los datos de facturación que usted quiere agregar ya existen en la base de datos.",
            "proxy.RancherInvoice.Create"));
      else {
        response.setError(new Error("DB02", "Error en la base de datos:[" + e.getMessage() + "]", "proxy.RancherInvoice.Create"));
      }
    }

    log.exiting(this.getClass().getCanonicalName(), "Create");
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

    RancherInvoice invoice = null;
    try {
      invoice = entityFromRequest(request, RancherInvoice.class);

      log.fine("Got rancher from request: " + invoice);

      TypedQuery<RancherInvoice> readQuery = null;

      if (invoice.getRancherInvoiceId() != 0) {
        readQuery = em.createNamedQuery("RANCHER_INVOICE_BY_ID", RancherInvoice.class);
        readQuery.setParameter("rancherInvoiceId", invoice.getRancherInvoiceId());
      } else if (invoice.getRancherId() != 0) {
        readQuery = em.createNamedQuery("RANCHER_INVOICE_BY_RANCHER_ID", RancherInvoice.class);
        readQuery.setParameter("rancherId", invoice.getRancherId());
      } else {
        response.setError(new Error("VAL03", "El filtro especificado no es válido para datos de facturación.",
            "proxy.RancherInvoice.Read"));
        return response;
      }

      List<RancherInvoice> queryResults = readQuery.getResultList();

      if (queryResults.isEmpty()) {
        response.setError(new Error("VAL02", "No se encontraron datos para el filtro seleccionado", "proxy.RancherInvoice.Read"));
      } else {
        response.getRecord().addAll(contentFromList(queryResults, RancherInvoice.class));

        response.setError(new Error("0", "SUCCESS", "proxy.Rancher.Read"));
      }
    } catch (Exception e) {
      log.severe("Exception found while reading rancher invoice filter");
      log.throwing(this.getClass().getCanonicalName(), "Read", e);

      response.setError(new Error("DB02", "Error en la base de datos: " + e.getMessage(), "proxy.RancherInvoice.Read"));
    }

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

    RancherInvoice invoice = null;

    try {
      invoice = entityFromRequest(request, RancherInvoice.class);

      if (invoice.getRancherInvoiceId() == 0) {
        log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id de los datos de facturación al intentar actualizarlos.",
            "proxy.RancherInvoiceBean.Update"));
      } else {
        if (validateEntity(invoice)) {
          em.merge(invoice);
          em.flush();

          response.setUpdatedRecord(getContentFromEntity(invoice, RancherInvoice.class));
          response.setEntityName(request.getEntityName());
          response.setError(new Error("0", "SUCCESS", "proxy.RancherInvoice.Update"));
        } else {
          log.warning("Validation error: " + error_description);
          response.setError(new Error("VAL01", "Error de validación de datos: " + error_description,
              "proxy.RancherInvoice.Update"));
        }
      }

    } catch (Exception e) {
      log.severe("Exception found while updating rancher invoice");
      log.throwing(this.getClass().getName(), "Update", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, "
            + "muy probablemente los datos de facturación que usted quiere agregar ya existe en la base de datos.",
            "proxy.RancherInvoice.Create"));
      else {
        response.setError(new Error("DB02", "Error en la base de datos:[" + e.getMessage() + "]", "proxy.RancherInvoice.Update"));
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
      RancherInvoice invoice = entityFromRequest(request, RancherInvoice.class);
      if (invoice.getRancherInvoiceId() == 0) {
        log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id de los datos de facturación al intentar eliminarlos.",
            "proxy.RancherInvoiceBean.Delete"));
      } else {
        TypedQuery<RancherInvoice> readQuery = em.createNamedQuery("RANCHER_INVOICE_BY_ID",
            RancherInvoice.class);
        readQuery.setParameter("rancherInvoiceId", invoice.getRancherInvoiceId());
        invoice = readQuery.getSingleResult();

        em.merge(invoice);
        em.remove(invoice);
        em.flush();

        response.setError(new Error("0", "SUCCESS", "proxy.RancherInvoice.Delete"));
      }
    } catch (Exception e) {
      log.severe("Exception found while deleting rancher invoicing info");
      log.throwing(this.getClass().getName(), "Delete", e);

      response.setError(new Error("DEL01",
          "Error al intentar borrar datos. Es muy probable que la entidad que usted quiere eliminar "
              + "cuente con otras entidades relacionadas.", "proxy.RancherInvoiceBean.Delete"));
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
    RancherInvoice invoice = (RancherInvoice) entity;
    
    if (valid) {
      // Validate address one.
      valid = invoice.getAddressOne().length() <= 100;
      if (!valid)
        error_description = "La dirección es más grande de lo permitido en la base de datos.";
    }

    if (valid) {
      // Validar vacio en address one.
      valid = invoice.getAddressOne().trim().length() > 0;
      if (!valid)
        error_description = "La direccion es requerida.";
    }

    if (valid) {
      valid = invoice.getAddressTwo().length() <= 100;
      if (!valid)
        error_description = "La dirección es más grande de lo permitido en la base de datos.";
    }

    if (valid) {
      valid = invoice.getCity().length() <= 80;
      if (!valid)
        error_description = "La ciudad es más grande de lo permitido en la base de datos.";
    }

    if (valid) {
      valid = invoice.getCity().trim().length() > 0;
      if (!valid)
        error_description = "La ciudad en la dirección es un campo requerido.";
    }

    if (valid) {
      valid = invoice.getLegalId().length() <= 13;
      if (!valid)
        error_description = "El RFC es más grande de lo permitido en la base de datos.";
    }

    if (valid) {
      valid = invoice.getLegalId().trim().length() > 0;
      if(!valid)
        error_description = "El RFC es un campo requerido.";
    }
    
    if(valid){
      valid = invoice.getLegalName().length() <= 100;
      if(!valid)
        error_description = "La razón social es más grande de lo permitido en la base de datos.";
    }
    
    if(valid){
      valid = invoice.getLegalName().trim().length() >0;
      if(!valid)
        error_description = "La razón social es un campo requerido en la base de datos.";
    }
    
    if(valid){
      valid = invoice.getAddressState().length() <= 80;
      if(!valid)
        error_description = "El estado de la dirección es más grande de lo requerido.";
    }
    
    if(valid){
      valid = invoice.getAddressState().trim().length() > 0;
      if(!valid)
        error_description = "El estado de la dirección es un campo requerido.";
    }
    
    if(valid){
      valid = invoice.getZipCode().length()<=9;
      if(!valid)
        error_description = "El código postal es más grande de lo permitido en la base de datos.";
    }
    
    if(valid){
      valid = invoice.getZipCode().trim().length() > 0;
      if(!valid)
        error_description = "El código postal es un campo requerido.";
    }
    
    if (valid) {
      valid = !duplicateEnterprise(invoice);
    }

    if (valid) {
      valid = rancherExists(invoice);
    }

    return valid;
  }

  private boolean duplicateEnterprise(RancherInvoice invoice) {

    boolean duplicate = false;

    duplicate = duplicateRFC(invoice);
    if (!duplicate) {
      duplicate = duplicateLegalName(invoice);
    }

    return duplicate;
  }

  private boolean duplicateRFC(RancherInvoice invoice) {
    boolean duplicate = false;

    TypedQuery<EnterpriseRancher> readQuery = null;

    readQuery = em.createNamedQuery("ENTERPRISE_RANCHER_BY_RFC", EnterpriseRancher.class);
    readQuery.setParameter("rfc", invoice.getLegalId());

    try {
      EnterpriseRancher enterprise = readQuery.getSingleResult();
      duplicate = enterprise != null;
      error_description = "RFC (legal_id) is already in use by an enterprise rancher";
    } catch (NoResultException e) {
      duplicate = false;
    }

    return duplicate;
  }

  private boolean duplicateLegalName(RancherInvoice invoice) {
    boolean duplicate = false;

    TypedQuery<EnterpriseRancher> readQuery = null;

    readQuery = em.createNamedQuery("ENTERPRISE_RANCHER_BY_LEGAL_NAME", EnterpriseRancher.class);
    readQuery.setParameter("legalName", invoice.getLegalName());

    try {
      EnterpriseRancher enterprise = readQuery.getSingleResult();
      duplicate = enterprise != null;
      error_description = "Legal name is already in use by an enterprise rancher";
    } catch (NoResultException e) {
      duplicate = false;
    }

    return duplicate;
  }

  private boolean rancherExists(RancherInvoice invoice) {
    boolean exists = true;

    TypedQuery<com.tramex.sisoprega.dto.Rancher> readQuery = null;

    readQuery = em.createNamedQuery("RANCHER_BY_ID", com.tramex.sisoprega.dto.Rancher.class);
    readQuery.setParameter("rancherId", invoice.getRancherId());

    try {
      com.tramex.sisoprega.dto.Rancher enterprise = readQuery.getSingleResult();
      exists = enterprise != null;
    } catch (NoResultException e) {
      exists = false;
      error_description = "RancherId " + invoice.getRancherId() + " does not exists on database";
    }

    return exists;
  }
}
