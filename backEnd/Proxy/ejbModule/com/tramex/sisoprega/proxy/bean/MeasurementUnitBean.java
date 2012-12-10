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
import com.tramex.sisoprega.dto.MeasurementUnit;

/**
 * @author Jaime Figueroa
 *
 */
@Stateless
public class MeasurementUnitBean extends BaseBean implements Cruddable {

    /* (non-Javadoc)
     * @see com.tramex.sisoprega.common.crud.Cruddable#Create(com.tramex.sisoprega.common.GatewayRequest)
     */
    @Override
    public CreateGatewayResponse Create(GatewayRequest request) {
	log.entering(this.getClass().getCanonicalName(), "Create");

	CreateGatewayResponse response = new CreateGatewayResponse();
	MeasurementUnit MeasurUni = null;
	try {
	    MeasurUni = entityFromRequest(request, MeasurementUnit.class);

	    log.fine("Received MeasurementUnit in request: " + MeasurUni);

	    if (validateEntity(MeasurUni)) {
		log.finer("MeasurementUnit succesfully validated");
		em.persist(MeasurUni);
		log.finer("MeasurementUnit persisted on database");
		em.flush();

		String sId = String.valueOf(MeasurUni.getUnitId());
		log.finer("Setting MeasurementUnit id in response: " + sId);
		response.setGeneratedId(sId);
		response.setError(new Error("0", "SUCCESS",
			"proxy.MeasurementUnitdBean.Create"));
	    } else {
		log.warning("Validation error: " + error_description);
		response.setError(new Error("MUC1", "Validation error: "
			+ error_description, "proxy.MeasurementUnitBean.Create"));
	    }

	} catch (Exception e) {
	    log.severe("Exception found while creating MeasurementUnitBean");
	    log.throwing(this.getClass().getName(), "Create", e);

	    response.setError(new Error("MUC2", "Create exception: "
		    + e.getMessage(), "proxy.MeasurementUnitBean.Create"));
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
	MeasurementUnit MeasurUni = null;
	try {
	    MeasurUni = entityFromRequest(request, MeasurementUnit.class);

	    if (MeasurUni.getUnitId() == 0) {
		log.warning("MUU1 - Invalid MeasurementUnit id");
		response.setError(new Error("MUU1", "Invalid MeasurementUnit id",
			"proxy.MeasurementUnit.Update"));
	    } else {
		if (validateEntity(MeasurUni)) {
		    em.merge(MeasurUni);
		    em.flush();

		    GatewayContent content = getContentFromEntity(MeasurUni,
			    MeasurementUnit.class);
		    response.setUpdatedRecord(content);

		    response.setError(new Error("0", "SUCCESS",
			    "proxy.MeasurementUnit.Update"));
		} else {
		    log.warning("Validation error: " + error_description);
		    response.setError(new Error("MUU2", "Validation error: "
			    + error_description, "proxy.MeasurementUnit.Update"));
		}
	    }

	} catch (Exception e) {
	    log.severe("Exception found while updating MeasurementUnit");
	    log.throwing(this.getClass().getName(), "Update", e);

	    response.setError(new Error("MUU3", "Update exception "
		    + e.getMessage(), "proxy.MeasurementUnit.Update"));
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
	    MeasurementUnit MeasurUni = entityFromRequest(request, MeasurementUnit.class);
	    if (MeasurUni.getUnitId() == 0) {
		log.warning("MUD1 - Invalid MeasurementUnit");
		response.setError(new Error("MUD1", "Invalid unitId",
			"proxy.MeasurementUnit.Delete"));
	    } else {
		TypedQuery<MeasurementUnit> readQuery = em.createNamedQuery(
			"CAT_MEASUREMENTUNIT_BY_ID", MeasurementUnit.class);
		readQuery.setParameter("unitId", MeasurUni.getUnitId());
		MeasurUni = readQuery.getSingleResult();
		em.merge(MeasurUni);
		em.remove(MeasurUni);
		em.flush();

		response.setError(new Error("0", "SUCCESS",
			"proxy.MeasurementUnit.Delete"));
	    }
	} catch (Exception e) {
	    log.severe("Exception found while deleting contact");
	    log.throwing(this.getClass().getName(), "Delete", e);

	    response.setError(new Error("MUD2", "Delete exception: "
		    + e.getMessage(), "proxy.MeasurementUnit.Delete"));
	}

	log.exiting(this.getClass().getCanonicalName(), "Delete");
	return response;
    }

}
