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

import java.lang.reflect.Field;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import com.tramex.sisoprega.common.BaseResponse;
import com.tramex.sisoprega.common.CreateGatewayResponse;
import com.tramex.sisoprega.common.Error;
import com.tramex.sisoprega.common.GatewayContent;
import com.tramex.sisoprega.common.GatewayRequest;
import com.tramex.sisoprega.common.ReadGatewayResponse;
import com.tramex.sisoprega.common.UpdateGatewayResponse;
import com.tramex.sisoprega.common.Utils;
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
public class EnterpriseRancher implements Cruddable {
    private Logger log = Logger.getLogger(EnterpriseRancher.class
	    .getCanonicalName());

    @PersistenceContext
    private EntityManager em;

    private String error_description;

    /**
     * @see Cruddable#Delete(GatewayRequest)
     */
    public BaseResponse Delete(GatewayRequest request) {
	// TODO Auto-generated method stub
	BaseResponse response = new BaseResponse();
	response.setError(new Error("ERD9", "Unimplemented Delete method",
		"proxy.EnterpriseRancher.Delete"));
	return response;
    }

    /**
     * @see Cruddable#Read(GatewayRequest)
     */
    public ReadGatewayResponse Read(GatewayRequest request) {
	log.entering(this.getClass().getCanonicalName(), "Read");

	ReadGatewayResponse response = new ReadGatewayResponse();
	response.setEntityName(request.getEntityName());

	com.tramex.sisoprega.dto.EnterpriseRancher enterpriseRancher = null;
	try {
	    enterpriseRancher = enterpriseRancherFromRequest(request);
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

	    // Add query results to response
	    response.getRecord().addAll(
		    contentFromEnterpriseRancherList(queryResults));

	    // Add success message to response
	    response.setError(new Error("0", "Success",
		    "proxy.EnterpriseRancher.Read"));

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
    public UpdateGatewayResponse Update(GatewayRequest request) {
	// TODO Auto-generated method stub
	UpdateGatewayResponse response = new UpdateGatewayResponse();
	response.setError(new Error("ERR9", "Unimplemented Update method",
		"proxy.EnterpriseRancher.Update"));
	return response;
    }

    /**
     * @see Cruddable#Create(GatewayRequest)
     */
    public CreateGatewayResponse Create(GatewayRequest request) {
	log.entering(EnterpriseRancher.class.getCanonicalName(), "Create");

	CreateGatewayResponse response = new CreateGatewayResponse();
	com.tramex.sisoprega.dto.EnterpriseRancher enterpriseRancher = null;
	try {
	    enterpriseRancher = enterpriseRancherFromRequest(request);

	    log.fine("Received enterprise rancher in request: {"
		    + enterpriseRancher.toString() + "}");

	    if (ValidateRancher(enterpriseRancher)) {
		log.finer("Enterprise Rancher succesfully validated");
		em.persist(enterpriseRancher);
		em.flush();
		log.finer("Enterprise Rancher persisted on database");

		String sId = String
			.valueOf(enterpriseRancher.getEnterpriseId());
		log.finer("Setting enterprise rancher id in response [" + sId
			+ "]");

		response.setGeneratedId(sId);
		response.setError(new Error("0", "Success",
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

    private boolean ValidateRancher(
	    com.tramex.sisoprega.dto.EnterpriseRancher enterpriseRancher) {
	boolean result = true;

	if (enterpriseRancher == null) {
	    error_description = "Provided entityRancher can't be null";
	    result = false;
	}

	return result;
    }

    private com.tramex.sisoprega.dto.EnterpriseRancher enterpriseRancherFromRequest(
	    GatewayRequest request) throws ParseException,
	    IllegalArgumentException, IllegalAccessException {
	log.finer("BEGIN|enterpriseRancherFromRequest|Request{"
		+ request.toString() + "}");

	com.tramex.sisoprega.dto.EnterpriseRancher enterpriseRancher = new com.tramex.sisoprega.dto.EnterpriseRancher();

	// Use reflection to retrieve values from request
	Class<com.tramex.sisoprega.dto.EnterpriseRancher> cls = com.tramex.sisoprega.dto.EnterpriseRancher.class;
	Field[] clsField = cls.getDeclaredFields();
	for (Field field : clsField) {
	    field.setAccessible(true);
	    String fieldName = field.getName();
	    log.finer("Identified field in Rancher entity:{" + fieldName + "}");
	    if (field.getType() == String.class) {
		log.finest("The field is an String, setting value from request.");
		field.set(enterpriseRancher,
			Utils.valueFromRequest(request, fieldName));
	    } else {
		log.finest("The field is not an String, is a ["
			+ field.getType() + "]");
		Object val = Utils.valueFromRequest(request, fieldName,
			field.getType());
		log.finer("Value to be set: " + val);
		if (val != null) {
		    field.set(enterpriseRancher, val);
		}
	    }
	}

	log.finer("END|enterpriseRancherFromRequest|enterpriseRancher{"
		+ enterpriseRancher.toString() + "}");
	return enterpriseRancher;
    }

    private GatewayContent getContentFromEnterpriseRancher(
	    com.tramex.sisoprega.dto.EnterpriseRancher enterpriseRancher)
	    throws IllegalArgumentException, IllegalAccessException {
	GatewayContent content = new GatewayContent();
	Class<com.tramex.sisoprega.dto.EnterpriseRancher> cls = com.tramex.sisoprega.dto.EnterpriseRancher.class;
	Field[] clsField = cls.getDeclaredFields();
	for (Field field : clsField) {
	    field.setAccessible(true);
	    String fieldName = field.getName();
	    log.finest("Identified field in Rancher entity:{" + fieldName + "}");

	    com.tramex.sisoprega.common.Field contentField = new com.tramex.sisoprega.common.Field();
	    contentField.setName(fieldName);
	    if (field.get(enterpriseRancher) != null)
		contentField.setValue(field.get(enterpriseRancher).toString());

	    content.getFields().add(contentField);
	}
	return content;
    }

    private List<GatewayContent> contentFromEnterpriseRancherList(
	    List<com.tramex.sisoprega.dto.EnterpriseRancher> enterpriseRanchers)
	    throws IllegalArgumentException, IllegalAccessException {
	List<GatewayContent> result = new ArrayList<GatewayContent>();
	for (com.tramex.sisoprega.dto.EnterpriseRancher er : enterpriseRanchers) {
	    result.add(getContentFromEnterpriseRancher(er));
	}
	log.finest("contentFromEnterpriseRancherList result: " + result);
	return result;
    }
}
