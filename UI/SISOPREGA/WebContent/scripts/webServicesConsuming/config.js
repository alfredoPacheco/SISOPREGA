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
 * 
 * +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * This javascript sets the configuration properties shared along libraries in the
 * static web project
 * 
 * Revision History: 
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 11/28/2012  Diego Torres                 Initial Version.
 * 01/22/2013  Diego Torres                 Cross site errors fixed by not specifying server host.
 * 02/03/2013  Diego Torres                 Identity gateway path.
 * ====================================================================================
 *
 */

var serverHost = '';
var gatewayApp_path = '/GatewayBeanService/Gateway';
var gatewayWsURL = serverHost + gatewayApp_path;

var identityApp_path = '/IdentityGatewayBeanService/IdentityGateway';
var identityWsURL = serverHost + identityApp_path;

var echoApp_path = '/EchoesGatewayBeanService/EchoesGateway';
var echoWsURL = serverHost + echoApp_path;

var soapHeader = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.gateway.sisoprega.tramex.com/">';
	soapHeader += '<soapenv:Header/><soapenv:Body>';
var soapFooter = '</soapenv:Body></soapenv:Envelope>';