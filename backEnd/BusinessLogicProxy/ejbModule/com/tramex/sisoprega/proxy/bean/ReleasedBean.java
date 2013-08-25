/**
 * 
 */
package com.tramex.sisoprega.proxy.bean;

import javax.annotation.security.DenyAll;
import javax.annotation.security.RolesAllowed;
import javax.ejb.Stateless;

import com.tramex.sisoprega.gateway.request.CreateRequest;
import com.tramex.sisoprega.gateway.request.ReadRequest;
import com.tramex.sisoprega.gateway.response.BaseResponse;
import com.tramex.sisoprega.gateway.response.ReadResponse;
import com.tramex.sisoprega.proxy.Cruddable;
import com.tramex.sisoprega.proxy.common.BaseBean;

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
 * Aug 25, 2013     Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 *
 * 
 */
@Stateless
@RolesAllowed({"us_usr", "agency"})
public class ReleasedBean extends BaseBean implements Cruddable {

  /* (non-Javadoc)
   * @see com.tramex.sisoprega.proxy.Cruddable#Create(com.tramex.sisoprega.gateway.request.CreateRequest)
   */
  @Override
  @DenyAll
  public ReadResponse Create(CreateRequest request) {
    return null;
  }
  
  /* (non-Javadoc)
   * @see com.tramex.sisoprega.proxy.Cruddable#Update(com.tramex.sisoprega.gateway.request.CreateRequest)
   */
  @Override
  @DenyAll
  public ReadResponse Update(CreateRequest request) {
    return null;
  }

  /* (non-Javadoc)
   * @see com.tramex.sisoprega.proxy.Cruddable#Delete(com.tramex.sisoprega.gateway.request.ReadRequest)
   */
  @Override
  @DenyAll
  public BaseResponse Delete(ReadRequest request) {
    return null;
  }

}
