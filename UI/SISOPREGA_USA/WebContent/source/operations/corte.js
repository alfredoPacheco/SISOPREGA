enyo.kind({
    name : "corte",
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
	components : [ 
	               {
	    content : "Fecha y Hora:",
	    width : "166px;",
	    style : "text-align: right;margin-right:10px;"
	}, {
	    kind : "ToolInput",
	    name : "corteDate",
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
	    name : "corteTime",
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
	    content : "Cabezas Mermadas:",
	    width : "166px;",
	    style : "text-align: right;margin-right:10px;"
	}, {
	    kind : "ToolInput",
	    name : "CabezaMerma",
	    hint : 'Cabezas Mermadas',
	    flex : 1,
	// style:"max-width: 500px;"
	}]
    }, {
	kind : enyo.HFlexBox,
	align : "center",
	pack : "center",
	height : "40px;",
	components : [ {
	    content : "Comentario:",
	    width : "166px;",
	    style : "text-align: right;margin-right:10px;",
		
	},{
	    kind : "ToolInput",
	    name : "MermaComent",
	    hint : 'Comentario',
	    flex : 1,
	}]
    },{
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
	},]
    }
    // ]},
    ],
    ready : function() {
	this.$.corteDate.setValue(utils.dateOut(new Date()));
	this.$.corteDate.$.input.applyStyle("text-align", "left");
	this.$.corteTime.setValue(new Date().toLocaleTimeString()
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
    },
    getObj : function() {
	return this.obj;
    },
    save : function() {
	
	var objInventory = enyo.clone(this.obj);
	var objShrinkage={};
	objShrinkage.dateTime = new Date("" + this.$.corteDate.getValue() + " " + this.$.corteTime.getValue());
	objShrinkage.comment = this.$.MermaComent.getValue();
	objShrinkage.heads= Number(this.$.CabezaMerma.getValue());
	objShrinkage.weight= Number(objInventory.weight) / Number(objInventory.heads) * objShrinkage.heads;	
	
	if(!objInventory.Shrinkage){
	    objInventory.Shrinkage = [];	    
	}
	
	objInventory.Shrinkage.push(objShrinkage);
	
	objInventory.heads = objInventory.heads - objShrinkage.heads;
	objInventory.weight = objInventory.weight - objShrinkage.weight;
	
	crudInventory.update(objInventory, this, "doGuardar");	
	//alert (this.$.CabezaMerma.getValue()); //Cabezas por restar
//	this.obj.feed.quantity = this.$.CabezaMerma.getValue();
//	var dateAux = new Date("" + this.$.corteDate.getValue() + " "
//		+ this.$.corteTime.getValue());
//	this.obj.feed.dateAndTime = dateAux;
//	if (cachePen.addFeed(this.obj, this.obj.feed)) {
//	    this.doGuardar();
//	}

    },
    cancel : function() {

    }

});