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
package com.tramex.sisoprega.proxy.bean;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.NoResultException;
import javax.persistence.TypedQuery;

import com.tramex.sisoprega.common.BaseResponse;
import com.tramex.sisoprega.common.CreateGatewayResponse;
import com.tramex.sisoprega.common.Error;
import com.tramex.sisoprega.common.GatewayContent;
import com.tramex.sisoprega.common.GatewayRequest;
import com.tramex.sisoprega.common.ReadGatewayResponse;
import com.tramex.sisoprega.common.UpdateGatewayResponse;
import com.tramex.sisoprega.common.crud.Cruddable;
import com.tramex.sisoprega.dto.ContactEnterprise;

/**
 * This proxy knows the logic to evaluate Enterprise rancher's Contact
 * information and the way to the database in order to save their data. Also, it
 * is contained in EJB container, we can apply security and life cycle methods
 * for resources.<BR/>
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 11/11/2012  Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 */
@Stateless
public class EnterpriseContact extends BaseBean implements Cruddable {

    /*
     * (non-Javadoc)
     * 
     * @see
     * com.tramex.sisoprega.common.crud.Cruddable#Create(com.tramex.sisoprega
     * .common.GatewayRequest)
     */
    @Override
    public CreateGatewayResponse Create(GatewayRequest request) {
	log.entering(this.getClass().getCanonicalName(), "Create");

	CreateGatewayResponse response = new CreateGatewayResponse();
	ContactEnterprise contact = null;

	try {
	    contact = entityFromRequest(request, ContactEnterprise.class);

	    log.fine("Received contact in request: {" + contact + "}");

	    if (validateEntity(contact)) {
		em.persist(contact);
		em.flush();

		String sId = String.valueOf(contact.getContactId());
		response.setGeneratedId(sId);
		response.setError(new Error("0", "SUCCESS",
			"proxy.EnterpriseContact.Create"));
	    } else {
		log.warning("Validation error: " + error_description);
		response.setError(new Error("ECC1", "Validation error: "
			+ error_description, "proxy.EnterpriseContact.Create"));
	    }
	} catch (Exception e) {
	    log.severe("Exception found while creating enterprise contact");
	    log.throwing(this.getClass().getName(), "Create", e);

	    response.setError(new Error("ECC2", "Create exception"
		    + e.getMessage(), "proxy.EnterpriseContact.Create"));
	}

	log.exiting(this.getClass().getCanonicalName(), "Create");
	return response;
    }

    /*
     * (non-Javadoc)
     * 
     * @see
     * com.tramex.sisoprega.common.crud.Cruddable#Read(com.tramex.sisoprega.
     * common.GatewayRequest)
     */
    @Override
    public ReadGatewayResponse Read(GatewayRequest request) {
	log.entering(this.getClass().getCanonicalName(), "Read");

	ReadGatewayResponse response = new ReadGatewayResponse();
	response.setEntityName(request.getEntityName());

	ContactEnterprise contact = null;
	try {
	    contact = entityFromRequest(request, ContactEnterprise.class);

	    log.fine("Got contact from request: " + contact);
	    TypedQuery<ContactEnterprise> readQuery = null;

	    if (contact.getEnterpriseId() != 0) {
		readQuery = em.createNamedQuery(
			"ENTERPRISE_CONTACT_BY_ENTERPRISE_ID",
			ContactEnterprise.class);
		readQuery.setParameter("enterpriseId",
			contact.getEnterpriseId());
	    } else if (contact.getContactId() != 0) {
		readQuery = em.createNamedQuery("ENTERPRISE_CONTACT_BY_ID",
			ContactEnterprise.class);
		readQuery.setParameter("contactId", contact.getContactId());
	    } else {
		response.setError(new Error("ECR1",
			"Invalid filter for contact query",
			"proxy.EnterpriseContact.Read"));
		return response;
	    }

	    List<ContactEnterprise> queryResults = readQuery.getResultList();

	    if (queryResults.isEmpty()) {
		Error error = new Error();
		error.setExceptionId("ECR2");
		error.setExceptionDescription("No data found");
		error.setOrigin("proxy.EnterpriseContact.Read");
		response.setError(error);
	    } else {
		List<GatewayContent> records = contentFromList(queryResults,
			ContactEnterprise.class);
		response.getRecord().addAll(records);
		response.setError(new Error("0", "SUCCESS",
			"proxy.EnterpriseContact.Read"));

	    }

	} catch (Exception e) {
	    log.severe("Exception found while reading enterprise contact");
	    log.throwing(this.getClass().getCanonicalName(), "Read", e);

	    response.setError(new Error("ECR3", "Read exception: "
		    + e.getMessage(), "proxy.RancherContact.Read"));
	}

	log.exiting(this.getClass().getCanonicalName(), "Read");
	return response;
    }

