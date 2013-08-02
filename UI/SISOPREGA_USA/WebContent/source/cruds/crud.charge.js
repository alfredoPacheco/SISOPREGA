/**
 * Provides a handler for rancher data options.
 * 
 * Revision History: 
 * - [DATE] By Alan del Rio: Initial Version. 
 * - [DATE] By Alfredo Pacheco: Integrate with web services. 
 * - 02/03/2013 By Diego Torres: Add rancher user handlers.
 * - 05/27/2013 By Diego Torres: Adapt to crud.cache.
 * 
 */
enyo.kind(
  {
    name : "crud.charge",
    kind : "crud",
    published : {
	entityName : "charge",
	createKindName : "catalogs.charge.form",
    },
    get : function(callbackObject, callbackMethod) {
//	var filterDef = {}; // Always return all records

	if (callbackObject) {
	    this.callbackObject = callbackObject;
	    this.callbackMethod = callbackMethod;
	} else {
	    this.callbackObject = null;
	    this.callbackMethod = '';
	}

//	if (callbackObject && callbackObject.parentObject != null) {
//	    consumingGateway.Read(callbackObject.parentObject.entityName,
//		    filterDef, this, "getCallBack");
//	} else {
//	    consumingGateway.Read(this.entityName, filterDef, this,
//		    "getCallBack");
//	}
	this.getCallBack();
    },
    getCallBack : function(resultArray) {
	resultArray = {
		exceptionDescription : "Success",
		exceptionId : 0,
		origin : "",
		entityName : "",
		records : [
		           
		           ]
	};
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
  });
var crudCharge = new crud.Charge();