/**
 * 
 */
package com.tramex.sisoprega.exporter.validator;

import javax.faces.application.FacesMessage;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.validator.Validator;
import javax.faces.validator.ValidatorException;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.servlet.http.HttpServletRequest;

import com.tramex.sisoprega.identity.IdentityManagerException;
import com.tramex.sisoprega.identity.RemoteIdentity;

/**
 * USAGE COMMENT HERE
 *  
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * Jul 24, 2013     Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 *
 * 
 */
public class CurrentPasswordValidator implements Validator {
  
  private RemoteIdentity identityManager;

  /**
   * 
   */
  public CurrentPasswordValidator() {
    
  }

  /* (non-Javadoc)
   * @see javax.faces.validator.Validator#validate(javax.faces.context.FacesContext, javax.faces.component.UIComponent, java.lang.Object)
   */
  @Override
  public void validate(FacesContext context, UIComponent component, Object value) throws ValidatorException {
    String currentPassword = (String) value;
    
    HttpServletRequest request = (HttpServletRequest) context.getExternalContext().getRequest();
    String loggedinUser = request.getUserPrincipal().getName();
    
    try {
      if(identityManager==null)
        setIdentityManager();
      
      if(!identityManager.validateCurrentPassword(loggedinUser, currentPassword)){
        FacesMessage message = new FacesMessage();
        message.setDetail("La contraseña no coincide con su contraseña actual.");
        message.setSummary("Contraseña no coincide");
        message.setSeverity(FacesMessage.SEVERITY_ERROR);
        throw new ValidatorException(message);
      }
    } catch (IdentityManagerException e) {
      FacesMessage message = new FacesMessage();
      message.setDetail("Error al intentar leer los datos del usuario, intentelo más tarde.");
      message.setSummary("Error al leer los datos");
      message.setSeverity(FacesMessage.SEVERITY_ERROR);
      throw new ValidatorException(message);
    }
  }
  
  private void setIdentityManager(){
    Context jndiContext = null;
    try {
      jndiContext = new InitialContext();
      identityManager = (RemoteIdentity) jndiContext.lookup("java:global/BusinessLogicProxy/IdentityManagerBean");
    } catch (java.lang.Exception e) {
      e.printStackTrace();
    }
  }

}
