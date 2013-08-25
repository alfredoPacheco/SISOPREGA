package com.tramex.sisoprega.proxy.bean;

import javax.annotation.security.RolesAllowed;
import javax.ejb.Stateless;

import com.tramex.sisoprega.proxy.Cruddable;
import com.tramex.sisoprega.proxy.common.BaseBean;

/**
 * Session Bean implementation class CustomerBean
 */
@Stateless
@RolesAllowed({"us_usr", "agency"})
public class CarrierBean extends BaseBean implements Cruddable {

}
