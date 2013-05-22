package com.tramex.sisoprega.proxy.bean;

import javax.annotation.security.RolesAllowed;
import javax.ejb.Stateless;

import com.tramex.sisoprega.gateway.request.CreateRequest;
import com.tramex.sisoprega.gateway.request.ReadRequest;
import com.tramex.sisoprega.gateway.response.BaseResponse;
import com.tramex.sisoprega.gateway.response.CreateResponse;
import com.tramex.sisoprega.gateway.response.ReadResponse;
import com.tramex.sisoprega.proxy.Cruddable;
import com.tramex.sisoprega.proxy.common.BaseBean;

/**
 * Session Bean implementation class CattleClassBean
 */
@Stateless
@RolesAllowed({"sisoprega_admin", "mx_usr", "us_usr", "rancher", "agency"})
public class CattleClassBean extends BaseBean implements Cruddable {
  
  @RolesAllowed({"sisoprega_admin", "mx_usr", "us_usr"})
  @Override
  public CreateResponse Create(CreateRequest request) {
    return super.Create(request);
  }
  
  @RolesAllowed({"sisoprega_admin", "mx_usr", "us_usr"})
  @Override
  public ReadResponse Update(CreateRequest request) {
    return super.Update(request);
  }
  
  @RolesAllowed({"sisoprega_admin", "mx_usr", "us_usr"})
  @Override
  public BaseResponse Delete(ReadRequest request) {
    return super.Delete(request);
  }
}
