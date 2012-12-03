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
public class InspectionBarnyard {
    private long ibId;
    private long inspectionId;
    private long barnyardId;
    /**
     * @return the ibId
     */
    public long getIbId() {
        return ibId;
    }
    /**
     * @param ibId the ibId to set
     */
    public void setIbId(long ibId) {
        this.ibId = ibId;
    }
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
     * @return the barnyardId
     */
    public long getBarnyardId() {
        return barnyardId;
    }
    /**
     * @param barnyardId the barnyardId to set
     */
    public void setBarnyardId(long barnyardId) {
        this.barnyardId = barnyardId;
    }
}
