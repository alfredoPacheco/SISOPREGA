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
import com.tramex.sisoprega.dto.InspectionDetails;

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
 * 12/23/2012  Alfredo Pacheco              Initial Version.
 * 01/22/2013  Diego Torres                  Implementing DataModel.
 * ====================================================================================
 * </PRE>
 * 
 * @author Jaime Figueroa
 * 
 */
@Stateless
public class InspectionDetailsBean extends BaseBean implements Cruddable {

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
    InspectionDetails inspectionDetails = null;
    try {
      inspectionDetails = entityFromRequest(request, InspectionDetails.class);

      this.log.fine("Received InspectionDetails in request: " + inspectionDetails);

      if (validateEntity(inspectionDetails)) {
        this.log.finer("InspectionDetails succesfully validated");
        dataModel.createDataModel(inspectionDetails);

        String sId = String.valueOf(inspectionDetails.getInspectionDetailsId());
        this.log.finer("Setting InspectionDetails id in response: " + sId);
        response.setGeneratedId(sId);
        response.setError(new Error("0", "SUCCESS", "proxy.InspectionDetailsBean.Create"));
        this.log.info("Reception inspectionDetails [" + inspectionDetails.toString() + "] created by principal[" + getLoggedUser() + "]");
      } else {
        this.log.warning("Error de validación: " + error_description);
        response.setError(new Error("VAL01", "Error de validación: " + error_description, "proxy.InspectionDetailsBean.Create"));
      }

    } catch (Exception e) {
      this.log.severe("Exception found while creating InspectionDetailsBean");
      this.log.throwing(this.getClass().getName(), "Create", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01",
            "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, ",
            "proxy.InspectionDetailsBean.Create"));
      else {
        response.setError(new Error("DB02", "Create exception: " + e.getMessage(), "proxy.InspectionDetailsBean.Create"));
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

    InspectionDetails inspectionDetails = null;
    try {
      inspectionDetails = entityFromRequest(request, InspectionDetails.class);

      this.log.fine("Got inspectionDetails query from request: " + inspectionDetails);

      String qryLogger = "";
      String queryName = "";
      Map<String, Object> parameters = new HashMap<String, Object>();
      if (inspectionDetails.getInspectionDetailsId() != 0) {
        queryName = "CRT_INSPECTION_DETAILS_BY_ID";
        parameters.put("inspDetId", inspectionDetails.getInspectionDetailsId());
        qryLogger = "By inspectionDetailsId [" + inspectionDetails.getInspectionDetailsId() + "]";
      } else if(inspectionDetails.getInspectionId() != 0 ){
        queryName = "INSPECTION_DETAILS_BY_INSPECTION_ID";
        parameters.put("inspId", inspectionDetails.getInspectionId());
        qryLogger = "By inspectionId [" + inspectionDetails.getInspectionId() + "]";
      } else {
        response.setError(new Error("VAL03", "El filtro especificado no es válido para datos de recepciones de ganado.",
            "proxy.InspectionDetails.Read"));
        return response;
      }

      List<InspectionDetails> queryResults = dataModel.readDataModelList(queryName, parameters, InspectionDetails.class);

      if (queryResults.isEmpty()) {
        response.setError(new Error("VAL02", "No se encontraron datos para el filtro seleccionado", "proxy.InspectionDetails.Read"));
      } else {
        response.getRecord().addAll(contentFromList(queryResults, InspectionDetails.class));

        response.setError(new Error("0", "SUCCESS", "proxy.InspectionDetails.Read"));
        this.log.info("Read operation " + qryLogger + " executed by principal[" + getLoggedUser() + "] on InspectionDetailsBean");
      }
    } catch (Exception e) {
      this.log.severe("Exception found while reading inspection details filter");
      this.log.throwing(this.getClass().getCanonicalName(), "Read", e);

      response.setError(new Error("DB02", "Error en la base de datos: " + e.getMessage(), "proxy.InspectionDetails.Read"));
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
    InspectionDetails inspectionDetails = null;
    try {
      inspectionDetails = entityFromRequest(request, InspectionDetails.class);

      if (inspectionDetails.getInspectionDetailsId() == 0) {
        this.log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id del corral al intentar actualizar sus datos.",
            "proxy.InspectionDetails.Update"));
      } else {
        if (validateEntity(inspectionDetails)) {
          dataModel.updateDataModel(inspectionDetails);

          GatewayContent content = getContentFromEntity(inspectionDetails, InspectionDetails.class);
          response.setUpdatedRecord(content);

          response.setError(new Error("0", "SUCCESS", "proxy.InspectionDetails.Update"));
          this.log.info("Reception inspectionDetails [" + inspectionDetails.toString() + "] updated by principal[" + getLoggedUser() + "]");
        } else {
          this.log.warning("Validation error:" + error_description);
          response.setError(new Error("VAL01", "Error de validación de datos:" + error_description, "proxy.InspectionDetailsBean.Update"));
        }
      }

    } catch (Exception e) {
      this.log.severe("Exception found while updating InspectionDetails");
      this.log.throwing(this.getClass().getName(), "Update", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, ",
            "proxy.InspectionDetailsBean.Update"));
      else {
        response.setError(new Error("DB02", "Error en la base de datos:[" + e.getMessage() + "]", "proxy.InspectionDetailsBean.Update"));
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
      InspectionDetails inspectionDetails = entityFromRequest(request, InspectionDetails.class);
      if (inspectionDetails.getInspectionDetailsId() == 0) {
        this.log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id de detalles de inspeccion al intentar eliminar el registro.", "proxy.InspectionDetails.Delete"));
      } else {
        inspectionDetails = dataModel.readSingleDataModel("CRT_INSPECTION_DETAILS_BY_ID", "inspDetId", inspectionDetails.getInspectionDetailsId(), InspectionDetails.class);
        this.log.info("Deleting InspectionDetails [" + inspectionDetails.toString() + "] by principal[" + getLoggedUser() + "]");
        dataModel.deleteDataModel(inspectionDetails, getLoggedUser());
        response.setError(new Error("0", "SUCCESS", "proxy.InspectionDetails.Delete"));
      }
    } catch (Exception e) {
      this.log.severe("Exception found while deleting InspectionDetails");
      this.log.throwing(this.getClass().getName(), "Delete", e);

      response.setError(new Error("DEL01",
          "Error al intentar borrar datos, es probable que esta entidad tenga otras entidades relacionadas, ",
          "proxy.InspectionDetails.Delete"));
    }

    this.log.exiting(this.getClass().getCanonicalName(), "Delete");
    return response;
  }

}
