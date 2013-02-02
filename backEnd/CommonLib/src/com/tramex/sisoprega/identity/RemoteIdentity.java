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
package com.tramex.sisoprega.identity;

import com.tramex.sisoprega.identity.dto.User;

/**
 * Interfaces the data model for objects with database.
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * Feb 1, 2013     Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 * 
 */
public interface RemoteIdentity {
  void createUser(User user) throws IdentityManagerException;

  void resetPassword(String userName, String newPassword) throws IdentityManagerException;

  void addGroup(String userName, String groupName) throws IdentityManagerException;

  void removeGroup(String userName, String groupName) throws IdentityManagerException;

  boolean validateCurrentPassword(String userName, String password) throws IdentityManagerException;
}
