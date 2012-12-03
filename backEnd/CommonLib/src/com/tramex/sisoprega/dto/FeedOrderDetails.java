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
public class FeedOrderDetails {
    private long fodId;
    private long orderId;
    private long foodId;
    private double quantity;
    private String handling;
    /**
     * @return the id
     */
    public long getFodId() {
        return fodId;
    }
    /**
     * @param id the id to set
     */
    public void setFodId(long fodId) {
       this.fodId = fodId;
    }
    /**
     * @return the orderId
     */
    public long getOrderId() {
        return orderId;
    }
    /**
     * @param orderId the orderId to set
     */
    public void setOrderId(long orderId) {
        this.orderId = orderId;
    }
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
     * @return the quantity
     */
    public double getQuantity() {
        return quantity;
    }
    /**
     * @param quantity the quantity to set
     */
    public void setQuantity(double quantity) {
        this.quantity = quantity;
    }
    /**
     * @return the handling
     */
    public String getHandling() {
        return handling;
    }
    /**
     * @param handling the handling to set
     */
    public void setHandling(String handling) {
        this.handling = handling;
    }
}
