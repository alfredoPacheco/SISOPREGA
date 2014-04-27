enyo
	.kind(
	{
	  name : "admin.purchased",
	  kind : "VFlexBox",
	  className : "enyo-bg",
	  events :
	  {
		onSelect : "",
		onLoadCompleted : "",
		onAferUpdatePurchase : "",
		onBuyCattle : "",
		onCaptureHermana : ""
	  },
	  ready : function() {
	  },
	  arrData : [],
	  components : [
		  {
			kind : "Toolbar",
			layoutKind : enyo.HFlexLayout,
			style : "padding:0px;color:white",
			components : [
			{
			  kind : "VFlexBox",
			  content : "Purchased",
			  style : "font-size:15px;",
			  flex : .1,
			  onclick : "doSelect"
			},
			{
			  kind : "Spacer",
			  flex : .02
			},
			{
			  kind : "Button",
			  caption : "Purchase",
			  width : "70px;",
			  onclick : "doBuyCattle",
			},
			{
			  kind : "Button",
			  caption : "Hermana",
			  width : "70px;",
			  onclick : "doCaptureHermana",
			} ]
		  },
		  {// HEADER:
			kind : "HFlexBox",
			className : "listFirst",
			style : "font-size:12px;background-color:#DABD8B;border-bottom-style: solid;border-bottom-color: black;padding: 0px 10px;border-width: 1px;",
			height : "30px",
			align : "center",
			pack : "start",
			components : [
			{
			  content : 'Vendor',
			  flex : 1,
			  onclick : "on_sort",
			  sortDirection : "DESC"
			},
			{
			  content : 'Heads',
			  flex : 1.5,
			  style : "text-align: right;",
			  onclick : "on_sort",
			  sortDirection : "DESC"
			},
			{
			  content : 'Weight',
			  flex : 1.5,
			  style : "text-align: right;",
			  onclick : "on_sort",
			  sortDirection : "DESC"
			},
			{
			  content : 'Average',
			  flex : 1.5,
			  style : "text-align: right;",
			  onclick : "on_sort",
			  sortDirection : "DESC"
			} ]
		  },
		  {
			kind : "Scroller",
			flex : 1,
			components : [
			{
			  kind : enyo.VirtualRepeater,
			  name : "listPurchased",
			  onSetupRow : "loadPurchased",
			  onclick : "doSelect",
			  components : [
			  {
				kind : enyo.Item,
				style : "font-size:12px;",
				components : [
				{
				  layoutKind : enyo.HFlexLayout,
				  components : [
				  {
					name : "lblPurSeller",
					flex : 1.5,
					content : ""
				  },
				  {
					name : "lblPurHeads",
					flex : 1,
					content : "",
					style : "text-align: right;"
				  },
				  {
					name : "lblPurWeight",
					flex : 1.5,
					content : "",
					style : "text-align: right;"
				  },
				  {
					name : "lblPurAveWeight",
					flex : 1.5,
					content : "",
					style : "text-align: right;"
				  }, ]
				} ]
			  } ]
			} ]
		  },
		  {
			kind : "Toolbar",
			components : [
			{
			  kind : "RowGroup",
			  contentFit : true,
			  align : "center",
			  flex : .1,
			  style : "backgound-color:white;margin:0;",
			  components : [
			  {
				name : "lblPurSumHeads",
				kind : "VFlexBox",
				align : "center",
				allowHtml : true,
				style : "text-align:center;font-size: 0.75em;color:#999;",
				content : "",
			  }, ]
			},
			{
			  kind : "RowGroup",
			  contentFit : true,
			  align : "center",
			  flex : .1,
			  style : "backgound-color:white;margin:0",
			  components : [
			  {
				kind : "VFlexBox",
				name : "lblPurSumWeight",
				align : "center",
				allowHtml : true,
				style : "text-align:center;font-size: 0.75em;color:#999;",
				content : ""
			  }, ]
			},
			{
			  kind : "RowGroup",
			  contentFit : true,
			  align : "center",
			  flex : .1,
			  style : "backgound-color:white;margin:0",
			  components : [
			  {
				kind : "VFlexBox",
				name : "lblSumAveWeight",
				align : "center",
				allowHtml : true,
				style : "text-align:center;font-size: 0.75em;color:#999;",
				content : ""
			  }, ]
			} ]
		  }, ],
	  loadPurchased : function(inSender, inIndex) {
		var objData = null;
		if (objData = this.arrData[inIndex]) {
		  this.$.lblPurSeller.setContent(objData.sellerName);
		  this.$.lblPurHeads.setContent(objData.heads);
		  this.$.lblPurWeight.setContent(objData.weight);
		  this.$.lblPurAveWeight.setContent(objData.aveWeight);
		  return true;
		}
	  },
	  updateSummary : function() {
		var iFotHeads = crudInventory.getObjSummary().heads;
		var iFotWeight = crudInventory.getObjSummary().weight;

		this.$.lblPurSumHeads.setContent("Heads<br />"
			+ utils.formatNumberThousands(iFotHeads));
		this.$.lblPurSumWeight.setContent("Weight<br />"
			+ utils.formatNumberThousands(iFotWeight.toFixed(0)));
		var avg = iFotWeight / iFotHeads;
		if (iFotHeads > 0) {
		  this.$.lblSumAveWeight.setContent("Average<br />"
			  + utils.formatNumberThousands(avg.toFixed(1)));
		} else {
		  this.$.lblSumAveWeight.setContent("Average<br />0.0");
		}

	  },
	  updateView : function() {
		crudSeller.get(this, "loadCatalogs");
		crudRancher.get(this, "loadCatalogs");
		crudEnterpriseRancher.get(this, "loadCatalogs");
	  },
	  loadCatalogs : function() {
		this.readCounter++;
		if (this.readCounter == 3) {
		  this.readCounter = 0;
		  crudPurchase.get(this, "readCallBack");
		  crudHermana.get(this, "readCallBack");
		  crudInventory.get(this, "readCallBack");
		}
	  },
	  ready : function() {
		this.updateView();
	  },
	  readCounter : 0,
	  readCallBack : function() {
		this.readCounter++;
		if (this.readCounter == 3) {
		  this.readCounter = 0;
		  this.calculateInventory();
		  this.loadListContent();
		}
	  },
	  loadListContent : function() {
		// groups by sellerId into this.arrData
		var purchased = crudPurchase.arrObj;
		var imported = crudHermana.arrObj;
		var purchases = purchased.concat(imported);
		this.groupBySeller(purchases);
		this.arrData = this.formatList(this.arrData);
		this.$.listPurchased.render();
		this.updateSummary();
		this.doAferUpdatePurchase();
		this.doLoadCompleted();
	  },
	  calculateInventory : function(useFirstListItem) {
		// Add inventory record.
		if (!crudInventory.getDataLoaded() || !crudPurchase.getDataLoaded()
			|| !crudHermana.getDataLoaded()) {
		  var milis = ((Math.random() * 1000) + 500);
		  setTimeout(this.calculateInventory, milis);
		}

		var headsSummary = 0;
		if (crudInventory.getObjSummary().heads > 0) {
		  headsSummary = crudInventory.getObjSummary().heads
			  - crudPurchase.getObjSummary().heads
			  - crudHermana.getObjSummary().heads;
		}

		var weightSummary = 0;
		if (crudInventory.getObjSummary().weight > 0) {
		  weightSummary = crudInventory.getObjSummary().weight
			  - crudPurchase.getObjSummary().weight
			  - crudHermana.getObjSummary().weight;
		}

		var objInventory =
		{
		  sellerId : 0,
		  sellerName : 'Inv. ELLLC @ STT',
		  heads : headsSummary,
		  weight : weightSummary
		};

		if (useFirstListItem) {
		  this.arrData[0] = objInventory;
		} else {
		  this.arrData = [];
		  this.arrData.push(objInventory);
		}
	  },
	  groupBySeller : function(purchaseArray) {
		for ( var i = 0; i < purchaseArray.length; i++) {
		  var sellerId = '';
		  if (purchaseArray[i].entityName == 'Hermana') {
			sellerId = 'Rancher-' + purchaseArray[i].rancherId;
		  } else {
			sellerId = 'Seller-' + purchaseArray[i].sellerId;
		  }

		  if (!this.sellerIsSummarized(sellerId))
			this.arrData.push(this.sellerSummary(purchaseArray, sellerId));
		}
	  },
	  sellerSummary : function(purchaseArray, sellerId) {
		var heads = 0;
		var weight = 0;
		var sellerName = '';
		for ( var i = 0; i < purchaseArray.length; i++) {
		  var iSellerId = '';
		  var detailRecords = [];
		  var auxSellerName = '';
		  if (purchaseArray[i].entityName == 'Hermana') {
			iSellerId = 'Rancher-' + purchaseArray[i].rancherId;
			detailRecords = purchaseArray[i].HermanaCorte;
			auxSellerName = purchaseArray[i].seller;
		  } else {
			iSellerId = 'Seller-' + purchaseArray[i].sellerId;
			detailRecords = purchaseArray[i].PurchaseDetail;
			auxSellerName = crudSeller.getByID(purchaseArray[i].sellerId).sellerName;
		  }

		  if (iSellerId == sellerId) {
			heads += utils.parseToNumber(this
				.calculateTotalHeads(detailRecords));
			weight += utils.parseToNumber(this
				.calculateTotalWeight(detailRecords));
			sellerName = auxSellerName;
		  }
		}

		var objResult =
		{
		  sellerId : sellerId,
		  sellerName : sellerName,
		  heads : heads,
		  weight : weight
		};
		return objResult;
	  },
	  sellerIsSummarized : function(sellerId) {
		for ( var i = 0; i < this.arrData.length; i++) {
		  if (this.arrData[i].sellerId == sellerId)
			return true;
		}
		return false;
	  },
	  calculateTotalHeads : function(arrDetails) {
		if (arrDetails) {
		  var totalHeads = 0;
		  for ( var i = 0; i < arrDetails.length; i++) {
			totalHeads += utils.parseToNumber(arrDetails[i].heads);
		  }
		  return totalHeads;
		}
		return 0;
	  },
	  calculateTotalWeight : function(arrDetails) {
		if (arrDetails) {
		  var totalWeight = 0;
		  for ( var i = 0; i < arrDetails.length; i++) {
			totalWeight += utils.parseToNumber(arrDetails[i].weight);
		  }
		  return totalWeight;
		}
		return 0;
	  },
	  on_sort : function(inSender) {
		switch (inSender.content) {
		case "Vendor":
		  if (inSender.sortDirection == "ASC") {
			inSender.sortDirection = "DESC";
			this.arrData.sort(function(a, b) {
			  return a.sellerName < b.sellerName;
			});
		  } else {
			inSender.sortDirection = "ASC";
			this.arrData.sort(function(a, b) {
			  return a.sellerName > b.sellerName;
			});
		  }
		  break;
		case "Heads":
		  if (inSender.sortDirection == "ASC") {
			inSender.sortDirection = "DESC";
			this.arrData.sort(function(a, b) {
			  return utils.parseToNumber(a.heads) < utils
				  .parseToNumber(b.heads);
			});
		  } else {
			inSender.sortDirection = "ASC";
			this.arrData.sort(function(a, b) {
			  return utils.parseToNumber(a.heads) > utils
				  .parseToNumber(b.heads);
			});
		  }
		  break;
		case "Weight":
		  if (inSender.sortDirection == "ASC") {
			inSender.sortDirection = "DESC";
			this.arrData.sort(function(a, b) {
			  return utils.parseToNumber(a.weight) < utils
				  .parseToNumber(b.weight);
			});
		  } else {
			inSender.sortDirection = "ASC";
			this.arrData.sort(function(a, b) {
			  return utils.parseToNumber(a.weight) > utils
				  .parseToNumber(b.weight);
			});
		  }
		  break;
		case "Average":
		  if (inSender.sortDirection == "ASC") {
			inSender.sortDirection = "DESC";
			this.arrData.sort(function(a, b) {
			  return utils.parseToNumber(a.aveWeight) < utils
				  .parseToNumber(b.aveWeight);
			});
		  } else {
			inSender.sortDirection = "ASC";
			this.arrData.sort(function(a, b) {
			  return utils.parseToNumber(a.aveWeight) > utils
				  .parseToNumber(b.aveWeight);
			});
		  }
		  break;
		}
		this.$.listPurchased.render();
	  },
	  formatList : function(arrList) {
		var result = [];
		for ( var index = 0; index < arrList.length; index++) {
		  var objData = null;
		  if (objData = arrList[index]) {
			var obj =
			{
			  sellerId : objData.sellerId,
			  sellerName : objData.sellerName,
			  heads : utils.formatNumberThousands(objData.heads),
			  weight : utils.formatNumberThousands(Number(objData.weight)
				  .toFixed(0))
			};
			if (obj.heads <= 0) {
			  obj.aveWeight = "-";
			} else {
			  obj.aveWeight = utils
				  .formatNumberThousands((objData.weight / objData.heads)
					  .toFixed(1));
			}
			result.push(obj);
		  }
		}
		return result;
	  }
	});
