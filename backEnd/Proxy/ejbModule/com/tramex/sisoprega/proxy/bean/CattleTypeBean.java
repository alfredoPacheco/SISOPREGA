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

import javax.persistence.TypedQuery;

import com.tramex.sisoprega.common.BaseResponse;
import com.tramex.sisoprega.common.CreateGatewayResponse;
import com.tramex.sisoprega.common.Error;
import com.tramex.sisoprega.common.GatewayContent;
import com.tramex.sisoprega.common.GatewayRequest;
import com.tramex.sisoprega.common.ReadGatewayResponse;
import com.tramex.sisoprega.common.UpdateGatewayResponse;
import com.tramex.sisoprega.common.crud.Cruddable;
import com.tramex.sisoprega.dto.CattleType;

/**
 * This proxy knows the logic to evaluate cattle type
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
 * 18/11/2012  Jaime Figueroa                 Initial Version.
 * 23/11/2012  Diego Torres		      Fixing Read operation.
 * ====================================================================================
 * </PRE>
 * @author Jaime Figueroa
 *
 */
public class CattleTypeBean extends BaseBean implements Cruddable {

    /* (non-Javadoc)
     * @see com.tramex.sisoprega.common.crud.Cruddable#Create(com.tramex.sisoprega.common.GatewayRequest)
     */
    @Override
    public CreateGatewayResponse Create(GatewayRequest request) {
	log.entering(this.getClass().getCanonicalName(), "Create");

	CreateGatewayResponse response = new CreateGatewayResponse();
	CattleType cattle = null;
	try {
	    cattle = entityFromRequest(request, CattleType.class);

	    log.fine("Received cattle type in request: " + cattle);

	    if (validateEntity(cattle)) {
		log.finer("Cattle type succesfully validated");
		em.persist(cattle);
		log.finer("Cattle type persisted on database");
		em.flush();

		String sId = String.valueOf(cattle.getCatclassId()); //*  Duadas 
		log.finer("Setting cattle type id in response: " + sId);
		response.setGeneratedId(sId);
		response.setError(new Error("0", "SUCCESS",
			"proxy.CattleTypeBean.Create"));
	    } else {
		log.warning("Validation error: " + error_description);
		response.setError(new Error("CTC1", "Validation error: "
			+ error_description, "proxy.CattleTypeBean.Create"));
	    }

	} catch (Exception e) {
	    log.severe("Exception found while creating cattle type");
	    log.throwing(this.getClass().getName(), "Create", e);

	    response.setError(new Error("CTC2", "Create exception: "
		    + e.getMessage(), "proxy.CattleTypeBean.Create"));
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

	CattleType cattle = null;
	try {
	    cattle = entityFromRequest(request, CattleType.class);

	    log.fine("Got contact from request: " + cattle);
	    TypedQuery<CattleType> readQuery = null;

	    if(cattle.getCattypeId() != 0){
		readQuery = em.createNamedQuery("CATTLE_TYPE_BY_ID", CattleType.class);
		readQuery.setParameter("cattypeId", cattle.getCattypeId());
	    }else if(cattle.getCatclassId()!=0){
		readQuery = em.createNamedQuery("CATTLE_TYPE_BY_CLASS_ID", CattleType.class);
		readQuery.setParameter("catClassId", cattle.getCatclassId());
	    }else{
		readQuery = em.createNamedQuery("ALL_CATTLE_TYPE", CattleType.class);
	    }
	    
	    List<CattleType> queryResults = readQuery.getResultList();

	    if (queryResults.isEmpty()) {
		Error error = new Error();
		error.setExceptionId("CTR2");
		error.setExceptionDescription("No data found");
		error.setOrigin("proxy.CattleType.Read");
		response.setError(error);
	    } else {
		List<GatewayContent> records = contentFromList(queryResults,
			CattleType.class);
		response.getRecord().addAll(records);
		response.setError(new Error("0", "SUCCESS",
			"proxy.CattleType.Read"));

	    }

	} catch (Exception e) {
	    log.severe("Exception found while reading Cattle Class");
	    log.throwing(this.getClass().getCanonicalName(), "Read", e);

	    response.setError(new Error("CTR3", "Read exception: "
		    + e.getMessage(), "proxy.CattleClass.Read"));
	}

	log.exiting(this.getClass().getCanonicalName(), "Read");
	return response;
    }
    
    /* (non-Javadoc)
     * @see com.tramex.sisoprega.common.crud.Cruddable#Update(com.tramex.sisoprega.common.GatewayRequest)
     */
    @Override
    public UpdateGatewayResponse Update(GatewayRequest request) {
	log.entering(this.getClass().getCanonicalName(), "Update");
	UpdateGatewayResponse response = new UpdateGatewayResponse();
	CattleType cattle = null;
	try {
	    cattle = entityFromRequest(request, CattleType.class);

	    if (cattle.getCatclassId() == 0) {
		log.warning("CTU1 - Invalid Cattle Type id");
		response.setError(new Error("CTU1",
			"Invalid Cattle Type id",
			"proxy.CattleType.Update"));
	    } else {
		if (validateEntity(cattle)) {
		    em.merge(cattle);
		    em.flush();

		    GatewayContent content = getContentFromEntity(cattle,
			    CattleType.class);
		    response.setUpdatedRecord(content);

		    response.setError(new Error("0", "SUCCESS",
			    "proxy.CattleType.Update"));
		} else {
		    log.warning("Validation error: " + error_description);
		    response.setError(new Error("CTU2", "Validation error: "
			    + error_description,
			    "proxy.CattleType.Update"));
		}
	    }

	} catch (Exception e) {
	    log.severe("Exception found while updating CattleType");
	    log.throwing(this.getClass().getName(), "Update", e);

	    response.setError(new Error("CTU3", "Update exception "
		    + e.getMessage(), "proxy.CattleType.Update"));
	}

	log.exiting(this.getClass().getCanonicalName(), "Update");
	return response;
    }

    /* (non-Javadoc)
     * @see com.tramex.sisoprega.common.crud.Cruddable#Delete(com.tramex.sisoprega.common.GatewayRequest)
     */
    @Override
    public BaseResponse Delete(GatewayRequest request) {
	log.entering(this.getClass().getCanonicalName(), "Delete");
	BaseResponse response = new BaseResponse();

	try {
	    CattleType contact = entityFromRequest(request,
		    CattleType.class);
	    if (contact.getCatclassId() == 0) {
		log.warning("CTD1 - Invalid CattleType");
		response.setError(new Error("CCD1",
			"Invalid CattleTypeId",
			"proxy.CattleClass.Delete"));
	    } else {
		TypedQuery<CattleType> readQuery = em.createNamedQuery(
			"CATTLE_CLASS_BY_ID", CattleType.class);
		readQuery.setParameter("catclassId", contact.getCatclassId());
		contact = readQuery.getSingleResult();
		em.merge(contact);
		em.remove(contact);
		em.flush();

		response.setError(new Error("0", "SUCCESS",
			"proxy.CattleType.Delete"));
	    }
	} catch (Exception e) {
	    log.severe("Exception found while deleting contact");
	    log.throwing(this.getClass().getName(), "Delete", e);

	    response.setError(new Error("CTD2", "Delete exception: "
		    + e.getMessage(), "proxy.CattleType.Delete"));
	}

	log.exiting(this.getClass().getCanonicalName(), "Delete");
	return response;
    }

}
