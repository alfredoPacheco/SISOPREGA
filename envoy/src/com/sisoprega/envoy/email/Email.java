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
 * Email details.<BR/>
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 *             Alan Del Rio                 Initial Version.
 * 01/05/2013  Diego Torres                 Add implementation for email attachment.
 * ====================================================================================
 * </PRE>
 * 
 * @author Alan Del Rio
 * 
 */
public class Email {
  private final String to;
  private final String from;
  private final String msg;
  private final String subject;
  private Attachment attachment;

  public Email(final String to, final String from, final String subject, final String msg) {
    this.from = from;
    this.to = to;
    this.msg = msg;
    this.subject = subject;
  }

  public String getTo() {
    return to;
  }

  public String getFrom() {
    return from;
  }

  public String getMsg() {
    return msg;
  }

  public String getSubject() {
    return subject;
  }
  
  public Attachment getAttachment(){
    return attachment;
  }
  
  public void setAttachment(Attachment attachment){
    this.attachment = attachment;
  }
  
}
