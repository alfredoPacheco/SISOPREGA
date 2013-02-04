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
 * 12/16/2012  Diego Torres                 Adding log activity
 * 01/22/2013  Diego Torres                 Implementing DataModel.
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
    this.log.entering(this.getClass().getCanonicalName(), "Create");

    CreateGatewayResponse response = new CreateGatewayResponse();
    RancherInvoice invoiceInfo = null;

    try {
      invoiceInfo = entityFromRequest(request, RancherInvoice.class);

      this.log.fine("Received rancherInvoice in request:{" + invoiceInfo + "}");

      if (validateEntity(invoiceInfo)) {
        this.log.finer("rancherInvoice successfully validated");
        dataModel.createDataModel(invoiceInfo);

        String sId = String.valueOf(invoiceInfo.getRancherInvoiceId());
        response.setGeneratedId(sId);
        response.setError(new Error("0", "SUCCESS", "proxy.RancherInvoice.Create"));
        this.log.info("Rancher Invoice [" + invoiceInfo.toString() + "] created by principal[" + getLoggedUser() + "]");
      } else {
        this.log.warning("Validation error:" + error_description);
        response.setError(new Error("VAL01", "Error de validación de datos:" + error_description, "proxy.RancherContact.Create"));
      }
    } catch (Exception e) {
      this.log.severe("Exception found while creating rancher invoicing info");
      this.log.throwing(this.getClass().getName(), "Create", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, "
            + "muy probablemente los datos de facturación que usted quiere agregar ya existen en la base de datos.",
            "proxy.RancherInvoice.Create"));
      else {
        response.setError(new Error("DB02", "Error en la base de datos:[" + e.getMessage() + "]", "proxy.RancherInvoice.Create"));
      }
    }

    this.log.exiting(this.getClass().getCanonicalName(), "Create");
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

    RancherInvoice invoice = null;
    try {
      invoice = entityFromRequest(request, RancherInvoice.class);

      this.log.fine("Got rancher from request: " + invoice);

      String qryLogger = "";
      String queryName = "";
      Map<String, Object> parameters = new HashMap<String, Object>();
      if (invoice.getRancherInvoiceId() != 0) {
        queryName = "RANCHER_INVOICE_BY_ID";
        parameters.put("rancherInvoiceId", invoice.getRancherInvoiceId());
        qryLogger = "By rancherInvoiceId [" + invoice.getRancherInvoiceId() + "]";
      } else if (invoice.getRancherId() != 0) {
        queryName = "RANCHER_INVOICE_BY_RANCHER_ID";
        parameters.put("rancherId", invoice.getRancherId());
        qryLogger = "By rancherId [" + invoice.getRancherId() + "]";
      } else {
        response.setError(new Error("VAL03", "El filtro especificado no es válido para datos de facturación.",
            "proxy.RancherInvoice.Read"));
        return response;
      }

      List<RancherInvoice> queryResults = dataModel.readDataModelList(queryName, parameters, RancherInvoice.class);

      if (queryResults.isEmpty()) {
        response.setError(new Error("VAL02", "No se encontraron datos para el filtro seleccionado", "proxy.RancherInvoice.Read"));
      } else {
        response.getRecord().addAll(contentFromList(queryResults, RancherInvoice.class));

        response.setError(new Error("0", "SUCCESS", "proxy.RancherInvoice.Read"));
        this.log.info("Read operation " + qryLogger + " executed by principal[" + getLoggedUser() + "] on RancherInvoiceBean");
      }
    } catch (Exception e) {
      this.log.severe("Exception found while reading rancher invoice filter");
      this.log.throwing(this.getClass().getCanonicalName(), "Read", e);

      response.setError(new Error("DB02", "Error en la base de datos: " + e.getMessage(), "proxy.RancherInvoice.Read"));
    }

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

    RancherInvoice invoice = null;

    try {
      invoice = entityFromRequest(request, RancherInvoice.class);

      if (invoice.getRancherInvoiceId() == 0) {
        this.log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id de los datos de facturación al intentar actualizarlos.",
            "proxy.RancherInvoiceBean.Update"));
      } else {
        if (validateEntity(invoice)) {
          dataModel.updateDataModel(invoice);

          response.setUpdatedRecord(getContentFromEntity(invoice, RancherInvoice.class));
          response.setEntityName(request.getEntityName());
          response.setError(new Error("0", "SUCCESS", "proxy.RancherInvoice.Update"));
          this.log.info("Rancher Invoice [" + invoice.toString() + "] updated by principal[" + getLoggedUser() + "]");
        } else {
          this.log.warning("Validation error: " + error_description);
          response.setError(new Error("VAL01", "Error de validación de datos: " + error_description,
              "proxy.RancherInvoice.Update"));
        }
      }

    } catch (Exception e) {
      this.log.severe("Exception found while updating rancher invoice");
      this.log.throwing(this.getClass().getName(), "Update", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, "
            + "muy probablemente los datos de facturación que usted quiere agregar ya existe en la base de datos.",
            "proxy.RancherInvoice.Create"));
      else {
        response.setError(new Error("DB02", "Error en la base de datos:[" + e.getMessage() + "]", "proxy.RancherInvoice.Update"));
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
      RancherInvoice invoice = entityFromRequest(request, RancherInvoice.class);
      if (invoice.getRancherInvoiceId() == 0) {
        this.log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id de los datos de facturación al intentar eliminarlos.",
            "proxy.RancherInvoiceBean.Delete"));
      } else {
        invoice = dataModel.readSingleDataModel("RANCHER_INVOICE_BY_ID", "rancherInvoiceId", invoice.getRancherInvoiceId(), RancherInvoice.class);
        this.log.info("Deleting RancherInvoice [" + invoice.toString() + "] by principal[" + getLoggedUser() + "]");
        dataModel.deleteDataModel(invoice, getLoggedUser());
        response.setError(new Error("0", "SUCCESS", "proxy.RancherInvoice.Delete"));
      }
    } catch (Exception e) {
      this.log.severe("Exception found while deleting rancher invoicing info");
      this.log.throwing(this.getClass().getName(), "Delete", e);

      response.setError(new Error("DEL01",
          "Error al intentar borrar datos. Es muy probable que la entidad que usted quiere eliminar "
              + "cuente con otras entidades relacionadas.", "proxy.RancherInvoiceBean.Delete"));
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
    Map<String, Object> parameters = new HashMap<String, Object>();
    parameters.put("rfc", invoice.getLegalId());
    
    List<EnterpriseRancher> enterprises = dataModel.readDataModelList("ENTERPRISE_RANCHER_BY_RFC", parameters, EnterpriseRancher.class);
    return !enterprises.isEmpty();
  }

  private boolean duplicateLegalName(RancherInvoice invoice) {
    
    Map<String, Object> parameters = new HashMap<String, Object>();
    parameters.put("legalName", invoice.getLegalName());
    
    List<EnterpriseRancher> enterprises = dataModel.readDataModelList("ENTERPRISE_RANCHER_BY_LEGAL_NAME", parameters, EnterpriseRancher.class);
    return !enterprises.isEmpty();
  }
}
