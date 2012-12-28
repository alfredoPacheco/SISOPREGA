import java.io.File;

import com.sisoprega.envoy.email.Email;
import com.sisoprega.envoy.email.InitEmailProviderException;
import com.sisoprega.envoy.email.SmtpEmailSender;
import com.sisoprega.envoy.sms.ClickatellProvider;
import com.sisoprega.envoy.sms.InitSmsProviderException;
import com.sisoprega.envoy.sms.SendSmsException;
import com.sisoprega.envoy.sms.Sms;


public class Main {
	public static void main(final String[] args) throws InitSmsProviderException, SendSmsException, InitEmailProviderException{
		File xmlFile=new File("C:\\envoyConfig.xml");
	
		ClickatellProvider smsMan=new ClickatellProvider();
		Sms sms=new Sms("19152472405","19154938421","YEY!!asdkasj klas lkdjas klasdj lasjkdl kasjldk jaslkdjla kjsdlkas jladkjlas kjdlaskj!");
		smsMan.setConfiguration(xmlFile);
		smsMan.sendSMS(sms);
		System.out.println(smsMan.getResponseMsg());		 
		 
		SmtpEmailSender smtp = new SmtpEmailSender();
		smtp.setConfiguration(xmlFile);
		Email email = new Email("alan.delrio@hotmail.com",
								"info@sisoprega.com",
								"Test subject","Test body Line 1 \n Test body Line 2",
								"text/plain");
		smtp.sendEmail(email);
	}
}
