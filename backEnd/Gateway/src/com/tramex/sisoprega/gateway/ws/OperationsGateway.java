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

import com.sun.appserv.security.ProgrammaticLogin;
import com.tramex.sisoprega.common.BaseResponse;
import com.tramex.sisoprega.common.CreateGatewayResponse;
import com.tramex.sisoprega.common.Error;
import com.tramex.sisoprega.common.Field;
import com.tramex.sisoprega.common.GatewayContent;
import com.tramex.sisoprega.common.GatewayRequest;
import com.tramex.sisoprega.common.ReadGatewayResponse;
import com.tramex.sisoprega.common.UpdateGatewayResponse;
import com.tramex.sisoprega.common.crud.Cruddable;
import com.tramex.sisoprega.common.messenger.Messageable;

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
 * 12/03/2012  Diego Torres                 web service login succeed.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 */
@WebService(serviceName = "GatewayService")
public class OperationsGateway {
  @Resource
  protected WebServiceContext wsContext;

  protected Logger log = Logger.getLogger(OperationsGateway.class.getCanonicalName());

  protected final static String REALM_NAME = "security";

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

    if (getSessionUserName() == null)
      throw new WebServiceException("User is not logged in");

    // Generate request from input parameters
    GatewayRequest request = new GatewayRequest();
    request.setEntityName(entityName);

    // Generate request content from list of fields
    GatewayContent gContent = new GatewayContent();
    gContent.setFields(content);
    request.setContent(gContent);
    log.fine("Casted Request:" + request.toString());

