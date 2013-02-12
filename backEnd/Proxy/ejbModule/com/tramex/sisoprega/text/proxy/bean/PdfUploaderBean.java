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
package com.tramex.sisoprega.text.proxy.bean;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.annotation.Resource;

import com.tramex.sisoprega.common.BaseResponse;
import com.tramex.sisoprega.common.CreateGatewayResponse;
import com.tramex.sisoprega.common.Error;
import com.tramex.sisoprega.common.GatewayRequest;
import com.tramex.sisoprega.common.ReadGatewayResponse;
import com.tramex.sisoprega.common.UpdateGatewayResponse;
import com.tramex.sisoprega.common.crud.Cruddable;
import com.tramex.sisoprega.dto.Pedimento;
import com.tramex.sisoprega.dto.Rancher;
import com.tramex.sisoprega.dto.RancherUser;
import com.tramex.sisoprega.proxy.bean.BaseBean;

/**
 * PdfUploaderBean provides the interface to know the list of pedimentos for a
 * given date or a given rancher.
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 02/11/2013  Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 * 
 */
public class PdfUploaderBean extends BaseBean implements Cruddable {

  @Resource(name = "pdfUploader")
  private Properties PDF_UPLOADER_PROPERTIES;

  @Override
  public CreateGatewayResponse Create(GatewayRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "Create");

    CreateGatewayResponse response = new CreateGatewayResponse();
    response
        .setError(new Error("VAL04", "No se permite la creación de registros por este medio.", "proxy.PdfUploaderBean.Create"));

