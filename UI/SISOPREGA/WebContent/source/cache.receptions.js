enyo.kind({
	name: "cache.receptions",
	arrObj:[],
	receptionWasReadFromGateway:false,
	reloadme:function(){
		//AJAX
	},	
	receptionAdapterToIn:function(objReception){
		
		var objNew = {
				reception_id:	objReception.receptionId,
				rancher_id:		objReception.rancherId,
				arrival_date:	objReception.dateAllotted,
				cattype_name:	objReception.cattleType,
				
//				:	objReception.locationId
			};
		
		objNew.company_name="";
		objNew.cattype_id="";
		objNew.hc_aprox="";
		objNew.city_id="";
		objNew.city_name="";
		objNew.weights=[]; 
		objNew.barnyards=[];
		objNew.accepted_count="";
		objNew.inspections=[];
		objNew.feed=[];
		
		return objNew;
	},
	receptionAdapterToOut:function(objReception){

		var objNew = {				
				receptionId:	objReception.reception_id,				
				rancherId:		objReception.rancher_id,
				dateAllotted:	"" + DateOut(objReception.arrival_date),
				cattleType:		objReception.cattype_id,
				
				locationId:	1
			};
		
		return objNew;
	},
	get:function(){
		if (this.receptionWasReadFromGateway == false){
			this.receptionWasReadFromGateway = true;
			var objAux = {};
			var arrAux = [];
			var selfCacheReception = this;		
			
	//Retrieve Receptions
			var cgReadAll = consumingGateway.Read("Reception", {});
			
			if (cgReadAll.exceptionId == 0){ //Read successfully
				jQuery.each(cgReadAll.records, function() {       		
		    		jQuery.each(this, function(key, value){
		    			objAux[key] = value;	
		    		});
		    		objTmp = selfCacheReception.receptionAdapterToIn(objAux);		    		
		    		arrAux.push(objTmp);
		    	});
			}else{ //Error
				if (cgReadAll.exceptionId != "RR02"){ //No data found
					cacheMan.setMessage("", "[Exception ID: " + cgReadAll.exceptionId + "] Descripción: " + cgReadAll.exceptionDescription);	
				}			
			}
						
			this.arrObj =  arrAux;
			_arrReceptionList = arrAux;
			
//			cacheMan.hideScrim();
		}
		
		return this.arrObj;		
	},
	create:function(objRec,cbObj,cbMethod){
		var objToSend = this.receptionAdapterToOut(objRec);
		delete objToSend.receptionId;
		var cgCreate = consumingGateway.Create("Reception", objToSend);
		if (cgCreate.exceptionId == 0){ //Created successfully			
			objRec.reception_id = cgCreate.generatedId;	
			//TODO
			objRec.billing = {};
			objRec.contacts = [];
			objRec.rfc = "";
			
			
			this.arrObj.push(objRec);
			_arrReceptionList = this.arrObj;
			
			//TODO
			for (var sKey in objRec.barnyards){
				cacheBY.setOccupied(sKey,objRec.reception_id);
			}
			
			if(cbMethod){
				cbObj[cbMethod]();
			}
			return true;
		}
		else{ //Error			
			cacheMan.setMessage("", "[Exception ID: " + cgCreate.exceptionId + "] Descripcion: " + cgCreate.exceptionDescription);
			return false;
		}
		
	},
	upd:function(objOld,objNew,cbObj,cbMethod){
		objNew.reception_id = objOld.reception_id;
		var objToSend = this.receptionAdapterToOut(objNew);
		var cgUpdate = consumingGateway.Update("Reception", objToSend);
		if (cgUpdate.exceptionId == 0){ //Updated successfully
			for(prop in objNew){
				objOld[prop]=objNew[prop];
			}
			var tamanio = this.get().length;
			for(var i=0;i<tamanio;i++){
				if (this.arrObj[i].reception_id == objOld.reception_id){
					this.arrObj[i] = objOld;
					_arrReceptionList = this.arrObj;
					cbObj.objRec = objOld;
					if(cbMethod){
						cbObj[cbMethod]();
					}
					return true;					
				}
			}
			return false;
		}
		else{ //Error			
			cacheMan.setMessage("", "[Exception ID: " + cgUpdate.exceptionId + "] Descripcion: " + cgUpdate.exceptionDescription);
			return false;
		}		
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
	//TODO
	deleteByID:function(iID){
		for(var i=0; i<this.get().length;i++){
			if (this.get()[i].reception_id==iID){
				this.get().splice(i, 1);	
			}
		}
	},	
	del:function(delObj,cbObj,cbMethod){		
		var objToSend = {};
		objToSend.receptionId = delObj.reception_id;
		
		var cgDelete = consumingGateway.Delete("Reception", objToSend);
		if (cgDelete.exceptionId == 0){ //Deleted successfully
			var tamanio = this.get().length;
			for(var i=0;i<tamanio;i++){
				if (this.arrObj[i].reception_id == delObj.reception_id){
					this.arrObj.splice(i, 1);
					_arrReceptionList = this.arrObj;
					if(cbMethod){
						cbObj[cbMethod]();
					}
					return true;	
					//TODO
					//break;
				}
			}
			return false;
		}
		else{ //Error
			cacheMan.setMessage("", "[Exception ID: " + cgDelete.exceptionId + "] Descripcion: " + cgDelete.exceptionDescription);
			return false;
		}	
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
				objOld[sKey]=objNew[sKey];
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
			this.deleteByID(sKey);
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
		//cacheObj
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
				objOld[sKey]=objNew[sKey];
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