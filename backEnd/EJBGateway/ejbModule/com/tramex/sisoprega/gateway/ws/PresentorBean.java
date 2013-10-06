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
package com.tramex.sisoprega.gateway.ws;

import java.util.logging.Logger;

import javax.annotation.Resource;
import javax.annotation.security.RolesAllowed;
import javax.ejb.LocalBean;
import javax.ejb.SessionContext;
import javax.ejb.Stateless;
import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.xml.bind.annotation.XmlElement;

import com.tramex.sisoprega.gateway.GatewayError;
import com.tramex.sisoprega.gateway.GatewayField;
import com.tramex.sisoprega.gateway.GatewayRecord;
import com.tramex.sisoprega.gateway.request.CreateRequest;
import com.tramex.sisoprega.gateway.request.ReadRequest;
import com.tramex.sisoprega.gateway.request.SaveRequest;
import com.tramex.sisoprega.gateway.response.BaseResponse;
import com.tramex.sisoprega.gateway.response.ReadResponse;
import com.tramex.sisoprega.proxy.Cruddable;

/**
 * Provides presentation layer for web services.
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 05/19/2013  Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 */
@Stateless
@LocalBean
@WebService(name = "Presentor")
@RolesAllowed({ "sisoprega_admin", "mx_usr", "us_usr", "rancher", "agency" })
public class PresentorBean {

  private Logger log = Logger.getLogger(PresentorBean.class.getCanonicalName());

  @Resource
  private SessionContext ejbContext;

  /**
   * Tests remote connection to web service implementation.
   * 
   * @return
   */
  @WebMethod
  public String Ping() {
    log.info("Ping service executed by [" + getLoggedUser() + "]");
    return "OK";
  }

  @WebMethod
  public ReadResponse Create(@XmlElement(required = true, nillable = false) @WebParam(name = "request") CreateRequest request) {
    log.entering(this.getClass().getCanonicalName(), "Create");
    log.info("Create gateway invoked with the following content: [" + request + "]");

    String entity = request.getParentRecord().getEntity();

    Cruddable entityProxy = getCruddable(entity);
    log.exiting(this.getClass().getCanonicalName(), "Create");

    ReadResponse response = entityProxy.Create(request);
    log.info("Create gateway completed by " + getLoggedUser() + " as: [" + response.getError() + "]");
    return response;
  }

  @WebMethod
  public ReadResponse Read(@XmlElement(required = true, nillable = false) @WebParam(name = "request") ReadRequest request) {
    log.entering(this.getClass().getCanonicalName(), "Read");
    log.info("Read gateway invoked with the following content: [" + request + "]");

    Cruddable entityProxy = getCruddable(request.getFilter().getEntity());
    log.exiting(this.getClass().getCanonicalName(), "Read");

    ReadResponse response = entityProxy.Read(request);
    log.info("Read gateway completed by " + getLoggedUser() + " as: [" + response.getError() + "]");
    return response;
  }

  @WebMethod
  public ReadResponse Update(@XmlElement(required = true, nillable = false) @WebParam(name = "request") CreateRequest request) {
    log.entering(this.getClass().getCanonicalName(), "Update");
    log.info("Update gateway invoked with the following content: [" + request + "]");

    Cruddable entityProxy = getCruddable(request.getParentRecord().getEntity());
    log.exiting(this.getClass().getCanonicalName(), "Update");

    ReadResponse response = entityProxy.Update(request);
    log.info("Update gateway completed by " + getLoggedUser() + " as: [" + response.getError() + "]");

    return response;
  }

  @WebMethod
  public BaseResponse Delete(@XmlElement(required = true, nillable = false) @WebParam(name = "request") ReadRequest request) {
    log.entering(this.getClass().getCanonicalName(), "Delete");
    log.info("Delete gateway invoked with the following content: [" + request + "]");

    Cruddable entityProxy = getCruddable(request.getFilter().getEntity());
    log.exiting(this.getClass().getCanonicalName(), "Delete");

    BaseResponse response = entityProxy.Delete(request);
    log.info("Delete gateway completed by " + getLoggedUser() + " as: [" + response.getError() + "]");
    return response;
  }

  @WebMethod
  public ReadResponse Save(@XmlElement(required = true, nillable = false) @WebParam(name = "request") SaveRequest request)
      throws Exception {

    ReadResponse response = new ReadResponse();
    response.setError(new GatewayError("0", "SUCCESS", "SAVE"));

    for (GatewayRecord parentRecord : request.getParentRecord()) {
      String operationName = "Create";
      String entityIdFieldName = parentRecord.getEntity() + "Id";
      for (GatewayField field : parentRecord.getField()) {
        if (field.getName().equalsIgnoreCase(entityIdFieldName) && !field.getValue().equals("0")) {
          log.fine("Found update operation for entityId: [" + field.getValue() + "]");
          operationName = "Update";
          break;
        }
      }

      CreateRequest transactionRequest = new CreateRequest();
      transactionRequest.setParentRecord(parentRecord);

      Cruddable entityProxy = getCruddable(parentRecord.getEntity());
      ReadResponse transactionResponse = null;
      if (operationName.equals("Create")) {
        log.info("Executing create operation with record: [" + transactionRequest + "]");
        transactionResponse = entityProxy.Create(transactionRequest);
      } else {
        log.info("Executing update operation with record: [" + transactionRequest + "]");
        transactionResponse = entityProxy.Update(transactionRequest);
      }

      if (!transactionResponse.getError().getExceptionId().equals("0")) {
        log.severe("An exception has occured during transaction processing.");
        response.setError(transactionResponse.getError());
        return response;        
      } else {
        log.fine("Transaction succesfully executed, building response.");
        for (GatewayRecord responseRecord : transactionResponse.getParentRecord()) {
          log.finer("Adding response record: " + responseRecord);
          response.addParentRecord(responseRecord);
        }
      }

    }

    return response;
  }

  private Cruddable getCruddable(String cruddableName) {
    Context jndiContext = null;
    Cruddable crud = null;
    String commonPrefix = "java:global/BusinessLogicProxy/";
    String commonSuffix = "Bean";
    try {
      jndiContext = new InitialContext();
      crud = (Cruddable) jndiContext.lookup(commonPrefix + cruddableName + commonSuffix);
      log.fine("Cruddable instance created for entity [" + cruddableName + "]");
    } catch (java.lang.Exception e) {
      log.severe("Unable to load jndi context component");
      log.throwing(this.getClass().getName(), "getCruddable", e);
    }
    return crud;
  }

  private String getLoggedUser() {
    return ejbContext.getCallerPrincipal().getName();
  }

}
