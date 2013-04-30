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
import com.tramex.sisoprega.dto.ExpenseConcept;

/**
 * @author Jaime Figueroa
 *
 */
public class ExpenseConceptBean extends BaseBean implements Cruddable {

  @Override
  public CreateGatewayResponse Create(GatewayRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "CreateGatewayResponse Create(GatewayRequest request)");
    CreateGatewayResponse response = new CreateGatewayResponse();
    ExpenseConcept expenseConcept = null;
    try {
      expenseConcept = entityFromRequest(request, ExpenseConcept.class);

      this.log.fine("Received ExpenseConcept in request: " + expenseConcept);

      if (validateEntity(expenseConcept)) {
        this.log.finer("Hermana succesfully validated");
        dataModel.createDataModel(expenseConcept);

        String sId = String.valueOf(expenseConcept.getConceptId());
        this.log.finer("Setting FeedOrder id in response: " + sId);
        response.setGeneratedId(sId);
        response.setError(new Error("0", "SUCCESS", "proxy.ExpenseConceptBean.Create"));
        this.log.info("ExpenseConcept [" + expenseConcept.toString() + "] created by principal[" + getLoggedUser() + "]");
      } else {
        this.log.warning("Error de validación: " + error_description);
        response.setError(new Error("VAL01", "Error de validación: " + error_description, "proxy.FeedOrderBean.Create"));
      }

    } catch (Exception e) {
      this.log.severe("Exception found while creating ExpenseConceptBean");
      this.log.throwing(this.getClass().getName(), "CreateGatewayResponse Create(GatewayRequest request)", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos",
            "proxy.ExpenseConceptBean.Create"));
      else {
        response.setError(new Error("DB02", "Create exception: " + e.getMessage(), "proxy.ExpenseConceptBean.Create"));
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
    ExpenseConcept expenseConcept = null;
    try {
      expenseConcept = entityFromRequest(request, ExpenseConcept.class);
      
      if (expenseConcept.getConceptId() == 0) {
        this.log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id del registro de exportación al intentar actualizar sus datos.",
            "proxy.ExpenseConceptBean.Update"));
      } else {
        if (validateEntity(expenseConcept)) {
          dataModel.updateDataModel(expenseConcept);

          GatewayContent content = getContentFromEntity(expenseConcept, ExpenseConcept.class);
          response.setUpdatedRecord(content);

          response.setError(new Error("0", "SUCCESS", "proxy.ExpenseConceptBean.Update"));
          this.log.info("ExpenseConcept [" + expenseConcept.toString() + "] updated by principal[" + getLoggedUser() + "]");
        } else {
          this.log.warning("Validation error:" + error_description);
          response
              .setError(new Error("VAL01", "Error de validación de datos:" + error_description, "proxy.ExpenseConceptBean.Update"));
        }
      }

    } catch (Exception e) {
      this.log.severe("Exception found while updating ExpenseConcept");
      this.log.throwing(this.getClass().getName(), "UpdateGatewayResponse Update(GatewayRequest request)", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos",
            "proxy.ExpenseConceptBean.Update"));
      else {
        response.setError(new Error("DB02", "Error en la base de datos:[" + e.getMessage() + "]", "proxy.ExpenseConceptBean.Update"));
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
      ExpenseConcept hermana = entityFromRequest(request, ExpenseConcept.class);
      if (hermana.getConceptId() == 0) {
        this.log.warning("VAL04 - Entity ID Omission.");

        response.setError(new Error("VAL04", "Se ha omitido el id de la orden del registro de exportación al intentar eliminar el registro.",
            "proxy.HermanaBean.Delete"));
      } else {
        hermana = dataModel.readSingleDataModel("HERMANA_BY_ID", "ConceptId", hermana.getConceptId(), ExpenseConcept.class);
        this.log.info("Deleting ExpenseConcept [" + hermana.toString() + "] by principal[" + getLoggedUser() + "]");
        dataModel.deleteDataModel(hermana, getLoggedUser());

        response.setError(new Error("0", "SUCCESS", "proxy.ExpenseConceptBean.Delete"));
      }
    } catch (Exception e) {
      this.log.severe("Exception found while deleting ExpenseConcept");
      this.log.throwing(this.getClass().getName(), "BaseResponse Delete(GatewayRequest request)", e);

      response.setError(new Error("DEL01",
          "Error al intentar borrar datos, es probable que esta entidad tenga otras entidades relacionadas",
          "proxy.ExpenseConceptBean.Delete"));
    }

    this.log.exiting(this.getClass().getCanonicalName(), "BaseResponse Delete(GatewayRequest request)");
    return response;
  }

}
