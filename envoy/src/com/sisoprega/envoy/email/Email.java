package com.sisoprega.envoy.email;

public class Email {
	private final String to;
	private final String from;
	private final String msg;
	private final String subject;
	private final String contentType;
	public Email(final String to, final String from,final String subject, final String msg,final String contentType){
		this.from=from;
		this.to=to;
		this.msg=msg;
		this.subject=subject;
		this.contentType=contentType;
	}
	
	public String getTo() {
		return to;
	}
	public String getFrom() {
		return from;
	}
	public String getMsg() {
		return msg;
	}
	public String getContentType() {
		return contentType;
	}
	public String getSubject() {
		return subject;
	}
}
