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
 * data model for hermana corte exportador.
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
public class HermanaCorteExportador {
  private long hermanaCorteExportadorId;
  private long qualityId;
  private double purchasePrice = 0.0d;
  private Hermana hermana;
  
  /**
   * @return the hermanaCorteExportadorId
   */
  public long getHermanaCorteExportadorId() {
    return hermanaCorteExportadorId;
  }
  
  /**
   * @param hermanaCorteExportadorId the corteExpo to set
   */
  public void setHermanaCorteExportadorId(long hermanaCorteExportadorId) {
    this.hermanaCorteExportadorId = hermanaCorteExportadorId;
  }

  /**
   * @return the qualityId
   */
  public long getQualityId() {
    return qualityId;
  }
  
  /**
   * @param qualityId the qualityId to set
   */
  public void setQualityId(long qualityId) {
    this.qualityId = qualityId;
  }
  
  /**
   * @return the purchasePrice
   */
  public double getPurchasePrice() {
    return purchasePrice;
  }

  /**
   * @param purchasePrice the purchasePrice to set
   */
  public void setPurchasePrice(double purchasePrice) {
    this.purchasePrice = purchasePrice;
  }

  /**
   * @return the hermana
   */
  public Hermana getHermana() {
    return hermana;
  }

  /**
   * @param hermana the hermana to set
   */
  public void setHermana(Hermana hermana) {
    this.hermana = hermana;
  }

  @Override
  public String toString() {
    return "corteExpo:" + hermanaCorteExportadorId + ";qualityId:" + qualityId + ";";
  }
  
}
