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

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.TypedQuery;

import com.tramex.sisoprega.common.BaseResponse;
import com.tramex.sisoprega.common.CreateGatewayResponse;
import com.tramex.sisoprega.common.Error;
import com.tramex.sisoprega.common.GatewayContent;
import com.tramex.sisoprega.common.GatewayRequest;
import com.tramex.sisoprega.common.ReadGatewayResponse;
import com.tramex.sisoprega.common.UpdateGatewayResponse;
import com.tramex.sisoprega.common.crud.Cruddable;
import com.tramex.sisoprega.dto.Food;

/**
 * This proxy knows the logic to evaluate Feed Order Details information and the
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
 * 12/08/2012  Jaime Figueroa                Initial Version.
 * 12/13/2012  Diego Torres                  Activate read operation.
 * ====================================================================================
 * </PRE>
 * @author Jaime Figueroa
 * 
 */
@Stateless
public class FoodBean extends BaseBean implements Cruddable {

  /*
   * (non-Javadoc)
   * 
   * @see
   * com.tramex.sisoprega.common.crud.Cruddable#Create(com.tramex.sisoprega.
   * common.GatewayRequest)
   */
  @Override
  public CreateGatewayResponse Create(GatewayRequest request) {
    log.entering(this.getClass().getCanonicalName(), "Create");

    CreateGatewayResponse response = new CreateGatewayResponse();
    Food food = null;
    try {
      food = entityFromRequest(request, Food.class);

      log.fine("Received Food in request: " + food);

      if (validateEntity(food)) {
        log.finer("Food succesfully validated");
        em.persist(food);
        log.finer("Food persisted on database");
        em.flush();

        String sId = String.valueOf(food.getFoodId());
        log.finer("Setting Food id in response: " + sId);
        response.setGeneratedId(sId);
        response.setError(new Error("0", "SUCCESS", "proxy.FoodBean.Create"));
      } else {
        log.warning("Error de validación: " + error_description);
        response.setError(new Error("VAL01", "Error de validación: " + error_description, "proxy.FoodBean.Create"));
      }

    } catch (Exception e) {
      log.severe("Exception found while creating FoodBean");
      log.throwing(this.getClass().getName(), "Create", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, "
            + "muy probablemente este alimento ya ha sido registrado.", "proxy.FoodBean.Create"));
      else {
        response.setError(new Error("DB02", "Create exception: " + e.getMessage(), "proxy.FoodBean.Create"));
      }
    }

    log.exiting(this.getClass().getCanonicalName(), "Create");
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
    log.entering(this.getClass().getCanonicalName(), "Read");

    ReadGatewayResponse response = new ReadGatewayResponse();
    response.setEntityName(request.getEntityName());

    Food food = null;
    try {
      food = entityFromRequest(request, Food.class);
      log.fine("Got food from request: " + food);

      TypedQuery<Food> readQuery = null;

      if (food.getFoodId() != 0) {
        readQuery = em.createNamedQuery("CAT_FOOD_BY_ID", Food.class);
        log.fine("Query by Id: " + food.getFoodId());
        readQuery.setParameter("fodId", food.getFoodId());
      } else {
        readQuery = em.createNamedQuery("ALL_FOOD", Food.class);
      }

      // Query the results through the jpa using a typedQuery
      List<Food> queryResults = readQuery.getResultList();

      if (queryResults.isEmpty()) {
        response.setError(new Error("VAL02", "No se encontraron datos para el filtro seleccionado", "proxy.FoodBean.Read"));
      } else {
        // Add query results to response
        response.getRecord().addAll(contentFromList(queryResults, Food.class));

        // Add success message to response
        response.setError(new Error("0", "SUCCESS", "proxy.Food.Read"));
      }
    } catch (Exception e) {
      // something went wrong, alert the server and respond the client
      log.severe("Exception found while reading feed food");
      log.throwing(this.getClass().getCanonicalName(), "Read", e);

      response.setError(new Error("DB02", "Read exception: " + e.getMessage(), "proxy.FoodBean.Read"));
    }

    // end and respond.
    log.exiting(this.getClass().getCanonicalName(), "Read");
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
    log.entering(this.getClass().getCanonicalName(), "Update");
    UpdateGatewayResponse response = new UpdateGatewayResponse();
    Food food = null;
    try {
      food = entityFromRequest(request, Food.class);

      if (food.getFoodId() == 0) {
        log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id del corral al intentar actualizar sus datos.",
            "proxy.Food.Update"));
      } else {
        if (validateEntity(food)) {
          em.merge(food);
          em.flush();

          GatewayContent content = getContentFromEntity(food, Food.class);
          response.setUpdatedRecord(content);

          response.setError(new Error("0", "SUCCESS", "proxy.Food.Update"));
        } else {
          log.warning("Validation error:" + error_description);
          response.setError(new Error("VAL01", "Error de validación de datos:" + error_description, "proxy.FoodBean.Update"));
        }
      }

    } catch (Exception e) {
      log.severe("Exception found while updating Food");
      log.throwing(this.getClass().getName(), "Update", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, "
            + "muy probablemente este alimento ya ha sido registrado.", "proxy.FoodBean.Update"));
      else {
        response.setError(new Error("DB02", "Error en la base de datos:[" + e.getMessage() + "]", "proxy.FoodBean.Update"));
      }
    }

    log.exiting(this.getClass().getCanonicalName(), "Update");
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
    log.entering(this.getClass().getCanonicalName(), "Delete");
    BaseResponse response = new BaseResponse();

    try {
      Food food = entityFromRequest(request, Food.class);
      if (food.getFoodId() == 0) {
        log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id del corral al intentar eliminar el registro.",
            "proxy.Food.Delete"));
      } else {
        TypedQuery<Food> readQuery = em.createNamedQuery("CAT_FOOD_BY_ID", Food.class);
        readQuery.setParameter("foodId", food.getFoodId());
        food = readQuery.getSingleResult();
        em.merge(food);
        em.remove(food);
        em.flush();

        response.setError(new Error("0", "SUCCESS", "proxy.Food.Delete"));
      }
    } catch (Exception e) {
      log.severe("Exception found while deleting Food");
      log.throwing(this.getClass().getName(), "Delete", e);

      response.setError(new Error("DEL01",
          "Error al intentar borrar datos, es probable que esta entidad tenga otras entidades relacionadas, "
              + "por ejemplo, muy probablemente un corral ya ha sido alimentado con este tipo de comida.",
          "proxy.Food.Delete"));
    }

    log.exiting(this.getClass().getCanonicalName(), "Delete");
    return response;
  }

}
