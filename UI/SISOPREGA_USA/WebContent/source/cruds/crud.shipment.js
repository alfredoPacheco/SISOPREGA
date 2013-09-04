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
	    name : "crud.shipment",
	    kind : "crud",
	    published : {
		entityName : "Shipment",
		createKindName : "",
	    },
	    adapterToOut : function(entityObj) {
		var objShip = {};
		var obj = entityObj[0];
		// Defining parent
		objShip.carrierIdProgrammed = Number(obj.carrierId);
		objShip.customerId = Number(obj.customerId);
		objShip.dateTimeProgrammed = utils
			.dateTimeOut(obj.shipProgramDateTime);

		// Defining child
		objShip.ShipmentDetail = [];
		var child = {};
		child.heads = obj.totalHeads;
		child.inventoryId = obj.inventoryId;
		child.itemNumber = obj.itemNumber;
		child.qualityId = obj.qualityId;
		child.saleId = obj.saleId;
		child.weight = obj.totalWeight;

		objShip.ShipmentDetail.push(child);

		return objShip;
	    },
	    adapterToIn : function(entityObj) {
		if (entityObj) {
		    entityObj = this.inherited(arguments);

		    entityObj.dateTimeProgrammed = utils
			    .dateIn(entityObj.dateTimeProgrammed);
		    entityObj.shipmentId = Number(entityObj.shipmentId);
		    entityObj.carrierIdProgrammed = Number(entityObj.carrierIdProgrammed);
		    entityObj.customerId = Number(entityObj.customerId);

		     var customer = null;
		     if(customer =
		     crudCustomer.getByID(entityObj.customerId)){
		     entityObj.customer = customer.customerName;
		     }else{
		     entityObj.customer = "";
		     }
		    entityObj.totalHeads = 0;
		    entityObj.totalWeight = 0.0;
		    
		    if (entityObj.ShipmentDetail) {			
			for ( var i = 0; i < entityObj.ShipmentDetail.length; i++) {
			    entityObj.ShipmentDetail[i].heads= Number(entityObj.ShipmentDetail[i].heads);
			    entityObj.ShipmentDetail[i].weight= Number(entityObj.ShipmentDetail[i].weight);
			    entityObj.ShipmentDetail[i].inventoryId = Number(entityObj.ShipmentDetail[i].inventoryId);
			    entityObj.ShipmentDetail[i].itemNumber = Number(entityObj.ShipmentDetail[i].itemNumber);
			    entityObj.ShipmentDetail[i].qualityId = Number(entityObj.ShipmentDetail[i].qualityId);
			    entityObj.ShipmentDetail[i].saleId = Number(entityObj.ShipmentDetail[i].saleId);
			    entityObj.ShipmentDetail[i].shipmentDetailId = Number(entityObj.ShipmentDetail[i].shipmentDetailId);
			    
			    entityObj.totalHeads += entityObj.ShipmentDetail[i].heads;
			    entityObj.totalWeight += entityObj.ShipmentDetail[i].weight;
			    entityObj.ShipmentDetail[i].aveWeight = entityObj.ShipmentDetail[i].weight
				    / entityObj.ShipmentDetail[i].heads;
			}
		    }
		    entityObj.totalAvgWeight = Number(entityObj.totalHeads)
			    / Number(entityObj.totalWeight);
		    return entityObj;
		}
		return null;
	    }
	});
var crudShipment = new crud.shipment();