    CreateGatewayResponse result = null;
    Error cgrEx = null;
    try {
      ProgrammaticLogin pl = new ProgrammaticLogin();
      if (logIn(pl)) {
        // Retrieve a cruddable instance from an EJB in the glassfish
        // context
        Cruddable crud = getCruddable(request.getEntityName());
        result = crud.Create(request);
      } else {
        result = new CreateGatewayResponse();
        cgrEx = new Error("GW01", "Error al ingresar al sistema, por favor revise sus credenciales", "CreateGateway");
      }
      logOut(pl);
    } catch (Exception e) {
      if (e instanceof javax.ejb.EJBAccessException) {
        result = new CreateGatewayResponse();
        cgrEx = new Error("GW01", "Error al ingresar al sistema, por favor revise sus credenciales", "CreateGateway");
        result.setError(cgrEx);
      } else {
        // Something went wrong, log the severe message
        log.severe("Error while creating cruddable entity [" + entityName + "]");

        // Log details about the failure
        log.throwing(OperationsGateway.class.getName(), "CreateGateway", e);
      }
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
    log.info("ReadGateway|Request{requestId:" + requestId + ";entityName:" + entityName + ";content:{" + content.toString()
        + "};}");

    if (getSessionUserName() == null)
      throw new WebServiceException("User is not logged in");

    // Generate request from input parameters
    GatewayRequest request = new GatewayRequest();
    request.setEntityName(entityName);

    // Generate request content from list of fields
    GatewayContent gContent = new GatewayContent();
    gContent.setFields(content);
    request.setContent(gContent);
    log.fine("Casted Request:" + request.toString());

    ReadGatewayResponse result = null;
    Error rge = null;

    try {
      ProgrammaticLogin pl = new ProgrammaticLogin();
      if (logIn(pl)) {
        // Retrieve a cruddable instance from an EJB in the glassfish
        // context
        Cruddable crud = getCruddable(entityName);

        // Generate the result from the cruddable operation
        result = crud.Read(request);
      } else {
        log.severe("Failed tryial to access already logged entity from user [" + getSessionUserName() + "]");
        result = new ReadGatewayResponse();
        rge = new Error("GW01", "Error al ingresar al sistema, por favor revise sus credenciales", "ReadGateway");
      }
      logOut(pl);
    } catch (Exception e) {
      if (e instanceof javax.ejb.EJBAccessException) {
        log.severe("Not authorized access tryial on read method for [" + entityName + "]");
        // Create the failure result message for web service
        result = new ReadGatewayResponse();
        rge = new Error("GW01", "Error al ingresar al sistema, por favor revise sus credenciales", "ReadGateway");
        result.setError(rge);
      } else {
        // Something went wrong, log the severe message
        log.severe("Error while reading cruddable entity [" + entityName + "]");

        // Log details about the failure
        log.throwing(OperationsGateway.class.getName(), "ReadGateway", e);

        // Create the failure result message for web service
        result = new ReadGatewayResponse();
        rge = new Error("GW02", "Se ha encontrado un error al intentar leer datos en la base de datos.", "ReadGateway");
        result.setError(rge);
      }
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

    if (getSessionUserName() == null)
      throw new WebServiceException("User is not logged in");

    // Generate request from input parameters
    GatewayRequest request = new GatewayRequest();
    request.setEntityName(entityName);

    // Generate request content from list of fields
    GatewayContent gContent = new GatewayContent();
    gContent.setFields(content);
    request.setContent(gContent);
    log.fine("Casted Request:" + request.toString());

    UpdateGatewayResponse result = null;
    Error uge = null;

    try {
      ProgrammaticLogin pl = new ProgrammaticLogin();
      if (logIn(pl)) {
        // Retrieve a cruddable instance from an EJB in the glassfish
        // context
        Cruddable crud = getCruddable(entityName);

        // Generate the result from the cruddable operation
        result = crud.Update(request);
      } else {
        log.severe("Failed tryial to access already logged entity from user [" + getSessionUserName() + "]");
        result = new UpdateGatewayResponse();
        uge = new Error("GW01", "Error al ingresar al sistema, por favor revise sus credenciales", "UpdateGateway");
      }
      logOut(pl);
    } catch (Exception e) {

      if (e instanceof javax.ejb.EJBAccessException) {
        log.severe("Not authorized access tryial on update method for [" + entityName + "]");
        // Create the failure result message for web service
        result = new UpdateGatewayResponse();
        uge = new Error("GW01", "Error al ingresar al sistema, por favor revise sus credenciales", "UpdateGateway");
        result.setError(uge);
      } else {
        // Something went wrong, log the severe message
        log.severe("Error while updating cruddable entity [" + entityName + "]");

        // Log details about the failure
        log.throwing(OperationsGateway.class.getName(), "UpdateGateway", e);

        // Create the failure result message for web service
        result = new UpdateGatewayResponse();
        uge = new Error("GW02", "Se ha encontrado un error al intentar actualizar el registro en la base de datos.",
            "UpdateGateway");
        result.setError(uge);
      }
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

    if (getSessionUserName() == null)
      throw new WebServiceException("User is not logged in");

    // Generate request from input parameters
    GatewayRequest request = new GatewayRequest();
    request.setEntityName(entityName);

    // Generate request content from list of fields
    GatewayContent gContent = new GatewayContent();
    gContent.setFields(content);
    request.setContent(gContent);
    log.fine("Casted Request:" + request.toString());

    BaseResponse result = null;
    Error uge = null;

    try {
      ProgrammaticLogin pl = new ProgrammaticLogin();
      if (logIn(pl)) {
        // Retrieve a cruddable instance from an EJB in the glassfish
        // context
        Cruddable crud = getCruddable(entityName);

        // Generate the result from the cruddable operation
        result = crud.Delete(request);
      } else {
        result = new UpdateGatewayResponse();
        uge = new Error("GW01", "Error al ingresar al sistema, por favor revise sus credenciales", "DeleteGateway");
      }
      logOut(pl);
    } catch (Exception e) {

      if (e instanceof javax.ejb.EJBAccessException) {
        log.severe("Not authorized access tryial on delete method for [" + entityName + "]");
        // Create the failure result message for web service
        result = new UpdateGatewayResponse();
        uge = new Error("GW01", "Error al ingresar al sistema, por favor revise sus credenciales", "DeleteGateway");
        result.setError(uge);
      } else {
        // Something went wrong, log the severe message
        log.severe("Error while deleting cruddable entity [" + entityName + "]");

        // Log details about the failure
        log.throwing(OperationsGateway.class.getName(), "DeleteGateway", e);

        // Create the failure result message for web service
        result = new UpdateGatewayResponse();
        uge = new Error("GW02", "Se ha encontrado un error al intentar eliminar el registro en la base de datos.",
            "DeleteGateway");
        result.setError(uge);
      }
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
  public BaseResponse loginService(@WebParam(name = "userName") String userName, @WebParam(name = "password") String password) {

    BaseResponse result = new BaseResponse();
    HttpSession session = getSession();
    if (session == null)
      throw new WebServiceException("No session in WebServiceContext");

    // Evaluate username and password and provide allowedRoles
    ProgrammaticLogin pl = new ProgrammaticLogin();

    boolean logged = false;
    try {
      logged = pl.login(userName, password.toCharArray(), REALM_NAME, true);
      // TODO: Implement user lock
      if (logged) {
        log.info("Starting new Session");
        session.setAttribute("userName", userName);
        session.setAttribute("password", password);
        
        result.setError(new Error("0", "Success", "Login"));
        pl.logout();
      } else {
        result.setError(new Error("LOG01", "No es posible ingresar al sistema, revise sus credenciales", "Login"));
      }
    } catch (Exception e) {
      log.throwing("LOG02", "Unable to log in.", e);
      result.setError(new Error("LOG02", "No es posible ingresar al sistema, revise sus credenciales. \n" + e.getMessage(),
          "Login"));
    }

    return result;
  }

  /**
   * Provides an interface to empty session information.
   * 
   * @return
   */
  @WebMethod(operationName = "Logout")
  public String logoutService() {
    HttpSession session = getSession();
    if (session != null) {
      session.removeAttribute("userName");
      session.removeAttribute("passord");
    }

    log.info("Closing session.!");
    return "OK";
  }

  /**
   * Operation to send email and sms reports to ranchers.
   * 
   * @param rancherId
   * @param message
   * @return
   */
  @WebMethod(operationName = "SendSimpleMessage")
  public String sendMessage(@WebParam(name = "rancherId") long rancherId, @WebParam(name = "message") String message) {

    if (getSessionUserName() == null)
      throw new WebServiceException("User is not logged in");

    Context jndiContext = null;
    Messageable messenger = null;
    String commonPrefix = "java:global/ComProxy/";
    try {
      jndiContext = new InitialContext();
      messenger = (Messageable) jndiContext.lookup(commonPrefix + "Messenger");
      log.fine("Messenger instance created.");
    } catch (java.lang.Exception e) {
      log.severe("Unable to load jndi context component");
      log.throwing(this.getClass().getName(), "getCruddable", e);
      return "El módulo de mensajería no está correctamente instalado.";
    }

    if (messenger != null) {
      messenger.login(getSessionUserName(), getSessionPassword());
      if (!messenger.sendSimpleMessage(rancherId, message)) {
        return "Error al enviar mensaje.";
      }
    } else {
      log.severe("No se pudo instanciar el módulo de mensajería.");
      return "El módulo de mensajería no está correctamente instalado.";
    }

    return "OK";
  }

  /**
   * Send a PDF file by email and route to the PDF file by SMS.
   * 
   * @param rancherId
   * @param reportName
   * @return
   */
  @WebMethod(operationName = "SendReport")
  public String sendReport(@WebParam(name = "rancherId") long rancherId, @WebParam(name = "reportName") String reportName) {

    if (getSessionUserName() == null)
      throw new WebServiceException("User is not logged in");

    Context jndiContext = null;
    Messageable messenger = null;
    String commonPrefix = "java:global/ComProxy/";
    try {
      jndiContext = new InitialContext();
      messenger = (Messageable) jndiContext.lookup(commonPrefix + "Messenger");
      log.fine("Messenger instance created.");
    } catch (java.lang.Exception e) {
      log.severe("Unable to load jndi context component");
      log.throwing(this.getClass().getName(), "getCruddable", e);
      return "El módulo de mensajería no está correctamente instalado.";
    }

    if (messenger != null) {
      messenger.login(getSessionUserName(), getSessionPassword());
      if (!messenger.sendReport(rancherId, reportName)) {
        return "Error al enviar mensaje.";
      }
    } else {
      log.severe("No se pudo instanciar el módulo de mensajería.");
      return "El módulo de mensajería no está correctamente instalado.";
    }

    return "OK";

  }

  private Cruddable getCruddable(String cruddableName) {
    Context jndiContext = null;
    Cruddable crud = null;
    String commonPrefix = "java:global/Proxy/";
    String commonSuffix = "Proxy";
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

  private String getSessionUserName() {
    HttpSession session = getSession();
    if (session == null)
      throw new WebServiceException("No session in WebServiceContext");

    return (String) session.getAttribute("userName");
  }

  private String getSessionPassword() {
    HttpSession session = getSession();
    if (session == null)
      throw new WebServiceException("No session in WebServiceContext");

    return (String) session.getAttribute("password");
  }

  private HttpSession getSession() {
    MessageContext mc = wsContext.getMessageContext();
    return ((javax.servlet.http.HttpServletRequest) mc.get(MessageContext.SERVLET_REQUEST)).getSession();
  }

  private boolean logIn(ProgrammaticLogin pl) throws Exception {
    boolean propagateException = false;
    return pl.login(getSessionUserName(), getSessionPassword().toCharArray(), REALM_NAME, propagateException);
  }

  private boolean logOut(ProgrammaticLogin pl) {
    return pl.logout();
  }

}
