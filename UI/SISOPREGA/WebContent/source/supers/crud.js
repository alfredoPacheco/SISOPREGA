/*
 * common functionality for CRUD.
 * */
enyo.kind({
    name : "crud",
    kind : "Object",
    arrObj : [],
    callbackObject : null,
    callbackMethod : '',
    published:{
	entityName : "",
	createKindName : ""
    },
    adapterToIn : function(entityObj) {
	if (entityObj)
	    entityObj.idName = this.entityIdName();
	return entityObj;
    },
    adapterToOut : function(entityObj) {
	return entityObj;
    },
    adapterToList : function(entityObj) {
	return entityObj;
    },
    get : function(callbackObject, callbackMethod) {
	var filterDef = {}; // Always return all records

	if (callbackObject) {
	    this.callbackObject = callbackObject;
	    this.callbackMethod = callbackMethod;
	} else {
	    this.callbackObject = null;
	    this.callbackMethod = '';
	}

	if (callbackObject && callbackObject.parentObject != null) {
	    consumingGateway.Read(callbackObject.parentObject.entityName,
		    filterDef, this, "getCallBack");
	} else {
	    consumingGateway.Read(this.entityName, filterDef, this,
		    "getCallBack");
	}

    },
    getCallBack : function(resultArray) {

	this.arrObj = [];
	for ( var i = 0; i < resultArray.records.length; i++) {
	    var objAux = resultArray.records[i];
	    var innerModelObj = this.adapterToIn(objAux);
	    if (innerModelObj != null)
		this.arrObj.push(innerModelObj);
	}

	if (this.callbackObject != null) {
	    var milis = ((Math.random() * 1000) + 500);
	    setTimeout(this.callbackObject[this.callbackMethod](resultArray),
		    milis);
	}
    },
    getList : function(captionFieldName, valueFieldName) {
	var arrResult = [];
	for ( var i = 0; i < this.arrObj.length; i++) {
	    var objTemp = this.adapterToList(this.arrObj[i]);
	    arrResult.push(objTemp);
	}
	return arrResult;
    },
    create : function(objEntity, callbackObject, callbackMethod) {
	var outerObj = this.adapterToOut(objEntity);
	this.callbackObject = callbackObject;
	this.callbackMethod = callbackMethod;
	consumingGateway
		.Create(this.entityName, outerObj, this, "saveCallBack");
    },
    update : function(objEntity, callbackObject, callbackMethod) {
	var outerObj = this.adapterToOut(objEntity);
	this.callbackObject = callbackObject;
	this.callbackMethod = callbackMethod;
	consumingGateway.Update(objEntity.entityName || this.entityName,
		outerObj, this, "saveCallBack");
    },
    remove : function(entity, callbackObject, callbackMethod) {
	var removableId = entity[this.entityIdName()];
	var filterDef = {
	    id : removableId
	};
	this.callbackObject = callbackObject;
	this.callbackMethod = callbackMethod;
	consumingGateway.Delete(this.entityName, filterDef, this,
		"saveCallBack");
    },
    saveCallBack : function(resultObj) {
	if (Number(resultObj.exceptionId) == 0) { // Created successfully
	    var milis = ((Math.random() * 1000) + 500);
	    setTimeout(this.callbackObject[this.callbackMethod](resultObj),
		    milis);
	    // this.get(this.callbackObject, this.callbackMethod);
	} else {
	    // Hide scrim if open to see exception message.
	    cacheMan.hideScrim();
	    cacheMan.setMessage("", "[Exception ID: " + resultObj.exceptionId
		    + "] Descripcion: " + resultObj.exceptionDescription);
	}
    },
    entityIdName : function(entityObj) {
	var lowerCaseFirstChar = this.entityName.substring(0, 1).toLowerCase();
	var entityNameCamelCase = this.entityName.substring(1,
		this.entityName.length);
	var idSuffix = "Id";

	if (entityObj) {
	    lowerCaseFirstChar = entityObj.entityName.substring(0, 1)
		    .toLowerCase();
	    entityNameCamelCase = entityObj.entityName.substring(1,
		    entityObj.entityName.length);
	}

	var entityIdName = lowerCaseFirstChar + entityNameCamelCase + idSuffix;
	return entityIdName;
    }
});