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

import java.util.ArrayList;
import java.util.List;

/**
 * This is the expected content in the Create gateway interface.<BR/>
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
public class GatewayContent {
    private List<Field> fields;

    /**
     * Returns the whole list of fields, which you can use to add and retrieve
     * fields in the model.
     * 
     * @return List of fields
     */
    public List<Field> getFields() {
	if (this.fields == null)
	    this.fields = new ArrayList<Field>();
	return fields;
    }

    public void setFields(List<Field> fields) {
	this.fields = fields;
    }

    @Override
    public String toString() {
	String result = "Fields[";

	for (Field field : fields) {
	    result += field.getName() + ":" + field.getValue() + ";";
	}

	return result + "]";
    }
}
