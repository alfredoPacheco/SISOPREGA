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
	    getSalesWithShipments:function(){
		
		var result = enyo.clone(this.arrObj);
		for(var i=0;i<result.length;i++){
		    var ship = crudShipment.getBySaleID(result[i].saleId);
		    if(ship.length>0){
			result[i].arrToShipDetailed=ship;
		    }
		}
		return result;
		
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
		    if(entityObj.SaleDetail){
			entityObj.totalHeads = 0;
			entityObj.totalWeight = 0.0;
			for(var i=0;i<entityObj.SaleDetail.length;i++){
			    entityObj.totalHeads+=Number(entityObj.SaleDetail[i].heads);
			    entityObj.totalWeight+=Number(entityObj.SaleDetail[i].weight);
			    entityObj.SaleDetail[i].aveWeight = Number(entityObj.SaleDetail[i].weight)/
			    					Number(entityObj.SaleDetail[i].heads);
			}
			entityObj.totalAvgWeight =  Number(entityObj.totalWeight) / Number(entityObj.totalHeads);
		    }
		    
		    return entityObj;
		}
		return null;
	    },
	    adapterToOut : function(entityObj) {		
		return entityObj;
	    },
	    getQtyByInventoryID : function(iInventoryID) {
		var sales = enyo.clone(this.arrObj);
		var result = 0;
		for ( var i = 0; i < sales.length; i++) {
		    if(sales[i].SaleDetail){			
			for(var j = 0; j< sales[i].SaleDetail.length;j++){
			    var detail =  sales[i].SaleDetail[j];
			    if(Number(detail.inventoryId) == Number(iInventoryID)){
				result += Number(detail.heads);
			    }
			}
		    }		    
		}
		return result;
	    },
	});

var crudSale = new crud.sale();