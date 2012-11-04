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
 * This proxy knows the logic to evaluate Ranchers and the way to the database
 * in order to save their data. Also, it is contained in EJB container, we can
 * apply security and life cycle methods for resources.<BR/>
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 10/27/2012  Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 */

@Stateless
public class Rancher implements Cruddable {
    private Logger log = Logger.getLogger(Rancher.class.getCanonicalName());

    @PersistenceContext
    private EntityManager em;

    private String error_description;

    @Override
    public CreateGatewayResponse Create(GatewayRequest request) {
	log.entering(Rancher.class.getCanonicalName(), "Create");

	CreateGatewayResponse response = new CreateGatewayResponse();
	com.tramex.sisoprega.dto.Rancher rancher = null;
	try {
	    rancher = rancherFromRequest(request);

	    log.fine("Received rancher in request:{" + rancher.toString() + "}");

	    if (validateRancher(rancher)) {
		log.finer("Rancher succesfully validated");
		em.persist(rancher);
		log.finer("Rancher persisted on database");
		em.flush();

		String sId = String.valueOf(rancher.getRancherId());
		log.finer("Setting rancher id in response [" + sId + "]");
		response.setGeneratedId(sId);
		response.setError(new Error("0", "Success",
			"proxy.Rancher.Create"));
		log.finer("built successfull response");
	    } else {
		log.warning("Built validation exception response with no persistence of rancher.");
		response.setError(new Error("RC01", "Validation Exception:["
			+ error_description + "]", "proxy.Rancher.Create"));
	    }
	} catch (Exception e) {
	    log.severe("Exception found while creating rancher");
	    log.throwing(this.getClass().getName(), "Create", e);

	    response.setError(new Error("RC02", "Create Exception:["
		    + error_description + "]", "proxy.Rancher.Create"));
	}

	log.exiting(Rancher.class.getCanonicalName(), "Create");
	log.info("END|proxy.Rancher.Create|RequestId:["
		+ request.getRequestId() + "]");
	return response;
    }

    @Override
    public ReadGatewayResponse Read(GatewayRequest request) {
	log.entering(Rancher.class.getCanonicalName(), "Read");

	ReadGatewayResponse response = new ReadGatewayResponse();
	response.setEntityName(request.getEntityName());
	
	com.tramex.sisoprega.dto.Rancher rancher = null;
	try {
	    rancher = rancherFromRequest(request);

	    log.fine("Got rancher from request: [" + rancher.toString() + "]");
	    
	    TypedQuery<com.tramex.sisoprega.dto.Rancher> readQuery = null;

	    if (rancher.getRancherId() != 0) {
		readQuery = em.createNamedQuery("RANCHER_BY_ID",
			com.tramex.sisoprega.dto.Rancher.class);
		log.fine("Query by Id [" + rancher.getRancherId() + "]");
		readQuery.setParameter("rancherId", rancher.getRancherId());
	    } else {
		// No other filter expected for ranchers, only by Id
		readQuery = em.createNamedQuery("ALL_RANCHERS",
			com.tramex.sisoprega.dto.Rancher.class);
	    }

	    List<com.tramex.sisoprega.dto.Rancher> queryResults = readQuery
		    .getResultList();
	    
	    response.getRecord().addAll(contentFromRanchersList(queryResults));
	    
	    response.setError(new Error("0", "SUCCESS", "proxy.Rancher.Read"));
	} catch (Exception e) {
	    log.severe("Exception found while reading rancher filter");
	    log.throwing(this.getClass().getName(), "Read", e);

	    response.setError(new Error("RR01", "Read Exception:["
		    + error_description + "]", "proxy.Rancher.Read"));
	}
	
	log.exiting(Rancher.class.getCanonicalName(), "Read");
	return response;
    }

    @Override
    public UpdateGatewayResponse Update(GatewayRequest request) {
	UpdateGatewayResponse response = new UpdateGatewayResponse();
	com.tramex.sisoprega.dto.Rancher rancher = null;
	try {
	    rancher = rancherFromRequest(request);
	    if (validateRancher(rancher)) {
		// TODO: Set functionality
		response.setError(new Error("U999",
			"Unimplemented functionality", "proxy.Rancher.Create"));
	    } else {
		response.setError(new Error("R001", "Validation Exception:["
			+ error_description + "]", "proxy.Rancher.Create"));
	    }
	} catch (java.lang.Exception e) {
	    response.setError(new Error("R002", "Validation Exception:["
		    + error_description + "]", "proxy.Rancher.Create"));
	}

	return response;
    }

    @Override
    public BaseResponse Delete(GatewayRequest request) {
	// TODO Auto-generated method stub
	BaseResponse response = new BaseResponse();
	Error e = new Error("R999", "Unimplemented functionality",
		"proxy.Rancher.Delete");
	response.setError(e);
	return response;
    }

    private boolean validateRancher(com.tramex.sisoprega.dto.Rancher rancher) {
	boolean result = true;

	if (rancher == null) {
	    result = false;
	}

	return result;
    }

    private com.tramex.sisoprega.dto.Rancher rancherFromRequest(
	    GatewayRequest request) throws IllegalArgumentException,
	    IllegalAccessException, ParseException {
	log.info("BEGIN|rancherFromRequest|Request{" + request + "}");
	// Create rancher from request
	com.tramex.sisoprega.dto.Rancher rancher = new com.tramex.sisoprega.dto.Rancher();

	// Use reflection to retrieve values from request
	Class<com.tramex.sisoprega.dto.Rancher> cls = com.tramex.sisoprega.dto.Rancher.class;
	Field[] clsField = cls.getDeclaredFields();
	for (Field field : clsField) {
	    field.setAccessible(true);
	    String fieldName = field.getName();
	    log.fine("Identified field in Rancher entity:{" + fieldName + "}");
	    if (field.getType() == String.class) {
		log.finer("The field is an String, setting value from request.");
		field.set(rancher, Utils.valueFromRequest(request, fieldName));
	    } else {
		log.finer("The field is not an String, is a ["
			+ field.getType() + "]");
		Object val = Utils.valueFromRequest(request, fieldName,
			field.getType());
		log.fine("Value to be set: " + val);
		if (val != null) {
		    field.set(rancher, val);
		}
	    }
	}

	log.info("END|rancherFromRequest|Rancher{" + rancher.toString() + "}");
	return rancher;
    }

    private List<GatewayContent> contentFromRanchersList(
	    List<com.tramex.sisoprega.dto.Rancher> ranchers) throws IllegalArgumentException, IllegalAccessException {
	List<GatewayContent> result = new ArrayList<GatewayContent>();
	for (com.tramex.sisoprega.dto.Rancher rancher : ranchers) {
	    GatewayContent content = new GatewayContent();
	    Class<com.tramex.sisoprega.dto.Rancher> cls = com.tramex.sisoprega.dto.Rancher.class;
	    Field[] clsField = cls.getDeclaredFields();
	    for (Field field : clsField) {
		field.setAccessible(true);
		String fieldName = field.getName();
		log.fine("Identified field in Rancher entity:{" + fieldName + "}");
		
		com.tramex.sisoprega.common.Field contentField = new com.tramex.sisoprega.common.Field();
		contentField.setName(fieldName);
		if(field.get(rancher)!=null)
		    contentField.setValue(field.get(rancher).toString());
		
		content.getFields().add(contentField);
	    }

	    result.add(content);
	}
	log.info("contentFromRanchersList Result: " +  result.toString());
	return result;
    }
}
