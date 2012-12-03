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

import com.tramex.sisoprega.common.BaseResponse;
import com.tramex.sisoprega.common.CreateGatewayResponse;
import com.tramex.sisoprega.common.Error;
import com.tramex.sisoprega.common.GatewayContent;
import com.tramex.sisoprega.common.GatewayRequest;
import com.tramex.sisoprega.common.ReadGatewayResponse;
import com.tramex.sisoprega.common.UpdateGatewayResponse;
import com.tramex.sisoprega.common.crud.Cruddable;
import com.tramex.sisoprega.dto.Barnyard;
import com.tramex.sisoprega.dto.MeasurementUnitEquivalence;

/**
 * @author Jaime Figueroa
 *
 */
@Stateless
public class MeasurementUnitEquivalenceBean extends BaseBean implements Cruddable {

    /* (non-Javadoc)
     * @see com.tramex.sisoprega.common.crud.Cruddable#Create(com.tramex.sisoprega.common.GatewayRequest)
     */
    @Override
    public CreateGatewayResponse Create(GatewayRequest request) {
	log.entering(this.getClass().getCanonicalName(), "Create");

	CreateGatewayResponse response = new CreateGatewayResponse();
	MeasurementUnitEquivalence MeasurUnEqui = null;
	try {
	    MeasurUnEqui = entityFromRequest(request, MeasurementUnitEquivalence.class);

	    log.fine("Received MeasurementUnitEquivalence in request: " + MeasurUnEqui);

	    if (validateEntity(MeasurUnEqui)) {
		log.finer("MeasurementUnitEquivalence succesfully validated");
		em.persist(MeasurUnEqui);
		log.finer("MeasurementUnitEquivalence persisted on database");
		em.flush();

		String sId = String.valueOf(MeasurUnEqui.getEquivalenceId());
		log.finer("Setting MeasurementUnitEquivalence id in response: " + sId);
		response.setGeneratedId(sId);
		response.setError(new Error("0", "SUCCESS",
			"proxy.MeasurementUnitEquivalenceBean.Create"));
	    } else {
		log.warning("Validation error: " + error_description);
		response.setError(new Error("MUEC1", "Validation error: "
			+ error_description, "proxy.MeasurementUnitEquivalenceBean.Create"));
	    }

	} catch (Exception e) {
	    log.severe("Exception found while creating MeasurementUnitEquivalenceBean");
	    log.throwing(this.getClass().getName(), "Create", e);

	    response.setError(new Error("MUEC2", "Create exception: "
		    + e.getMessage(), "proxy.MeasurementUnitEquivalenceBean.Create"));
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

    /* (non-Javadoc)
     * @see com.tramex.sisoprega.common.crud.Cruddable#Delete(com.tramex.sisoprega.common.GatewayRequest)
     */
    @Override
    public BaseResponse Delete(GatewayRequest request) {
	// TODO Auto-generated method stub
	return null;
    }

}
