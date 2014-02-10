/**
 * 
 */
package com.tramex.sisoprega.fs.cross;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import javax.ejb.EJB;

import com.tramex.sisoprega.datamodel.DataModelException;
import com.tramex.sisoprega.datamodel.RemoteModelable;
import com.tramex.sisoprega.dto.Ballance;

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
 * Feb 9, 2014     Alfredo Pacheco                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Alfredo Pacheco
 * 
 * 
 */
public class BallanceBean implements Serializable {
  private static final long serialVersionUID = 7991717521741091074L;

  private static Logger log = Logger.getLogger(BallanceBean.class.getName());

  @EJB(lookup = "java:global/DataModel/BaseDataModel")
  private RemoteModelable dataModel;

  public List<Ballance> getBallanceList() throws DataModelException {
    Map<String, Object> parameters = new HashMap<String, Object>();
    List<Ballance> listBallance = dataModel.readDataModelList("BALLANCE", parameters, Ballance.class);

    log.fine("[" + listBallance.size() + "] records retrieved from Ballance list");
    return listBallance;
  }

}
