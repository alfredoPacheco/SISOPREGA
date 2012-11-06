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
 * Defines the model for the Enterprise Rancher entity.<BR/>
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 11/05/2012  Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 */
public class EnterpriseRancher {
    private long enterpriseId;
    private String legalName;
    private String addressOne;
    private String addressTwo;
    private String city;
    private String state;
    private String zipCode;
    private String legalId;
    private String telephone;

    /**
     * @return the enterpriseId
     */
    public long getEnterpriseId() {
	return enterpriseId;
    }

    /**
     * @param enterpriseId
     *            the enterpriseId to set
     */
    public void setEnterpriseId(long enterpriseId) {
	this.enterpriseId = enterpriseId;
    }

    /**
     * @return the legalName
     */
    public String getLegalName() {
	return legalName;
    }

    /**
     * @param legalName
     *            the legalName to set
     */
    public void setLegalName(String legalName) {
	this.legalName = legalName;
    }

    /**
     * @return the addressOne
     */
    public String getAddressOne() {
	return addressOne;
    }

    /**
     * @param addressOne
     *            the addressOne to set
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
     *            the addressTwo to set
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
     *            the city to set
     */
    public void setCity(String city) {
	this.city = city;
    }

    /**
     * @return the state
     */
    public String getState() {
	return state;
    }

    /**
     * @param state
     *            the state to set
     */
    public void setState(String state) {
	this.state = state;
    }

    /**
     * @return the zipCode
     */
    public String getZipCode() {
	return zipCode;
    }

    /**
     * @param zipCode
     *            the zipCode to set
     */
    public void setZipCode(String zipCode) {
	this.zipCode = zipCode;
    }

    /**
     * @return the legalId
     */
    public String getLegalId() {
	return legalId;
    }

    /**
     * @param legalId
     *            the legalId to set
     */
    public void setLegalId(String legalId) {
	this.legalId = legalId;
    }

    /**
     * @return the telephone
     */
    public String getTelephone() {
	return telephone;
    }

    /**
     * @param telephone
     *            the telephone to set
     */
    public void setTelephone(String telephone) {
	this.telephone = telephone;
    }

    @Override
    public String toString() {
	return "enterpriseId:" + enterpriseId + ";legalName:" + legalName
		+ ";addressOne:" + addressOne + ";addressTwo:" + addressTwo
		+ ";city:" + city + ";state:" + state + ";zipCode:" + zipCode
		+ ";legalId:" + legalId + ";telephone:" + telephone + ";";
    }
}
