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
            				firstName:		"El Uddfsad fltimo",
            				lastName: 		"Pacheco",
            				motherName: 	"Figueroa",
            				phone: 			"3050450"
            			};
            	
            	consumirCreate = consumingGateway.Create("Rancher", "test", ganadero);
            	
            	$("#seccion").append("<b>origin: </b>" + consumirCreate.origin + "<br />");
            	$("#seccion").append("<b>exceptionID: </b>" + consumirCreate.exceptionId + "<br />");
            	$("#seccion").append("<b>exceptionDescription: </b>" + consumirCreate.exceptionDescription + "<br />");
            	$("#seccion").append("<b>generatedID: </b>" + consumirCreate.generatedId + "<br />");            	
            	
            	//########################################################################################
            	
            	$("#seccion").append("<h1>Consumir Read</h1>");
            	
            	miEntidad = {rancherId:consumirCreate.generatedId};
            	//miEntidad = {}; NO BORRAR, ejemplo para traer todos los records
            	
            	consumirRead = consumingGateway.Read("Rancher", "testRequest", miEntidad);
            	
                $("#seccion").append("<b>Entity Name: </b>" + consumirRead.entityName + "<br />");
            	$("#seccion").append("<b>Exception ID: </b>" + consumirRead.exceptionId + "<br />");
            	$("#seccion").append("<b>Exception Description: </b>" + consumirRead.exceptionDescription + "<br />");
            	$("#seccion").append("<b>Origin: </b>" + consumirRead.origin + "<br /><br />");
            	$.each(consumirRead.records, function() {            		
    	    		$.each(this, function(key, value){
    	    			$("#seccion").append("<b>" + key + "</b> " + value + "<br />");
    	    		});
    	    		$("#seccion").append("<br />");
    	    	});            	
            	
            	//########################################################################################
            	
				$("#seccion").append("<h1>Consumir Update</h1>");
            	
            	ganadero2 = {rancherId:		3,
            				aka:			"aka_Freddy",
            				birthDate:		"04/12/1982",
            				emailAddress:	"j.alfredo.pacheco@gmail.com",
            				firstName:		"Freddy Freddy",
            				lastName: 		"Pacheco",
            				motherName: 	"Figueroa",
            				phone: 			"1234567"
            			};
            	
            	consumirUpdate = consumingGateway.Update("Rancher", "test", ganadero2);            	
            	
            	$("#seccion").append("<b>origin: </b>" + consumirUpdate.origin + "<br />");
            	$("#seccion").append("<b>exceptionID: </b>" + consumirUpdate.exceptionId + "<br />");
            	$("#seccion").append("<b>exceptionDescription: </b>" + consumirUpdate.exceptionDescription + "<br />");
            	$("#seccion").append("<b>entityName: </b>" + consumirUpdate.entityName + "<br />");
            	            	
            	
            	//########################################################################################
            	
            	
            	$("#seccion").append("<h1>Consumir Read All</h1>");
            	
            	consumirRead = consumingGateway.Read("Rancher", "testRequest", {});
            	
            	$("#seccion").append("<b>Entity Name: </b>" + consumirRead.entityName + "<br />");
            	$("#seccion").append("<b>Exception ID: </b>" + consumirRead.exceptionId + "<br />");
            	$("#seccion").append("<b>Exception Description: </b>" + consumirRead.exceptionDescription + "<br />");
            	$("#seccion").append("<b>Origin: </b>" + consumirRead.origin + "<br /><br />");
            	
            	$.each(consumirRead.records, function() {            		
    	    		$.each(this, function(key, value){
    	    			$("#seccion").append(key + " " + value + "<br />");
    	    		});
    	    		$("#seccion").append("<br />");
    	    	});
            	
            	
            	//########################################################################################
            	
            	$("#seccion").append("<h1>Consumir Delete</h1>");
            	
            	ganadero2.rancherId = 2;
            	
            	
            	$("#seccion").append("rancherId a eliminar: " + ganadero2.rancherId + "<br />");
            	consumirDelete = consumingGateway.Delete("Rancher", "testRequest", ganadero2);
            	
                $("#seccion").append("<b>origin: </b>" + consumirDelete.origin + "<br />");
            	$("#seccion").append("<b>exceptionID: </b>" + consumirDelete.exceptionId + "<br />");
            	$("#seccion").append("<b>exceptionDescription: </b>" + consumirDelete.exceptionDescription + "<br />");
            	
            	
            }); //$(document).ready(function()
        </script>
  </body>
</html>