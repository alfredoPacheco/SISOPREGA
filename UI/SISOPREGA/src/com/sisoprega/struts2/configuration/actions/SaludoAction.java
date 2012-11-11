package com.sisoprega.struts2.configuration.actions;

import com.opensymphony.xwork2.ActionSupport;

@SuppressWarnings("serial")
public class SaludoAction extends ActionSupport{
	private String mensaje;
		
	@Override
	public String execute(){	
		mensaje = "Bienvenido a struts 2";
		return SUCCESS;
	}
	
	public String getMensaje(){
		return mensaje;
	}
}
