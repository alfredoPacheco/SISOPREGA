
var cConsumingGateway = {

	Create : function(entityName, requestId, entity) {		
		// Se crea objeto que devolvera la funcion:
		output = {
			exceptionDescription : "Success",
			exceptionId : 0,
			origin : "",
			generatedId : ""
		};

		// URL de webService:
		var webServiceURL = 'http://localhost:8080/Gateway/GatewayService';

		// SOAP Message:
		var soapMessage = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.gateway.sisoprega.tramex.com/">';
		soapMessage += '<soapenv:Header/><soapenv:Body><ws:Create>'; // <request><content><fields>';
		soapMessage += '<requestId>' + requestId + '</requestId><entityName>'
				+ entityName + '</entityName>';

		jQuery.each(entity, function(key, value) {
			soapMessage += '<field>';
			soapMessage += '<name>' + key + '</name>';
			soapMessage += '<value>' + value + '</value>';
			soapMessage += '</field>';
		});

		soapMessage += '</ws:Create></soapenv:Body></soapenv:Envelope>';

		// Ajax request:
		jQuery.ajax({
			url : webServiceURL,
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
				if (output.exceptionId == 0) {
					output.generatedId = jQuery(data).find("generatedId").text();
				}
			},
			error : function OnError(request, status, error) {
				output.exceptionId = 1;								
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

		// URL de webService:
		var webServiceURL = 'http://localhost:8080/Gateway/GatewayService';

		// SOAP Message:
		var soapMessage = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.gateway.sisoprega.tramex.com/">';
		soapMessage += '<soapenv:Header/><soapenv:Body><ws:Read>';
		soapMessage += '<entityName>' + entityName + '</entityName>';

		jQuery.each(entity, function(key, value) {
			soapMessage += '<field>';
			soapMessage += '<name>' + key + '</name>';
			soapMessage += '<value>' + value + '</value>';
			soapMessage += '</field>';
		});

		soapMessage += '<requestId>' + requestId
				+ '</requestId></ws:Read></soapenv:Body></soapenv:Envelope>';

		// Ajax request:
		jQuery.ajax({
			url : webServiceURL,
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

		// URL de webService:
		var webServiceURL = 'http://localhost:8080/Gateway/GatewayService';

		// SOAP Message:
		var soapMessage = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.gateway.sisoprega.tramex.com/">';
		soapMessage += '<soapenv:Header/><soapenv:Body><ws:Update>';
		soapMessage += '<requestId>' + requestId + '</requestId><entityName>'
				+ entityName + '</entityName>';

		jQuery.each(entity, function(key, value) {
			soapMessage += '<field>';
			soapMessage += '<name>' + key + '</name>';
			soapMessage += '<value>' + value + '</value>';
			soapMessage += '</field>';
		});

		soapMessage += '</ws:Update></soapenv:Body></soapenv:Envelope>';

		// Ajax request:
		jQuery.ajax({
			url : webServiceURL,
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

		// URL de webService:
		var webServiceURL = 'http://localhost:8080/Gateway/GatewayService';

		// SOAP Message:
		var soapMessage = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.gateway.sisoprega.tramex.com/">';
		soapMessage += '<soapenv:Header/><soapenv:Body><ws:Delete>';
		soapMessage += '<entityName>' + entityName + '</entityName><requestId>'
				+ requestId + '</requestId>';

		jQuery.each(entity, function(key, value) {
			soapMessage += '<field>';
			soapMessage += '<name>' + key + '</name>';
			soapMessage += '<value>' + value + '</value>';
			soapMessage += '</field>';
		});

		soapMessage += '</ws:Delete></soapenv:Body></soapenv:Envelope>';

		// Ajax request:
		jQuery.ajax({
			url : webServiceURL,
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
			},
			error : function OnError(request, status, error) {
				output.exceptionId = 1;
			}
		});
		return output;
	}

};

var consumingGateway = cConsumingGateway;