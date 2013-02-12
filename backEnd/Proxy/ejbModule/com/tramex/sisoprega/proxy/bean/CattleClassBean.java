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
 * 12/05/2012  Diego Torres                 Standard error descriptions.
 * 12/16/2012  Diego Torres                 Adding user log activity.
 * 01/22/2013  Diego Torres                 Implementing data model interfacing.
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
   * @see com.tramex.sisoprega.common.crud.Cruddable#Create(com.tramex.sisoprega
   * .common.GatewayRequest)
   */
  @Override
  public CreateGatewayResponse Create(GatewayRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "Create");

    CreateGatewayResponse response = new CreateGatewayResponse();
    CattleClass cattle = null;
    try {
      cattle = entityFromRequest(request, CattleClass.class);

      this.log.fine("Received cattle class in request: " + cattle);

      if (validateEntity(cattle)) {
        this.log.finer("Cattle class succesfully validated");
        
        dataModel.createDataModel(cattle);

        String sId = String.valueOf(cattle.getCatclassId());
        this.log.finer("Setting cattle class id in response: " + sId);
        response.setGeneratedId(sId);
        response.setError(new Error("0", "SUCCESS", "proxy.CattleClassBean.Create"));
        this.log.info("Cattle class [" + cattle.toString() + "] created by principal[" + getLoggedUser() + "]");
      } else {
        this.log.warning("Error de validación: " + error_description);
        response.setError(new Error("VAL01", "Error de validación: " + error_description, "proxy.CattleClassBean.Create"));
      }
    } catch (Exception e) {
      this.log.severe("Exception found while creating cattle class");
      this.log.throwing(this.getClass().getName(), "Create", e);

      if (e instanceof javax.persistence.PersistenceException)
        response
            .setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, "
                + "muy probablemente la clase de ganado que usted quiere agregar ya existe en la base de datos.",
                "proxy.CattleClassBean.Create"));
      else {
        response.setError(new Error("DB02", "Create exception: " + e.getMessage(), "proxy.CattleClassBean.Create"));
      }
    }

    this.log.exiting(this.getClass().getCanonicalName(), "Create");
    return response;
  }

  /*
   * (non-Javadoc)
   * 
   * @see com.tramex.sisoprega.common.crud.Cruddable#Read(com.tramex.sisoprega.
   * common.GatewayRequest)
   */
  @Override
  public ReadGatewayResponse Read(GatewayRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "Read");

    ReadGatewayResponse response = new ReadGatewayResponse();
    response.setEntityName(request.getEntityName());

    CattleClass cattle = null;
    try {
      cattle = entityFromRequest(request, CattleClass.class);

      this.log.fine("Got cattle class from request: " + cattle);
      String qryLogger = "";
      String queryName = "";
      Map<String, Object> parameters = new HashMap<String, Object>();
      if (cattle.getCatclassId() != 0) {
        queryName="CATTLE_CLASS_BY_ID";
        parameters.put("catclassId", cattle.getCatclassId());
        qryLogger = "By catclassId[" + cattle.getCatclassId() + "]";
      } else {
        queryName="ALL_CATTLE_CLASSES";
        qryLogger = "By ALL_CATTLE_CLASSES";
      }

      List<CattleClass> queryResults = dataModel.readDataModelList(queryName, parameters, CattleClass.class);

      if (queryResults.isEmpty()) {
        response.setError(new Error("VAL02", "No se encontraron datos para el filtro seleccionado", "proxy.CattleClassBean.Read"));
      } else {
        List<GatewayContent> records = contentFromList(queryResults, CattleClass.class);
        response.getRecord().addAll(records);
        
        response.setError(new Error("0", "SUCCESS", "proxy.CattleClass.Read"));
        this.log.info("Read operation " + qryLogger + " executed by principal[" + getLoggedUser() + "] on CattleClassBean");
      }

    } catch (Exception e) {
      this.log.severe("Exception found while reading Cattle Class");
      this.log.throwing(this.getClass().getCanonicalName(), "Read", e);

      response.setError(new Error("DB02", "Read exception: " + e.getMessage(), "proxy.CattleClass.Read"));
    }

    this.log.exiting(this.getClass().getCanonicalName(), "Read");
    return response;
  }

  /*
   * (non-Javadoc)
   * 
   * @see com.tramex.sisoprega.common.crud.Cruddable#Update(com.tramex.sisoprega
   * .common.GatewayRequest)
   */
  @Override
  public UpdateGatewayResponse Update(GatewayRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "Update");
    UpdateGatewayResponse response = new UpdateGatewayResponse();
    CattleClass cattle = null;
    try {
      cattle = entityFromRequest(request, CattleClass.class);

      if (cattle.getCatclassId() == 0) {
        this.log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id de la clase de ganado al intentar actualizar sus datos.", "proxy.CattleClassBean.Update"));
      } else {
        if (validateEntity(cattle)) {
          dataModel.updateDataModel(cattle);

          GatewayContent content = getContentFromEntity(cattle, CattleClass.class);
          response.setUpdatedRecord(content);

          response.setError(new Error("0", "SUCCESS", "proxy.CattleClass.Update"));
          this.log.info("CattleClass[" + cattle.toString() + "] updated by principal[" + getLoggedUser() + "]");
        } else {
          this.log.warning("Validation error: " + error_description);
          response.setError(new Error("VAL01", "Error de validación de datos:" + error_description, "proxy.CattleClass.Update"));
        }
      }

    } catch (Exception e) {
      this.log.severe("Exception found while updating CattleClass");
      this.log.throwing(this.getClass().getName(), "Update", e);

      if (e instanceof javax.persistence.PersistenceException)
        response
            .setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, "
                + "muy probablemente la clase de ganado que usted quiere agregar ya existe en la base de datos.",
                "proxy.CattleClass.Update"));
      else {
        response.setError(new Error("DB02", "Error en la base de datos:[" + e.getMessage() + "]", "proxy.CattleClassBean.Update"));
      }
    }

    this.log.exiting(this.getClass().getCanonicalName(), "Update");
    return response;
  }

  /*
   * (non-Javadoc)
   * 
   * @see com.tramex.sisoprega.common.crud.Cruddable#Delete(com.tramex.sisoprega
   * .common.GatewayRequest)
   */
  @Override
  public BaseResponse Delete(GatewayRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "Delete");
    BaseResponse response = new BaseResponse();

    try {
      CattleClass cattle = entityFromRequest(request, CattleClass.class);
      if (cattle.getCatclassId() == 0) {
        this.log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id de la clase de ganado al intentar eliminar el registro.", "proxy.CattleClassBean.Delete"));
      } else {
        cattle = dataModel.readSingleDataModel("CATTLE_CLASS_BY_ID", "catclassId", cattle.getCatclassId(), CattleClass.class);
        this.log.info("Deleting CattleClass[" + cattle.toString() + "] by principal[" + getLoggedUser() + "]");
        
        dataModel.deleteDataModel(cattle, getLoggedUser());

        response.setError(new Error("0", "SUCCESS", "proxy.CattleClass.Delete"));
        this.log.info("CattleClass successfully deleted by principal [" + getLoggedUser() + "]");
      }
    } catch (Exception e) {
      this.log.severe("Exception found while deleting cattle class");
      this.log.throwing(this.getClass().getName(), "Delete", e);

      response.setError(new Error("DEL01",
          "Error al intentar borrar datos, es probable que esta entidad tenga otras entidades relacionadas, "
              + "por ejemplo, una clase de ganado que cuenta con registros de capacidad de corrales no puede ser eliminado sin antes eliminar tal relación.",
          "proxy.CattleClassBean.Delete"));
    }

    this.log.exiting(this.getClass().getCanonicalName(), "Delete");
    return response;
  }
}
