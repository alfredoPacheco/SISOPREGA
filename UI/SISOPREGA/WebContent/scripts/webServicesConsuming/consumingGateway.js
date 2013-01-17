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

var cConsumingGateway = {

	SendMessage : function(rancher_id, message){
		var result = 'OK';
		var soapMessage = soapHeader + '<ws:SendSimpleMessage>';
		soapMessage += '<rancherId>' + rancher_id + '</rancherId><message>' + message + '</message>';
		soapMessage += '</ws:SendSimpleMessage>';
		soapMessage += soapFooter;
		
		jQuery.ajax({
			url : gatewayWsURL,
			type : "POST",
			dataType : "xml",
			data : soapMessage,
			processData : false,
			contentType : "text/xml;charset=UTF-8",
			async : false,
			success : function OnSuccess(data) {					
				result = jQuery(data).find("response").text();
			},
			error : function OnError(request, status, error) {
				result = 'Error al llamar el servicio web.';
				alert(output.exceptionDescription);
				consumingGateway.LogOut();
			}
		});
		
		return result;
	},
	SendReport : function(rancher_id, reportName){
		var result = 'OK';
		var soapMessage = soapHeader + '<ws:SendReport>';
		soapMessage += '<rancherId>' + rancher_id + '</rancherId><reportName>' + reportName + '</reportName>';
		soapMessage += '</ws:SendReport>';
		soapMessage += soapFooter;
		
		jQuery.ajax({
			url : gatewayWsURL,
			type : "POST",
			dataType : "xml",
			data : soapMessage,
			processData : false,
			contentType : "text/xml;charset=UTF-8",
			async : false,
			success : function OnSuccess(data) {					
				result = jQuery(data).find("response").text();
			},
			error : function OnError(request, status, error) {
				result = 'Error al llamar el servicio web.';
				alert(output.exceptionDescription);
				consumingGateway.LogOut();
			}
		});
		
		return result;
	},
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
			},
			error : function OnError(request, status, error) {
				output.exceptionId = 1;
				output.exceptionDescription = error;
				alert(output.exceptionDescription);
				consumingGateway.LogOut();
			}
		});
		return output;
	},
	Create : function(entityName, entity) {		
		// Se crea objeto que devolvera la funcion:
		output = {
			exceptionDescription : "Success",
			exceptionId : 0,
			origin : "",
			generatedId : ""
		};

		// SOAP Message:
		var soapMessage = soapHeader + '<ws:Create>';
		soapMessage += '<entityName>' + entityName + '</entityName>';

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
				if (output.exceptionId == "GW01"){
					alert(output.exceptionDescription);
					consumingGateway.LogOut();
				}
				output.origin = jQuery(data).find("origin").text();
				if (output.exceptionId == 0) {
					output.generatedId = jQuery(data).find("generatedId").text();
				}
			},
			error : function OnError(request, status, error) {
				output.exceptionId = 1;
				output.exceptionDescription = error + ' :' + status;
				alert(output.exceptionDescription);
				consumingGateway.LogOut();
			}
		});
		return output;
	},

	Read : function(entityName, entity) {
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

		soapMessage += '</ws:Read>' + soapFooter;

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
				if (output.exceptionId == "GW01"){
					alert(output.exceptionDescription);
					consumingGateway.LogOut();
				}
				output.origin = jQuery(data).find("origin").text();

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
				alert(output.exceptionDescription);
				consumingGateway.LogOut();
			}
		});
		return output;
	},

	Update : function(entityName, entity) {
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
		soapMessage += '<entityName>' + entityName + '</entityName>';

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
				if (output.exceptionId == "GW01"){
					alert(output.exceptionDescription);
					consumingGateway.LogOut();
				}
				output.origin = jQuery(data).find("origin").text();

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
				alert(output.exceptionDescription);
				consumingGateway.LogOut();
			}
		});
		return output;
	},

	Delete : function(entityName, entity) {
		// Se crea objeto que devolvera la funcion:
		output = {
			exceptionDescription : "Success",
			exceptionId : 0,
			origin : "",
		};

		// SOAP Message:
		var soapMessage = soapHeader + '<ws:Delete>';
		soapMessage += '<entityName>' + entityName + '</entityName>';

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
				if (output.exceptionId == "GW01"){
					alert(output.exceptionDescription);
					consumingGateway.LogOut();
				}
				output.origin = jQuery(data).find("origin").text();
			},
			error : function OnError(request, status, error) {
				output.exceptionId = 1;
				output.exceptionDescription = error;
				alert(output.exceptionDescription);
				consumingGateway.LogOut();
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
		var soapMessage = soapHeader + '<ws:Logout/>' + soapFooter;

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
			},
			error : function OnError(request, status, error) {
				output.exceptionId = 1;
				output.exceptionDescription = error;
				alert(output.exceptionDescription);
				
			}
		});
		enyo.$.sisoprega.destroy();
		window.location = './'; 
		return output;
	}

};

var consumingGateway = cConsumingGateway;