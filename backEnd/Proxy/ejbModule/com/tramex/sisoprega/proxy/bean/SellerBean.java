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

import javax.annotation.security.DeclareRoles;
import javax.ejb.Stateless;

import com.tramex.sisoprega.common.BaseResponse;
import com.tramex.sisoprega.common.CreateGatewayResponse;
import com.tramex.sisoprega.common.Error;
import com.tramex.sisoprega.common.GatewayContent;
import com.tramex.sisoprega.common.GatewayRequest;
import com.tramex.sisoprega.common.ReadGatewayResponse;
import com.tramex.sisoprega.common.UpdateGatewayResponse;
import com.tramex.sisoprega.common.crud.Cruddable;
import com.tramex.sisoprega.dto.Seller;

/**
 * This proxy knows the logic to evaluate sellers and the way to the database
 * in order to save their data. Also, it is contained in EJB container, we can
 * apply security and life cycle methods for resources.<BR/>
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 *             Jaime Figueroa                 Initial Version.
 * 05/08/2013  Diego Torres                 Add flower box and read operation.
 * ====================================================================================
 * </PRE>
 * 
 * @author Jaime Figueroa
 * 
 */
@Stateless
@DeclareRoles({ "sisoprega_admin", "mx_usr", "rancher" })
public class SellerBean extends BaseBean implements Cruddable {

