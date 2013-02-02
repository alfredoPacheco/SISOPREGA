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

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ejb.Stateless;

import com.tramex.sisoprega.common.BaseResponse;
import com.tramex.sisoprega.common.CreateGatewayResponse;
import com.tramex.sisoprega.common.Error;
import com.tramex.sisoprega.common.GatewayContent;
import com.tramex.sisoprega.common.GatewayRequest;
import com.tramex.sisoprega.common.ReadGatewayResponse;
import com.tramex.sisoprega.common.UpdateGatewayResponse;
import com.tramex.sisoprega.common.crud.Cruddable;
import com.tramex.sisoprega.dto.Reception;

/**
 * This proxy knows the logic to evaluate Reception information and the
 * way to the database in order to save their data. Also, it is contained in EJB
 * container, we can apply security and life cycle methods for resources.<BR/>
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 12/07/2012  Jaime Figueroa                Initial Version.
 * 12/13/2012  Diego Torres                  Enable read operation      
 * 12/16/2012  Diego Torres                  Adding log activity
 * 01/22/2013  Diego Torres                  Apply data model interfacing.                               
 * ====================================================================================
 * </PRE>
 * @author Jaime Figueroa
 * 
 */
@Stateless
public class ReceptionBean extends BaseBean implements Cruddable {
  
  /*
   * (non-Javadoc)
   * 
   * @see
   * com.tramex.sisoprega.common.crud.Cruddable#Create(com.tramex.sisoprega.
   * common.GatewayRequest)
   */
  @Override
  public CreateGatewayResponse Create(GatewayRequest request) {
    log.entering(this.getClass().getCanonicalName(), "Create");

    CreateGatewayResponse response = new CreateGatewayResponse();
    Reception reception = null;
    try {
      reception = entityFromRequest(request, Reception.class);

      log.fine("Received Reception in request: " + reception);

      if (validateEntity(reception)) {
        this.log.finer("Reception succesfully validated");
        dataModel.createDataModel(reception);
        
        String sId = String.valueOf(reception.getReceptionId());
        log.finer("Setting Reception id in response: " + sId);
        response.setGeneratedId(sId);
        response.setError(new Error("0", "SUCCESS", "proxy.Reception.Create"));
        log.info("Reception [" + reception.toString() + "] created by principal[" + getLoggedUser() + "]");
      } else {
        log.warning("Validation error: " + error_description);
        response.setError(new Error("VAL01", "Validation error: " + error_description, "proxy.Reception.Create"));
      }

    } catch (Exception e) {
      log.severe("Exception found while creating ReceptionBean");
      log.throwing(this.getClass().getName(), "Create", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01",
            "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, ", "proxy.ReceptionBean.Create"));
      else {
        response.setError(new Error("DB02", "Create exception: " + e.getMessage(), "proxy.ReceptionBean.Create"));
      }
    }

