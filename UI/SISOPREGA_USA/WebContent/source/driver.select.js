enyo
	.kind({
	    name : "driver.select",
	    kind : enyo.VFlexBox,
	    events:{
		onCancel:"",
		onAfterSave:""
	    },
	    obj:{},
	    style : "padding:10px;font-size:17px;background-color:#DABD8B;",
	    components : [ {
		kind : enyo.HFlexBox,
		align : "center",
		pack : "center",
		height : "40px;",
		components : [ {
		    content : "Transportista:",
		    width : "103px;",
		    style : "text-align: right;margin-right:10px;"
		}, {
		    kind : "controls.autocomplete",
		    inputKind : "ToolInput",
		    name : "carrier",
		    flex : 1,
		    height : "35px;",
		    hint : "Transportista",
		    width:"500px"
		} ]
	    }, {
		kind : enyo.HFlexBox,
		align : "center",
		pack : "center",
		height : "40px;",
		components : [ {
		    content : "Placas:",
		    width : "103px;",
		    style : "text-align: right;margin-right:10px;"
		}, {
		    kind : "ToolInput",
		    name : "plate",
		    hint : 'Placas',
		    flex : 1,
		// style:"max-width: 500px;"
		}, ]
	    }, {
		kind : enyo.HFlexBox,
		align : "center",
		pack : "center",
		height : "40px;",
		components : [ {
		    content : "Chofer:",
		    width : "103px;",
		    style : "text-align: right;margin-right:10px;"
		}, {
		    kind : "ToolInput",
		    name : "driver",
		    hint : 'Chofer',
		    flex : 1,
		// style:"max-width: 500px;"
		}, ]
	    }, {
		kind : enyo.HFlexBox,
		align : "center",
		pack : "center",
		height : "40px;",
		components : [ {
		    content : "Fecha y Hora:",
		    width : "103px;",
		    style : "text-align: right;margin-right:10px;"
		}, {
		    kind : "ToolInput",
		    name : "releaseDate",
		    hint : "mes/dia/año",
		    // width : "103px;",
		    flex : 1,
		    height : "35px;",
		    onfocus : "applyMask",
		// style:"text-align: right;max-width: 500px;"
		},
		{
		    kind : "ToolInput",
		    name : "releaseTime",
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
		style : "font-size:14px;",
		components : [{
		    kind : enyo.Spacer
		}, {
		    kind : enyo.Button,
		    caption : "Guardar",
		    onclick : "save_release",
		    style : "background-color: #DABD8B;min-width:70px;"
		},{
		    kind : enyo.Button,
		    caption : "Cancel",
		    onclick : "doCancel",
		    style : "background-color: #DABD8B;min-width:70px;"
		}, ]
	    }
	    // ]},
	    ],
	    ready : function() {
		this.$.releaseDate.setValue(utils.dateOut(new Date()));
		this.$.releaseDate.$.input.applyStyle("text-align", "center");
		this.$.releaseTime.$.input.applyStyle("text-align", "center");
		this.$.releaseTime.setValue(new Date().toLocaleTimeString()
			.substring(0, 5));
		this.$.carrier.setItems(cacheDrivers.getAllForList());
	    },
	    setObj:function(obj){
		this.obj = obj;
	    },
	    save_release:function(){
		cacheShip.releaseShip(this.getObj(), this, "afterSaveRelease");		
	    },
	    afterSaveRelease:function(){
		this.doAfterSave();
	    },
	    getObj:function(){
		this.obj.carrier = this.$.carrier.getValue();
		this.obj.plates = this.$.plate.getValue();
		this.obj.driver = this.$.driver.getValue();
		this.obj.releaseDate = new Date("" + this.$.releaseDate.getValue() + " " + this.$.releaseTime.getValue());		
		return this.obj;
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
	    }
	});