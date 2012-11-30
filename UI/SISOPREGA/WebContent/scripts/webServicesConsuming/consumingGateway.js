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
 * This javascript provides interfaces to consume gateway web services.
 * 
 * Revision History: 
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 *             Alfredo Pacheco              Initial Version
 * 11/28/2012  Diego Torres                 Adding login & logout, setting sessionToken.
 * ====================================================================================
 */

var sessionToken = "";
var cConsumingGateway = {

	Login : function(userId, password) {
		// Se crea objeto que devolvera la funcion:
		output = {
			exceptionDescription : "Success",
			exceptionId : 0			
		};

		// SOAP Message:
		var soapMessage = soapHeader + '<ws:Login>';
		soapMessage += '<userName>' + userId + '</userName><password>' + password + '</password>';
		soapMessage += '</ws:Login>';
		soapMessage += soapFooter;

		// Ajax request:
		jQuery.ajax({
			url : gatewayWsURL,
			type : "POST",
			dataType : "xml",
			data : soapMessage,
			processData : false,
			contentType : "text/xml;charset=UTF-8",
			async : false,
			success : function OnSuccess(data) {					
				output.exceptionDescription = jQuery(data).find(
				"exceptionDescription").text();
				output.exceptionId = jQuery(data).find("exceptionId").text();
				if (output.exceptionId == 0) {
					sessionToken = jQuery(data).find("return").text();
				}else{
					sessionToken = "";
				}
			},
			error : function OnError(request, status, error) {
				output.exceptionId = 1;
				output.exceptionDescription = error;
				sessionToken = "";
			}
		});
		return output;
	},
	Create : function(entityName, requestId, entity) {		
		// Se crea objeto que devolvera la funcion:
		output = {
			exceptionDescription : "Success",
			exceptionId : 0,
			origin : "",
			generatedId : ""
		};

		// SOAP Message:
		var soapMessage = soapHeader + '<ws:Create>';
		soapMessage += '<requestId>' + sessionToken + '</requestId><entityName>'
				+ entityName + '</entityName>';

		jQuery.each(entity, function(key, value) {
			soapMessage += '<field>';
			soapMessage += '<name>' + key + '</name>';
			soapMessage += '<value>' + value + '</value>';
			soapMessage += '</field>';
		});

		soapMessage += '</ws:Create>' + soapFooter;

		// Ajax request:
		jQuery.ajax({
			url : gatewayWsURL,
			type : "POST",
			dataType : "xml",
			data : soapMessage,
			processData : false,
			contentType : "text/xml;charset=UTF-8",
			async : false,
			success : function OnSuccess(data) {
				output.exceptionDescription = jQuery(data).find(
						"exceptionDescription").text();
				output.exceptionId = jQuery(data).find("exceptionId").text();
				output.origin = jQuery(data).find("origin").text();
				sessionToken = jQuery(data).find("token").text();
				if (output.exceptionId == 0) {
					output.generatedId = jQuery(data).find("generatedId").text();
				}
			},
			error : function OnError(request, status, error) {
				output.exceptionId = 1;
				output.exceptionDescription = error + ' :' + status;
			}
		});
		return output;
	},

	Read : function(entityName, requestId, entity) {
		// Se crea objeto que devolvera la funcion:
		output = {
			exceptionDescription : "Success",
			exceptionId : 0,
			origin : "",
			entityName : "",
			records : []
		};

		// SOAP Message:
		var soapMessage = soapHeader + '<ws:Read>';
		soapMessage += '<entityName>' + entityName + '</entityName>';

		jQuery.each(entity, function(key, value) {
			soapMessage += '<field>';
			soapMessage += '<name>' + key + '</name>';
			soapMessage += '<value>' + value + '</value>';
			soapMessage += '</field>';
		});

		soapMessage += '<requestId>' + requestId
				+ '</requestId></ws:Read>' + soapFooter;

		// Ajax request:
		jQuery.ajax({
			url : gatewayWsURL,
			type : "POST",
			dataType : "xml",
			data : soapMessage,
			processData : false,
			contentType : "text/xml;charset=UTF-8",
			async : false,
			success : function OnSuccess(data) {

				output.exceptionDescription = jQuery(data).find(
						"exceptionDescription").text();
				output.exceptionId = jQuery(data).find("exceptionId").text();
				output.origin = jQuery(data).find("origin").text();
				sessionToken = jQuery(data).find("token").text();

				if (output.exceptionId == 0) {
					output.entityName = jQuery(data).find("entityName").text();

					jQuery(data).find("record").each(function() {
						var record = new Object();
						jQuery(this).find("fields").each(function() {
							var vName = jQuery(this).find('name').text();
							var vValue = jQuery(this).find('value').text();
							record[vName] = vValue;
						});
						output.records.push(record);
					});
				}
			},
			error : function OnError(request, status, error) {
				output.exceptionId = 1;
				output.exceptionDescription = error;
			}
		});
		return output;
	},

	Update : function(entityName, requestId, entity) {
		// Se crea objeto que devolvera la funcion:
		output = {
			exceptionDescription : "Success",
			exceptionId : 0,
			origin : "",
			entityName : "",
			record : {}
		};

		// SOAP Message:
		var soapMessage = soapHeader + '<ws:Update>';
		soapMessage += '<requestId>' + requestId + '</requestId><entityName>'
				+ entityName + '</entityName>';

		jQuery.each(entity, function(key, value) {
			soapMessage += '<field>';
			soapMessage += '<name>' + key + '</name>';
			soapMessage += '<value>' + value + '</value>';
			soapMessage += '</field>';
		});

		soapMessage += '</ws:Update>' + soapFooter;

		// Ajax request:
		jQuery.ajax({
			url : gatewayWsURL,
			type : "POST",
			dataType : "xml",
			data : soapMessage,
			processData : false,
			contentType : "text/xml;charset=UTF-8",
			async : false,
			success : function OnSuccess(data) {
				output.exceptionDescription = jQuery(data).find(
						"exceptionDescription").text();
				output.exceptionId = jQuery(data).find("exceptionId").text();
				output.origin = jQuery(data).find("origin").text();
				sessionToken = jQuery(data).find("token").text();

				if (output.exceptionId == 0) {
					output.entityName = jQuery(data).find("entityName").text();

					var vRecord = new Object();
					jQuery(data).find("fields").each(function() {
						var vName = jQuery(this).find('name').text();
						var vValue = jQuery(this).find('value').text();
						vRecord[vName] = vValue;
					});
					output.record = vRecord;
				}

			},
			error : function OnError(request, status, error) {
				output.exceptionId = 1;
				output.exceptionDescription = error;
			}
		});
		return output;
	},

	Delete : function(entityName, requestId, entity) {
		// Se crea objeto que devolvera la funcion:
		output = {
			exceptionDescription : "Success",
			exceptionId : 0,
			origin : "",
		};

		// SOAP Message:
		var soapMessage = soapHeader + '<ws:Delete>';
		soapMessage += '<entityName>' + entityName + '</entityName><requestId>'
				+ requestId + '</requestId>';

		jQuery.each(entity, function(key, value) {
			soapMessage += '<field>';
			soapMessage += '<name>' + key + '</name>';
			soapMessage += '<value>' + value + '</value>';
			soapMessage += '</field>';
		});

		soapMessage += '</ws:Delete>' + soapFooter;

		// Ajax request:
		jQuery.ajax({
			url : gatewayWsURL,
			type : "POST",
			dataType : "xml",
			data : soapMessage,
			processData : false,
			contentType : "text/xml;charset=UTF-8",
			async : false,
			success : function OnSuccess(data) {
				output.exceptionDescription = jQuery(data).find(
						"exceptionDescription").text();
				output.exceptionId = jQuery(data).find("exceptionId").text();
				output.origin = jQuery(data).find("origin").text();
				sessionToken = jQuery(data).find("token").text();
			},
			error : function OnError(request, status, error) {
				output.exceptionId = 1;
				output.exceptionDescription = error;
			}
		});
		return output;
	},
	LogOut : function() {
		// Se crea objeto que devolvera la funcion:
		output = {
			result : "",
			exceptionDescription : "Success",
			exceptionId : 0,
		};
		
		// SOAP Message:
		var soapMessage = soapHeader + '<ws:logoutService></ws:logoutService>' + soapFooter;

		// Ajax request:
		jQuery.ajax({
			url : gatewayWsURL,
			type : "POST",
			dataType : "xml",
			data : soapMessage,
			processData : false,
			contentType : "text/xml;charset=UTF-8",
			async : false,
			success : function OnSuccess(data) {
				output.result = jQuery(data).find("return").text();
				sessionToken = "";
			},
			error : function OnError(request, status, error) {
				output.exceptionId = 1;
				output.exceptionDescription = error;
			}
		});
		return output;
	}

};

var consumingGateway = cConsumingGateway;