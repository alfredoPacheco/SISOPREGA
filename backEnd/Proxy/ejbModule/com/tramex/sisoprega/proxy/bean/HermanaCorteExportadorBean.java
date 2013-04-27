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

import com.tramex.sisoprega.common.BaseResponse;
import com.tramex.sisoprega.common.CreateGatewayResponse;
import com.tramex.sisoprega.common.Error;
import com.tramex.sisoprega.common.GatewayContent;
import com.tramex.sisoprega.common.GatewayRequest;
import com.tramex.sisoprega.common.ReadGatewayResponse;
import com.tramex.sisoprega.common.UpdateGatewayResponse;
import com.tramex.sisoprega.common.crud.Cruddable;
import com.tramex.sisoprega.dto.HermanaCorteExportador;

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
public class HermanaCorteExportadorBean extends BaseBean implements Cruddable {

  @Override
  public CreateGatewayResponse Create(GatewayRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "CreateGatewayResponse Create(GatewayRequest request)");
    CreateGatewayResponse response = new CreateGatewayResponse();
    HermanaCorteExportador hermanaCorteExportador = null;
    try {
      hermanaCorteExportador = entityFromRequest(request, HermanaCorteExportador.class);

      this.log.fine("Received HermanaCorteExportador in request: " + hermanaCorteExportador);

      if (validateEntity(hermanaCorteExportador)) {
        this.log.finer("HermanaCorteExportador succesfully validated");
        dataModel.createDataModel(hermanaCorteExportador);

        String sId = String.valueOf(hermanaCorteExportador.getCorteExpo());
        this.log.finer("Setting FeedOrder id in response: " + sId);
        response.setGeneratedId(sId);
        response.setError(new Error("0", "SUCCESS", "proxy.HermanaCorteExportadorBean.Create"));
        this.log.info("HermanaCorteExportador [" + hermanaCorteExportador.toString() + "] created by principal[" + getLoggedUser() + "]");
      } else {
        this.log.warning("Error de validación: " + error_description);
        response.setError(new Error("VAL01", "Error de validación: " + error_description, "proxy.FeedOrderBean.Create"));
      }

    } catch (Exception e) {
      this.log.severe("Exception found while creating HermanaCorteExportadorBean");
      this.log.throwing(this.getClass().getName(), "CreateGatewayResponse Create(GatewayRequest request)", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos",
            "proxy.HermanaCorteExportadorBean.Create"));
      else {
        response.setError(new Error("DB02", "Create exception: " + e.getMessage(), "proxy.HermanaCorteExportadorBean.Create"));
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
    // TODO Auto-generated method stub
    return null;
  }

  /* (non-Javadoc)
   * @see com.tramex.sisoprega.common.crud.Cruddable#Update(com.tramex.sisoprega.common.GatewayRequest)
   */
  @Override
  public UpdateGatewayResponse Update(GatewayRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "UpdateGatewayResponse Update(GatewayRequest request)");
    UpdateGatewayResponse response = new UpdateGatewayResponse();
    HermanaCorteExportador hermanaCorteExportador = null;
    try {
      hermanaCorteExportador = entityFromRequest(request, HermanaCorteExportador.class);
      
      if (hermanaCorteExportador.getCorteExpo() == 0) {
        this.log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id del registro de exportación al intentar actualizar sus datos.",
            "proxy.HermanaCorteExportadorBean.Update"));
      } else {
        if (validateEntity(hermanaCorteExportador)) {
          dataModel.updateDataModel(hermanaCorteExportador);

          GatewayContent content = getContentFromEntity(hermanaCorteExportador, HermanaCorteExportador.class);
          response.setUpdatedRecord(content);

          response.setError(new Error("0", "SUCCESS", "proxy.HermanaCorteExportadorBean.Update"));
          this.log.info("HermanaCorteExportador [" + hermanaCorteExportador.toString() + "] updated by principal[" + getLoggedUser() + "]");
        } else {
          this.log.warning("Validation error:" + error_description);
          response
              .setError(new Error("VAL01", "Error de validación de datos:" + error_description, "proxy.HermanaCorteExportadorBean.Update"));
        }
      }

    } catch (Exception e) {
      this.log.severe("Exception found while updating HermanaCorteExportador");
      this.log.throwing(this.getClass().getName(), "UpdateGatewayResponse Update(GatewayRequest request)", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos",
            "proxy.HermanaCorteExportadorBean.Update"));
      else {
        response.setError(new Error("DB02", "Error en la base de datos:[" + e.getMessage() + "]", "proxy.HermanaCorteExportadorBean.Update"));
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
      HermanaCorteExportador hermanaCorteExportador = entityFromRequest(request, HermanaCorteExportador.class);
      if (hermanaCorteExportador.getCorteExpo() == 0) {
        this.log.warning("VAL04 - Entity ID Omission.");

        response.setError(new Error("VAL04", "Se ha omitido el id de la orden del registro de exportación al intentar eliminar el registro.",
            "proxy.HermanaCorteExportadoraBean.Delete"));
      } else {
        hermanaCorteExportador = dataModel.readSingleDataModel("HERMANA_BY_ID", "hermanaId", hermanaCorteExportador.getHermanaId(), HermanaCorteExportador.class);
        this.log.info("Deleting HermanaCorteExportador [" + hermanaCorteExportador.toString() + "] by principal[" + getLoggedUser() + "]");
        dataModel.deleteDataModel(hermanaCorteExportador, getLoggedUser());

        response.setError(new Error("0", "SUCCESS", "proxy.HermanaCorteExportadorBean.Delete"));
      }
    } catch (Exception e) {
      this.log.severe("Exception found while deleting HermanaCorteExportador");
      this.log.throwing(this.getClass().getName(), "BaseResponse Delete(GatewayRequest request)", e);

      response.setError(new Error("DEL01",
          "Error al intentar borrar datos, es probable que esta entidad tenga otras entidades relacionadas",
          "proxy.HermanaCorteExportadorBean.Delete"));
    }

    this.log.exiting(this.getClass().getCanonicalName(), "BaseResponse Delete(GatewayRequest request)");
    return response;
  }
}
