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
import java.util.HashSet;
import java.util.Set;

/**
 * Shipment data model for us operations.
 *  
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 08/28/2013  Alfredo Pacheco                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Alfredo Pacheco
 *
 * 
 */
public class Shipment {
  private long shipmentId;
  private Date dateTimeProgrammed = new Date();
  private Date recordWhen = new Date();
  private long carrierIdProgrammed;
  private long customerId;
  private long qualityId;
  private Set<ShipmentDetail> shipmentDetail;
  private Set<ShipmentRelease> shipmentRelease;
  
  /**
   * @return the shipmentDetail
   */
  public Set<ShipmentDetail> getShipmentDetail() {
    return shipmentDetail;
  }

  /**
   * @param shipmentDetail the shipmentDetail to set
   */
  public void setShipmentDetail(Set<ShipmentDetail> shipmentDetail) {
    this.shipmentDetail = shipmentDetail;
  }

  /**
   * @return the shipmentId
   */
  public long getShipmentId() {
    return shipmentId;
  }

  /**
   * @param shipmentId the shipmentId to set
   */
  public void setShipmentId(long shipmentId) {
    this.shipmentId = shipmentId;
  }

  /**
   * @return the dateTimeProgrammed
   */
  public Date getDateTimeProgrammed() {
    return dateTimeProgrammed;
  }

  /**
   * @param dateTimeProgrammed the dateTimeProgrammed to set
   */
  public void setDateTimeProgrammed(Date dateTimeProgrammed) {
    this.dateTimeProgrammed = dateTimeProgrammed;
  }

  /**
   * @return the recordWhen
   */
  public Date getRecordWhen() {
    return recordWhen;
  }

  /**
   * @param recordWhen the recordWhen to set
   */
  public void setRecordWhen(Date recordWhen) {
    if(recordWhen == null)
      this.recordWhen = new Date();
    else
      this.recordWhen = recordWhen;
  }

  /**
   * @return the carrierIdProgrammed
   */
  public long getCarrierIdProgrammed() {
    return carrierIdProgrammed;
  }

  /**
   * @param carrierIdProgrammed the carrierIdProgrammed to set
   */
  public void setCarrierIdProgrammed(long carrierIdProgrammed) {
    this.carrierIdProgrammed = carrierIdProgrammed;
  }

  /**
   * @return the customerId
   */
  public long getCustomerId() {
    return customerId;
  }

  /**
   * @param customerId the customerId to set
   */
  public void setCustomerId(long customerId) {
    this.customerId = customerId;
  }
  
  public Set<ShipmentRelease> getShipmentRelease() {
    return shipmentRelease;
  }


  public void setShipmentRelease(Set<ShipmentRelease> shipmentRelease) {
    this.shipmentRelease = shipmentRelease;
  }

  public void addShipmentRelease(ShipmentRelease release){
    if(shipmentRelease == null)
      shipmentRelease = new HashSet<ShipmentRelease>();
    
    shipmentRelease.add(release);
    
    if(release.getShipment() != this)
      release.setShipment(this);    
  }
  
  public void addShipmentDetail(ShipmentDetail detail){
    if(shipmentDetail == null)
      shipmentDetail = new HashSet<ShipmentDetail>();
    
    shipmentDetail.add(detail);
    
    if(detail.getShipment() != this)
      detail.setShipment(this);
    
  }
  
  /**
   * @return the qualityId
   */
  public long getQualityId() {
    return qualityId;
  }


  /**
   * @param qualityId the qualityId to set
   */
  public void setQualityId(long qualityId) {
    this.qualityId = qualityId;
  }
  
  @Override
  public String toString() {
    return "shipmentId:" + shipmentId + ";dateTimeProgrammed:" + dateTimeProgrammed + ";carrierIdProgrammed:" + carrierIdProgrammed
        + ";qualityId:" + qualityId + ";customerId:" + customerId + ";";
  }
}
