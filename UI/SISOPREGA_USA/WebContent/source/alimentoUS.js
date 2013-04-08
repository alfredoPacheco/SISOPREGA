enyo.kind({
    name : "alimentoUS",
    kind : enyo.VFlexBox,
    obj : {},
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
	    content : "Fecha y Hora:",
	    width : "166px;",
	    style : "text-align: right;margin-right:10px;"
	}, {
	    kind : "ToolInput",
	    name : "feedDate",
	    hint : "mes/dia/a�o",
	    // width : "103px;",
	    flex : 1,
	    height : "35px;",
	    onfocus : "applyMask",
	// style:"text-align: right;max-width: 500px;"
	},
	// {
	// content : 'mes/dia/a�o',
	// className : "listFirst",
	// style :
	// "background-color:#DABD8B;margin-left:2px;font-size:12px;",
	// width : "80px;"
	// },
	{
	    kind : "ToolInput",
	    name : "feedTime",
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
	    content : "Cantidad de Alimento:",
	    width : "166px;",
	    style : "text-align: right;margin-right:10px;"
	}, {
	    kind : "ToolInput",
	    name : "feedQtyPorcentage",
	    hint : '',
	    flex : 1,
	// style:"max-width: 500px;"
	}, {
	    content : "Lb",
	    width : "30px;",
	    style : "text-align: right;margin-right:10px;"
	} ]
    }, {
	kind : enyo.HFlexBox,
	align : "center",
	height : "40px;",
	style : "font-size:14px;",
	components : [ {
	    kind : enyo.Spacer
	}, {
	    kind : enyo.Button,
	    caption : "Guardar",
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
	this.$.feedDate.setValue(utils.dateOut(new Date()));
	this.$.feedDate.$.input.applyStyle("text-align", "left");
	this.$.feedTime.setValue(new Date().toLocaleTimeString()
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
    setObj : function(objt) {
	this.obj = objt;
	this.calculateFeedQty();
    },
    getObj : function() {
	return this.obj;
    },
    save : function() {
	this.obj.feed.quantity = this.$.feedQtyPorcentage.getValue();
	var dateAux = new Date("" + this.$.feedDate.getValue() + " "
		+ this.$.feedTime.getValue());
	this.obj.feed.dateAndTime = dateAux;
	if (cachePen.addFeed(this.obj, this.obj.feed)) {
	    this.doGuardar();
	}

    },
    calculateFeedQty : function() {
	this.$.feedQtyPorcentage.setValue(utils
		.formatNumberThousands(this.obj.weight * .015));

    },

    cancel : function() {

    }

});