    log.exiting(this.getClass().getCanonicalName(), "Create");
    return response;
  }

  /*
   * (non-Javadoc)
   * 
   * @see
   * com.tramex.sisoprega.common.crud.Cruddable#Read(com.tramex.sisoprega.common
   * .GatewayRequest)
   */
  @Override
  public ReadGatewayResponse Read(GatewayRequest request) {
    log.entering(this.getClass().getCanonicalName(), "Read");

    ReadGatewayResponse response = new ReadGatewayResponse();
    response.setEntityName(request.getEntityName());

    Reception reception = null;
    try {
      reception = entityFromRequest(request, Reception.class);
      log.fine("Got reception from request: " + reception);

      String qryLogger = "";
      Map<String, Object> parameters = new HashMap<String, Object>();
      String queryName = "";
      
      if (reception.getReceptionId() != 0) {
        queryName = "CRT_RECEPTION_BY_ID";
        parameters.put("receptionId", reception.getReceptionId());
        qryLogger = "By receptionId [" + reception.getReceptionId() + "]";
      }else if (reception.getRancherId() != 0){
          queryName = "RECEPTIONS_BY_RANCHER_ID";
          parameters.put("rancherID", reception.getRancherId());
          qryLogger = "By rancherID [" + reception.getRancherId() + "]";    	  
      }else {
        queryName = "ALL_RECEPTIONS";
        qryLogger = "By ALL_RECEPTIONS";
      }

      List<Reception> queryResults = dataModel.readDataModelList(queryName, parameters, Reception.class);

      if (queryResults.isEmpty()) {
        response.setError(new Error("VAL02", "No se encontraron datos para el filtro seleccionado", "proxy.Reception.Read"));
      } else {
        response.getRecord().addAll(contentFromList(queryResults, Reception.class));

        response.setError(new Error("0", "SUCCESS", "proxy.Reception.Read"));
        log.info("Read operation " + qryLogger + " executed by principal[" + getLoggedUser() + "] on ReceptionBean");
      }
    } catch (Exception e) {
      log.severe("Exception found while reading rancher invoice filter");
      log.throwing(this.getClass().getCanonicalName(), "Read", e);

      response.setError(new Error("DB02", "Error en la base de datos: " + e.getMessage(), "proxy.Reception.Read"));
    }

    log.exiting(this.getClass().getCanonicalName(), "Read");
    return response;
  }

  /*
   * (non-Javadoc)
   * 
   * @see
   * com.tramex.sisoprega.common.crud.Cruddable#Update(com.tramex.sisoprega.
   * common.GatewayRequest)
   */
  @Override
  public UpdateGatewayResponse Update(GatewayRequest request) {
    log.entering(this.getClass().getCanonicalName(), "Update");
    UpdateGatewayResponse response = new UpdateGatewayResponse();
    Reception reception = null;
    try {
      reception = entityFromRequest(request, Reception.class);

      if (reception.getReceptionId() == 0) {
        log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id de Recepción al intentar actualizar sus datos.",
            "proxy.Reception.Update"));
      } else {
        if (validateEntity(reception)) {
          dataModel.updateDataModel(reception);

          GatewayContent content = getContentFromEntity(reception, Reception.class);
          response.setUpdatedRecord(content);

          response.setError(new Error("0", "SUCCESS", "proxy.Reception.Update"));
          log.info("Reception [" + reception.toString() + "] updated by principal[" + getLoggedUser() + "]");
        } else {
          log.warning("Validation error:" + error_description);
          response.setError(new Error("VAL01", "Error de validación de datos:" + error_description, "proxy.ReceptionBean.Update"));
        }
      }

    } catch (Exception e) {
      log.severe("Exception found while updating Reception");
      log.throwing(this.getClass().getName(), "Update", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, ",
            "proxy.ReceptionBean.Update"));
      else {
        response.setError(new Error("DB02", "Error en la base de datos:[" + e.getMessage() + "]", "proxy.ReceptionBean.Update"));
      }
    }

    log.exiting(this.getClass().getCanonicalName(), "Update");
    return response;
  }

  /*
   * (non-Javadoc)
   * 
   * @see
   * com.tramex.sisoprega.common.crud.Cruddable#Delete(com.tramex.sisoprega.
   * common.GatewayRequest)
   */
  @Override
  public BaseResponse Delete(GatewayRequest request) {
    log.entering(this.getClass().getCanonicalName(), "Delete");
    BaseResponse response = new BaseResponse();

    try {
      Reception reception = entityFromRequest(request, Reception.class);
      if (reception.getReceptionId() == 0) {
        log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id del corral al intentar eliminar el registro.", "proxy.Reception.Delete"));
      } else {
        reception = dataModel.readSingleDataModel("CRT_RECEPTION_BY_ID", "receptionId", reception.getReceptionId(), Reception.class);
        dataModel.deleteDataModel(reception, getLoggedUser());
        
        response.setError(new Error("0", "SUCCESS", "proxy.Reception.Delete"));
        log.info("Reception successfully deleted by principal [" + getLoggedUser() + "]");
      }
    } catch (Exception e) {
      log.severe("Exception found while deleting reception");
      log.throwing(this.getClass().getName(), "Delete", e);

      response.setError(new Error("DEL01",
          "Error al intentar borrar datos, es probable que esta entidad tenga otras entidades relacionadas, ",
          "proxy.Reception.Delete"));
    }

    log.exiting(this.getClass().getCanonicalName(), "Delete");
    return response;
  }

}
