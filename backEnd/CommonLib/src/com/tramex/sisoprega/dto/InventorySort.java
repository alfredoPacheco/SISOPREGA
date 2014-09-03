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
 * USAGE COMMENT HERE
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 08/30/2014   Alfredo Pacheco             Initial Version
 * ====================================================================================
 * </PRE>
 * 
 * @author Alfredo Pacheco
 * 
 * 
 */
public class InventorySort {
  private long inventorySortId;
  private String sortClassification = "";
  private int sortSequence;
  private Inventory inventory;



  /**
   * @return the sortClassification
   */
  public String getSortClassification() {
    return sortClassification;
  }

  /**
   * @param sortClassification
   *          the sortClassification to set
   */
  public void setSortClassification(String sortClassification) {
    this.sortClassification = sortClassification;
  }

  /**
   * @return the sortSequence
   */
  public int getSortSequence() {
    return sortSequence;
  }

  /**
   * @param sortSequence
   *          the sortSequence to set
   */
  public void setSortSequence(int sortSequence) {
    this.sortSequence = sortSequence;
  }

  /**
   * @return the inventory
   */
  public Inventory getInventory() {
    return inventory;
  }

  /**
   * @param inventory the inventory to set
   */
  public void setInventory(Inventory inventory) {
    this.inventory = inventory;
  }

  /**
   * @return the inventorySortId
   */
  public long getInventorySortId() {
    return inventorySortId;
  }

  /**
   * @param inventorySortId the inventorySortId to set
   */
  public void setInventorySortId(long inventorySortId) {
    this.inventorySortId = inventorySortId;
  }

}
