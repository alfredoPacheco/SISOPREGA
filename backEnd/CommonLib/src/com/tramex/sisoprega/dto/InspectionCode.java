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
 * Defines the model for the Cattle Type entity.<BR/>
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 12/12/2012  Jaime Figueroa                 Initial Version.
 * 12/16/2012  Diego Torres                   Adding toString implementation.
 * ====================================================================================
 * </PRE>
 * 
 * @author Jaime Figueroa
 * 
 */
public class InspectionCode {
  private long inspectionCodeId;
  private String inspectionCodeDescription;

  /**
   * @return the inspectionCodeId
   */
  public long getInspectionCodeId() {
    return inspectionCodeId;
  }

  /**
   * @param inspectionCodeId
   *          the inspectionCodeId to set
   */
  public void setInspectionCodeId(long inspectionCodeId) {
    this.inspectionCodeId = inspectionCodeId;
  }

  /**
   * @return the inspectionCodeDescription
   */
  public String getInspectionCodeDescription() {
    return inspectionCodeDescription;
  }

  /**
   * @param inspectionCodeDescription
   *          the inspectionCodeDescription to set
   */
  public void setInspectionCodeDescription(String inspectionCodeDescription) {
    this.inspectionCodeDescription = inspectionCodeDescription;
  }

  @Override
  public String toString() {
    return "inspectionCodeDescription:" + inspectionCodeDescription + ";inspectionCodeId:" + inspectionCodeId + ";";
  }
}
