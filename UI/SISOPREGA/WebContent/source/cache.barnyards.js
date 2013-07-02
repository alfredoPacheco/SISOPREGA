enyo.kind({
    name : "cache.barnyards",
    kind : "crud.cache",
    entityName : "Barnyards",
    arrPensZone1 : [],
    arrPensZone2 : [],
    arrObjInUse : {},

    isOccupied : function(sID) {
	if (this.arrObjInUse[sID]) {
	    return true;
	} else {
	    return false;
	}
    },
    updateOccupiedBarnyards : function() {
	this.arrObjInUse = {};
	var arrActiveReceptions = enyo.clone(cacheReceptions.arrObj);
	for ( var i = 0; i < arrActiveReceptions.length; i++) {
	    if (arrActiveReceptions[i].Pen) {
		for ( var j = 0; j < arrActiveReceptions[i].Pen.length; j++) {
		    this.arrObjInUse[""
			    + arrActiveReceptions[i].Pen[j].locationId
			    + arrActiveReceptions[i].Pen[j].barnyardCode] = arrActiveReceptions[i];
		}
	    }
	}
    },
    inUse : function() {
	return this.arrObjInUse;
    },
    getBYbyRecID : function(sID) {
	var arrBY = {};
	for ( var sKey in this.arrObjInUse) {
	    if (this.arrObjInUse[sKey].reception_id == sID) {
		arrBY[sKey] = this.arrObjInUse[sKey];
	    }
	}
	return arrBY;
    },
    fillArrayPens : function(callbackObject, callbackMethod) {
	if (callbackObject) {
	    this.callbackObjectFillingPens = callbackObject;
	    this.callbackMethodFillingPens = callbackMethod;
	} else {
	    this.callbackObjectFillingPens = null;
	    this.callbackMethodFillingPens = '';
	}
	var filterDef = {
	    locationId : 1
	};

	consumingGateway.Read("Pen", filterDef, this, "continueFillingPens");

    },
    continueFillingPens : function(resultArray) {

	this.arrPensZone1 = [];

	for ( var i = 0; i < resultArray.records.length; i++) {
	    var objAux = resultArray.records[i];
	    var innerModelObj = this.adapterToIn(objAux);
	    if (innerModelObj != null)
		this.arrPensZone1.push(innerModelObj);
	}

	var filterDef = {
	    locationId : 2
	};
	consumingGateway.Read("Pen", filterDef, this, "afterFillingPens");

    },
    afterFillingPens : function(resultArray) {
	this.arrPensZone2 = [];
	for ( var i = 0; i < resultArray.records.length; i++) {
	    var objAux = resultArray.records[i];
	    var innerModelObj = this.adapterToIn(objAux);
	    if (innerModelObj != null)
		this.arrPensZone2.push(innerModelObj);
	}

	if (this.callbackObjectFillingPens != null) {
	    var milis = ((Math.random() * 1000) + 500);
	    setTimeout(this.callbackObjectFillingPens[this.callbackMethodFillingPens](),
		    milis);
	}
    },
    getByBarnyard:function(pen){
	if (pen.substr(0,1) == "1"){
	    for(var i=0; i<this.arrPensZone1.length;i++){
		if (this.arrPensZone1[i].barnyardCode==pen.substr(1)){
		    return enyo.clone(this.arrPensZone1[i]);
		}
	    }
	}else {
	    for(var i=0; i<this.arrPensZone2.length;i++){
		if (this.arrPensZone2[i].barnyardCode==pen.substr(1)){
		    return enyo.clone(this.arrPensZone2[i]);
		}
	    }
	}
    },
    setOccupied:function(sID,iReceptionID){ //example: setOccupied("1E2","79")
	
	objAux = {};
	objAux.sID = this.getByBarnyard(sID).penId;
	objAux.iReceptionID = iReceptionID;
	var objToSend = this.rec_barnAdapterToOut(objAux);
	delete objToSend.recBarnyardId;
	var cgCreate = consumingGateway.Create("ReceptionBarnyard", objToSend);
	if (cgCreate.exceptionId == 0){ //Created successfully			
		objAux.recBarnyardId = cgCreate.generatedId;
		this.arrObjInUse[sID]={reception_id:parseInt(iReceptionID),accepted_count:"",inspections:[],feed:[]};
		return true;
	}
	else{ //Error			
		alert( cgCreate.exceptionDescription);
		//cacheMan.setMessage("", "[Exception ID: " + cgCreate.exceptionId + "] Descripcion: " + cgCreate.exceptionDescription);
		return false;
	}
    },
    getRecIDbyBY:function(by){
	if(by in this.arrObjInUse){
	    return this.arrObjInUse[by].receptionId;
	}
	return null;
    },
});
var cacheBY = new cache.barnyards();