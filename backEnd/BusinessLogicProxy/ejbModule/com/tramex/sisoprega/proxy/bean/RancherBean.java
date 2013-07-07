package com.tramex.sisoprega.proxy.bean;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.security.RolesAllowed;
import javax.ejb.Stateless;

import com.tramex.sisoprega.gateway.GatewayError;
import com.tramex.sisoprega.gateway.request.ReadRequest;
import com.tramex.sisoprega.gateway.response.ReadResponse;
import com.tramex.sisoprega.proxy.Cruddable;
import com.tramex.sisoprega.proxy.common.BaseBean;

/**
 * Session Bean implementation class RancherBean
 */
@Stateless
@RolesAllowed({"sisoprega_admin", "mx_usr", "us_usr", "rancher", "agency"})
public class RancherBean extends BaseBean implements Cruddable {
  @Override
  public ReadResponse Read(ReadRequest request) {
    log.entering(this.getClass().getCanonicalName(), "ReadResponse Read(ReadRequest)");

    ReadResponse response = new ReadResponse();
    try {
      String sUserName = request.getFilter().getFieldValue("userName");
      String queryName = "";
      Map<String, Object> parameters = new HashMap<String, Object>();

      if (sUserName != null) {
        parameters.put("userName", sUserName);
        queryName = "RANCHER_BY_USER_NAME";
      } else {
        return super.Read(request);
      }

      log.fine("Executing query [" + queryName + "]");

      List<?> results = dataModel.readDataModelList(queryName, parameters,
          Class.forName("com.tramex.sisoprega.dto." + request.getFilter().getEntity()));
      if (results.isEmpty()) {
        log.info("Query resulted in empty list [" + queryName + "] by []");
        response.setError(new GatewayError("VAL02", "No se encontraron datos para el filtro seleccionado", "entity: ["
            + request.getFilter().getEntity() + "]"));
      } else {
        response.setParentRecord(getRecordsFromList(results,
            Class.forName("com.tramex.sisoprega.dto." + request.getFilter().getEntity())));
        response.setError(new GatewayError("0", "SUCCESS", "Read"));
      }
    } catch (Exception e) {
      this.log.severe("Exception found while reading [" + request + "]");
      this.log.throwing(this.getClass().getCanonicalName(), "ReadResponse Read(ReadRequest)", e);

      response.setError(new GatewayError("DB02", "Read exception: " + e.getMessage(), "entity: ["
          + request.getFilter().getEntity() + "]"));
    }

    log.exiting(this.getClass().getCanonicalName(), "ReadResponse Read(ReadRequest)");
    return response;
  }
}
