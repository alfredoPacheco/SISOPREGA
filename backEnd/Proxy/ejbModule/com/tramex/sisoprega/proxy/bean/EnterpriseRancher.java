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
import javax.persistence.TypedQuery;

import com.tramex.sisoprega.common.BaseResponse;
import com.tramex.sisoprega.common.CreateGatewayResponse;
import com.tramex.sisoprega.common.Error;
import com.tramex.sisoprega.common.GatewayRequest;
import com.tramex.sisoprega.common.ReadGatewayResponse;
import com.tramex.sisoprega.common.UpdateGatewayResponse;
import com.tramex.sisoprega.common.crud.Cruddable;

/**
 * This proxy knows the logic to evaluate Enterprise Ranchers and the way to the
 * database in order to save their data. Also, it is contained in EJB container,
 * we can apply security and life cycle methods for resources.<BR/>
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
@Stateless(mappedName = "EnterpriseRancherProxy")
public class EnterpriseRancher extends BaseBean implements Cruddable {

    /**
     * @see Cruddable#Delete(GatewayRequest)
     */
    @Override
    public BaseResponse Delete(GatewayRequest request) {
	log.entering(this.getClass().getCanonicalName(), "Delete");

	BaseResponse response = new BaseResponse();
	try {

	    com.tramex.sisoprega.dto.EnterpriseRancher enterpriseRancher = entityFromRequest(
		    request, com.tramex.sisoprega.dto.EnterpriseRancher.class);
	    if (enterpriseRancher.getEnterpriseId() == 0) {
		log.warning("ERD1 - Invalid enterpriseId.");
		response.setError(new Error("ERD1", "Invalid enterpriseId",
			"proxy.EnterpriseRancher.Delete"));
	    } else {
		TypedQuery<com.tramex.sisoprega.dto.EnterpriseRancher> readQuery = em
			.createNamedQuery(
				"ENTERPRISE_RANCHER_BY_ID",
				com.tramex.sisoprega.dto.EnterpriseRancher.class);
		readQuery.setParameter("enterpriseId",
			enterpriseRancher.getEnterpriseId());
		enterpriseRancher = readQuery.getSingleResult();
		em.merge(enterpriseRancher);
		em.remove(enterpriseRancher);
		em.flush();

		response.setError(new Error("0", "SUCCESS",
			"proxy.EnterpriseRancher.Delete"));
	    }
	} catch (Exception e) {
	    log.severe("Exception found while deleting enterprise rancher");
	    log.throwing(this.getClass().getName(), "Delete", e);

	    response.setError(new Error("ERD2", "Delete exception: "
		    + e.getMessage(), "proxy.Rancher.Delete"));
	}

	log.exiting(this.getClass().getCanonicalName(), "Delete");
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

	com.tramex.sisoprega.dto.EnterpriseRancher enterpriseRancher = null;
	try {
	    enterpriseRancher = entityFromRequest(request,
		    com.tramex.sisoprega.dto.EnterpriseRancher.class);
	    log.fine("Got rancher from request: " + enterpriseRancher);

	    TypedQuery<com.tramex.sisoprega.dto.EnterpriseRancher> readQuery = null;

	    if (enterpriseRancher.getEnterpriseId() != 0) {
		readQuery = em.createNamedQuery("ENTERPRISE_RANCHER_BY_ID",
			com.tramex.sisoprega.dto.EnterpriseRancher.class);
		log.fine("Query by Id: " + enterpriseRancher.getEnterpriseId());
		readQuery.setParameter("enterpriseId",
			enterpriseRancher.getEnterpriseId());
	    } else {
		// No other filter expected for enterprise ranchers, return all
		readQuery = em.createNamedQuery("ALL_ENTERPRISE_RANCHERS",
			com.tramex.sisoprega.dto.EnterpriseRancher.class);
	    }

	    // Query the results through the jpa using a typedQuery
	    List<com.tramex.sisoprega.dto.EnterpriseRancher> queryResults = readQuery
		    .getResultList();

	    if (queryResults.isEmpty()) {
		response.setError(new Error("ERR2", "No data found",
			"proxy.EnterpriseRancher.Read"));
	    } else {
		// Add query results to response
		response.getRecord()
			.addAll(contentFromList(
				queryResults,
				com.tramex.sisoprega.dto.EnterpriseRancher.class));

		// Add success message to response
		response.setError(new Error("0", "SUCCESS",
			"proxy.EnterpriseRancher.Read"));
	    }
	} catch (Exception e) {
	    // something went wrong, alert the server and respond the client
	    log.severe("Exception found while reading enterprise rancher filter");
	    log.throwing(this.getClass().getName(), "Read", e);

	    response.setError(new Error("ERR1", "Read Exception:"
		    + e.getMessage(), "proxy.EnterpriseRancher.Read"));
	}

	// end and respond.
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
	com.tramex.sisoprega.dto.EnterpriseRancher enterpriseRancher = null;
	try {
	    enterpriseRancher = entityFromRequest(request,
		    com.tramex.sisoprega.dto.EnterpriseRancher.class);
	    if (enterpriseRancher.getEnterpriseId() == 0) {
		log.warning("ERU1 - Invalid enterpriseId.");
		response.setError(new Error("ERU1", "Invalid enterpriseId",
			"proxy.EnterpriseRancher.Update"));
	    } else {
		if (validateEntity(enterpriseRancher)) {
		    em.merge(enterpriseRancher);
		    em.flush();

		    response.setUpdatedRecord(getContenFromEntity(
			    enterpriseRancher,
			    com.tramex.sisoprega.dto.EnterpriseRancher.class));
		    response.setEntityName(request.getEntityName());
		    response.setError(new Error("0", "SUCCESS",
			    "proxy.EnterpriseRancher.Update"));
		} else {
		    log.warning("Validation error: " + error_description);
		    response.setError(new Error("ERU2", "Validation error: "
			    + error_description,
			    "proxy.EnterpriseRancher.Update"));
		}
	    }
	} catch (Exception e) {
	    log.severe("Exception found while updating enterpriseRancher");
	    log.throwing(this.getClass().getName(), "Update", e);

	    response.setError(new Error("ERU3", "Update exception"
		    + e.getMessage(), "proxy.EnterpriseRancher.Update"));
	}

	log.exiting(this.getClass().getCanonicalName(), "Update");
	return response;
    }

    /**
     * @see Cruddable#Create(GatewayRequest)
     */
    @Override
    public CreateGatewayResponse Create(GatewayRequest request) {
	log.entering(EnterpriseRancher.class.getCanonicalName(), "Create");

	CreateGatewayResponse response = new CreateGatewayResponse();
	com.tramex.sisoprega.dto.EnterpriseRancher enterpriseRancher = null;
	try {
	    enterpriseRancher = entityFromRequest(request,
		    com.tramex.sisoprega.dto.EnterpriseRancher.class);

	    log.fine("Received enterprise rancher in request: {"
		    + enterpriseRancher.toString() + "}");

	    if (validateEntity(enterpriseRancher)) {
		log.finer("Enterprise Rancher succesfully validated");
		em.persist(enterpriseRancher);
		em.flush();
		log.finer("Enterprise Rancher persisted on database");

		String sId = String
			.valueOf(enterpriseRancher.getEnterpriseId());
		log.finer("Setting enterprise rancher id in response [" + sId
			+ "]");

		response.setGeneratedId(sId);
		response.setError(new Error("0", "SUCCESS",
			"proxy.EnterpriseRancher.Create"));
	    } else {
		// Set validation error
		log.warning("Validation exception: " + error_description);
		response.setError(new Error("ERC1", "Validation exception: "
			+ error_description, "proxy.EnterpriseRancer.Create"));
	    }
	} catch (Exception e) {
	    // Set exception details
	    log.severe("Exception found while create enterprise rancher");
	    log.throwing(this.getClass().getName(), "Create", e);

	    response.setError(new Error("ERC2", "Create exception:"
		    + e.getMessage(), "proxy.EnterpriseRancher.Create"));
	}

	log.exiting(EnterpriseRancher.class.getCanonicalName(), "Create");
	return response;
    }
}
