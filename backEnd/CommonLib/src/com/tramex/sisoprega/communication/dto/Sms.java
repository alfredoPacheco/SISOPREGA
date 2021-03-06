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
package com.tramex.sisoprega.communication.dto;

/**
 * This object provides the data model for SMS messages.<BR/>
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 *             Alan del Rio                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Alan del Rio
 * 
 */
public class Sms {
  private final String sTo;
  private final String sFrom;
  private String sMsg;

  public Sms(final String sTo, final String sFrom, final String sMsg) {
    this.sFrom = sFrom;
    this.sTo = sTo;
    this.sMsg = removeTildes(sMsg);
  }

  public String getTo() {
    return sTo;
  }

  public String getFrom() {
    return sFrom;
  }

  public String getMsg() {
    return sMsg;
  }

  public void setMsg(String msg) {
    this.sMsg = removeTildes(msg);
  }
  
  private String removeTildes(String msg){
    msg = msg.replaceAll("�", "a");
    msg = msg.replaceAll("�", "e");
    msg = msg.replaceAll("�", "i");
    msg = msg.replaceAll("�", "o");
    msg = msg.replaceAll("�", "u");
    return msg;
  }
}
