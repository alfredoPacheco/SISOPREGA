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
import com.tramex.sisoprega.dto.PrintLog;

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
 * 03/06/2012  Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 */
@Stateless
public class PrintLogBean extends BaseBean implements Cruddable {

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
    PrintLog printLog = null;
    try {
      printLog = entityFromRequest(request, PrintLog.class);

      this.log.fine("Received print log in request: " + printLog);

      if (validateEntity(printLog)) {
        this.log.finer("PrintLog succesfully validated");
        dataModel.createDataModel(printLog);

        String sId = String.valueOf(printLog.getRecordId());
        this.log.finer("Setting PrintLog id in response: " + sId);
        response.setGeneratedId(sId);
        response.setError(new Error("0", "SUCCESS", "proxy.PrintLog.Create"));
        this.log.info("PrintLog [" + printLog.toString() + "] created by principal[" + getLoggedUser() + "]");
      } else {
        this.log.warning("Error de validación: " + error_description);
        response.setError(new Error("VAL01", "Error de validación: " + error_description, "proxy.PrintLog.Create"));
      }

    } catch (Exception e) {
      this.log.severe("Exception found while creating PrintLog");
      this.log.throwing(this.getClass().getName(), "Create", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01", "No fue posible agregar trabajo a la lista de impresión.",
            "proxy.PrintLog.Create"));
      else {
        response.setError(new Error("DB02", "Create exception: " + e.getMessage(), "proxy.PrintLog.Create"));
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

    PrintLog printLog = null;
    try {
      printLog = entityFromRequest(request, PrintLog.class);

      this.log.fine("Got PrintLog from request: " + printLog);
      
      String qryLogger = "";
      String queryName = "";
      Map<String, Object> parameters = new HashMap<String, Object>();
      if (printLog.getRecordId() != 0) {
        queryName = "PRINT_RECORD_BY_ID";
        parameters.put("recordId", printLog.getRecordId());
        qryLogger = "By recordId [" + printLog.getRecordId() + "]";
      } else if (printLog.getDestinationName() != null) {
        queryName = "PRINT_RECORDS_BY_DESTINATION";
        parameters.put("destination", printLog.getDestinationName());
        qryLogger = "By PRINT_RECORDS_BY_DESTINATION";
      }else{
        response.setError(new Error("VAL03", "El filtro especificado no es válido para las listas de impresion",
            "proxy.PrintLog.Read"));
        return response;
      }

      List<PrintLog> queryResults = dataModel.readDataModelList(queryName, parameters, PrintLog.class);

      if (queryResults.isEmpty()) {
        response.setError(new Error("VAL02", "No se encontraron datos para el filtro seleccionado", "proxy.PrintLog.Read"));
      } else {
        List<GatewayContent> records = contentFromList(queryResults, PrintLog.class);
        response.getRecord().addAll(records);
        response.setError(new Error("0", "SUCCESS", "proxy.PrintLog.Read"));
        this.log.info("Read operation " + qryLogger + " executed by principal[" + getLoggedUser() + "] on PrintLog");
      }

    } catch (Exception e) {
      this.log.severe("Exception found while reading PrintLog");
      this.log.throwing(this.getClass().getCanonicalName(), "Read", e);

      response.setError(new Error("DB02", "Error en la base de datos: " + e.getMessage(), "proxy.PrintLog.Read"));
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
    response.setError(new Error("DB02", "La actualizacion de registros de impresion no esta permitida", "proxy.PrintLogBean.Update"));
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
      PrintLog printLog = entityFromRequest(request, PrintLog.class);
      if (printLog.getRecordId() == 0) {
        this.log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id de la localización al intentar eliminar el registro.",
            "proxy.PrintLog.Delete"));
      } else {
        printLog = dataModel.readSingleDataModel("PRINT_RECORD_BY_ID", "recordId", printLog.getRecordId(), PrintLog.class);
        this.log.info("Deleting Location [" + printLog.toString() + "] by principal[" + getLoggedUser() + "]");
        dataModel.deleteDataModel(printLog, getLoggedUser());
        response.setError(new Error("0", "SUCCESS", "proxy.PrintLog.Delete"));
      }
    } catch (Exception e) {
      this.log.severe("Exception found while deleting PrintLog");
      this.log.throwing(this.getClass().getName(), "Delete", e);

      response.setError(new Error("DEL01",
          "Error al intentar borrar datos. Es muy probable que la entidad que usted quiere eliminar "
              + "cuente con otras entidades relacionadas.", "proxy.PrintLog.Delete"));
    }

    this.log.exiting(this.getClass().getCanonicalName(), "Delete");
    return response;
  }
}
