import java.io.File;

import com.sisoprega.envoy.email.Email;
import com.sisoprega.envoy.email.EmailFactory;
import com.sisoprega.envoy.email.EmailSender;
import com.sisoprega.envoy.email.InitEmailProviderException;
import com.sisoprega.envoy.sms.InitSmsProviderException;
import com.sisoprega.envoy.sms.SendSmsException;
import com.sisoprega.envoy.sms.Sms;
import com.sisoprega.envoy.sms.SmsFactory;
import com.sisoprega.envoy.sms.SmsProvider;


public class Main {
	public static void main(final String[] args) throws InitSmsProviderException, SendSmsException, InitEmailProviderException{
		File xmlFile=new File("C:\\envoyConfig.xml");	
		SmsProvider smsMan=SmsFactory.getProvider("clickatell");
		Sms sms=new Sms("","","");
		smsMan.setConfiguration(xmlFile);
		smsMan.sendSMS(sms);
		
		System.out.println(smsMan.getResponseMsg());		 
		 
		EmailSender smtp = EmailFactory.getSender("smtp");
		smtp.setConfiguration(xmlFile);
		Email email = new Email("",
								"",
								"",
								"",
								"text/plain");
		smtp.sendEmail(email);
	}
}
