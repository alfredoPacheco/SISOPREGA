enyo.kind({
	name: "cache.ranchers",
	arrObj:_arrRancherList,
	reloadme:function(){
		//AJAX
	},	
	get:function(){
		return this.arrObj;
	},
	adapter:function(objRan){
		var objNew = {
				rancher_id:		objRan.rancher_id,
				aka:			objRan.aka,
				birthDate:		objRan.birth_date,
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
	create:function(objRan,cbObj,cbMethod){
		//AJAX
		
		cgCreate = consumingGateway.Create("Rancher", "test", this.adapter(objRan));
		if (cgCreate.exceptionId == 0){ //Created successfully			
			objRan.rancher_id = cgCreate.generatedId;
			this.arrObj.push(objRan);
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
		//AJAX
		cgUpdate= consumingGateway.Update("Rancher", "test", objNew);
		for (var sKey in objNew){
			if(objOld[sKey]!=null){
				objOld[sKey]=objNew[sKey];
			}
		}
		if(cbMethod){
			cbObj[cbMethod]();
		}		
		return true;
		//return false;		
	},
	del:function(delObj,cbObj,cbMethod){
		//AJAX
		//Update Internal Object	
		for(var i=0;i<this.get().length;i++){
			if(this.get()[i]===delObj){
				this.arrObj.splice(i, 1);	
				if(cbMethod){
					cbObj[cbMethod]();
				}		
				return true;								
				break;
			}
		}
		return false;			
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
	addContact:function(objRancher,objCon,cbObj,cbMethod){
		//AJAX
		//Update Local
		objRancher.contacts.push(objCon);
		if(cbMethod){
			cbObj[cbMethod]();
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