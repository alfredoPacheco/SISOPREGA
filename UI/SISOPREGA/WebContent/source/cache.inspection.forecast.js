enyo.kind({
	name : "cache.inspection.forecast",
	iLastForecast : 0,
	arrForecast : [],
	get : function() {
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
						.adaptForecastFromResponse(oForecastAux);
				oForecastTemp.details = getDetails(oForecastTemp.id);
				forecastArrAux.push(oForecastTemp);
			});
		}
	},
	saveForecast : function(objForecast) {
		saveForecastHeader(oForecast);
		for ( var i = 0; i < oForecast.details.length; i++) {
			oForecast.details[i] = saveForecastDetail(oForecast.details[i]);
		}
	},
	saveForecastHeader : function(oForecast) {
		var objToSend = this.adaptForecastToRequest(objForecast);
		if (objForecast.id == null || objForecast.id == undefined) {
			var svcOp = consumingGateway
					.Create("InspectionForecast", objToSend);
			if (svcOp.exceptionId == 0) {
				objForecast.id = svcOp.generatedId;
				this.iLastForecast = objForecast.id;
				this.arrForecast.push(objForecast);
				return true;
			} else {
				cacheMan.setMessage("", "[Exception ID: "
						+ cgCreate.exceptionId + "] Descripcion: "
						+ cgCreate.exceptionDescription);
				return false;
			}
		}
	},
	saveForecastDetail : function(oFDetail) {
		var objToSend = this.adaptFDetailsToRequest(oFDetail);
		if (oFDetail.id == null || oFDetail.id == undefined) {
			var svcOp = consumingGateway.Create("InspectionForecastDetail",
					objToSend);
			if (svcOp.exceptionId == 0) {
				oFDetail.id = svcOp.generatedId;
			}
		} else {
			consumingGateway.Update("InspectionForecastDetail", objToSend);
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
	saveForecastBarnyard : function(oFBarnyard) {
		var objToSend = this.adaptFBarnyardToRequest(oFBarnyard);
		var svcOp = consumingGateway.Create("InspectionForecastBarnyard", objToSend);
		if(svcOp.exceptionId == 0){
			oFBarnyard.id = svcOp.generatedId;
		}
		return objToSend;
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
			id : oFDetails.id,
			forecastId : oFDetails.forecast_id,
			rancherId : oFDetails.rancher_id,
			auth : oFDetails.auth,
			origin : oFDetails.origin,
			cattleType : oFDetails.cattle_type,
			quantity : oFDetails.quantity
		};
		return oFDetailsResponse;
	},
	adaptFBarnyardFromResponse : function(oFBarnyard) {
		var oFDetailsResponse = {
			id : oFBarnyard.id,
			detail_id : oFBarnyard.detail_id,
			barnyard_id : oFBarnyard.barnyardId
		};
		return oFDetailsResponse;
	},
	adaptFBarnyardToRequest : function(oFBarnyard) {
		var oFDetailsResponse = {
			id : oFBarnyard.id,
			detailId : oFBarnyard.detail_id,
			barnyardId : oFBarnyard.barnyard_id
		};
		return oFDetailsResponse;
	}
});