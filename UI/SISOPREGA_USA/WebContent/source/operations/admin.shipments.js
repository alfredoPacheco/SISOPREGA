enyo
	.kind(
	{
	  name : "admin.shipments",
	  kind : "VFlexBox",
	  className : "enyo-bg",
	  arrData : null,
	  objSelectedShipment : null,
	  events :
	  {
		onSelectedShipment : "",
		onDeleteShipProgrammed : "",
		onLoadCompleted : ""
	  },
	  components : [
		  {
			kind : "Toolbar",
			components : [
			{
			  kind : "VFlexBox",
			  content : "Shipments",
			  onclick : "doSelect",
			  flex : .3,
			  style : "color:white;font-size:15px;"
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
			  content : 'Scheduled Date',
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
			  style : "text-align: right;margin-right:13px;",
			  onclick : "on_sort",
			  sortDirection : "DESC"
			},
			{
			  content : '',
			  width : "34px;"
			} ]
		  },
		  {
			kind : "Scroller",
			flex : 1,
			name : "scroller",
			autoHorizontal: false, 
			horizontal: false,
			components : [
			{
			  kind : enyo.VirtualRepeater,
			  name : "listShipments",
			  onSetupRow : "loadShipments",
			  components : [
			  {
				kind : enyo.SwipeableItem,
				style : "font-size:12px;",
				confirmCaption : "Eliminar",
				onConfirm : "onDeleteShip",
				name : "rowItem",
				components : [
				{
				  layoutKind : enyo.HFlexLayout,
				  align : "center",
				  components : [
				  {
					name : "lblShipProgramDate",
					flex : 1.5,
					content : ""
				  },
				  {
					name : "lblShipHeads",
					flex : 1,
					content : "",
					style : "text-align: right;"
				  },
				  {
					name : "lblShipWeight",
					flex : 1.5,
					content : "",
					style : "text-align: right;"
				  },
				  {
					name : "lblShipAverage",
					flex : 1.5,
					content : "",
					style : "text-align: right;margin-right:10px;"
				  },
				  {
					kind : "Button",
					width : "26px",
					height : "24px",
					name : "btnRelease",
					caption : "-",
					style : "margin-right:0px;padding:0px;",
					onclick : "selectShipment"
				  }, ]
				},
				{
				  layoutKind : enyo.HFlexLayout,
				  components : [
				  {
					name : "lblShipClient",
					style : "font-size: 11px;color:#008B8B",
					content : ""
				  },
				  {
					name : "lblShipReleased",
					flex : 1,
					style : "color:gray;font-size:11px;text-align:right;",
					content : "Released",
					showing : false
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
				name : "lblShipSumHeads",
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
				name : "lblShipSumWeight",
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
				name : "lblShipSumAveWeight",
				align : "center",
				allowHtml : true,
				style : "text-align:center;font-size: 0.75em;color:#999;",
				content : ""
			  }, ]
			},

			]
		  }, ],
	  loadShipments : function(inSender, inIndex) {
		var objData;
		if (objData = this.arrData[inIndex]) {
		  this.$.lblShipProgramDate
			  .setContent(objData.dateTimeProgrammed.toLocaleDateString()
				  + " "
				  + objData.dateTimeProgrammed.toLocaleTimeString().substring(
					  0, 5));
		  this.$.lblShipHeads.setContent(utils
			  .formatNumberThousands(objData.totalHeads));
		  this.$.lblShipWeight.setContent(utils.formatNumberThousands(Number(
			  objData.totalWeight).toFixed(0)));
		  this.$.lblShipAverage.setContent(utils
			  .formatNumberThousands(objData.totalAvgWeight.toFixed(1)));
		  this.$.lblShipClient.setContent(objData.customer);
		  if (inIndex % 2 == 0)
			inSender.$.client.$.client
				.applyStyle("background-color", "#DFC699");
		  if (objData.hasOwnProperty("ShipmentRelease")) {
			this.$.btnRelease.hide();
			this.$.lblShipReleased.show();
			this.$.lblShipReleased.setContent("Released on "
				+ objData.ShipmentRelease[0].dateTime.toLocaleDateString()
				+ " "
				+ objData.ShipmentRelease[0].dateTime.toLocaleTimeString()
					.substring(0, 5));
			this.$.lblShipAverage.applyStyle("margin-right", "47px");
			this.$.rowItem.setSwipeable(false);
		  } else {
			this.$.lblShipReleased.hide();
			this.$.btnRelease.show();
			this.$.lblShipAverage.applyStyle("margin-right", "10px");
		  }
		  return true;
		} else {
		  return false;
		}
	  },
	  updateSummary : function() {
		var iHeads = 0;
		var iWeight = 0;
		var iAve = 0;

		for ( var j = 0; j < this.arrData.length; j++) {
		  iHeads += this.arrData[j].totalHeads;
		  iWeight += this.arrData[j].totalWeight;
		  iAve += this.arrData[j].totalAvgWeight;
		}

		this.$.lblShipSumHeads.setContent("Heads<br />"
			+ utils.formatNumberThousands(iHeads.toFixed(0)));
		this.$.lblShipSumWeight.setContent("Weight<br />"
			+ utils.formatNumberThousands(iWeight.toFixed(0)));
		var avg = null;
		if (avg = (iAve / this.arrData.length)) {
		  this.$.lblShipSumAveWeight.setContent("Average<br />"
			  + utils.formatNumberThousands(avg.toFixed(1)));
		} else {
		  this.$.lblShipSumAveWeight.setContent("Average<br />0.0");
		}
	  },
	  ready : function() {
		this.updateSummary();
		this.doLoadCompleted();
	  },
	  selectShipment : function(inSender, inEvent) {
		this.objSelectedShipment = this.arrData[inEvent.rowIndex];
		this.doSelectedShipment();
	  },
	  getSelectedShipment : function() {

		return crudShipment.getByID(this.objSelectedShipment.shipmentId);
	  },
	  moveToBottom : function() {
		this.$.scroller.scrollTo(this.$.scroller.getBoundaries().bottom, 0);
	  },
	  onDeleteShip : function(inSender, inIndex) {
		this.doDeleteShipProgrammed(this.arrData[inIndex]);
	  },
	  updateView : function() {
		crudShipment.get(this, "readCallBack");
	  },
	  readCounter : 0,
	  readCallBack : function() {
		this.readCounter++;
		if (this.readCounter == 1) {
		  this.readCounter = 0;
		  this.loadAutocompletes();
		}
	  },
	  loadAutocompletes : function() {
		this.arrSelectedItems = {};
		this.arrData = crudShipment.arrObj;
		this.$.listShipments.render();
		this.updateSummary();
	  },
	  on_sort : function(inSender) {
		switch (inSender.content) {
		case "Scheduled Date":
		  if (inSender.sortDirection == "ASC") {
			inSender.sortDirection = "DESC";
			this.arrData.sort(function(a, b) {
			  return new Date(b.dateTimeProgrammed) - new Date(a.dateTimeProgrammed);
			});
		  } else {
			inSender.sortDirection = "ASC";
			this.arrData.sort(function(a, b) {
			  return new Date(a.dateTimeProgrammed) - new Date(b.dateTimeProgrammed);
			});
		  }
		  break;
		case "Heads":
		  if (inSender.sortDirection == "ASC") {
			inSender.sortDirection = "DESC";
			this.arrData.sort(function(a, b) {
			  return utils.parseToNumber(b.totalHeads) - utils
				  .parseToNumber(a.totalHeads);
			});
		  } else {
			inSender.sortDirection = "ASC";
			this.arrData.sort(function(a, b) {
			  return utils.parseToNumber(a.totalHeads) - utils
				  .parseToNumber(b.totalHeads);
			});
		  }
		  break;
		case "Weight":
		  if (inSender.sortDirection == "ASC") {
			inSender.sortDirection = "DESC";
			this.arrData.sort(function(a, b) {
			  return utils.parseToNumber(b.totalWeight) - utils
				  .parseToNumber(a.totalWeight);
			});
		  } else {
			inSender.sortDirection = "ASC";
			this.arrData.sort(function(a, b) {
			  return utils.parseToNumber(a.totalWeight) - utils
				  .parseToNumber(b.totalWeight);
			});
		  }
		  break;
		case "Average":
		  if (inSender.sortDirection == "ASC") {
			inSender.sortDirection = "DESC";
			this.arrData.sort(function(a, b) {
			  return utils.parseToNumber(b.totalAvgWeight) - utils
				  .parseToNumber(a.totalAvgWeight);
			});
		  } else {
			inSender.sortDirection = "ASC";
			this.arrData.sort(function(a, b) {
			  return utils.parseToNumber(a.totalAvgWeight) - utils
				  .parseToNumber(b.totalAvgWeight);
			});
		  }
		  break;
		}
		this.$.listShipments.render();
	  }
	});