    /*
     * (non-Javadoc)
     * 
     * @see
     * com.tramex.sisoprega.common.crud.Cruddable#Update(com.tramex.sisoprega
     * .common.GatewayRequest)
     */
    @Override
    public UpdateGatewayResponse Update(GatewayRequest request) {
	log.entering(this.getClass().getCanonicalName(), "Update");
	UpdateGatewayResponse response = new UpdateGatewayResponse();
	ContactEnterprise contact = null;
	try {
	    contact = entityFromRequest(request, ContactEnterprise.class);

	    if (contact.getContactId() == 0) {
		log.warning("ECU1 - Invalid enterprise contact id");
		response.setError(new Error("ECU1",
			"Invalid enterprise contact id",
			"proxy.EnterpriceContact.Update"));
	    } else {
		if (validateEntity(contact)) {
		    em.merge(contact);
		    em.flush();

		    GatewayContent content = getContentFromEntity(contact,
			    ContactEnterprise.class);
		    response.setUpdatedRecord(content);

		    response.setError(new Error("0", "SUCCESS",
			    "proxy.EnterpriseContact.Update"));
		} else {
		    log.warning("Validation error: " + error_description);
		    response.setError(new Error("ECU2", "Validation error: "
			    + error_description,
			    "proxy.EnterpriseContact.Update"));
		}
	    }

	} catch (Exception e) {
	    log.severe("Exception found while updating EnterpriseContact");
	    log.throwing(this.getClass().getName(), "Update", e);

	    response.setError(new Error("RCU3", "Update exception "
		    + e.getMessage(), "proxy.EnterpriseContact.Update"));
	}

	log.exiting(this.getClass().getCanonicalName(), "Update");
	return response;
    }

    /*
     * (non-Javadoc)
     * 
     * @see
     * com.tramex.sisoprega.common.crud.Cruddable#Delete(com.tramex.sisoprega
     * .common.GatewayRequest)
     */
    @Override
    public BaseResponse Delete(GatewayRequest request) {
	log.entering(this.getClass().getCanonicalName(), "Delete");
	BaseResponse response = new BaseResponse();

	try {
	    ContactEnterprise contact = entityFromRequest(request,
		    ContactEnterprise.class);
	    if (contact.getContactId() == 0) {
		log.warning("ECD1 - Invalid EnterpriseContact");
		response.setError(new Error("RCD1",
			"Invalid EnterpriseContactId",
			"proxy.EnterpriseContact.Delete"));
	    } else {
		TypedQuery<ContactEnterprise> readQuery = em.createNamedQuery(
			"ENTERPRISE_CONTACT_BY_ID", ContactEnterprise.class);
		readQuery.setParameter("contactId", contact.getContactId());
		contact = readQuery.getSingleResult();
		em.merge(contact);
		em.remove(contact);
		em.flush();

		response.setError(new Error("0", "SUCCESS",
			"proxy.EnterpriseContact.Delete"));
	    }
	} catch (Exception e) {
	    log.severe("Exception found while deleting contact");
	    log.throwing(this.getClass().getName(), "Delete", e);

	    response.setError(new Error("ECD2", "Delete exception: "
		    + e.getMessage(), "proxy.EnterpriseContact.Delete"));
	}

	log.exiting(this.getClass().getCanonicalName(), "Delete");
	return response;
    }
    
    @Override
    protected boolean validateEntity(Object entity) {
	boolean result = true;
	if (super.validateEntity(entity)) {
	    result = enterpriseExists((ContactEnterprise)entity);
	} else {
	    result = false;
	}
	return result;
    }
    
    private boolean enterpriseExists(ContactEnterprise contact) {
	boolean exists = true;

	TypedQuery<com.tramex.sisoprega.dto.EnterpriseRancher> readQuery = null;

	readQuery = em.createNamedQuery("ENTERPRISE_RANCHER_BY_ID",
		com.tramex.sisoprega.dto.EnterpriseRancher.class);
	readQuery.setParameter("enterpriseId", contact.getEnterpriseId());

	try {
	    com.tramex.sisoprega.dto.EnterpriseRancher enterprise = readQuery
		    .getSingleResult();
	    exists = enterprise != null;
	} catch (NoResultException e) {
	    exists = false;
	    error_description = "enterpriseId " + contact.getEnterpriseId()
		    + " does not exists on database";
	}

	return exists;
    }
    
}
