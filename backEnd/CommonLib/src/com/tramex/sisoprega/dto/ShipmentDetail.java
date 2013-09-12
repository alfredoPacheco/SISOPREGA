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
 * Shipment detail data model.
 *  
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 08/28/2013  Alfredo Pacheco              Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Alfredo Pacheco
 *
 * 
 */
public class ShipmentDetail {
  private long shipmentDetailId;
  private long inventoryId;
  private long heads;
  private double weight;
  private long saleId;
  private long saleDetailId;
  private long itemNumber;
 
  private Shipment shipment;
  
  /**
   * @return the shipmentDetailId
   */
  public long getShipmentDetailId() {
    return shipmentDetailId;
  }


  /**
   * @param shipmentDetailId the shipmentDetailId to set
   */
  public void setShipmentDetailId(long shipmentDetailId) {
    this.shipmentDetailId = shipmentDetailId;
  }


  /**
   * @return the inventoryId
   */
  public long getInventoryId() {
    return inventoryId;
  }


  /**
   * @param inventoryId the inventoryId to set
   */
  public void setInventoryId(long inventoryId) {
    this.inventoryId = inventoryId;
  }


  /**
   * @return the heads
   */
  public long getHeads() {
    return heads;
  }


  /**
   * @param heads the heads to set
   */
  public void setHeads(long heads) {
    this.heads = heads;
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
   * @return the saleId
   */
  public long getSaleId() {
    return saleId;
  }


  /**
   * @param saleId the saleId to set
   */
  public void setSaleId(long saleId) {
    this.saleId = saleId;
  }


  /**
   * @return the itemNumber
   */
  public long getItemNumber() {
    return itemNumber;
  }


  /**
   * @param itemNumber the itemNumber to set
   */
  public void setItemNumber(long itemNumber) {
    this.itemNumber = itemNumber;
  }

  /**
   * @return the shipment
   */
  public Shipment getShipment() {
    return shipment;
  }


  /**
   * @param shipment the shipment to set
   */
  public void setShipment(Shipment shipment) {
    this.shipment = shipment;
  }


  

  public long getSaleDetailId() {
    return saleDetailId;
  }

  public void setSaleDetailId(long saleDetailId) {
    this.saleDetailId = saleDetailId;
  }

  @Override
  public String toString() {
    return "shipmentDetailId:" + shipmentDetailId + ";inventoryId:" + inventoryId  +
        ";heads:" + heads + ";weight:" + weight + ";saleId:" + saleId + ";itemNumber:" + itemNumber + ";saleDetailId:" + saleDetailId + ";";
  }  
}
