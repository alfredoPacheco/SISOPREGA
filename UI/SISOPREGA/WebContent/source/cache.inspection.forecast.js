enyo.kind({
	name : "cache.inspection.forecast",
	iLastForecast : 0,
	arrForecast : [],
	arrForecastWasReadFromGateway:false,
	get : function() {
		if (this.arrForecastWasReadFromGateway == false){
			arrForecastWasReadFromGateway =true;
			var forecastAux = {};
			var forecastArrAux = [];
			var selfCacheForecast = this;
			// Retrieve forecasts
			var svcOp = consumingGateway.Read("InspectionForecast", {});
			if (svcOp.exceptionId == 0) {
				// InspectionForecast already uploaded
				jQuery.each(svcOp.records, function() {
					jQuery.each(this, function(key, value) {
						forecastAux[key] = value;
					});
					var oForecastTemp = selfCacheForecast
							.adaptForecastFromResponse(forecastAux);
					
					//Retrieve Forecast details:
					var forecastDetails = consumingGateway.Read("InspectionForecastDetail", forecastAux.forecastId);
					if (svcOp.exceptionId == 0) {
						
					}
					oForecastTemp.details = getDetails(oForecastTemp.id);
					forecastArrAux.push(oForecastTemp);
				});
			}
			else{ //Error
				if (cgReadAll.exceptionId != "VAL02"){ //No data found
					cacheMan.setMessage("", "[Exception ID: " + cgReadAll.exceptionId + "] Descripcion: " + cgReadAll.exceptionDescription);	
				}			
			}
			this.arrForecast = arrForecast;
		}
		return this.arrForecast;
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
			id : oForecast.id,
			forecast_date : oForecast.forecastDate
		};
		return oForecastResponse;
	},
	adaptForecastToRequest : function(oForecast) {
		var oForecastResponse = {
			id : oForecast.id,
			forecastDate : "" + DateOut(oForecast.forecastDate)
		};
		return oForecastResponse;
	},
	adaptFDetailsFromResponse : function(oFDetails) {
		var oFDetailsResponse = {
			id : oFDetails.id,
			forecast_id : oFDetails.forecastId,
			rancher_id : oFDetails.rancherId,
			auth : oFDetails.auth,
			origin : oFDetails.origin,
			cattle_type : oFDetails.cattleType,
			quantity : oFDetails.quantity
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
			id : 			oFBarnyard.id,
			detail_id : 	oFBarnyard.detail_id,
			barnyard_id : 	oFBarnyard.barnyardId
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
