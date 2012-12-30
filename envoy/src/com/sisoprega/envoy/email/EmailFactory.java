package com.sisoprega.envoy.email;
public class EmailFactory {
	  public static EmailSender getSender(String email){
		  if("smtp".equalsIgnoreCase(email)){			 
			  return new SmtpEmailSender();
		  }else{
			  return null;
		  }
	  }
}