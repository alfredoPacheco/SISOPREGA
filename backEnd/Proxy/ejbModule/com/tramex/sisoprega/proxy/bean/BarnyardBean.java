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
import com.tramex.sisoprega.dto.Barnyard;

/**
 * This proxy knows the logic to evaluate Barnyards' information and the
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
 *             Jaime Figueroa                Initial Version.
 * 12/04/2012  Diego Torres                  Fixing delete operation, adding flower box
 *                                           and adding read functionality.
 * 12/16/2012  Diego Torres                  Adding log functionality based on loggedUser.
 * 01/22/2013  Diego Torres                  Apply data model interfacing.
 * ====================================================================================
 * </PRE>
 * 
 * @author Jaime Figueroa
 * 
 */
@Stateless
public class BarnyardBean extends BaseBean implements Cruddable {
  
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
    response.setError(new Error("VAL04", "No se permite la creación de Corrales por este medio.", "proxy.BarnyardBean.Create"));

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

    Barnyard barnyard = null;
    try {
      barnyard = entityFromRequest(request, Barnyard.class);
      this.log.fine("Got barnyard from request: " + barnyard);

      String qryLogger = "";
      Map<String, Object> parameters = new HashMap<String, Object>();
      String queryName = "";
      
      if (barnyard.getBarnyardId() != 0) {
        queryName = "BARNYARD_BY_ID";
        parameters.put("barnyardId", barnyard.getBarnyardId());
        qryLogger = "By barnyardId [" + barnyard.getBarnyardId() + "]";
      } else if (barnyard.getLocationId() != 0) {
        queryName = "BARNYARD_BY_LOCATION";
        parameters.put("locationId", barnyard.getLocationId());
        qryLogger = "By locationId [" + barnyard.getLocationId() + "]";
      } else {
        queryName = "ALL_BARNYARDS";
        qryLogger = "By ALL_BARNYARDS";
      }

      List<Barnyard> results = dataModel.readDataModelList(queryName, parameters, Barnyard.class);
      if (results.isEmpty()) {
        response.setError(new Error("VAL02", "No se encontraron datos para el filtro seleccionado", "proxy.BarnyardBean.Read"));
      } else {
        List<GatewayContent> records = contentFromList(results, Barnyard.class);
        response.getRecord().addAll(records);

        response.setError(new Error("0", "SUCCESS", "proxy.BarnyardBean.Read"));
        this.log.info("Read operation " + qryLogger + " executed by principal[" + getLoggedUser() + "] on BarnyardBean");
      }

    } catch (Exception e) {
      // something went wrong, alert the server and respond the client
      this.log.severe("Exception found while reading BarnyardBean");
      this.log.throwing(this.getClass().getCanonicalName(), "Read", e);

      response.setError(new Error("DB02", "Read exception: " + e.getMessage(), "proxy.BarnyardBean.Read"));
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
    Barnyard barnyard = null;
    try {
      barnyard = entityFromRequest(request, Barnyard.class);

      if (barnyard.getBarnyardId() == 0) {
        this.log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id del corral al intentar actualizar sus datos.", "proxy.Barnyard.Update"));
      } else {
        if (validateEntity(barnyard)) {
          dataModel.updateDataModel(barnyard);

          GatewayContent content = getContentFromEntity(barnyard, Barnyard.class);
          response.setUpdatedRecord(content);

          response.setError(new Error("0", "SUCCESS", "proxy.Barnyard.Update"));
          this.log.info("Barnyard[" + barnyard.toString() + "] updated by principal[" + getLoggedUser() + "]");
        } else {
          this.log.warning("Validation error:" + error_description);
          response.setError(new Error("VAL01", "Error de validación de datos:" + error_description, "proxy.BarnyardBean.Update"));
        }
      }

    } catch (Exception e) {
      this.log.severe("Exception found while updating Barnyard");
      this.log.throwing(this.getClass().getName(), "Update", e);

      if (e instanceof javax.persistence.PersistenceException)
        response
            .setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, "
                + "muy probablemente el corral que usted quiere actualizar ya existe en la base de datos.",
                "proxy.BarnyardBean.Update"));
      else {
        response.setError(new Error("DB02", "Error en la base de datos:[" + e.getMessage() + "]", "proxy.BarnyardBean.Update"));
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
    response.setError(new Error("VAL04", "No se permite la eliminación de Corrales por este medio.", "proxy.BarnyardBean.Delete"));
    
    return response;
  }
}
