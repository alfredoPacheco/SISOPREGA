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
 * Exception is a model that will be used by all common response interfaces.<BR/>
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 10/27/2012  Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 *
 */
public class Exception {
	private String exceptionId;
	private String exceptionDescription;
	private String origin;
	
	public Exception(){
		//Empty constructor for JaxB.
	}
	
	public Exception(String exceptionId, String exceptionDescription, String origin){
		this.exceptionId = exceptionId;
		this.exceptionDescription = exceptionDescription;
		this.origin = origin;
	}
	
	/**
	 * @return the exceptionId
	 */
	public String getExceptionId() {
		return exceptionId;
	}
	/**
	 * @param exceptionId the exceptionId to set
	 */
	public void setExceptionId(String exceptionId) {
		this.exceptionId = exceptionId;
	}
	/**
	 * @return the exceptionDescription
	 */
	public String getExceptionDescription() {
		return exceptionDescription;
	}
	/**
	 * @param exceptionDescription the exceptionDescription to set
	 */
	public void setExceptionDescription(String exceptionDescription) {
		this.exceptionDescription = exceptionDescription;
	}
	/**
	 * @return the origin
	 */
	public String getOrigin() {
		return origin;
	}
	/**
	 * @param origin the origin to set
	 */
	public void setOrigin(String origin) {
		this.origin = origin;
	}
	
}
