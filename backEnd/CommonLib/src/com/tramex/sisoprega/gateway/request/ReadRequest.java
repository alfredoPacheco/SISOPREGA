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

import com.tramex.sisoprega.gateway.GatewayRecord;

/**
 * Defines the model to be implemented by the Read Gateway Requests.<BR/>
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
public class ReadRequest {
  private GatewayRecord filter;

  /**
   * @return the filterDef
   */
  public GatewayRecord getFilter() {
    return filter;
  }

  /**
   * @param filterDef the filterDef to set
   */
  public void setFilter(GatewayRecord filter) {
    this.filter = filter;
  }
  
  @Override
  public String toString() {
    return "read:{" + filter + "}";
  }
  
  public static void main(String[] args){
    ReadRequest read = new ReadRequest();
    GatewayRecord readRecord = new GatewayRecord();
    readRecord.setEntity("Rancher");
    readRecord.addField("rancherId", "1");
    read.setFilter(readRecord);
    System.out.println(read.toString());
  }
  
}
