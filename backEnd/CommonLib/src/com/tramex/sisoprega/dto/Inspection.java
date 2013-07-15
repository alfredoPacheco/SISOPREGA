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
import java.util.HashSet;
import java.util.Set;

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
 * 02/11/2013  Alan del Rio                   Added comments field
 * 06/30/2013  Diego Torres                   Handle inspection details by obj ref.
 * ====================================================================================
 * </PRE>
 * 
 * @author Jaime Figueroa
 * 
 */
public class Inspection {
  private long inspectionId;
  private Date inspectionDate;
  private String comments;
  private double weight;
  private long weightUom = 1;
  private Reception reception;
  private Set<Pen> pen;
  private Set<InspectionDetails> inspectionDetails;

  /**
   * @return the inspectionId
   */
  public long getInspectionId() {
    return inspectionId;
  }

  /**
   * @param inspectionId
   *          the inspectionId to set
   */
  public void setInspectionId(long inspectionId) {
    this.inspectionId = inspectionId;
  }

  /**
   * @return the inspectionDate
   */
  public Date getInspectionDate() {
    return inspectionDate;
  }

  /**
   * @param inspectionDate
   *          the inspectionDate to set
   */
  public void setInspectionDate(Date inspectionDate) {
    this.inspectionDate = inspectionDate;
  }

  /**
   * @param comment
   *          the inspection comment to set
   */
  public void setComments(String comments) {
    this.comments = comments;
  }

  /**
   * @return the inspection comment
   */
  public String getComments() {
    return comments;
  }

  /**
   * @return the weight
   */
  public double getWeight() {
    return weight;
  }

  /**
   * @param weight
   *          the weight to set
   */
  public void setWeight(double weight) {
    this.weight = weight;
  }

  /**
   * @return the weightUom
   */
  public long getWeightUom() {
    return weightUom;
  }

  /**
   * @param weightUom
   *          the weightUom to set
   */
  public void setWeightUom(long weightUom) {
    this.weightUom = weightUom;
  }

  /**
   * @return the reception
   */
  public Reception getReception() {
    return reception;
  }

  /**
   * @param reception
   *          the reception to set
   */
  public void setReception(Reception reception) {
    this.reception = reception;
  }

  /**
   * @return the pen
   */
  public Set<Pen> getPen() {
    return pen;
  }

  /**
   * @param pen the pen to set
   */
  public void setPen(Set<Pen> pen) {
    this.pen = pen;
  }
  
  public void addPen(Pen inPen){
    if(pen == null)
      pen = new HashSet<Pen>();
    
    pen.add(inPen);
  }

  /**
   * @return the inspectionDetails
   */
  public Set<InspectionDetails> getInspectionDetails() {
    return inspectionDetails;
  }

  /**
   * @param inspectionDetails the inspectionDetails to set
   */
  public void setInspectionDetails(Set<InspectionDetails> inspectionDetails) {
    this.inspectionDetails = inspectionDetails;
  }
  
  public void addInspectionDetails(InspectionDetails childDetail){
    if(inspectionDetails == null)
      inspectionDetails = new HashSet<InspectionDetails>();
    
    inspectionDetails.add(childDetail);
    
    if(childDetail.getInspection()!=this)
      childDetail.setInspection(this);
  }

  @Override
  public boolean equals(Object obj) {
    if(obj instanceof Inspection){
      return this.getInspectionId() == ((Inspection) obj).getInspectionId();
    }
    return false;
  }
  
  @Override
  public String toString() {
    return "inspectionDate:" + inspectionDate + ";inspectionId:" + inspectionId + "; weight=" + weight + "; weightUom="
        + weightUom;
  }
}
