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

import java.util.List;
import java.util.logging.Logger;

import javax.annotation.Resource;
import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.servlet.http.HttpSession;
import javax.xml.ws.WebServiceContext;
import javax.xml.ws.WebServiceException;
import javax.xml.ws.handler.MessageContext;

import com.tramex.sisoprega.common.BaseResponse;
import com.tramex.sisoprega.common.CreateGatewayResponse;
import com.tramex.sisoprega.common.Error;
import com.tramex.sisoprega.common.Field;
import com.tramex.sisoprega.common.GatewayContent;
import com.tramex.sisoprega.common.GatewayRequest;
import com.tramex.sisoprega.common.ReadGatewayResponse;
import com.tramex.sisoprega.common.UpdateGatewayResponse;
import com.tramex.sisoprega.common.crud.Cruddable;

/**
 * OperationsGateway provides the web service and the web methods that will be
 * consumed by the UI applications.<BR/>
 * The OperationsGateway must decide which proxy will attend the request.
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 10/27/2012  Diego Torres                 Initial Version.
 * 11/27/2012  Diego Torres                 Preparing web service for login.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 */
@WebService(serviceName = "GatewayService")
public class OperationsGateway {

  @Resource
  WebServiceContext wsContext;

  private Logger log = Logger.getLogger(OperationsGateway.class.getCanonicalName());

  /**
   * 
   * Provides an interface to create entities.
   * 
   * @param requestId
   * @param entityName
   * @param content
   * @return
   */
  @WebMethod(operationName = "Create")
  public CreateGatewayResponse CreateGateway(@WebParam(name = "requestId") String requestId,
      @WebParam(name = "entityName") String entityName, @WebParam(name = "field") List<Field> content) {
    log.entering(this.getClass().getCanonicalName(), "CreateGateway");
    log.info("CreateGateway|Request{requestId:" + requestId + ";entityName:" + requestId + ";content:{" + content.toString()
        + "};}");

    if (getSessionId() == null)
      throw new WebServiceException("User is not logged in");

    // Generate request from input parameters
    GatewayRequest request = new GatewayRequest();
    request.setRequestId(requestId);
    request.setEntityName(entityName);

    // Generate request content from list of fields
    GatewayContent gContent = new GatewayContent();
    gContent.setFields(content);
    request.setContent(gContent);
    log.fine("Casted Request:" + request.toString());

    CreateGatewayResponse result = null;
    Error cgrEx = null;
    try {
      // Retrieve a cruddable instance from an EJB in the glassfish
      // context
      Cruddable crud = getCruddable(request.getEntityName());

      // Generate the result from the cruddable operation
      result = crud.Create(request);

    } catch (Exception e) {
      // Something went wrong, log the severe message
      log.severe("Error while creating cruddable entity [" + entityName + "]");

      // Log details about the failure
      log.throwing(OperationsGateway.class.getName(), "CreateGateway", e);

      // Create the failure result message for web service
      result = new CreateGatewayResponse();
      cgrEx = new Error("CG001", "Error on Creation", "CreateGateway");
      result.setError(cgrEx);
    }

    // Log ending of method and respond to web service.
    log.exiting(this.getClass().getCanonicalName(), "CreateGateway");
    return result;
  }

  /**
   * 
   * Provides an interface to read entities. Use id in parameters to get only
   * one record representing the requested entity by id.
   * 
   * @param requestId
   * @param entityName
   * @param content
   * @return
   */
  @WebMethod(operationName = "Read")
  public ReadGatewayResponse ReadGateway(@WebParam(name = "requestId") String requestId,
      @WebParam(name = "entityName") String entityName, @WebParam(name = "field") List<Field> content) {
    log.entering(this.getClass().getCanonicalName(), "ReadGateway");
    log.info("ReadGateway|Request{requestId:" + requestId + ";entityName:" + requestId + ";content:{" + content.toString()
        + "};}");

    // Generate request from input parameters
    GatewayRequest request = new GatewayRequest();
    request.setRequestId(requestId);
    request.setEntityName(entityName);

    // Generate request content from list of fields
    GatewayContent gContent = new GatewayContent();
    gContent.setFields(content);
    request.setContent(gContent);
    log.fine("Casted Request:" + request.toString());

    ReadGatewayResponse result = null;
    Error rge = null;

    try {
      // Retrieve a cruddable instance from an EJB in the glassfish
      // context
      Cruddable crud = getCruddable(entityName);

      // Generate the result from the cruddable operation
      result = crud.Read(request);
    } catch (Exception e) {
      // Something went wrong, log the severe message
      log.severe("Error while creating cruddable entity [" + entityName + "]");

      // Log details about the failure
      log.throwing(OperationsGateway.class.getName(), "ReadGateway", e);

      // Create the failure result message for web service
      result = new ReadGatewayResponse();
      rge = new Error("RG001", "Error on Creation", "ReadGateway");
      result.setError(rge);
    }

    // Log ending of method and respond to web service.
    log.exiting(this.getClass().getCanonicalName(), "ReadGateway");
    return result;
  }

