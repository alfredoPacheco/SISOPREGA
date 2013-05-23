package com.tramex.sisoprega.proxy.bean;

import com.tramex.sisoprega.proxy.Cruddable;
import com.tramex.sisoprega.proxy.common.BaseBean;

import javax.annotation.security.RolesAllowed;
import javax.ejb.Stateless;

/**
 * Session Bean implementation class FeedOrderBean
 */
@Stateless
@RolesAllowed({"sisoprega_admin", "mx_usr", "us_usr", "rancher", "agency"})
public class FeedOrderBean extends BaseBean implements Cruddable {

}
