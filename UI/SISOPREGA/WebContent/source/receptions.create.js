enyo.kind({
    name : "receptions.create",
    kind : enyo.SlidingView,
    layoutKind : enyo.VFlexLayout,
    events : {
	"onAddReception" : "",
	"onUpdateReception" : "",
	"onAddRancher" : "",
	"onCancel" : ""
    },
    objRec : null,
    objList : [],
    arrBY : null,
    create : function() {
	this.inherited(arguments);
	this.$.rancher_id.setItems(cacheRanchers.getAllForList());
	this.$.cattype_id.setItems(cacheCattle.getAllCattleType());
	this.$.location_id.setItems(cacheMan.getAllLocationsForList());
	this.$.zone_id.setItems(cacheMan.getAllZonesForList());
    },
    components : [ {
	name : "options",
	kind : enyo.PopupSelect,
	onSelect : "addNewRancher",
	items : [ {
	    caption : "Empresa/Sociedad",
	    value : 1
	}, {
	    caption : "Persona Fisica",
	    value : 2
	}, ]
    }, {
	name : "addRancherDialog",
	kind : "Popup",
	showHideMode : "transition",
	openClassName : "zoomFadeIn",
	className : "transitioner2",
	layoutKind : "VFlexLayout",
	style : "overflow: hidden",
	width : "85%",
	height : "85%",
	scrim : true,
	components : [

	]
    }, {
	kind : enyo.VFlexBox, // defaultKind: "HFlexBox",
	style : "padding:20px;",
	pack : "center",
	components : [ {
	    layoutKind : enyo.HFlexLayout,
	    align : "center",
	    height : "50px;",
	    components : [ {
		content : "Corrales:",
		width : "160px;",
		style : "text-align: right;margin-right:5px;"
	    }, {
		name : 'sBYs',
		content : "",
		style : "color:black",
		flex : 1
	    }, {
		content : "Fecha de Llegada:",
		width : "160px;",
		style : "text-align: right;margin-right:5px;"
	    }, {
		kind : "DatePicker",
		name : "arrival_date",
		label : "",
		inputClassName : "blankInput",
		focusClassName : "darkFocus",
		changeOnInput : true
	    } ]

	}, {
	    kind : enyo.HFlexBox,
	    align : "center",
	    height : "50px;",
	    components : [ {
		content : "Sr. Ganadero:",
		width : "160px;",
		style : "text-align: right;margin-right:5px;"
	    }, {
		kind : "controls.autocomplete",
		inputKind : "ToolInput",
		name : "rancher_id",
		hint : '',
		width : "500px;",
		height : "35px;",
		flex : 1,
		onEnter : "emularTabulacionConEnter"
	    }, {
		kind : enyo.IconButton,
		icon : "images/menu-icon-new.png",
		onclick : "contextMenuClicked"
	    } ]
	}, {
	    kind : enyo.HFlexBox,
	    align : "center",
	    height : "50px;",
	    components : [ {
		content : "Tipo de Ganado:",
		width : "160px;",
		style : "text-align: right;margin-right:5px;"
	    }, {
		kind : "controls.autocomplete",
		inputKind : "ToolInput",
		name : "cattype_id",
		hint : '',
		width : "200px;",
		height : "35px;",
		flex : 1,
		onEnter : "emularTabulacionConEnter"
	    }, ]
	},

	{
	    kind : enyo.HFlexBox,
	    align : "center",
	    height : "50px;",
	    components : [ {
		content : "Procedencia:",
		width : "160px;",
		style : "text-align: right;margin-right:5px;"
	    }, {
		kind : "controls.autocomplete",
		inputKind : "ToolInput",
		name : "location_id",
		hint : '',
		width : "200px;",
		height : "35px;",
		flex : 1,
		onEnter : "emularTabulacionConEnter"
	    }, {
		content : "Zona en Corrales:",
		width : "160px;",
		style : "text-align: right;margin-right:5px;"
	    }, {
		kind : "controls.autocomplete",
		inputKind : "ToolInput",
		name : "zone_id",
		hint : '',
		width : "200px;",
		height : "35px;",
		flex : 1,
		onEnter : "emularTabulacionConEnter"
	    }, ]
	}, {
	    kind : enyo.HFlexBox,
	    align : "center",
	    height : "50px;",
	    components : [ {
		content : "No. Cabezas:",
		width : "160px;",
		style : "text-align: right;margin-right:5px;"
	    }, {
		kind : "ToolInput",
		name : "hc_aprox",
		hint : "",
		flex : 1,
		height : "35px;",
		changeOnInput : true,
		inputType : "number",
		onkeydown : "key_down"
	    }, {
		content : "Peso:",
		width : "160px;",
		style : "text-align: right;margin-right:5px;"
	    }, {
		kind : "ToolInput",
		name : "weight",
		hint : "",
		flex : 1,
		height : "35px;",
		changeOnInput : true,
		inputType : "number",
		onkeydown : "key_down"
	    }, ]
	} ]
    }, {
	kind : "Drawer",
	name : "draAdd",
	components : [ {
	    layoutKind : "HFlexLayout",
	    style : "padding:0px 20px;",
	    align : "center",
	    pack : "center",
	    components : [ {
		kind : "Button",
		name : "btnAdd",
		className : "enyo-button-affirmative",
		flex : 1,
		caption : "Crear",
		onclick : "addReception"
	    },{
		kind : "Button",
		name : "btnCancelCreate",
		className : "enyo-button-negative",
		flex : 1,
		caption : "Cancelar",
		onclick : "doCancel"
	    } ]
	} ]
    }, {
	kind : "Drawer",
	name : "draUpdate",
	components : [ {
	    layoutKind : "HFlexLayout",
	    style : "padding:0px 20px;",
	    align : "center",
	    pack : "center",
	    components : [ {
		kind : "Button",
		name : "btnUpdate",
		className : "enyo-button-affirmative",
		flex : 1,
		caption : "Actualizar",
		onclick : "updateReception"
	    }, {
		kind : "Button",
		name : "btnCancelUpd",
		className : "enyo-button-negative",
		flex : 1,
		caption : "Cancelar",
		onclick : "doCancel"
	    }, ]
	} ]
    } ],
    categoryChanged : function(inSender, inValue, inOldValue) {
	// enyo.log(enyo.json.stringify(this._arrDefinitions[inValue]));
	// this.$.lstDef.setItems(this._arrDefinitions[inValue]);
	// this.$.lstDef.setValue(null);
    },
    on_select_location : function() {

    },
    ready : function() {
	this.resetValues();
	this.$.rancher_id.setFocus();
    },
    emularTabulacionConEnter : function(inSender) {
	switch (inSender.name) {
	case "rancher_id":
	    this.$.cattype_id.setFocus();
	    break;
	case "cattype_id":
	    this.$.location_id.setFocus();
	    break;
	case "location_id":
	    this.$.zone_id.setFocus();
	    break;
	case "zone_id":
	    this.$.hc_aprox.forceFocus();
	    break;
	case "hc_aprox":
	    this.$.weight.forceFocus();
	    break;
	case "weight":
	    if (this.$.draAdd.open == true) {
		this.addReception();
	    } else if (this.$.draUpdate.open == true) {
		this.updateReception();
	    }
	    break;

	}
    },
    key_down : function(inSender, inEvent) {
	if (inEvent.keyCode == 13) {
	    this.emularTabulacionConEnter(inSender);
	}
    },
    addReception : function() {
	cacheReceptions.Create(this.getReception(), this, "doAddReception");
    },
    getReception : function() {
	var receptionDef;
	receptionDef = {
	    rancher_id : null,
	    arrival_date : "",
	    company_name : "",
	    cattype_id : "",
	    cattype_name : "",
	    hc_aprox : "",
	    location_id : "",
	    location_name : "",
	    zone_id : "",
	    weights : [],
	    barnyards : [],
	    accepted_count : "",
	    inspections : [],
	    feed : []
	};

	var fmt = new enyo.g11n.DateFmt({
	    format : "yyyy/MM/dd",
	    locale : new enyo.g11n.Locale("es_es")
	});

	receptionDef.rancher_name = this.$.rancher_id.getValue();
	receptionDef.rancher_id = this.$.rancher_id.getIndex();
	receptionDef.zone_id = this.$.zone_id.getIndex();
	receptionDef.location_id = this.$.location_id.getIndex();
	receptionDef.location_name = this.$.location_id.getValue();

	if (this.$.arrival_date.getValue() != null) {
	    receptionDef.arrival_date = fmt.format(this.$.arrival_date
		    .getValue());
	}
	receptionDef.cattype_id = this.$.cattype_id.getIndex();
	receptionDef.cattype_name = this.$.cattype_id.getValue();
	receptionDef.weights.push({
	    hcw_id : null,
	    hc : this.$.hc_aprox.getValue(),
	    weight : this.$.weight.getValue()
	});
	receptionDef.hc_aprox = this.$.hc_aprox.getValue();
	receptionDef.barnyards = this.arrBY;
	return receptionDef;
    },
    updateReception : function() {
	cacheReceptions.upd(this.objRec, this.getReception(), this,
		"doUpdateReception");
    },
    resetValues : function() {
	this.$.rancher_id.setIndex(-1);
	this.$.cattype_id.setIndex(1);

	this.$.zone_id.setIndex(this.deduceZone() || 1);

	this.$.location_id.setIndex(1);
	this.$.arrival_date.setValue(new Date());
	this.$.hc_aprox.setValue("");
    },
    deduceZone : function() {
	var zone = null;
	if (this.arrBY) {
	    for ( var i in this.arrBY) {
		if (this.arrBY.hasOwnProperty(i)) {
		    if (zone) {
			if (zone != this.arrBY[i].substring(0, 1)) {
			    return 1;
			}
		    } else {
			zone = this.arrBY[i].substring(0, 1);
		    }
		}
	    }
	    return Number(zone);
	}
	return null;
    },
    setReception : function(receptionDef, arrBY) {
	this.arrBY = arrBY;
	this.resetValues();

	var sBY = "";

	for ( var sKey in arrBY) {
	    sBY += arrBY[sKey].substring(1) + ", ";
	}
	sBY = sBY.slice(0, -2);
	this.$.sBYs.setContent(sBY);
	if (receptionDef) {
	    this.objRec = receptionDef;
	    this.$.rancher_id.setIndex(receptionDef.rancher_id);

	    this.$.arrival_date.setValue(new Date(receptionDef.arrival_date
		    .substring(0, 4),
		    receptionDef.arrival_date.substring(5, 7) - 1,
		    receptionDef.arrival_date.substring(8, 10)));
	    this.$.zone_id.setIndex(receptionDef.zone_id);
	    this.$.location_id.setIndex(receptionDef.location_id);
	    this.$.cattype_id.setIndex(receptionDef.cattype_id);
	    if (receptionDef.weights.length == 1) {
		this.$.hc_aprox.setValue(receptionDef.weights[0].hc);
		this.$.weight.setValue(receptionDef.weights[0].weight);
	    }
	}
    },
    toggleUpdate : function() {
	this.$.draAdd.setOpen(false);
	this.$.draUpdate.setOpen(true);
    },
    toggleAdd : function() {
	this.$.draAdd.setOpen(true);
	this.$.draUpdate.setOpen(false);
	// this.resetValues();
    },
    addNewRancher : function(inSender, inSelected) {
	if (this.$.dynoco) {
	    this.$.dynoco.destroy();
	}
	switch (inSelected.value) {
	case 1:
	    this.$.addRancherDialog.createComponent({
		kind : "catalogs.ranchers.enterprise.create",
		onAddRancher : "adoken",
		name : 'dynoco',
		flex : 1
	    }, {
		owner : this
	    });
	    break;
	case 2:
	    this.$.addRancherDialog.createComponent({
		kind : "catalogs.ranchers.person.create",
		onAddRancher : "adoken",
		name : 'dynoco',
		flex : 1
	    }, {
		owner : this
	    });
	    break;
	}
	this.$.addRancherDialog.render();
	this.$.addRancherDialog.openAtCenter();
    },
    contextMenuClicked : function(inSender, inEvent) {
	this.$.options.openAtEvent(inEvent);
	// inSender.stopPropagation();
	return false;
    },
    adoken : function() {
	this.$.rancher_id.setItems(cacheRanchers.getAllForList());
	this.resetValues();
	this.$.rancher_id.setIndex(this.$.dynoco.getJustCreated());
	this.$.addRancherDialog.close();
    }
});