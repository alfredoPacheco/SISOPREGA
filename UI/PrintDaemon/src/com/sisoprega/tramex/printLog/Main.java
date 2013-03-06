package com.sisoprega.tramex.printLog;

import java.awt.print.PrinterException;
import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.Authenticator;
import java.net.PasswordAuthentication;
import java.net.URL;
import java.net.URLConnection;
import java.util.Properties;

import javax.print.Doc;
import javax.print.DocFlavor;
import javax.print.DocPrintJob;
import javax.print.PrintService;
import javax.print.PrintServiceLookup;
import javax.print.SimpleDoc;

public class Main extends Thread {

  private String locationName = "sisoprega_home";
  private String userName = "admin";
  private String password = "admin";
  private String host = "localhost:8080";
  private long printingId = 0;

  public Main(String configFileName) {

    Properties config = new Properties();
    InputStream in = getClass().getClassLoader().getResourceAsStream(configFileName);
    try {
      config.load(in);
      in.close();
    } catch (IOException e) {
      e.printStackTrace();
    }

    locationName = config.getProperty("location.name", locationName);
    userName = config.getProperty("daemon.userName", userName);
    password = config.getProperty("daemon.password", password);
    host = config.getProperty("daemon.host", host);
  }

  public void run() {
    System.out.println("Entering run method");

    try {
      while (true) {
        try {
          Thread.sleep(3000);
          if (this.printingId == 0) {
            String reportName = readReportName(this.host, this.locationName);
            if (!reportName.equals("ERROR")) {
              try {
                printPdfHttpReport(reportName);
              } catch (Exception e) {
                e.printStackTrace();
              }
              deleteReport();
            }
          }
        } catch (Exception e) {
          e.printStackTrace();
          this.printingId = 0;
        }
      }
    } finally {
      System.out.println("Service turned off");
    }
  }

  public static void main(String[] args) {

    Main t = new Main("daemon.properties");
    t.setDaemon(false);
    t.start();
  }

  private String readReportName(String host, String destinationName) throws IOException {
    System.out.println("Retrieving report name");
    String urlAddress = "http://" + host + "/ReportingGateway/ManejadorImpresion?destination_name=" + destinationName;

    Authenticator.setDefault(new SisopregaAuthenticator(this.userName, this.password) {
      protected PasswordAuthentication getPasswordAuthentication() {
        return new PasswordAuthentication(this.getUserName(), this.getPassword().toCharArray());
      }
    });
    URL url = new URL(urlAddress);
    URLConnection connection = url.openConnection();
    BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));

    String result = in.readLine();
    if (!result.equals("ERROR") && result.contains("ReportingGateway")) {
      this.printingId = Long.parseLong(in.readLine());
    } else {
      result = "ERROR";
    }

    in.close();

    return result;
  }

  private boolean printPdfHttpReport(String reportName) throws IOException, PrinterException {
    System.out.println("Printing PDF report");

    URL url = new URL("http://" + host + reportName);
    
    byte[] file = readPDF(url);
    
    PrintService service = PrintServiceLookup.lookupDefaultPrintService();
    
    DocFlavor flavor = DocFlavor.BYTE_ARRAY.AUTOSENSE;
    DocPrintJob job = service.createPrintJob();
    Doc doc = new SimpleDoc(file, flavor, null);

    try {
      job.print(doc, null);
    } catch (Exception e) {
      e.printStackTrace();
    }

    return true;
  }
  
  private byte[] readPDF(URL url) throws IOException {

    ByteArrayOutputStream tmpOut = new ByteArrayOutputStream();

    Authenticator.setDefault(new SisopregaAuthenticator(this.userName, this.password) {
      protected PasswordAuthentication getPasswordAuthentication() {
        return new PasswordAuthentication(this.getUserName(), this.getPassword().toCharArray());
      }
    });
    URLConnection connection = url.openConnection();
    InputStream in = connection.getInputStream();
    int contentLength = connection.getContentLength();

    if (contentLength != -1) {
      tmpOut = new ByteArrayOutputStream(contentLength);
    }

    byte[] buf = new byte[512];
    while (true) {
      int len = in.read(buf);
      if (len == -1) {
        break;
      }
      tmpOut.write(buf, 0, len);
    }
    in.close();
    tmpOut.close();

    return tmpOut.toByteArray();
  }

  private void deleteReport() throws IOException {
    System.out.println("Deleting Report");
    String urlAddress = "http://" + host + "/ReportingGateway/ManejadorImpresion?id=" + this.printingId;

    Authenticator.setDefault(new SisopregaAuthenticator(this.userName, this.password) {
      protected PasswordAuthentication getPasswordAuthentication() {
        return new PasswordAuthentication(this.getUserName(), this.getPassword().toCharArray());
      }
    });
    URL url = new URL(urlAddress);
    URLConnection connection = url.openConnection();
    BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
    System.out.println(in.readLine());
    this.printingId = 0;
  }

  private class SisopregaAuthenticator extends Authenticator {
    private final String userName;
    private final String password;

    public SisopregaAuthenticator(String userName, String password) {
      this.userName = userName;
      this.password = password;
    }

    public String getUserName() {
      return this.userName;
    }

    public String getPassword() {
      return this.password;
    }

    protected PasswordAuthentication getPasswordAuthentication() {
      return new PasswordAuthentication(this.userName, this.password.toCharArray());
    }
  }

}
