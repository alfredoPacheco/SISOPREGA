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
package com.tramex.sisoprega.common;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.logging.Logger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Common utilities that will be used across the back end solution.<BR/>
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 10/28/2012  Diego Torres                 Initial Version.
 * 11/30/2012  Diego Torres                 Empty string dates are as null dates.
 * 03/10/2013  Alfredo Pacheco              Implemented dates with times. 
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 */
public class Utils {

  private static Logger log = Logger.getLogger(Utils.class.getCanonicalName());

  private final static String EMAIL_REGEX_PATTERN = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
      + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
  
  /**
   * Retrieves a value from a GatewayRequest.Content, given a field name. Will
   * return null if no field name is found that match the field name. Will
   * return the first field value found if many field names are in the content
   * with the same name. There is no difference in lower and upper case, so var
   * and VAR are declared as the same name. This method will also trim the
   * contents of both, the given fieldName and the provided names in the request
   * model.
   * 
   * @param request
   * @param fieldName
   * @return
   */
  public static String valueFromRequest(GatewayRequest request, String fieldName) {

    log.entering(Utils.class.getCanonicalName(), "valueFromRequest");
    log.fine("Searching for field [" + fieldName + "]");

    String result = null;

    for (Field field : request.getContent().getFields()) {
      String fName = field.getName().toUpperCase().trim();
      log.finer(fName + "?");
      if (fName.equals(fieldName.toUpperCase().trim())) {
        log.fine("Field found with value: [" + field.getValue() + "]");
        result = field.getValue();
        break;
      }
    }

    log.exiting(Utils.class.getCanonicalName(), "valueFromRequest");
    return result;
  }

  public static Object valueFromRequest(GatewayRequest request, String fieldName, Class<?> type) throws ParseException {
    log.entering(Utils.class.getCanonicalName(), "valueFromRequest");
    log.fine("Casting fieldType [" + type.getName() + "]");
    Object result = null;

    String sValue = valueFromRequest(request, fieldName);
    if (sValue != null && !sValue.trim().equals("")) {
      if (type.getName().equals("int")) {
        result = Integer.parseInt(sValue);
        log.finest("found integer: " + sValue);
      }
      if (type.getName().equals("long")) {
        result = Long.parseLong(sValue);
        log.finest("found long: " + sValue);
      }
      if (type.getName().equals(Date.class.getName()) && !sValue.trim().equals("")) {
    	  String f = "MM/dd/yyyy HH:mm";
    	  try{
        	Date dValue = new SimpleDateFormat(f).parse(sValue);
	        result = dValue;
	        log.finest("found date: " + sValue);
        }catch(Exception e){
        	log.severe("unable parse ["+ sValue +"] to format: " + f);
        	f = "MM/dd/yyyy";
        	log.severe("trying to parse [" + sValue + "] to format: " + f);
        	try{
	        	Date dValue = new SimpleDateFormat(f).parse(sValue);
		        result = dValue;
		        log.finest("found date: " + sValue);
        	}catch(Exception ex){
        		log.severe("unable parse ["+ sValue +"] to format: " + f);
        	}
        }
      }
      if(type.getName().equals("boolean")){
        result = Boolean.parseBoolean(sValue);
        log.fine("found boolean: " + sValue);
      }
      if(type.getName().equals("double")){
          result = Double.parseDouble(sValue);
          log.fine("found double: " + sValue);
        }
    }

    log.exiting(Utils.class.getCanonicalName(), "valueFromRequest");
    return result;
  }
  
  /**
   * Validates email against pattern.
   * @param email
   * @return
   */
  public static boolean isValidEmail(String email){
    Pattern pattern = Pattern.compile(EMAIL_REGEX_PATTERN);
    Matcher matcher = pattern.matcher(email);
    return matcher.matches();
  }
}
