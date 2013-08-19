enyo
	.kind({
	    name : "admin.inventory",
	    kind : "VFlexBox",
	    className : "enyo-bg",
	    arrData : null,
	    events : {
		onSelect : "",
		onSale : "",
	    },
	    components : [
		    {
			kind : "Toolbar",
			components : [ {
			    kind : "VFlexBox",
			    content : "Inventario",
			    flex : .17,
			    onclick : "doSelect",
			    style : "padding:0px;color:white;font-size:15px;"
			}, {
			    kind : "Spacer",
			    flex : .05
			}, {
			    kind : "Button",
			    caption : "Vender",
			    onclick : "doSale"
			} ]
		    },
		    {// HEADER:
			kind : "HFlexBox",
			className : "listFirst",
			style : "font-size:13px;background-color:#DABD8B;border-bottom-style: solid;border-bottom-color: black;padding: 0px 10px;border-width: 1px;",
			height : "30px",
			align : "center",
			pack : "start",
			components : [ {
			    content : 'Tipo',
			    flex : 1.5
			}, {
			    content : 'Clase',
			    flex : 1
			}, {
			    content : 'Cabezas',
			    flex : 1,
			    style : "text-align: right;"
			}, {
			    content : 'Peso',
			    flex : 1,
			    style : "text-align: right;"
			}, {
			    content : 'Promedio',
			    flex : 1,
			    style : "text-align: right;"
			}, {
			    content : 'Alimento',
			    flex : .9,
			    style : "text-align: right;"
			}, ]
		    },
		    {
			kind : "Scroller",
			flex : 1,
			components : [ {
			    kind : enyo.VirtualRepeater,
			    name : "listInventory",
			    onSetupRow : "loadInventory",
			    components : [ {
				kind : enyo.Item,
				style : "font-size: 14px;",
				onclick : "doSelect",
				components : [
					{
					    layoutKind : enyo.HFlexLayout,
					    components : [ {
						name : "lblInvType",
						flex : 1.5,
						content : ""
					    }, {
						name : "lblInvClass",
						flex : 1,
						content : "Novillos"
					    }, {
						name : "lblInvHeads",
						flex : 1,
						content : "",
						style : "text-align: right;"
					    }, {
						name : "lblInvWeight",
						flex : 1,
						content : "",
						style : "text-align: right;"
					    }, {
						name : "lblInvInvAverage",
						flex : 1,
						content : "",
						style : "text-align: right;"
					    }, {
						name : "lblInvFeed",
						flex : .9,
						content : "",
						style : "text-align: right;"
					    }, ]
					},
					{
					    layoutKind : enyo.HFlexLayout,
					    components : [
						    {
							name : "lblInvBarnyards",
							style : "font-size: 0.85em;color:#008B8B;text-align:left;",
							flex : 1,
							content : ""
						    },
						    {
							name : "lblInvDescBuyer",
							allowHtml : true,
							style : "font-size: 0.85em;color:#008B8B;text-align:right;",
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
				    content : "Ending Inv.",
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
		var objData;
		if (objData = this.arrData[inIndex]) {
		    var len = objData.length;
		    var strBarnyards = "";
		    var totalHeads = 0;
		    var totalWeight = 0;
		    var totalFeed = 0;
		    var summaryBuyer = "";
		    for ( var i = 0; i < len; i++) {
			strBarnyards += "" + objData[i].barnyard + ", ";
			totalHeads += objData[i].heads;
			totalWeight += objData[i].weight;
			totalFeed += objData[i].feed.quantity;
			var sBuyer = "";
			for ( var j = 0; j < objData[i].buyers.length; j++) {
			    sBuyer += objData[i].buyers[j].name
				    + " ("
				    + objData[i].buyers[j].heads
				    + "/"
				    + (objData[i].avgweight * objData[i].buyers[j].heads)
					    .toFixed(2) + ")<br />";
			}
			summaryBuyer += sBuyer;
		    }

		    if (strBarnyards != "") {
			strBarnyards = strBarnyards.slice(0, -2);
		    }
		    if (summaryBuyer != "") {
			summaryBuyer = summaryBuyer.slice(0, -6);
		    }
		    var cattle_name = cacheClasses
			    .getByID(objData[0].cattleType);
		    if (cattle_name) {
			cattle_name = cattle_name.name;
		    } else {
			cattle_name = "";
		    }

		    this.$.lblInvType.setContent(cattle_name);
		    this.$.lblInvClass.setContent(objData[0].cattleName);
		    this.$.lblInvHeads.setContent(utils
			    .formatNumberThousands(totalHeads));
		    this.$.lblInvWeight.setContent(utils
			    .formatNumberThousands(totalWeight));
		    this.$.lblInvInvAverage.setContent(utils
			    .formatNumberThousands(totalWeight / totalHeads));
		    this.$.lblInvFeed.setContent(totalFeed);
		    this.$.lblInvBarnyards.setContent(strBarnyards);
		    this.$.lblInvDescBuyer.setContent(summaryBuyer);

		    if (inIndex % 2 == 0)
			inSender.$.client.$.client.applyStyle(
				"background-color", "#DFC699");
		    // if(inIndex % 2 ==
		    // 0)inSender.$.client.$.client.applyStyle("background-color","#DCC190");
		    return true;
		} else {
		    return false;
		}
	    },
	    updateSummary : function() {
		var iHeads = 0;
		var iSumWeight = 0;
		var iSumAve = 0;
		var iSumFeed = 0;
		var iSold = 0;
		var iSoldAve = 0;
		var iCount = 0;
		for ( var j = 0; j < this.arrData.length; j++) {
		    for ( var i = 0; i < this.arrData[j].length; i++) {
			iCount++;
			iHeads += this.arrData[j][i].heads;
			iSumWeight += this.arrData[j][i].weight;
			iSumAve += this.arrData[j][i].avgweight;
			iSumFeed += this.arrData[j][i].feed.quantity;
			for ( var b = 0; b < this.arrData[j][i].buyers.length; b++) {
			    iSold += this.arrData[j][i].buyers[b].heads;
			    iSoldAve += this.arrData[j][i].buyers[b].heads
				    * this.arrData[j][i].avgweight;
			}
		    }
		}
		iSumAve = iSumAve / iCount;
		this.$.lblInvSumHeadClass.setContent("Cabezas<br />"
			+ utils.formatNumberThousands(iHeads));
		this.$.lblInvSumWeight.setContent("Peso<br />"
			+ utils.formatNumberThousands(iSumWeight));
		this.$.lblInvSumAvgWeight.setContent("Peso Prom.<br />"
			+ utils.formatNumberThousands(iSumAve.toFixed(2)));
		this.$.lblInvSumFeed.setContent("Alimento<br />"
			+ utils.formatNumberThousands(iSumFeed.toFixed(2)));

		this.$.lblPurSumInvHeads.setContent("Cabezas<br />"
			+ utils.formatNumberThousands(iHeads - iSold));
		this.$.lblPurSumInvWeight.setContent("Peso<br />"
			+ utils.formatNumberThousands((iSumWeight - iSoldAve)
				.toFixed(2)));
		this.$.lblSumInvAveWight.setContent("Peso Prom.<br />"
			+ ((iSumWeight - iSoldAve) / (iHeads - iSold))
				.toFixed(2));
	    },
	    setListContent : function(arrInventory) {
		var result = [];

		// grouping data by cattle class

		var groupByType = {};

		for ( var i = 0; i < arrInventory.length; i++) {
		    if (!(arrInventory[i].cattleType in groupByType)) {
			groupByType[arrInventory[i].cattleType] = [];
		    }
		    groupByType[arrInventory[i].cattleType]
			    .push(arrInventory[i]);
		}

		// grouping data by cattle type
		var objInventory = {};
		var arrDetail = {};
		for (i in groupByType) {
		    if (groupByType.hasOwnProperty(i)) {
			for ( var j = 0; j < groupByType[i].length; j++) {
			    if (!(groupByType[i][j].cattleName in arrDetail)) {
				arrDetail[groupByType[i][j].cattleName] = [];
			    }
			    arrDetail[groupByType[i][j].cattleName]
				    .push(groupByType[i][j]);
			}
			objInventory[i] = arrDetail;
			arrDetail = {};
		    }
		}

		for (obj in objInventory) {
		    if (objInventory.hasOwnProperty(obj)) {
			for (cattle in objInventory[obj]) {
			    if (objInventory[obj].hasOwnProperty(cattle)) {
				result.push(objInventory[obj][cattle]);
			    }
			}
		    }
		}
		this.arrData = result;
		this.$.listInventory.render();
		this.updateSummary();
	    },
	    updateView : function() {
		crudInventory.get(this, "readCallBack");
	    },
	    ready : function() {
		this.updateView();
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
		this.setListContent(crudInventory.arrObj);
	    }
	});