  @Override
  public CreateGatewayResponse Create(GatewayRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "CreateGatewayResponse Create(GatewayRequest request)");
    CreateGatewayResponse response = new CreateGatewayResponse();
    Seller seller = null;
    try {
      seller = entityFromRequest(request, Seller.class);

      this.log.fine("Received Hermana in request: " + seller);

      if (validateEntity(seller)) {
        this.log.finer("Seller succesfully validated");
        dataModel.createDataModel(seller);

        String sId = String.valueOf(seller.getSellerId());
        this.log.finer("Setting FeedOrder id in response: " + sId);
        response.setGeneratedId(sId);
        response.setError(new Error("0", "SUCCESS", "proxy.SellerBean.Create"));
        this.log.info("Seller [" + seller.toString() + "] created by principal[" + getLoggedUser() + "]");
      } else {
        this.log.warning("Error de validación: " + error_description);
        response.setError(new Error("VAL01", "Error de validación: " + error_description, "proxy.FeedOrderBean.Create"));
      }

    } catch (Exception e) {
      this.log.severe("Exception found while creating SellerBean");
      this.log.throwing(this.getClass().getName(), "CreateGatewayResponse Create(GatewayRequest request)", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos",
            "proxy.SellerBean.Create"));
      else {
        response.setError(new Error("DB02", "Create exception: " + e.getMessage(), "proxy.SellerBean.Create"));
      }
    }

    this.log.exiting(this.getClass().getCanonicalName(), "CreateGatewayResponse Create(GatewayRequest request)");
    return response;
  }

  @Override
  public ReadGatewayResponse Read(GatewayRequest request) {
    this.log.entering(RancherBean.class.getCanonicalName(), "Read");

    ReadGatewayResponse response = new ReadGatewayResponse();
    response.setEntityName(request.getEntityName());

    Seller seller = null;
    try {
      seller = entityFromRequest(request, Seller.class);

      this.log.fine("Got seller from request: " + seller);

      String qryLogger = "";
      String queryName = "";
      Map<String, Object> parameters = new HashMap<String, Object>();
      if (seller.getSellerId() != 0) {
        queryName = "SELLER_BY_ID";
        this.log.fine("Query by Id [" + seller.getSellerId() + "]");
        parameters.put("sellerId", seller.getSellerId());
        qryLogger = "By sellerId [" + seller.getSellerId() + "]";
      } else {
        // No other filter expected for ranchers, only by Id
        queryName = "ALL_SELLERS";
        qryLogger = "By ALL_SELLERS";
      }

      // Query the results through the persistence
      // Using a typedQuery to retrieve a list of Ranchers.
      List<Seller> queryResults = dataModel.readDataModelList(queryName, parameters, Seller.class);

      if (queryResults.isEmpty()) {
        response.setError(new Error("VAL02", "No se encontraron datos para el filtro seleccionado", "proxy.RancherBean.Read"));
      } else {
        // Add query results to response
        response.getRecord().addAll(contentFromList(queryResults, Seller.class));

        // Add success message to response
        response.setError(new Error("0", "SUCCESS", "proxy.Seller.Read"));
        this.log.info("Read operation " + qryLogger + " executed by principal[" + getLoggedUser() + "] on SellerBean");
      }
    } catch (Exception e) {
      // something went wrong, alert the server and respond the client
      this.log.severe("Exception found while reading seller filter");
      this.log.throwing(this.getClass().getName(), "Read", e);

      response.setError(new Error("DB02", "Error en la base de datos:[" + e.getMessage() + "]", "proxy.Seller.Read"));
    }

    // end and respond.
    this.log.exiting(this.getClass().getCanonicalName(), "Read");
    return response;
  }

  /* (non-Javadoc)
   * @see com.tramex.sisoprega.common.crud.Cruddable#Update(com.tramex.sisoprega.common.GatewayRequest)
   */
  @Override
  public UpdateGatewayResponse Update(GatewayRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "UpdateGatewayResponse Update(GatewayRequest request)");
    UpdateGatewayResponse response = new UpdateGatewayResponse();
    Seller sellera = null;
    try {
      sellera = entityFromRequest(request, Seller.class);
      
      if (sellera.getSellerId() == 0) {
        this.log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id del registro de proveedor al intentar actualizar sus datos.",
            "proxy.SellerBean.Update"));
      } else {
        if (validateEntity(sellera)) {
          dataModel.updateDataModel(sellera);

          GatewayContent content = getContentFromEntity(sellera, Seller.class);
          response.setUpdatedRecord(content);

          response.setError(new Error("0", "SUCCESS", "proxy.SellerBean.Update"));
          this.log.info("Seller [" + sellera.toString() + "] updated by principal[" + getLoggedUser() + "]");
        } else {
          this.log.warning("Validation error:" + error_description);
          response
              .setError(new Error("VAL01", "Error de validación de datos:" + error_description, "proxy.SellerBean.Update"));
        }
      }

    } catch (Exception e) {
      this.log.severe("Exception found while updating Seller");
      this.log.throwing(this.getClass().getName(), "UpdateGatewayResponse Update(GatewayRequest request)", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01", "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos",
            "proxy.SellerBean.Update"));
      else {
        response.setError(new Error("DB02", "Error en la base de datos:[" + e.getMessage() + "]", "proxy.SellerBean.Update"));
      }
    }

    this.log.exiting(this.getClass().getCanonicalName(), "UpdateGatewayResponse Update(GatewayRequest request)");
    return response;
  }

  /* (non-Javadoc)
   * @see com.tramex.sisoprega.common.crud.Cruddable#Delete(com.tramex.sisoprega.common.GatewayRequest)
   */
  @Override
  public BaseResponse Delete(GatewayRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "BaseResponse Delete(GatewayRequest request)");
    BaseResponse response = new BaseResponse();

    try {
      Seller seller = entityFromRequest(request, Seller.class);
      if (seller.getSellerId() == 0) {
        this.log.warning("VAL04 - Entity ID Omission.");

        response.setError(new Error("VAL04", "Se ha omitido el id de la orden del registro de exportación al intentar eliminar el registro.",
            "proxy.SellerBean.Delete"));
      } else {
        seller = dataModel.readSingleDataModel("SELLER_BY_ID", "sellerId", seller.getSellerId(), Seller.class);
        this.log.info("Deleting Seller [" + seller.toString() + "] by principal[" + getLoggedUser() + "]");
        dataModel.deleteDataModel(seller, getLoggedUser());

        response.setError(new Error("0", "SUCCESS", "proxy.SellerBean.Delete"));
      }
    } catch (Exception e) {
      this.log.severe("Exception found while deleting Seller");
      this.log.throwing(this.getClass().getName(), "BaseResponse Delete(GatewayRequest request)", e);

      response.setError(new Error("DEL01",
          "Error al intentar borrar datos, es probable que esta entidad tenga otras entidades relacionadas",
          "proxy.SellerBean.Delete"));
    }

    this.log.exiting(this.getClass().getCanonicalName(), "BaseResponse Delete(GatewayRequest request)");
    return response;
  }

}
