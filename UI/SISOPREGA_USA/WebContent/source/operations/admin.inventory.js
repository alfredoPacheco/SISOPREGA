enyo
	.kind(
	{
	  name : "admin.inventory",
	  kind : "VFlexBox",
	  className : "enyo-bg",
	  arrData : null,
	  todaySales : [],
	  groupMode : null,
	  currentSort : null,
	  currentSortDirection : null,
	  events :
	  {
		onSale : "",
		onLoadCompleted : "",
	  },
	  components : [
		  {
			kind : "Toolbar",
			components : [
				{
				  kind : "VFlexBox",
				  content : "Inventory",
				  flex : .17,
				  style : "padding:0px;color:white;font-size:15px;"
				},
				{
				  kind : "Spacer",
				  flex : .05
				},
				{
				  name : "cboGroupMode",
				  kind : "ListSelector",
				  style : "color:white",
				  contentPack : "end",
				  items : [ 'Ungroup', 'By Type, Quality', 'By Type',
					  'By Quality', 'By Pen' ],
				  flex : 1,
				  contentPack : "end",
				  onChange : "groupInventory",
				},
				{
				  kind : "Spacer",
				  flex : .05
				},
				{
				  kind : "Button",
				  caption : "Sale",
				  onclick : "doSale"
				} ]
		  },
		  {
			kind : "VFlexBox",
			className : "listFirst",
			style : "font-size:12px;background-color:#DABD8B;border-bottom-style: solid;border-bottom-color: black;padding: 0px 10px;border-width: 1px;",
			components : [
				{// HEADER:
				  kind : "HFlexBox",
				  className : "listFirst",
				  style : "font-size:12px;background-color:#DABD8B;padding: 0px 10px;",
				  height : "30px",
				  align : "center",
				  pack : "start",
				  components : [
				  {
					kind : "HFlexBox",
					flex : .8,
					align : "center",
					pack : "start",
					components : [
					{
					  content : 'Type',
					  onclick : "on_sort",
					  sortDirection : "DESC"
					},
					{
					  kind : "Image",
					  height : "15px",
					  name : "TypeSortImage",
					  src : ""
					} ]
				  },
				  {
					kind : "HFlexBox",
					flex : .8,
					align : "center",
					pack : "start",
					components : [
					{
					  content : 'Class',
					  onclick : "on_sort",
					  sortDirection : "DESC"
					},
					{
					  kind : "Image",
					  height : "15px",
					  name : "ClassSortImage",
					  src : ""
					} ]
				  },
				  {
					kind : "HFlexBox",
					flex : .5,
					align : "center",
					pack : "end",
					components : [
					{
					  content : 'Heads',
					  onclick : "on_sort",
					  sortDirection : "DESC",
					  style : "text-align:right;"
					},
					{
					  kind : "Image",
					  height : "15px",
					  name : "HeadsSortImage",
					  src : ""
					} ]
				  },
				  {
					kind : "HFlexBox",
					flex : 1,
					align : "center",
					pack : "end",
					components : [
					{
					  content : 'Weight',
					  onclick : "on_sort",
					  sortDirection : "DESC",
					  style : "text-align:right;"
					},
					{
					  kind : "Image",
					  height : "15px",
					  name : "WeightSortImage",
					  src : ""
					} ]
				  },
				  {
					kind : "HFlexBox",
					flex : 1,
					align : "center",
					pack : "end",
					components : [
					{
					  content : 'Average',
					  onclick : "on_sort",
					  sortDirection : "DESC",
					  style : "text-align:right;"
					},
					{
					  kind : "Image",
					  height : "15px",
					  name : "AverageSortImage",
					  src : ""
					} ]
				  },
				  {
					kind : "HFlexBox",
					flex : 1,
					align : "center",
					pack : "end",
					components : [
					{
					  content : 'Feed',
					  onclick : "on_sort",
					  sortDirection : "DESC",
					  style : "text-align:right;"
					},
					{
					  kind : "Image",
					  height : "15px",
					  name : "FeedSortImage",
					  src : ""
					} ]
				  }, ]
				},
				{
				  kind : "HFlexBox",
				  className : "listFirst",
				  style : "font-size:12px;background-color:#DABD8B;padding: 0px 10px;",
				  height : "35px",
				  align : "center",
				  pack : "start",
				  components : [
				  {
					kind : "HFlexBox",
					align : "center",
					pack : "start",
					components : [
					{
					  content : 'Pen',
					  onclick : "on_sort",
					  sortDirection : "DESC"
					},
					{
					  kind : "Image",
					  height : "15px",
					  name : "PenSortImage",
					  src : ""
					} ]
				  },
				  {
					kind : "HFlexBox",
					flex : 1,
					align : "center",
					pack : "end",
					components : [
					{
					  kind : "CheckBox",
					  name : "chkManualSort",
					  checked : false,
					  onclick : "chkManualSort_click"
					},
					{
					  content : "Manual Sort",
					  onclick : "on_sort",
					  sortDirection : "DESC"
					},
					{
					  kind : "Image",
					  height : "15px",
					  name : "ManualSortImage",
					  src : ""
					} ]

				  }, ]
				}, ]
		  },

		  {
			kind : "Scroller",
			flex : 1,
			name : "scrollerInventory",
			components : [
			{
			  kind : enyo.VirtualRepeater,
			  name : "listInventory",
			  onSetupRow : "loadInventory",
			  height : '100%',
			  components : [
			  {
				kind : enyo.Divider,
				name : "lblDivider"
			  },
			  {
				kind : enyo.Item,
				style : "font-size: 12px;",
				components : [
				{
				  layoutKind : enyo.HFlexLayout,
				  components : [
				  {
					name : "lblInvType",
					flex : .8,
					content : ""
				  },
				  {
					name : "lblInvClass",
					flex : .8,
					content : "Steers"
				  },
				  {
					name : "lblInvHeads",
					flex : .5,
					content : "",
					style : "text-align: right;"
				  },
				  {
					name : "lblInvWeight",
					flex : 1,
					content : "",
					style : "text-align: right;"
				  },
				  {
					name : "lblInvInvAverage",
					flex : 1,
					content : "",
					style : "text-align: right;"
				  },
				  {
					name : "lblInvFeed",
					flex : 1,
					content : "",
					style : "text-align: right;"
				  }, ]
				},
				{
				  layoutKind : enyo.HFlexLayout,
				  components : [
				  {
					name : "lblInvBarnyards",
					style : "font-size: 11px;color:#008B8B;text-align:left;",
					flex : 1,
					content : ""
				  },
				  {
					name : "lblInvDescBuyer",
					allowHtml : true,
					style : "font-size: 11px;color:#008B8B;text-align:right;",
					flex : 1,
					content : ""
				  } ]
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
				name : "lblInvSumHeadClass",
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
				name : "lblInvSumWeight",
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
				name : "lblInvSumAvgWeight",
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
				name : "lblInvSumFeed",
				align : "center",
				allowHtml : true,
				style : "text-align:center;font-size: 0.75em;color:#999;",
				content : ""
			  }, ]
			}, ]
		  },
		  {
			kind : "Toolbar",
			components : [
			{
			  kind : "VFlexBox",
			  content : "Final Inventory",
			  flex : 1.5,
			  style : "color:white;margin:0;font-size:15px;"
			},
			{
			  kind : "RowGroup",
			  flex : 1,
			  style : "margin:0px;",
			  components : [
			  {
				kind : "VFlexBox",
				name : "lblPurSumInvHeads",
				allowHtml : true,
				style : "text-align:center;font-size: 0.7em;color:#999;",
				align : "center",
				content : "",
			  }, ]
			},
			{
			  kind : "RowGroup",
			  flex : 1,
			  style : "margin:0px;",
			  components : [
			  {
				kind : "VFlexBox",
				name : "lblPurSumInvWeight",
				allowHtml : true,
				style : "text-align:center;font-size: 0.7em;color:#999",
				align : "center",
				content : ""
			  }, ]
			},
			{
			  kind : "RowGroup",
			  layoutKind : enyo.VFlexLayout,
			  flex : 1,
			  style : "margin:0px;",
			  components : [
			  {
				kind : "VFlexBox",
				name : "lblSumInvAveWight",
				allowHtml : true,
				style : "text-align:center;font-size: 0.7em;color:#999",
				align : "center",
				content : ""
			  }, ]
			} ]
		  }, ],
	  loadInventory : function(inSender, inIndex) {
		if (this.groupMode == "Ungroup")
		  this.$.lblDivider.hide();
		var objData;
		if (objData = this.arrData[inIndex]) {
		  this.$.lblDivider.setCaption(objData.division);
		  this.$.lblInvDescBuyer.setContent(objData.strSales);
		  this.$.lblInvType.setContent(objData.cattle_name);
		  this.$.lblInvClass.setContent(objData.quality_name);
		  this.$.lblInvHeads.setContent(objData.totalHeads);
		  this.$.lblInvWeight.setContent(objData.totalWeight);
		  this.$.lblInvInvAverage.setContent(objData.totalAveWeight);
		  this.$.lblInvFeed.setContent(objData.totalFeed);
		  this.$.lblInvBarnyards.setContent(objData.strBarnyards);

		  if (inIndex % 2 == 0) {
			inSender.$.client.$.client
				.applyStyle("background-color", "#DFC699");
		  } else {
			inSender.$.client.$.client
				.applyStyle("background-color", "#DABD8B");
		  }

		  return true;
		} else {
		  return false;
		}
	  },
	  updateSummary : function() {
		var iHeads = crudInventory.getObjSummary().heads;
		var iSumWeight = crudInventory.getObjSummary().weight;
		var iSumAve = iSumWeight / iHeads;
		var iSumFeed = crudInventory.getObjSummary().feed;
		var objSalesSummary = crudSale.getSummary();
		var iSold = objSalesSummary.iHeads;
		var iSoldWeight = objSalesSummary.iWeight;

		this.$.lblInvSumHeadClass.setContent("Heads<br />"
			+ utils.formatNumberThousands(iHeads));
		this.$.lblInvSumWeight.setContent("Weight<br />"
			+ utils.formatNumberThousands(Number(iSumWeight).toFixed(0)));
		this.$.lblInvSumAvgWeight.setContent("Average<br />"
			+ utils.formatNumberThousands(iSumAve.toFixed(1)));
		this.$.lblInvSumFeed.setContent("Feed<br />"
			+ utils.formatNumberThousands(iSumFeed.toFixed(1)));

		this.$.lblPurSumInvHeads.setContent("Heads<br />"
			+ utils.formatNumberThousands(iHeads - iSold));
		this.$.lblPurSumInvWeight.setContent("Weight<br />"
			+ utils
				.formatNumberThousands((iSumWeight - iSoldWeight).toFixed(0)));
		this.$.lblSumInvAveWight
			.setContent("Average<br />"
				+ utils
					.formatNumberThousands(((iSumWeight - iSoldWeight) / (iHeads - iSold))
						.toFixed(1)));
	  },
	  setListContent : function(arrInventory) {

		switch (this.groupMode) {
		case 'Ungroup':
		  this.arrData = this.ungroup(arrInventory);
		  break;
		case 'By Type, Quality':
		  this.arrData = this.groupByTypeAndQuality(arrInventory);
		  break;
		case 'By Type':
		  this.arrData = this.groupByType(arrInventory);
		  break;
		case 'By Quality':
		  this.arrData = this.groupByQuality(arrInventory);
		  break;
		case "By Pen":
		  this.arrData = this.groupByPen(arrInventory);
		  break;
		}

		this.sortList(this.currentSort);
	  },
	  ready : function() {
		this.currentSort = utils.getCookie("InventoryColumnSort");
		if (this.currentSort == null) {
		  this.currentSort = "Manual Sort";
		  utils.setCookie("InventoryColumnSort", "Manual Sort", 365);
		}
		this.groupMode = utils.getCookie("InventoryGroupMode");
		if (this.groupMode == null) {
		  this.groupMode = "Ungroup";
		  utils.setCookie("InventoryGroupMode", "Ungroup", 365);
		}
		this.$.cboGroupMode.setValue(this.groupMode);
		this.currentSortDirection = utils.getCookie("InventorySortDirection");
		if (this.currentSortDirection == null) {
		  this.currentSortDirection = "ASC";
		  utils.setCookie("InventorySortDirection", "ASC", 365);
		}
		// this.updateView();
	  },
	  updateView : function() {
		crudInventory.get(this, "readCallBack");
	  },
	  readCounter : 0,
	  readCallBack : function() {
		this.readCounter++;
		if (this.readCounter == 1) {
		  this.readCounter = 0;
		  this.loadAutocompletes();
		  this.doLoadCompleted();
		}
	  },
	  loadAutocompletes : function() {
		this.todaySales = crudSale.getTodaySales();
		this.setListContent(crudInventory.arrObj);

		this.refreshList();
	  },
	  refreshList : function() {
		var isSortabled = this.$.chkManualSort.getChecked();
		if (isSortabled)
		  this.removeListSortable();

		this.$.listInventory.render();
		this.updateSummary();
		this.$.scrollerInventory.scrollTo(0);
		if (isSortabled)
		  this.makeListSortable();
	  },
	  getSalesByInventoryID : function(iInventoryID) {
		var result = [];
		for ( var i = 0; i < this.todaySales.length; i++) {
		  if (this.todaySales[i].SaleDetail) {
			var sale = this.todaySales[i];
			for ( var j = 0; j < sale.SaleDetail.length; j++) {
			  var detail = sale.SaleDetail[j];
			  if (utils.parseToNumber(detail.inventoryId) == utils
				  .parseToNumber(iInventoryID)) {
				var obj =
				{
				  customer : sale.customer,
				  saleDate : sale.saleDate,
				  heads : sale.SaleDetail[j].heads,
				  weight : sale.SaleDetail[j].weight
				};
				result.push(obj);
			  }
			}
		  }
		}
		return result;
	  },
	  on_sort : function(inSender) {
		if (this.currentSortDirection == "ASC") {
		  this.currentSortDirection = "DESC";
		} else {
		  this.currentSortDirection = "ASC";
		}
		this.sortList(inSender.content);
		this.refreshList();
	  },
	  clearSortImage:function(){
		this.$.TypeSortImage.setSrc("");
		this.$.ClassSortImage.setSrc("");
		this.$.HeadsSortImage.setSrc("");
		this.$.WeightSortImage.setSrc("");
		this.$.AverageSortImage.setSrc("");
		this.$.FeedSortImage.setSrc("");
		this.$.PenSortImage.setSrc("");
		this.$.ManualSortImage.setSrc("");
	  },
	  sortList : function(sSortBy) {
		this.clearSortImage();
		switch (sSortBy) {
		case "Manual Sort":
		  if (this.currentSortDirection == "DESC") {
			this.$.ManualSortImage.setSrc("../SISOPREGA_WEB_LIB/images/up.png");
			this.arrData.sort(function(a, b) {
			  var x = a.inventorySort.sortSequence;
			  var y = b.inventorySort.sortSequence;
			  return ((x < y) ? 1 : ((x > y) ? -1 : 0));
			});
		  } else {
			this.$.ManualSortImage
				.setSrc("../SISOPREGA_WEB_LIB/images/down.png");
			this.arrData.sort(function(a, b) {
			  var x = a.inventorySort.sortSequence;
			  var y = b.inventorySort.sortSequence;
			  return ((x < y) ? -1 : ((x > y) ? 1 : 0));
			});
		  }
		  break;
		case "Pen":
		  if (this.currentSortDirection == "DESC") {
			this.$.PenSortImage.setSrc("../SISOPREGA_WEB_LIB/images/up.png");
			this.arrData.sort(function(a, b) {
			  var x = a.strBarnyards;
			  var y = b.strBarnyards;
			  return ((x < y) ? 1 : ((x > y) ? -1 : 0));
			});
		  } else {
			this.$.PenSortImage.setSrc("../SISOPREGA_WEB_LIB/images/down.png");
			this.arrData.sort(function(a, b) {
			  var x = a.strBarnyards;
			  var y = b.strBarnyards;
			  return ((x < y) ? -1 : ((x > y) ? 1 : 0));
			});
		  }
		  break;
		case "Type":
		  if (this.currentSortDirection == "DESC") {
			this.$.TypeSortImage.setSrc("../SISOPREGA_WEB_LIB/images/up.png");
			this.arrData.sort(function(a, b) {
			  var x = a.cattle_name;
			  var y = b.cattle_name;
			  return ((x < y) ? 1 : ((x > y) ? -1 : 0));
			});
		  } else {
			this.$.TypeSortImage.setSrc("../SISOPREGA_WEB_LIB/images/down.png");
			this.arrData.sort(function(a, b) {
			  var x = a.cattle_name;
			  var y = b.cattle_name;
			  return ((x < y) ? -1 : ((x > y) ? 1 : 0));
			});
		  }
		  break;
		case "Class":
		  if (this.currentSortDirection == "DESC") {
			this.$.ClassSortImage.setSrc("../SISOPREGA_WEB_LIB/images/up.png");
			this.arrData.sort(function(a, b) {
			  var x = a.quality_name;
			  var y = b.quality_name;
			  return ((x < y) ? 1 : ((x > y) ? -1 : 0));
			});
		  } else {
			this.$.ClassSortImage
				.setSrc("../SISOPREGA_WEB_LIB/images/down.png");
			this.arrData.sort(function(a, b) {
			  var x = a.quality_name;
			  var y = b.quality_name;
			  return ((x < y) ? -1 : ((x > y) ? 1 : 0));
			});
		  }
		  break;
		case "Heads":
		  if (this.currentSortDirection == "DESC") {
			this.$.HeadsSortImage.setSrc("../SISOPREGA_WEB_LIB/images/up.png");
			this.arrData.sort(function(a, b) {
			  return utils.parseToNumber(b.totalHeads)
				  - utils.parseToNumber(a.totalHeads);
			});
		  } else {
			this.$.HeadsSortImage
				.setSrc("../SISOPREGA_WEB_LIB/images/down.png");
			this.arrData.sort(function(a, b) {
			  return utils.parseToNumber(a.totalHeads)
				  - utils.parseToNumber(b.totalHeads);
			});
		  }
		  break;
		case "Weight":
		  if (this.currentSortDirection == "DESC") {
			this.$.WeightSortImage.setSrc("../SISOPREGA_WEB_LIB/images/up.png");
			this.arrData.sort(function(a, b) {
			  return utils.parseToNumber(b.totalWeight)
				  - utils.parseToNumber(a.totalWeight);
			});
		  } else {
			this.$.WeightSortImage
				.setSrc("../SISOPREGA_WEB_LIB/images/down.png");
			this.arrData.sort(function(a, b) {
			  return utils.parseToNumber(a.totalWeight)
				  - utils.parseToNumber(b.totalWeight);
			});
		  }
		  break;
		case "Average":
		  if (this.currentSortDirection == "DESC") {
			this.$.AverageSortImage
				.setSrc("../SISOPREGA_WEB_LIB/images/up.png");
			this.arrData.sort(function(a, b) {
			  return utils.parseToNumber(b.totalAveWeight)
				  - utils.parseToNumber(a.totalAveWeight);
			});
		  } else {
			this.$.AverageSortImage
				.setSrc("../SISOPREGA_WEB_LIB/images/down.png");
			this.arrData.sort(function(a, b) {
			  return utils.parseToNumber(a.totalAveWeight)
				  - utils.parseToNumber(b.totalAveWeight);
			});
		  }
		  break;
		case "Feed":
		  if (this.currentSortDirection == "DESC") {
			this.$.FeedSortImage.setSrc("../SISOPREGA_WEB_LIB/images/up.png");
			this.arrData.sort(function(a, b) {
			  return utils.parseToNumber(b.totalFeed)
				  - utils.parseToNumber(a.totalFeed);
			});
		  } else {
			this.$.FeedSortImage.setSrc("../SISOPREGA_WEB_LIB/images/down.png");
			this.arrData.sort(function(a, b) {
			  return utils.parseToNumber(a.totalFeed)
				  - utils.parseToNumber(b.totalFeed);
			});
		  }
		  break;
		}
		this.currentSort = sSortBy;
		utils.setCookie("InventoryColumnSort", sSortBy, 365);
		utils.setCookie("InventorySortDirection", this.currentSortDirection,
			365);
	  },
	  groupByTypeAndQuality : function(arrList) {
		var resultGroup = [];

		// grouping data by cattle class and quality
		var groupByTypeQuality = {};

		for ( var i = 0; i < arrList.length; i++) {
		  var groupName = arrList[i].cattypeId + '-' + arrList[i].qualityId;
		  if (!(groupName in groupByTypeQuality)) {
			groupByTypeQuality[groupName] = [];
		  }
		  groupByTypeQuality[groupName].push(arrList[i]);
		}

		for (obj in groupByTypeQuality) {
		  if (groupByTypeQuality.hasOwnProperty(obj)) {
			resultGroup.push(groupByTypeQuality[obj]);
		  }
		}

		var result = [];
		for ( var index = 0; index < resultGroup.length; index++) {
		  var objData;
		  if (objData = resultGroup[index]) {
			var len = objData.length;
			var strBarnyards = "";
			var totalHeads = 0;
			var totalWeight = 0;
			var totalFeed = 0;

			var strSales = "";
			for ( var i = 0; i < len; i++) {
			  crudInventory.getInventorySortByClassification(objData[i],
				  this.groupMode);

			  strBarnyards += ""
				  + crudPen.adapterToList(objData[i].pen).caption + ", ";
			  totalHeads += utils.parseToNumber(objData[i].heads);
			  totalWeight += utils.parseToNumber(objData[i].weight);
			  totalFeed += utils.parseToNumber(objData[i].feed);

			  var salesByInventory = this
				  .getSalesByInventoryID(objData[i].inventoryId);
			  for ( var j = 0; j < salesByInventory.length; j++) {
				var sale = salesByInventory[j];
				strSales += "" + sale.saleDate.toLocaleDateString() + " "
					+ sale.customer + " " + sale.heads + "/"
					+ Number(sale.weight).toFixed(0) + "<br />";
			  }
			}

			if (strBarnyards != "") {
			  strBarnyards = strBarnyards.slice(0, -2);
			}

			var obj =
			{
			  division : objData[0].cattle_name + ", "
				  + objData[0].quality_name,
			  strSales : strSales,
			  cattle_name : objData[0].cattle_name,
			  quality_name : objData[0].quality_name,
			  totalHeads : utils.formatNumberThousands(totalHeads),
			  totalWeight : utils.formatNumberThousands(Number(totalWeight)
				  .toFixed(0)),
			  totalAveWeight : utils
				  .formatNumberThousands((totalWeight / totalHeads).toFixed(1)),
			  totalFeed : utils.formatNumberThousands(Number(totalFeed)
				  .toFixed(0)),
			  strBarnyards : utils.removeDuplicates(strBarnyards.split(","))
				  .join(","),
			  inventorySort : crudInventory.getInventorySortByClassification(
				  objData[0], this.groupMode),
			  qualityId : objData[0].qualityId,
			  cattypeId : objData[0].cattypeId
			};
			result.push(obj);

		  }
		}
		return result;
	  },
	  groupByType : function(arrList) {
		var resultGroup = [];

		// grouping data by cattle class
		var groupByType = {};

		for ( var i = 0; i < arrList.length; i++) {
		  var groupName = arrList[i].cattypeId;
		  if (!(groupName in groupByType)) {
			groupByType[groupName] = [];
		  }
		  groupByType[groupName].push(arrList[i]);
		}

		for (obj in groupByType) {
		  if (groupByType.hasOwnProperty(obj)) {
			resultGroup.push(groupByType[obj]);
		  }
		}

		var result = [];
		for ( var index = 0; index < resultGroup.length; index++) {

		  var objData;
		  if (objData = resultGroup[index]) {

			var len = objData.length;
			var strBarnyards = "";
			var totalHeads = 0;
			var totalWeight = 0;
			var totalFeed = 0;
			var strSales = "";
			var strQualities = "";

			for ( var i = 0; i < len; i++) {
			  crudInventory.getInventorySortByClassification(objData[i],
				  this.groupMode);
			  strBarnyards += ""
				  + crudPen.adapterToList(objData[i].pen).caption + ", ";
			  strQualities += objData[i].quality_name + ", ";
			  totalHeads += utils.parseToNumber(objData[i].heads);
			  totalWeight += utils.parseToNumber(objData[i].weight);
			  totalFeed += utils.parseToNumber(objData[i].feed);

			  var salesByInventory = this
				  .getSalesByInventoryID(objData[i].inventoryId);
			  for ( var j = 0; j < salesByInventory.length; j++) {
				var sale = salesByInventory[j];
				strSales += "" + sale.saleDate.toLocaleDateString() + " "
					+ sale.customer + " " + sale.heads + "/"
					+ Number(sale.weight).toFixed(0) + "<br />";
			  }
			}

			if (strBarnyards != "") {
			  strBarnyards = strBarnyards.slice(0, -2);
			}

			if (strQualities != "") {
			  strQualities = strQualities.slice(0, -2);
			}

			var obj =
			{
			  division : objData[0].cattle_name,
			  strSales : strSales,
			  cattle_name : objData[0].cattle_name,
			  quality_name : utils.removeDuplicates(strQualities.split(","))
				  .join(", "),
			  totalHeads : utils.formatNumberThousands(totalHeads),
			  totalWeight : utils.formatNumberThousands(Number(totalWeight)
				  .toFixed(0)),
			  totalAveWeight : utils
				  .formatNumberThousands((totalWeight / totalHeads).toFixed(1)),
			  totalFeed : utils.formatNumberThousands(Number(totalFeed)
				  .toFixed(0)),
			  strBarnyards : utils.removeDuplicates(strBarnyards.split(","))
				  .join(", "),
			  inventorySort : crudInventory.getInventorySortByClassification(
				  objData[0], this.groupMode),
			  cattypeId : objData[0].cattypeId
			};
			result.push(obj);

		  }
		}
		return result;
	  },
	  groupByQuality : function(arrList) {
		var resultGroup = [];

		// grouping data by cattle quality
		var groupByQuality = {};

		for ( var i = 0; i < arrList.length; i++) {
		  var groupName = arrList[i].qualityId;
		  if (!(groupName in groupByQuality)) {
			groupByQuality[groupName] = [];
		  }
		  groupByQuality[groupName].push(arrList[i]);
		}

		for (obj in groupByQuality) {
		  if (groupByQuality.hasOwnProperty(obj)) {
			resultGroup.push(groupByQuality[obj]);
		  }
		}

		var result = [];
		for ( var index = 0; index < resultGroup.length; index++) {

		  var objData;
		  if (objData = resultGroup[index]) {

			var len = objData.length;
			var strBarnyards = "";
			var totalHeads = 0;
			var totalWeight = 0;
			var totalFeed = 0;
			var strSales = "";
			var strTypes = "";

			for ( var i = 0; i < len; i++) {
			  crudInventory.getInventorySortByClassification(objData[i],
				  this.groupMode);
			  strBarnyards += ""
				  + crudPen.adapterToList(objData[i].pen).caption + ", ";
			  strTypes += objData[i].cattle_name + ", ";
			  totalHeads += utils.parseToNumber(objData[i].heads);
			  totalWeight += utils.parseToNumber(objData[i].weight);
			  totalFeed += utils.parseToNumber(objData[i].feed);

			  var salesByInventory = this
				  .getSalesByInventoryID(objData[i].inventoryId);
			  for ( var j = 0; j < salesByInventory.length; j++) {
				var sale = salesByInventory[j];
				strSales += "" + sale.saleDate.toLocaleDateString() + " "
					+ sale.customer + " " + sale.heads + "/"
					+ Number(sale.weight).toFixed(0) + "<br />";
			  }
			}

			if (strBarnyards != "") {
			  strBarnyards = strBarnyards.slice(0, -2);
			}

			if (strTypes != "") {
			  strTypes = strTypes.slice(0, -2);
			}

			var obj =
			{
			  division : objData[0].quality_name,
			  strSales : strSales,
			  cattle_name : utils.removeDuplicates(strTypes.split(",")).join(
				  ", "),
			  quality_name : objData[0].quality_name,
			  totalHeads : utils.formatNumberThousands(totalHeads),
			  totalWeight : utils.formatNumberThousands(Number(totalWeight)
				  .toFixed(0)),
			  totalAveWeight : utils
				  .formatNumberThousands((totalWeight / totalHeads).toFixed(1)),
			  totalFeed : utils.formatNumberThousands(Number(totalFeed)
				  .toFixed(0)),
			  strBarnyards : utils.removeDuplicates(strBarnyards.split(","))
				  .join(", "),
			  inventorySort : crudInventory.getInventorySortByClassification(
				  objData[0], this.groupMode),
			  qualityId : objData[0].qualityId
			};
			result.push(obj);

		  }
		}
		return result;
	  },
	  groupByPen : function(arrList) {
		var resultGroup = [];

		// grouping data by cattle quality
		var groupByPen = {};

		for ( var i = 0; i < arrList.length; i++) {
		  var groupName = arrList[i].penId;
		  if (!(groupName in groupByPen)) {
			groupByPen[groupName] = [];
		  }
		  groupByPen[groupName].push(arrList[i]);
		}

		for (obj in groupByPen) {
		  if (groupByPen.hasOwnProperty(obj)) {
			resultGroup.push(groupByPen[obj]);
		  }
		}

		var result = [];
		for ( var index = 0; index < resultGroup.length; index++) {

		  var objData;
		  if (objData = resultGroup[index]) {

			var len = objData.length;
			var totalHeads = 0;
			var totalWeight = 0;
			var totalFeed = 0;
			var strSales = "";
			var strTypes = "";
			var strQualities = "";

			for ( var i = 0; i < len; i++) {
			  crudInventory.getInventorySortByClassification(objData[i],
				  this.groupMode);
			  strTypes += objData[i].cattle_name + ", ";
			  strQualities += objData[i].quality_name + ", ";
			  totalHeads += utils.parseToNumber(objData[i].heads);
			  totalWeight += utils.parseToNumber(objData[i].weight);
			  totalFeed += utils.parseToNumber(objData[i].feed);

			  var salesByInventory = this
				  .getSalesByInventoryID(objData[i].inventoryId);
			  for ( var j = 0; j < salesByInventory.length; j++) {
				var sale = salesByInventory[j];
				strSales += "" + sale.saleDate.toLocaleDateString() + " "
					+ sale.customer + " " + sale.heads + "/"
					+ Number(sale.weight).toFixed(0) + "<br />";
			  }
			}

			if (strTypes != "") {
			  strTypes = strTypes.slice(0, -2);
			}

			if (strQualities != "") {
			  strQualities = strQualities.slice(0, -2);
			}

			var obj =
			{
			  division : crudPen.adapterToList(objData[0].pen).caption,
			  strSales : strSales,
			  cattle_name : utils.removeDuplicates(strTypes.split(",")).join(
				  ", "),
			  quality_name : utils.removeDuplicates(strQualities.split(","))
				  .join(", "),
			  totalHeads : utils.formatNumberThousands(totalHeads),
			  totalWeight : utils.formatNumberThousands(Number(totalWeight)
				  .toFixed(0)),
			  totalAveWeight : utils
				  .formatNumberThousands((totalWeight / totalHeads).toFixed(1)),
			  totalFeed : utils.formatNumberThousands(Number(totalFeed)
				  .toFixed(0)),
			  strBarnyards : crudPen.adapterToList(objData[0].pen).caption,
			  inventorySort : crudInventory.getInventorySortByClassification(
				  objData[0], this.groupMode),
			  penId : objData[0].penId
			};
			result.push(obj);

		  }
		}
		return result;
	  },
	  ungroup : function(arrList) {
		var resultGroup = arrList;

		var result = [];
		for ( var index = 0; index < resultGroup.length; index++) {

		  var objData;
		  if (objData = resultGroup[index]) {

			var totalHeads = 0;
			var totalWeight = 0;
			var totalFeed = 0;
			var strSales = "";
			var strTypes = "";
			var strQualities = "";

			strTypes = objData.cattle_name;
			strQualities = objData.quality_name;
			totalHeads = utils.parseToNumber(objData.heads);
			totalWeight = utils.parseToNumber(objData.weight);
			totalFeed = utils.parseToNumber(objData.feed);

			var salesByInventory = this
				.getSalesByInventoryID(objData.inventoryId);
			for ( var j = 0; j < salesByInventory.length; j++) {
			  var sale = salesByInventory[j];
			  strSales += "" + sale.saleDate.toLocaleDateString() + " "
				  + sale.customer + " " + sale.heads + "/"
				  + Number(sale.weight).toFixed(0) + "<br />";
			}

			var obj =
			{
			  inventoryId : objData.inventoryId,
			  division : '',
			  strSales : strSales,
			  cattle_name : strTypes,
			  quality_name : strQualities,
			  totalHeads : utils.formatNumberThousands(totalHeads),
			  totalWeight : utils.formatNumberThousands(Number(totalWeight)
				  .toFixed(0)),
			  totalAveWeight : utils
				  .formatNumberThousands((totalWeight / totalHeads).toFixed(1)),
			  totalFeed : utils.formatNumberThousands(Number(totalFeed)
				  .toFixed(0)),
			  strBarnyards : crudPen.adapterToList(objData.pen).caption,
			  inventorySort : crudInventory.getInventorySortByClassification(
				  objData, this.groupMode)
			};
			result.push(obj);
		  }
		}
		return result;
	  },
	  chkManualSort_click : function(inSender, inEvent) {
		if (inSender.checked) {
		  this.makeListSortable();
		} else {
		  this.currentSort = "Manual Sort";
		  this.currentSortDirection = "ASC";
		  utils.setCookie("InventoryColumnSort", "Manual Sort", 365);
		  utils.setCookie("InventorySortDirection", "ASC", 365);

		  this.persistInventorySort();
		  this.removeListSortable();
		  this.setListContent(crudInventory.arrObj);
		  this.refreshList();
		}
	  },
	  makeListSortable : function() {
		this.$.scrollerInventory.setVertical(false);
		var self = this;
		jQuery(jQuery("#" + this.$.listInventory.getId()).children()[0]).css(
			'height', '100%').css('overflow-y', 'auto').sortable(
			{
			  scroll : true,
			  scrollSensitivity : 50,
			  stop : function(event, ui) {
				self.clearSortImage();
				self.$.ManualSortImage
					.setSrc("../SISOPREGA_WEB_LIB/images/down.png");
				self.currentSort = "Manual Sort";
				self.currentSortDirection = "ASC";
				utils.setCookie("InventoryColumnSort", "Manual Sort", 365);
				utils.setCookie("InventorySortDirection", "ASC", 365);
			  }
			});
	  },
	  removeListSortable : function() {
		jQuery(jQuery("#" + this.$.listInventory.getId()).children()[0]).css(
			'height', '').css('overflow-y', '').sortable("destroy");
		this.$.scrollerInventory.setVertical(true);
	  },
	  groupInventory : function(inSender, inValue, inOldValue) {
		this.groupMode = inValue;
		utils.setCookie("InventoryGroupMode", inValue, 365);
		this.setListContent(crudInventory.arrObj);
		this.refreshList();
	  },
	  getFieldByGroupMode : function() {
		var sField = '';
		switch (this.groupMode) {
		case 'Ungroup':
		  sField = "inventoryId";
		  break;
		case 'By Type, Quality':
		  sField = "typeAndQuality";
		  break;
		case 'By Type':
		  sField = "cattypeId";
		  break;
		case 'By Quality':
		  sField = "qualityId";
		  break;
		case "By Pen":
		  sField = "penId";
		  break;
		}
		return sField;
	  },
	  persistInventorySort : function() {
		var self = this;
		var sField = this.getFieldByGroupMode();
		jQuery(jQuery("#" + this.$.listInventory.getId()).children()[0])
			.children().each(
				function(index, b) {
				  for ( var i = 0; i < crudInventory.arrObj.length; i++) {
					var current = crudInventory.arrObj[i];
					if (sField != 'typeAndQuality') {
					  if (current[sField] == self.arrData[jQuery(b).attr(
						  "rowindex")][sField]) {
						var oInventorySort = crudInventory
							.getInventorySortByClassification(current,
								self.groupMode);
						oInventorySort.sortSequence = index;
					  }
					} else {
					  if (current.qualityId == self.arrData[jQuery(b).attr(
						  "rowindex")].qualityId) {
						if (current.cattypeId == self.arrData[jQuery(b).attr(
							"rowindex")].cattypeId) {
						  var oInventorySort = crudInventory
							  .getInventorySortByClassification(current,
								  self.groupMode);
						  oInventorySort.sortSequence = index;
						}
					  }
					}
				  }
				});
		for(var i=0;i<crudInventory.arrObj.length;i++){
		  crudInventory.arrObj[i].sorting = true;
		}
		crudInventory.save(crudInventory.arrObj,this,"afterPersistSort");
	  },
	  afterPersistSort:function(){
		for(var i=0;i<crudInventory.arrObj.length;i++){
		  delete crudInventory.arrObj[i].sorting;
		}
	  }
	});
