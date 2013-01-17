enyo.kind({
	name : "cache.inspection.forecast",
	iLastForecast : 0,
	arrForecast : [],	
	forecastWasReadFromGateway:false,
	arrObjWasFilledUpOnce:false,
	get : function() {
		if (this.arrObjWasFilledUpOnce == false){
			this.arrObjWasFilledUpOnce =true;
			
//ForecastHead::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
			this.arrForecast = this.getForecast();
			
			
			
			for (var a in this.arrForecast){
				
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
				
				objAux = this.arrForecast[a];
				
				objInsFore.fore_date = objAux.fore_date;
				objInsFore.id		=	objAux.id;
//ForecastBarnyards::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::			
				objInsFore.barnyards = this.getForecastBarnyard(objAux.id);
				
//ForecastDetails:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::				
				var arrForeDetailAux = this.getForecastDetails(objAux.id);
				
				
				if (arrForeDetailAux.length > 0){
					arrForeDetailAux = arrForeDetailAux[0];
					
					objInsFore.fore_details_id=	arrForeDetailAux.fore_details_id;
					objInsFore.rancher_id=			arrForeDetailAux.rancher_id;
					objInsFore.auth=				arrForeDetailAux.auth;	
					objInsFore.origin=				arrForeDetailAux.origin;
					objInsFore.cattle_type=		arrForeDetailAux.cattle_type;
					objInsFore.quantity=			arrForeDetailAux.quantity;
				}
				
				this.arrForecast.push(objInsFore);
			}
			
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
					arrAux.push(cgReadAll.records[item].barnyardId);					
				}		    	
			}
			else{ //Error
				if (cgReadAll.exceptionId != "VAL02"){ //No data found
					cacheMan.setMessage("", "[Exception ID: " + cgReadAll.exceptionId + "] Descripcion: " + cgReadAll.exceptionDescription);
				}			
			}

		return arrAux;
		
	},
	addForecast:function(objForecast,cbObj,cbMethod){
		if (this.saveForecast(objForecast)== true){
			if (this.saveForecastDetail(objForecast)==true){
				if (this.saveForecastBarnyard(objForecast)==true){
					cbObj.objList.push(objForecast);
					if(cbMethod){
						cbObj[cbMethod](objForecast);
					}
					
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
		if (oFDetail.fore_details_id == null || oFDetail.fore_details_id == undefined || oFDetail.fore_details_id == "") {
			delete objToSend.id;
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
		} else {
			var svcOp = consumingGateway.Update("InspectionForecastDetail", objToSend);
			if (svcOp.exceptionId == 0) {				
				return true;
			}else {
				cacheMan.setMessage("", "[Exception ID: " 
						+ svcOp.exceptionId + "] Descripcion: " 
						+ svcOp.exceptionDescription);
				return false;
			}
		}

		consumingGateway.Delete("InspectionForecastBarnyard", {
			forecastDetailId : oFDetail.id
		});

		for ( var i = 0; i < oFDetail.barnyards.length; i++) {
			oFDetail.barnyards[i].detailId = oFDetail.id;
			oFDetail.barnyards[i] = saveForecastBarnyard(oFDetail.barnyards[i]);
		}

		return oFDetail;
	},
	saveForecastBarnyard : function(objForecast) {
		var objToSend = {};
		objToSend.fdId = objForecast.id;		
		for (i in objForecast.barnyards){
			objToSend.barnyardId = objForecast.barnyards[i];	
			var cgCreate = consumingGateway.Create("InspectionForecastBarnyard", objToSend);
//			objForecast.barnyards.ifbId = cgCreate.generatedId;
			if (cgCreate.exceptionId != 0){ //Created successfully
				cacheMan.setMessage("", "[Exception ID: " + cgCreate.exceptionId + "] Descripcion: " + cgCreate.exceptionDescription);
				return false;
			}
		}
		return true;
		
	},
	deleteForecastDetail : function(iFDetail){
		var objToSend = this.adaptFDetailsToRequest(oFDetail);
		consumingGateway.Delete("InspectionForecastDetail", objToSend);
		get();
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
			id : 			oFDetails.fore_details_id,
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
