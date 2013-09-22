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
 * Defines the model for the Hermana entity.<BR/>
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 04/06/2013  Diego Torres                 Initial Version.
 * 09/17/2013  Diego Torres                 Add reception reference.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 */
public class Hermana {

  private long hermanaId;
  private String entryNo;
  private String refNo;
  private String consignee;
  private String accountOf;
  private long rancherId;
  private Date deWhen = new Date();
  private String hermanaBy;
  private Set<HermanaCorte> hermanaCorte;
  private Set<HermanaCorteExportador> hermanaCorteExportador;
  private Set<HermanaExpense> hermanaExpense;
  private Set<Reception> reception;

  /**
   * @return the hermanaId
   */
  public long getHermanaId() {
    return hermanaId;
  }

  /**
   * @param hermanaId the hermanaId to set
   */
  public void setHermanaId(long hermanaId) {
    this.hermanaId = hermanaId;
  }

  /**
   * @return the entryNo
   */
  public String getEntryNo() {
    return entryNo;
  }

  /**
   * @param entryNo the entryNo to set
   */
  public void setEntryNo(String entryNo) {
    this.entryNo = entryNo;
  }

  /**
   * @return the refNo
   */
  public String getRefNo() {
    return refNo;
  }

  /**
   * @param refNo the refNo to set
   */
  public void setRefNo(String refNo) {
    this.refNo = refNo;
  }

  /**
   * @return the consignee
   */
  public String getConsignee() {
    return consignee;
  }

  /**
   * @param consignee the consignee to set
   */
  public void setConsignee(String consignee) {
    this.consignee = consignee;
  }

  /**
   * @return the accountOf
   */
  public String getAccountOf() {
    return accountOf;
  }

  /**
   * @param accountOf the accountOf to set
   */
  public void setAccountOf(String accountOf) {
    this.accountOf = accountOf;
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
   * @return the deWhen
   */
  public Date getDeWhen() {
    return deWhen;
  }

  /**
   * @param deWhen the deWhen to set
   */
  public void setDeWhen(Date deWhen) {
    this.deWhen = deWhen;
  }

  /**
   * @return the hermanaBy
   */
  public String getHermanaBy() {
    return hermanaBy;
  }

  /**
   * @param hermanaBy the hermanaBy to set
   */
  public void setHermanaBy(String hermanaBy) {
    this.hermanaBy = hermanaBy;
  }

  @Override
  public String toString() {
    return "hermanaId:" + hermanaId + ";entryNo:" + entryNo + ";refNo:" + refNo + ";consignee:" + consignee + ";accountOf:"
        + accountOf + ";rancherId:" + rancherId + ";hermanaBy:" + hermanaBy + ";";
  }

  /**
   * @return the hermanaCorte
   */
  public Set<HermanaCorte> getHermanaCorte() {
    return hermanaCorte;
  }

  /**
   * @param hermanaCorte the hermanaCorte to set
   */
  public void setHermanaCorte(Set<HermanaCorte> hermanaCorte) {
    this.hermanaCorte = hermanaCorte;
  }
  
  public void addHermanaCorte(HermanaCorte hermanaCorte){
    if(this.hermanaCorte == null)
      this.hermanaCorte = new HashSet<HermanaCorte>();
    
    this.hermanaCorte.add(hermanaCorte);
    
    if(hermanaCorte.getHermana() != this)
      hermanaCorte.setHermana(this);
  }

  /**
   * @return the hermanaCorteExportador
   */
  public Set<HermanaCorteExportador> getHermanaCorteExportador() {
    return hermanaCorteExportador;
  }

  /**
   * @param hermanaCorteExportador the hermanaCorteExportador to set
   */
  public void setHermanaCorteExportador(Set<HermanaCorteExportador> hermanaCorteExportador) {
    this.hermanaCorteExportador = hermanaCorteExportador;
  }
  
  public void addHermanaCorteExportador(HermanaCorteExportador hermanaCorteExportador){
    if(this.hermanaCorteExportador == null)
      this.hermanaCorteExportador = new HashSet<HermanaCorteExportador>();
    
    this.hermanaCorteExportador.add(hermanaCorteExportador);
    
    if(hermanaCorteExportador.getHermana() != this)
      hermanaCorteExportador.setHermana(this);
  }
  
  /**
   * @return the hermanaExpense
   */
  public Set<HermanaExpense> getHermanaExpense() {
    return hermanaExpense;
  }

  /**
   * @param hermanaExpense the hermanaExpense to set
   */
  public void setHermanaExpense(Set<HermanaExpense> hermanaExpense) {
    this.hermanaExpense = hermanaExpense;
  }
  
  public void addHermanaExpense (HermanaExpense hermanaExpense){
    if(this.hermanaExpense == null)
      this.hermanaExpense = new HashSet<HermanaExpense>();
    
    this.hermanaExpense.add(hermanaExpense);
    
    if(hermanaExpense.getHermana()!=this)
      hermanaExpense.setHermana(this);
  }
  
  /**
   * @return the reception
   */
  public Set<Reception> getReception() {
    return reception;
  }

  /**
   * @param reception the reception to set
   */
  public void setReception(Set<Reception> reception) {
    this.reception = reception;
  }
  
  public void addReception(Reception reception){
    if(this.reception == null)
      this.reception = new HashSet<Reception>();
    
    this.reception.add(reception);
  }

  @Override
  public boolean equals(Object obj) {
    if(obj instanceof Hermana){
      return this.getHermanaId() == ((Hermana) obj).getHermanaId();
    }
    return false;
  }
}
