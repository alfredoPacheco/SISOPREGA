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
package com.tramex.sisoprega.gateway.request;

import java.util.ArrayList;
import java.util.List;

import com.tramex.sisoprega.gateway.GatewayRecord;

/**
 * Defines the model to be implemented by the Create Gateway Requests.<BR/>
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * May 19, 2013     Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 * 
 */
public class SaveRequest {
  private List<GatewayRecord> parentRecord = new ArrayList<GatewayRecord>();

  /**
   * @return the parentRecord
   */
  public List<GatewayRecord> getParentRecord() {
    return parentRecord;
  }

  /**
   * @param parentRecord
   *          the parentRecord to set
   */
  public void setParentRecord(List<GatewayRecord> parentRecord) {
    this.parentRecord = parentRecord;
  }
  
  public void addParentRecord(List<GatewayRecord> parentRecord){
    this.parentRecord = parentRecord;
  }
  
  @Override
  public String toString() {
    String stringed = "";

    stringed += "saveRequest:{";
    stringed += parentRecord + ";";
    stringed += "}";

    return stringed;
  }

}
