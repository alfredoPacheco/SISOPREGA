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
 * 02/03/2013  Diego Torres                 Adding operations for password reset.
 * ====================================================================================
 */

var consumingGateway =
  {

    SendMessage : function(rancher_id, message) {
      var result = 'OK';
      var soapMessage = soapHeader + '<ws:SendSimpleMessage>';
      soapMessage += '<rancherId>' + rancher_id + '</rancherId><message>' + message + '</message>';
      soapMessage += '<userName>' + utils.getCookie("username") + '</userName><password>' + utils.getCookie("pass") + '</password>';
      soapMessage += '</ws:SendSimpleMessage>';
      soapMessage += soapFooter;

      		jQuery.ajax({
      			url : echoWsURL,
      			type : "POST",
      			dataType : "xml",
      			data : soapMessage,
      			processData : false,
      			contentType : "text/xml;charset=UTF-8",
                username : utils.getCookie("username"),
                password : utils.getCookie("pass"),
      			success : function OnSuccess(data) {					
      				result = jQuery(data).find("response").text();
      			},
      			error : function OnError(request, status, error) {
      				result = 'Error al llamar el servicio web.';
      				alert(error);
      			}
      		});

      return result;
    },
    SendReport : function(rancher_id, reportName) {
      var result = 'OK';
      var soapMessage = soapHeader + '<ws:SendReport>';
      soapMessage += '<rancherId>' + rancher_id + '</rancherId><reportName>' + reportName + '</reportName>';
      soapMessage += '<userName>' + utils.getCookie("username") + '</userName><password>' + utils.getCookie("pass") + '</password>';
      soapMessage += '</ws:SendReport>';
      soapMessage += soapFooter;
      
      		jQuery.ajax({
      			url : echoWsURL,
      			type : "POST",
      			dataType : "xml",
      			data : soapMessage,
      			processData : false,
      			contentType : "text/xml;charset=UTF-8",
                username : utils.getCookie("username"),
                password : utils.getCookie("pass"),
      			success : function OnSuccess(data) {					
      				result = jQuery(data).find("response").text();
      		},
      			error : function OnError(request, status, error) {
      				result = 'Error al llamar el servicio web.';
      				alert(result + ': ' + error);
      			}
      		});

      return result;
    },
    Login : function(userId, password, callBackMethod, objRef) {
      // Se crea objeto que devolvera la funcion:
      output =
        {
          exceptionDescription : "Success",
          exceptionId : 0
        };
      
      // SOAP Message:
      var soapMessage = soapHeader + '<ws:Login>';
      soapMessage += '<userName>' + userId + '</userName>';
      soapMessage += '<password>' + password + '</password>';
      soapMessage += '</ws:Login>' + soapFooter;

      // Ajax request:
      jQuery.ajax(
        {
          url : '/DMZGatewayBeanService/DMZGateway',
          type : "POST",
          dataType : "xml",
          data : soapMessage,
          processData : false,
          contentType : "text/xml;charset=UTF-8",
          success : function OnSuccess(data) {
            
            var result = jQuery(data).find("return").text();
            if(result == 'OK'){
              output.exceptionDescription = "SUCCESS";
              output.exceptionId = 0;
              
              utils.setCookie("username", userId, 365);
              utils.setCookie("pass", password, 365);
              
            } else if(result == 'FAIL'){
              output.exceptionDescription = "Contraseña incorrecta";
              output.exceptionId = 1;
            } else {
              output.exceptionDescription = "El usuario no existe";
              output.exceptionId = 2;
            }
            
            setTimeout(function(){callBackMethod(output, objRef);}, 1000);
            return false;
          },
          error : function OnError(request, status, error) {
            output.exceptionId = 3;
            output.exceptionDescription = error;
            setTimeout(function(){callBackMethod(output, objRef);}, 1000);
            return false;
          }
        });
    },
    Create : function(entityName, entity) {
      // Se crea objeto que devolvera la funcion:
      output =
        {
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
      jQuery.ajax(
        {
          url : gatewayWsURL,
          type : "POST",
          dataType : "xml",
          data : soapMessage,
          processData : false,
          contentType : "text/xml;charset=UTF-8",
          username : utils.getCookie("username"),
          password : utils.getCookie("pass"),
          async : false,
          success : function OnSuccess(data) {
            output.exceptionDescription = jQuery(data).find("exceptionDescription").text();
            output.exceptionId = jQuery(data).find("exceptionId").text();
            if (output.exceptionId == "GW01") {
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
    createTransaction : function(entityName, entity) {
	
//	Example of an object that could receive this function
	/*var objReceptionExample = {
		//fields of master object:		
		field1:1,
		field2:2,
		field3:"something",
		//children array contain fileds of foreign tables
		children:[
		          {
		              entity:"ReceptionHeadcount",
		              field1:1,
		              field2:2,
		              field3:3
		              
		          },
		          {
		              entity:"ReceptionBarnyards",
		              field1:1,
		              field2:2,
		              field3:3
		          }
		          ]
	};*/
	
	
	      // Se crea objeto que devolvera la funcion:
	      output =
	        {
	          exceptionDescription : "Success",
	          exceptionId : 0,
	          origin : "",
	          generatedId : ""
	        };

	      // SOAP Message:
	      var soapMessage = soapHeader + '<ws:Create>';
	      soapMessage += '<request><parentRecord><entity>' + entityName + '</entity>';

	      for(field in entity){
		  if(entity.hasOwnProperty(field)){
		      if(field != "children"){
			  soapMessage += '<field>';
			  soapMessage += '<name>' + field + '</name>';
			  soapMessage += '<value>' + entity[field] + '</value>';
			  soapMessage += '</field>';
		      }
		  }
	      }
	      
	      if(entity.hasOwnProperty("children")){
		  for(var i = 0;i<entity.children.length;i++){
		      var strChildrenEntity = "";
		      var strChildrenFields = "";
		      var strChildRecord = "";
		      for(field in entity.children[i]){
			  if(entity.children[i].hasOwnProperty(field)){
			      if(field == "entity"){
				  strChildrenEntity = '<entity>' + entity.children[i][field] + '</entity>';
			      }else{
				  strChildrenFields += '<field>';
				  strChildrenFields += '<name>' + field + '</name>';
				  strChildrenFields += '<value>' + entity.children[i][field] + '</value>';
				  strChildrenFields += '</field>';  
			      }
			      			      
			  }
		      }
		      strChildRecord = '<childRecord>' + strChildrenEntity + strChildrenFields + '</childRecord>';
		      soapMessage += strChildRecord; 
		  }
	      }
	      
	      soapMessage += '</parentRecord></request>';
	      soapMessage += '</ws:Create>' + soapFooter;
	      
	      // Ajax request:
	      jQuery.ajax(
	        {
	          url : gatewayWsURL,
	          type : "POST",
	          dataType : "xml",
	          data : soapMessage,
	          processData : false,
	          contentType : "text/xml;charset=UTF-8",
	          username : utils.getCookie("username"),
	          password : utils.getCookie("pass"),
	          async : false,
	          success : function OnSuccess(data) {
	            output.exceptionDescription = jQuery(data).find("exceptionDescription").text();
	            output.exceptionId = jQuery(data).find("exceptionId").text();
	            if (output.exceptionId == "GW01") {
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
      output =
        {
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
      
      if(utils.getCookie("username")==null){
        alert('Usuario no identificado');
        consumingGateway.LogOut();
      }
        

      // Ajax request:
      jQuery.ajax(
        {
          url : gatewayWsURL,
          type : "POST",
          dataType : "xml",
          data : soapMessage,
          processData : false,
          contentType : "text/xml;charset=UTF-8",
          username : utils.getCookie("username"),
          password : utils.getCookie("pass"),
          async : false,
          success : function OnSuccess(data) {
            output.exceptionDescription = jQuery(data).find("exceptionDescription").text();
            output.exceptionId = jQuery(data).find("exceptionId").text();
            if (output.exceptionId == "GW01") {
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
    readTransaction : function(entityName, entity) {
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
	      soapMessage += '<request><filter><entity>' + entityName + '</entity>';
	       
	      for(field in entity){
		  if(entity.hasOwnProperty(field)){
		      soapMessage += '<field>';
		      soapMessage += '<name>' + field + '</name>';
		      soapMessage += '<value>' + entity[field] + '</value>';
		      soapMessage += '</field>';
		  }
	      }
	      soapMessage += '</filter></request>';
	      soapMessage += '</ws:Read>' + soapFooter;

	      if(utils.getCookie("username")==null){
		  alert('Usuario no identificado');
		  consumingGateway.LogOut();
	      }
	      
	      // Ajax request:
	      jQuery.ajax(
	        {
	          url : gatewayWsURL,
	          type : "POST",
	          dataType : "xml",
	          data : soapMessage,
	          processData : false,
	          contentType : "text/xml;charset=UTF-8",
	          username : utils.getCookie("username"),
	          password : utils.getCookie("pass"),
	          async : false,
	          success : function OnSuccess(data) {
	              output.exceptionDescription = jQuery(data).find("exceptionDescription").text();
	              output.exceptionId = jQuery(data).find("exceptionId").text();
	              if (output.exceptionId == "GW01") {
	                alert(output.exceptionDescription);
	                consumingGateway.LogOut();
	                return;
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
    ReadAsync : function(entityName, entity, cbObj, cbMethod) {
      // Se crea objeto que devolvera la funcion:
      output =
        {
          exceptionDescription : "Success",
          exceptionId : 0,
          origin : "",
          entityName : "",
          records : []
        };

      if(utils.getCookie("username")==null){
        alert('Usuario no identificado');
        consumingGateway.LogOut();
      }
      
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
      jQuery.ajax(
        {
          url : gatewayWsURL,
          type : "POST",
          dataType : "xml",
          data : soapMessage,
          processData : false,
          contentType : "text/xml;charset=UTF-8",
          username : utils.getCookie("username"),
          password : utils.getCookie("pass"),
          success : function OnSuccess(data) {
            output.exceptionDescription = jQuery(data).find("exceptionDescription").text();
            output.exceptionId = jQuery(data).find("exceptionId").text();
            if (output.exceptionId == "GW01") {
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
              
              cbObj[cbMethod](output);
              return false;
            }
          },
          error : function OnError(request, status, error) {
            output.exceptionId = 1;
            output.exceptionDescription = error;
            alert(output.exceptionDescription);
            consumingGateway.LogOut();
            callbackObject[callbackMethod](output);
            return output;
          }
        });
    },

    Update : function(entityName, entity) {
      // Se crea objeto que devolvera la funcion:
      output =
        {
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
      jQuery.ajax(
        {
          url : gatewayWsURL,
          type : "POST",
          dataType : "xml",
          data : soapMessage,
          processData : false,
          contentType : "text/xml;charset=UTF-8",
          username : utils.getCookie("username"),
          password : utils.getCookie("pass"),
          async : false,
          success : function OnSuccess(data) {
            output.exceptionDescription = jQuery(data).find("exceptionDescription").text();
            output.exceptionId = jQuery(data).find("exceptionId").text();
            if (output.exceptionId == "GW01") {
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
    updateTransaction : function(entityName, entity) {
	      // Se crea objeto que devolvera la funcion:
	      output =
	        {
	          exceptionDescription : "Success",
	          exceptionId : 0,
	          origin : "",
	          generatedId : ""
	        };

	      // SOAP Message:
	      var soapMessage = soapHeader + '<ws:Create>';
	      soapMessage += '<request><parentRecord><entity>' + entityName + '</entity>';

	      for(field in entity){
		  if(entity.hasOwnProperty(field)){
		      if(field != "children"){
			  soapMessage += '<field>';
			  soapMessage += '<name>' + field + '</name>';
			  soapMessage += '<value>' + entity[field] + '</value>';
			  soapMessage += '</field>';
		      }
		  }
	      }
	      
	      if(entity.hasOwnProperty("children")){
		  for(var i = 0;i<entity.children.length;i++){
		      var strChildrenEntity = "";
		      var strChildrenFields = "";
		      var strChildRecord = "";
		      for(field in entity.children[i]){
			  if(entity.children[i].hasOwnProperty(field)){
			      if(field == "entity"){
				  strChildrenEntity = '<entity>' + entity.children[i][field] + '</entity>';
			      }else{
				  strChildrenFields += '<field>';
				  strChildrenFields += '<name>' + field + '</name>';
				  strChildrenFields += '<value>' + entity.children[i][field] + '</value>';
				  strChildrenFields += '</field>';  
			      }
			      			      
			  }
		      }
		      strChildRecord = '<childRecord>' + strChildrenEntity + strChildrenFields + '</childRecord>';
		      soapMessage += strChildRecord; 
		  }
	      }
	      
	      soapMessage += '</parentRecord></request>';
	      soapMessage += '</ws:Create>' + soapFooter;
	      
	      // Ajax request:
	      jQuery.ajax(
	        {
	          url : gatewayWsURL,
	          type : "POST",
	          dataType : "xml",
	          data : soapMessage,
	          processData : false,
	          contentType : "text/xml;charset=UTF-8",
	          username : utils.getCookie("username"),
	          password : utils.getCookie("pass"),
	          async : false,
	          success : function OnSuccess(data) {
	            output.exceptionDescription = jQuery(data).find("exceptionDescription").text();
	            output.exceptionId = jQuery(data).find("exceptionId").text();
	            if (output.exceptionId == "GW01") {
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
    
    Delete : function(entityName, entity) {
      // Se crea objeto que devolvera la funcion:
      output =
        {
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
      jQuery.ajax(
        {
          url : gatewayWsURL,
          type : "POST",
          dataType : "xml",
          data : soapMessage,
          processData : false,
          contentType : "text/xml;charset=UTF-8",
          username : utils.getCookie("username"),
          password : utils.getCookie("pass"),
          async : false,
          success : function OnSuccess(data) {
            output.exceptionDescription = jQuery(data).find("exceptionDescription").text();
            output.exceptionId = jQuery(data).find("exceptionId").text();
            if (output.exceptionId == "GW01") {
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
    deleteTransaction : function(entityName, entity) {
	      // Se crea objeto que devolvera la funcion:
	      output =
	        {
	          exceptionDescription : "Success",
	          exceptionId : 0,
	          origin : "",
	        };

	      // SOAP Message:
	      var soapMessage = soapHeader + '<ws:Delete>';
	      soapMessage += '<request><filter><entity>' + entityName + '</entity>';
	       
	      for(field in entity){
		  if(entity.hasOwnProperty(field)){
		      soapMessage += '<field>';
		      soapMessage += '<name>' + field + '</name>';
		      soapMessage += '<value>' + entity[field] + '</value>';
		      soapMessage += '</field>';
		  }
	      }
	      soapMessage += '</filter></request>';
	      soapMessage += '</ws:Delete>' + soapFooter;

	      // Ajax request:
	      jQuery.ajax(
	        {
	          url : gatewayWsURL,
	          type : "POST",
	          dataType : "xml",
	          data : soapMessage,
	          processData : false,
	          contentType : "text/xml;charset=UTF-8",
	          username : utils.getCookie("username"),
	          password : utils.getCookie("pass"),
	          async : false,
	          success : function OnSuccess(data) {
	            output.exceptionDescription = jQuery(data).find("exceptionDescription").text();
	            output.exceptionId = jQuery(data).find("exceptionId").text();
	            if (output.exceptionId == "GW01") {
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
      output =
        {
          result : "",
          exceptionDescription : "Success",
          exceptionId : 0,
        };
      
      utils.setCookie("lastUser", utils.getCookie("username"), 365);
      utils.setCookie("lastPass", utils.getCookie("pass"), 365);
      
      utils.setCookie("username", "", -1);
      utils.setCookie("pass", "", -1);

      try {
        enyo.$.sisoprega.destroy();
      } catch (e) {
      }
      window.location = './';
      return output;
    },

    ResetPassword : function(userName, password) {
      output = "OK";

      var soapMessage = soapHeader + '<ws:ResetPassword>';
      soapMessage += '<user_name>' + userName + '</user_name>';
      soapMessage += '<password>' + password + '</password>';
      soapMessage += '</ws:ResetPassword>';
      soapMessage += soapFooter;

      jQuery.ajax(
        {
          url : identityWsURL,
          type : "POST",
          dataType : "xml",
          data : soapMessage,
          processData : false,
          contentType : "text/xml;charset=UTF-8",
          username : utils.getCookie("username"),
          password : utils.getCookie("pass"),
          async : false,
          success : function OnSuccess(data) {
            output = jQuery(data).find("return").text();
          },
          error : function OnError(request, status, error) {
            alert('No fue posible volver a asignar contraseña para el usuario ' + userName);
          }
        });
      return output;
    },
    AddUser : function(objUser) {
      output = "OK";

      var soapMessage = soapHeader + '<ws:CreateUser>';
      soapMessage += '<user>';
      soapMessage += '<userName>' + objUser.user_name + '</userName>';
      soapMessage += '<password>' + objUser.password + '</password>';

      for (index in objUser.groups) {
        var group = objUser.groups[index];
        soapMessage += '<groups>';
        soapMessage += '<record_id>0</record_id>';
        soapMessage += '<role_name>' + group.role_name + '</role_name>';
        soapMessage += '<user_name>' + objUser.user_name + '</user_name>';
        soapMessage += '</groups>';
      }

      soapMessage += '</user>';
      soapMessage += '</ws:CreateUser>';
      soapMessage += soapFooter;

      jQuery.ajax(
        {
          url : identityWsURL,
          type : "POST",
          dataType : "xml",
          data : soapMessage,
          processData : false,
          contentType : "text/xml;charset=UTF-8",
          username : utils.getCookie("username"),
          password : utils.getCookie("pass"),
          async : false,
          success : function OnSuccess(data) {
            output = jQuery(data).find("return").text();
          },
          error : function OnError(request, status, error) {
            alert('No fue posible crear el usuario ' + objUser.user_name);
          }
        });
      return output;
    },
    ReadAllUsers : function() {
      // Se crea objeto que devolvera la funcion:
      users = [];

      // SOAP Message:
      var soapMessage = soapHeader + '<ws:ReadAllUsers/>' + soapFooter;

      // Ajax request:
      jQuery.ajax(
        {
          url : identityWsURL,
          type : "POST",
          dataType : "xml",
          data : soapMessage,
          processData : false,
          contentType : "text/xml;charset=UTF-8",
          username : utils.getCookie("username"),
          password : utils.getCookie("pass"),
          async : false,
          success : function OnSuccess(data) {
            jQuery(data).find("return").each(function() {
              var user =
                {
                  userName : jQuery(this).find("userName").text(),
                  password : jQuery(this).find("password").text(),
                  groups : []
                };

              jQuery(this).find("groups").each(function() {
                var group = jQuery(this).find('role_name').text();
                user.groups.push(group);
              });

              users.push(user);
            });
          },
          error : function OnError(request, status, error) {
            alert(request.getResponse.text());
          }
        });
      return users;
    },
    AddGroup : function(userName, groupName){
      output = "OK";

      var soapMessage = soapHeader + '<ws:AddGroup>';
      soapMessage += '<user_name>' + userName + '</user_name>';
      soapMessage += '<group_name>' + groupName + '</group_name>';
      soapMessage += '</ws:AddGroup>';
      soapMessage += soapFooter;

      jQuery.ajax(
        {
          url : identityWsURL,
          type : "POST",
          dataType : "xml",
          data : soapMessage,
          processData : false,
          contentType : "text/xml;charset=UTF-8",
          username : utils.getCookie("username"),
          password : utils.getCookie("pass"),
          async : false,
          success : function OnSuccess(data) {
            output = jQuery(data).find("return").text();
          },
          error : function OnError(request, status, error) {
            alert('No fue posible agregar grupo ' + groupName + ' al usuario ' + userName);
          }
        });
      return output;
    },
    RemoveGroup : function(userName, groupName){
      output = "OK";

      var soapMessage = soapHeader + '<ws:RemoveGroup>';
      soapMessage += '<user_name>' + userName + '</user_name>';
      soapMessage += '<group_name>' + groupName + '</group_name>';
      soapMessage += '</ws:RemoveGroup>';
      soapMessage += soapFooter;

      jQuery.ajax(
        {
          url : identityWsURL,
          type : "POST",
          dataType : "xml",
          data : soapMessage,
          processData : false,
          contentType : "text/xml;charset=UTF-8",
          username : utils.getCookie("username"),
          password : utils.getCookie("pass"),
          async : false,
          success : function OnSuccess(data) {
            output = jQuery(data).find("return").text();
          },
          error : function OnError(request, status, error) {
            alert('No fue posible remover el grupo ' + groupName + ' del usuario ' + userName);
          }
        });
      return output;
    },
    changePassword : function(userName,currentPassword, newPassword) {
        output = "OK";

        var soapMessage = soapHeader + '<ws:ChangePassword>';
        soapMessage += '<user_name>' + userName + '</user_name>';
        soapMessage += '<previous_password>' + currentPassword + '</previous_password>';
        soapMessage += '<new_password>' + newPassword + '</new_password>';        
        soapMessage += '</ws:ChangePassword>';
        soapMessage += soapFooter;

        jQuery.ajax(
          {
            url : identityWsURL,
            type : "POST",
            dataType : "xml",
            data : soapMessage,
            processData : false,
            contentType : "text/xml;charset=UTF-8",
            username : utils.getCookie("username"),
            password : utils.getCookie("pass"),
            async : false,
            success : function OnSuccess(data) {
              output = jQuery(data).find("return").text();
              utils.setCookie("pass", newPassword, 365);
            },
            error:function OnError(request, status, error) {
              alert('Erro al intentar actualizar password');
            }
          });
        return output;
      }, 
      RemoveUser : function(userName){
        output = "OK";

        var soapMessage = soapHeader + '<ws:RemoveUser>';
        soapMessage += '<user_name>' + userName + '</user_name>';
        soapMessage += '</ws:RemoveUser>';
        soapMessage += soapFooter;

        jQuery.ajax(
          {
            url : identityWsURL,
            type : "POST",
            dataType : "xml",
            data : soapMessage,
            processData : false,
            contentType : "text/xml;charset=UTF-8",
            username : utils.getCookie("username"),
            password : utils.getCookie("pass"),
            async : false,
            success : function OnSuccess(data) {
              output = jQuery(data).find("return").text();
            },
            error : function OnError(request, status, error) {
              alert('No fue posible remover el usuario ' + userName);
            }
          });
        return output;
      },   
  };
