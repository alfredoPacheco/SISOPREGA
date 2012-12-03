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
import com.tramex.sisoprega.dto.Barnyard;

/**
 * @author Jaime Figueroa
 * 
 */
@Stateless
public class BarnyardBean extends BaseBean implements Cruddable {

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
	Barnyard barnyard = null;
	try {
	    barnyard = entityFromRequest(request, Barnyard.class);

	    log.fine("Received Barnyard in request: " + barnyard);

	    if (validateEntity(barnyard)) {
		log.finer("Barnyard succesfully validated");
		em.persist(barnyard);
		log.finer("Barnyard persisted on database");
		em.flush();

		String sId = String.valueOf(barnyard.getBarnyardId());
		log.finer("Setting Barnyard id in response: " + sId);
		response.setGeneratedId(sId);
		response.setError(new Error("0", "SUCCESS",
			"proxy.BarnyardBean.Create"));
	    } else {
		log.warning("Validation error: " + error_description);
		response.setError(new Error("BC1", "Validation error: "
			+ error_description, "proxy.BarnyardBean.Create"));
	    }

	} catch (Exception e) {
	    log.severe("Exception found while creating BarnyardBean");
	    log.throwing(this.getClass().getName(), "Create", e);

	    response.setError(new Error("BC2", "Create exception: "
		    + e.getMessage(), "proxy.BarnyardBean.Create"));
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
	// TODO Auto-generated method stub
	return null;
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
	Barnyard barnyard = null;
	try {
	    barnyard = entityFromRequest(request, Barnyard.class);

	    if (barnyard.getBarnyardId() == 0) {
		log.warning("BU1 - Invalid Barnyard id");
		response.setError(new Error("BU1", "Invalid Barnyard id",
			"proxy.Barnyard.Update"));
	    } else {
		if (validateEntity(barnyard)) {
		    em.merge(barnyard);
		    em.flush();

		    GatewayContent content = getContentFromEntity(barnyard,
			    Barnyard.class);
		    response.setUpdatedRecord(content);

		    response.setError(new Error("0", "SUCCESS",
			    "proxy.Barnyard.Update"));
		} else {
		    log.warning("Validation error: " + error_description);
		    response.setError(new Error("BU2", "Validation error: "
			    + error_description, "proxy.Barnyard.Update"));
		}
	    }

	} catch (Exception e) {
	    log.severe("Exception found while updating Barnyard");
	    log.throwing(this.getClass().getName(), "Update", e);

	    response.setError(new Error("BU3", "Update exception "
		    + e.getMessage(), "proxy.Barnyard.Update"));
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
	    Barnyard barnyard = entityFromRequest(request, Barnyard.class);
	    if (barnyard.getBarnyardId() == 0) {
		log.warning("BD1 - Invalid Barnyard");
		response.setError(new Error("BD1", "Invalid BarnyardId",
			"proxy.Barnyard.Delete"));
	    } else {
		TypedQuery<Barnyard> readQuery = em.createNamedQuery(
			"CATTLE_CLASS_BY_ID", Barnyard.class);
		readQuery.setParameter("BarnyardId", barnyard.getBarnyardId());
		barnyard = readQuery.getSingleResult();
		em.merge(barnyard);
		em.remove(barnyard);
		em.flush();

		response.setError(new Error("0", "SUCCESS",
			"proxy.Barnyard.Delete"));
	    }
	} catch (Exception e) {
	    log.severe("Exception found while deleting contact");
	    log.throwing(this.getClass().getName(), "Delete", e);

	    response.setError(new Error("BD2", "Delete exception: "
		    + e.getMessage(), "proxy.Barnyard.Delete"));
	}

	log.exiting(this.getClass().getCanonicalName(), "Delete");
	return response;
    }

}
