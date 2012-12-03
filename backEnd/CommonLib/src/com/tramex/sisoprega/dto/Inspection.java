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

import java.util.Date;

/**
 * Defines the model for the Cattle Type entity.<BR/>
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 1/12/2012  Jaime Figueroa                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Jaime Figueroa
 *
 */
public class Inspection {
    private long inspectionId;
    private long receptionId;
    private Date inspectionDate;
    /**
     * @return the inspectionId
     */
    public long getInspectionId() {
        return inspectionId;
    }
    /**
     * @param inspectionId the inspectionId to set
     */
    public void setInspectionId(long inspectionId) {
        this.inspectionId = inspectionId;
    }
    /**
     * @return the receptionId
     */
    public long getReceptionId() {
        return receptionId;
    }
    /**
     * @param receptionId the receptionId to set
     */
    public void setReceptionId(long receptionId) {
        this.receptionId = receptionId;
    }
    /**
     * @return the inspectionDate
     */
    public Date getInspectionDate() {
        return inspectionDate;
    }
    /**
     * @param inspectionDate the inspectionDate to set
     */
    public void setInspectionDate(Date inspectionDate) {
        this.inspectionDate = inspectionDate;
    }
}
