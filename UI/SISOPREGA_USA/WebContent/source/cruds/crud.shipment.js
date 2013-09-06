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
	    getProgrammedShipments : function() {
		var result = [];
		for ( var i = 0; i < this.arrObj.length; i++) {
		    var detail = null;
		    if (detail = this.arrObj[i].ShipmentDetail) {
			for ( var j = 0; j < detail.length; j++) {
			    detail[j].dateTimeProgrammed = this.arrObj[i].dateTimeProgrammed;
			    detail[j].customer = this.arrObj[i].customer;
			    detail[j].carrierIdProgrammed = this.arrObj[i].carrierIdProgrammed;
			    detail[j].shipmentId = this.arrObj[i].shipmentId;
			    result.push(detail[j]);
			}
		    }
		}
		return result;
	    },
	    adapterToOut : function(entityObj) {
		if (entityObj.dateTimeProgrammed) {
		    entityObj.dateTimeProgrammed = utils
			    .dateTimeOut(obj.shipProgramDateTime);
		    if (entityObj.ShipmentDetail) {
			for ( var i = 0; i < entityObj.ShipmentDetail.length; i++) {
			    if (entityObj.ShipmentDetail[i].ShipmentRelease) {
				for ( var j = 0; j < entityObj.ShipmentDetail[i].ShipmentRelease.length; j++) {
				    entityObj.ShipmentDetail[i].ShipmentRelease[j].dateTime = utils
					    .dateTimeOut(entityObj.ShipmentDetail[i].ShipmentRelease[j].dateTime);
				}
			    }
			}
		    }
		}
		return entityObj;
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
		    if (customer = crudCustomer.getByID(entityObj.customerId)) {
			entityObj.customer = customer.customerName;
		    } else {
			entityObj.customer = "";
		    }
		    entityObj.totalHeads = 0;
		    entityObj.totalWeight = 0.0;

		    if (entityObj.ShipmentDetail) {
			for ( var i = 0; i < entityObj.ShipmentDetail.length; i++) {
			    entityObj.ShipmentDetail[i].heads = Number(entityObj.ShipmentDetail[i].heads);
			    entityObj.ShipmentDetail[i].weight = Number(entityObj.ShipmentDetail[i].weight);
			    entityObj.ShipmentDetail[i].inventoryId = Number(entityObj.ShipmentDetail[i].inventoryId);
			    entityObj.ShipmentDetail[i].itemNumber = Number(entityObj.ShipmentDetail[i].itemNumber);
			    entityObj.ShipmentDetail[i].qualityId = Number(entityObj.ShipmentDetail[i].qualityId);
			    entityObj.ShipmentDetail[i].saleId = Number(entityObj.ShipmentDetail[i].saleId);
			    entityObj.ShipmentDetail[i].shipmentDetailId = Number(entityObj.ShipmentDetail[i].shipmentDetailId);

			    entityObj.totalHeads += entityObj.ShipmentDetail[i].heads;
			    entityObj.totalWeight += entityObj.ShipmentDetail[i].weight;
			    entityObj.ShipmentDetail[i].aveWeight = entityObj.ShipmentDetail[i].weight
				    / entityObj.ShipmentDetail[i].heads;
			    var objRelease=null;
			    if (objRelease = entityObj.ShipmentDetail[i].ShipmentRelease) {
				for ( var j = 0; j < objRelease.length; j++) {
				    objRelease[j].dateTime = utils.dateIn(objRelease[j].dateTime);
				}
			    }
			
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