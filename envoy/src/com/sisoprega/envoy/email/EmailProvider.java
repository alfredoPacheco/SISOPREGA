package com.sisoprega.envoy.email;

import java.io.File;

public interface EmailProvider {
	boolean sendEmail(final Email email);
	void setConfiguration (File xmlFile) throws InitEmailProviderException ;
}
