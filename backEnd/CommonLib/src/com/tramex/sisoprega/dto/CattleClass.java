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
package com.tramex.sisoprega.dto;

/**
 * Defines the model for the Rancher Contact entity.<BR/>
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 11/11/2012  Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 */

public class CattleClass {
    private long catclassId;
    private String catclassName;

    /**
     * @return the catclassId
     */
    public long getCatclassId() {
	return catclassId;
    }

    /**
     * @param catclassId
     *            the catclassId to set
     */
    public void setCatclassId(long catclassId) {
	this.catclassId = catclassId;
    }

    /**
     * @return the catclassName
     */
    public String getCatclassName() {
	return catclassName;
    }

    /**
     * @param catclassName
     *            the catclassName to set
     */
    public void setCatclassName(String catclassName) {
	this.catclassName = catclassName;
    }

    @Override
    public String toString() {
	return "catclassId:" + catclassId + ";catclassName:" + catclassName
		+ ";";
    }
}
