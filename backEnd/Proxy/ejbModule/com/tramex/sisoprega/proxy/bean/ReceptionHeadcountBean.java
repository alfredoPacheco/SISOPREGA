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
import com.tramex.sisoprega.dto.ReceptionHeadcount;

/**
 * * This proxy knows the logic to evaluate Reception Head Count information and
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
 * 12/07/2012   Jaime Figueroa               Initial Version.
 * 12/16/2012   Diego Torres                 Adding log activity
 * 01/22/2013  Diego Torres                  Implementing DataModel.
 * ====================================================================================
 * </PRE>
 * 
 * @author Jaime Figueroa
 * 
 */
@Stateless
public class ReceptionHeadcountBean extends BaseBean implements Cruddable {

  /*
   * (non-Javadoc)
   * 
   * @see
   * com.tramex.sisoprega.common.crud.Cruddable#Create(com.tramex.sisoprega.
   * common.GatewayRequest)
   */
  @Override
  public CreateGatewayResponse Create(GatewayRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "Create");

    CreateGatewayResponse response = new CreateGatewayResponse();
    ReceptionHeadcount headCount = null;
    try {
      headCount = entityFromRequest(request, ReceptionHeadcount.class);

      this.log.fine("Received ReceptionHeadcount in request: " + headCount);

      if (validateEntity(headCount)) {
        this.log.finer("ReceptionHeadcount succesfully validated");
        dataModel.createDataModel(headCount);

        String sId = String.valueOf(headCount.getReceptionHeadcountId());
        this.log.finer("Setting ReceptionHeadcount id in response: " + sId);
        response.setGeneratedId(sId);
        response.setError(new Error("0", "SUCCESS", "proxy.ReceptionHeadcountBean.Create"));
        this.log.info("Reception Headcount [" + headCount.toString() + "] created by principal[" + getLoggedUser() + "]");
      } else {
        this.log.warning("Error de validación: " + error_description);
        response.setError(new Error("VAL01", "Error de validación: " + error_description, "proxy.ReceptionHeadcountBean.Create"));
      }

    } catch (Exception e) {
      this.log.severe("Exception found while creating ReceptionHeadcountBean");
      this.log.throwing(this.getClass().getName(), "Create", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01",
            "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, ",
            "proxy.ReceptionHeadcountBean.Create"));
      else {
        response.setError(new Error("DB02", "Create exception: " + e.getMessage(), "proxy.ReceptionHeadcountBean.Create"));
      }
    }

    this.log.exiting(this.getClass().getCanonicalName(), "Create");
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
    this.log.entering(this.getClass().getCanonicalName(), "Read");

    ReadGatewayResponse response = new ReadGatewayResponse();
    response.setEntityName(request.getEntityName());

    ReceptionHeadcount recHc = null;
    try {
      recHc = entityFromRequest(request, ReceptionHeadcount.class);

      this.log.fine("Got headcount query from request: " + recHc);

      String qryLogger = "";
      String queryName = "";
      Map<String, Object> parameters = new HashMap<String, Object>();
      if (recHc.getReceptionHeadcountId() != 0) {
        queryName = "CRT_RECEPTIONHEADCOUNT_BY_ID";
        parameters.put("headcountId", recHc.getReceptionHeadcountId());
        qryLogger = "By headcountId [" + recHc.getReceptionHeadcountId() + "]";
      } else if(recHc.getReceptionId() != 0 ){
        queryName = "RECEPTION_HEADCOUNT_BY_RECEPTION_ID";
        parameters.put("receptionId", recHc.getReceptionId());
        qryLogger = "By receptionId [" + recHc.getReceptionId() + "]";
      } else {
        response.setError(new Error("VAL03", "El filtro especificado no es válido para datos de recepciones de ganado.",
            "proxy.ReceptionHeadcount.Read"));
        return response;
      }

      List<ReceptionHeadcount> queryResults = dataModel.readDataModelList(queryName, parameters, ReceptionHeadcount.class);

      if (queryResults.isEmpty()) {
        response.setError(new Error("VAL02", "No se encontraron datos para el filtro seleccionado", "proxy.ReceptionHeadcount.Read"));
      } else {
        response.getRecord().addAll(contentFromList(queryResults, ReceptionHeadcount.class));

        response.setError(new Error("0", "SUCCESS", "proxy.ReceptionHeadcount.Read"));
        this.log.info("Read operation " + qryLogger + " executed by principal[" + getLoggedUser() + "] on ReceptionHeadcountBean");
      }
    } catch (Exception e) {
      this.log.severe("Exception found while reading rancher invoice filter");
      this.log.throwing(this.getClass().getCanonicalName(), "Read", e);

      response.setError(new Error("DB02", "Error en la base de datos: " + e.getMessage(), "proxy.ReceptionHeadcount.Read"));
    }

    this.log.exiting(this.getClass().getCanonicalName(), "Read");
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
    this.log.entering(this.getClass().getCanonicalName(), "Update");
    UpdateGatewayResponse response = new UpdateGatewayResponse();
    ReceptionHeadcount headCount = null;
    try {
      headCount = entityFromRequest(request, ReceptionHeadcount.class);

      if (headCount.getReceptionHeadcountId() == 0) {
        this.log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id del corral al intentar actualizar sus datos.",
            "proxy.ReceptionHeadcount.Update"));
      } else {
        if (validateEntity(headCount)) {
          dataModel.updateDataModel(headCount);

          GatewayContent content = getContentFromEntity(headCount, ReceptionHeadcount.class);
          response.setUpdatedRecord(content);

          response.setError(new Error("0", "SUCCESS", "proxy.ReceptionHeadcount.Update"));
          this.log.info("Reception Headcount [" + headCount.toString() + "] updated by principal[" + getLoggedUser() + "]");
        } else {
          this.log.warning("Validation error:" + error_description);
          response.setError(new Error("VAL01", "Error de validación de datos:" + error_description, "proxy.ReceptionHeadcountBean.Update"));
        }
      }

    } catch (Exception e) {
      this.log.severe("Exception found while updating ReceptionHeadcount");
      this.log.throwing(this.getClass().getName(), "Update", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, ",
            "proxy.ReceptionHeadcountBean.Update"));
      else {
        response.setError(new Error("DB02", "Error en la base de datos:[" + e.getMessage() + "]", "proxy.ReceptionHeadcountBean.Update"));
      }
    }

    this.log.exiting(this.getClass().getCanonicalName(), "Update");
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
    this.log.entering(this.getClass().getCanonicalName(), "Delete");
    BaseResponse response = new BaseResponse();

    try {
      ReceptionHeadcount headCount = entityFromRequest(request, ReceptionHeadcount.class);
      if (headCount.getReceptionHeadcountId() == 0) {
        this.log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id del corral al intentar eliminar el registro.", "proxy.ReceptionHeadcount.Delete"));
      } else {
        
        headCount = dataModel.readSingleDataModel("CRT_RECEPTIONHEADCOUNT_BY_ID", "headcountId", headCount.getReceptionHeadcountId(), ReceptionHeadcount.class);
        this.log.info("Deleting Reception Headcount [" + headCount.toString() + "] by principal[" + getLoggedUser() + "]");
        dataModel.deleteDataModel(headCount, getLoggedUser());

        response.setError(new Error("0", "SUCCESS", "proxy.ReceptionHeadcount.Delete"));
        this.log.info("Reception Headcount successfully deleted by principal [" + getLoggedUser() + "]");
      }
    } catch (Exception e) {
      this.log.severe("Exception found while deleting ReceptionHeadcount");
      this.log.throwing(this.getClass().getName(), "Delete", e);

      response.setError(new Error("DEL01",
          "Error al intentar borrar datos, es probable que esta entidad tenga otras entidades relacionadas, ",
          "proxy.ReceptionHeadcount.Delete"));
    }

    this.log.exiting(this.getClass().getCanonicalName(), "Delete");
    return response;
  }

}
