package com.tramex.sisoprega.exporter.cross.reporting.common;

import java.io.BufferedOutputStream;
import java.io.Closeable;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;
import javax.servlet.http.HttpServletResponse;

import com.tramex.sisoprega.exporter.cross.FilterBean;
import com.tramex.sisoprega.reporting.Reporteable;

public abstract class BaseReport {
  protected static Logger log = Logger.getLogger(BaseReport.class.getName());
  protected Reporteable reporteable;

  private FilterBean filterBean;

  public FilterBean getFilterBean() {
    return this.filterBean;
  }

  public void setFilterBean(FilterBean filterBean) {
    this.filterBean = filterBean;
  }

  // Actions
  // ------------------------------------------------------------------------------------

  public void downloadPDF() throws Exception {

    // Prepare.
    FacesContext facesContext = FacesContext.getCurrentInstance();
    ExternalContext externalContext = facesContext.getExternalContext();
    HttpServletResponse response = (HttpServletResponse) externalContext.getResponse();

    BufferedOutputStream output = null;

    try {
      // Open file.
      this.setReporteable();
      reporteable.setReportName(this.getFilterBean().getReportName());
      reporteable.setParameters(this.getParameters());

      byte[] reportBytes = reporteable.getBytes();

      // Init servlet response.
      response.reset();
      response.setHeader("Content-Type", "application/pdf");
      response.setHeader("Content-Length", String.valueOf(reportBytes.length));
      response.setHeader("Content-disposition","attachment; filename=" + reporteable.getReportName() + ".pdf");
      output = new BufferedOutputStream(response.getOutputStream());

      // Write file contents to response.
      output.write(reportBytes);

      // Finalize task.
      output.flush();
    } finally {
      // Gently close streams.
      close(output);
    }

    // Inform JSF that it doesn't need to handle response.
    // This is very important, otherwise you will get the following exception in
    // the logs:
    // java.lang.IllegalStateException: Cannot forward after response has been
    // committed.
    facesContext.responseComplete();
  }

  protected abstract void setReporteable();
  
  protected Map<String, Object> getParameters(){
    Map<String, Object> params = new HashMap<String, Object>();
    log.fine("read from filterBean.getFromDate():" + getFilterBean().getFromDate());
    params.put("fromDate", getFilterBean().getFromDate());
    params.put("toDate", getFilterBean().getToDate());
    return params;
  }
  
  // Helpers (can be refactored to public utility class)
  // ----------------------------------------

  private static void close(Closeable resource) {
    if (resource != null) {
      try {
        resource.close();
      } catch (IOException e) {
        // Do your thing with the exception. Print it, log it or mail it. It may
        // be useful to
        // know that this will generally only be thrown when the client aborted
        // the download.
        e.printStackTrace();
      }
    }
  }

  public BaseReport() {
  }

}
