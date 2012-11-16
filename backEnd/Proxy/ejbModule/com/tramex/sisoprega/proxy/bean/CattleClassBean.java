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
import com.tramex.sisoprega.common.GatewayRequest;
import com.tramex.sisoprega.common.ReadGatewayResponse;
import com.tramex.sisoprega.common.UpdateGatewayResponse;
import com.tramex.sisoprega.common.crud.Cruddable;
import com.tramex.sisoprega.dto.CattleClass;

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
 * 11/15/2012  Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 */
@Stateless
public class CattleClassBean extends BaseBean implements Cruddable {

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
	CattleClass cattle = null;
	try {
	    cattle = entityFromRequest(request, CattleClass.class);

	    log.fine("Received cattle class in request: " + cattle);

	    if (validateEntity(cattle)) {
		log.finer("Cattle class succesfully validated");
		em.persist(cattle);
		log.finer("Cattle class persisted on database");
		em.flush();

		String sId = String.valueOf(cattle.getCatclassId());
		log.finer("Setting cattle class id in response: " + sId);
		response.setGeneratedId(sId);
		response.setError(new Error("0", "SUCCESS",
			"proxy.CattleClassBean.Create"));
	    } else {
		log.warning("Validation error: " + error_description);
		response.setError(new Error("CCC1", "Validation error: "
			+ error_description, "proxy.CattleClassBean.Create"));
	    }

	} catch (Exception e) {
	    log.severe("Exception found while creating cattle class");
	    log.throwing(this.getClass().getName(), "Create", e);

	    response.setError(new Error("CCC2", "Create exception: "
		    + e.getMessage(), "proxy.CattleClassBean.Create"));
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
	// TODO Auto-generated method stub
	return null;
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
	// TODO Auto-generated method stub
	return null;
    }

}
