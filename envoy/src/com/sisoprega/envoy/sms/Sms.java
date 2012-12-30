package com.sisoprega.envoy.sms;

public class Sms {
	private final String sTo;
	private final String sFrom;
	private final String sMsg;
	public Sms(final String sTo, final String sFrom, final String sMsg){
		this.sFrom=sFrom;
		this.sTo=sTo;
		this.sMsg=sMsg;
	}
	public String getTo() {
		return sTo;
	}
	public String getFrom() {
		return sFrom;
	}
	public String getMsg() {
		return sMsg;
	}
}
