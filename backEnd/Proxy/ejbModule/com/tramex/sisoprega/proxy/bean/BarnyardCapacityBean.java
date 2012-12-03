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
import com.tramex.sisoprega.dto.BarnyardCapacity;

/**
 * @author Jaime Figueroa
 *
 */
@Stateless
public class BarnyardCapacityBean extends BaseBean implements Cruddable {

    /* (non-Javadoc)
     * @see com.tramex.sisoprega.common.crud.Cruddable#Create(com.tramex.sisoprega.common.GatewayRequest)
     */
    @Override
    public CreateGatewayResponse Create(GatewayRequest request) {
	log.entering(this.getClass().getCanonicalName(), "Create");

	CreateGatewayResponse response = new CreateGatewayResponse();
	BarnyardCapacity barnyardCa = null;
	try {
	    barnyardCa = entityFromRequest(request, BarnyardCapacity.class);

	    log.fine("Received BarnyardCapacity in request: " + barnyardCa);

	    if (validateEntity(barnyardCa)) {
		log.finer("BarnyardCapacity succesfully validated");
		em.persist(barnyardCa);
		log.finer("BarnyardCapacity persisted on database");
		em.flush();

		String sId = String.valueOf(barnyardCa.getCapacityId());
		log.finer("Setting BarnyardCapacity id in response: " + sId);
		response.setGeneratedId(sId);
		response.setError(new Error("0", "SUCCESS",
			"proxy.BarnyardCapacityBean.Create"));
	    } else {
		log.warning("Validation error: " + error_description);
		response.setError(new Error("BCC1", "Validation error: "
			+ error_description, "proxy.BarnyardCapacityBean.Create"));
	    }

	} catch (Exception e) {
	    log.severe("Exception found while creating BarnyardCapacityBean");
	    log.throwing(this.getClass().getName(), "Create", e);

	    response.setError(new Error("BC2", "Create exception: "
		    + e.getMessage(), "proxy.BarnyardCapacityBean.Create"));
	}

	log.exiting(this.getClass().getCanonicalName(), "Create");
	return response;
    }

    /* (non-Javadoc)
     * @see com.tramex.sisoprega.common.crud.Cruddable#Read(com.tramex.sisoprega.common.GatewayRequest)
     */
    @Override
    public ReadGatewayResponse Read(GatewayRequest request) {
	// TODO Auto-generated method stub
	return null;
    }

    /* (non-Javadoc)
     * @see com.tramex.sisoprega.common.crud.Cruddable#Update(com.tramex.sisoprega.common.GatewayRequest)
     */
    @Override
    public UpdateGatewayResponse Update(GatewayRequest request) {
	log.entering(this.getClass().getCanonicalName(), "Update");
	UpdateGatewayResponse response = new UpdateGatewayResponse();
	BarnyardCapacity barnyardCa = null;
	try {
	    barnyardCa = entityFromRequest(request, BarnyardCapacity.class);

	    if (barnyardCa.getCapacityId() == 0) {
		log.warning("BCU1 - Invalid BarnyardCapacity id");
		response.setError(new Error("BCU1", "Invalid BarnyardCapacity id",
			"proxy.BarnyardCapacity.Update"));
	    } else {
		if (validateEntity(barnyardCa)) {
		    em.merge(barnyardCa);
		    em.flush();

		    GatewayContent content = getContentFromEntity(barnyardCa,
			    BarnyardCapacity.class);
		    response.setUpdatedRecord(content);

		    response.setError(new Error("0", "SUCCESS",
			    "proxy.BarnyardCapacity.Update"));
		} else {
		    log.warning("Validation error: " + error_description);
		    response.setError(new Error("BCU2", "Validation error: "
			    + error_description, "proxy.BarnyardCapacity.Update"));
		}
	    }

	} catch (Exception e) {
	    log.severe("Exception found while updating BarnyardCapacity");
	    log.throwing(this.getClass().getName(), "Update", e);

	    response.setError(new Error("BCU3", "Update exception "
		    + e.getMessage(), "proxy.BarnyardCapacity.Update"));
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
	    BarnyardCapacity barnyardCa = entityFromRequest(request, BarnyardCapacity.class);
	    if (barnyardCa.getCapacityId() == 0) {
		log.warning("BD1 - Invalid Barnyard");
		response.setError(new Error("BD1", "Invalid BarnyardId",
			"proxy.Barnyard.Delete"));
	    } else {
		TypedQuery<BarnyardCapacity> readQuery = em.createNamedQuery(
			"CAT_BARNYARDCAPACITY_BY_ID", BarnyardCapacity.class);
		readQuery.setParameter("capacityId", barnyardCa.getCapacityId());
		barnyardCa = readQuery.getSingleResult();
		em.merge(barnyardCa);
		em.remove(barnyardCa);
		em.flush();

		response.setError(new Error("0", "SUCCESS",
			"proxy.BarnyardCapacity.Delete"));
	    }
	} catch (Exception e) {
	    log.severe("Exception found while deleting contact");
	    log.throwing(this.getClass().getName(), "Delete", e);

	    response.setError(new Error("BD2", "Delete exception: "
		    + e.getMessage(), "proxy.BarnyardCapacity.Delete"));
	}

	log.exiting(this.getClass().getCanonicalName(), "Delete");
	return response;
    }

}
