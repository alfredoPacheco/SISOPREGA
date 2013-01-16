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
package com.sisoprega.envoy.email;

/**
 * Attachment details.<BR/>
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 01/05/2013  Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 */
public class Attachment {
  private byte[] content;
  private String fileName;
  private String attachmentType;
  
  /**
   * @return the content
   */
  public byte[] getContent() {
    return content;
  }
  
  /**
   * @param content the content to set
   */
  public void setContent(byte[] content) {
    this.content = content;
  }
  
  /**
   * @return the fileName
   */
  public String getFileName() {
    return fileName;
  }
  
  /**
   * @param fileName the fileName to set
   */
  public void setFileName(String fileName) {
    this.fileName = fileName;
  }
  
  /**
   * @return the attachmentType
   */
  public String getAttachmentType() {
    return attachmentType;
  }
  
  /**
   * @param attachmentType the attachmentType to set
   */
  public void setAttachmentType(String attachmentType) {
    this.attachmentType = attachmentType;
  }
}
