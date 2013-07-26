/**
 * 
 */
package com.tramex.sisoprega.exporter.validator;

import javax.ejb.EJB;
import javax.faces.application.FacesMessage;
import javax.faces.component.UIComponent;
import javax.faces.component.UIInput;
import javax.faces.context.FacesContext;
import javax.faces.validator.Validator;
import javax.faces.validator.ValidatorException;

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
public class ConfirmPasswordValidator implements Validator {

  @EJB(lookup = "java:global/BusinessLogicProxy/IdentityManagerBean")
  private RemoteIdentity identityManager;
  
  /**
   * 
   */
  public ConfirmPasswordValidator() {
  }

  /* (non-Javadoc)
   * @see javax.faces.validator.Validator#validate(javax.faces.context.FacesContext, javax.faces.component.UIComponent, java.lang.Object)
   */
  @Override
  public void validate(FacesContext context, UIComponent component, Object value) throws ValidatorException {
    UIInput newPasswordInput = (UIInput) context.getViewRoot().findComponent("changePasswordForm:new_password");
    
    String newPassword = (String) newPasswordInput.getValue();
    String confirmPassword = (String) value;

    if(!newPassword.equals(confirmPassword)){
      FacesMessage message = new FacesMessage();
      message.setDetail("La confirmación de la contraseña ha fallado, capture nuevamente la nueva contraseña y su confirmación.");
      message.setSummary("Confirmación inconsistente");
      message.setSeverity(FacesMessage.SEVERITY_ERROR);
      throw new ValidatorException(message);
    }
  }
}
