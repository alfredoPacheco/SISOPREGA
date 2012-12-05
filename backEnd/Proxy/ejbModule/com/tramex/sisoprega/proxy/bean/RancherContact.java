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
import com.tramex.sisoprega.dto.ContactRancher;

/**
 * This proxy knows the logic to evaluate RancherBean's Contact information and the
 * way to the database in order to save their data. Also, it is contained in EJB
 * container, we can apply security and life cycle methods for resources.<BR/>
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
public class RancherContact extends BaseBean implements Cruddable {

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
	ContactRancher contact = null;

	try {
	    contact = entityFromRequest(request, ContactRancher.class);

	    log.fine("Received contact in request: {" + contact + "}");

	    if (validateEntity(contact)) {
		em.persist(contact);
		em.flush();

		String sId = String.valueOf(contact.getContactId());
		response.setGeneratedId(sId);
		response.setError(new Error("0", "SUCCESS",
			"proxy.RancherContact.Create"));
	    } else {
		log.warning("Validation error: " + error_description);
		response.setError(new Error("RCC1", "Validation error: "
			+ error_description, "proxy.RancherContact.Create"));
	    }
	} catch (Exception e) {
	    log.severe("Exception found while creating rancher contact");
	    log.throwing(this.getClass().getName(), "Create", e);

	    response.setError(new Error("RCC2", "Create exception"
		    + e.getMessage(), "proxy.RancherContact.Create"));
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

	ContactRancher contact = null;
	try {
	    contact = entityFromRequest(request, ContactRancher.class);

	    log.fine("Got contact from request: " + contact);

	    TypedQuery<ContactRancher> readQuery = null;

	    if (contact.getRancherId() != 0) {
		readQuery = em.createNamedQuery(
			"RANCHER_CONTACT_BY_RANCHER_ID", ContactRancher.class);
		readQuery.setParameter("rancherId", contact.getRancherId());
	    } else if (contact.getContactId() != 0) {
		readQuery = em.createNamedQuery("RANCHER_CONTACT_BY_ID",
			ContactRancher.class);
		readQuery.setParameter("contactId", contact.getContactId());
	    } else {
		response.setError(new Error("VAL03",
			"El filtro especificado no es válid en el catálogo de ganaderos",
			"proxy.RancherContact.Read"));
		return response;
	    }

	    List<ContactRancher> queryResults = readQuery.getResultList();

	    if (queryResults.isEmpty()) {
		response.setError(new Error("VAL02", "No data found",
			"proxy.RancherContact.Read"));
	    } else {
		List<GatewayContent> records = contentFromList(queryResults,
			ContactRancher.class);
		response.getRecord().addAll(records);

		response.setError(new Error("0", "SUCCESS",
			"proxy.RancherContact.Read"));
	    }

	} catch (Exception e) {
	    // something went wrong, alert the server and respond the client
	    log.severe("Exception found while reading rancher contact");
	    log.throwing(this.getClass().getCanonicalName(), "Read", e);

	    response.setError(new Error("DB02", "Read exception: "
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
	ContactRancher contact = null;
	try {
	    contact = entityFromRequest(request, ContactRancher.class);

	    if (contact.getContactId() == 0) {
		log.warning("RCU1 - Invalid rancher contact id");
		response.setError(new Error("RCU1",
			"Invalid rancher contact id",
			"proxy.RancherContact.Update"));
	    } else {
		// Received Id.
		if (validateEntity(contact)) {
		    em.merge(contact);
		    em.flush();

		    GatewayContent content = getContentFromEntity(contact,
			    ContactRancher.class);
		    response.setUpdatedRecord(content);

		    response.setError(new Error("0", "SUCCESS",
			    "proxy.RancherContact.Update"));
		} else {
		    log.warning("Validation error: " + error_description);
		    response.setError(new Error("RCU2", "Validation error: "
			    + error_description, "proxy.RancherContact.Update"));
		}
	    }
	} catch (Exception e) {
	    log.severe("Exception found while updating RanacherContact");
	    log.throwing(this.getClass().getName(), "Update", e);

	    response.setError(new Error("RCU3", "Update exception "
		    + e.getMessage(), "proxy.RancherContact.Update"));
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
	    ContactRancher contact = entityFromRequest(request,
		    ContactRancher.class);
	    if (contact.getContactId() == 0) {
		log.warning("RCD1 - Invalid RancherContact");
		response.setError(new Error("RCD1", "Invalid RancherContactId",
			"proxy.Rancher.Delete"));
	    } else {
		TypedQuery<ContactRancher> readQuery = em.createNamedQuery(
			"RANCHER_CONTACT_BY_ID", ContactRancher.class);
		readQuery.setParameter("contactId", contact.getContactId());
		contact = readQuery.getSingleResult();
		em.merge(contact);
		em.remove(contact);
		em.flush();

		response.setError(new Error("0", "SUCCES",
			"proxy.RancherContact.Delete"));
	    }
	} catch (Exception e) {
	    log.severe("Exception found while deleting contact");
	    log.throwing(this.getClass().getName(), "Delete", e);

	    response.setError(new Error("RCD2", "Delete exception: "
		    + e.getMessage(), "proxy.RancherContant.Delete"));
	}

	log.exiting(this.getClass().getCanonicalName(), "Delete");
	return response;
    }

    @Override
    protected boolean validateEntity(Object entity) {
	boolean result = true;
	if (super.validateEntity(entity)) {
	    result = rancherExists((ContactRancher)entity);
	} else {
	    result = false;
	}
	return result;
    }

    private boolean rancherExists(ContactRancher contact) {
	boolean exists = true;

	TypedQuery<com.tramex.sisoprega.dto.Rancher> readQuery = null;

	readQuery = em.createNamedQuery("RANCHER_BY_ID",
		com.tramex.sisoprega.dto.Rancher.class);
	readQuery.setParameter("rancherId", contact.getRancherId());

	try {
	    com.tramex.sisoprega.dto.Rancher enterprise = readQuery
		    .getSingleResult();
	    exists = enterprise != null;
	} catch (NoResultException e) {
	    exists = false;
	    error_description = "RancherId " + contact.getRancherId()
		    + " does not exists on database";
	}

	return exists;
    }

}
