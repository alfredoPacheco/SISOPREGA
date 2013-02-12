/**
 * THIS IS A COMMERCIAL PROGRAM PROVIDED FOR TRAMEX AND IT'S ASSOCIATES
 * BUILT BY EXTERNAL SOFTWARE PROVIDERS.
 * THE SOFTWARE COMPRISING THIS SYSTEM IS THE PROPERTY OF TRAMEX OR ITS
 * LICENSORS.
 * 
 * ALL COPYRIGHT, PATENT, TRADE SECRET, AND OTHER INTELLECTUAL PROPERTY RIGHTS
 * IN THE SOFTWARE COMPRISING THIS SYSTEM ARE, AND SHALL REMAIN, THE VALUABLE
 * PROPERTY OF TRAMEX OR ITS LICENSORS.
 * 
 * USE, DISCLOSURE, OR REPRODUCTION OF THIS SOFTWARE IS STRICTLY PROHIBITED,
 * EXCEPT UNDER WRITTEN LICENSE FROM TRAMEX OR ITS LICENSORS.
 * 
 * &copy; COPYRIGHT 2012 TRAMEX. ALL RIGHTS RESERVED.
 */
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

/**
 * Testing harness for communication methods.<BR/>
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 *             Alan Del Rio                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Alan Del Rio
 * 
 */
public class Main {
	public static void main(final String[] args) throws InitSmsProviderException, SendSmsException, InitEmailProviderException{
		File xmlFile=new File("C:\\envoyConfig.xml");	
		SmsProvider smsMan=SmsFactory.getProvider("clickatell");
		Sms sms=new Sms("","","");
		smsMan.setConfiguration(xmlFile);
		smsMan.sendSMS(sms);
		
		System.out.println(smsMan.getResponseMsg());		 
		 //diego.torres.fuerte@gmail.com
		EmailSender smtp = EmailFactory.getSender("smtp");
		smtp.setConfiguration(xmlFile);
		Email email = new Email("alan.delrio@hotmail.com",
								"info@sisoprega.com",
								"Javadabadooo Title",
								"Javadabadooo Message");
		smtp.sendEmail(email);
	}
}
