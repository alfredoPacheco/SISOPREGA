enyo.kind({
    name : "admin.shipments",
    kind : "VFlexBox",
    className : "enyo-bg",
    events : {
	onSelect : ""
    },
    components : [ {
	kind : enyo.Popup,
	name:"popup_driver",
	width : "600px;",
	height : "230px;",
	dismissWithClick : true,
	// showHideMode : "transition",
	// openClassName : "zoomFadeIn",
	// className : "transitioner2",
	layoutKind : "VFlexLayout",
	style : "overflow: hidden;border-width: 8px;",
	scrim : true,
	components : [ {
	    kind : "driver.select",
	    name : "driver_kind",	    
	    flex : 1,
	    onCancel:"cancel_click",
	    onGuardar:"guardar_click"
	} ]
    },{
	kind : "Toolbar",
	components : [ {
	    kind : "VFlexBox",
	    content : "Envios",
	    onclick : "doSelect",
	    flex : .3,
	    style : "color:white"
	} ]
    }, {
	kind : "Scroller",
	flex : 1,
	components : [ {
	    kind : enyo.VirtualRepeater,
	    name : "listInventorys",
	    onSetupRow : "loadInventory",
	    onclick : "doSelectProduct",
	    components : [ {
		kind : enyo.Item,
		components : [ {
		    layoutKind : enyo.HFlexLayout,
		    components : [ {
			name : "lblSalesDate",
			flex : .9,
			content : "01/01 14:30"
		    }, {
			name : "lblSalesHeads",
			flex : 1,
			content : "100"
		    }, {
			name : "lblSalesWeight",
			flex : 1,
			content : "100000"
		    }, {
			name : "lblSalesAverage",
			flex : 1,
			content : "200"
		    }, {
			kind : "Button",
			name : "btn",
			caption : "-",
			onclick:"btn_click",
			style : "margin-right:0px"
		    }, ]
		}, {
		    name : "lblSalesClient",
		    style : "font-size: 0.85em;color:#999",
		    content : "Comprador"
		} ]
	    } ]
	} ]
    }, {
	kind : "Toolbar",
	components : [ {
	    kind : "VFlexBox",
	    content : "Total",
	    flex : .20,
	    style : "color:white;margin:0"
	}, {
	    kind : "Spacer",
	    flex : .07
	}, {
	    kind : "RowGroup",
	    align : "center",
	    flex : .1,
	    style : "backgound-color:white;margin:0",
	    components : [ {
		kind : "VFlexBox",
		name : "lblSalesSumHeads",
		align : "center",
		style : "font-size: 0.75em;color:#999",
		content : "241"
	    }, ]
	}, {
	    kind : "Spacer",
	    flex : .15
	}, {
	    kind : "RowGroup",
	    align : "center",
	    flex : .15,
	    style : "backgound-color:white;margin:0",
	    components : [ {
		kind : "VFlexBox",
		name : "lblSalesSumWeight",
		align : "center",
		style : "font-size: 0.75em;color:#999",
		content : "1234"
	    }, ]
	}, {
	    kind : "Spacer",
	    flex : .07
	}, {
	    kind : "RowGroup",
	    align : "center",
	    flex : .12,
	    style : "backgound-color:white;margin:0",
	    components : [ {
		kind : "VFlexBox",
		name : "lblSumAveWeight",
		align : "center",
		className : "listSecond",
		style : "font-size: 0.75em;color:#999",
		content : "1233"
	    }, ]
	}, {
	    kind : "Spacer",
	    flex : .28
	}, ]
    }, ],
    loadInventory : function(inSender, inIndex) {
	if (inIndex < 100) {
	    return true;
	}
    },
    btn_click:function(){
	this.$.popup_driver.openAtCenter();
    },
    cancel_click:function(){
	alert("cancel");
    },
    guardar_click:function(){
	alert("guardar");
    }
});
