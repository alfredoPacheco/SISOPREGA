enyo.kind({
	name: "cache.ranchers",
	arrObj:[],
	wasReadFromGateway: false,
	contactsReadFromGateway:[],
	reloadme:function(){
		//AJAX
	},	
	get:function(){
		
		if (this.wasReadFromGateway == false){
			//cacheMan.showScrim();
			this.wasReadFromGateway = true;
			objAux = {};
			arrAux = [];
			selfCacheRancher = this;		
			cgReadAll = consumingGateway.Read("Rancher", "testRequest", {});
			
			if (cgReadAll.exceptionId == 0){ //Read successfully
				jQuery.each(cgReadAll.records, function() {       		
		    		jQuery.each(this, function(key, value){
		    			objAux[key] = value;	
		    		});
		    		arrAux.push(selfCacheRancher.rancherAdapterToIn(objAux));
		    	});
//				//loading contacts from webservice:
//				cgReadAllContacts = consumingGateway.Read();
//				
				
			}
			else{ //Error
				//cacheMan.setMessage("", "","[Exception ID: " + cgCreate.exceptionId + "] Error al intentar crear Ganadero.");				
				if (cgReadAll.exceptionId != "RR02"){
					cacheMan.setMessage("", "","[Exception ID: " + cgReadAll.exceptionId + "] Descripcion: " + cgReadAll.exceptionDescription);	
				}			
			}			
			
			this.arrObj =  arrAux;
			_arrRancherList = arrAux;
//			cacheMan.hideScrim();
		}
		
		return this.arrObj;
	},
	rancherAdapterToOut:function(objRan){
		
		var objNew = {
				rancherId:		objRan.rancher_id,
				aka:			objRan.aka,
				birthDate:		"" + DateOut(objRan.birth_date),
				emailAddress:	objRan.email_add,
				firstName:		objRan.first_name,
				lastName:		objRan.last_name,
				motherName:		objRan.mother_name,
				phone:			objRan.phone_number,						
				rfc:			objRan.rfc,
				contacts:		objRan.contacts,
				billing:		objRan.billing,
				rancher_type:	objRan.rancher_type
			};
		return objNew;
	},
	rancherContactAdapterToOut:function(objCli){
		var objNew = {
				contactId:		objCli.contact_id,
				rancherId:		objCli.rancher_id,
				aka:			objCli.aka,
				firstName:		objCli.first_name,
				lastName:		objCli.last_name,
				motherName:		objCli.mother_name,
				birthDate:		"" + DateOut(objCli.birth_date),
				emailAddress:	objCli.email_add,
				telephone:		objCli.telephone,
				addressOne:		objCli.address_one,						
				addressTwo:		objCli.address_two,
				city:			objCli.city,
				addressState:	objCli.address_state,
				zipCode:		objCli.zip_code				
			};
		return objNew;		   
	},
	rancherAdapterToIn:function(objRan){
		
		var objNew = {
				rancher_id:		objRan.rancherId,
				aka:			objRan.aka,				
				birth_date:		"" + UTCtoNormalDate(objRan.birthDate),
				email_add:		objRan.emailAddress,				
				first_name:		objRan.firstName,				
				last_name:		objRan.lastName,				
				mother_name:	objRan.motherName,				
				phone_number:	objRan.phone
			};
		
//		Fields out of web service:		
		objNew.rfc = "";
		objNew.contacts=[];
		objNew.billing={};
		objNew.rancher_type=1;
		
		return objNew;
	},
	rancherContactAdapterToIn:function(objCli){
		var objNew = {
				contact_id:		objCli.contactId,
				rancher_id:		objCli.rancherId,
				aka:			objCli.aka,
				first_name:		objCli.firstName,
				last_name:		objCli.lastName,
				mother_name:	objCli.motherName,
				birth_date:		"" + UTCtoNormalDate(objCli.birthDate),
				email_add:		objCli.emailAddress,
				telephone:		objCli.telephone,
				address_one:	objCli.addressOne,
				address_two:	objCli.addressTwo,
				city:			objCli.city,
				address_state:	objCli.addressState,
				zip_code:		objCli.zipCode								
			};
		return objNew;	
	},
	create:function(objRan,cbObj,cbMethod){
		//AJAX
		objToSend = this.rancherAdapterToOut(objRan);
		delete objToSend.rancherId;
		cgCreate = consumingGateway.Create("Rancher", "test", objToSend);
		if (cgCreate.exceptionId == 0){ //Created successfully			
			objRan.rancher_id = cgCreate.generatedId;
			this.arrObj.push(objRan);
			_arrRancherList = this.arrObj;
			if(cbMethod){
				cbObj[cbMethod]();
			}
			return true;
		}
		else{ //Error
			//cacheMan.setMessage("", "","[Exception ID: " + cgCreate.exceptionId + "] Error al intentar crear Ganadero.");
			cacheMan.setMessage("", "","[Exception ID: " + cgCreate.exceptionId + "] Descripcion: " + cgCreate.exceptionDescription);
			return false;
		}
	},
	upd:function(objOld,objNew,cbObj,cbMethod){
		objNew.rancher_id = objOld.rancher_id;
		objToSend = this.rancherAdapterToOut(objNew);
		cgUpdate = consumingGateway.Update("Rancher", "test", objToSend);
		if (cgUpdate.exceptionId == 0){ //Updated successfully
			var tamanio = this.get().length;
			for(var i=0;i<tamanio;i++){
				if (this.arrObj[i].rancher_id == objOld.rancher_id){
					this.arrObj[i] = objNew;
					_arrRancherList = this.arrObj;
					cbObj.objRan = objNew;
					if(cbMethod){
						cbObj[cbMethod]();
					}
					return true;					
				}
			}
			return false;
		}
		else{ //Error			
			cacheMan.setMessage("", "","[Exception ID: " + cgUpdate.exceptionId + "] Descripcion: " + cgUpdate.exceptionDescription);
			return false;
		}		
	},
	del:function(delObj,cbObj,cbMethod){		
		//AJAX
		//Update Internal Object
		objToSend = this.rancherAdapterToOut(delObj);
		delete objToSend.aka;
		delete objToSend.birthDate;
		delete objToSend.emailAddress;
		delete objToSend.firstName;
		delete objToSend.lastName;
		delete objToSend.motherName;
		delete objToSend.phone;
		delete objToSend.rfc;
		delete objToSend.contacts;
		delete objToSend.billing;
		delete objToSend.rancher_type;
		
		
		cgDelete = consumingGateway.Delete("Rancher", "testRequest", objToSend);
		if (cgDelete.exceptionId == 0){ //Deleted successfully
			var tamanio = this.get().length;
			for(var i=0;i<tamanio;i++){
				if (this.arrObj[i].rancher_id == delObj.rancher_id){
					this.arrObj.splice(i, 1);
					_arrRancherList = this.arrObj;
					if(cbMethod){
						cbObj[cbMethod]();
					}
					return true;					
				}
			}
			return false;
		}
		else{ //Error
			cacheMan.setMessage("", "","[Exception ID: " + cgUpdate.exceptionId + "] Descripcion: " + cgUpdate.exceptionDescription);
			return false;
		}
	},
	ls:function(){
		var _arrRancherListLS=[];
		for(var i=0;i<this.get().length;i++){		
			if(this.get()[i].rancher_type==1){
				_arrRancherListLS.push({caption:this.get()[i].last_name  +' '+
												this.get()[i].mother_name+' '+
												this.get()[i].first_name,
										value:this.get()[i].rancher_id});
			}else{
				_arrRancherListLS.push({caption:this.get()[i].company_name,
										value:this.get()[i].rancher_id});				
			}
		}
		return _arrRancherListLS;
	},
	getByID:function(iRancherID){
		for(var i=0; i<this.get().length;i++){
			if (this.get()[i].rancher_id==iRancherID){
				return this.get()[i];
			}
		}
	},
	getContacts:function(objRan){
//		if (this.wasReadFromGateway == false){
			//cacheMan.showScrim();
//			this.wasReadFromGateway = true;
		
		for (i in this.contactsReadFromGateway){
			if (this.contactsReadFromGateway[i]==objRan.rancher_id){
				return objRan.contacts;
			}
		}
		
		this.contactsReadFromGateway.push(objRan.rancher_id);
		var objAux = {};
		var arrAux = [];
		var selfCacheRancher = this;		
		var objToSend = new Object();
		objToSend.rancherId = objRan.rancher_id;
		var cgReadAllContacts = consumingGateway.Read("RancherContact", "testRequest", objToSend);
		
		if (cgReadAllContacts.exceptionId == 0){ //Read successfully
			jQuery.each(cgReadAllContacts.records, function() {       		
	    		jQuery.each(this, function(key, value){
	    			objAux[key] = value;	
	    		});		    		
	    		arrAux.push(selfCacheRancher.rancherContactAdapterToIn(objAux));	    		
	    	});
		}
//			else{ //Error
//				//cacheMan.setMessage("", "","[Exception ID: " + cgCreate.exceptionId + "] Error al intentar crear Ganadero.");				
//				if (cgReadAll.exceptionId != "RR02"){
//					cacheMan.setMessage("", "","[Exception ID: " + cgReadAll.exceptionId + "] Descripcion: " + cgReadAll.exceptionDescription);	
//				}			
//			}			
			
//			this.arrObj =  arrAux;
//			_arrRancherList = arrAux;
//			cacheMan.hideScrim();
//		}
		
		return objRan.contacts = arrAux;
	},
	addContact:function(objRancher,objCon,cbObj,cbMethod){
		//AJAX
		objCon.rancher_id = objRancher.rancher_id;
		objToSend = this.rancherContactAdapterToOut(objCon);
		delete objToSend.contactId;
		
		cgCreate = consumingGateway.Create("RancherContact", "test", objToSend);
		if (cgCreate.exceptionId == 0){ //Created successfully			
			objCon.contact_id = cgCreate.generatedId;
			objRancher.contacts.push(objCon);
			
//			this.arrObj.push(objCon);
//			_arrRancherList = this.arrObj;
			if(cbMethod){
				cbObj[cbMethod]();
			}
			return true;
		}
		else{ //Error
			//cacheMan.setMessage("", "","[Exception ID: " + cgCreate.exceptionId + "] Error al intentar crear Ganadero.");
			cacheMan.setMessage("", "","[Exception ID: " + cgCreate.exceptionId + "] Descripcion: " + cgCreate.exceptionDescription);
			return false;
		}
	},
	updateContact:function(objRancher,objOld,objNew,cbObj,cbMethod){
		//AJAX
		//Update Local		
		for (var sKey in objNew){
			objOld[sKey]=objNew[sKey];
		}
		if(cbMethod){
			cbObj[cbMethod]();
		}		
	},
	deleteContact:function(objRancher,objCon,cbObj,cbMethod){
		//AJAX
		//Update Local
		for(var i=0;i<objRancher.contacts.length;i++){
			if(objRancher.contacts[i]===objCon){
				objRancher.contacts.splice(i, 1);	
				if(cbMethod){
					cbObj[cbMethod]();
				}		
				return true;								
				break;
			}
		}			
		if(cbMethod){
			cbObj[cbMethod]();
		}			
	},	
	updateBilling:function(objRancher,objBill,cbObj,cbMethod){
		for (var sKey in objBill){
			if(objBill[sKey]!=null){
				objRancher.billing[sKey]=objBill[sKey];
			}
		}		
		if(cbMethod){
			cbObj[cbMethod]();
		}		
	}
});
var cacheRanchers= new cache.ranchers();


function UTCtoNormalDate(strUTC){
	var dateFmt = "";
	if (strUTC != "" && strUTC !== undefined){
		strAux = strUTC.split(" ");
		var fmt = new enyo.g11n.DateFmt({format: "yyyy/MM/dd"});
		var dateFromUTC = new Date(strUTC);			
		dateFmt = fmt.format(dateFromUTC);
	}
	return dateFmt;
}

function DateOut(normalDate){
	var dateFmt = "";
	if (normalDate != "" && normalDate !== undefined){
		var fmt = new enyo.g11n.DateFmt({format: "MM/dd/yyyy"});
		var dateNew= new Date(normalDate);
		dateFmt = fmt.format(dateNew);
	}
	return dateFmt;
}