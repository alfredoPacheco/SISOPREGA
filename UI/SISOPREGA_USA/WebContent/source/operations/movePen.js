enyo
	.kind({
	    name : "movePen",
	    kind : enyo.VFlexBox,
	    objFrom : {},
	    objTo : {},
	    events : {
		onCancel : "",
		onGuardar : ""
	    },
	    style : "padding:10px;font-size:17px;background-color:#DABD8B;",
	    components : [ {
		kind : enyo.HFlexBox,
		align : "center",
		pack : "center",
		height : "40px;",
		components : [ {
		    content : "Moving from:",
		    width : "200px;",
		    style : "text-align: right;margin-right:10px;"
		}, {
		    name : 'lblPen',
		    style : "color:black",
		    width : "80px",
		    content : ""
		}, {
		    content : "to:",
		    width : "13px;",
		    style : "text-align: right;margin-right:10px;"
		}, {
		    name : 'lblPenTo',
		    style : "color:black",
		    width : "80px",
		    content : ""
		}, {
		    kind : "enyo.Spacer",
		    flex : 1
		} ]
	    }, {
		kind : enyo.HFlexBox,
		align : "center",
		pack : "center",
		height : "40px;",
		components : [ {
		    content : "Heads on Pen:",
		    width : "200px;",
		    style : "text-align: right;margin-right:10px;"
		}, {
		    name : 'lblHeadsInPen',
		    style : "color:black",
		    flex : 1,
		    content : ""
		}, ]
	    }, {
		kind : enyo.HFlexBox,
		align : "center",
		pack : "center",
		height : "40px;",
		components : [ {
		    content : "Available to move",
		    width : "200px;",
		    style : "text-align: right;margin-right:10px;"
		}, {
		    name : 'lblHeadsMobile',
		    style : "color:black",
		    flex : 1,
		    content : ""
		}, ]
	    }, {
		kind : enyo.HFlexBox,
		align : "center",
		pack : "center",
		height : "40px;",
		components : [ {
		    content : "Date/Time:",
		    width : "200px;",
		    style : "text-align: right;margin-right:10px;"
		}, {
		    kind : "ToolInput",
		    name : "moveDate",
		    hint : "mm/dd/yyyy",
		    // width : "103px;",
		    flex : 1,
		    height : "35px;",
		    onfocus : "applyMask",
		// style:"text-align: right;max-width: 500px;"
		},
		// {
		// content : 'mes/dia/año',
		// className : "listFirst",
		// style :
		// "background-color:#DABD8B;margin-left:2px;font-size:12px;",
		// width : "80px;"
		// },
		{
		    kind : "ToolInput",
		    name : "moveTime",
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
		pack : "center",
		height : "40px;",
		components : [ {
		    content : "Heads to Move:",
		    width : "200px;",
		    style : "text-align: right;margin-right:10px;"
		}, {
		    kind : "controls.numberBox",
		    inputKind:"ToolInput",
		    height:"35px",
		    name : "totalHC",
		    hint : '',
		    flex : 1,
		// style:"max-width: 500px;"
		}, ]
	    }, {
		kind : enyo.HFlexBox,
		align : "center",
		height : "40px;",
		style : "font-size:14px;",
		components : [ {
		    kind : enyo.Spacer
		}, {
		    kind : enyo.Button,
		    caption : "Save",
		    onclick : "save",
		    style : "background-color: #DABD8B;min-width:70px;"
		}, {
		    kind : enyo.Button,
		    caption : "Cancel",
		    onclick : "doCancel",
		    style : "background-color: #DABD8B;min-width:70px;"
		}, ]
	    }
	    // ]},
	    ],
	    ready : function() {
		this.$.moveDate.setValue(utils.dateOut(new Date()));
		this.$.moveDate.$.input.applyStyle("text-align", "left");
		this.$.moveTime.setValue(new Date().toLocaleTimeString()
			.substring(0, 5));
	    },
	    applyMask : function(inSender) {
		var _id = inSender.$.input.getId();
		jQuery(function(j) {
		    j(document.getElementById(_id)).mask('99/99/9999');
		});
	    },
	    applyTimeMask : function(inSender) {
		var _id = inSender.$.input.getId();
		jQuery(function(j) {
		    j(document.getElementById(_id)).mask('99:99');
		});
	    },
	    setObj : function(objFrom, objTo) {
		this.objFrom = objFrom;
		this.objTo = objTo;
		this.$.lblPen
			.setContent(crudPen.getByID(objFrom.penId).barnyardCode);
		this.$.lblPenTo
			.setContent(crudPen.getByID(objTo.penId).barnyardCode);
		this.$.lblHeadsInPen.setContent(objFrom.heads);		
		this.$.lblHeadsMobile.setContent(objFrom.availableToSell);
		this.$.totalHC.setValue("0");
	    },
	    getObj : function() {
		return this.objFrom;
	    },
	    validateForm : function() {
		var sError = "";
		var headsToMove = Number(this.$.totalHC.getValue());
		var availableToMove = Number(this.$.lblHeadsMobile.getContent());
		if (!headsToMove || headsToMove < 1 || headsToMove == '' || headsToMove <= 0) {
		    sError = "Verify the heads quantity.";
		}
		if (headsToMove > availableToMove) {
		    sError = "The amount of heads you want to move can't be greater than available heads.";
		}
		
		if (sError != "") {
		    cacheMan.setMessage("", sError);
		    return false;
		}
		return true;
	    },
	    save : function() {
		if (this.validateForm()) {
		    var aux = parseFloat(this.objFrom.weight)
			    / parseInt(this.objFrom.heads);
		    this.objFrom.heads = parseInt(this.$.totalHC.getValue());
		    this.objFrom.weight = aux * this.objFrom.heads;
		    this.doGuardar();
		}
	    }
	});