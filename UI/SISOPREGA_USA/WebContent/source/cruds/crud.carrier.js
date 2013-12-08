enyo.kind({
    name : "crud.carrier",
    kind : "crud",
    published : {
	entityName : "Carrier",
	createKindName : "catalogs.carrier.form",
    },
    adapterToList : function(entityObj) {
	var listObj = {
	    value : 0,
	    caption : ""
	};

	listObj.value = utils.parseToNumber(entityObj.carrierId);
	listObj.caption = entityObj.carrierName;

	return listObj;
    },
    getCatalogsList : function() {

	var arrAdapterList = enyo.clone(this.arrObj);
	var result = [];

	for ( var i = 0; i < arrAdapterList.length; i++) {
	    var obj = arrAdapterList[i];
	    obj.importantInfo = "" + arrAdapterList[i].carrierName;
	    obj.secundaryInfo = "" + arrAdapterList[i].phone;
	    result.push(obj);
	}
	return result;
    }
});
var crudCarrier = new crud.carrier();