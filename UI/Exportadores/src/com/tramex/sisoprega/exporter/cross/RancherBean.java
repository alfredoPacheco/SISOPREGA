/**
 * 
 */
package com.tramex.sisoprega.exporter.cross;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import javax.ejb.EJB;
import javax.faces.context.FacesContext;
import javax.servlet.http.HttpServletRequest;

import com.tramex.sisoprega.datamodel.DataModelException;
import com.tramex.sisoprega.datamodel.RemoteModelable;
import com.tramex.sisoprega.dto.EnterpriseRancher;
import com.tramex.sisoprega.dto.Rancher;

/**
 * USAGE COMMENT HERE
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * Jul 23, 2013     Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 * 
 */
public class RancherBean {

  private static Logger log = Logger.getLogger(RancherBean.class.getName());

  @EJB(lookup = "java:global/DataModel/BaseDataModel")
  private RemoteModelable dataModel;

  private boolean person = false;

  private Rancher personRancher;
  private EnterpriseRancher enterpriseRancher;

  /**
   * @return the person
   */
  public boolean isPerson() {
    try {
      if(personRancher == null && enterpriseRancher == null)
        resolveFromDb();
    } catch (DataModelException e) {
      e.printStackTrace();
    }

    return person;
  }

  /**
   * @param person
   *          the person to set
   */
  public void setPerson(boolean person) {
    this.person = person;
  }

  /**
   * @return the personRancher
   */
  public Rancher getPersonRancher() {
    return personRancher;
  }

  /**
   * @param personRancher
   *          the personRancher to set
   */
  public void setPersonRancher(Rancher personRancher) {
    this.personRancher = personRancher;
  }

  /**
   * @return the enterpriseRancher
   */
  public EnterpriseRancher getEnterpriseRancher() {
    return enterpriseRancher;
  }

  /**
   * @param enterpriseRancher
   *          the enterpriseRancher to set
   */
  public void setEnterpriseRancher(EnterpriseRancher enterpriseRancher) {
    this.enterpriseRancher = enterpriseRancher;
  }

  /**
   * @return the phoneOne
   */
  public boolean isPhoneOne() {
    if (isPerson() && personRancher != null)
      return personRancher.getSmsPhoneChosen() == 1;
    else
      return enterpriseRancher.getSmsPhoneChosen() == 1;
  }

  /**
   * @param phoneOne
   *          the phoneOne to set
   */
  public void setPhoneOne(boolean phoneOne) {

    if (phoneOne)
      if (isPerson() && personRancher != null)
        personRancher.setSmsPhoneChosen(1);
      else
        enterpriseRancher.setSmsPhoneChosen(1);
  }

  /**
   * @return the phoneTwo
   */
  public boolean isPhoneTwo() {
    if (isPerson() && personRancher != null)
      return personRancher.getSmsPhoneChosen() == 2;
    else
      return enterpriseRancher.getSmsPhoneChosen() == 2;
  }

  /**
   * @param phoneTwo
   *          the phoneTwo to set
   */
  public void setPhoneTwo(boolean phoneTwo) {
    if (phoneTwo)
      if (isPerson() && personRancher != null)
        personRancher.setSmsPhoneChosen(2);
      else
        enterpriseRancher.setSmsPhoneChosen(2);
  }

  /**
   * @return the phoneThree
   */
  public boolean isPhoneThree() {
    if (isPerson() && personRancher != null)
      return personRancher.getSmsPhoneChosen() == 3;
    else
      return enterpriseRancher.getSmsPhoneChosen() == 3;
  }

  /**
   * @param phoneThree
   *          the phoneThree to set
   */
  public void setPhoneThree(boolean phoneThree) {
    if (phoneThree)
      if (isPerson() && personRancher != null)
        personRancher.setSmsPhoneChosen(3);
      else
        enterpriseRancher.setSmsPhoneChosen(3);
  }

  public String updatePerson() {
    try {
      dataModel.updateDataModel(personRancher);
      return "/exporter/chDataConfirmation";
    } catch (DataModelException e) {
      return "/exporter/chDataFail";
    }
  }

  public String updateEnterprise() {
    try {
      dataModel.updateDataModel(enterpriseRancher);
      return "/exporter/chDataConfirmation";
    } catch (DataModelException e) {
      return "/exporter/chDataFail";
    }
  }

  private void resolveFromDb() throws DataModelException {
    person = false;

    log.fine("Resolving rancher from database.");

    FacesContext context = FacesContext.getCurrentInstance();
    HttpServletRequest request = (HttpServletRequest) context.getExternalContext().getRequest();

    String loggedinUser = request.getUserPrincipal().getName();
    log.fine("Loading rancher details for user [" + loggedinUser + "]");

    Map<String, Object> parameters = new HashMap<String, Object>();
    parameters.put("userName", loggedinUser);

    List<Rancher> personRanchers = dataModel.readDataModelList("RANCHER_BY_USER_NAME", parameters, Rancher.class);
    if (personRanchers.isEmpty()) {
      List<EnterpriseRancher> enterprises = dataModel.readDataModelList("ENTERPRISE_BY_USER_NAME", parameters,
          EnterpriseRancher.class);
      setEnterpriseRancher(enterprises.get(0));
      log.fine("Found [" + enterpriseRancher.getEnterpriseRancherId() + "] as enterprise");
    } else {
      setPersonRancher(personRanchers.get(0));
      person = true;
      log.fine("Found [" + personRancher.getRancherId() + "] as person");
    }
  }
}
