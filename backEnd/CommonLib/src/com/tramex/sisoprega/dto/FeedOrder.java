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
 *  Defines the model for the Feed Order Type entity.<BR/>
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 12/01/2012  Jaime Figueroa                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Jaime Figueroa
 *
 */
public class FeedOrder {
    private long orderId;
    private long  receptionId;
    private Date feedDate;
    private String feedOriginator;
    private String handling;
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
     * @return the feedDate
     */
    public Date getFeedDate() {
        return feedDate;
    }
    /**
     * @param feedDate the feedDate to set
     */
    public void setFeedDate(Date feedDate) {
        this.feedDate = feedDate;
    }
    /**
     * @return the feedOriginator
     */
    public String getFeedOriginator() {
        return feedOriginator;
    }
    /**
     * @param feedOriginator the feedOriginator to set
     */
    public void setFeedOriginator(String feedOriginator) {
        this.feedOriginator = feedOriginator;
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
