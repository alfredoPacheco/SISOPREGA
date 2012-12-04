enyo.kind({
	name: "cache.ranchers",
	arrObj:[],
	rancherWasReadFromGateway: false,
	invoiceWasReadFromGateway: false,
	contactsReadFromGateway:[],
	reloadme:function(){
		//AJAX
	},	
	get:function(){
		
		if (this.rancherWasReadFromGateway == false){
//			cacheMan.showScrim();
			this.rancherWasReadFromGateway = true;
			var objAux = {};
			var arrAux = [];
			var selfCacheRancher = this;		
			
	//Retrieve Ranchers
			var cgReadAllRanchers = consumingGateway.Read("Rancher", {});
			
			if (cgReadAllRanchers.exceptionId == 0){ //Read successfully
				jQuery.each(cgReadAllRanchers.records, function() {       		
		    		jQuery.each(this, function(key, value){
		    			objAux[key] = value;	
		    		});
		    		objTmp = selfCacheRancher.rancherAdapterToIn(objAux);
		    		objTmp.billing = selfCacheRancher.getInvoice(objTmp);
		    		arrAux.push(objTmp);
		    	});
			}else{ //Error
				if (cgReadAllRanchers.exceptionId != "RR02"){ //No data found
					cacheMan.setMessage("", "","[Exception ID: " + cgReadAllRanchers.exceptionId + "] Descripción: " + cgReadAllRanchers.exceptionDescription);	
				}			
			}
			
			
	//Retrieve Enterprise Ranchers:
			var cgReadAllEnterpriseRanchers = consumingGateway.Read("EnterpriseRancher", {});
			if (cgReadAllEnterpriseRanchers.exceptionId == 0){ //Read successfully
				jQuery.each(cgReadAllEnterpriseRanchers.records, function() {       		
		    		jQuery.each(this, function(key, value){
		    			objAux[key] = value;	
		    		});		    		
		    		objTmp = selfCacheRancher.enterpriseRancherAdapterToIn(objAux);
		    		objTmp.billing = selfCacheRancher.getInvoice(objTmp);
		    		arrAux.push(objTmp);
		    	});			
			}
			else{ //Error								
				if (cgReadAllEnterpriseRanchers.exceptionId != "ERR2"){//No data found
					cacheMan.setMessage("", "","[Exception ID: " + cgReadAllEnterpriseRanchers.exceptionId + "] Descripcion: " + cgReadAllEnterpriseRanchers.exceptionDescription);	
				}			
			}
			
			this.arrObj =  arrAux;
			_arrRancherList = arrAux;
			
//			cacheMan.hideScrim();
		}
		
		return this.arrObj;
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
		objNew.billing=objRan.billing;
		objNew.rancher_type=1;
		
		return objNew;
	},
	rancherAdapterToOut:function(objRan){
		//only with fields as webservice has
		var objNew = {
				rancherId:		objRan.rancher_id,
				aka:			objRan.aka,
				birthDate:		"" + DateOut(objRan.birth_date),
				emailAddress:	objRan.email_add,
				firstName:		objRan.first_name,
				lastName:		objRan.last_name,
				motherName:		objRan.mother_name,
				phone:			objRan.phone_number,						
//				rfc:			objRan.rfc,
//				contacts:		objRan.contacts,
//				billing:		objRan.billing,
//				rancher_type:	objRan.rancher_type
			};
		return objNew;
	},
	rancherContactAdapterToIn:function(objCon){
		var objNew = {
				contact_id:		objCon.contactId,
				rancher_id:		objCon.rancherId,
				aka:			objCon.aka,
				first_name:		objCon.firstName,
				last_name:		objCon.lastName,
				mother_name:	objCon.motherName,
				birth_date:		"" + UTCtoNormalDate(objCon.birthDate),
				email_add:		objCon.emailAddress,
				phone_number:	objCon.telephone,
				address_one:	objCon.addressOne,
				address_two:	objCon.addressTwo,
				city:			objCon.city,
				address_state:	objCon.addressState,
				zip_code:		objCon.zipCode
			};
		return objNew;	
	},
	rancherContactAdapterToOut:function(objCon){
		var objNew = {
				contactId:		objCon.contact_id,
				rancherId:		objCon.rancher_id,
				aka:			objCon.aka,
				firstName:		objCon.first_name,
				lastName:		objCon.last_name,
				motherName:		objCon.mother_name,
				birthDate:		"" + DateOut(objCon.birth_date),
				emailAddress:	objCon.email_add,
				telephone:		objCon.phone_number,
				addressOne:		objCon.address_one,						
				addressTwo:		objCon.address_two,
				city:			objCon.city,
				addressState:	objCon.address_state,
				zipCode:		objCon.zip_code				
			};
		return objNew;		   
	},
	rancherInvoiceAdapterToIn:function(objBill){


		var objNew = {
			billing_id:		objBill.rancherInvoiceId,
			rancher_id:		objBill.rancherId,
			company_name:	objBill.legalName,
			address_one:	objBill.addressOne,
			address_two:	objBill.addressTwo,
			city_id:		objBill.city,
			state_id:		objBill.addressState,
			zip_code:		objBill.zipCode,
			rfc:			objBill.legalId
		};
//		TODO: AGREGAR PHONE NUMBER EN DEMAS CLASES
		objNew.phone_number="";

		return objNew;
	},
	rancherInvoiceAdapterToOut:function(objBill){
//		company_name:	"",					 
//		state_id:		"",
//		rfc:			"",
//		phone_number:	""
		var objNew = {
			rancherInvoiceId:	objBill.billing_id,
			rancherId:			objBill.rancher_id,
			legalName:			objBill.company_name,
			addressOne:			objBill.address_one,
			addressTwo:			objBill.address_two,
			city:				objBill.city_id,
			addressState:		objBill.state_id,
			zipCode:			objBill.zip_code,
			legalId:			objBill.rfc				
		};
		return objNew;		   
	},
	enterpriseRancherAdapterToIn:function(objRan){
		var objNew = {
				rancher_id:		objRan.enterpriseId,
				company_name:	objRan.legalName,				
				address_one:	objRan.addressOne,
				address_two:	objRan.addressTwo,
				city_id:		objRan.city,				
				state_id:		objRan.state,
				zip_code:		objRan.zipCode,
				rfc:			objRan.legalId,
				phone_number:	objRan.telephone,
				
//				Fields out of web service:
				contacts:		[],
				billing:		objRan.billing,
				rancher_type:	2,
				city_name:		"",				
				state_name:		""
			};		
		return objNew;
	},
	enterpriseRancherAdapterToOut:function(objRan){
		//only fields that are in webservice
		var objNew = {
				enterpriseId:	objRan.rancher_id,
				legalName:		objRan.company_name,				
				addressOne:		objRan.address_one,
				addressTwo:		objRan.address_two,
				city:			objRan.city_id,				
				state:			objRan.state_id,
				zipCode:		objRan.zip_code,
				legalId:		objRan.rfc,
				telephone:		objRan.phone_number,
			};
		return objNew;
	},
	enterpriseRancherContactAdapterToIn:function(objCon){
		var objNew = {
				contact_id:		objCon.contactId,
				rancher_id:		objCon.enterpriseId,
				aka:			objCon.aka,
				first_name:		objCon.firstName,
				last_name:		objCon.lastName,
				mother_name:	objCon.motherName,
				birth_date:		"" + UTCtoNormalDate(objCon.birthDate),
				email_add:		objCon.emailAddress,
				phone_number:	objCon.telephone,
				address_one:	objCon.addressOne,
				address_two:	objCon.addressTwo,
				city:			objCon.city,
				address_state:	objCon.addressState,
				zip_code:		objCon.zipCode
			};
		return objNew;	
	},
	enterpriseRancherContactAdapterToOut:function(objCon){
		var objNew = {
				contactId:		objCon.contact_id,
				enterpriseId:	objCon.rancher_id,
				aka:			objCon.aka,
				firstName:		objCon.first_name,
				lastName:		objCon.last_name,
				motherName:		objCon.mother_name,
				birthDate:		"" + DateOut(objCon.birth_date),
				emailAddress:	objCon.email_add,
				telephone:		objCon.phone_number,
				addressOne:		objCon.address_one,						
				addressTwo:		objCon.address_two,
				city:			objCon.city,
				addressState:	objCon.address_state,
				zipCode:		objCon.zip_code				
			};
		return objNew;		   
	},
	create:function(objRan,cbObj,cbMethod){
		
		if (objRan.rancher_type==1){
			return this.createRancher(objRan, cbObj, cbMethod);			
		}else{
			return this.createEnterpriseRancher(objRan, cbObj, cbMethod);
		}
	},
	createRancher:function(objRan,cbObj,cbMethod){
		
		var objToSend = this.rancherAdapterToOut(objRan);
		delete objToSend.rancherId;
		var cgCreate = consumingGateway.Create("Rancher", objToSend);
		if (cgCreate.exceptionId == 0){ //Created successfully			
			objRan.rancher_id = cgCreate.generatedId;
			objRan.billing = {};
			objRan.contacts = [];
			objRan.rfc = "";
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
	createEnterpriseRancher:function(objRan,cbObj,cbMethod){
		
		var objToSend = this.enterpriseRancherAdapterToOut(objRan);
		delete objToSend.enterpriseId;
		var cgCreateEnterpriseRancher = consumingGateway.Create("EnterpriseRancher", objToSend);
		if (cgCreateEnterpriseRancher.exceptionId == 0){ //Created successfully			
			objRan.rancher_id = cgCreateEnterpriseRancher.generatedId;
//			Fields out of webservice
			objRan.billing = {};
			objRan.contacts = [];
			objRan.city_name = "";
			objRan.state_id = "";
			
			this.arrObj.push(objRan);
			_arrRancherList = this.arrObj;
			if(cbMethod){
				cbObj[cbMethod]();
			}
			return true;
		}
		else{ //Error			
			cacheMan.setMessage("", "","[Exception ID: " + cgCreateEnterpriseRancher.exceptionId + "] Descripcion: " + cgCreateEnterpriseRancher.exceptionDescription);
			return false;
		}
	},
	upd:function(objOld,objNew,cbObj,cbMethod){
		if (objOld.rancher_type==1){
			return this.updateRancher(objOld,objNew,cbObj,cbMethod);			
		}else{
			return this.updateEnterpriseRancher(objOld,objNew,cbObj,cbMethod);
		}
	},
	updateRancher:function(objOld,objNew,cbObj,cbMethod){
		objNew.rancher_id = objOld.rancher_id;
		var objToSend = this.rancherAdapterToOut(objNew);
		var cgUpdateRancher = consumingGateway.Update("Rancher", objToSend);
		if (cgUpdateRancher.exceptionId == 0){ //Updated successfully
			for(prop in objNew){
				objOld[prop]=objNew[prop];
			}
			var tamanio = this.get().length;
			for(var i=0;i<tamanio;i++){
				if (this.arrObj[i].rancher_id == objOld.rancher_id){
					this.arrObj[i] = objOld;
					_arrRancherList = this.arrObj;
					cbObj.objRan = objOld;
					if(cbMethod){
						cbObj[cbMethod]();
					}
					return true;					
				}
			}
			return false;
		}
		else{ //Error			
			cacheMan.setMessage("", "","[Exception ID: " + cgUpdateRancher.exceptionId + "] Descripcion: " + cgUpdateRancher.exceptionDescription);
			return false;
		}		
	},
	updateEnterpriseRancher:function(objOld,objNew,cbObj,cbMethod){
		objNew.rancher_id = objOld.rancher_id;
		var objToSend = this.enterpriseRancherAdapterToOut(objNew);
		var cgUpdateEnterpriseRancher = consumingGateway.Update("EnterpriseRancher", objToSend);
		if (cgUpdateEnterpriseRancher.exceptionId == 0){ //Updated successfully
			for(prop in objNew){
				objOld[prop]=objNew[prop];
			}
			var tamanio = this.get().length;
			for(var i=0;i<tamanio;i++){
				if (this.arrObj[i].rancher_id == objOld.rancher_id){
					this.arrObj[i] = objOld;
					_arrRancherList = this.arrObj;
					cbObj.objRan = objOld;
					if(cbMethod){
						cbObj[cbMethod]();
					}
					return true;					
				}
			}
			return false;
		}
		else{ //Error			
			cacheMan.setMessage("", "","[Exception ID: " + cgUpdateEnterpriseRancher.exceptionId + "] Descripcion: " + cgUpdateEnterpriseRancher.exceptionDescription);
			return false;
		}		
	},
	del:function(delObj,cbObj,cbMethod){		
		if (delObj.rancher_type==1){
			return this.deleteRancher(delObj,cbObj,cbMethod);			
		}else{
			return this.deleteEnterpriseRancher(delObj, cbObj, cbMethod);
		}
	},
	deleteRancher:function(delObj,cbObj,cbMethod){		
		//AJAX
		//Update Internal Object
		var objToSend = {};
		objToSend.rancherId = delObj.rancher_id;
		
		var cgDeleteRancher = consumingGateway.Delete("Rancher", objToSend);
		if (cgDeleteRancher.exceptionId == 0){ //Deleted successfully
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
			cacheMan.setMessage("", "","[Exception ID: " + cgDeleteRancher.exceptionId + "] Descripcion: " + cgDeleteRancher.exceptionDescription);
			return false;
		}
	},
	deleteEnterpriseRancher:function(delObj,cbObj,cbMethod){		
		var objToSend = {};
		objToSend.enterpriseId = delObj.rancher_id;
		
		var cgDeleteEnterpriseRancher = consumingGateway.Delete("EnterpriseRancher", objToSend);
		if (cgDeleteEnterpriseRancher.exceptionId == 0){ //Deleted successfully
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
			cacheMan.setMessage("", "","[Exception ID: " + cgDeleteEnterpriseRancher.exceptionId + "] Descripcion: " + cgDeleteEnterpriseRancher.exceptionDescription);
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
		for (i in this.contactsReadFromGateway){
			if (this.contactsReadFromGateway[i]==objRan.rancher_id){
				return objRan.contacts;
			}
		}
		var objAux = {};
		var arrAux = [];
		var selfCacheRancher = this;		
		var objToSend = new Object();
		var cgReadContacts = null;
		
		this.contactsReadFromGateway.push(objRan.rancher_id);
		
		if (objRan.rancher_type==1){			
			objToSend.rancherId = objRan.rancher_id;
			cgReadContacts = consumingGateway.Read("RancherContact", objToSend);
			if (cgReadContacts.exceptionId == 0){ //Read successfully
				jQuery.each(cgReadContacts.records, function() {       		
		    		jQuery.each(this, function(key, value){
		    			objAux[key] = value;	
		    		});		    		
		    		arrAux.push(selfCacheRancher.rancherContactAdapterToIn(objAux));	    		
		    	});
			}
			return objRan.contacts = arrAux;
		}
		else if (objRan.rancher_type==2){			
			objToSend.enterpriseId = objRan.rancher_id;
			cgReadContacts = consumingGateway.Read("EnterpriseContact", objToSend);
			if (cgReadContacts.exceptionId == 0){ //Read successfully
				jQuery.each(cgReadContacts.records, function() {       		
		    		jQuery.each(this, function(key, value){
		    			objAux[key] = value;	
		    		});		    		
		    		arrAux.push(selfCacheRancher.enterpriseRancherContactAdapterToIn(objAux));	    		
		    	});
			}
			return objRan.contacts = arrAux;
		}
	},
	addContact:function(objRancher,objCon,cbObj,cbMethod){
		var objToSend = {};
		var cgCreateContact = null;
		
		objCon.rancher_id = objRancher.rancher_id;
		
		if (objRancher.rancher_type==1){	
			objToSend = this.rancherContactAdapterToOut(objCon);
			delete objToSend.contactId;
			cgCreateContact = consumingGateway.Create("RancherContact", objToSend);
		}
		else if (objRancher.rancher_type==2){		
			objToSend = this.enterpriseRancherContactAdapterToOut(objCon);
			delete objToSend.contactId;
			cgCreateContact = consumingGateway.Create("EnterpriseContact", objToSend);
		}
		
		if (cgCreateContact.exceptionId == 0){ //Created successfully			
			objCon.contact_id = cgCreateContact.generatedId;
			objRancher.contacts.push(objCon);
			
			if(cbMethod){
				cbObj[cbMethod]();
			}
			return true;
		}
		else{ //Error			
			cacheMan.setMessage("", "","[Exception ID: " + cgCreateContact.exceptionId + "] Descripcion: " + cgCreateContact.exceptionDescription);
			return false;
		}
		
		
	},
	updateContact:function(objRancher,objOld,objNew,cbObj,cbMethod){
		var objToSend = {};
		var cgUpdateContact = null;
		objNew.rancher_id = objOld.rancher_id;
		objNew.contact_id = objOld.contact_id;
		
		if (objRancher.rancher_type==1){				
			objToSend = this.rancherContactAdapterToOut(objNew);
			cgUpdateContact = consumingGateway.Update("RancherContact", objToSend);
		}
		else if (objRancher.rancher_type==2){
			objToSend = this.enterpriseRancherContactAdapterToOut(objNew);			
			cgUpdateContact = consumingGateway.Update("EnterpriseContact", objToSend);
		}
		
		if (cgUpdateContact.exceptionId == 0){ //Updated successfully			
			var tamanio = objRancher.contacts.length;
			for(var i=0;i<tamanio;i++){
				if (objRancher.contacts[i].contact_id == objOld.contact_id){
					objRancher.contacts[i] = objNew;
					if(cbMethod){
						cbObj[cbMethod]();
					}
					return true;					
				}
			}
			return false;
		}
		else{ //Error			
			cacheMan.setMessage("", "","[Exception ID: " + cgUpdateContact.exceptionId + "] Descripcion: " + cgUpdateContact.exceptionDescription);
			return false;
		}	
	},
	deleteContact:function(objRancher,objCon,cbObj,cbMethod){
		var objToSend = {};
		objToSend.contactId = objCon.contact_id;
		var cgDeleteContact = null;
		if (objRancher.rancher_type==1){	
			cgDeleteContact = consumingGateway.Delete("RancherContact", objToSend);
		}
		else if (objRancher.rancher_type==2){
			cgDeleteContact = consumingGateway.Delete("EnterpriseContact", objToSend);
		}
		
		if (cgDeleteContact.exceptionId == 0){ //Deleted successfully
			var tamanio = objRancher.contacts.length;
			for(var i=0;i<tamanio;i++){
				if (objRancher.contacts[i].contact_id == objCon.contact_id){
					objRancher.contacts.splice(i, 1);
					if(cbMethod){
						cbObj[cbMethod]();
					}
					return true;					
				}
			}
			return false;
		}
		else{ //Error
			cacheMan.setMessage("", "","[Exception ID: " + cgDeleteContact.exceptionId + "] Descripcion: " + cgDeleteContact.exceptionDescription);
			return false;
		}
	},
	getInvoice:function(objRan){
	
//		if (this.invoiceWasReadFromGateway == false){
//			this.invoiceWasReadFromGateway = true;
			var objAux = {};			
			var selfCacheRancher = this;		
			var objToSend = new Object();
			objToSend.rancherId = objRan.rancher_id;
			var cgReadInvoice = consumingGateway.Read("RancherInvoice", objToSend);		
			
			if (cgReadInvoice.exceptionId == 0){ //Read successfully
				jQuery.each(cgReadInvoice.records, function() {       		
					jQuery.each(this, function(key, value){
						objAux[key] = value;	
					});	    		
					objRan.billing = selfCacheRancher.rancherInvoiceAdapterToIn(objAux);					
				});
				return objRan.billing;
			}
				
//			else{ //Error						
//				if (cgReadInvoice.exceptionId != "RR02"){
//					cacheMan.setMessage("", "","[Exception ID: " + cgReadInvoice.exceptionId + "] Descripcion: " + cgReadInvoice.exceptionDescription);	
//				}			
//			}
//		}
	
		return {};		
	},
	createBilling:function(objRancher,objBill,cbObj,cbMethod){
		//AJAX
		objBill.rancher_id = objRancher.rancher_id;		
		var objToSend = this.rancherInvoiceAdapterToOut(objBill);
		delete objToSend.rancherInvoiceId;
		
		var cgCreateInvoice = consumingGateway.Create("RancherInvoice", objToSend);
		if (cgCreateInvoice.exceptionId == 0){ //Created successfully			
			objBill.billing_id = cgCreateInvoice.generatedId;
			objRancher.billing = objBill;		
			if(cbMethod){
				cbObj[cbMethod]();
			}
			return true;
		}
		else{ //Error
			//cacheMan.setMessage("", "","[Exception ID: " + cgCreateInvoice.exceptionId + "] Error al intentar crear Ganadero.");
			cacheMan.setMessage("", "","[Exception ID: " + cgCreateInvoice.exceptionId + "] Descripcion: " + cgCreateInvoice.exceptionDescription);
			return false;
		}
	},
	updateBilling:function(objRancher,objBill,cbObj,cbMethod){
		//AJAX
		objBill.billing_id = cbObj.objRan.billing.billing_id;
		objBill.rancher_id = cbObj.objRan.rancher_id;		
		var objToSend = this.rancherInvoiceAdapterToOut(objBill);
		var cgUpdateInvoice = consumingGateway.Update("RancherInvoice", objToSend);
		if (cgUpdateInvoice.exceptionId == 0){ //Updated successfully			
			objRancher.billing = objBill;
			if(cbMethod){
				cbObj[cbMethod]();
			}
			return true;
		}
		else{ //Error	
			if (cgUpdateInvoice.exceptionId == "RIU3"){
				this.createBilling(objRancher,objBill,cbObj,cbMethod);
			}else{
				cacheMan.setMessage("", "","[Exception ID: " + cgUpdateInvoice.exceptionId + "] Descripcion: " + cgUpdateInvoice.exceptionDescription);
				return false;
			}
		}
//		for (var sKey in objBill){
//			if(objBill[sKey]!=null){
//				objRancher.billing[sKey]=objBill[sKey];
//			}
//		}		
//		if(cbMethod){
//			cbObj[cbMethod]();
//		}		
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