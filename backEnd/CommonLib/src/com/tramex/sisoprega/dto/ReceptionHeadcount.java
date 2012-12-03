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
 * @author Jaime Figueroa
 *
 */
public class ReceptionHeadcount {
    public long headcountId;
    public long receptionId;
    public double weight;
    public long weightUom;
    /**
     * @return the headcountId
     */
    public long getHeadcountId() {
        return headcountId;
    }
    /**
     * @param headcountId the headcountId to set
     */
    public void setHeadcountId(long headcountId) {
        this.headcountId = headcountId;
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
     * @return the weight
     */
    public double getWeight() {
        return weight;
    }
    /**
     * @param weight the weight to set
     */
    public void setWeight(double weight) {
        this.weight = weight;
    }
    /**
     * @return the weightUom
     */
    public long getWeightUom() {
        return weightUom;
    }
    /**
     * @param weightUom the weightUom to set
     */
    public void setWeightUom(long weightUom) {
        this.weightUom = weightUom;
    }    
}
