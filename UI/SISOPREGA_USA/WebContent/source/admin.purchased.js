enyo.kind({
    name : "admin.purchased",
    kind : "VFlexBox",
    className : "enyo-bg",
    events : {
	onSelect : ""
    },
    ready : function() {
    },
    components : [ {
	kind : enyo.Popup,
	name : "popup_add",
	width : "400px;",
	height : "70px;",
	dismissWithClick : true,
	// showHideMode : "transition",
	// openClassName : "zoomFadeIn",
	// className : "transitioner2",
	layoutKind : "VFlexLayout",
	style : "overflow: hidden;border-width: 8px;",
	scrim : true,
	components : [ {
	    kind : "addCattle",
	    name : "addCattle_kind",
	    onBuyCattle : "buy_cattle_click",
	    onCaptureHermana : "capture_hermana_click",
	    flex : 1
	} ]
    },{
	kind : enyo.Popup,
	name : "popup_purchases",
	width : "90%;",
	height : "90%;",
	dismissWithClick : true,
	// showHideMode : "transition",
	// openClassName : "zoomFadeIn",
	// className : "transitioner2",
	layoutKind : "VFlexLayout",
	style : "overflow: hidden;border-width: 8px;",
	scrim : true,
	components : [ {
	    kind : "purchases",
	    name : "purchases_kind",
	    flex : 1
	} ]
    }, {
	kind : enyo.Popup,
	name : "popup_hermana",
	width : "90%;",
	height : "90%;",
	dismissWithClick : true,
	// showHideMode : "transition",
	// openClassName : "zoomFadeIn",
	// className : "transitioner2",
	layoutKind : "VFlexLayout",
	style : "overflow: hidden;border-width: 8px;",
	scrim : true,
	components : [ {
	    kind : "hermana.de",
	    name : "hermana_kind",
	    flex : 1
	} ]
    }, {
	kind : "Toolbar",
	layoutKind : enyo.HFlexLayout,
	style : "padding:0px;color:white",
	components : [ {
	    kind : "VFlexBox",
	    content : "Compras",
	    flex : .1,
	    onclick : "doSelect"
	}, {
	    kind : "RowGroup",
	    layoutKind : enyo.VFlexLayout,
	    flex : .08,
	    style : "margin:0px;",
	    components : [ {
		kind : "VFlexBox",
		name : "lblPurSumInvHeads",
		style : "font-size: 0.7em;color:#999;",
		align : "center",
		content : "109 (+30)",
	    }, ]
	}, {
	    kind : "RowGroup",
	    layoutKind : enyo.VFlexLayout,
	    flex : .14,
	    style : "margin:0px;",
	    components : [ {
		kind : "VFlexBox",
		name : "lblPurSumInvWeight",
		style : "font-size: 0.7em;color:#999",
		align : "center",
		content : "40,650 (+536)"
	    }, ]
	}, {
	    kind : "RowGroup",
	    layoutKind : enyo.VFlexLayout,
	    flex : .08,
	    style : "margin:0px;",
	    components : [ {
		kind : "VFlexBox",
		name : "lblSumInvAveWight",
		style : "font-size: 0.7em;color:#999",
		align : "center",
		content : "372.9 (+10)"
	    }, ]
	},

	{
	    kind : "Spacer",
	    flex : .02
	}, {
	    kind : "Button",
	    caption : "+",
	    onclick : "add_cattle_click"
	} ]
    }, {
	kind : "Scroller",
	flex : 1,
	components : [ {
	    kind : enyo.VirtualRepeater,
	    name : "listPurchased",
	    onSetupRow : "loadInventory",
	    onclick : "doSelectProduct",
	    components : [ {
		kind : enyo.Item,
		components : [ {
		    layoutKind : enyo.HFlexLayout,
		    components : [ {
			name : "lblPurDate",
			flex : .8,
			content : "01/01"
		    }, {
			name : "lblPurHeads",
			flex : 1,
			content : "100000"
		    }, {
			name : "lblPurWeight",
			flex : 1,
			content : "10000000"
		    }, {
			name : "lblPurAveWeight",
			flex : 1,
			content : "20000000"
		    }, ]
		}, {
		    name : "lblPurClient",
		    style : "font-size: 0.85em;color:#999",
		    content : "Vendedor 1232334234"
		} ]
	    } ]
	} ]
    }, {
	kind : "Toolbar",
	components : [ {
	    kind : "VFlexBox",
	    content : "Total",
	    flex : .18,
	    style : "color:white;margin:0"
	}, {
	    kind : "Spacer",
	    flex : .08
	}, {
	    kind : "RowGroup",
	    align : "center",
	    flex : .1,
	    style : "backgound-color:white;margin:0",
	    components : [ {
		kind : "VFlexBox",
		name : "lblPurSumHeads",
		align : "center",
		className : "listSecond",
		style : "font-size: 0.75em;color:#999",
		content : "241"
	    }, ]
	}, {
	    kind : "Spacer",
	    flex : .12
	}, {
	    kind : "RowGroup",
	    align : "center",
	    flex : .15,
	    style : "backgound-color:white;margin:0",
	    components : [ {
		kind : "VFlexBox",
		name : "lblPurSumWeight",
		align : "center",
		style : "font-size: 0.75em;color:#999",
		content : "1234"
	    }, ]
	}, {
	    kind : "Spacer",
	    flex : .10
	}, {
	    kind : "RowGroup",
	    align : "center",
	    flex : .12,
	    style : "backgound-color:white;margin:0",
	    components : [ {
		kind : "VFlexBox",
		name : "lblSumAveWeight",
		align : "center",
		style : "font-size: 0.75em;color:#999",
		content : "1233"
	    }, ]
	}, {
	    kind : "Spacer",
	    flex : .17
	}, ]
    },

    ],
    loadInventory : function(inSender, inIndex) {
	if (inIndex < 10) {
	    return true;
	}
    },
    add_cattle_click : function() {
	this.$.popup_add.openAtCenter();
    },
    buy_cattle_click : function() {
	this.$.popup_add.close();
	this.$.popup_purchases.openAtCenter();
    },
    capture_hermana_click : function() {
	this.$.popup_add.close();
	this.$.popup_hermana.openAtCenter();
    }
});
