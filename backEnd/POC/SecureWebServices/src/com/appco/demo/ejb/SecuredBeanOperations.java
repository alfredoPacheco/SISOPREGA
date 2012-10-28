package com.appco.demo.ejb;

import javax.ejb.Stateless;

/**
 * Session Bean implementation class SecuredBeanOperations
 */
@Stateless
public class SecuredBeanOperations implements SecuredBeanOperationsRemote {

    public String greetMe(String name){
    	return "Hello " + name;
    }

}
