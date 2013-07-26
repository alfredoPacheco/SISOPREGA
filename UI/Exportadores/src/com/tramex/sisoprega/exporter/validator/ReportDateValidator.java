/**
 * 
 */
package com.tramex.sisoprega.exporter.validator;

import java.util.Date;

import javax.faces.application.FacesMessage;
import javax.faces.component.UIComponent;
import javax.faces.component.UIInput;
import javax.faces.context.FacesContext;
import javax.faces.validator.Validator;
import javax.faces.validator.ValidatorException;

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
public class ReportDateValidator implements Validator {

  /**
   * 
   */
  public ReportDateValidator() {
  }

  /*
   * (non-Javadoc)
   * 
   * @see
   * javax.faces.validator.Validator#validate(javax.faces.context.FacesContext,
   * javax.faces.component.UIComponent, java.lang.Object)
   */
  @Override
  public void validate(FacesContext context, UIComponent component, Object value) throws ValidatorException {
    UIInput fromDateInput = (UIInput) context.getViewRoot().findComponent("filterForm:fromDate");
    Date fromDate = (Date) fromDateInput.getValue();
    Date toDate = (Date) value;
    
    if (toDate.before(fromDate)) {
      FacesMessage message = new FacesMessage();
      message.setDetail("La fecha final del rango seleccionado no puede ser menor a la inicial.");
      message.setSummary("Rango de fechas inválido");
      message.setSeverity(FacesMessage.SEVERITY_ERROR);
      throw new ValidatorException(message);
    }
  }

}
