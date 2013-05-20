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
package com.tramex.sisoprega.gateway.response;

import java.util.LinkedList;
import java.util.List;

import com.tramex.sisoprega.gateway.GatewayError;
import com.tramex.sisoprega.gateway.GatewayRecord;

/**
 * Handles response and it's contents.
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
public class ReadResponse extends BaseResponse {
  private List<GatewayRecord> parentRecord = new LinkedList<GatewayRecord>();
  
  public List<GatewayRecord> getParentRecord(){
    return parentRecord;
  }
  
  public void setParentRecord(List<GatewayRecord> parentRecord){
    this.parentRecord = parentRecord;
  }
  
  public void addParentRecord(GatewayRecord parentRecord){
    this.parentRecord.add(parentRecord);
  }

  @Override
  public String toString() {
    String stringed = "";
    
    stringed += "response:{";
    stringed += this.getError() + ";";
    stringed += parentRecord + ";";
    stringed += "}";
    
    return stringed;
  }
  
  /**
   * @param args
   */
  public static void main(String[] args) {
    ReadResponse response = new ReadResponse();
    response.setError(new GatewayError("0", "SUCCESS", "test"));
    
    GatewayRecord parentRecord = new GatewayRecord();
    parentRecord.setEntity("testEntity");
    parentRecord.addField("testParentField1", "pv1");
    parentRecord.addField("testParentField2", "pv2");
    parentRecord.addField("testParentField3", "pv3");
    parentRecord.addField("testParentField4", "pv4");
    parentRecord.addField("testParentField5", "pv5");
    
    
    
    GatewayRecord childRecord1 = new GatewayRecord();
    childRecord1.setEntity("testChild1");
    childRecord1.addField("testChild1Field1", "c1v1");
    childRecord1.addField("testChild1Field2", "c1v2");
    childRecord1.addField("testChild1Field3", "c1v3");
    childRecord1.addField("testChild1Field4", "c1v4");
    parentRecord.addChildRecord(childRecord1);
    
    GatewayRecord childRecord2 = new GatewayRecord();
    childRecord2.setEntity("testChild2");
    childRecord2.addField("testChild2Field1", "c2v1");
    childRecord2.addField("testChild2Field2", "c2v2");
    childRecord2.addField("testChild2Field3", "c2v3");
    childRecord2.addField("testChild2Field4", "c2v4");
    parentRecord.addChildRecord(childRecord2);
    
    response.addParentRecord(parentRecord);
    
    System.out.println(response.toString());

  }

}
