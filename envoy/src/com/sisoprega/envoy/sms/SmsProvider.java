package com.sisoprega.envoy.sms;
import java.io.File;

public interface SmsProvider {
	enum response {
	    OK,WARNING,ERROR 
	}		
	void doLogin(final String userID, final String passWord) throws LoginSmsException;
	void sendSMS(Sms sms) throws SendSmsException;
	void setConfiguration(File xmlFile) throws InitSmsProviderException;
	String getResponseMsg();
	response getAck();	
}
