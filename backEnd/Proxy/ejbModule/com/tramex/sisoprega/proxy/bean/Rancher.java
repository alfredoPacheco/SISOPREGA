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

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.apache.log4j.Logger;

import com.tramex.sisoprega.common.CreateGatewayResponse;
import com.tramex.sisoprega.common.Exception;
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
	private Logger log = Logger.getLogger(Rancher.class);
	
	@PersistenceContext
	private EntityManager em;
	
	private String error_description;

	@Override
	public CreateGatewayResponse Create(GatewayRequest request) {
		log.info("BEGIN|proxy.Rancher.Create|RequestId:["+request.getRequestId()+"]");
		
		CreateGatewayResponse response = new CreateGatewayResponse();
		com.tramex.sisoprega.dto.Rancher rancher = null;
		try {
			rancher = rancherFromRequest(request);
			
			log.debug("Received rancher in request:{" + rancher.toString() + "}");
			
			if (validateRancher(rancher)) {
				log.debug("Rancher succesfully validated");
				em.persist(rancher);
				log.debug("Rancher persisted on database");
				em.flush();
				
				String sId = String.valueOf(rancher.getRancherId());
				log.debug("Setting rancher id in response [" + sId + "]");
				response.setGeneratedId(sId);
				response.setException(new Exception("0", "Success", "proxy.Rancher.Create"));
				log.debug("built successfull response");
			} else {
				log.error("Built validation exception response with no persistence of rancher.");
				response.setException(new Exception("R001",
						"Validation Exception:[" + error_description + "]",
						"proxy.Rancher.Create"));
			}
		} catch (java.lang.Exception e) {
			log.error("Exception found while creating rancher", e);
			response.setException(new Exception("R002",
					"Validation Exception:[" + error_description + "]",
					"proxy.Rancher.Create"));
		}

		log.info("END|proxy.Rancher.Create|RequestId:["+request.getRequestId()+"]");
		return response;
	}

	@Override
	public ReadGatewayResponse Read(GatewayRequest request) {
		// TODO Query the persistence with the requested filter.
		ReadGatewayResponse response = new ReadGatewayResponse();
		response.setException(new Exception("R999",
				"Unimplemented functionality", "proxy.Rancher.Read"));
		return response;
	}

	@Override
	public UpdateGatewayResponse Update(GatewayRequest request) {
		UpdateGatewayResponse response = new UpdateGatewayResponse();
		com.tramex.sisoprega.dto.Rancher rancher = null;
		try {
			rancher = rancherFromRequest(request);
			if (validateRancher(rancher)) {
				// TODO: Persist rancher object
			} else {
				response.setException(new Exception("R001",
						"Validation Exception:[" + error_description + "]",
						"proxy.Rancher.Create"));
			}
		} catch (java.lang.Exception e) {
			response.setException(new Exception("R002",
					"Validation Exception:[" + error_description + "]",
					"proxy.Rancher.Create"));
		}

		return response;
	}

	@Override
	public Exception Delete(GatewayRequest request) {
		// TODO Auto-generated method stub
		return new Exception("R999", "Unimplemented functionality",
				"proxy.Rancher.Delete");
	}

	private boolean validateRancher(com.tramex.sisoprega.dto.Rancher rancher) {
		boolean result = true;
		
		if(rancher==null){
			result = false;
		}
		
		return result;
	}

	private com.tramex.sisoprega.dto.Rancher rancherFromRequest(
			GatewayRequest request) throws IllegalArgumentException,
			IllegalAccessException, ParseException {
		// Create rancher from request
		com.tramex.sisoprega.dto.Rancher rancher = new com.tramex.sisoprega.dto.Rancher();

		// Use reflection to retrieve values from request
		Class<com.tramex.sisoprega.dto.Rancher> cls = com.tramex.sisoprega.dto.Rancher.class;
		Field[] clsField = cls.getDeclaredFields();
		for (Field field : clsField) {
			field.setAccessible(true);
			String fieldName = field.getName();
			if (field.getType() == String.class) {
				field.set(rancher, Utils.valueFromRequest(request, fieldName));
			} else {
				Object val = Utils.valueFromRequest(request, fieldName,
						field.getType());
				field.set(rancher, val);
			}
		}
		
		return new com.tramex.sisoprega.dto.Rancher();
	}

}
