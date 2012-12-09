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
import com.tramex.sisoprega.common.GatewayRequest;
import com.tramex.sisoprega.common.ReadGatewayResponse;
import com.tramex.sisoprega.common.UpdateGatewayResponse;
import com.tramex.sisoprega.common.crud.Cruddable;

/**
 * This proxy knows the logic to evaluate RancherBean's Invoice information and the
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
 * 11/09/2012  Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 */
@Stateless
public class RancherInvoice extends BaseBean implements Cruddable {

    /**
     * @see Cruddable#Create(GatewayRequest)
     */
    @Override
    public CreateGatewayResponse Create(GatewayRequest request) {
	log.entering(this.getClass().getCanonicalName(), "Create");

	CreateGatewayResponse response = new CreateGatewayResponse();
	com.tramex.sisoprega.dto.RancherInvoice invoiceInfo = null;

	try {
	    invoiceInfo = entityFromRequest(request,
		    com.tramex.sisoprega.dto.RancherInvoice.class);

	    log.fine("Received rancherInvoice in request:{" + invoiceInfo + "}");

	    if (validateEntity(invoiceInfo)) {
		log.finer("rancherInvoice successfully validated");
		em.persist(invoiceInfo);
		log.finer("rancherInvoice persisted on database");
		em.flush();

		String sId = String.valueOf(invoiceInfo.getRancherInvoiceId());
		response.setGeneratedId(sId);
		response.setError(new Error("0", "SUCCESS",
			"proxy.RancherInvoice.Create"));
		log.finer("built successfull response");
	    } else {
		log.warning("Validation error:" + error_description);
		response.setError(new Error("RIC1", "Validation Exception:"
			+ error_description, "proxy.RancherInvoice.Create"));
	    }
	} catch (Exception e) {
	    log.severe("Exception found while creating rancher invoicing info");
	    log.throwing(this.getClass().getName(), "Create", e);

	    response.setError(new Error("RIC2", "Create exception:"
		    + e.getMessage(), "proxy.RancherInvoice.Create"));
	}

	log.exiting(this.getClass().getCanonicalName(), "Create");
	return response;
    }

    /**
     * @see Cruddable#Read(GatewayRequest)
     */
    @Override
    public ReadGatewayResponse Read(GatewayRequest request) {
	log.entering(this.getClass().getCanonicalName(), "Read");

	ReadGatewayResponse response = new ReadGatewayResponse();
	response.setEntityName(request.getEntityName());

	com.tramex.sisoprega.dto.RancherInvoice invoice = null;
	try {
	    invoice = entityFromRequest(request,
		    com.tramex.sisoprega.dto.RancherInvoice.class);

	    log.fine("Got rancher from request: " + invoice);

	    TypedQuery<com.tramex.sisoprega.dto.RancherInvoice> readQuery = null;

	    if (invoice.getRancherInvoiceId() != 0) {
		readQuery = em.createNamedQuery("RANCHER_INVOICE_BY_ID",
			com.tramex.sisoprega.dto.RancherInvoice.class);
		readQuery.setParameter("rancherInvoiceId",
			invoice.getRancherInvoiceId());
	    } else if (invoice.getRancherId() != 0) {
		readQuery = em.createNamedQuery(
			"RANCHER_INVOICE_BY_RANCHER_ID",
			com.tramex.sisoprega.dto.RancherInvoice.class);
		readQuery.setParameter("rancherId", invoice.getRancherId());
	    } else {
		response.setError(new Error("RIR3", "Invalid Filter",
			"The required filter is not valid for Invoicing data."));
		return response;
	    }

	    List<com.tramex.sisoprega.dto.RancherInvoice> queryResults = readQuery
		    .getResultList();

	    if (queryResults.isEmpty()) {
		response.setError(new Error("RIR2", "No data found",
			"proxy.RancherInvoice.Read"));
	    } else {
		response.getRecord().addAll(
			contentFromList(queryResults,
				com.tramex.sisoprega.dto.RancherInvoice.class));

		response.setError(new Error("0", "SUCCESS",
			"proxy.Rancher.Read"));
	    }
	} catch (Exception e) {
	    log.severe("Exception found while reading rancher invoice filter");
	    log.throwing(this.getClass().getCanonicalName(), "Read", e);

	    response.setError(new Error("RIR1", "Read Exception: "
		    + e.getMessage(), "proxy.RancherInvoice.Read"));
	}

	log.exiting(this.getClass().getCanonicalName(), "Read");
	return response;
    }

    /**
     * @see Cruddable#Update(GatewayRequest)
     */
    @Override
    public UpdateGatewayResponse Update(GatewayRequest request) {
	log.entering(this.getClass().getCanonicalName(), "Update");
	UpdateGatewayResponse response = new UpdateGatewayResponse();

	com.tramex.sisoprega.dto.RancherInvoice invoice = null;

	try {
	    invoice = entityFromRequest(request,
		    com.tramex.sisoprega.dto.RancherInvoice.class);

	    if (invoice.getRancherInvoiceId() == 0) {
		log.warning("RIU1 - Invalid rancherInvoiceId");
		response.setError(new Error("RIU1",
			"Invalide rancherInvoiceId", "proxy.Rancher.Update"));
	    } else {
		if (validateEntity(invoice)) {
		    em.merge(invoice);
		    em.flush();

		    response.setUpdatedRecord(getContentFromEntity(invoice,
			    com.tramex.sisoprega.dto.RancherInvoice.class));
		    response.setEntityName(request.getEntityName());
		    response.setError(new Error("0", "SUCCESS",
			    "proxy.RancherInvoice.Update"));
		} else {
		    log.warning("Validation error: " + error_description);
		    response.setError(new Error("RIU2", "Validation error: "
			    + error_description, "proxy.RancherInvoice.Update"));
		}
	    }

	} catch (Exception e) {
	    log.severe("Exception found while updating rancher invoice");
	    log.throwing(this.getClass().getName(), "Update", e);

	    response.setError(new Error("RIU3", "Update exception "
		    + e.getMessage(), "proxy.RancherInvoice.Update"));
	}

	log.exiting(this.getClass().getCanonicalName(), "Update");
	return response;
    }

