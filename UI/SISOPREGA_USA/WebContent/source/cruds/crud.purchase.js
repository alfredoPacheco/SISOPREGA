enyo
	.kind(
	{
	  name : "crud.purchase",
	  kind : "crud.summarized",
	  published :
	  {
		entityName : "Purchase",
		createKindName : "operations.purchase.form",
	  },
	  calculateSummary : function() {
		var heads = 0;
		var weight = 0;
		var objSummary =
		{
		  heads : 0,
		  weight : 0
		};
		for ( var i = 0; i < this.arrObj.length; i++) {
		  for ( var j = 0; j < this.arrObj[i].PurchaseDetail.length; j++) {
			heads += utils.parseToNumber(this.arrObj[i].PurchaseDetail[j].heads);
			weight += utils.parseToNumber(this.arrObj[i].PurchaseDetail[j].weight);
		  }
		}
		objSummary.heads = heads;
		objSummary.weight = weight;

		this.setObjSummary(objSummary);

	  },
	  adapterToIn : function(entityObj) {
		if (entityObj) {
		  entityObj = this.inherited(arguments);
		  var seller = null;
		  if (seller = crudSeller.getByID(entityObj.supplierId)) {
			entityObj.seller = seller.sellerName;
		  } else {
			entityObj.seller = "";
		  }
		  entityObj.purchaseDate = utils.dateIn(entityObj.purchaseDate);

		  if (entityObj.PurchaseDetail) {
			for ( var i = 0; i < entityObj.PurchaseDetail.length; i++) {
			  entityObj.PurchaseDetail[i].avgWeight = (utils.parseToNumber(entityObj.PurchaseDetail[i].weight) / utils.parseToNumber(entityObj.PurchaseDetail[i].heads))
				  .toFixed(2);
			}
		  }
		  return entityObj;
		}
		return null;
	  },
	  adapterToOut : function(entityObj) {
		return entityObj;
	  },
	  getCatalogsList : function() {

		var arrAdapterList = enyo.clone(this.arrObj);
		var result = [];

		for ( var i = 0; i < arrAdapterList.length; i++) {
		  var obj = arrAdapterList[i];
		  var strDetail = "<table cellspacing=0 style='border: 1px solid darkgray;border-radius: 10px;'>";
		  for(var j=0;j<obj.PurchaseDetail.length;j++){
			strDetail += "<tr><td style='width:150px;text-align:right;border-right: 1px solid darkgray;padding-right: 7px;'>" + crudCattleQuality.getByID(obj.PurchaseDetail[j].qualityId).qualityName + "</td>";
			strDetail += "<td style='width:120px;text-align:center;'>" + obj.PurchaseDetail[j].heads + "/" + obj.PurchaseDetail[j].weight + "lb</td>";
			strDetail += "</tr>";
		  }
		  strDetail += "</table>";
		  obj.importantInfo = ""
			  + obj.purchaseDate.toLocaleDateString()
			  + " " + crudSeller.getByID(obj.sellerId).sellerName;
		  obj.secundaryInfo = ""
			  + strDetail;
		  result.push(obj);
		}
		return result;
	  }

	});

var crudPurchase = new crud.purchase();
