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
	    name : "crud.purchase",
	    kind : "crud",
	    published : {
		entityName : "Purchase",
		createKindName : "operations.purchase.form",
	    },
	    adapterToIn : function(entityObj) {
		if (entityObj) {
		    entityObj = this.inherited(arguments);
		    var seller = null;
		    if(seller = crudSeller.getByID(entityObj.supplierId)){
			entityObj.seller = seller.sellerName;
		    }else{
			entityObj.seller = "";
		    }
		    entityObj.purchaseDate = utils.dateIn(entityObj.purchaseDate);
		    entityObj.aveweight = Number(entityObj.totalHeads) / Number(entityObj.totalWeight);
		    return entityObj;
		}
		return null;
	    },
	    adapterToOut : function(entityObj) {
//		entityObj.dateAllotted = utils.dateOut(entityObj.dateAllotted);
//		if (entityObj.FeedOrder) {
//		    for ( var i = 0; i < entityObj.FeedOrder.length; i++) {
//			entityObj.FeedOrder[i].feedDate = utils
//				.dateTimeOut(entityObj.FeedOrder[i].feedDate);
//		    }
//		}
//		if (entityObj.Inspection) {
//		    for ( var i = 0; i < entityObj.Inspection.length; i++) {
//			entityObj.Inspection[i].inspectionDate = utils
//				.dateOut(entityObj.Inspection[i].inspectionDate);
//		    }
//		}
		console.debug(entityObj);
		return entityObj;
	    },
	});

var crudPurchase = new crud.purchase();
