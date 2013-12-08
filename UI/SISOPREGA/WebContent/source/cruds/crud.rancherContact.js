/**
 * Provides a handler for rancher data options.
 * 
 * Revision History: - [DATE] By Alan del Rio: Initial Version. - [DATE] By
 * Alfredo Pacheco: Integrate with web services. - 02/03/2013 By Diego Torres:
 * Add rancher user handlers. - 05/27/2013 By Diego Torres: Adapt to crud.cache.
 * 
 */
enyo.kind({
    name : "crud.rancherContact",
    kind : "crud",
    published : {
	entityName : "RancherContact",
	createKindName : "catalogs.rancher.contact.form",
    },
    adapterToIn : function(entityObj) {
	entityObj.phone = entityObj.telephone || "";
	entityObj.name = "" + (entityObj.lastName || "") + " "
		+ (entityObj.motherName || "") + ", "
		+ (entityObj.firstName || "");
	
	if(entityObj.birthDate && entityObj.birthDate != ''){
	    if(isNaN(entityObj.birthDate)){
		// parse date in MM/dd/yyyy format
		var dateParts = entityObj.birthDate.split('/');
		var bDate = new Date(dateParts[2], dateParts[0]-1, dateParts[1]);
		entityObj.birthDate = bDate;
	    }else{
		var numberBDate = utils.parseToNumber(entityObj.birthDate);
	        var bDate = new Date(numberBDate);
	        entityObj.birthDate = bDate;
	    }
	}
	
	return this.inherited(arguments);
    },
    getCatalogsList : function() {

	var arrAdapterList = enyo.clone(this.arrObj);
	var result = [];

	for ( var i = 0; i < arrAdapterList.length; i++) {
	    var obj = this.adapterToIn(arrAdapterList[i]);
	    obj.importantInfo = "" + arrAdapterList[i].name;
	    obj.secundaryInfo = "" + arrAdapterList[i].phone;
	    result.push(obj);
	}
	return result;
    }
});
var crudRancherContact = new crud.rancherContact();