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
import com.tramex.sisoprega.dto.BarnyardCapacity;

/**
 * This proxy knows the logic to evaluate Barnyards' capacity information and
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
 *             Jaime Figueroa                Initial Version.
 * 12/04/2012  Diego Torres                  Fixing delete operation, adding flower box
 *                                           and adding read functionality.
 * 12/12/2012  Alfredo Pacheco				 Added sql for select all records.
 * 12/16/2012  Diego Torres                  Removed commented set of lines on read else,
 *                                           added log for users activity.
 * 01/22/2013  Diego Torres                  Apply data model interfacing.
 * ====================================================================================
 * </PRE>
 * 
 * @author Jaime Figueroa
 * 
 */
@Stateless
public class BarnyardCapacityBean extends BaseBean implements Cruddable {

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
    BarnyardCapacity barnyardCa = null;
    try {
      barnyardCa = entityFromRequest(request, BarnyardCapacity.class);

      this.log.fine("Received BarnyardCapacity in request: " + barnyardCa);

      if (validateEntity(barnyardCa)) {
        this.log.finer("BarnyardCapacity succesfully validated");
        dataModel.createDataModel(barnyardCa);
        this.log.finer("BarnyardCapacity persisted on database");

        String sId = String.valueOf(barnyardCa.getCapacityId());
        this.log.finer("Setting BarnyardCapacity id in response: " + sId);
        response.setGeneratedId(sId);
        response.setError(new Error("0", "SUCCESS", "proxy.BarnyardCapacityBean.Create"));
        this.log.info("Barnyard capacity[" + barnyardCa.toString() + "] created by principal[" + getLoggedUser() + "]");
      } else {
        this.log.warning("Error de validación: " + error_description);
        response.setError(new Error("VAL01", "Error de validación: " + error_description, "proxy.BarnyardCapacityBean.Create"));
      }

    } catch (Exception e) {
      this.log.severe("Exception found while creating BarnyardCapacityBean");
      this.log.throwing(this.getClass().getName(), "Create", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, "
            + "muy probablemente el corral que usted quiere agregar "
            + "ya cuenta con la capacidad de la clase de ganado que usted esta indicando.", "proxy.BarnyardCapacityBean.Create"));
      else {
        response.setError(new Error("DB02", "Create exception: " + e.getMessage(), "proxy.BarnyardCapacityBean.Create"));
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

    BarnyardCapacity capacity = null;
    try {
      capacity = entityFromRequest(request, BarnyardCapacity.class);
      this.log.fine("Got barnyard capacity from request: " + capacity);

      String qryLogger = "";
      Map<String, Object> parameters = new HashMap<String, Object>();
      String queryName = "";
      
      if (capacity.getCapacityId() != 0) {
        queryName = "BARNYARD_CAPACITY_BY_ID";
        parameters.put("capacityId", capacity.getCapacityId());
        qryLogger = "By capacityId [" + capacity.getCapacityId() + "]";
      } else if (capacity.getBarnyardId() != 0 && capacity.getCatclassId() != 0) {
        queryName = "BARNYARD_CAPACITY_BY_BARNYARD_AND_CATTLE";
        parameters.put("barnyardId", capacity.getBarnyardId());
        parameters.put("cattleClassId", capacity.getCatclassId());
        qryLogger = "By barnyardId [" + capacity.getBarnyardId() + "] and cattleClassId [" + capacity.getCatclassId() + "]";
      } else {
        queryName = "ALL_BARNYARD_CAPACITIES";
        qryLogger = "By ALL BARNYARD CAPACITIES";
      }

      List<BarnyardCapacity> result = dataModel.readDataModelList(queryName, parameters, BarnyardCapacity.class);
      if (result.isEmpty()) {
        response.setError(new Error("VAL02", "No se encontraron datos para el filtro seleccionado", "proxy.BarnyardBean.Read"));
      } else {
        List<GatewayContent> records = contentFromList(result, BarnyardCapacity.class);
        response.getRecord().addAll(records);

        response.setError(new Error("0", "SUCCESS", "proxy.BarnyardBean.Read"));
        this.log.info("Read operation " + qryLogger + " executed by principal[" + getLoggedUser() + "] on BarnyardCapacityBean");
      }

    } catch (Exception e) {
      // something went wrong, alert the server and respond the client
      this.log.severe("Exception found while reading BarnyardCapacityBean");
      this.log.throwing(this.getClass().getCanonicalName(), "Read", e);

      response.setError(new Error("DB02", "Read exception: " + e.getMessage(), "proxy.BarnyardCapacityBean.Read"));
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
    BarnyardCapacity barnyardCa = null;
    try {
      barnyardCa = entityFromRequest(request, BarnyardCapacity.class);

      if (barnyardCa.getCapacityId() == 0) {
        this.log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id de la capacidad del corral al intentar actualizar sus datos.",
            "proxy.BarnyardCapacity.Update"));
      } else {
        if (validateEntity(barnyardCa)) {
          dataModel.updateDataModel(barnyardCa);

          GatewayContent content = getContentFromEntity(barnyardCa, BarnyardCapacity.class);
          response.setUpdatedRecord(content);

          response.setError(new Error("0", "SUCCESS", "proxy.BarnyardCapacity.Update"));
          this.log.info("BarnyardCapacity[" + barnyardCa.toString() + "] updated by principal[" + getLoggedUser() + "]");
        } else {
          this.log.warning("Validation error: " + error_description);
          response.setError(new Error("VAL01", "Error de validación de datos:" + error_description,
              "proxy.BarnyardCapacityBean.Update"));
        }
      }

    } catch (Exception e) {
      this.log.severe("Exception found while updating BarnyardCapacity");
      this.log.throwing(this.getClass().getName(), "Update", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, "
            + "muy probablemente la capacidad que usted quiere agregar ya se encuentra en la base de datos.",
            "proxy.BarnyardBean.Update"));
      else {
        response.setError(new Error("DB02", "Error en la base de datos:[" + e.getMessage() + "]",
            "proxy.BarnyardCapacityBean.Update"));
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
      BarnyardCapacity barnyardCa = entityFromRequest(request, BarnyardCapacity.class);
      if (barnyardCa.getCapacityId() == 0) {
        this.log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id de la capacidad del corral al intentar eliminar el registro.",
            "proxy.BarnyardCapacity.Delete"));
      } else {
        
        
        barnyardCa = dataModel.readSingleDataModel("BARNYARD_CAPACITY_BY_ID", "capacityId", barnyardCa.getCapacityId(), BarnyardCapacity.class);
        this.log.info("Deleting BarnyardCapacity[" + barnyardCa.toString() + "] by principal[" + getLoggedUser() + "]");
        dataModel.deleteDataModel(barnyardCa, getLoggedUser());

        response.setError(new Error("0", "SUCCESS", "proxy.BarnyardCapacity.Delete"));
        this.log.info("BarnyardCapacity successfully deleted by principal [" + getLoggedUser() + "]");
      }
    } catch (Exception e) {
      this.log.severe("Exception found while deleting barnyard capacity");
      this.log.throwing(this.getClass().getName(), "Delete", e);

      response.setError(new Error("DEL01",
          "Error al intentar borrar datos, es probable que esta entidad tenga otras entidades relacionadas, "
              + "por ejemplo, un corrar que cuenta con recepciones no puede ser eliminado sin antes resolver la recepción.",
          "proxy.BarnyardCapacity.Delete"));
    }

    this.log.exiting(this.getClass().getCanonicalName(), "Delete");
    return response;
  }

}
