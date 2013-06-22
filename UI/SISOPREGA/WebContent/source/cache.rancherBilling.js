/**
 * Provides a handler for rancher data options.
 * 
 * Revision History: - [DATE] By Alan del Rio: Initial Version. - [DATE] By
 * Alfredo Pacheco: Integrate with web services. - 02/03/2013 By Diego Torres:
 * Add rancher user handlers. - 05/27/2013 By Diego Torres: Adapt to crud.cache.
 * 
 */
enyo.kind({
    name : "cache.rancherBilling",
    kind : "crud.cache",
    entityName : "RancherInvoice",
    getCatalogsList : function() {

	var arrAdapterList = enyo.clone(this.arrObj);
	var result = [];

	for ( var i = 0; i < arrAdapterList.length; i++) {
	    var obj = this.adapterToIn(arrAdapterList[i]);
	    obj.importantInfo = "" + arrAdapterList[i].legalName;
	    obj.secundaryInfo = "" + arrAdapterList[i].addressOne;
	    result.push(obj);
	}
	return result;
    }
});
var cacheRancherBilling = new cache.rancherBilling();