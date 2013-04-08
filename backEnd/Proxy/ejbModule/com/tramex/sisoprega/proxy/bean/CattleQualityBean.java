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

import com.tramex.sisoprega.common.BaseResponse;
import com.tramex.sisoprega.common.CreateGatewayResponse;
import com.tramex.sisoprega.common.Error;
import com.tramex.sisoprega.common.GatewayContent;
import com.tramex.sisoprega.common.GatewayRequest;
import com.tramex.sisoprega.common.ReadGatewayResponse;
import com.tramex.sisoprega.common.UpdateGatewayResponse;
import com.tramex.sisoprega.common.crud.Cruddable;
import com.tramex.sisoprega.dto.CattleClass;
import com.tramex.sisoprega.dto.CattleQuality;

/**
 * This proxy knows the logic to evaluate Cattle quality entities information and
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
 * 04/07/2012  Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 */
public class CattleQualityBean extends BaseBean implements Cruddable {

  /* (non-Javadoc)
   * @see com.tramex.sisoprega.common.crud.Cruddable#Create(com.tramex.sisoprega.common.GatewayRequest)
   */
  @Override
  public CreateGatewayResponse Create(GatewayRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "CreateGatewayResponse Create(GatewayRequest request)");

    CreateGatewayResponse response = new CreateGatewayResponse();
    CattleQuality cattle = null;
    try {
      cattle = entityFromRequest(request, CattleQuality.class);

      this.log.fine("Received cattle quality in request: " + cattle);

      if (validateEntity(cattle)) {
        this.log.finer("Cattle quality succesfully validated");
        
        dataModel.createDataModel(cattle);

        String sId = String.valueOf(cattle.getQualityId());
        this.log.finer("Setting cattle quality id in response: " + sId);
        response.setGeneratedId(sId);
        response.setError(new Error("0", "SUCCESS", "proxy.CattleQualityBean.Create"));
        this.log.info("Cattle Quality [" + cattle.toString() + "] created by principal[" + getLoggedUser() + "]");
      } else {
        this.log.warning("Error de validación: " + error_description);
        response.setError(new Error("VAL01", "Error de validación: " + error_description, "proxy.CattleQualityBean.Create"));
      }
    } catch (Exception e) {
      this.log.severe("Exception found while creating cattle quality");
      this.log.throwing(this.getClass().getName(), "CreateGatewayResponse Create(GatewayRequest request)", e);

      if (e instanceof javax.persistence.PersistenceException)
        response
            .setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, "
                + "muy probablemente la clase de ganado que usted quiere agregar ya existe en la base de datos.",
                "proxy.CattleClassBean.Create"));
      else {
        response.setError(new Error("DB02", "Create exception: " + e.getMessage(), "proxy.CattleQualityBean.Create"));
      }
    }

    this.log.exiting(this.getClass().getCanonicalName(), "CreateGatewayResponse Create(GatewayRequest request)");
    return response;
  }

  /* (non-Javadoc)
   * @see com.tramex.sisoprega.common.crud.Cruddable#Read(com.tramex.sisoprega.common.GatewayRequest)
   */
  @Override
  public ReadGatewayResponse Read(GatewayRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "ReadGatewayResponse Read(GatewayRequest request)");

    ReadGatewayResponse response = new ReadGatewayResponse();
    response.setEntityName(request.getEntityName());

    CattleQuality cattle = null;
    try {
      cattle = entityFromRequest(request, CattleQuality.class);

      this.log.fine("Got cattle quality from request: " + cattle);
      String qryLogger = "";
      String queryName = "";
      Map<String, Object> parameters = new HashMap<String, Object>();
      if (cattle.getQualityId() != 0) {
        queryName="CATTLE_QUALITY_BY_ID";
        parameters.put("qualityId", cattle.getQualityId());
        qryLogger = "By qualityId[" + cattle.getQualityId() + "]";
      } else {
        queryName="ALL_CATTLE_QUALITY";
        qryLogger = "By ALL_CATTLE_QUALITY";
      }

      List<CattleQuality> queryResults = dataModel.readDataModelList(queryName, parameters, CattleQuality.class);

      if (queryResults.isEmpty()) {
        response.setError(new Error("VAL02", "No se encontraron datos para el filtro seleccionado", "proxy.CattleQualityBean.Read"));
      } else {
        List<GatewayContent> records = contentFromList(queryResults, CattleQuality.class);
        response.getRecord().addAll(records);
        
        response.setError(new Error("0", "SUCCESS", "proxy.CattleQualityBean.Read"));
        this.log.info("Read operation " + qryLogger + " executed by principal[" + getLoggedUser() + "] on CattleQualityBean");
      }

    } catch (Exception e) {
      this.log.severe("Exception found while reading Cattle Quality Class");
      this.log.throwing(this.getClass().getCanonicalName(), "ReadGatewayResponse Read(GatewayRequest request)", e);

      response.setError(new Error("DB02", "Read exception: " + e.getMessage(), "proxy.CattleQualityClass.Read"));
    }

    this.log.exiting(this.getClass().getCanonicalName(), "ReadGatewayResponse Read(GatewayRequest request)");
    return response;
  }

  /* (non-Javadoc)
   * @see com.tramex.sisoprega.common.crud.Cruddable#Update(com.tramex.sisoprega.common.GatewayRequest)
   */
  @Override
  public UpdateGatewayResponse Update(GatewayRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "ReadGatewayResponse Read(GatewayRequest request)");
    UpdateGatewayResponse response = new UpdateGatewayResponse();
    CattleQuality cattle = null;
    try {
      cattle = entityFromRequest(request, CattleQuality.class);

      if (cattle.getQualityId() == 0) {
        this.log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id de la clase de ganado al intentar actualizar sus datos.", "proxy.CattleQualityBean.Update"));
      } else {
        if (validateEntity(cattle)) {
          dataModel.updateDataModel(cattle);

          GatewayContent content = getContentFromEntity(cattle, CattleClass.class);
          response.setUpdatedRecord(content);

          response.setError(new Error("0", "SUCCESS", "proxy.CattleQuality.Update"));
          this.log.info("CattleQuality [" + cattle.toString() + "] updated by principal[" + getLoggedUser() + "]");
        } else {
          this.log.warning("Validation error: " + error_description);
          response.setError(new Error("VAL01", "Error de validación de datos:" + error_description, "proxy.CattleQuality.Update"));
        }
      }

    } catch (Exception e) {
      this.log.severe("Exception found while updating CattleQuality");
      this.log.throwing(this.getClass().getName(), "ReadGatewayResponse Read(GatewayRequest request)", e);

      if (e instanceof javax.persistence.PersistenceException)
        response
            .setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, "
                + "muy probablemente la clase de ganado que usted quiere agregar ya existe en la base de datos.",
                "proxy.CattleQuality.Update"));
      else {
        response.setError(new Error("DB02", "Error en la base de datos:[" + e.getMessage() + "]", "proxy.CattleQualityBean.Update"));
      }
    }

    this.log.exiting(this.getClass().getCanonicalName(), "ReadGatewayResponse Read(GatewayRequest request)");
    return response;
  }

  /* (non-Javadoc)
   * @see com.tramex.sisoprega.common.crud.Cruddable#Delete(com.tramex.sisoprega.common.GatewayRequest)
   */
  @Override
  public BaseResponse Delete(GatewayRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "BaseResponse Delete(GatewayRequest request)");
    BaseResponse response = new BaseResponse();

    try {
      CattleQuality cattle = entityFromRequest(request, CattleQuality.class);
      if (cattle.getQualityId() == 0) {
        this.log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id de la clase de ganado al intentar eliminar el registro.", "proxy.CattleQualityBean.Delete"));
      } else {
        cattle = dataModel.readSingleDataModel("CATTLE_QUALITY_BY_ID", "catclassId", cattle.getQualityId(), CattleQuality.class);
        this.log.info("Deleting CattleQuality [" + cattle.toString() + "] by principal[" + getLoggedUser() + "]");
        
        dataModel.deleteDataModel(cattle, getLoggedUser());

        response.setError(new Error("0", "SUCCESS", "proxy.CattleQualityBean.Delete"));
        this.log.info("CattleQuality successfully deleted by principal [" + getLoggedUser() + "]");
      }
    } catch (Exception e) {
      this.log.severe("Exception found while deleting cattle class");
      this.log.throwing(this.getClass().getName(), "Delete", e);

      response.setError(new Error("DEL01",
          "Error al intentar borrar datos, es probable que esta entidad tenga otras entidades relacionadas, "
              + "por ejemplo, una clase de ganado que cuenta con registros de capacidad de corrales no puede ser eliminado sin antes eliminar tal relación.",
          "proxy.CattleQualityBean.Delete"));
    }

    this.log.exiting(this.getClass().getCanonicalName(), "Delete");
    return response;
  }

}
