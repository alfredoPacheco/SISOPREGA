package com.sisoprega.struts2.configuration.actions;

import com.opensymphony.xwork2.ActionSupport;

@SuppressWarnings("serial")
public class SaludoUsuarioAction extends ActionSupport{
	private String nombre;
    private int numero;
    private String mensaje;

    public String getMensaje()
    {
        return mensaje;
    }
    public void setNombre(String nombre)
    {
        this.nombre = nombre;
    }

    public void setNumero(int numero)
    {
        this.numero = numero;
    }
	
    @Override
    public String execute() throws Exception
    {
        mensaje = "Bienvenido " + nombre + " al munddo de Struts 2. Tu número de la suerte de hoy es " + numero;
            
        return SUCCESS;
    }
    
}
