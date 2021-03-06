/**
 * Provides a handler for rancher data options.
 * 
 * Revision History: - [DATE] By Alan del Rio: Initial Version. - [DATE] By
 * Alfredo Pacheco: Integrate with web services. - 02/03/2013 By Diego Torres:
 * Add rancher user handlers. - 05/27/2013 By Diego Torres: Adapt to crud.cache.
 * 
 */
enyo
	.kind(
	{
	  name : "crud.sale",
	  kind : "crud",
	  published :
	  {
		entityName : "Sale",
		createKindName : "operations.sales.form",
	  },
	  getSalesWithShipments : function() {

		var result = enyo.clone(this.arrObj);
		for ( var i = 0; i < result.length; i++) {
		  var ship = crudShipment.getBySaleID(result[i].saleId);
		  if (ship.length > 0) {
			result[i].arrToShipDetailed = ship;
		  }
		}
		return result;

	  },
	  getTodaySales : function() {
		var result = [];
		for ( var i = 0; i < this.arrObj.length; i++) {
		  if (this.arrObj[i].saleDate.toDateString() == new Date().toDateString())
			result.push(enyo.clone(this.arrObj[i]));
		}
		return result;
	  },
	  adapterToIn : function(entityObj) {
		if (entityObj) {
		  entityObj = this.inherited(arguments);
		  var customer = null;
		  if (customer = crudCustomer.getByID(entityObj.customerId)) {
			entityObj.customer = customer.customerName;
		  } else {
			entityObj.customer = "";
		  }
		  entityObj.saleDate = utils.dateIn(entityObj.saleDate);
		  if (entityObj.SaleDetail) {
			entityObj.totalHeads = 0;
			entityObj.totalWeight = 0.0;
			for ( var i = 0; i < entityObj.SaleDetail.length; i++) {
			  entityObj.totalHeads += utils.parseToNumber(entityObj.SaleDetail[i].heads);
			  entityObj.totalWeight += utils.parseToNumber(entityObj.SaleDetail[i].weight);
			  entityObj.SaleDetail[i].aveWeight = utils.parseToNumber(entityObj.SaleDetail[i].weight)
				  / utils.parseToNumber(entityObj.SaleDetail[i].heads);
			}
			entityObj.totalAvgWeight = utils.parseToNumber(entityObj.totalWeight)
				/ utils.parseToNumber(entityObj.totalHeads);
		  }

		  return entityObj;
		}
		return null;
	  },
	  adapterToOut : function(entityObj) {
		if(entityObj){
		  if(entityObj.SaleDetail){
			for(var i=0;i<entityObj.SaleDetail.length;i++){
			  entityObj.SaleDetail[i].heads = utils.parseToNumber(entityObj.SaleDetail[i].heads);
			  entityObj.SaleDetail[i].weight = utils.parseToNumber(entityObj.SaleDetail[i].weight);
			}
		  }
		  
		}
		return entityObj;
	  },
	  getSummary:function(){
		var objResult ={
			iHeads : 0,
			iWeight : 0			
		};
		for(var i=0;i<this.arrObj.length;i++){
		  objResult.iHeads += utils.parseToNumber(this.arrObj[i].totalHeads);
		  objResult.iWeight += utils.parseToNumber(this.arrObj[i].totalWeight);
		}
		return objResult;
	  }
	  
	});

var crudSale = new crud.sale();