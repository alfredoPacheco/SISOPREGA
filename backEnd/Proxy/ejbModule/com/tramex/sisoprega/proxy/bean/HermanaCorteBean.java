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
import com.tramex.sisoprega.dto.HermanaCorte;

/**
 * @author Jaime Figueroa
 *
 */
public class HermanaCorteBean extends BaseBean implements Cruddable {

  @Override
  public CreateGatewayResponse Create(GatewayRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "CreateGatewayResponse Create(GatewayRequest request)");
    CreateGatewayResponse response = new CreateGatewayResponse();
    HermanaCorte hermanaCorte = null;
    try {
      hermanaCorte = entityFromRequest(request, HermanaCorte.class);

      this.log.fine("Received Hermana in request: " + hermanaCorte);

      if (validateEntity(hermanaCorte)) {
        this.log.finer("Hermana succesfully validated");
        dataModel.createDataModel(hermanaCorte);

        String sId = String.valueOf(hermanaCorte.getBarnyardId());
        this.log.finer("Setting FeedOrder id in response: " + sId);
        response.setGeneratedId(sId);
        response.setError(new Error("0", "SUCCESS", "proxy.HermanaCorteBean.Create"));
        this.log.info("HermanaCorte [" + hermanaCorte.toString() + "] created by principal[" + getLoggedUser() + "]");
      } else {
        this.log.warning("Error de validación: " + error_description);
        response.setError(new Error("VAL01", "Error de validación: " + error_description, "proxy.FeedOrderBean.Create"));
      }

    } catch (Exception e) {
      this.log.severe("Exception found while creating HermanaCorteBean");
      this.log.throwing(this.getClass().getName(), "CreateGatewayResponse Create(GatewayRequest request)", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos",
            "proxy.HermanaCorteBean.Create"));
      else {
        response.setError(new Error("DB02", "Create exception: " + e.getMessage(), "proxy.HermanaCorteBean.Create"));
      }
    }

    this.log.exiting(this.getClass().getCanonicalName(), "CreateGatewayResponse Create(GatewayRequest request)");
    return response;
  }

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
    HermanaCorte hermanaCorte = null;
    try {
      hermanaCorte = entityFromRequest(request, HermanaCorte.class);
      
      if (hermanaCorte.getCorte() == 0) {
        this.log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id del registro de exportación al intentar actualizar sus datos.",
            "proxy.HermanaCorteBean.Update"));
      } else {
        if (validateEntity(hermanaCorte)) {
          dataModel.updateDataModel(hermanaCorte);

          GatewayContent content = getContentFromEntity(hermanaCorte, HermanaCorte.class);
          response.setUpdatedRecord(content);

          response.setError(new Error("0", "SUCCESS", "proxy.HermanaCorteBean.Update"));
          this.log.info("HermanaCorte [" + hermanaCorte.toString() + "] updated by principal[" + getLoggedUser() + "]");
        } else {
          this.log.warning("Validation error:" + error_description);
          response
              .setError(new Error("VAL01", "Error de validación de datos:" + error_description, "proxy.HermanaCorteBean.Update"));
        }
      }

    } catch (Exception e) {
      this.log.severe("Exception found while updating HermanaCorte");
      this.log.throwing(this.getClass().getName(), "UpdateGatewayResponse Update(GatewayRequest request)", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos",
            "proxy.HermanaCorteBean.Update"));
      else {
        response.setError(new Error("DB02", "Error en la base de datos:[" + e.getMessage() + "]", "proxy.HermanaCorteBean.Update"));
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
      HermanaCorte hermanaCorte = entityFromRequest(request, HermanaCorte.class);
      if (hermanaCorte.getHermanaId() == 0) {
        this.log.warning("VAL04 - Entity ID Omission.");

        response.setError(new Error("VAL04", "Se ha omitido el id de la orden del registro de exportación al intentar eliminar el registro.",
            "proxy.HermanaCorteBean.Delete"));
      } else {
        hermanaCorte = dataModel.readSingleDataModel("HERMANA_BY_ID", "hermanaId", hermanaCorte.getHermanaId(), HermanaCorte.class);
        this.log.info("Deleting HermanaCorte [" + hermanaCorte.toString() + "] by principal[" + getLoggedUser() + "]");
        dataModel.deleteDataModel(hermanaCorte, getLoggedUser());

        response.setError(new Error("0", "SUCCESS", "proxy.HermanaCorteBean.Delete"));
      }
    } catch (Exception e) {
      this.log.severe("Exception found while deleting HermanaCorte");
      this.log.throwing(this.getClass().getName(), "BaseResponse Delete(GatewayRequest request)", e);

      response.setError(new Error("DEL01",
          "Error al intentar borrar datos, es probable que esta entidad tenga otras entidades relacionadas",
          "proxy.HermanaCorteBean.Delete"));
    }

    this.log.exiting(this.getClass().getCanonicalName(), "BaseResponse Delete(GatewayRequest request)");
    return response;
  }

}
