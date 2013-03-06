package com.sisoprega.tramex.printLog;

import java.awt.print.PrinterException;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.Authenticator;
import java.net.PasswordAuthentication;
import java.net.URL;
import java.net.URLConnection;
import java.util.Properties;

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

    if (config.contains("location.name"))
      locationName = config.getProperty("location.name");

    if (config.contains("daemon.userName"))
      userName = config.getProperty("daemon.userName");

    if (config.contains("daemon.password"))
      userName = config.getProperty("daemon.password");

    if (config.contains("daemon.host"))
      host = config.getProperty("daemon.host");

  }

  public void run() {
    System.out.println("Entering run method");

    try {
      System.out.println("In run Method: currentThread() is" + Thread.currentThread());

      while (true) {
        try {
          Thread.sleep(3000);
          if (this.printingId == 0) {
            String reportName = readReportName(this.host, this.locationName);
            if (!reportName.equals("ERROR")) {
              boolean printed = false;
              try {
                printed = printPdfHttpReport(reportName);
              } catch (Exception e) {
                e.printStackTrace();
              }
              if (printed)
                deleteReport();
            }
          }
        } catch (Exception e) {
          e.printStackTrace();
        }

        System.out.println("In run method: woke up again");
      }
    } finally {
      System.out.println("Leaving run Method");
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
    String tmpFileName = "/temp/printing" + this.printingId + ".pdf";
    FileOutputStream tmpOut = new FileOutputStream(tmpFileName);

    Authenticator.setDefault(new SisopregaAuthenticator(this.userName, this.password) {
      protected PasswordAuthentication getPasswordAuthentication() {
        return new PasswordAuthentication(this.getUserName(), this.getPassword().toCharArray());
      }
    });
    URL url = new URL(reportName);
    URLConnection connection = url.openConnection();
    InputStream in = connection.getInputStream();

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

    return printDownloadedPdf(tmpFileName);
  }

  private boolean printDownloadedPdf(String fileName) throws IOException, PrinterException {

    Runtime.getRuntime().exec("calc");

    File f = new File(fileName);
    f.delete();
    return true;
  }

  private void deleteReport() {
    System.out.println("Deleting Report");
    String urlAddress = "http://" + host + "/ReportingGateway/ManejadorImpresion?id=" + this.printingId;
    System.out.println(urlAddress);
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
