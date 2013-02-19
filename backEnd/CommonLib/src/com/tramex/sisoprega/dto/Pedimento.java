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

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Data model for pedimentos
 *  
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * Feb 11, 2013     Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 *
 * 
 */
public class Pedimento {

  private String folio;
  private long rancherId;
  private Date fechaPedimento;
  /**
   * @return the folio
   */
  public String getFolio() {
    return folio;
  }
  /**
   * @param folio the folio to set
   */
  public void setFolio(String folio) {
    this.folio = folio;
  }
  /**
   * @return the rancherId
   */
  public long getRancherId() {
    return rancherId;
  }
  /**
   * @param rancherId the rancherId to set
   */
  public void setRancherId(long rancherId) {
    this.rancherId = rancherId;
  }
  /**
   * @return the fechaPedimento
   */
  public Date getFechaPedimento() {
    return fechaPedimento;
  }
  /**
   * @param fechaPedimento the fechaPedimento to set
   */
  public void setFechaPedimento(Date fechaPedimento) {
    this.fechaPedimento = fechaPedimento;
  }
  
  @Override
  public String toString() {
    String sFechaPedimento = this.fechaPedimento==null?"":new SimpleDateFormat("MM/dd/yyyy").format(this.fechaPedimento);
    return "folio:" + this.getFolio() + ";rancherId:" + this.getRancherId() + ";fecha:" + sFechaPedimento + ";";
  }

}
