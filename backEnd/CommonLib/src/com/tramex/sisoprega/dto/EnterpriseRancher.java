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

import java.util.HashSet;
import java.util.Set;

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
 * 01/13/2013  Diego Torres                 Add email for messenger.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 */
public class EnterpriseRancher {
    private long enterpriseRancherId;
    private String legalName;
    private String addressOne;
    private String addressTwo;
    private String city;
    private String state;
    private String zipCode;
    private String legalId;
    private String telephone;
    private String telephone2;
    private String telephone3;
    private int smsPhoneChosen;
    private String email;
    private Set<EnterpriseContact> enterpriseContact;
    private Set<EnterpriseUser> enterpriseUser;
    private Set<EnterpriseInvoice> rancherInvoice;

    
    /**
     * @return the rancherInvoice
     */
    public Set<EnterpriseInvoice> getRancherInvoice() {
      return rancherInvoice;
    }

    /**
     * @param rancherInvoice the rancherInvoice to set
     */
    public void setRancherInvoice(Set<EnterpriseInvoice> rancherInvoice) {
      this.rancherInvoice = rancherInvoice;
    }
    
    public void addRancherInvoice(EnterpriseInvoice invoice){
      if(rancherInvoice == null)
        rancherInvoice = new HashSet<EnterpriseInvoice>();
      
      rancherInvoice.add(invoice);
      if(invoice.getRancher() != this){
        invoice.setRancher(this);
      }
    }

    /**
     * @return the rancherUser
     */
    public Set<EnterpriseUser> getEnterpriseUser() {
      return enterpriseUser;
    }

    /**
     * @param rancherUser the rancherUser to set
     */
    public void setEnterpriseUser(Set<EnterpriseUser> rancherUser) {
      this.enterpriseUser = rancherUser;
    }
    
    public void addEnterpriseUser(EnterpriseUser rUser){
      if(enterpriseUser == null)
        enterpriseUser = new HashSet<EnterpriseUser>();
      
      enterpriseUser.add(rUser);
      if (rUser.getRancher() != this)
        rUser.setRancher(this);
    }

    /**
     * @return the enterpriseContact
     */
    public Set<EnterpriseContact> getEnterpriseContact() {
      return enterpriseContact;
    }

    /**
     * @param enterpriseContact the enterpriseContact to set
     */
    public void setEnterpriseContact(Set<EnterpriseContact> enterpriseContact) {
      this.enterpriseContact = enterpriseContact;
    }

    public void addEnterpriseContact(EnterpriseContact contact) {
      if(enterpriseContact == null)
        enterpriseContact = new HashSet<EnterpriseContact>();
      
      enterpriseContact.add(contact);
      if (contact.getEnterpriseRancher() != this)
        contact.setEnterpriseRancher(this);
    }
    
    /**
     * @return the enterpriseRancherId
     */
    public long getEnterpriseRancherId() {
	return enterpriseRancherId;
    }

    /**
     * @param enterpriseRancherId
     *            the enterpriseId to set
     */
    public void setEnterpriseRancherId(long enterpriseRancherId) {
	this.enterpriseRancherId = enterpriseRancherId;
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
    
    /**
     * @return the telephone2
     */
    public String getTelephone2() {
	return telephone2;
    }

    /**
     * @param telephone2
     *            the telephone2 to set
     */
    public void setTelephone2(String telephone2) {
	this.telephone2 = telephone2;
    }
    
    /**
     * @return the telephone3
     */
    public String getTelephone3() {
	return telephone3;
    }

    /**
     * @param telephone3
     *            the telephone3 to set
     */
    public void setTelephone3(String telephone3) {
	this.telephone3 = telephone3;
    }

   
    /**
     * @return the email
     */
    public String getEmail() {
      return email;
    }

    /**
     * @param email the email to set
     */
    public void setEmail(String email) {
      this.email = email;
    }

	/**
	 * @return the smsPhoneChosen
	 */
	public int getSmsPhoneChosen() {
		return smsPhoneChosen;
	}

	/**
	 * @param smsPhoneChosen the smsPhoneChosen to set
	 */
	public void setSmsPhoneChosen(int smsPhoneChosen) {
		this.smsPhoneChosen = smsPhoneChosen;
	}
    
	/**
	 * @return the phone for sms usage
	 */
	public String getSmsPhone() {
		switch(smsPhoneChosen){
		case 1:
			return telephone;
		case 2:
			return telephone2;
		case 3:
			return telephone3;
		default:
			return "";
		}
	}
	
	 @Override
	    public String toString() {
		return "enterpriseId:" + enterpriseRancherId + ";legalName:" + legalName
			+ ";addressOne:" + addressOne + ";addressTwo:" + addressTwo
			+ ";city:" + city + ";state:" + state + ";zipCode:" + zipCode
			+ ";legalId:" + legalId + ";telephone:" + telephone + ";"
			+ ";telephone 2:" + telephone2 + ";" + ";telephone 3:" + telephone3 + ";"
			+ ";SMS phone chosen:" + smsPhoneChosen + ";";
	    }
    
}
