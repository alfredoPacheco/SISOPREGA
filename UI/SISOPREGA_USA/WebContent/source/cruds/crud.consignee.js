/**
 * Provides a handler for rancher data options.
 * 
 * Revision History: - [DATE] By Alan del Rio: Initial Version. - [DATE] By
 * Alfredo Pacheco: Integrate with web services. - 02/03/2013 By Diego Torres:
 * Add rancher user handlers. - 05/27/2013 By Diego Torres: Adapt to crud.cache.
 * 
 */
enyo.kind({
    name : "crud.consignee",
    kind : "crud",
    published : {
	entityName : "Consignee",
	createKindName : "catalogs.consignee.form",
    },
    adapterToList : function(entityObj) {
	var listObj = {
	    value : 0,
	    caption : ""
	};

	listObj.value = utils.parseToNumber(entityObj.consigneeId);
	listObj.caption = entityObj.consigneeName;

	return listObj;
    },
    getCatalogsList : function() {

	var arrAdapterList = enyo.clone(this.arrObj);
	var result = [];

	for ( var i = 0; i < arrAdapterList.length; i++) {
	    var obj = arrAdapterList[i];
	    obj.importantInfo = "" + arrAdapterList[i].consigneeName;
	    obj.secundaryInfo = "" + arrAdapterList[i].phone;
	    result.push(obj);
	}
	return result;
    }
});
var crudConsignee = new crud.consignee();