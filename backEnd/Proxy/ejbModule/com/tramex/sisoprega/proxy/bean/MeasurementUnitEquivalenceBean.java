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
        response.setError(new Error("MUEC1", "Validation error: " + error_description,
            "proxy.MeasurementUnitEquivalenceBean.Create"));
      }

    } catch (Exception e) {
      log.severe("Exception found while creating MeasurementUnitEquivalenceBean");
      log.throwing(this.getClass().getName(), "Create", e);

      response.setError(new Error("MUEC2", "Create exception: " + e.getMessage(), "proxy.MeasurementUnitEquivalenceBean.Create"));
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
    // TODO Auto-generated method stub
    return null;
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
