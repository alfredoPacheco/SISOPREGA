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

package com.tramex.sisoprega.proxy;

import com.tramex.sisoprega.gateway.response.BaseResponse;
import com.tramex.sisoprega.gateway.request.CreateRequest;
import com.tramex.sisoprega.gateway.request.ReadRequest;
import com.tramex.sisoprega.gateway.response.CreateResponse;
import com.tramex.sisoprega.gateway.response.ReadResponse;

/**
 * The interface presents the contract that each EJB should agree in order to
 * provide CRUD functionality.<BR/>
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 11/04/2012  Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 */
public interface Cruddable {

  /**
   * Create operation, will execute INSERTS through the JPA. In the response,
   * the generated id will be included.
   * 
   * @param request
   * @return
   */
  CreateResponse Create(CreateRequest request);

  /**
   * Read operation, will execute SELECTS through the JPA. Be aware of 2
   * possible results: single result (when using entity ID) and multiple result
   * (when using a filter definition).
   * 
   * @param request
   * @return
   */
  ReadResponse Read(ReadRequest request);
  
  /**
   * Updates record in database and returns updated record as read message.
   * @param request
   * @return
   */
  ReadResponse Update(CreateRequest request);

  /**
   * Removes a record from database
   * @param request
   * @return
   */
  BaseResponse Delete(ReadRequest request);
}
