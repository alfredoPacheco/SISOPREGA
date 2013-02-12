enyo.kind({
	name: "cache.rejects",
	arrObj:_arrCattleReject,
	reloadme:function(){
		//AJAX
	},	
	get:function(){
		//AJAX
		return this.arrObj;
	},
	Create:function(objCreate,cbObj,cbMethod){
		//AJAX
		//SCRIM.on
		//scrimoff
		//chacheMan.showScrim();
		//chacheMan.hideScrim();		
		this.arrObj.push(objCreate);		
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
		objOld.reject_desc=objNew.reject_desc;
		if(cbMethod){
			cbObj[cbMethod]();
		}		
		return true;
		//return false;		
	},
	getLS:function(){
		var _arrLS=[];
		for(var i=0;i<this.get().length;i++){		
			_arrLS.push({caption:this.get()[i].reject_desc,
									value:this.get()[i].reject_id});
		}
		return _arrLS;
	},
	getByID:function(iID){
		for(var i=0; i<this.get().length;i++){
			if (this.get()[i].reject_id==iID){
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
var cacheRejects= new cache.rejects();