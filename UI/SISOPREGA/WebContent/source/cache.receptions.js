enyo.kind({
    name : "cache.receptions",
    kind : "crud.cache",
    entityName : "Reception",
    getCallBack : function(resultArray) {

	this.arrObj = [];
	for ( var i = 0; i < resultArray.records.length; i++) {
	    var objAux = resultArray.records[i];
	    var innerModelObj = this.adapterToIn(objAux);
	    if (innerModelObj != null)
		this.arrObj.push(innerModelObj);
	}

	cacheBY.updateOccupiedBarnyards();

	if (this.callbackObject != null) {
	    var milis = ((Math.random() * 1000) + 500);
	    setTimeout(this.callbackObject[this.callbackMethod](resultArray),
		    milis);
	}
    },
    getRanchersByReceptions : function() {
	var arrResult = [];
	var result = [];
	var arrReceptions = this.arrObj;

	for ( var i = 0; i < arrReceptions.length; i++) {
	    var obj = {
		value : arrReceptions[i].rancher_id,
		caption : "getRancherByID"
	    };
	    if (!(arrResult[obj.value] in arrResult)) {
		arrResult[obj.value] = obj;
	    }
	}
	for ( var i = 0; i < arrResult.length; i++) {
	    result.push(arrResult[i]);
	}
	return result;
    },
    getByID : function(iID) {
	var arrTemp = [];
	arrTemp = enyo.clone(this.arrObj);
	for ( var i = 0; i < arrTemp.length; i++) {
	    if (arrTemp[i].reception_id == iID) {
		return arrTemp[i];
	    }
	}
	return null;
    },
    appendBY : function(objReception, objBY, cbObj, cbMethod) {

	for ( var sKey in objBY) {
	    var penToAppend = {};
	    penToAppend.penId = cacheBY.getByBarnyard(sKey).penId;
	    objReception.Pen.push(penToAppend);
	    //TODO removed pushed if something goes wrong
	    // cacheBY.setOccupied(sKey, objReception.reception_id);
	    // objReception.barnyards[sKey] = objBY[sKey];
	}

	objReception = this.adapterToOut(objReception);
	this.update(objReception, cbObj, cbMethod);
	
    },
    adapterToOut : function(entityObj) {
	entityObj.dateAllotted = utils.dateOut(entityObj.dateAllotted);
	if(entityObj.FeedOrder){
	    for(var i = 0; i<entityObj.FeedOrder.length;i++){
		entityObj.FeedOrder[i].feedDate =utils.dateOut(entityObj.FeedOrder[i].feedDate);
	    }
	}
	return entityObj;
    },
    adapterToIn : function(entityObj){
	entityObj.dateAllotted = utils.dateIn(entityObj.dateAllotted);
	if(entityObj.FeedOrder){
	    for(var i = 0; i<entityObj.FeedOrder.length;i++){
		entityObj.FeedOrder[i].feedDate =utils.dateIn(entityObj.FeedOrder[i].feedDate);
	    }
	}
	return this.inherited(arguments);
    },
});
var cacheReceptions = new cache.receptions();