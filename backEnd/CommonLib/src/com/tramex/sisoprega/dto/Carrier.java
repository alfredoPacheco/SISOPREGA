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
 * Aug/23/2013 Alfredo Pacheco              Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Alfredo Pacheco
 * 
 * 
 */
public class Carrier {
  private long carrierId;
  private String carrierName;
  private String addressOne;
  private String addressTwo;
  private String city;
  private String addressState;
  private String zipCode;
  private String phone;

  /**
   * @return the carrierId
   */
  public long getCarrierId() {
    return carrierId;
  }

  /**
   * @param carrierId
   *          the carrierId to set
   */
  public void setCarrierId(long carrierId) {
    this.carrierId = carrierId;
  }

  /**
   * @return the carrierName
   */
  public String getCarrierName() {
    return carrierName;
  }

  /**
   * @param carrierName
   *          the carrierName to set
   */
  public void setCarrierName(String carrierName) {
    this.carrierName = carrierName;
  }

  /**
   * @return the addressOne
   */
  public String getAddressOne() {
    return addressOne;
  }

  /**
   * @param addressOne
   *          the addressOne to set
   */
  public void setAddressOne(String addressOne) {
    this.addressOne = addressOne;
  }

  /**
   * @return the addressTwo
   */
  public String getAddressTwo() {
    return addressTwo;
  }

  /**
   * @param addressTwo
   *          the addressTwo to set
   */
  public void setAddressTwo(String addressTwo) {
    this.addressTwo = addressTwo;
  }

  /**
   * @return the city
   */
  public String getCity() {
    return city;
  }

  /**
   * @param city
   *          the city to set
   */
  public void setCity(String city) {
    this.city = city;
  }

  /**
   * @return the addressState
   */
  public String getAddressState() {
    return addressState;
  }

  /**
   * @param addressState
   *          the addressState to set
   */
  public void setAddressState(String addressState) {
    this.addressState = addressState;
  }

  /**
   * @return the zipCode
   */
  public String getZipCode() {
    return zipCode;
  }

  /**
   * @param zipCode
   *          the zipCode to set
   */
  public void setZipCode(String zipCode) {
    this.zipCode = zipCode;
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

  @Override
  public String toString() {
    return "carrierId:" + carrierId + ";carrierName:" + carrierName + ";addressOne:" + addressOne + ";addressTwo:" + addressTwo
        + ";city:" + city + ";state:" + addressState + ";zip:" + zipCode + ";telephone:" + phone + ";";
  }
}
