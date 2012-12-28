package com.sisoprega.envoy.sms;

public class SmsFactory {
	  public static SmsProvider getProvider(String sms){
		  if("clickatell".equalsIgnoreCase(sms)){			 
			  return new ClickatellProvider();
		  }else{
			  return null;
		  }
	  }
}