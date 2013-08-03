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
//	    get : function(callbackObject, callbackMethod) {
//
//		if (callbackObject) {
//		    this.callbackObject = callbackObject;
//		    this.callbackMethod = callbackMethod;
//		} else {
//		    this.callbackObject = null;
//		    this.callbackMethod = '';
//		}
//
//		 if (callbackObject && callbackObject.parentObject != null) {
//		     consumingGateway.Read(callbackObject.parentObject.entityName,filterDef, this, "getCallBack");
//		 } else {
//		 consumingGateway.Read(this.entityName, filterDef, this,"getCallBack");
//		 }
//	    },
//	    getCallBack : function(resultArray) {
//		resultArray = {
//		    exceptionDescription : "Success",
//		    exceptionId : 0,
//		    origin : "",
//		    entityName : "",
//		    records : [ {
//			PurchaseDetail : [ {
//			    avgWeight : 43.4,
//			    cattleQualityId : 6,
//			    heads : 43,
//			    penId : 216
//			}, {
//			    avgWeight : 43.4,
//			    cattleQualityId : 6,
//			    heads : 43,
//			    penId : 216
//			} ],
//			cattleTypeId : 1,
//			totalHeads:86,
//			totalWeight:234.4,
//			purchaseDate : "07/28/2013",
//			purchaseId : 0,
//			supplierId : 1
//		    }, {
//			PurchaseDetail : [ {
//			    avgWeight : 32.3,
//			    cattleQualityId : 16,
//			    heads : 23,
//			    penId : 228
//			} ],
//			cattleTypeId : 2,
//			totalHeads:23,
//			totalWeight:228,
//			purchaseDate : "07/28/2013",
//			purchaseId : 0,
//			supplierId : 1
//		    } ]
//		};
//		this.arrObj = [];
//		for ( var i = 0; i < resultArray.records.length; i++) {
//		    var objAux = resultArray.records[i];
//		    var innerModelObj = this.adapterToIn(objAux);
//		    if (innerModelObj != null)
//			this.arrObj.push(innerModelObj);
//		}
//
//		if (this.callbackObject != null) {
//		    var milis = ((Math.random() * 1000) + 500);
//		    setTimeout(this.callbackObject[this.callbackMethod]
//			    (resultArray), milis);
//		}
//	    },
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
