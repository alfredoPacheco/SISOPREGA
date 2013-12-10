/**
 * 
 */
package com.tramex.sisoprega.fs.cross.dto;

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
 * Dec 10, 2013     Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 *
 * 
 */
public class IconListItem {

  private String iconURL;
  private String title;
  private String description;
  private String clickAction;
  
  /**
   * 
   */
  public IconListItem(String iconURL, String title, String description, String clickAction) {
    this.iconURL = iconURL;
    this.title = title;
    this.description = description;
    this.clickAction = clickAction;
  }

  /**
   * @return the iconURL
   */
  public String getIconURL() {
    return iconURL;
  }

  /**
   * @param iconURL the iconURL to set
   */
  public void setIconURL(String iconURL) {
    this.iconURL = iconURL;
  }

  /**
   * @return the title
   */
  public String getTitle() {
    return title;
  }

  /**
   * @param title the title to set
   */
  public void setTitle(String title) {
    this.title = title;
  }

  /**
   * @return the description
   */
  public String getDescription() {
    return description;
  }

  /**
   * @param description the description to set
   */
  public void setDescription(String description) {
    this.description = description;
  }

  /**
   * @return the clickAction
   */
  public String getClickAction() {
    return clickAction;
  }

  /**
   * @param clickAction the clickAction to set
   */
  public void setClickAction(String clickAction) {
    this.clickAction = clickAction;
  }
}
