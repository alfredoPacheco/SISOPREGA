/**
 * THIS IS A COMMERCIAL PROGRAM PROVIDED FOR TRAMEX AND IT'S ASSOCIATES BUILT BY
 * EXTERNAL SOFTWARE PROVIDERS. THE SOFTWARE COMPRISING THIS SYSTEM IS THE
 * PROPERTY OF TRAMEX OR ITS LICENSORS.
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
 */

var consumingGateway = {

    SendMessage : function(rancher_id, message) {
	var result = 'OK';
	var soapMessage = soapHeader + '<ws:SendSimpleMessage>';
	soapMessage += '<rancherId>' + rancher_id + '</rancherId><message>'
		+ message + '</message>';
	soapMessage += '<userName>' + utils.getCookie("username")
		+ '</userName><password>' + utils.getCookie("pass")
		+ '</password>';
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
	soapMessage += '<rancherId>' + rancher_id + '</rancherId><reportName>'
		+ reportName + '</reportName>';
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
	var output = {
	    exceptionDescription : "Success",
	    exceptionId : 0
	};

	// SOAP Message:
	var soapMessage = soapHeader + '<ws:Login>';
	soapMessage += '<userName>' + userId + '</userName>';
	soapMessage += '<password>' + password + '</password>';
	soapMessage += '</ws:Login>' + soapFooter;

	// Ajax request:
	jQuery.ajax({
	    url : '/DMZGatewayBeanService/DMZGateway',
	    type : "POST",
	    dataType : "xml",
	    data : soapMessage,
	    processData : false,
	    contentType : "text/xml;charset=UTF-8",
	    success : function OnSuccess(data) {

		var result = jQuery(data).find("return").text();
		if (result == 'OK') {
		    output.exceptionDescription = "SUCCESS";
		    output.exceptionId = 0;

		    utils.setCookie("username", userId, 365);
		    utils.setCookie("pass", password, 365);

		} else if (result == 'FAIL') {
		    output.exceptionDescription = "Contrase�a incorrecta";
		    output.exceptionId = 1;
		} else {
		    output.exceptionDescription = "El usuario no existe";
		    output.exceptionId = 2;
		}

		setTimeout(function() {
		    callBackMethod(output, objRef);
		}, 1000);
		return false;
	    },
	    error : function OnError(request, status, error) {
		output.exceptionId = 3;
		output.exceptionDescription = error;
		setTimeout(function() {
		    callBackMethod(output, objRef);
		}, 1000);
		return false;
	    }
	});
    },
    Create : function(entityName, entity, cbObj, cbMethod) {
	// Se crea objeto que devolvera la funcion:
	var output = {
	    exceptionDescription : "Success",
	    exceptionId : 0,
	    origin : "",
	    records : []
	};

	// SOAP Message:
	var soapMessage = soapHeader + '<ws:Create>';
	soapMessage += '<request><parentRecord><entity>' + entityName
		+ '</entity>';

	soapMessage += this.xmlFromObject(entity, this);

	soapMessage += '</parentRecord></request>';
	soapMessage += '</ws:Create>' + soapFooter;

	var self = this;

	// Ajax request:
	jQuery.ajax({
	    url : gatewayWsURL,
	    type : "POST",
	    dataType : "xml",
	    data : soapMessage,
	    processData : false,
	    contentType : "text/xml;charset=UTF-8",
	    username : utils.getCookie("username"),
	    password : utils.getCookie("pass"),
	    success : function OnSuccess(data) {
		output.exceptionDescription = jQuery(data).find(
			"exceptionDescription").text();
		output.exceptionId = jQuery(data).find("exceptionId").text();
		if (output.exceptionId == "GW01") {
		    alert(output.exceptionDescription);
		    consumingGateway.LogOut();
		}
		output.origin = jQuery(data).find("origin").text();
		if (output.exceptionId == 0) {
		    output.entityName = entityName;

		    jQuery(data).find("parentRecord").each(
			    function() {
				var record = self.childrenFromParent(
					jQuery(this), self);
				output.records.push(record);
			    });
		}

		if (cbObj) {
		    var milis = ((Math.random() * 1000) + 500);
		    setTimeout(cbObj[cbMethod](output), milis);
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
    Read : function(entityName, entity, cbObj, cbMethod) {
	// Se crea objeto que devolvera la funcion:
	var output = {
	    exceptionDescription : "Success",
	    exceptionId : 0,
	    origin : "",
	    entityName : "",
	    records : []
	};

	// SOAP Message:
	var soapMessage = soapHeader + '<ws:Read><request><filter>';
	soapMessage += '<entity>' + entityName + '</entity>';

	jQuery.each(entity, function(key, value) {
	    soapMessage += '<field>';
	    soapMessage += '<name>' + key + '</name>';
	    soapMessage += '<value>' + value + '</value>';
	    soapMessage += '</field>';
	});

	soapMessage += '</filter></request></ws:Read>' + soapFooter;

	if (utils.getCookie("username") == null) {
	    alert('Usuario no identificado');
	    consumingGateway.LogOut();
	}

	var self = this;

	// Ajax request:
	jQuery.ajax({
	    async:true,
	    url : gatewayWsURL,
	    type : "POST",
	    dataType : "xml",
	    data : soapMessage,
	    processData : false,
	    contentType : "text/xml;charset=UTF-8",
	    username : utils.getCookie("username"),
	    password : utils.getCookie("pass"),
	    success : function OnSuccess(data) {
		output.exceptionDescription = jQuery(data).find(
			"exceptionDescription").text();
		output.exceptionId = jQuery(data).find("exceptionId").text();
		if (output.exceptionId == "GW01") {
		    alert(output.exceptionDescription);
		    consumingGateway.LogOut();
		}
		output.origin = jQuery(data).find("origin").text();

		if (output.exceptionId == 0) {
		    output.entityName = entityName;

		    jQuery(data).find("parentRecord").each(
			    function() {
				var record = self.childrenFromParent(
					jQuery(this), self);
				output.records.push(record);
			    });
		}

		if (cbObj) {
		    var milis = ((Math.random() * 1000) + 500);
		    setTimeout(cbObj[cbMethod](output), milis);
		}

		return false;
	    },
	    error : function OnError(request, status, error) {
		output.exceptionId = 1;
		output.exceptionDescription = error;
		alert(output.exceptionDescription);
		consumingGateway.LogOut();
	    }
	});
	return false;
    },
    Update : function(entityName, entity, cbObj, cbMethod) {
	// Se crea objeto que devolvera la funcion:
	var output = {
	    exceptionDescription : "Success",
	    exceptionId : 0,
	    origin : "",
	    records : []
	};

	// SOAP Message:
	var soapMessage = soapHeader + '<ws:Update><request>';
	soapMessage += '<parentRecord><entity>' + entityName + '</entity>';

	soapMessage += this.xmlFromObject(entity, this);

	soapMessage += '</parentRecord>';
	soapMessage += '</request></ws:Update>' + soapFooter;

	var self = this;

	// Ajax request:
	jQuery.ajax({
	    url : gatewayWsURL,
	    type : "POST",
	    dataType : "xml",
	    data : soapMessage,
	    processData : false,
	    contentType : "text/xml;charset=UTF-8",
	    username : utils.getCookie("username"),
	    password : utils.getCookie("pass"),
	    success : function OnSuccess(data) {
		output.exceptionDescription = jQuery(data).find(
			"exceptionDescription").text();
		output.exceptionId = jQuery(data).find("exceptionId").text();
		if (output.exceptionId == "GW01") {
		    alert(output.exceptionDescription);
		    consumingGateway.LogOut();
		}
		output.origin = jQuery(data).find("origin").text();

		if (output.exceptionId == 0) {
		    output.entityName = entityName;

		    jQuery(data).find("parentRecord").each(
			    function() {
				var record = self.childrenFromParent(
					jQuery(this), self);
				output.records.push(record);
			    });
		}

		if (cbObj) {
		    var milis = ((Math.random() * 1000) + 500);
		    setTimeout(cbObj[cbMethod](output), milis);
		}
		return false;
	    },
	    error : function OnError(request, status, error) {
		output.exceptionId = 1;
		output.exceptionDescription = error + ' :' + status;
		alert(output.exceptionDescription);
		consumingGateway.LogOut();
	    }
	});
	return false;
    },
    UpdateArrayParents : function(entityName, arrEntity, cbObj, cbMethod) {
	// Se crea objeto que devolvera la funcion:
	var output = {
	    exceptionDescription : "Success",
	    exceptionId : 0,
	    origin : "",
	    records : []
	};

	// SOAP Message:
	var soapMessage = soapHeader + '<ws:Update><request>';
	
	for(var i=0;i<arrEntity.length;i++){
	    var entity = arrEntity[i];
	    soapMessage += '<parentRecord><entity>' + entityName + '</entity>';
	    soapMessage += this.xmlFromObject(entity, this);
	    soapMessage += '</parentRecord>';    
	}
	
	soapMessage += '</request></ws:Update>' + soapFooter;

	var self = this;

	// Ajax request:
	jQuery.ajax({
	    url : gatewayWsURL,
	    type : "POST",
	    dataType : "xml",
	    data : soapMessage,
	    processData : false,
	    contentType : "text/xml;charset=UTF-8",
	    username : utils.getCookie("username"),
	    password : utils.getCookie("pass"),
	    success : function OnSuccess(data) {
		output.exceptionDescription = jQuery(data).find(
			"exceptionDescription").text();
		output.exceptionId = jQuery(data).find("exceptionId").text();
		if (output.exceptionId == "GW01") {
		    alert(output.exceptionDescription);
		    consumingGateway.LogOut();
		}
		output.origin = jQuery(data).find("origin").text();

		if (output.exceptionId == 0) {
		    output.entityName = entityName;

		    jQuery(data).find("parentRecord").each(
			    function() {
				var record = self.childrenFromParent(
					jQuery(this), self);
				output.records.push(record);
			    });
		}

		if (cbObj) {
		    var milis = ((Math.random() * 1000) + 500);
		    setTimeout(cbObj[cbMethod](output), milis);
		}
		return false;
	    },
	    error : function OnError(request, status, error) {
		output.exceptionId = 1;
		output.exceptionDescription = error + ' :' + status;
		alert(output.exceptionDescription);
		consumingGateway.LogOut();
	    }
	});
	return false;
    },
    Delete : function(entityName, filterDef, cbObj, cbMethod) {
	// Se crea objeto que devolvera la funcion:
	output = {
	    exceptionDescription : "Success",
	    exceptionId : 0,
	    origin : "",
	};

	// SOAP Message:
	var soapMessage = soapHeader + '<ws:Delete>';
	soapMessage += '<request><filter><entity>' + entityName + '</entity>';

	soapMessage += '<field>';
	soapMessage += '<name>id</name>';
	soapMessage += '<value>' + filterDef.id + '</value>';
	soapMessage += '</field>';

	soapMessage += '</filter></request>';
	soapMessage += '</ws:Delete>' + soapFooter;

	// Ajax request:
	jQuery.ajax({
	    url : gatewayWsURL,
	    type : "POST",
	    dataType : "xml",
	    data : soapMessage,
	    processData : false,
	    contentType : "text/xml;charset=UTF-8",
	    username : utils.getCookie("username"),
	    password : utils.getCookie("pass"),
	    success : function OnSuccess(data) {
		output.exceptionDescription = jQuery(data).find(
			"exceptionDescription").text();
		output.exceptionId = jQuery(data).find("exceptionId").text();
		if (output.exceptionId == "GW01") {
		    alert(output.exceptionDescription);
		    consumingGateway.LogOut();
		}
		output.origin = jQuery(data).find("origin").text();
		if (cbObj) {
		    var milis = ((Math.random() * 1000) + 500);
		    setTimeout(cbObj[cbMethod](output), milis);
		}
		return false;
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
    CreateRancherUser : function(rancherId, userName, password, cbObj, cbMethod) {

	// Se crea objeto que devolvera la funcion:
	var output = {
	    exceptionDescription : "Success",
	    exceptionId : 0,
	    origin : "",
	    records : []
	};

	var soapMessage = soapHeader + '<ws:CreateRancherUser>';
	soapMessage += '<rancherId>' + rancherId + '</rancherId>';
	soapMessage += '<userName>' + userName + '</userName>';
	soapMessage += '<password>' + password + '</password>';
	soapMessage += '</ws:CreateRancherUser>';
	soapMessage += soapFooter;

	var self = this;

	jQuery.ajax({
	    url : identityWsURL,
	    type : "POST",
	    dataType : "xml",
	    data : soapMessage,
	    processData : false,
	    contentType : "text/xml;charset=UTF-8",
	    username : utils.getCookie("username"),
	    password : utils.getCookie("pass"),
	    success : function OnSuccess(data) {
		output.exceptionDescription = jQuery(data).find(
			"exceptionDescription").text();
		output.exceptionId = jQuery(data).find("exceptionId").text();
		if (output.exceptionId == "GW01") {
		    alert(output.exceptionDescription);
		    consumingGateway.LogOut();
		}
		output.origin = jQuery(data).find("origin").text();

		if (output.exceptionId == 0) {
		    jQuery(data).find("parentRecord").each(
			    function() {
				var record = self.childrenFromParent(
					jQuery(this), self);
				output.records.push(record);
				output.entityName = record.entityName;
			    });
		}

		if (cbObj) {
		    var milis = ((Math.random() * 1000) + 500);
		    setTimeout(cbObj[cbMethod](output), milis);
		}
		return false;
	    },
	    error : function OnError(request, status, error) {
		output.exceptionId = 1;
		output.exceptionDescription = error + ' :' + status;
		alert(output.exceptionDescription);
		consumingGateway.LogOut();
	    }
	});
    },
    ResetPassword : function(userName, password, cbObj, cbMethod) {
	// Se crea objeto que devolvera la funcion:
	var output = {
	    exceptionDescription : "Success",
	    exceptionId : 0,
	    origin : "",
	    records : []
	};

	var logout = false;
	if (utils.getCookie("username") == userName) {
	    var change = confirm("Esta a punto de reiniciar su propia contrase�a,\n"
		    + "Esta acci�n s�lo podr� ser procesada al volver entrar al sistema \n\n"
		    + "�Desea realizar esta acci�n y salir inmediatamente de SISOPREGA?");
	    if (change == false) {
		cacheMan.hideScrim();
		return false;
	    } else {
		utils.setCookie("lastPass", "", 365);
		logout = true;
		cbObj = false;
	    }
	}

	var soapMessage = soapHeader + '<ws:ResetPassword>';
	soapMessage += '<user_name>' + userName + '</user_name>';
	soapMessage += '<password>' + password + '</password>';
	soapMessage += '</ws:ResetPassword>';
	soapMessage += soapFooter;

	var self = this;

	jQuery
		.ajax({
		    url : identityWsURL,
		    type : "POST",
		    dataType : "xml",
		    data : soapMessage,
		    processData : false,
		    contentType : "text/xml;charset=UTF-8",
		    username : utils.getCookie("username"),
		    password : utils.getCookie("pass"),
		    success : function OnSuccess(data) {
			output.exceptionDescription = jQuery(data).find(
				"exceptionDescription").text();
			output.exceptionId = jQuery(data).find("exceptionId")
				.text();
			if (output.exceptionId == "GW01") {
			    alert(output.exceptionDescription);
			    consumingGateway.LogOut();
			}
			output.origin = jQuery(data).find("origin").text();

			if (output.exceptionId == 0) {
			    jQuery(data).find("parentRecord").each(
				    function() {
					var record = self.childrenFromParent(
						jQuery(this), self);
					output.records.push(record);
					output.entityName = record.entityName;
				    });

			    if (!output.entityName)
				output.entityName = "User";

			}

			if (cbObj) {
			    var milis = ((Math.random() * 1000) + 500);
			    setTimeout(cbObj[cbMethod](output), milis);
			}

			if (logout)
			    self.cleanLogout();

			return false;
		    },
		    error : function OnError(request, status, error) {
			output.exceptionId = 1;
			output.exceptionDescription = 'No fue posible volver a asignar contrase�a para el usuario '
				+ userName + ' ERROR: ' + status;
			if (cbObj) {
			    var milis = ((Math.random() * 1000) + 500);
			    setTimeout(cbObj[cbMethod](output), milis);
			}
			return false;
		    }
		});
	return output;
    },
    ReadAllUsers : function(cbObj, cbMethod) {
	// Se crea objeto que devolvera la funcion:
	users = [];

	// SOAP Message:
	var soapMessage = soapHeader + '<ws:ReadAllUsers/>' + soapFooter;

	// Ajax request:
	jQuery
		.ajax({
		    url : identityWsURL,
		    type : "POST",
		    dataType : "xml",
		    data : soapMessage,
		    processData : false,
		    contentType : "text/xml;charset=UTF-8",
		    username : utils.getCookie("username"),
		    password : utils.getCookie("pass"),
		    success : function OnSuccess(data) {
			jQuery(data).find("return").each(
				function() {
				    var user = {
					userName : jQuery(this)
						.find("userName").text(),
					password : jQuery(this)
						.find("password").text(),
					groups : []
				    };

				    jQuery(this).find("groups").each(
					    function() {
						var group = jQuery(this).find(
							'role_name').text();
						user.groups.push(group);
					    });

				    users.push(user);
				});

			var milis = ((Math.random() * 1000) + 500);
			setTimeout(cbObj[cbMethod](users), milis);
			return false;
		    },
		    error : function OnError(request, status, error) {
			alert('No fue posible leer la lista de usuarios en la base de datos. ERROR: '
				+ status);

			if (cbObj) {
			    var milis = ((Math.random() * 1000) + 500);
			    setTimeout(cbObj[cbMethod](output), milis);
			}
			return false;
		    }
		});
    },
    LogOut : function() {
	// Se crea objeto que devolvera la funcion:
	output = {
	    result : "",
	    exceptionDescription : "Success",
	    exceptionId : 0,
	};

	utils.setCookie("lastUser", utils.getCookie("username"), 365);
	utils.setCookie("lastPass", utils.getCookie("pass"), 365);

	utils.setCookie("username", "", -1);
	utils.setCookie("pass", "", -1);

	this.cleanLogout();
    },
    cleanLogout : function() {
	try {
	    enyo.$.sisoprega.destroy();
	} catch (e) {
	}
	window.location = './';
    },
    AddUser : function(objUser, cbObj, cbMethod) {
	// Se crea objeto que devolvera la funcion:
	var output = {
	    exceptionDescription : "Success",
	    exceptionId : 0,
	    origin : "",
	    records : []
	};

	var soapMessage = soapHeader + '<ws:CreateUser>';
	soapMessage += '<user>';
	soapMessage += '<userName>' + objUser.userName + '</userName>';
	soapMessage += '<password>' + objUser.password + '</password>';

	for (index in objUser.groupsToAdd) {
	    soapMessage += '<groups>';
	    soapMessage += '<record_id>0</record_id>';
	    soapMessage += '<role_name>' + objUser.groupsToAdd[index]
		    + '</role_name>';
	    soapMessage += '<user_name>' + objUser.userName + '</user_name>';
	    soapMessage += '</groups>';
	}

	soapMessage += '</user>';
	soapMessage += '</ws:CreateUser>';
	soapMessage += soapFooter;

	var self = this;

	jQuery
		.ajax({
		    url : identityWsURL,
		    type : "POST",
		    dataType : "xml",
		    data : soapMessage,
		    processData : false,
		    contentType : "text/xml;charset=UTF-8",
		    username : utils.getCookie("username"),
		    password : utils.getCookie("pass"),
		    success : function OnSuccess(data) {
			output.exceptionDescription = jQuery(data).find(
				"exceptionDescription").text();
			output.exceptionId = jQuery(data).find("exceptionId")
				.text();
			if (output.exceptionId == "GW01") {
			    alert(output.exceptionDescription);
			    consumingGateway.LogOut();
			}
			output.origin = jQuery(data).find("origin").text();

			if (output.exceptionId == 0) {

			    jQuery(data).find("parentRecord").each(
				    function() {
					var record = self.childrenFromParent(
						jQuery(this), self);
					output.records.push(record);
					output.entityName = record.entityName;
				    });

			    if (!output.entityName)
				output.entityName = "User";

			}

			if (cbObj) {
			    var milis = ((Math.random() * 1000) + 500);
			    setTimeout(cbObj[cbMethod](output), milis);
			}
			return false;
		    },
		    error : function OnError(request, status, error) {
			output.exceptionId = 1;
			output.exceptionDescription = 'No fue posible volver a asignar contrase�a para el usuario '
				+ objUser.userName + ' ERROR: ' + status;
			if (cbObj) {
			    var milis = ((Math.random() * 1000) + 500);
			    setTimeout(cbObj[cbMethod](output), milis);
			}
			return false;
		    }
		});
    },

    AddGroup : function(userName, groupName, cbObj, cbMethod) {
	output = "OK";

	var soapMessage = soapHeader + '<ws:AddGroup>';
	soapMessage += '<user_name>' + userName + '</user_name>';
	soapMessage += '<group_name>' + groupName + '</group_name>';
	soapMessage += '</ws:AddGroup>';
	soapMessage += soapFooter;

	var self = this;

	jQuery
		.ajax({
		    url : identityWsURL,
		    type : "POST",
		    dataType : "xml",
		    data : soapMessage,
		    processData : false,
		    contentType : "text/xml;charset=UTF-8",
		    username : utils.getCookie("username"),
		    password : utils.getCookie("pass"),
		    success : function OnSuccess(data) {
			output = jQuery(data).find("return").text();
			var milis = ((Math.random() * 1000) + 500);
			setTimeout(cbObj[cbMethod](output), milis);
			return false;
		    },
		    error : function OnError(request, status, error) {
			if (status == 500) {
			    alert("Usted no cuenta con los permisos necesarios para realizar esta operaci�n, la acci�n ser� reportada al administrador del sistema.");
			    self.cleanLogout();
			}
			output.exceptionId = 1;
			output.exceptionDescription = 'No fue posible agregar grupo '
				+ groupName
				+ ' al usuario '
				+ userName
				+ ' ERROR: ' + status;
			if (cbObj) {
			    var milis = ((Math.random() * 1000) + 500);
			    setTimeout(cbObj[cbMethod](output), milis);
			}
			return false;
		    }
		});
    },
    RemoveGroup : function(userName, groupName, cbObj, cbMethod) {
	output = "OK";

	var soapMessage = soapHeader + '<ws:RemoveGroup>';
	soapMessage += '<user_name>' + userName + '</user_name>';
	soapMessage += '<group_name>' + groupName + '</group_name>';
	soapMessage += '</ws:RemoveGroup>';
	soapMessage += soapFooter;

	jQuery
		.ajax({
		    url : identityWsURL,
		    type : "POST",
		    dataType : "xml",
		    data : soapMessage,
		    processData : false,
		    contentType : "text/xml;charset=UTF-8",
		    username : utils.getCookie("username"),
		    password : utils.getCookie("pass"),
		    success : function OnSuccess(data) {
			output = jQuery(data).find("return").text();
			var milis = ((Math.random() * 1000) + 500);
			setTimeout(cbObj[cbMethod](output), milis);
			return false;
		    },
		    error : function OnError(request, status, error) {
			if (status == 500) {
			    alert("Usted no cuenta con los permisos necesarios para realizar esta operaci�n, la acci�n ser� reportada al administrador del sistema.");
			    self.cleanLogout();
			}
			output.exceptionId = 1;
			output.exceptionDescription = 'No fue posible remover el grupo '
				+ groupName
				+ ' del usuario '
				+ userName
				+ ' ERROR: ' + status;
			if (cbObj) {
			    var milis = ((Math.random() * 1000) + 500);
			    setTimeout(cbObj[cbMethod](output), milis);
			}
			return false;

		    }
		});
    },
    changePassword : function(userName, currentPassword, newPassword, cbObj,
	    cbMethod) {
	output = "OK";

	var soapMessage = soapHeader + '<ws:ChangePassword>';
	soapMessage += '<user_name>' + userName + '</user_name>';
	soapMessage += '<previous_password>' + currentPassword
		+ '</previous_password>';
	soapMessage += '<new_password>' + newPassword + '</new_password>';
	soapMessage += '</ws:ChangePassword>';
	soapMessage += soapFooter;

	jQuery.ajax({
	    url : identityWsURL,
	    type : "POST",
	    dataType : "xml",
	    data : soapMessage,
	    processData : false,
	    contentType : "text/xml;charset=UTF-8",
	    username : utils.getCookie("username"),
	    password : utils.getCookie("pass"),
	    success : function OnSuccess(data) {
		output = jQuery(data).find("return").text();
		utils.setCookie("pass", newPassword, 365);
		cbObj[cbMethod](output);
		return false;
	    },
	    error : function OnError(request, status, error) {
		alert('Erro al intentar actualizar password');
		cbObj[cbMethod](output);
		return false;
	    }
	});
    },
    RemoveUser : function(userName, cbObj, cbMethod) {
	output = "OK";

	if (userName == utils.getCookie("username")) {
	    alert('No se puede borrar el mismo usuario con que se inici� la sesi�n. ['
		    + userName + ']');
	    cbObj[cbMethod](output);
	    return false;
	}

	var soapMessage = soapHeader + '<ws:RemoveUser>';
	soapMessage += '<user_name>' + userName + '</user_name>';
	soapMessage += '</ws:RemoveUser>';
	soapMessage += soapFooter;

	jQuery.ajax({
	    url : identityWsURL,
	    type : "POST",
	    dataType : "xml",
	    data : soapMessage,
	    processData : false,
	    contentType : "text/xml;charset=UTF-8",
	    username : utils.getCookie("username"),
	    password : utils.getCookie("pass"),
	    success : function OnSuccess(data) {
		output = jQuery(data).find("return").text();
		cbObj[cbMethod](output);
		return false;
	    },
	    error : function OnError(request, status, error) {
		alert('No fue posible remover el usuario ' + userName);
		cbObj[cbMethod](output);
		return false;
	    }
	});
    },
    childrenFromParent : function(xml, self) {
	// child records
	var parentRecord = {};
	parentRecord.entityName = xml.children("entity").text();
	xml.children("field").each(function() {
	    var vName = jQuery(this).find('name').text();
	    var vValue = jQuery(this).find('value').text();
	    parentRecord[vName] = vValue;
	});

	xml.children("childRecord").each(function() {
	    var objChild = self.childrenFromParent(jQuery(this), self);
	    if (!parentRecord[objChild.entityName]) {
		parentRecord[objChild.entityName] = [];
	    }
	    parentRecord[objChild.entityName].push(objChild);
	});

	return parentRecord;
    },
    xmlFromObject : function(entity, self) {
	var result = "";

	for ( var field in entity) {
	    if (entity.hasOwnProperty(field)) {
		if (!Array.isArray(entity[field])) {
		    result += '<field>';
		    result += '<name>' + field + '</name>';
		    result += '<value>' + entity[field] + '</value>';
		    result += '</field>';
		} else {
		    for ( var childIndex in entity[field]) {
			var child = entity[field][childIndex];
			result += '<childRecord>';
			result += '<entity>' + field + '</entity>';
			result += self.xmlFromObject(child, self);
			result += '</childRecord>';
		    }
		}
	    }
	}
	return result;
    }
};
