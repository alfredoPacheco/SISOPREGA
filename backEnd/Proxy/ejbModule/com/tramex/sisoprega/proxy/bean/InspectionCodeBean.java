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
import com.tramex.sisoprega.dto.InspectionCode;

/**
 * This proxy knows the logic to evaluate Inspection Code information and the
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
 * 12/09/2012  Jaime Figueroa                Initial Version.
 * 12/13/2012  Diego Torres                  Enable read operation.
 * 12/16/2012  Diego Torres                  Adding log activity
 * 01/22/2013  Diego Torres                  Implementing DataModel.
 * ====================================================================================
 * </PRE>
 * 
 * @author Jaime Figueroa
 * 
 */
@Stateless
public class InspectionCodeBean extends BaseBean implements Cruddable {

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
    InspectionCode inspCode = null;
    try {
      inspCode = entityFromRequest(request, InspectionCode.class);

      this.log.fine("Received InspectionCode in request: " + inspCode);

      if (validateEntity(inspCode)) {
        this.log.finer("InspectionCode succesfully validated");
        dataModel.createDataModel(inspCode);

        String sId = String.valueOf(inspCode.getInspectionCodeId());
        this.log.finer("Setting InspectionCode id in response: " + sId);
        response.setGeneratedId(sId);
        response.setError(new Error("0", "SUCCESS", "proxy.InspectionCodeBean.Create"));
        this.log.info("Inspection Code [" + inspCode.toString() + "] created by principal[" + getLoggedUser() + "]");
      } else {
        this.log.warning("Error de validación: " + error_description);
        response.setError(new Error("VAL01", "Error de validación: " + error_description, "proxy.InspectionCodeBean.Create"));
      }

    } catch (Exception e) {
      this.log.severe("Exception found while creating InspectionCodeBean");
      this.log.throwing(this.getClass().getName(), "Create", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01",
            "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, ",
            "proxy.InspectionCodeBean.Create"));
      else {
        response.setError(new Error("DB02", "Create exception: " + e.getMessage(), "proxy.InspectionCodeBean.Create"));
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

    InspectionCode ic = null;
    try {
      ic = entityFromRequest(request, InspectionCode.class);
      this.log.fine("Got InspectionCode from request: " + ic);

      String qryLogger = "";
      String queryName = "";
      Map<String, Object> parameters = new HashMap<String, Object>();
      if (ic.getInspectionCodeId() != 0) {
        queryName = "CAT_INSPECTIONCODE_BY_ID";
        parameters.put("InspectionCodeId", ic.getInspectionCodeId());
        qryLogger = "By inspectionCodeId [" + ic.getInspectionCodeId() + "]";
      } else {
        queryName = "ALL_INSPECTION_CODES";
        qryLogger = "By ALL_INSPECTION_CODES";
      }

      // Query the results through the jpa using a typedQuery
      List<InspectionCode> queryResults = dataModel.readDataModelList(queryName, parameters, InspectionCode.class);

      if (queryResults.isEmpty()) {
        response.setError(new Error("VAL02", "No se encontraron datos para el filtro seleccionado", "proxy.InspectionCodeBean.Read"));
      } else {
        // Add query results to response
        response.getRecord().addAll(contentFromList(queryResults, InspectionCode.class));

        // Add success message to response
        response.setError(new Error("0", "SUCCESS", "proxy.InspectionCode.Read"));
        this.log.info("Read operation " + qryLogger + " executed by principal[" + getLoggedUser() + "] on InspectionCodeBean");
      }
    } catch (Exception e) {
      // something went wrong, alert the server and respond the client
      this.log.severe("Exception found while reading feed InspectionCode");
      this.log.throwing(this.getClass().getCanonicalName(), "Read", e);

      response.setError(new Error("DB02", "Read exception: " + e.getMessage(), "proxy.InspectionCodeBean.Read"));
    }

    // end and respond.
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
    InspectionCode inspCode = null;
    try {
      inspCode = entityFromRequest(request, InspectionCode.class);

      if (inspCode.getInspectionCodeId() == 0) {
        this.log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id del corral al intentar actualizar sus datos.",
            "proxy.InspectionCode.Update"));
      } else {
        if (validateEntity(inspCode)) {
          dataModel.updateDataModel(inspCode);

          GatewayContent content = getContentFromEntity(inspCode, InspectionCode.class);
          response.setUpdatedRecord(content);

          response.setError(new Error("0", "SUCCESS", "proxy.InspectionCode.Update"));
          this.log.info("Inspection Code [" + inspCode.toString() + "] updated by principal[" + getLoggedUser() + "]");
        } else {
          this.log.warning("Validation error:" + error_description);
          response.setError(new Error("VAL01", "Error de validación de datos:" + error_description,
              "proxy.InspectionCodeBean.Update"));
        }
      }

    } catch (Exception e) {
      this.log.severe("Exception found while updating InspectionCode");
      this.log.throwing(this.getClass().getName(), "Update", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, "
            + "muy probablemente el codigo de inspección ya existe.",
            "proxy.InspectionCodeBean.Update"));
      else {
        response.setError(new Error("DB02", "Error en la base de datos:[" + e.getMessage() + "]",
            "proxy.InspectionCodeBean.Update"));
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
      InspectionCode inspCode = entityFromRequest(request, InspectionCode.class);
      if (inspCode.getInspectionCodeId() == 0) {
        this.log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id del corral al intentar eliminar el registro.",
            "proxy.InspectionCode.Delete"));
      } else {
        
        inspCode = dataModel.readSingleDataModel("CAT_INSPECTION_BY_ID", "inspectionCodeId", inspCode.getInspectionCodeId(), InspectionCode.class);
        this.log.info("Deleting InspectionCode [" + inspCode.toString() + "] by principal[" + getLoggedUser() + "]");
        dataModel.deleteDataModel(inspCode, getLoggedUser());
        response.setError(new Error("0", "SUCCESS", "proxy.InspectionCode.Delete"));
      }
    } catch (Exception e) {
      this.log.severe("Exception found while deleting inspCode");
      this.log.throwing(this.getClass().getName(), "Delete", e);

      response.setError(new Error("DEL01",
          "Error al intentar borrar datos, es probable que esta entidad tenga otras entidades relacionadas, "
              + "por ejemplo, una inspección ya ha sido utilizada para este código.",
          "proxy.InspectionCode.Delete"));
    }

    this.log.exiting(this.getClass().getCanonicalName(), "Delete");
    return response;
  }

}
