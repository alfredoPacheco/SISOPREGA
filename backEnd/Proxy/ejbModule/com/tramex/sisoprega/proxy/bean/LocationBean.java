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
import com.tramex.sisoprega.common.GatewayContent;
import com.tramex.sisoprega.common.GatewayRequest;
import com.tramex.sisoprega.common.ReadGatewayResponse;
import com.tramex.sisoprega.common.UpdateGatewayResponse;
import com.tramex.sisoprega.common.crud.Cruddable;
import com.tramex.sisoprega.dto.Location;
/**
 * This proxy knows the logic to evaluate Cattle class entities information and
 * the way to the database in order to save their data. Also, it is contained in
 * EJB container, we can apply security and life cycle methods for resources.<BR/>
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 11/23/2012  Jaime Figueroa                 Initial Version.
 * ====================================================================================
 * </PRE>
 * @author Jaime Figueroa
 *
 */
@Stateless
public class LocationBean  extends BaseBean implements Cruddable {

    /* (non-Javadoc)
     * @see com.tramex.sisoprega.common.crud.Cruddable#Create(com.tramex.sisoprega.common.GatewayRequest)
     */
    @Override
    public CreateGatewayResponse Create(GatewayRequest request) {
	log.entering(this.getClass().getCanonicalName(), "Create");

	CreateGatewayResponse response = new CreateGatewayResponse();
	Location catalog = null;
	try {
	    catalog = entityFromRequest(request, Location.class);

	    log.fine("Received catalog location in request: " + catalog);

	    if (validateEntity(catalog)) {
		log.finer("cat location succesfully validated");
		em.persist(catalog);
		log.finer("cat location persisted on database");
		em.flush();

		String sId = String.valueOf(catalog.getLocationId());
		log.finer("Setting cat location id in response: " + sId);
		response.setGeneratedId(sId);
		response.setError(new Error("0", "SUCCESS",
			"proxy.CatLocationBean.Create"));
	    } else {
		log.warning("Validation error: " + error_description);
		response.setError(new Error("CLC1", "Validation error: "
			+ error_description, "proxy.CatLocationBean.Create"));
	    }

	} catch (Exception e) {
	    log.severe("Exception found while creating cat location");
	    log.throwing(this.getClass().getName(), "Create", e);

	    response.setError(new Error("CLC2", "Create exception: "
		    + e.getMessage(), "proxy.CatLocationBean.Create"));
	}

	log.exiting(this.getClass().getCanonicalName(), "Create");
	return response;
    }
    
    /* (non-Javadoc)
     * @see com.tramex.sisoprega.common.crud.Cruddable#Read(com.tramex.sisoprega.common.GatewayRequest)
     */
    @Override
    public ReadGatewayResponse Read(GatewayRequest request) {
	log.entering(this.getClass().getCanonicalName(), "Read");

	ReadGatewayResponse response = new ReadGatewayResponse();
	response.setEntityName(request.getEntityName());

	Location catalog = null;
	try {
	    catalog = entityFromRequest(request, Location.class);

	    log.fine("Got contact from request: " + catalog);
	    TypedQuery<Location> readQuery = null;

	    if (catalog.getLocationId() != 0) {
		readQuery = em.createNamedQuery("CAT_LOCATION_BY_ID",
			Location.class);
		readQuery.setParameter("catclassId", catalog.getLocationId());
	    } else {
		readQuery = em.createNamedQuery("ALL_CAT_LOCATION",
			Location.class);

	    }

	    List<Location> queryResults = readQuery.getResultList();

	    if (queryResults.isEmpty()) {
		Error error = new Error();
		error.setExceptionId("CLR1");
		error.setExceptionDescription("No data found");
		error.setOrigin("proxy.CatLocation.Read");
		response.setError(error);
	    } else {
		List<GatewayContent> records = contentFromList(queryResults,
			Location.class);
		response.getRecord().addAll(records);
		response.setError(new Error("0", "SUCCESS",
			"proxy.CatLocation.Read"));

	    }

	} catch (Exception e) {
	    log.severe("Exception found while reading Cat Location");
	    log.throwing(this.getClass().getCanonicalName(), "Read", e);

	    response.setError(new Error("CLR2", "Read exception: "
		    + e.getMessage(), "proxy.CatLocation.Read"));
	}

	log.exiting(this.getClass().getCanonicalName(), "Read");
	return response;
    }
    
    /* (non-Javadoc)
     * 
     * @see com.tramex.sisoprega.common.crud.Cruddable#Update(com.tramex.sisoprega.common.GatewayRequest)
     */
    @Override
    public UpdateGatewayResponse Update(GatewayRequest request) {
	log.entering(this.getClass().getCanonicalName(), "Update");
	UpdateGatewayResponse response = new UpdateGatewayResponse();
	Location catalog = null;
	try {
	    catalog = entityFromRequest(request, Location.class);

	    if (catalog.getLocationId() == 0) {
		log.warning("CLU1 - Invalid Cat Location id");
		response.setError(new Error("CLU1",
			"Invalid Cat Locations id",
			"proxy.CatLocation.Update"));
	    } else {
		if (validateEntity(catalog)) {
		    em.merge(catalog);
		    em.flush();

		    GatewayContent content = getContentFromEntity(catalog,
			    Location.class);
		    response.setUpdatedRecord(content);

		    response.setError(new Error("0", "SUCCESS",
			    "proxy.CatLocation.Update"));
		} else {
		    log.warning("Validation error: " + error_description);
		    response.setError(new Error("CLU2", "Validation error: "
			    + error_description,
			    "proxy.CatLocation.Update"));
		}
	    }

	} catch (Exception e) {
	    log.severe("Exception found while updating CatLocation");
	    log.throwing(this.getClass().getName(), "Update", e);

	    response.setError(new Error("CLU3", "Update exception "
		    + e.getMessage(), "proxy.CatLocation.Update"));
	}

	log.exiting(this.getClass().getCanonicalName(), "Update");
	return response;
    }

    /* (non-Javadoc)
     * 
     * @see com.tramex.sisoprega.common.crud.Cruddable#Delete(com.tramex.sisoprega.common.GatewayRequest)
     */
    @Override
    public BaseResponse Delete(GatewayRequest request) {
	log.entering(this.getClass().getCanonicalName(), "Delete");
	BaseResponse response = new BaseResponse();

	try {
	    Location catalog = entityFromRequest(request,
		    Location.class);
	    if (catalog.getLocationId() == 0) {
		log.warning("CLD1 - Invalid CatLocation");
		response.setError(new Error("CLD1",
			"Invalid CatLocationId",
			"proxy.CatLocation.Delete"));
	    } else {
		TypedQuery<Location> readQuery = em.createNamedQuery(
			"CAT_LOCATION_BY_ID", Location.class);
		readQuery.setParameter("locationId", catalog.getLocationId());
		catalog = readQuery.getSingleResult();
		em.merge(catalog);
		em.remove(catalog);
		em.flush();

		response.setError(new Error("0", "SUCCESS",
			"proxy.CatLocation.Delete"));
	    }
	} catch (Exception e) {
	    log.severe("Exception found while deleting catalog");
	    log.throwing(this.getClass().getName(), "Delete", e);

	    response.setError(new Error("CLD2", "Delete exception: "
		    + e.getMessage(), "proxy.CatLocation.Delete"));
	}

	log.exiting(this.getClass().getCanonicalName(), "Delete");
	return response;
    }

}
