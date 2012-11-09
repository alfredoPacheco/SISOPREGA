function Create(entityName, requestId, entity){		
	//Se crea objeto que devolvera la funcion:	
	output = {
			exceptionDescription:	"Success",
			exceptionId:			0,
			origin:					"",
			generatedId:			0
				};
	
	//URL de webService:
	var webServiceURL = 'http://localhost:8080/Gateway/GatewayService';
	
	//SOAP Message:
	var soapMessage = 	'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.gateway.sisoprega.tramex.com/">';
	soapMessage +=  	'<soapenv:Header/><soapenv:Body><ws:Create>'; //<request><content><fields>';
	soapMessage += 		'<requestId>'+requestId+'</requestId><entityName>'+entityName+'</entityName>';
	
	$.each(entity, function(key, value) {
		soapMessage += 	'<field>';
		soapMessage += 	'<name>' + key + '</name>';
		soapMessage += 	'<value>' + value + '</value>';
		soapMessage += 	'</field>';		
	});
	
	soapMessage += '</ws:Create></soapenv:Body></soapenv:Envelope>';
	
	
	//Ajax request:
	$.ajax({
	    url: 			webServiceURL,
	    type: 			"POST",
	    dataType: 		"xml",                        
	    data: 			soapMessage,
	    processData: 	false,
	    contentType: 	"text/xml;charset=UTF-8",
	    async: 			false,
	    success: function OnSuccess(data){	    	
	    	output.exceptionDescription = 	$(data).find("exceptionDescription").text();
	    	output.exceptionId = 			$(data).find("exceptionId").text();
	    	output.origin = 				$(data).find("origin").text();
	    	output.generatedId = 			$(data).find("generatedId").text();
	    },
	    error: function OnError(request, status, error){
	    	output.errorCode = 1;
	    }
	});	
	return output;	
}

function Read(entityName, requestId, entity){		
	//Se crea objeto que devolvera la funcion:
	output = {
				exceptionId:			0, 
				exceptionDescription:	"Success", 
				origin:					"", 
				entityName:				"",
				records:				[]
					};
	
	
	//URL de webService:
	var webServiceURL = 'http://localhost:8080/Gateway/GatewayService';
	
	//SOAP Message:
	var soapMessage = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.gateway.sisoprega.tramex.com/">';
	soapMessage += 	'<soapenv:Header/><soapenv:Body><ws:Read>';
	soapMessage += 	'<entityName>'+entityName+'</entityName>';	
	
	$.each(entity, function(key, value) {
		soapMessage += 	'<field>';
		soapMessage += 	'<name>' + key + '</name>';
		soapMessage += 	'<value>' + value + '</value>';
		soapMessage += 	'</field>';
	});
	
	soapMessage += 	'<requestId>'+requestId+'</requestId></ws:Read></soapenv:Body></soapenv:Envelope>';
	
	//Ajax request:
	$.ajax({
	    url: webServiceURL,
	    type: 				"POST",
	    dataType: 			"xml",
	    data: 				soapMessage,
	    processData: 		false,
	    contentType: 		"text/xml;charset=UTF-8",
	    async: 				false,
	    success: function OnSuccess(data){
	    	
	    	
	    	
	    	output.exceptionId = 			$(data).find("exceptionId").text();
	    	output.exceptionDescription = 	$(data).find("exceptionDescription").text();
	    	output.origin = 				$(data).find("origin").text();
	    	output.entityName = 			$(data).find("entityName").text();
	    	
	    	$(data).find("record").each(function(){
	    		var record = new Object();
	    		$(this).find("fields").each(function(){
	    			var vName = $(this).find('name').text();
		    		var vValue = $(this).find('value').text();  
		    		record[vName] = vValue;
		    		//alert(vName + " " + vValue);
	    		});
	    		output.records.push(record);
	    	});	    	
	    	
	    },
	    error: function OnError(request, status, error){
	    	output.errorCode = 1;
	    }
	});
	return output;
}

function Update(entityName, requestId, entity){		
	//Se crea objeto que devolvera la funcion:	
	output = {
			exceptionDescription:	"Success", 
			exceptionId:			0, 			
			origin:					"", 
			entityName:				"",
			record:					{}
				};
	
	//URL de webService:
	var webServiceURL = 'http://localhost:8080/Gateway/GatewayService';
	
	//SOAP Message:
	var soapMessage = 	'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.gateway.sisoprega.tramex.com/">';
	soapMessage += 		'<soapenv:Header/><soapenv:Body><ws:Update>';
	soapMessage += 		'<requestId>'+requestId+'</requestId><entityName>'+entityName+'</entityName>';
	
	$.each(entity, function(key, value) {
		soapMessage += 	'<field>';
		soapMessage += 	'<name>' + key + '</name>';
		soapMessage += 	'<value>' + value + '</value>';
		soapMessage += 	'</field>';		
	});
	
	soapMessage += '</ws:Update></soapenv:Body></soapenv:Envelope>';
	
	//Ajax request:
	$.ajax({
	    url: webServiceURL,
	    type: "POST",
	    dataType: "xml",                        
	    data: soapMessage,
	    processData: false,
	    contentType: "text/xml;charset=UTF-8",
	    async: false,
	    success: function OnSuccess(data){	    	
	    	output.exceptionDescription = 	$(data).find("exceptionDescription").text();
	    	output.exceptionId = 			$(data).find("exceptionId").text();
	    	output.origin = 				$(data).find("origin").text();
	    	output.entityName = 			$(data).find("entityName").text();
	    	
	    	
	    		var vRecord = new Object();
	    		$(data).find("fields").each(function(){
	    			var vName = $(this).find('name').text();
		    		var vValue = $(this).find('value').text();  
		    		vRecord[vName] = vValue;		    		
	    		});
	    		output.record = vRecord;
	    		    
	    },
	    error: function OnError(request, status, error){
	    	output.errorCode = 1;
	    }
	});	
	return output;	
}
function Delete(entityName, id){	
	
	//Se crea objeto que devolvera la funcion:
	output = {exceptionID:0, exceptionDescription:"Success", origin:""};
	output = {
			exceptionDescription:	"Success", 
			exceptionId:			0, 			
			origin:					"", 
			entityName:				"",
			generatedId:			0
				};
	//URL de webService:
	var webServiceURL = 'http://localhost:8080/Gateway/GatewayService';
	
	//SOAP Message:
	var soapMessage = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.gateway.sisoprega.tramex.com/">';
	soapMessage = soapMessage + '<soapenv:Header/><soapenv:Body><ws:Delete><request><content/>';
	soapMessage = soapMessage + '<entityName>'+entityName+'</entityName>';
	soapMessage = soapMessage + '<requestId>'+id+'</requestId></request></ws:Delete></soapenv:Body></soapenv:Envelope>';
	
	$.ajax({
	    url: webServiceURL,
	    type: "POST",
	    dataType: "xml",                        
	    data: soapMessage,
	    processData: false,
	    contentType: "text/xml;charset=UTF-8",
	    async: false,
	    success: function OnSuccess(data){
	    	/*<exceptionDescription>Success</exceptionDescription>
            <exceptionId>0</exceptionId>
            <origin>DeleteGateway</origin>*/    	
	    	output.origin = $(data).find("exceptionDescription").text();
	    	output.exceptionID = $(data).find("exceptionId").text();
	    	output.origin = $(data).find("origin").text();
	    },
	    error: function OnError(request, status, error){	    	
	    	output.errorCode = "1";
	    }                        
	});
	
    return output;	
}


         	
         		
         	
         