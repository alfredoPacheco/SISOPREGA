enyo.kind({
	name: "cache.cattle",
	arrObj:_arrCattleList,
	cattleWasReadFromGateway: false,
	reloadme:function(){
		//AJAX
	},	
	get:function(){
		if (this.cattleWasReadFromGateway == false){
//			cacheMan.showScrim();
			this.cattleWasReadFromGateway = true;
			var objAux = {};
			var arrAux = [];
			var selfCacheRancher = this;		
			
	//Retrieve CattleType
			var cgReadAll = consumingGateway.Read("CattleType", "testRequest", {});
			
			if (cgReadAll.exceptionId == 0){ //Read successfully
				jQuery.each(cgReadAll.records, function() {
		    		jQuery.each(this, function(key, value){
		    			objAux[key] = value;
		    		});
		    		objTmp = selfCacheRancher.cattleAdapterToIn(objAux);
		    		//objTmp.billing = selfCacheRancher.getInvoice(objTmp);
		    		arrAux.push(objTmp);
		    	});
			}
			else{ //Error
				if (cgReadAll.exceptionId != "RR02"){ //No data found
					cacheMan.setMessage("", "","[Exception ID: " + cgReadAll.exceptionId + "] Descripcion: " + cgReadAll.exceptionDescription);	
				}			
			}
			
			this.arrObj =  arrAux;
			_arrCatlleList = arrAux;
			
//			cacheMan.hideScrim();
		}
		
		return this.arrObj;
	},
	create:function(objCat,cbObj,cbMethod){
		
		
		
		this.arrObj.push(objCat);		
		if(cbMethod){
			cbObj[cbMethod]();
		}				
		return true;
	},
	upd:function(objOld,objNew,cbObj,cbMethod){
		//AJAX
		//Update Internal Object
		/*for (var sKey in objNew){
			objOld[sKey]=objNew[sKey]
		}*/
		objOld.cattype_name=objNew.cattype_name;
		if(cbMethod){
			cbObj[cbMethod]();
		}		
		return true;
		//return false;		
	},
	getLS:function(){
		var _arrCattleLS=[];
		for(var i=0;i<this.get().length;i++){		
			_arrCattleLS.push({caption:this.get()[i].cattype_name,
									value:this.get()[i].cattype_id});
		}
		return _arrCattleLS;
	},
	getByID:function(iID){
		for(var i=0; i<this.get().length;i++){
			if (this.get()[i].cattype_id==iID){
				return this.get()[i];
			}
		}
	},
	del:function(delObj,cbObj,cbMethod){		
		//AJAX
		//Update Internal Object	
		for(var i=0;i<this.get().length;i++){
			if(this.get()[i]===delObj){
				this.get().splice(i, 1);	
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