    this.log.exiting(this.getClass().getCanonicalName(), "Create");
    return response;
  }

  @Override
  public ReadGatewayResponse Read(GatewayRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "Read");

    ReadGatewayResponse response = new ReadGatewayResponse();
    response.setEntityName(request.getEntityName());

    Pedimento pedimento = null;
    try {
      pedimento = entityFromRequest(request, Pedimento.class);
      this.log.fine("Got pedimento from request: " + pedimento);

      List<Pedimento> pedimentos = new LinkedList<Pedimento>();

      if (ejbContext.isCallerInRole("rancher")) {
        long rancherId = getLoggedRancherId();
        if (pedimento.getFolio() != null && !pedimento.getFolio().trim().equals("")) {
          // Retrieve details for single pedimento
          Pedimento ped = getPedimentoDetails(rancherId, pedimento.getFolio());
          if (ped != null) {
            pedimentos.add(ped);
          }
        } else if (pedimento.getFechaPedimento() != null) {
          // Retrieve details for list of pedimentos
          String fechaPedimento = new SimpleDateFormat("yyyyMMdd").format(pedimento.getFechaPedimento());
          for (String folio : getFoliosInDate(rancherId, fechaPedimento)) {
            Pedimento p = new Pedimento();
            p.setFolio(folio);
            p.setRancherId(rancherId);
            p.setFechaPedimento(pedimento.getFechaPedimento());
            pedimentos.add(p);
          }
        }
      } else if (pedimento.getFolio() != null && !pedimento.getFolio().trim().equals("")) {
        if (pedimento.getRancherId() != 0) {
          // Retrieve details for single pedimento
          Pedimento ped = getPedimentoDetails(pedimento.getRancherId(), pedimento.getFolio());
          if (ped != null) {
            pedimentos.add(ped);
          }
        } else {
          for (Long rancherId : getUploadedRanchers()) {
            Pedimento ped = getPedimentoDetails(rancherId, pedimento.getFolio());
            if (ped != null) {
              pedimentos.add(ped);
              break;
            }
          }
        }
      } else if (pedimento.getFechaPedimento() != null) {
        if (pedimento.getRancherId() != 0) {
          // Seek on especific rancher
          String fechaPedimento = new SimpleDateFormat("yyyyMMdd").format(pedimento.getFechaPedimento());
          for (String folio : getFoliosInDate(pedimento.getRancherId(), fechaPedimento)) {
            Pedimento p = new Pedimento();
            p.setFolio(folio);
            p.setRancherId(pedimento.getRancherId());
            p.setFechaPedimento(pedimento.getFechaPedimento());
            pedimentos.add(p);
          }
        } else {
          response.setError(new Error("VAL03", "El filtro especificado no es válido en la lista de pedimentos",
              "proxy.PdfUploader.Read"));
          return response;
        }
      } else if (pedimento.getRancherId() != 0) {
        // Retrieve date list of pedimentos for rancher
        for (String fechaPedimento : getDatesInRancher(pedimento.getRancherId())) {
          for (String folio : getFoliosInDate(pedimento.getRancherId(), fechaPedimento)) {
            Pedimento p = new Pedimento();
            p.setFolio(folio);
            p.setRancherId(pedimento.getRancherId());
            p.setFechaPedimento(pedimento.getFechaPedimento());
            pedimentos.add(p);
          }
        }
        
      } else {
        response.setError(new Error("VAL03", "El filtro especificado no es válido en la lista de pedimentos",
            "proxy.PdfUploader.Read"));
        return response;
      }

      if (pedimentos.isEmpty()) {
        response.setError(new Error("VAL02", "No se encontraron datos para el filtro seleccionado", "proxy.RancherBean.Read"));
      } else {
        // Add query results to response
        response.getRecord().addAll(contentFromList(pedimentos, Pedimento.class));

        // Add success message to response
        response.setError(new Error("0", "SUCCESS", "proxy.PdfUploader.Read"));
        this.log.info("Read operation for pedimentos executed by principal[" + getLoggedUser() + "] on RancherBean");
      }

    } catch (Exception e) {
      // something went wrong, alert the server and respond the client
      this.log.severe("Exception found while reading PdfUploader");
      this.log.throwing(this.getClass().getCanonicalName(), "Read", e);

      response.setError(new Error("DB02", "Read exception: " + e.getMessage(), "proxy.PdfUploader.Read"));
    }

    this.log.exiting(this.getClass().getCanonicalName(), "Read");
    return response;
  }

  @Override
  public UpdateGatewayResponse Update(GatewayRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "Create");

    UpdateGatewayResponse response = new UpdateGatewayResponse();
    response.setError(new Error("VAL04", "No se permite la actualizacón de registros por este medio.",
        "proxy.PdfUploaderBean.Create"));

    this.log.exiting(this.getClass().getCanonicalName(), "Create");
    return response;
  }

  @Override
  public BaseResponse Delete(GatewayRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "Create");

    BaseResponse response = new BaseResponse();
    response
        .setError(new Error("VAL04", "No se permite el borrado de registros por este medio.", "proxy.PdfUploaderBean.Create"));

    this.log.exiting(this.getClass().getCanonicalName(), "Create");
    return response;
  }

  private long getLoggedRancherId() {
    log.entering(this.getClass().getCanonicalName(), "getLoggedRancherId");

    long result = 0;

    Map<String, Object> parameters = new HashMap<String, Object>();
    parameters.put("userName", getLoggedUser());

    List<RancherUser> ranchers = dataModel.readDataModelList("RANCHER_USER_BY_USER_NAME", parameters, RancherUser.class);

    if (!ranchers.isEmpty()) {
      RancherUser loggedRancher = ranchers.get(0);

      Rancher rancher = dataModel.readSingleDataModel("RANCHER_BY_ID", "rancherId", loggedRancher.getRancherId(), Rancher.class);

      if (rancher != null) {
        result = rancher.getRancherId();
      }
    }

    return result;
  }

  private Pedimento getPedimentoDetails(long rancherId, String folio) throws IOException, ParseException {
    Pedimento result = null;

    for (String fechaPedimento : getDatesInRancher(rancherId)) {
      if (getFoliosInDate(rancherId, fechaPedimento).contains(folio)) {
        result = new Pedimento();
        Date dFechaPedimento = new SimpleDateFormat("yyyyMMdd").parse(fechaPedimento);
        result.setFechaPedimento(dFechaPedimento);
        result.setFolio(folio);
        result.setRancherId(rancherId);
        break;
      }
    }

    return result;
  }

  private List<String> getDatesInRancher(long rancherId) {
    List<String> dates = new LinkedList<String>();

    String rancherFileName = PDF_UPLOADER_PROPERTIES.getProperty("uploadPath") + "/" + rancherId;

    File file = new File(rancherFileName);
    File[] listOfFiles = file.listFiles();
    for (File f : listOfFiles) {
      dates.add(f.getName());
    }

    return dates;
  }

  private List<String> getFoliosInDate(long rancherId, String fechaPedimento) throws IOException {
    List<String> folios = new LinkedList<String>();

    String dateFileName = PDF_UPLOADER_PROPERTIES.getProperty("uploadPath") + "/" + rancherId + "/" + fechaPedimento;

    File file = new File(dateFileName);
    if (file.exists()) {
      BufferedReader br = new BufferedReader(new FileReader(dateFileName));
      try {
        String folio = br.readLine();
        folios.add(folio);
      } finally {
        br.close();
      }
    }

    return folios;
  }

  private List<Long> getUploadedRanchers() {
    List<Long> ranchersList = new ArrayList<Long>();

    String rancherFileName = PDF_UPLOADER_PROPERTIES.getProperty("uploadPath");

    File file = new File(rancherFileName);
    File[] listOfFiles = file.listFiles();
    for (File f : listOfFiles) {
      ranchersList.add(Long.parseLong(f.getName()));
    }

    return ranchersList;
  }

}