  /**
   * Provides an interface to update entities. will return the updated entity.
   * 
   * @param requestId
   * @param entityName
   * @param content
   * @return
   */
  @WebMethod(operationName = "Update")
  public UpdateGatewayResponse UpdateGateway(@WebParam(name = "requestId") String requestId,
      @WebParam(name = "entityName") String entityName, @WebParam(name = "field") List<Field> content) {

    log.entering(this.getClass().getCanonicalName(), "UpdateGateway");
    log.info("UpdateGateway|Request{requestId:" + requestId + ";entityName:" + requestId + ";content:{" + content.toString()
        + "};}");

    // Generate request from input parameters
    GatewayRequest request = new GatewayRequest();
    request.setRequestId(requestId);
    request.setEntityName(entityName);

    // Generate request content from list of fields
    GatewayContent gContent = new GatewayContent();
    gContent.setFields(content);
    request.setContent(gContent);
    log.fine("Casted Request:" + request.toString());

    UpdateGatewayResponse result = null;
    Error uge = null;

    try {
      // Retrieve a cruddable instance from an EJB in the glassfish
      // context
      Cruddable crud = getCruddable(entityName);

      // Generate the result from the cruddable operation
      result = crud.Update(request);
    } catch (Exception e) {
      // Something went wrong, log the severe message
      log.severe("Error while creating cruddable entity [" + entityName + "]");

      // Log details about the failure
      log.throwing(OperationsGateway.class.getName(), "UpdateGateway", e);

      // Create the failure result message for web service
      result = new UpdateGatewayResponse();
      uge = new Error("RG001", "Error on Creation", "UpdateGateway");
      result.setError(uge);
    }

    // Log ending of method and respond to web service.
    log.exiting(this.getClass().getCanonicalName(), "UpdateGateway");
    return result;
  }

  /**
   * Provides an interface to delete entities, should provide as field the id of
   * the entity to be deleted.
   * 
   * @param requestId
   * @param entityName
   * @param content
   * @return
   */
  @WebMethod(operationName = "Delete")
  public BaseResponse DeleteGateway(@WebParam(name = "requestId") String requestId,
      @WebParam(name = "entityName") String entityName, @WebParam(name = "field") List<Field> content) {
    log.entering(this.getClass().getCanonicalName(), "DeleteGateway");
    log.info("DeleteGateway|Request{requestId:" + requestId + ";entityName:" + requestId + ";content:{" + content.toString()
        + "};}");

    // Generate request from input parameters
    GatewayRequest request = new GatewayRequest();
    request.setRequestId(requestId);
    request.setEntityName(entityName);

    // Generate request content from list of fields
    GatewayContent gContent = new GatewayContent();
    gContent.setFields(content);
    request.setContent(gContent);
    log.fine("Casted Request:" + request.toString());

    BaseResponse result = null;
    Error uge = null;

    try {
      // Retrieve a cruddable instance from an EJB in the glassfish
      // context
      Cruddable crud = getCruddable(entityName);

      // Generate the result from the cruddable operation
      result = crud.Delete(request);
    } catch (Exception e) {
      // Something went wrong, log the severe message
      log.severe("Error while creating cruddable entity [" + entityName + "]");

      // Log details about the failure
      log.throwing(OperationsGateway.class.getName(), "DeleteGateway", e);

      // Create the failure result message for web service
      result = new UpdateGatewayResponse();
      uge = new Error("RG001", "Error on Creation", "DeleteGateway");
      result.setError(uge);
    }

    // Log ending of method and respond to web service.
    log.exiting(this.getClass().getCanonicalName(), "DeleteGateway");
    return result;
  }

  /**
   * Provides an interface to evaluate user name and password.
   * 
   * @param userName
   * @param password
   * @return
   */
  @WebMethod(operationName = "Login")
  public String loginService(@WebParam(name = "userName") String userName, @WebParam(name = "password") String password) {
    HttpSession session = getSession();
    if (session == null)
      throw new WebServiceException("No session in WebServiceContext");
    // TODO: Evaluate username and password and provide allowedRoles
    log.info("Starting new Session");
    String sessionId = "Session:{userName:" + userName + ";password:" + password + "}";
    session.setAttribute("sessionId", sessionId);
    return sessionId;
  }

  /**
   * Provides an interface to empty session information.
   * 
   * @return
   */
  public String logoutService() {
    HttpSession session = getSession();
    if (session != null)
      session.removeAttribute("sessionId");
    return "OK";
  }

  private Cruddable getCruddable(String cruddableName) {
    Context jndiContext = null;
    Cruddable crud = null;
    String commonPrefix = "java:global/Proxy/";
    String commonSuffix = "Proxy";
    try {
      // TODO: Produce the context with the provided userName and password
      jndiContext = new InitialContext();
      crud = (Cruddable) jndiContext.lookup(commonPrefix + cruddableName + commonSuffix);
      log.fine("Cruddable instance created for entity [" + cruddableName + "]");
    } catch (java.lang.Exception e) {
      log.severe("Unable to load jndi context component");
      log.throwing(this.getClass().getName(), "getCruddable", e);
    }
    return crud;
  }

  private String getSessionId() {
    HttpSession session = getSession();
    if (session == null)
      throw new WebServiceException("No session in WebServiceContext");
    return (String) session.getAttribute("sessionId");
  }

  private HttpSession getSession() {
    MessageContext mc = wsContext.getMessageContext();
    return ((javax.servlet.http.HttpServletRequest) mc.get(MessageContext.SERVLET_REQUEST)).getSession();
  }

}
