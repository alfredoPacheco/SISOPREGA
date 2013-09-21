enyo.kind({
    name : "crud.pen",
    kind : "crud",
    published : {
	entityName : "Pen",
    },
    arrPensZone1 : [],
    arrPensZone2 : [],
    arrPensUsaEast: [],
    arrPensUsaWest : [],
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
	var arrActiveReceptions = enyo.clone(crudReception.arrObj);
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
	    if (this.arrObjInUse[sKey].receptionId == sID) {
		arrBY[sKey] = this.arrObjInUse[sKey];
	    }
	}
	return arrBY;
    },
    getCallBack : function(resultArray) {
	this.arrPensZone1 = [];
	this.arrPensZone2 = [];
	this.arrPensUsaEast = [];
	this.arrPensUsaWest = [];
	for ( var i = 0; i < resultArray.records.length; i++) {
	    var objAux = resultArray.records[i];
	    var innerModelObj = this.adapterToIn(objAux);
	    if (innerModelObj != null){
		if(innerModelObj.locationId== "1"){
		    this.arrPensZone1.push(innerModelObj);
		}else if(innerModelObj.locationId== "2"){
		    this.arrPensZone2.push(innerModelObj);    
		}else if (innerModelObj.locationId == "3"){
		    this.arrPensUsaWest.push(innerModelObj);
		}else if (innerModelObj.locationId == "4"){
		    this.arrPensUsaEast.push(innerModelObj);
		}
	    }
	}
	if (this.callbackObject != null) {
	    var milis = ((Math.random() * 1000) + 500);
	    setTimeout(this.callbackObject[this.callbackMethod](resultArray),
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
	}else if (pen.substr(0,1) == "2"){
	    for(var i=0; i<this.arrPensZone2.length;i++){
		if (this.arrPensZone2[i].barnyardCode==pen.substr(1)){
		    return enyo.clone(this.arrPensZone2[i]);
		}
	    }
	}else if (pen.substr(0,1) == "3"){
	    for(var i=0; i<this.arrPensUsaWest.length;i++){
		if (this.arrPensUsaWest[i].barnyardCode==pen.substr(1)){
		    return enyo.clone(this.arrPensUsaWest[i]);
		}
	    }
	}else if (pen.substr(0,1) == "4"){
	    for(var i=0; i<this.arrPensUsaEast.length;i++){
		if (this.arrPensUsaEast[i].barnyardCode==pen.substr(1)){
		    return enyo.clone(this.arrPensUsaEast[i]);
		}
	    }
	}
    },
    getRecIDbyBY:function(by){
	if(by in this.arrObjInUse){
	    return this.arrObjInUse[by].receptionId;
	}
	return null;
    },
    adapterToList : function(entityObj) {
	var listObj =
	{
		value : 0,
		caption : ""
	};
	listObj.value = Number(entityObj.penId);
	if(entityObj.locationId == "3"){
	    listObj.caption = "W" + entityObj.barnyardCode;
	}else if(entityObj.locationId == "4"){
	    listObj.caption = "E" + entityObj.barnyardCode;
	} 
	
	return listObj;
    },
    getListUsaPens:function(){
	var result=[];
	for(var i=0;i<this.arrPensUsaWest.length;i++){
	    result.push(this.adapterToList(this.arrPensUsaWest[i]));
	}
	for(var i=0;i<this.arrPensUsaEast.length;i++){
	    result.push(this.adapterToList(this.arrPensUsaEast[i]));
	}
	return result;
    },
    getByID : function(iID) {
	var entityIdName = this.entityIdName();
	for ( var i = 0; i < this.arrPensZone1.length; i++) {
	    if (this.arrPensZone1[i][entityIdName] == iID) {
		return this.arrPensZone1[i];
	    }
	}
	for ( var i = 0; i < this.arrPensZone2.length; i++) {
	    if (this.arrPensZone2[i][entityIdName] == iID) {
		return this.arrPensZone2[i];
	    }
	}
	for ( var i = 0; i < this.arrPensUsaWest.length; i++) {
	    if (this.arrPensUsaWest[i][entityIdName] == iID) {
		return this.arrPensUsaWest[i];
	    }
	}
	for ( var i = 0; i < this.arrPensUsaEast.length; i++) {
	    if (this.arrPensUsaEast[i][entityIdName] == iID) {
		return this.arrPensUsaEast[i];
	    }
	}
	return null;
    },
    movePen : function(objFrom, objTo, objMovement) {
	objFrom.heads = parseInt(objFrom.heads) - parseInt(objMovement.heads);
	objFrom.weight = parseInt(objFrom.weight) - parseInt(objMovement.weight);
	
	if (objTo) {
	    objTo.heads = parseInt(objTo.heads) + parseInt(objMovement.heads);
	    objTo.weight = parseInt(objTo.weight) + parseInt(objMovement.weight);
	    if (this.update(objFrom))
		if (this.update(objTo))
		    return true;
	} else {
	    if (this.update(objFrom))
		if (this.create(objMovement))
		    return true;
	}
	return false;
    },
});
var crudPen = new crud.pen();