enyo
	.kind({
	    name : "admin.inventory",
	    kind : "VFlexBox",
	    className : "enyo-bg",
	    events : {
		onSelect : ""
	    },
	    components : [
		    {
			kind : enyo.Popup,
			name : "popup_sales",
			width : "85%;",
			height : "85%;",
			dismissWithClick : true,
			// showHideMode : "transition",
			// openClassName : "zoomFadeIn",
			// className : "transitioner2",
			layoutKind : "VFlexLayout",
			style : "overflow: hidden;border-width: 8px;",
			scrim : true,
			components : [ {
			    kind : "sales",
			    name : "sales_kind",
			    flex : 1
			} ]
		    },
		    {
			kind : enyo.Popup,
			name : "popup_map",
			width : "85%;",
			height : "85%;",
			dismissWithClick : true,
			// showHideMode : "transition",
			// openClassName : "zoomFadeIn",
			// className : "transitioner2",
			layoutKind : "VFlexLayout",
			style : "overflow: hidden;border-width: 8px;",
			scrim : true,
			components : [ {
			    kind : "pen.map",
			    name : "map_kind",
			    flex : 1
			} ]
		    },
		    {
			kind : "Toolbar",
			components : [ {
			    kind : "VFlexBox",
			    content : "Inventario",
			    flex : .17,
			    onclick : "doSelect",
			    style : "padding:0px;color:white"
			}, {
			    kind : "RowGroup",
			    flex : .04,
			    style : "margin:0px;",
			    components : [ {
				kind : "VFlexBox",
				name : "lblPurSumInvHeads",
				style : "font-size: 0.7em;color:#999;",
				align : "center",
				content : "109",
			    }, ]
			}, {
			    kind : "Spacer",
			    flex : .019
			}, {
			    kind : "RowGroup",
			    flex : .05,
			    style : "margin:0px;",
			    components : [ {
				kind : "VFlexBox",
				name : "lblPurSumInvWeight",
				style : "font-size: 0.7em;color:#999",
				align : "center",
				content : "10000"
			    }, ]
			}, {
			    kind : "Spacer",
			    flex : .01
			}, {
			    kind : "RowGroup",
			    layoutKind : enyo.VFlexLayout,
			    flex : .05,
			    style : "margin:0px;",
			    components : [ {
				kind : "VFlexBox",
				name : "lblSumInvAveWight",
				style : "font-size: 0.7em;color:#999",
				align : "center",
				content : "372.9"
			    }, ]
			},

			{
			    kind : "Spacer",
			    flex : .05
			}, {
			    kind : "Button",
			    caption : "+",
			    onclick : "sales_click"
			} ]
		    },
		    {
			kind : "Scroller",
			flex : 1,
			components : [ {
			    kind : enyo.VirtualRepeater,
			    name : "listInventory",
			    onSetupRow : "loadInventory",
			    onclick : "doSelectProduct",
			    components : [ {
				kind : enyo.Item,
				components : [
					{
					    layoutKind : enyo.HFlexLayout,
					    components : [ {
						name : "lblInvType",
						flex : 1,
						content : "400+"
					    }, {
						name : "lblInvClass",
						flex : 1.3,
						content : "Novillos"
					    }, {
						name : "lblInvHeads",
						flex : 1.2,
						content : "50/100"
					    }, {
						name : "lblInvWeight",
						flex : 1.5,
						content : "100000"
					    }, {
						name : "lblInvInvAverage",
						flex : 1.2,
						content : "200"
					    }, {
						name : "lblInvFeed",
						flex : .8,
						className : "listSecond",
						content : "200"
					    }, ]
					},
					{
					    name : "lblInvDesc",
					    style : "font-size: 0.85em;color:#999",
					    content : "A1, A2, A3, A4, A5 / ALAN DEL RIO (50) / EASTMAN TRUCK + LA PAZ",
					    onclick:"desc_click"
					} ]
			    } ]
			} ]
		    }, {
			kind : "Toolbar",
			components : [ {
			    kind : "VFlexBox",
			    content : "Total",
			    flex : .28,
			    style : "color:white;margin:0"
			}, {
			    kind : "RowGroup",
			    align : "center",
			    flex : .1,
			    style : "backgound-color:white;margin:0",
			    components : [ {
				name : "lblInvSumHeadClass",
				kind : "VFlexBox",
				align : "center",
				style : "font-size: 0.75em;color:#999",
				content : "241"
			    }, ]
			}, {
			    kind : "Spacer",
			    flex : .01
			}, {
			    kind : "RowGroup",
			    align : "center",
			    flex : .1,
			    style : "backgound-color:white;margin:0",
			    components : [ {
				kind : "VFlexBox",
				name : "lblInvSumWeight",
				align : "center",
				style : "font-size: 0.75em;color:#999",
				content : "1234"
			    }, ]
			}, {
			    kind : "Spacer",
			    flex : .01
			}, {
			    kind : "RowGroup",
			    align : "center",
			    flex : .1,
			    style : "backgound-color:white;margin:0",
			    components : [ {
				kind : "VFlexBox",
				name : "lblInvSumAvgWeight",
				align : "center",
				style : "font-size: 0.75em;color:#999",
				content : "1233"
			    }, ]
			}, {
			    kind : "Spacer",
			    flex : .01
			}, {
			    kind : "RowGroup",
			    align : "center",
			    flex : .1,
			    style : "backgound-color:white;margin:0",
			    components : [ {
				kind : "VFlexBox",
				name : "lblInvSumFeed",
				align : "center",
				style : "font-size: 0.75em;color:#999",
				content : "1233"
			    }, ]
			}, {
			    kind : "Spacer",
			    flex : .01
			} ]
		    }, ],
	    updateInventory : function() {
	    },
	    calcSummary : function() {
	    },
	    loadInventory : function(inSender, inIndex) {
		if (inIndex < 100) {
		    return true;
		}
	    },
	    sales_click : function() {
		this.$.popup_sales.openAtCenter();
	    },
	    desc_click:function(inSender, inEvent){
		console.debug(inSender);
		console.debug(inEvent);
		this.$.popup_map.openAtCenter();
	    }
	});
