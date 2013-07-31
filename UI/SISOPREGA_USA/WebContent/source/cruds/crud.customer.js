/**
 * Provides a handler for rancher data options.
 * 
 * Revision History: - [DATE] By Alan del Rio: Initial Version. - [DATE] By
 * Alfredo Pacheco: Integrate with web services. - 02/03/2013 By Diego Torres:
 * Add rancher user handlers. - 05/27/2013 By Diego Torres: Adapt to crud.cache.
 * 
 */
enyo.kind({
    name : "crud.customer",
    kind : "crud",
    published : {
	entityName : "Customer",
	createKindName : "catalogs.customer.form",
    },
    adapterToList : function(entityObj) {
	var listObj = {
	    value : 0,
	    caption : ""
	};

	listObj.value = Number(entityObj.customerId);
	listObj.caption = entityObj.customerName;

	return listObj;
    },
    get : function(callbackObject, callbackMethod) {

	if (callbackObject) {
	    this.callbackObject = callbackObject;
	    this.callbackMethod = callbackMethod;
	} else {
	    this.callbackObject = null;
	    this.callbackMethod = '';
	}

	// if (callbackObject && callbackObject.parentObject != null) {
	// consumingGateway.Read(callbackObject.parentObject.entityName,
	// filterDef, this, "getCallBack");
	// } else {
	// consumingGateway.Read(this.entityName, filterDef, this,
	// "getCallBack");
	// }
	this.getCallBack({records:[]});
    },
    getCatalogsList : function() {

	var arrAdapterList = enyo.clone(this.arrObj);
	var result = [];

	for ( var i = 0; i < arrAdapterList.length; i++) {
	    var obj = arrAdapterList[i];
	    obj.importantInfo = "" + arrAdapterList[i].customerName;
	    obj.secundaryInfo = "" + arrAdapterList[i].phone;
	    result.push(obj);
	}
	return result;
    }
});
var crudCustomer = new crud.customer();