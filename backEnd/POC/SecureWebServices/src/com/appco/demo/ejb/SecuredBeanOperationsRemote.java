package com.appco.demo.ejb;

import javax.ejb.Remote;

@Remote
public interface SecuredBeanOperationsRemote {
	 String greetMe(String name);
}
