package com.tramex.sisoprega.proxy.bean;

import javax.annotation.security.RolesAllowed;
import javax.ejb.Stateless;

import com.tramex.sisoprega.proxy.Cruddable;
import com.tramex.sisoprega.proxy.common.BaseBean;

/**
 * Session Bean implementation class HermanaCorteBean
 */
@Stateless
@RolesAllowed({"sisoprega_admin", "mx_usr", "us_usr", "rancher", "agency"})
public class HermanaCorteBean extends BaseBean implements Cruddable {

}