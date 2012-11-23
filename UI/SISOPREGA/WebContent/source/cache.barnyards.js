enyo.kind({
	name: "cache.barnyards",
	arrObj:_arrBarnyardsList,
	arrObjAv:enyo.clone(_arrBarnyardsList),
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
		/*for (var sKey in objNew){
			objOld[sKey]=objNew[sKey]
		}*/
		objOld.barnyard_code=objNew.barnyard_code;
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
		var _arrLS=[];
		for(var i=0;i<this.get().length;i++){		
			if(this.get()[i].rancher_type==1){
				_arrLS.push({caption:this.get()[i].last_name  +' '+
												this.get()[i].mother_name+' '+
												this.get()[i].first_name,
										value:this.get()[i].rancher_id});
			}else{
				_arrLS.push({caption:this.get()[i].company_name,
										value:this.get()[i].rancher_id});				
			}
		}
		return _arrLS;
	},
	getByID:function(iID){
		for(var i=0; i<this.get().length;i++){
			if (this.get()[i].barnyard_id==iID){
				return this.get()[i];
			}
		}
	},
	addCapacity:function(objBY,objCap,cbObj,cbMethod){		
		//AJAX
		//Update Local
		objBY.barnyard_capacity.push(objCap);
		if(cbMethod){
			cbObj[cbMethod]();
		}		
	},
	updateCapacity:function(objOld,objNew,cbObj,cbMethod){
		//AJAX
		//Update Local		
		for (var sKey in objNew){
			objOld[sKey]=objNew[sKey]
		}		
		if(cbMethod){
			cbObj[cbMethod]();
		}			
	},
	deleteCapacity:function(objBY,objCap,cbObj,cbMethod){
		//AJAX
		//Update Local	
		for(var i=0;i<objBY.barnyard_capacity.length;i++){
			if(objBY.barnyard_capacity[i]===delObj){
				objBY.barnyard_capacity.splice(i, 1);	
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
	getAvailable:function(){
		return this.arrObjAv;
	},
	getAvailableByID:function(iID){
		for(var i=0; i<this.getAvailable().length;i++){
			if (this.getAvailable()[i].barnyard_id==iID){
				return this.getAvailable()[i];
			}
		}		
	},
	deleteAvailableByID:function(iID){
		for(var i=0; i<this.getAvailable().length;i++){
			if (this.getAvailable()[i].barnyard_id==iID){
				return this.getAvailable().splice(i, 1);
			}
		}		
	},	
	setOccupied:function(objReception,arrBY,cbObj,cbMethod){
		//AJAX
		//Mark as Occupied
		var objClone;
		for (var sKey in arrBY){
			objClone=enyo.clone(this.getAvailableByID(sKey))
			objClone['occupied']=true;
			objReception.barnyards.push(objClone);
			this.deleteAvailableByID(sKey);
		}
		arrBY={};
		//RefreshAvailable
		if(cbMethod){
			cbObj[cbMethod]();
		}		
	}
});

var cacheBY= new cache.barnyards();