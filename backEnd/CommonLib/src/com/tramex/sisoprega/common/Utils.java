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
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 *
 */
public class Utils {
	
	/**
	 * Retrieves a value from a GatewayRequest.Content, given a field name.
	 * Will return null if no field name is found that match the field name.
	 * Will return the first field value found if many field names are in the content
	 * with the same name.
	 * There is no difference in lower and upper case, so var and VAR are declared
	 * as the same name. This method will also trim the contents of both, the
	 * given fieldName and the provided names in the request model.
	 * @param request
	 * @param fieldName
	 * @return
	 */
	public static String valueFromRequest(GatewayRequest request, String fieldName){
		
		String result = null;
		
		for(Field field : request.getContent().getFields()){
			String fName = field.getName().toUpperCase().trim();
			if(fName.equals(fieldName.toUpperCase().trim())){
				result = field.getValue();
				break;
			}
		}
		
		return result;
	}
}
