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
import com.tramex.sisoprega.dto.Hermana;


/**
 * This proxy knows the logic to evaluate Hermana's information and the
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
 * 04/06/2013  Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Jaime Figueroa
 * 
 */
public class HermanaBean extends BaseBean implements Cruddable {

  @Override
  public CreateGatewayResponse Create(GatewayRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "CreateGatewayResponse Create(GatewayRequest request)");
    CreateGatewayResponse response = new CreateGatewayResponse();
    Hermana hermana = null;
    try {
      hermana = entityFromRequest(request, Hermana.class);
      hermana.setHermanaBy(getLoggedUser());

      this.log.fine("Received Hermana in request: " + hermana);

      if (validateEntity(hermana)) {
        this.log.finer("Hermana succesfully validated");
        dataModel.createDataModel(hermana);

        String sId = String.valueOf(hermana.getHermanaId());
        this.log.finer("Setting FeedOrder id in response: " + sId);
        response.setGeneratedId(sId);
        response.setError(new Error("0", "SUCCESS", "proxy.HermanaBean.Create"));
        this.log.info("Hermana [" + hermana.toString() + "] created by principal[" + getLoggedUser() + "]");
      } else {
        this.log.warning("Error de validación: " + error_description);
        response.setError(new Error("VAL01", "Error de validación: " + error_description, "proxy.FeedOrderBean.Create"));
      }

    } catch (Exception e) {
      this.log.severe("Exception found while creating HermanaBean");
      this.log.throwing(this.getClass().getName(), "CreateGatewayResponse Create(GatewayRequest request)", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos",
            "proxy.HermanaBean.Create"));
      else {
        response.setError(new Error("DB02", "Create exception: " + e.getMessage(), "proxy.HermanaBean.Create"));
      }
    }

    this.log.exiting(this.getClass().getCanonicalName(), "CreateGatewayResponse Create(GatewayRequest request)");
    return response;
  }

  @Override
  public ReadGatewayResponse Read(GatewayRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "ReadGatewayResponse Read(GatewayRequest request)");

    ReadGatewayResponse response = new ReadGatewayResponse();
    response.setEntityName(request.getEntityName());

    Hermana hermana = null;
    try {
      hermana = entityFromRequest(request, Hermana.class);
      this.log.fine("Got Hermana from request: " + hermana);

      String qryLogger = "";
      String queryName = "";
      Map<String, Object> parameters = new HashMap<String, Object>();
      if (hermana.getHermanaId() != 0) {
        queryName = "HERMANA_BY_ID";
        parameters.put("hermanaId", hermana.getHermanaId());
        qryLogger = "By hermanaId [" + hermana.getHermanaId() + "]";
      } else if (hermana.getRancherId() != 0) {
        queryName = "HERMANA_BY_RANCHER_ID";
        parameters.put("rancherId", hermana.getRancherId());
        qryLogger = "By rancherId [" + hermana.getRancherId() + "]";
      } else {
        response.setError(new Error("VAL03", "El filtro especificado no es válido para los registros de exportación de ganado",
            "proxy.HermanaBean.Read"));
        return response;
      }

      // Query the results through the jpa using a typedQuery
      List<Hermana> queryResults = dataModel.readDataModelList(queryName, parameters, Hermana.class);

      if (queryResults.isEmpty()) {
        response.setError(new Error("VAL02", "No se encontraron datos para el filtro seleccionado", "proxy.HermanaBean.Read"));
      } else {
        // Add query results to response
        response.getRecord().addAll(contentFromList(queryResults, Hermana.class));

        // Add success message to response
        response.setError(new Error("0", "SUCCESS", "proxy.HermanaBean.Read"));
        this.log.info("Read operation " + qryLogger + " executed by principal[" + getLoggedUser() + "] on HermanaBean");
      }
    } catch (Exception e) {
      // something went wrong, alert the server and respond the client
      this.log.severe("Exception found while reading hermana");
      this.log.throwing(this.getClass().getCanonicalName(), "ReadGatewayResponse Read(GatewayRequest request)", e);

      response.setError(new Error("DB02", "Read exception: " + e.getMessage(), "proxy.HermanaBean.Read"));
    }

    // end and respond.
    this.log.exiting(this.getClass().getCanonicalName(), "ReadGatewayResponse Read(GatewayRequest request)");
    return response;
  }

  @Override
  public UpdateGatewayResponse Update(GatewayRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "UpdateGatewayResponse Update(GatewayRequest request)");
    UpdateGatewayResponse response = new UpdateGatewayResponse();
    Hermana hermana = null;
    try {
      hermana = entityFromRequest(request, Hermana.class);
      hermana.setHermanaBy(getLoggedUser());
      
      if (hermana.getHermanaId() == 0) {
        this.log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id del registro de exportación al intentar actualizar sus datos.",
            "proxy.HermanaBean.Update"));
      } else {
        if (validateEntity(hermana)) {
          dataModel.updateDataModel(hermana);

          GatewayContent content = getContentFromEntity(hermana, Hermana.class);
          response.setUpdatedRecord(content);

          response.setError(new Error("0", "SUCCESS", "proxy.HermanaBean.Update"));
          this.log.info("Hermana [" + hermana.toString() + "] updated by principal[" + getLoggedUser() + "]");
        } else {
          this.log.warning("Validation error:" + error_description);
          response
              .setError(new Error("VAL01", "Error de validación de datos:" + error_description, "proxy.HermanaBean.Update"));
        }
      }

    } catch (Exception e) {
      this.log.severe("Exception found while updating Hermana");
      this.log.throwing(this.getClass().getName(), "UpdateGatewayResponse Update(GatewayRequest request)", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos",
            "proxy.HermanaBean.Update"));
      else {
        response.setError(new Error("DB02", "Error en la base de datos:[" + e.getMessage() + "]", "proxy.HermanaBean.Update"));
      }
    }

    this.log.exiting(this.getClass().getCanonicalName(), "UpdateGatewayResponse Update(GatewayRequest request)");
    return response;
  }

  @Override
  public BaseResponse Delete(GatewayRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "BaseResponse Delete(GatewayRequest request)");
    BaseResponse response = new BaseResponse();

    try {
      Hermana hermana = entityFromRequest(request, Hermana.class);
      if (hermana.getHermanaId() == 0) {
        this.log.warning("VAL04 - Entity ID Omission.");

        response.setError(new Error("VAL04", "Se ha omitido el id de la orden del registro de exportación al intentar eliminar el registro.",
            "proxy.HermanaBean.Delete"));
      } else {
        hermana = dataModel.readSingleDataModel("HERMANA_BY_ID", "hermanaId", hermana.getHermanaId(), Hermana.class);
        this.log.info("Deleting Hermana [" + hermana.toString() + "] by principal[" + getLoggedUser() + "]");
        dataModel.deleteDataModel(hermana, getLoggedUser());

        response.setError(new Error("0", "SUCCESS", "proxy.HermanaBean.Delete"));
      }
    } catch (Exception e) {
      this.log.severe("Exception found while deleting Hermana");
      this.log.throwing(this.getClass().getName(), "BaseResponse Delete(GatewayRequest request)", e);

      response.setError(new Error("DEL01",
          "Error al intentar borrar datos, es probable que esta entidad tenga otras entidades relacionadas",
          "proxy.HermanaBean.Delete"));
    }

    this.log.exiting(this.getClass().getCanonicalName(), "BaseResponse Delete(GatewayRequest request)");
    return response;
  }

}
