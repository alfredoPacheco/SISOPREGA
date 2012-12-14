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
    log.entering(this.getClass().getCanonicalName(), "Create");

    CreateGatewayResponse response = new CreateGatewayResponse();
    MeasurementUnitEquivalence MeasurUnEqui = null;
    try {
      MeasurUnEqui = entityFromRequest(request, MeasurementUnitEquivalence.class);

      log.fine("Received MeasurementUnitEquivalence in request: " + MeasurUnEqui);

      if (validateEntity(MeasurUnEqui)) {
        log.finer("MeasurementUnitEquivalence succesfully validated");
        em.persist(MeasurUnEqui);
        log.finer("MeasurementUnitEquivalence persisted on database");
        em.flush();

        String sId = String.valueOf(MeasurUnEqui.getEquivalenceId());
        log.finer("Setting MeasurementUnitEquivalence id in response: " + sId);
        response.setGeneratedId(sId);
        response.setError(new Error("0", "SUCCESS", "proxy.MeasurementUnitEquivalenceBean.Create"));
      } else {
        log.warning("Validation error: " + error_description);
        response.setError(new Error("VAL01", "Error de validación: " + error_description, "proxy.MeasurementUnitEquivalenceBean.Create"));
      }

    } catch (Exception e) {
      log.severe("Exception found while creating MeasurementUnitEquivalenceBean");
      log.throwing(this.getClass().getName(), "Create", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01",
            "Los datos que usted ha intentado ingresar no son permitidos por la base de datos",
            "proxy.MeasurementUnitEquivalenceBean.Create"));
      else {
        response.setError(new Error("DB02", "Create exception: " + e.getMessage(), "proxy.MeasurementUnitEquivalenceBean.Create"));
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

    MeasurementUnitEquivalence equivalence = null;
    try {
      equivalence = entityFromRequest(request, MeasurementUnitEquivalence.class);
      log.fine("Got MeasurementUnit from request: " + equivalence);

      TypedQuery<MeasurementUnitEquivalence> readQuery = null;

      if (equivalence.getEquivalenceId() != 0) {
        readQuery = em.createNamedQuery("CAT_MEASUREMENTUNITEQUIVALENCE_BY_ID", MeasurementUnitEquivalence.class);
        log.fine("Query by unitId: " + equivalence.getEquivalenceId());
        readQuery.setParameter("equivalenceId", equivalence.getEquivalenceId());
      } else if(equivalence.getUnitSrc() != 0){
        readQuery = em.createNamedQuery("EQUIVALENCE_BY_UNIT_ID", MeasurementUnitEquivalence.class);;
        readQuery.setParameter("unitSrc", equivalence.getUnitSrc());
      }else{
        response.setError(new Error("VAL03", "El filtro especificado no es válido para las equivalencias de unidades de medida",
            "proxy.MeasurementUnitEquivalence.Read"));
        return response;
      }

      // Query the results through the jpa using a typedQuery
      List<MeasurementUnitEquivalence> queryResults = readQuery.getResultList();

      if (queryResults.isEmpty()) {
        response.setError(new Error("VAL02", "No se encontraron datos para el filtro seleccionado", "proxy.MeasurementUnitEquivalence.Read"));
      } else {
        // Add query results to response
        response.getRecord().addAll(contentFromList(queryResults, MeasurementUnitEquivalence.class));

        // Add success message to response
        response.setError(new Error("0", "SUCCESS", "proxy.MeasurementUnitEquivalence.Read"));
      }
    } catch (Exception e) {
      // something went wrong, alert the server and respond the client
      log.severe("Exception found while reading feed MeasurementUnitEquivalence");
      log.throwing(this.getClass().getCanonicalName(), "Read", e);

      response.setError(new Error("DB02", "Read exception: " + e.getMessage(), "proxy.MeasurementUnitEquivalence.Read"));
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
    MeasurementUnitEquivalence MeausUnEqui = null;
    try {
      MeausUnEqui = entityFromRequest(request, MeasurementUnitEquivalence.class);

      if (MeausUnEqui.getEquivalenceId() == 0) {
        log.warning("MUEU1 - Invalid MeasurementUnitEquivalence id");
        response.setError(new Error("MUEU1", "Invalid MeasurementUnitEquivalence id", "proxy.MeasurementUnitEquivalence.Update"));
      } else {
        if (validateEntity(MeausUnEqui)) {
          em.merge(MeausUnEqui);
          em.flush();

          GatewayContent content = getContentFromEntity(MeausUnEqui, MeasurementUnitEquivalence.class);
          response.setUpdatedRecord(content);

          response.setError(new Error("0", "SUCCESS", "proxy.MeasurementUnitEquivalence.Update"));
        } else {
          log.warning("Validation error: " + error_description);
          response.setError(new Error("MUEU2", "Validation error: " + error_description, "proxy.MeasurementUnitEquivalence.Update"));
        }
      }

    } catch (Exception e) {
      log.severe("Exception found while updating MeasurementUnitEquivalence");
      log.throwing(this.getClass().getName(), "Update", e);

      response.setError(new Error("MUEU3", "Update exception " + e.getMessage(), "proxy.MeasurementUnitEquivalence.Update"));
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
      MeasurementUnitEquivalence MeausUnEqui = entityFromRequest(request, MeasurementUnitEquivalence.class);
      if (MeausUnEqui.getEquivalenceId() == 0) {
        log.warning("MUED1 - Invalid MeasurementUnitEquivalence");
        response.setError(new Error("MUED1", "Invalid EquivalenceId", "proxy.MeasurementUnitEquivalence.Delete"));
      } else {
        TypedQuery<MeasurementUnitEquivalence> readQuery = em.createNamedQuery("CAT_MEASUREMENTUNITEQUIVALENCE_BY_ID",
            MeasurementUnitEquivalence.class);
        readQuery.setParameter("EquivalenceId", MeausUnEqui.getEquivalenceId());
        MeausUnEqui = readQuery.getSingleResult();
        em.merge(MeausUnEqui);
        em.remove(MeausUnEqui);
        em.flush();

        response.setError(new Error("0", "SUCCESS", "proxy.MeasurementUnitEquivalence.Delete"));
      }
    } catch (Exception e) {
      log.severe("Exception found while deleting contact");
      log.throwing(this.getClass().getName(), "Delete", e);

      response.setError(new Error("MUED2", "Delete exception: " + e.getMessage(), "proxy.MeasurementUnitEquivalence.Delete"));
    }

    log.exiting(this.getClass().getCanonicalName(), "Delete");
    return response;
  }

}
