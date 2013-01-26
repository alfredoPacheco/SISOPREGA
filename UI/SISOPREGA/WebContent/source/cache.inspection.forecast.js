enyo.kind({
	name : "cache.inspection.forecast",
	iLastForecast : 0,
	arrForecast : [],	
	forecastWasReadFromGateway:false,
	arrObjWasFilledUpOnce:false,
	get : function() {
		if (this.arrObjWasFilledUpOnce == false){
			this.arrObjWasFilledUpOnce =true;
			var arrResult = [];
			
//ForecastHead::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
			var arrForecasts = this.getForecast();
			
			for (var a in arrForecasts){
				
				var objInsFore={
						id:					undefined,
						fore_details_id:	undefined,
						rancher_id:			undefined,
						auth:				undefined,	
						origin:				undefined,
						cattle_type:		undefined,
						quantity:			0,
						barnyards:			[],	
						fore_date:			undefined
					};
				
				objInsFore.fore_date = 	arrForecasts[a].fore_date;
				objInsFore.id		 =	arrForecasts[a].id;
				
//ForecastDetails:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::				
				var arrForeDetailAux = this.getForecastDetails(objInsFore.id);
				
				for (i in arrForeDetailAux){
					objInsFore.fore_details_id=		arrForeDetailAux[i].fore_details_id;
					objInsFore.rancher_id=			arrForeDetailAux[i].rancher_id;
					objInsFore.auth=				arrForeDetailAux[i].auth;	
					objInsFore.origin=				arrForeDetailAux[i].origin;
					objInsFore.cattle_type=			arrForeDetailAux[i].cattle_type;
					objInsFore.quantity=			arrForeDetailAux[i].quantity;

//ForecastBarnyards::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
					if(objInsFore.fore_details_id){
						objInsFore.barnyards = this.getForecastBarnyard(objInsFore.fore_details_id);
					}

					
					arrResult.push(enyo.clone(objInsFore));
				}
			}
			this.arrForecast = arrResult;
		}
		return this.arrForecast;
	},
	getForecast:function(){
		if (this.forecastWasReadFromGateway == false){
			this.forecastWasReadFromGateway = true;
			var arrAux = [];
			
			var cgReadAll = consumingGateway.Read("InspectionForecast", {});
			
			if (cgReadAll.exceptionId == 0){ //Read successfully
				for (item in cgReadAll.records){
					arrAux.push(this.adaptForecastFromResponse(cgReadAll.records[item]));
				}
			}else{ //Error
				if (cgReadAll.exceptionId != "VAL02"){ //No data found
					cacheMan.setMessage("", "[Exception ID: " + cgReadAll.exceptionId + "] Descripción: " + cgReadAll.exceptionDescription);	
				}			
			}						
			this.arrForecast =  arrAux;			
		}		
		return this.arrForecast;	
	},
	getForecastDetails:function(foreID){
		
		var arrAux = [];
		var objToSend = {};
		objToSend.forecastID = foreID;
		var cgReadAll = consumingGateway.Read("InspectionForecastDetail", objToSend);
		
		if (cgReadAll.exceptionId == 0){ //Read successfully
			for (item in cgReadAll.records){
				arrAux.push(this.adaptFDetailsFromResponse(cgReadAll.records[item]));
			}
		}else{ //Error
			if (cgReadAll.exceptionId != "VAL02"){ //No data found
				cacheMan.setMessage("", "[Exception ID: " + cgReadAll.exceptionId + "] Descripción: " + cgReadAll.exceptionDescription);	
			}			
		}						
			
				
		return arrAux;	
	},
	getForecastBarnyard:function(foreID){
				
			var arrAux = [];
			var objToSend = {};
			objToSend.fdId = foreID;
			var cgReadAll = consumingGateway.Read("InspectionForecastBarnyard", objToSend);
			
			if (cgReadAll.exceptionId == 0){ //Read successfully
				for (item in cgReadAll.records){
					arrAux.push(cacheBY.getByID(cgReadAll.records[item].barnyardId));					
				}		    	
			}
			else{ //Error
				if (cgReadAll.exceptionId != "VAL02"){ //No data found
					cacheMan.setMessage("", "[Exception ID: " + cgReadAll.exceptionId + "] Descripcion: " + cgReadAll.exceptionDescription);
				}			
			}

		return arrAux;
		
	},
	createForecast:function(objForecast,cbObj,cbMethod){
		if (this.saveForecast(objForecast)== true){
			if (this.saveForecastDetail(objForecast)==true){
				if (this.saveForecastBarnyard(objForecast)==true){
					this.arrForecast.push(objForecast);										
					if(cbMethod){
						cbObj[cbMethod]();
					}
					
				}
			}
		}
	},
	addForecast:function(objForecast,cbObj,cbMethod){
		
		if (this.saveForecastDetail(objForecast)==true){
			if (this.saveForecastBarnyard(objForecast)==true){
				this.arrForecast.push(objForecast);										
				if(cbMethod){
					cbObj[cbMethod]();
				}
				
			}
		}
		
	},
	saveForecast : function(objForecast) {
		var objToSend = {};
		objToSend.forecastDate =  "" + DateOut(objForecast.fore_date);
		var cgCreate = consumingGateway.Create("InspectionForecast", objToSend);
		if (cgCreate.exceptionId == 0){ //Created successfully			
			objForecast.id = cgCreate.generatedId;
			return true;
		}
		else{ //Error			
			cacheMan.setMessage("", "[Exception ID: " 
					+ cgCreate.exceptionId + "] Descripcion: " 
					+ cgCreate.exceptionDescription);
			return false;
		}
	},	
	saveForecastDetail : function(oFDetail) {
		var objToSend = this.adaptFDetailsToRequest(oFDetail);
		delete objToSend.id;
		delete objToSend.fdId;
		var svcOp = consumingGateway.Create("InspectionForecastDetail",
				objToSend);
		if (svcOp.exceptionId == 0) {
			oFDetail.fore_details_id = svcOp.generatedId;
			return true;
		}else {
			cacheMan.setMessage("", "[Exception ID: " 
					+ svcOp.exceptionId + "] Descripcion: " 
					+ svcOp.exceptionDescription);
			return false;
		}		
	},
	updateForecastDetails : function(oFDetail, cbObj, cbMethod){
		var objToSend = {};
		objToSend = this.adaptFDetailsToRequest(oFDetail);		
		var svcOp = consumingGateway.Update("InspectionForecastDetail", objToSend);
		if (svcOp.exceptionId == 0) {				
			if (this.updateForecastBarnyards(oFDetail)==true){
				for (i in this.arrForecast){
					if(this.arrForecast[i].fore_details_id == oFDetail.fore_details_id){
						this.arrForecast[i] = oFDetail;
						if(cbMethod){
							cbObj[cbMethod]();
						}
						return true;
					}
				}
//				TODO: Crear descripcion generica en errores locales:
				cacheMan.setMessage("", "[Exception ID: LOCAL] Descripcion: Ha ocurrido un error en cache.");
				return false;
			}
		}else {
			cacheMan.setMessage("", "[Exception ID: " 
					+ svcOp.exceptionId + "] Descripcion: " 
					+ svcOp.exceptionDescription);			
		}
		return false;
	},
	updateForecastBarnyards : function(objForecast){
		var objToSend = {};
		objToSend.fdId = objForecast.fore_details_id;
		
		var svcOp = consumingGateway.Delete("InspectionForecastBarnyard", objToSend);
		if (svcOp.exceptionId == 0) {				
			if (this.saveForecastBarnyard(objForecast)==true){
				return true;
			}
		}else {
			cacheMan.setMessage("", "[Exception ID: " 
					+ svcOp.exceptionId + "] Descripcion: " 
					+ svcOp.exceptionDescription);			
		}
		return false;
	},
	saveForecastBarnyard : function(objForecast) {
		var objToSend = {};
		objToSend.fdId = objForecast.fore_details_id;		
		for (i in objForecast.barnyards){
			objToSend.barnyardId = objForecast.barnyards[i].barnyard_id;	
			var cgCreate = consumingGateway.Create("InspectionForecastBarnyard", objToSend);
//			objForecast.barnyards.ifbId = cgCreate.generatedId;
			if (cgCreate.exceptionId != 0){ //Created successfully
				cacheMan.setMessage("", "[Exception ID: " + cgCreate.exceptionId + "] Descripcion: " + cgCreate.exceptionDescription);
				return false;
			}
		}
		return true;
		
	},
	deleteForecastDetail : function(objFore, cbObj, cbMethod){
		var objToSend = {};
		objToSend.fdId = objFore.fore_details_id;

		var cgDelete = consumingGateway.Delete("InspectionForecastDetail",objToSend);
		if (cgDelete.exceptionId == 0) { // Deleted successfully			
			var tamanio = this.get().length;
			var foreAux = {};
			for ( var i = 0; i < tamanio; i++) {				
				if (this.arrForecast[i].fore_details_id == objFore.fore_details_id) {
					foreAux.id = this.arrForecast[i].id;
					foreAux.fore_date = this.arrForecast[i].fore_date;					
					this.arrForecast[i] = foreAux;					
					if (cbMethod) {
						cbObj[cbMethod]();
					}
					return true;
				}
			}
			//TODO: Definir descripcion de error local:
			cacheMan.setMessage("", "[Exception ID: LOCAL] Descripcion: Ha ocurrido un error");
					
			return false;
		} else { // Error
			cacheMan.setMessage("", "[Exception ID: "
					+ cgDelete.exceptionId + "] Descripcion: "
					+ cgDelete.exceptionDescription);
			return false;
		}				
	},
	deleteForecast: function(objFore, cbObj, cbMethod){
		var objToSend = {};
		objToSend.forecastId = objFore.id;

		var cgDelete = consumingGateway.Delete("InspectionForecast",objToSend);
		if (cgDelete.exceptionId == 0) { // Deleted successfully			
			var tamanio = this.get().length;
			for ( var i = 0; i < tamanio; i++) {
				if (this.arrForecast[i].id == objFore.id) {
					this.arrForecast.splice(i, 1);					
					if (cbMethod) {
						cbObj[cbMethod]();
					}
					return true;
				}
			}
			//TODO: Definir descripcion de error local:
			cacheMan.setMessage("", "[Exception ID: LOCAL] Descripcion: Ha ocurrido un error");
					
			return false;
		} else { // Error
			cacheMan.setMessage("", "[Exception ID: "
					+ cgDelete.exceptionId + "] Descripcion: "
					+ cgDelete.exceptionDescription);
			return false;
		}				
	},
	getDetails : function(iForecastId) {
		var result = [];
		var fDetailsAux = {};
		var selfCacheForecast = this;
		var svcOp = consumingGateway.Read("InspectionForecastDetail", {
			forecastId : iForecastId
		});
		if (svcOp.exceptionId == 0) {
			jQuery.each(svcOp.records, function() {
				jQuery.each(this, function(key, value) {
					fDetailsAux[key] = value;
				});
				objTmp = selfCacheForecast
						.adaptFDetailsFromResponse(fDetailsAux);
				objTmp.barnyards = getBarnyards(objTmp.id);
				result.push(objTmp);
			});
		}
		return result;
	},
	getBarnyards : function(iFDetailId) {
		var result = [];
		var fDetailsAux = {};
		var selfCacheForecast = this;
		var svcOp = consumingGateway.Read("InspectionForecastBarnyard", {
			detailId : iForecastId
		});
		if (svcOp.exceptionId == 0) {
			jQuery.each(svcOp.records, function() {
				jQuery.each(this, function(key, value) {
					fDetailsAux[key] = value;
				});
				objTmp = selfCacheForecast
						.adaptFBarnyardFromResponse(fDetailsAux);
				result.push(objTmp);
			});
		}
		return result;
	},
	adaptForecastFromResponse : function(oForecast) {
		var oForecastResponse = {
			id :			oForecast.forecastId,
			fore_date : 	"" + UTCtoNormalDate(oForecast.forecastDate)
		};
		return oForecastResponse;
	},
	adaptForecastToRequest : function(oForecast) {
		var oForecastResponse = {
			forecastId : oForecast.id,
			forecastDate : "" + DateOut(oForecast.fore_date)
		};
		return oForecastResponse;
	},
	adaptFDetailsFromResponse : function(oFDetails) {

		var oFDetailsResponse = {
			fore_details_id : 	oFDetails.fdId,
			id : 				oFDetails.forecastId,
			rancher_id : 		oFDetails.rancherId,
			auth :	 			oFDetails.auth,
			origin : 			oFDetails.origin,
			cattle_type : 		oFDetails.cattleType,
			quantity : 			oFDetails.quantity
		};
		return oFDetailsResponse;
	},
	adaptFDetailsToRequest : function(oFDetails) {
		var oFDetailsResponse = {
			fdId : 			oFDetails.fore_details_id,
			forecastId : 	oFDetails.id,
			rancherId : 	oFDetails.rancher_id,
			auth : 			oFDetails.auth,
			origin : 		oFDetails.origin,
			cattleType : 	oFDetails.cattle_type,
			quantity : 		oFDetails.quantity
		};
		return oFDetailsResponse;
	},
	adaptFBarnyardFromResponse : function(oFBarnyard) {
		var oFDetailsResponse = {
				barnyardId : 	oFBarnyard.barnyardId,
				fdId : 			oFBarnyard.fdId,
				ifbId : 		oFBarnyard.ifbId
		};
		return oFDetailsResponse;
	},
	adaptFBarnyardToRequest : function(oFBarnyard) {
		var oFDetailsResponse = {
			fdId : 			oFBarnyard.id,
			detailId : 		oFBarnyard.detail_id,
			barnyardId : 	oFBarnyard.barnyard_id
		};
		return oFDetailsResponse;
	}
});

var cacheInspFore = new cache.inspection.forecast();
