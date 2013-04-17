enyo.kind({
    name : "shipments.schedule",
    kind : enyo.VFlexBox,
    style : "background-color:#DABD8B;font-size:15px;",
    arrToShip : [],
    events : {
	onProgram : "",
	onCancel : ""
    },
    components : [ {
	kind : enyo.VFlexBox,
	style : "padding:20px;",
	pack : "center",
	components : [ {
	    kind : enyo.HFlexBox,
	    align : "center",
	    pack : "center",
	    height : "40px;",
	    components : [ {
		content : "Fecha y Hora:",
		width : "110px;",
		style : "text-align: right;margin-right: 5px;"
	    }, {
		kind : "ToolInput",
		name : "programDate",
		hint : "mes/dia/año",
		// width : "103px;",
		flex : 1,
		height : "35px;",
		onfocus : "applyMask",
	    // style:"text-align: right;max-width: 500px;"
	    }, {
		kind : "ToolInput",
		name : "programTime",
		// width : "103px;",
		hint : "HH:MM",
		flex : 1,
		height : "35px;",
		onfocus : "applyTimeMask",
	    // style:"text-align: right;max-width: 500px;"
	    } ]
	}, {
	    kind : enyo.HFlexBox,
	    align : "center",
	    height : "40px;",
	    components : [ {
		content : "Transportista:",
		width : "110px",
		style : "text-align: right;margin-right: 5px;"
	    }, {
		kind : "controls.autocomplete",
		inputKind : "ToolInput",
		name : "carrier",
		width : "500px;",
		flex:1,
		height : "35px;",
	    } ]
	} ]
    }, {
	kind : enyo.VFlexBox,
	style : "padding:20px;",
	pack : "center",
	components : [ {
	    kind : enyo.HFlexBox,
	    align : "center",
	    height : "40px;",
	    style : "font-size:14px;",
	    components : [ {
		kind : enyo.Spacer
	    }, {
		kind : enyo.Button,
		caption : "Programar Envío",
		onclick : "program_click",
		style : "background-color: #DABD8B;"
	    }, {
		kind : enyo.Button,
		caption : "Cancelar",
		onclick : "cancel_click",
		style : "background-color: #DABD8B;"
	    } ]
	} ]
    } ],

    afterUpdate : function() {
	this.updateList();
    },
    ready : function() {
	this.$.programDate.setValue(utils.dateOut(new Date()));
	this.$.programDate.$.input.applyStyle("text-align", "center");
	this.$.programTime.$.input.applyStyle("text-align", "center");
	this.$.programTime.setValue(new Date().toLocaleTimeString()
		.substring(0, 5));
	this.$.carrier.setItems(cacheDrivers.getAllForList());
    },
    setArrShipment : function(arr) {
	this.arrToShip = arr;
    },
    program_click : function() {
	var len = this.arrToShip.length;
	for ( var i = 0; i < len; i++) {
	    if (this.arrToShip[i]) {
		this.arrToShip[i].shipProgramDateTime = new Date("" + this.$.programDate
			.getValue() + " " + this.$.programTime.getValue());
		this.arrToShip[i].shipCarrier = this.$.carrier.getValue();
		var obj = {
		    buyer : 			this.arrToShip[i].buyer,
		    truck : 			null,
		    cattleName : 		this.arrToShip[i].cattleName,
		    totalHeads : 		this.arrToShip[i].totalHeads,
		    totalWeight : 		this.arrToShip[i].totalWeight,
		    aveWeight : 		this.arrToShip[i].aveWeight,
		    shipCarrier : 		this.arrToShip[i].shipCarrier,
		    shipProgramDateTime :	this.arrToShip[i].shipProgramDateTime
		};
		cacheShip.createData(obj);
	    }
	}
	this.doProgram();
    },
    cancel_click : function() {
	this.doCancel();
    },
    applyMask : function(inSender) {
	var _id = inSender.$.input.getId();
	jQuery(function(j) {
	    j(document.getElementById(_id)).mask('99/99/9999');
	});
    }
});