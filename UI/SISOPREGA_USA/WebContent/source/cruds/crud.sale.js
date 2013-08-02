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
	    name : "crud.sale",
	    kind : "crud",
	    published : {
		entityName : "Sale",
		createKindName : "operations.sales.form",
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
	    getCallBack : function(resultArray) {
		resultArray = {
		    exceptionDescription : "Success",
		    exceptionId : 0,
		    origin : "",
		    entityName : "",
		    records : [ {
			SaleDetail : [ {
			    avgWeight : 43.4,
			    cattleQualityId : 6,
			    heads : 43,
			    penId : 216
			}, {
			    avgWeight : 43.4,
			    cattleQualityId : 6,
			    heads : 43,
			    penId : 216
			} ],
			cattleQualityId : 1,
			totalHeads:86,
			totalWeight:234.4,
			totalAvgWeight:12.2,
			saleDate : "07/28/2013",
			saleId : 0,
			customerId : 1
		    }, 
		    
		    {
			SaleDetail : [ {
			    avgWeight : 32.3,
			    cattleQualityId : 16,
			    heads : 23,
			    penId : 228
			} ],
			cattleQualityId : 2,
			totalHeads:23,
			totalWeight:228,
			totalAvgWeight:12.2,
			saleDate : "07/28/2013",
			saleId : 0,
			customerId : 1
		    } ]
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
		    setTimeout(this.callbackObject[this.callbackMethod]
			    (resultArray), milis);
		}
	    },
	    adapterToIn : function(entityObj) {
		if (entityObj) {
		    entityObj = this.inherited(arguments);
		    var customer = null;
		    if(customer = crudCustomer.getByID(entityObj.customerId)){
			entityObj.customer = customer.customerName;
		    }else{
			entityObj.customer = "";
		    }
		    entityObj.saleDate = utils.dateIn(entityObj.saleDate);
		    entityObj.totalAvgWeight = Number(entityObj.totalHeads) / Number(entityObj.totalWeight);
		    return entityObj;
		}
		return null;
	    }
	});

var crudSale = new crud.sale();
