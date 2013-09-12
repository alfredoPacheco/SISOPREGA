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
 * Shipment Release data model.
 *  
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 09/03/2013  Alfredo Pacheco              Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Alfredo Pacheco
 *
 * 
 */
public class ShipmentRelease {
  private long shipmentReleaseId;
  private Date dateTime = new Date();
  private long carrierId;
  private String driver;
  private String plates;
  private Shipment shipment;
  
  
  /**
   * @return the shipmentReleaseId
   */
  public long getShipmentReleaseId() {
    return shipmentReleaseId;
  }


  /**
   * @param shipmentReleaseId the shipmentReleaseId to set
   */
  public void setShipmentReleaseId(long shipmentReleaseId) {
    this.shipmentReleaseId = shipmentReleaseId;
  }


  /**
   * @return the dateTime
   */
  public Date getDateTime() {
    return dateTime;
  }


  /**
   * @param dateTime the dateTime to set
   */
  public void setDateTime(Date dateTime) {
    this.dateTime = dateTime;
  }


  /**
   * @return the carrierId
   */
  public long getCarrierId() {
    return carrierId;
  }


  /**
   * @param carrierId the carrierId to set
   */
  public void setCarrierId(long carrierId) {
    this.carrierId = carrierId;
  }
  
  /**
   * @return the driver
   */
  public String getDriver() {
    return driver;
  }


  /**
   * @param driver the driver to set
   */
  public void setDriver(String driver) {
    this.driver = driver;
  }


  /**
   * @return the plates
   */
  public String getPlates() {
    return plates;
  }


  /**
   * @param plates the plates to set
   */
  public void setPlates(String plates) {
    this.plates = plates;
  }


  public Shipment getShipment() {
    return shipment;
  }


  public void setShipment(Shipment shipment) {
    this.shipment = shipment;
  }


  @Override
  public String toString() {
    return "shipmentReleaseId:" + shipmentReleaseId + ";carrierId:" + carrierId + ";dateTime:" + 
        dateTime+ ";driver:" + driver + ";plates:" + plates + ";";
  }  
}