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
 * Defines the model for the Inspection Details entity.<BR/>
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 12/23/2012  Alfredo Pacheco              Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Alfredo Pacheco
 * 
 */
public class InspectionDetails {
	private long inspectionDetailsId;
	private long inspectionId;
	private long inspectionCodeId;
	private long hc;
	private double weight;
	private long weightUom;
	private String note;
	/**
	 * @return the inspectionDetailsId
	 */
	public long getInspectionDetailsId() {
		return inspectionDetailsId;
	}
	/**
	 * @param inspectionDetailsId the inspectionDetailsId to set
	 */
	public void setInspectionDetailsId(long inspectionDetailsId) {
		this.inspectionDetailsId = inspectionDetailsId;
	}
	/**
	 * @return the inspectionId
	 */
	public long getInspectionId() {
		return inspectionId;
	}
	/**
	 * @param inspectionId the inspectionId to set
	 */
	public void setInspectionId(long inspectionId) {
		this.inspectionId = inspectionId;
	}
	/**
	 * @return the inspectionCodeId
	 */
	public long getInspectionCodeId() {
		return inspectionCodeId;
	}
	/**
	 * @param inspectionCodeId the inspectionCodeId to set
	 */
	public void setInspectionCodeId(long inspectionCodeId) {
		this.inspectionCodeId = inspectionCodeId;
	}
	/**
	 * @return the hc
	 */
	public long getHc() {
		return hc;
	}
	/**
	 * @param hc the hc to set
	 */
	public void setHc(long hc) {
		this.hc = hc;
	}
	/**
	 * @return the weight
	 */
	public double getWeight() {
		return weight;
	}
	/**
	 * @param weight the weight to set
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
	 * @param weightUom the weightUom to set
	 */
	public void setWeightUom(long weightUom) {
		this.weightUom = weightUom;
	}
	/**
	 * @return the note
	 */
	public String getNote() {
		return note;
	}
	/**
	 * @param note the note to set
	 */
	public void setNote(String note) {
		this.note = note;
	}
	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "InspectionDetails [inspectionDetailsId=" + inspectionDetailsId
				+ ", inspectionId=" + inspectionId + ", inspectionCodeId="
				+ inspectionCodeId + ", hc=" + hc + ", weight=" + weight
				+ ", weightUom=" + weightUom + ", note=" + note + "]";
	}
	
	
}
