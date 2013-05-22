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
 * Session Bean implementation class PenBean
 */
@Stateless
@RolesAllowed({"sisoprega_admin", "mx_usr", "us_usr", "rancher", "agency"})
public class PenBean extends BaseBean implements Cruddable {

  /*@DenyAll
  @Override
  public CreateResponse Create(CreateRequest request) {
    CreateResponse response = new CreateResponse();
    response.setError(new GatewayError("999", "Not allowed to create Pens this way", "Create"));
    return response;
  }*/
  
  /**
   * Default Read Operation, reads by Id or returns all.
   * @param request
   * @return
   * @throws BusinessLogicException
   */
  public ReadResponse Read(ReadRequest request) {
    log.entering(this.getClass().getCanonicalName(), "ReadResponse Read(ReadRequest)");
    
    ReadResponse response = new ReadResponse();
    try{
      String sLocationId = request.getFilter().getFieldValue("locationId");
      String queryName = request.getFilter().getEntity().toUpperCase();
      
      Map<String, Object> parameters = new HashMap<String, Object>();
      
      if(sLocationId != null){
        long locationId = Long.parseLong(sLocationId);
        parameters.put( "locationId", locationId);
        queryName = "PEN_BY_LOCATION";
      } else {
        return super.Read(request);
      }
      
      log.fine("Executing query [" + queryName + "]");
      
      List<?> results = dataModel.readDataModelList(queryName, parameters, Class.forName("com.tramex.sisoprega.dto." + request.getFilter().getEntity()));
      if(results.isEmpty()){
        log.info("Query resulted in empty list [" + queryName + "] by []");
        response.setError(new GatewayError("VAL02", "No se encontraron datos para el filtro seleccionado", "entity: [" + request.getFilter().getEntity() + "]"));
      }else{
        response.setParentRecord(getRecordsFromList(results, Class.forName("com.tramex.sisoprega.dto." + request.getFilter().getEntity())));
        response.setError(new GatewayError("0", "SUCCESS", "Read"));
      }
      
    }catch(Exception e){
      this.log.severe("Exception found while reading [" + request + "]");
      this.log.throwing(this.getClass().getCanonicalName(), "ReadResponse Read(ReadRequest)", e);
      
      response.setError(new GatewayError("DB02", "Read exception: " + e.getMessage(), "entity: [" + request.getFilter().getEntity() + "]"));
    }
    
    log.exiting(this.getClass().getCanonicalName(), "ReadResponse Read(ReadRequest)");
    return response;
  }
  
  /*@DenyAll
  @Override
  public ReadResponse Update(CreateRequest request) {
    ReadResponse response = new ReadResponse();
    response.setError(new GatewayError("999", "Not allowed to create Pens this way", "Create"));
    return response;
  }*/
  
  /*@DenyAll
  @Override
  public BaseResponse Delete(ReadRequest request) {
    BaseResponse response = new BaseResponse();
    response.setError(new GatewayError("999", "Not allowed to create Pens this way", "Create"));
    return response;
  }*/
}