enyo.kind({
    name : "movePen",
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
	    width : "160px;",
	    style : "text-align: right;margin-right:10px;"
	}, {
	    kind : "ToolInput",
	    name : "moveDate",
	    hint : "mes/dia/año",
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
	    content : "Cantidad de cabezas:",
	    width : "160px;",
	    style : "text-align: right;margin-right:10px;"
	}, {
	    kind : "ToolInput",
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
    setObj : function (objt){
	this.obj = objt; 
    },
    getObj : function (){
	return this.obj;
    },
    save : function (){
	var aux = parseFloat(this.obj.weight) / parseInt(this.obj.heads);
	this.obj.heads = parseInt(this.$.totalHC.getValue());
	this.obj.weight = aux * this.obj.heads;
	this.doGuardar();
    }
    
});