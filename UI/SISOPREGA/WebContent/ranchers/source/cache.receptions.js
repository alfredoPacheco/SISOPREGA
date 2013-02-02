enyo.kind({
	name: "cache.receptions",
	arrObj:_arrReceptionList,
	reloadme:function(){
		//AJAX
	},	
	get:function(){
		return this.arrObj;
	},
	creation:function(objRec,cbObj,cbMethod){
		//AJAX
		//UPDATE INTERNAL
		objRec.reception_id=Math.random().toString(36).substring(2, 15) + 
		                    Math.random().toString(36).substring(2, 15); //CHANGE FOR DB ID
		for (var sKey in objRec.barnyards){
			cacheBY.setOccupied(sKey,objRec.reception_id);
		}
		this.arrObj.push(objRec);
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
	appendBY:function(objReception,objBY,cbObj,cbMethod){
		//AJAX
		//ADD TO REC
		for (var sKey in objBY) {
			objReception.barnyards[sKey] = objBY[sKey];
		}		
		var cacheObj= new cache.barnyards();
		for(var sKey in objBY){
			cacheObj.setOccupied(sKey,objReception.reception_id);
		}
		cacheObj
		if(cbMethod){
			cbObj[cbMethod]();
		}		
	},
	addFeed:function(objRec,objFeed,cbObj,cbMethod){
		objRec.feed.push(objFeed);
		if(cbMethod){
			cbObj[cbMethod]();
		}					
	},
	updateFeed:function(objOld,objNew,cbObj,cbMethod){
		//AJAX
		//Update Local		
		for(var sKey in objNew){
			if(objNew[sKey]!=null){
				objOld[sKey]=objNew[sKey]
			}
		}		
		if(cbMethod){
			cbObj[cbMethod]();
		}		
	},
	deleteFeed:function(arrFeed,objFeed,cbObj,cbMethod){
		for(var i=0; i<arrFeed.length;i++){		
			if (arrFeed[i]===objFeed){
				arrFeed.splice(i, 1);
				if(cbMethod){
					cbObj[cbMethod]();
				}
				break;					
			}
		}
	},
	addReject:function(iAccepted,objRec,objReject,cbObj,cbMethod){
		//AJAX
		//REFRESH LOCAL
		if(iAccepted==""){iAccepted=0;}
		objRec.accepted_count=iAccepted;
		if(objReject){
			objRec.inspections.push(objReject);
		}
		if(cbMethod){			
			cbObj[cbMethod]();
		}			
	},
	updateReject:function(iAccepted,objRec,iInspIdx,objReject,cbObj,cbMethod){
		//AJAX
		//REFRESH LOCAL
		if(iAccepted==""){iAccepted=0;}
		objRec.accepted_count=iAccepted;
		objRec.inspections[iInspIdx].rejected_count=objReject.rejected_count;
		objRec.inspections[iInspIdx].reject_id=objReject.reject_id;
		objRec.inspections[iInspIdx].reject_desc=objReject.reject_desc;				
		if(cbMethod){
			cbObj[cbMethod]();
		}			
	},
	deleteReject:function(arrRejects,objReject,cbObj,cbMethod){
		for(var i=0; i<arrRejects.length;i++){		
			if (arrRejects[i]===objReject){
				arrRejects.splice(i, 1);
				if(cbMethod){
					cbObj[cbMethod]();
				}
				break;					
			}
		}
	},				
});
var cacheReceptions= new cache.receptions();