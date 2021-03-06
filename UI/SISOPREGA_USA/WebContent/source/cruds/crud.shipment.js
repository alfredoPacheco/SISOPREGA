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
	  name : "crud.shipment",
	  kind : "crud",
	  published :
	  {
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
			  detail[j].customerId = this.arrObj[i].customerId;
			  detail[j].customer = this.arrObj[i].customer;
			  detail[j].carrierIdProgrammed = this.arrObj[i].carrierIdProgrammed;
			  detail[j].shipmentId = this.arrObj[i].shipmentId;
			  detail[j].qualityId = this.arrObj[i].qualityId;
			  result.push(detail[j]);
			}
		  }
		}
		return result;
	  },
	  getBySaleID : function(iSaleID) {
		var programmedShips = this.getProgrammedShipments();
		var result = [];
		for ( var i = 0; i < programmedShips.length; i++) {
		  if (programmedShips[i].saleId == iSaleID) {
			result.push(programmedShips[i]);
		  }
		}
		return result;
	  },
	  adapterToOut : function(entityObj) {
		if (entityObj.dateTimeProgrammed) {
		  entityObj.dateTimeProgrammed = utils
			  .dateTimeOut(entityObj.dateTimeProgrammed);

		  if (entityObj.ShipmentRelease) {
			for ( var j = 0; j < entityObj.ShipmentRelease.length; j++) {
			  entityObj.ShipmentRelease[j].dateTime = utils
				  .dateTimeOut(entityObj.ShipmentRelease[j].dateTime);
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
		  entityObj.shipmentId = utils.parseToNumber(entityObj.shipmentId);
		  entityObj.carrierIdProgrammed = utils.parseToNumber(entityObj.carrierIdProgrammed);
		  entityObj.customerId = utils.parseToNumber(entityObj.customerId);
		  entityObj.qualityId = utils.parseToNumber(entityObj.qualityId);

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
			  entityObj.ShipmentDetail[i].heads = utils.parseToNumber(entityObj.ShipmentDetail[i].heads);
			  entityObj.ShipmentDetail[i].weight = utils.parseToNumber(entityObj.ShipmentDetail[i].weight);
			  entityObj.ShipmentDetail[i].inventoryId = utils.parseToNumber(entityObj.ShipmentDetail[i].inventoryId);
			  entityObj.ShipmentDetail[i].itemNumber = utils.parseToNumber(entityObj.ShipmentDetail[i].itemNumber);
			  entityObj.ShipmentDetail[i].saleId = utils.parseToNumber(entityObj.ShipmentDetail[i].saleId);
			  entityObj.ShipmentDetail[i].shipmentDetailId = utils.parseToNumber(entityObj.ShipmentDetail[i].shipmentDetailId);

			  entityObj.totalHeads += entityObj.ShipmentDetail[i].heads;
			  entityObj.totalWeight += entityObj.ShipmentDetail[i].weight;
			  entityObj.ShipmentDetail[i].aveWeight = entityObj.ShipmentDetail[i].weight
				  / entityObj.ShipmentDetail[i].heads;
			}
		  }

		  entityObj.totalAvgWeight = utils.parseToNumber(entityObj.totalWeight)
			  / utils.parseToNumber(entityObj.totalHeads);

		  if (entityObj.ShipmentRelease) {
			for ( var j = 0; j < entityObj.ShipmentRelease.length; j++) {
			  entityObj.ShipmentRelease[j].dateTime = utils
				  .dateIn(entityObj.ShipmentRelease[j].dateTime);
			}
		  }

		  return entityObj;
		}
		return null;
	  }
	});
var crudShipment = new crud.shipment();