    /**
     * @see Cruddable#Delete(GatewayRequest)
     */
    @Override
    public BaseResponse Delete(GatewayRequest request) {
	log.entering(this.getClass().getCanonicalName(), "Delete");
	BaseResponse response = new BaseResponse();

	try {
	    com.tramex.sisoprega.dto.RancherInvoice invoice = entityFromRequest(
		    request, com.tramex.sisoprega.dto.RancherInvoice.class);
	    if (invoice.getRancherInvoiceId() == 0) {
		log.warning("RID1 - Invalid rancherInvoiceId.");
		response.setError(new Error("RID1", "Invalid rancherInvoiceId",
			"proxy.RancherInvoice.Delete"));
	    } else {
		TypedQuery<com.tramex.sisoprega.dto.RancherInvoice> readQuery = em
			.createNamedQuery("RANCHER_INVOICE_BY_ID",
				com.tramex.sisoprega.dto.RancherInvoice.class);
		readQuery.setParameter("rancherInvoiceId",
			invoice.getRancherInvoiceId());
		invoice = readQuery.getSingleResult();

		em.merge(invoice);
		em.remove(invoice);
		em.flush();

		response.setError(new Error("0", "SUCCESS",
			"proxy.RancherInvoice.Delete"));
	    }
	} catch (Exception e) {
	    log.severe("Exception found while deleting rancher invoicing info");
	    log.throwing(this.getClass().getName(), "Delete", e);

	    response.setError(new Error("RID2", "Delete exception: "
		    + e.getMessage(), "proxy.RancherInvoice.Delete"));
	}

	log.exiting(this.getClass().getCanonicalName(), "Delete");
	return response;
    }

    /**
     * Override functionality, evaluating over EnterpriseRancherBean for
     * duplicates.
     */
    @Override
    protected boolean validateEntity(Object entity) {
	boolean result = super.validateEntity(entity);
	com.tramex.sisoprega.dto.RancherInvoice invoice = (com.tramex.sisoprega.dto.RancherInvoice) entity;
	if (result) {
	    result = !duplicateEnterprise(invoice);
	}

	if (result) {
	    result = rancherExists(invoice);
	}

	return result;
    }

    private boolean duplicateEnterprise(
	    com.tramex.sisoprega.dto.RancherInvoice invoice) {

	boolean duplicate = false;

	duplicate = duplicateRFC(invoice);
	if (!duplicate) {
	    duplicate = duplicateLegalName(invoice);
	}

	return duplicate;
    }

    private boolean duplicateRFC(com.tramex.sisoprega.dto.RancherInvoice invoice) {
	boolean duplicate = false;

	TypedQuery<com.tramex.sisoprega.dto.EnterpriseRancher> readQuery = null;

	readQuery = em.createNamedQuery("ENTERPRISE_RANCHER_BY_RFC",
		com.tramex.sisoprega.dto.EnterpriseRancher.class);
	readQuery.setParameter("rfc", invoice.getLegalId());

	try {
	    com.tramex.sisoprega.dto.EnterpriseRancher enterprise = readQuery
		    .getSingleResult();
	    duplicate = enterprise != null;
	    error_description = "RFC (legal_id) is already in use by an enterprise rancher";
	} catch (NoResultException e) {
	    duplicate = false;
	}

	return duplicate;
    }

    private boolean duplicateLegalName(
	    com.tramex.sisoprega.dto.RancherInvoice invoice) {
	boolean duplicate = false;

	TypedQuery<com.tramex.sisoprega.dto.EnterpriseRancher> readQuery = null;

	readQuery = em.createNamedQuery("ENTERPRISE_RANCHER_BY_LEGAL_NAME",
		com.tramex.sisoprega.dto.EnterpriseRancher.class);
	readQuery.setParameter("legalName", invoice.getLegalName());

	try {
	    com.tramex.sisoprega.dto.EnterpriseRancher enterprise = readQuery
		    .getSingleResult();
	    duplicate = enterprise != null;
	    error_description = "Legal name is already in use by an enterprise rancher";
	} catch (NoResultException e) {
	    duplicate = false;
	}

	return duplicate;
    }

    private boolean rancherExists(
	    com.tramex.sisoprega.dto.RancherInvoice invoice) {
	boolean exists = true;

	TypedQuery<com.tramex.sisoprega.dto.Rancher> readQuery = null;

	readQuery = em.createNamedQuery("RANCHER_BY_ID",
		com.tramex.sisoprega.dto.Rancher.class);
	readQuery.setParameter("rancherId", invoice.getRancherId());

	try {
	    com.tramex.sisoprega.dto.Rancher enterprise = readQuery
		    .getSingleResult();
	    exists = enterprise != null;
	} catch (NoResultException e) {
	    exists = false;
	    error_description = "RancherId " + invoice.getRancherId()
		    + " does not exists on database";
	}

	return exists;
    }
}
