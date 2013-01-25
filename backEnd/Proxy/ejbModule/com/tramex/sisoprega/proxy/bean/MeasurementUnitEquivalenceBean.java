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
import com.tramex.sisoprega.dto.MeasurementUnitEquivalence;

/**
 * This proxy knows the logic to evaluate Measurement unit equivalences information and the
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
 * 12/13/2012  Diego Torres                  Enable read operation and standard error codes.
 * 12/16/2012  Diego Torres                  Adding log activity
 * 01/22/2013  Diego Torres                  Implementing DataModel.
 * ====================================================================================
 * </PRE>
 * 
 * @author Jaime Figueroa
 * 
 */
@Stateless
public class MeasurementUnitEquivalenceBean extends BaseBean implements Cruddable {

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
    MeasurementUnitEquivalence equivalence = null;
    try {
      equivalence = entityFromRequest(request, MeasurementUnitEquivalence.class);

      this.log.fine("Received MeasurementUnitEquivalence in request: " + equivalence);

      if (validateEntity(equivalence)) {
        this.log.finer("MeasurementUnitEquivalence succesfully validated");
        dataModel.createDataModel(equivalence);

        String sId = String.valueOf(equivalence.getEquivalenceId());
        this.log.finer("Setting MeasurementUnitEquivalence id in response: " + sId);
        response.setGeneratedId(sId);
        response.setError(new Error("0", "SUCCESS", "proxy.MeasurementUnitEquivalenceBean.Create"));
        this.log.info("Measurement Unit Equivalence [" + equivalence.toString() + "] created by principal[" + getLoggedUser() + "]");
      } else {
        this.log.warning("Validation error: " + error_description);
        response.setError(new Error("VAL01", "Error de validación: " + error_description, "proxy.MeasurementUnitEquivalenceBean.Create"));
      }

    } catch (Exception e) {
      this.log.severe("Exception found while creating MeasurementUnitEquivalenceBean");
      this.log.throwing(this.getClass().getName(), "Create", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01",
            "Los datos que usted ha intentado ingresar no son permitidos por la base de datos",
            "proxy.MeasurementUnitEquivalenceBean.Create"));
      else {
        response.setError(new Error("DB02", "Create exception: " + e.getMessage(), "proxy.MeasurementUnitEquivalenceBean.Create"));
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

    MeasurementUnitEquivalence equivalence = null;
    try {
      equivalence = entityFromRequest(request, MeasurementUnitEquivalence.class);
      this.log.fine("Got MeasurementUnit from request: " + equivalence);

      String qryLogger = "";
      String queryName = "";
      Map<String, Object> parameters = new HashMap<String, Object>();
      if (equivalence.getEquivalenceId() != 0) {
        queryName = "CAT_MEASUREMENTUNITEQUIVALENCE_BY_ID";
        this.log.fine("Query by unitId: " + equivalence.getEquivalenceId());
        parameters.put("equivalenceId", equivalence.getEquivalenceId());
        qryLogger = "By equivalenceId [" + equivalence.getEquivalenceId() + "]";
      } else if(equivalence.getUnitSrc() != 0){
        queryName = "EQUIVALENCE_BY_UNIT_ID";
        parameters.put("unitSrc", equivalence.getUnitSrc());
        qryLogger = "By equivalence [" + equivalence.getUnitSrc() + "]";
      }else{
        response.setError(new Error("VAL03", "El filtro especificado no es válido para las equivalencias de unidades de medida",
            "proxy.MeasurementUnitEquivalence.Read"));
        return response;
      }

      // Query the results through the jpa using a typedQuery
      List<MeasurementUnitEquivalence> queryResults = dataModel.readDataModelList(queryName, parameters, MeasurementUnitEquivalence.class);

      if (queryResults.isEmpty()) {
        response.setError(new Error("VAL02", "No se encontraron datos para el filtro seleccionado", "proxy.MeasurementUnitEquivalence.Read"));
      } else {
        // Add query results to response
        response.getRecord().addAll(contentFromList(queryResults, MeasurementUnitEquivalence.class));

        // Add success message to response
        response.setError(new Error("0", "SUCCESS", "proxy.MeasurementUnitEquivalence.Read"));
        this.log.info("Read operation " + qryLogger + " executed by principal[" + getLoggedUser() + "] on MeasurementUnitEquivalenceBean");
      }
    } catch (Exception e) {
      // something went wrong, alert the server and respond the client
      this.log.severe("Exception found while reading feed MeasurementUnitEquivalence");
      this.log.throwing(this.getClass().getCanonicalName(), "Read", e);

      response.setError(new Error("DB02", "Read exception: " + e.getMessage(), "proxy.MeasurementUnitEquivalence.Read"));
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
    MeasurementUnitEquivalence equivalence = null;
    try {
      equivalence = entityFromRequest(request, MeasurementUnitEquivalence.class);

      if (equivalence.getEquivalenceId() == 0) {
        this.log.warning("MUEU1 - Invalid MeasurementUnitEquivalence id");
        response.setError(new Error("MUEU1", "Invalid MeasurementUnitEquivalence id", "proxy.MeasurementUnitEquivalence.Update"));
      } else {
        if (validateEntity(equivalence)) {
          dataModel.updateDataModel(equivalence);

          GatewayContent content = getContentFromEntity(equivalence, MeasurementUnitEquivalence.class);
          response.setUpdatedRecord(content);

          response.setError(new Error("0", "SUCCESS", "proxy.MeasurementUnitEquivalence.Update"));
          this.log.info("MeasurementUnitEquivalence [" + equivalence.toString() + "] updated by principal[" + getLoggedUser() + "]");
        } else {
          this.log.warning("Validation error: " + error_description);
          response.setError(new Error("MUEU2", "Validation error: " + error_description, "proxy.MeasurementUnitEquivalence.Update"));
        }
      }

    } catch (Exception e) {
      this.log.severe("Exception found while updating MeasurementUnitEquivalence");
      this.log.throwing(this.getClass().getName(), "Update", e);

      response.setError(new Error("MUEU3", "Update exception " + e.getMessage(), "proxy.MeasurementUnitEquivalence.Update"));
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
      MeasurementUnitEquivalence equivalence = entityFromRequest(request, MeasurementUnitEquivalence.class);
      if (equivalence.getEquivalenceId() == 0) {
        this.log.warning("MUED1 - Invalid MeasurementUnitEquivalence");
        response.setError(new Error("MUED1", "Invalid EquivalenceId", "proxy.MeasurementUnitEquivalence.Delete"));
      } else {
        equivalence = dataModel.readSingleDataModel("CAT_MEASUREMENTUNITEQUIVALENCE_BY_ID", "equivalenceId", equivalence.getEquivalenceId(), MeasurementUnitEquivalence.class);
        this.log.info("Deleting MeasurementUnitEquivalence [" + equivalence.toString() + "] by principal[" + getLoggedUser() + "]");
        dataModel.deleteDataModel(equivalence, getLoggedUser());
        response.setError(new Error("0", "SUCCESS", "proxy.MeasurementUnitEquivalence.Delete"));
      }
    } catch (Exception e) {
      this.log.severe("Exception found while deleting contact");
      this.log.throwing(this.getClass().getName(), "Delete", e);

      response.setError(new Error("MUED2", "Delete exception: " + e.getMessage(), "proxy.MeasurementUnitEquivalence.Delete"));
    }

    this.log.exiting(this.getClass().getCanonicalName(), "Delete");
    return response;
  }

}
