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
 * US cattle seller data model.
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * Apr 18, 2013     Diego Torres                 Initial Version.
 * 05/08/2013       Diego Torres                 Additional fields agregated during design of UI catalog.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 * 
 */
public class Seller {
  private long sellerId;
  private String sellerName;
  private String addressOne;
  private String addressTwo;
  private String city;
  private String addressState;
  private String zipCode;
  private String phone;
  private String email;

  /**
   * @return the sellerId
   */
  public long getSellerId() {
    return sellerId;
  }

  /**
   * @param sellerId
   *          the sellerId to set
   */
  public void setSellerId(long sellerId) {
    this.sellerId = sellerId;
  }

  /**
   * @return the sellerName
   */
  public String getSellerName() {
    return sellerName;
  }

  /**
   * @param sellerName
   *          the sellerName to set
   */
  public void setSellerName(String sellerName) {
    this.sellerName = sellerName;
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

  /**
   * @return the email
   */
  public String getEmail() {
    return email;
  }

  /**
   * @param email
   *          the email to set
   */
  public void setEmail(String email) {
    this.email = email;
  }

  @Override
  public String toString() {
    return "sellerId:" + sellerId + ";sellerName:" + sellerName + ";addressOne:" + addressOne + ";addressTwo:" + addressTwo
        + ";city:" + city + ";state:" + addressState + ";zip:" + zipCode + ";telephone:" + phone + ";email:" + email + ";";
  }
}
