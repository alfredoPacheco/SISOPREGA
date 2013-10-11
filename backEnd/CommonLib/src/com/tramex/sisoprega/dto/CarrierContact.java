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
 * US carrier data model.
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 10/10/2013   Alfredo Pacheco              Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Alfredo Pacheco
 * 
 * 
 */
public class CarrierContact {
  private long carrierContactId;
  private String contactName;
  private String phone;
  private Carrier carrier;

  /**
   * @return the carrierContactId
   */
  public long getCarrierContactId() {
    return carrierContactId;
  }

  /**
   * @param carrierContactId
   *          the carrierContactId to set
   */
  public void setCarrierContactId(long carrierContactId) {
    this.carrierContactId = carrierContactId;
  }

  /**
   * @return the contactName
   */
  public String getContactName() {
    return contactName;
  }

  /**
   * @param contactName
   *          the contactName to set
   */
  public void setContactName(String contactName) {
    this.contactName = contactName;
  }
  /**
   * @return the phone
   */
  public String getPhone() {
    return phone;
  }

  /**
   * @param phone
   *          the phone to set
   */
  public void setPhone(String phone) {
    this.phone = phone;
  }

  /**
   * @return the carrier
   */
  public Carrier getCarrier() {
    return carrier;
  }

  /**
   * @param carrier the carrier to set
   */
  public void setCarrier(Carrier carrier) {
    this.carrier = carrier;
  }

  @Override
  public String toString() {
    return "carrierContactId:" + carrierContactId + ";contactName:" + contactName
        + ";telephone:" + phone + ";";
  }
}
