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
 * Defines the model for the Enterprise Contact entity.<BR/>
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 11/11/2012  Diego Torres                 Initial Version.
 * 11/22/2012  Alfredo Pacheco				Edited emailAdd to emailAddress.				
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 */
public class ContactEnterprise {
    private long enterpriseId;
    private long contactId;
    private String aka;
    private String firstName;
    private String lastName;
    private String motherName;
    private Date birthDate;
    private String emailAddress;
    private String telephone;
    private String addressOne;
    private String addressTwo;
    private String city;
    private String addressState;
    private String zipCode;

    /**
     * @return the enterpriseId
     */
    public long getEnterpriseId() {
	return enterpriseId;
    }

    /**
     * @return the contactId
     */
    public long getContactId() {
	return contactId;
    }

    /**
     * @param contactId
     *            the contactId to set
     */
    public void setContactId(long contactId) {
	this.contactId = contactId;
    }

    /**
     * @return the aka
     */
    public String getAka() {
	return aka;
    }

    /**
     * @param aka
     *            the aka to set
     */
    public void setAka(String aka) {
	this.aka = aka;
    }

    /**
     * @return the firstName
     */
    public String getFirstName() {
	return firstName;
    }

    /**
     * @param firstName
     *            the firstName to set
     */
    public void setFirstName(String firstName) {
	this.firstName = firstName;
    }

    /**
     * @return the lastName
     */
    public String getLastName() {
	return lastName;
    }

    /**
     * @param lastName
     *            the lastName to set
     */
    public void setLastName(String lastName) {
	this.lastName = lastName;
    }

    /**
     * @return the motherName
     */
    public String getMotherName() {
	return motherName;
    }

    /**
     * @param motherName
     *            the motherName to set
     */
    public void setMotherName(String motherName) {
	this.motherName = motherName;
    }

    /**
     * @return the birthDate
     */
    public Date getBirthDate() {
	return birthDate;
    }

    /**
     * @param birthDate
     *            the birthDate to set
     */
    public void setBirthDate(Date birthDate) {
	this.birthDate = birthDate;
    }

    /**
     * @return the emailAdd
     */
    public String getEmailAddress() {
	return emailAddress;
    }

    /**
     * @param emailAdd
     *            the emailAdd to set
     */
    public void setEmailAddress(String emailAdd) {
	this.emailAddress = emailAdd;
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
     * @return the addressState
     */
    public String getAddressState() {
	return addressState;
    }

    /**
     * @param addressState
     *            the addressState to set
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
     *            the zipCode to set
     */
    public void setZipCode(String zipCode) {
	this.zipCode = zipCode;
    }
    
    /**
     * @param enterpriseId
     *            the enterpriseId to set
     */
    public void setEnterpriseId(long enterpriseId) {
	this.enterpriseId = enterpriseId;
    }

    @Override
    public String toString() {
	return "enterpriseId:" + enterpriseId + ";" + "contactId:" + contactId
		+ ";aka:" + aka + ";firstName:" + firstName + ";lastName:"
		+ lastName + ";motherName:" + motherName + ";birthDate:"
		+ birthDate + ";emailAddress:" + emailAddress + ";telephone:"
		+ telephone + ";addressOne:" + addressOne + ";addressTwo:"
		+ addressTwo + ";city:" + city + ";state:" + addressState
		+ ";zip:" + zipCode + ";";
    }
}
