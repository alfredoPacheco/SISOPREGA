/**
 * Provides a handler for rancher data options.
 * 
 * Revision History: - [DATE] By Alan del Rio: Initial Version. - [DATE] By
 * Alfredo Pacheco: Integrate with web services. - 02/03/2013 By Diego Torres:
 * Add rancher user handlers. - 05/27/2013 By Diego Torres: Adapt to crud.cache.
 * 
 */
enyo
	.kind({
	    name : "crud.inventory",
	    kind : "crud",
	    published : {
		entityName : "Inventory",
		createKindName : "operations.inventory.form",
	    },
	    /*get : function(callbackObject, callbackMethod) {
		// var filterDef = {}; // Always return all records

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
		this.getCallBack({
		    exceptionDescription : "Success",
		    exceptionId : 0,
		    origin : "",
		    entityName : "",
		    records : [ {
			Pen : [],
			cattleTypeId : 0,
			cattleQualityId : 0,
			heads : 0,
			weight : 0,
			avgweight : 0,
			feed : 0,
			buyers : [ {
			    name : "",
			    heads : 0
			} ]
		    } ]
		});
	    },*/

//	    adapterToIn : function(entityObj) {
//		if (entityObj) {
//		    var objAdapted = {};
//		    objAdapted.cattleName
//		    entityObj = this.inherited(arguments);
//		    entityObj.seller = crudSeller.getByID(entityObj.supplierId).sellerName;
//		    entityObj.purchaseDate = utils
//			    .dateIn(entityObj.purchaseDate);
//		    entityObj.aveweight = Number(entityObj.totalHeads)
//			    / Number(entityObj.totalWeight);
//		    return entityObj;
//		}
//		return null;
//	    }
	});
var crudInventory = new crud.inventory();