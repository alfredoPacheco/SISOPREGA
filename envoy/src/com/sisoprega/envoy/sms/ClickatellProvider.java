package com.sisoprega.envoy.sms;
import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

public class ClickatellProvider implements SmsProvider {
	private enum response {
	    OK,WARNING,ERROR 
	}	
	//Read this from XML Config File
	private static final String REQUEST_GET="GET";
	private static final String API_URL = "https://api.clickatell.com/http/sendmsg";
	private String apiID;
	private static final String REQUEST="%s?user=%s&password=%s&api_id=%s&from=%s&mo=1&to=%s&text=%s";
	private String userID;
	private String passWord;
	private String responseMsg;
	private response ack;
	
	@Override
	public void doLogin(final String userID, final String passWord) throws LoginSmsException {
		this.userID=userID;
		this.passWord=passWord;				
	}
	void setApiID(final String apiID){
		this.apiID=apiID;
	}
	@Override
	public void sendSMS(final Sms sms) throws SendSmsException {
		final String sRequest;
		final URL url;
		try {
			sRequest=String.format(REQUEST,API_URL, this.userID,this.passWord,this.apiID,
		               sms.getFrom(),sms.getTo(),
		               URLEncoder.encode(sms.getMsg(),"UTF-8"));		
			url =new URL(sRequest);			
			HttpURLConnection conn = (HttpURLConnection)url.openConnection();
			conn.setRequestMethod(REQUEST_GET);
			conn.connect();
			this.setResponse(conn);
			conn.disconnect();
		} catch (MalformedURLException e) {
			throw new SendSmsException("Error Creating URL Request: "+e.getMessage());
		}catch (UnsupportedEncodingException e) {
			throw new SendSmsException("Invalid Encoding: ".concat(e.getMessage()));
		}catch (IOException e) {
			throw new SendSmsException("Error Establishing Connection: "+e.getMessage());	
		}catch (Exception e){
			throw new SendSmsException("Run Time Exception "+e.getMessage());
		}
	}
    public response getResponse(){
    	return this.ack;    	
    }
    public void setResponse(final HttpURLConnection conn) throws SendSmsException{    	
		try {
	    	BufferedReader br;
			if (conn.getResponseCode() != 200) {
				this.ack=response.ERROR;
				this.responseMsg="Request Failed, HTTP code : "+conn.getResponseCode();
			}else{
				br = new BufferedReader(new InputStreamReader(
						(conn.getInputStream())));				
				if((this.responseMsg = br.readLine()) != null) {
					String [] split=this.responseMsg.split(":");
					if(split[0].equalsIgnoreCase("ERR")){
						this.ack=response.ERROR;
					}
				}else{
					this.responseMsg="Empty Response";
					this.ack=response.WARNING;				
				}
			}
		} catch (IOException e) {
			System.out.println(e.getMessage());
			throw new SendSmsException("Failed to get response: "+e.getMessage());
		}

    }
	@Override
	public void setConfiguration(File xmlFile)
			throws InitSmsProviderException {
		DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
		try{
			DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
			Document doc = dBuilder.parse(xmlFile);
			doc.getDocumentElement().normalize();
			NodeList nodes = doc.getElementsByTagName("sms");
			Node node = nodes.item(0);
			Element element = (Element) node;
			this.doLogin(getValue("userid",element),
					     getValue("password",element));
			this.apiID=getValue("apiid",element);
		}catch(Exception e){
			throw new InitSmsProviderException("Error Parsing XML config File:".concat(e.getMessage()));
		}		
	}
	private static String getValue(String tag, Element element) {
		NodeList nodes = element.getElementsByTagName(tag).item(0).getChildNodes();
		Node node = (Node) nodes.item(0);
		return node.getNodeValue();
	}
	public static String getREQUEST_GET() {
		return REQUEST_GET;
	}
	public static String getAPI_URL() {
		return API_URL;
	}
	public String getApiID() {
		return apiID;
	}
	public static String getREQUEST() {
		return REQUEST;
	}
	public String getUserID() {
		return userID;
	}
	public String getPassWord() {
		return passWord;
	}
	public String getResponseMsg() {
		return responseMsg;
	}
	public response getAck() {
		return ack;
	}
}
