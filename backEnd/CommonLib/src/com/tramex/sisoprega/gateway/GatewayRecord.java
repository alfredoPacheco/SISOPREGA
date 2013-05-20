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
package com.tramex.sisoprega.gateway;

import java.util.LinkedList;
import java.util.List;

/**
 * Record model is used in request and response models for gateway, will serve
 * as base for parent and child records.
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
public class GatewayRecord {
  private String entity;
  private List<GatewayField> field = new LinkedList<GatewayField>();
  private List<GatewayRecord> childRecord = new LinkedList<GatewayRecord>();

  /**
   * @return the childRecords
   */
  public List<GatewayRecord> getChildRecord() {
    return childRecord;
  }

  /**
   * @param childRecords the childRecords to set
   */
  public void setChildRecord(List<GatewayRecord> childRecords) {
    this.childRecord = childRecords;
  }
  
  /**
   * Add a single record to child collection
   * @param record
   */
  public void addChildRecord(GatewayRecord record){
    this.childRecord.add(record);
  }

  /**
   * @return the entityName
   */
  public String getEntity() {
    return entity;
  }

  /**
   * @param entityName
   *          the entityName to set
   */
  public void setEntity(String entity) {
    this.entity = entity;
  }

  /**
   * @return the fields
   */
  public List<GatewayField> getField() {
    return field;
  }

  /**
   * @param fields
   *          the fields to set
   */
  public void setField(List<GatewayField> field) {
    this.field = field;
  }

  public void addField(GatewayField field) {
    this.field.add(field);
  }

  public void addField(String fieldName, String fieldValue) {
    field.add(new GatewayField(fieldName, fieldValue));
  }

  public void removeField(GatewayField field) {
    this.field.remove(field);
  }

  /**
   * Remove a field based on its name. Will remove the first match.
   * @param fieldName
   */
  public void removeField(String fieldName) {
    GatewayField removable = getFieldByName(fieldName);
    if(removable!=null){
      removeField(removable);
    }
  }
  
  /**
   * Retrieve a field value based on its name. Will retrieve first match
   * with field name. If not found will return a null value.
   * @param fieldName
   * @return
   */
  public String getFieldValue(String fieldName){
    GatewayField requiredField = getFieldByName(fieldName);
    if(requiredField!=null)
      return requiredField.getValue();
    
    return null;
  }
  
  private GatewayField getFieldByName(String fieldName){
    for (GatewayField field : this.field) {
      if (field.getName().equals(fieldName)) {
        return field;
      }
    }
    return null;
  }

  @Override
  public String toString() {
    String stringed = "";
    stringed += "record:{";
    stringed += "entityName:" + entity + ";";
    stringed +="[";
    
    for(GatewayField f : field){
      stringed += f.toString();
    }
    
    stringed +="]";
    stringed += "}";
    return stringed;
  }

}
