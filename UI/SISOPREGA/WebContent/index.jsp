<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    	               "http://www.w3.org/TR/html4/loose.dtd">

<html>
  <head>
    	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    	<title>GlassFish JSP Page</title>
    	<script src="scripts/jquery-1.8.2/jquery.js"></script>
    	<script src="scripts/webServicesConsuming/consumingGateway.js"></script>
  </head>
  <body>    
    <div id = "seccion"></div>
    <script>
            $(document).ready(function() {
            	
            	//########################################################################################
            	
            	$("#seccion").append("<h1>Consumir Create</h1>");
            	
            	ganadero = {aka:			"aka_Freddy",
            				birthDate:		"04/12/1982",
            				emailAddress:	"j.alfredo.pacheco@gmail.com",
            				firstName:		"El Uddfsadfltimo",
            				lastName: 		"Pacheco",
            				motherName: 	"Figueroa",
            				phone: 			"3050450"
            			};
            	
            	consumirCreate = Create("Rancher", "test", ganadero);
            	
            	$("#seccion").append(consumirCreate.origin + "<br />");
            	$("#seccion").append(consumirCreate.exceptionId + "<br />");
            	$("#seccion").append(consumirCreate.exceptionDescription + "<br />");
            	$("#seccion").append(consumirCreate.generatedId + "<br />");            	
            	
            	//########################################################################################
            	
            	$("#seccion").append("<h1>Consumir Read</h1>");
            	
            	miEntidad = {rancherId:consumirCreate.generatedId};
            	//miEntidad = {}; NO BORRAR, ejemplo para traer todos los records
            	
            	consumirRead = Read("Rancher", "testRequest", miEntidad);
            	
                $("#seccion").append("Entity Name: " + consumirRead.entityName + "<br />");
            	$("#seccion").append("Exception ID: " + consumirRead.exceptionId + "<br />");
            	$("#seccion").append("Exception Description: " + consumirRead.exceptionDescription + "<br />");
            	$("#seccion").append("Origin: " + consumirRead.origin + "<br />");
            	$.each(consumirRead.records, function() {            		
    	    		$.each(this, function(key, value){
    	    			$("#seccion").append(key + " " + value + "<br />");
    	    		});
    	    		$("#seccion").append("<br />");
    	    	});            	
            	
            	//########################################################################################
            	
				$("#seccion").append("<h1>Consumir Update</h1>");
            	
            	ganadero2 = {rancherID:		30,
            				aka:			"aka_Freddy",
            				birthDate:		"04/12/1982",
            				emailAddress:	"j.alfredo.pacheco@gmail.com",
            				firstName:		"FreddyFreddy",
            				lastName: 		"Pacheco",
            				motherName: 	"Figueroa",
            				phone: 			"1234567"
            			};
            	
            	consumirUpdate = Update("Rancher", "test", ganadero2);
            	
            	$("#seccion").append(consumirUpdate.origin + "<br />");
            	$("#seccion").append(consumirUpdate.exceptionId + "<br />");
            	$("#seccion").append(consumirUpdate.exceptionDescription + "<br />");
            	$("#seccion").append(consumirUpdate.entityName + "<br />");
            	            	
            	
            	//########################################################################################
            	
            	
            	$("#seccion").append("<h1>Consumir Read All</h1>");
            	
            	
            	miEntidad = {}; 
            	
            	consumirRead = Read("Rancher", "testRequest", miEntidad);
            	
                $("#seccion").append("Entity Name: " + consumirRead.entityName + "<br />");
            	$("#seccion").append("Exception ID: " + consumirRead.exceptionId + "<br />");
            	$("#seccion").append("Exception Description: " + consumirRead.exceptionDescription + "<br />");
            	$("#seccion").append("Origin: " + consumirRead.origin + "<br />");
            	$.each(consumirRead.records, function() {            		
    	    		$.each(this, function(key, value){
    	    			$("#seccion").append(key + " " + value + "<br />");
    	    		});
    	    		$("#seccion").append("<br />");
    	    	});
            	
            	
            	
            	/*
            	consumirDelete = Delete("Alfredo", 20);
            	$("#seccion").append("<h1>Consumir Delete</h1>");
                $("#seccion").append(consumirDelete.origin + "<br />");
            	$("#seccion").append(consumirDelete.exceptionID + "<br />");
            	$("#seccion").append(consumirDelete.exceptionDescription + "<br />");
            	*/
            	
            	
            	
            }); //$(document).ready(function()
        </script>
  </body>
</html>