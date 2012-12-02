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
package com.tramex.sisoprega.dto;

import java.util.Date;

/**
 *  Defines the model for Tokens on database for java beans.<BR/>
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 11/30/2012  Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * @author Diego Torres
 *
 */
public class Tokenizer {
  private long tokenId;
  private long userId;
  private Date dueDate;
  private String sessionId;
  /**
   * @return the tokenId
   */
  public long getTokenId() {
    return tokenId;
  }
  /**
   * @param tokenId the tokenId to set
   */
  public void setTokenId(long tokenId) {
    this.tokenId = tokenId;
  }
  /**
   * @return the userId
   */
  public long getUserId() {
    return userId;
  }
  /**
   * @param userId the userId to set
   */
  public void setUserId(long userId) {
    this.userId = userId;
  }
  /**
   * @return the dueDate
   */
  public Date getDueDate() {
    return dueDate;
  }
  /**
   * @param dueDate the dueDate to set
   */
  public void setDueDate(Date dueDate) {
    this.dueDate = dueDate;
  }
  /**
   * @return the sessionId
   */
  public String getSessionId() {
    return sessionId;
  }
  /**
   * @param sessionId the sessionId to set
   */
  public void setSessionId(String sessionId) {
    this.sessionId = sessionId;
  } 
}
