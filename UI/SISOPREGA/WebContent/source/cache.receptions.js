enyo.kind({
	name: "cache.receptions",
	arrObj:_arrReceptionList,
	reloadme:function(){
		//AJAX
	},	
	get:function(){
		return this.arrObj;
	},
	create:function(objCat,cbObj,cbMethod){
		//AJAX
		this.arrObj.push(objCat);
		if(cbMethod){
			cbObj[cbMethod]();
		}				
		return true;
	},
	upd:function(objOld,objNew,cbObj,cbMethod){
		//AJAX
		//Update Internal Object
		for (var sKey in objNew){
			if(objOld[sKey]!=null){
				objOld[sKey]=objNew[sKey]
			}
		}
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
			if (this.get()[i].reception_id==iID){
				return this.get()[i];
			}
		}
	},
	deleteByID:function(iID){
		for(var i=0; i<this.get().length;i++){
			if (this.get()[i].reception_id==iID){
				this.get().splice(i, 1);	
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
	},
	addWeight:function(objRec,objWeight,cbObj,cbMethod){
		//AJAX
		//Update Local	
		objRec.weights.push(objWeight);	
		if(cbMethod){
			cbObj[cbMethod]();
		}	
	},
	updateWeight:function(objRec,objOld,objNew,cbObj,cbMethod){
		for (var sKey in objNew){
			if(objOld[sKey]!=null){
				objOld[sKey]=objNew[sKey]
			}
		}
		if(cbMethod){
			cbObj[cbMethod]();
		}		
	},
	deleteWeight:function(objRec,delObj,cbObj,cbMethod){
		//AJAX
		//Update Local	
		for(var i=0;i<objRec.weights.length;i++){
			if(objRec.weights[i]===delObj){
				objRec.weights.splice(i, 1);	
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
	releaseReceptions:function(arrRec,cbObj,cbMethod){
		//AJAX
		//Update Internal Object	
		for(var sKey in arrRec){
			this.deleteByID(sKey)
		}
		if(cbMethod){
			cbObj[cbMethod]();
		}		
	},
});
var cacheReceptions= new cache.receptions();