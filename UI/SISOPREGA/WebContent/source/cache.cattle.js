enyo.kind({
	name: "cache.cattle",
	arrCattleType:_arrCattleTypeList,
	arrCattleClass: _arrCattleClassList,
	cattleTypeWasReadFromGateway: false,
	cattleClassWasReadFromGateway: false,
	reloadme:function(){
		//AJAX
	},
	cattleTypeAdapterToIn:function(objCattle){

		var objNew = {
				cattype_id:		objCattle.cattypeId,
				catclass_name:	objCattle.catclassId,
				cattype_name:	objCattle.cattypeName
			};
		
		return objNew;
	},
	cattleClassAdapterToIn:function(objCattle){
		
		var objNew = {
				catclass_id:	objCattle.catclassId,				
				catclass_name:	objCattle.catclassName
			};
		
		return objNew;
	},
	cattleTypeAdapterToOut:function(objCattle){

		var objNew = {				
				cattypeId:		objCattle.cattype_id,				
				catclassId:		objCattle.catclass_name,
				cattypeName:	objCattle.cattype_name
			};
		
		return objNew;
	},
	cattleClassAdapterToOut:function(objCattle){
		
		var objNew = {
				catclassId:	objCattle.catclass_id,				
				catclassName:	objCattle.catclass_name
			};
		
		return objNew;
	},
	getCattleType:function(){
		if (this.cattleTypeWasReadFromGateway == false){
//			cacheMan.showScrim();
			this.cattleTypeWasReadFromGateway = true;
			var objAux = {};
			var arrAux = [];
			var selfCacheCattle = this;		
			
	//Retrieve CattleType
			var cgReadAll = consumingGateway.Read("CattleType", {});
			
			if (cgReadAll.exceptionId == 0){ //Read successfully
				jQuery.each(cgReadAll.records, function() {
		    		jQuery.each(this, function(key, value){
		    			objAux[key] = value;
		    		});
		    		objTmp = selfCacheCattle.cattleTypeAdapterToIn(objAux);		    		
		    		arrAux.push(objTmp);
		    	});
			}
			else{ //Error
				if (cgReadAll.exceptionId != "RR02"){ //No data found
					cacheMan.setMessage("", "","[Exception ID: " + cgReadAll.exceptionId + "] Descripcion: " + cgReadAll.exceptionDescription);	
				}			
			}
			
			this.arrCattleType =  arrAux;
			_arrCattleTypeList = arrAux;
			
//			cacheMan.hideScrim();
		}
		
		return this.arrCattleType;
	},
	getCattleClass:function(){
		if (this.cattleClassWasReadFromGateway == false){
//			cacheMan.showScrim();
			this.cattleClassWasReadFromGateway = true;
			var objAux = {};
			var arrAux = [];
			var selfCacheCattle = this;		
			
	//Retrieve CattleType
			var cgReadAll = consumingGateway.Read("CattleClass", {});
			
			if (cgReadAll.exceptionId == 0){ //Read successfully
				jQuery.each(cgReadAll.records, function() {
		    		jQuery.each(this, function(key, value){
		    			objAux[key] = value;
		    		});
		    		objTmp = selfCacheCattle.cattleClassAdapterToIn(objAux);		    		
		    		arrAux.push(objTmp);
		    	});
			}
			else{ //Error
				if (cgReadAll.exceptionId != "RR02"){ //No data found
					cacheMan.setMessage("", "","[Exception ID: " + cgReadAll.exceptionId + "] Descripcion: " + cgReadAll.exceptionDescription);	
				}			
			}
			
			this.arrCattleClass =  arrAux;
			_arrCattleClassList = arrAux;
			
//			cacheMan.hideScrim();
		}
		
		return this.arrObj;
	},
	create:function(objCat,cbObj,cbMethod){
		
		var objToSend = this.cattleTypeAdapterToOut(objCat);
		delete objToSend.rancherId;
		var cgCreate = consumingGateway.Create("CattleType", objToSend);
		if (cgCreate.exceptionId == 0){ //Created successfully
			objCat.cattype_id = cgCreate.generatedId;
			
//			objCat.billing = {};
//			objCat.contacts = [];
//			objCat.rfc = "";
			
			this.arrCattleType.push(objCat);
			_arrCattleTypeList = this.arrCattleType;
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
		objNew.cattypeId = objOld.cattype_id;
		var objToSend = this.cattleTypeAdapterToOut(objNew);
		var cgUpdate = consumingGateway.Update("CattleType", objToSend);
		if (cgUpdate.exceptionId == 0){ //Updated successfully
			for(prop in objNew){
				objOld[prop]=objNew[prop];
			}
			var tamanio = this.getCattleType().length;
			for(var i=0;i<tamanio;i++){
				if (this.arrCattleType[i].cattype_id == objOld.cattype_id){
					this.arrCattleType[i] = objOld;
					_arrCattleTypeList = this.arrCattleType;
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
			cacheMan.setMessage("", "","[Exception ID: " + cgUpdate.exceptionId + "] Descripcion: " + cgUpdate.exceptionDescription);
			return false;
		}		
				
	},
	getLS:function(){
		var _arrCattleLS=[];
		for(var i=0;i<this.getCattleType().length;i++){		
			_arrCattleLS.push({caption:this.getCattleType()[i].cattype_name,
									value:this.getCattleType()[i].cattype_id});
		}
		return _arrCattleLS;
	},
	getByID:function(iID){
		for(var i=0; i<this.getCattleType().length;i++){
			if (this.getCattleType()[i].cattype_id==iID){
				return this.getCattleType()[i];
			}
		}
	},
	del:function(delObj,cbObj,cbMethod){		
		//AJAX
		//Update Internal Object	
		for(var i=0;i<this.getCattleType().length;i++){
			if(this.getCattleType()[i]===delObj){
				this.getCattleType().splice(i, 1);	
				if(cbMethod){
					cbObj[cbMethod]();
				}		
				return true;								
				break;
			}
		}
		return false;			
	}
});
var cacheCattle= new cache.cattle();