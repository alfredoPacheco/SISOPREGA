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

package com.tramex.sisoprega.common.crud;

import com.tramex.sisoprega.common.BaseResponse;
import com.tramex.sisoprega.common.CreateGatewayResponse;
import com.tramex.sisoprega.common.GatewayRequest;
import com.tramex.sisoprega.common.ReadGatewayResponse;
import com.tramex.sisoprega.common.UpdateGatewayResponse;

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
     * Create operation, will execute the INSERT through the JPA.
     * 
     * @param request
     * @return
     */
    CreateGatewayResponse Create(GatewayRequest request);

    /**
     * Read operation, will execute SELECTS through the JPA. Be aware of 2
     * possible results: single result (when using entity ID) and multiple
     * result (when using a filter definition).
     * 
     * @param request
     * @return
     */
    ReadGatewayResponse Read(GatewayRequest request);

    /**
     * Update operation, will execute the UPDATE through the JPA.
     * 
     * @param request
     * @return
     */
    UpdateGatewayResponse Update(GatewayRequest request);

    /**
     * Delete operation, will execute the DELETE through the JPA using the
     * entity ID.
     * 
     * @param request
     * @return
     */
    BaseResponse Delete(GatewayRequest request);
}