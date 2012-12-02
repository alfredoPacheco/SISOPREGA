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
public class Food {
    private long foodId;
    private String foodName;
    /**
     * @return the foodId
     */
    public long getFoodId() {
        return foodId;
    }
    /**
     * @param foodId the foodId to set
     */
    public void setFoodId(long foodId) {
        this.foodId = foodId;
    }
    /**
     * @return the foodName
     */
    public String getFoodName() {
        return foodName;
    }
    /**
     * @param foodName the foodName to set
     */
    public void setFoodName(String foodName) {
        this.foodName = foodName;
    }
   
}
