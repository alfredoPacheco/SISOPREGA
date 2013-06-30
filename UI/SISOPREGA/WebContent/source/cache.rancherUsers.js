/**
 * Provides a handler for rancher data options.
 * 
 * Revision History: - [DATE] By Alan del Rio: Initial Version. - [DATE] By
 * Alfredo Pacheco: Integrate with web services. - 02/03/2013 By Diego Torres:
 * Add rancher user handlers. - 05/27/2013 By Diego Torres: Adapt to crud.cache.
 * 
 */
enyo.kind({
    name : "cache.rancherUsers",
    kind : "crud.cache",
    entityName : "RancherUser",
    getCatalogsList : function() {

	var arrAdapterList = enyo.clone(this.arrObj);
	var result = [];

	for ( var i = 0; i < arrAdapterList.length; i++) {
	    var obj = this.adapterToIn(arrAdapterList[i]);
	    obj.importantInfo = "" + arrAdapterList[i].user_name;
	    obj.secundaryInfo = "";
	    result.push(obj);
	}
	return result;
    },
    create : function(rancherId, user_name, password, callbackObject, callbackMethod) {
	this.callbackObject = callbackObject;
	this.callbackMethod = callbackMethod;
	consumingGateway.CreateRancherUser(rancherId,  user_name, password, this, "saveCallBack");
    },
});
var cacheRancherUsers = new cache.rancherUsers();