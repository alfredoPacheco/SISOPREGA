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

/**
 * data model for expense concepts.
 *  
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * Apr 7, 2013     Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 *
 * 
 */
public class ExpenseConcept {
  private long expenseConceptId;
  private String conceptName;
  private String expenseFormula;
  /**
   * @return the expenseConceptId
   */
  public long getExpenseConceptId() {
    return expenseConceptId;
  }
  /**
   * @param expenseConceptId the conceptId to set
   */
  public void setExpenseConceptId(long expenseConceptId) {
    this.expenseConceptId = expenseConceptId;
  }
  /**
   * @return the conceptName
   */
  public String getConceptName() {
    return conceptName;
  }
  /**
   * @param conceptName the conceptName to set
   */
  public void setConceptName(String conceptName) {
    this.conceptName = conceptName;
  }
  /**
   * @return the expenseFormula
   */
  public String getExpenseFormula() {
    return expenseFormula;
  }
  /**
   * @param expenseFormula the expenseFormula to set
   */
  public void setExpenseFormula(String expenseFormula) {
    this.expenseFormula = expenseFormula;
  }
  
  @Override
  public String toString() {
    return "conceptId:" + expenseConceptId + ";conceptName:" + conceptName + ";expenseFormula:" + expenseFormula + ";";
  }
  
}
