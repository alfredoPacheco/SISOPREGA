package com.appco.demo.services;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;
import javax.naming.Context;
import javax.naming.InitialContext;

import org.apache.log4j.Logger;

import com.appco.demo.ejb.SecuredBeanOperationsRemote;

@WebService
public class SecureOperations {
	
	private Logger log = Logger.getLogger(SecureOperations.class);
	
	private SecuredBeanOperationsRemote sbo;
	
	public SecureOperations(){
		log.info("Creating web service instance");
		if (sbo == null) {
			log.debug("Creating sbo instance");
			Context jndiContext = null;
			try{
				jndiContext = new InitialContext();
				sbo = (SecuredBeanOperationsRemote)jndiContext.lookup("SBO");
				log.debug("SBO instance created");
			} catch(Exception e){
				log.error("Unable to load jndi context component", e);
			}
		}else{
			log.debug("Secure Operations Bean Already Created");
		}
		
	}
	
	@WebMethod
	public String greet(@WebParam(name="yourName") String yourName){
		log.debug("Geetings!");
		return sbo.greetMe(yourName);
	}
}
