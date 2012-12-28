package com.sisoprega.envoy.sms;

public class SendSmsException extends Exception {
	private static final long serialVersionUID = 8366592616283905029L;
	
	public SendSmsException(String message) {
        super(message);
    }
}
