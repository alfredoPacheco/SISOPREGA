enyo.kind({
    name : "operations.reception.form",
    kind : "forms.simple",
    entityKind : crudReception,
    create : function() {
	this.inherited(arguments);
	this.$.mainScroller.createComponents([ {
	    kind : "RowGroup",
	    name : "rowGroup",
	    defaultKind : "HFlexBox",
	    caption : "",
	    components : [ {
		kind : enyo.VFlexBox, // defaultKind: "HFlexBox",
		style : "padding:20px;",
		pack : "center",
		components : [ {
		    layoutKind : enyo.HFlexLayout,
		    align : "center",
		    height : "50px;",
		    components : [ {
			content : "Corrales:",
			width : "120px;",
			style : "text-align: right;margin-right:5px;"
		    }, {
			name : 'sBYs',
			kind : "ToolInput",
			style : "color:black",
			hint:"",
			flex : 1,
			bindTo:"penString"
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
			changeOnInput : true,
	    		bindTo : "dateAllotted"
		    } ]

		}, {
		    kind : enyo.HFlexBox,
		    align : "center",
		    height : "50px;",
		    components : [ {
			content : "Sr. Ganadero:",
			width : "120px;",
			style : "text-align: right;margin-right:5px;"
		    }, {
			kind : "controls.autocomplete",
			inputKind : "ToolInput",
			name : "rancher_id",
			hint : '',
			width : "500px;",
			height : "35px;",
			flex : 1,
			onEnter : "emularTabulacionConEnter",
	    		bindTo : "rancherId"
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
			width : "120px;",
			style : "text-align: right;margin-right:5px;"
		    }, {
			kind : "controls.autocomplete",
			inputKind : "ToolInput",
			name : "cattype_id",
			hint : '',
			width : "200px;",
			height : "35px;",
			flex : 1,
			onEnter : "emularTabulacionConEnter",
	    		bindTo : "cattleType"
		    }, ]
		},
		{
		    kind : enyo.HFlexBox,
		    align : "center",
		    height : "50px;",
		    components : [ {
			content : "Procedencia:",
			width : "120px;",
			style : "text-align: right;margin-right:5px;"
		    }, {
			kind : "controls.autocomplete",
			inputKind : "ToolInput",
			name : "location_id",
			hint : '',
			width : "200px;",
			height : "35px;",
			flex : 1,
			onEnter : "emularTabulacionConEnter",
	    		bindTo : "locationId"
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
			onEnter : "emularTabulacionConEnter",
	    		bindTo : "zoneId"
		    }, ]
		}, 
		{
		    kind : enyo.HFlexBox,
		    align : "center",
		    height : "50px;",
		    entityName:"ReceptionHeadcount",
		    components : [ {
			content : "No. Cabezas:",
			width : "120px;",
			style : "text-align: right;margin-right:5px;"
		    }, {
			kind : "ToolInput",
			name : "hc_aprox",
			hint : "",
			flex : 1,
			height : "35px;",
			changeOnInput : true,
			inputType : "number",
			onkeydown : "key_down",
	    		bindTo : "hc",
	    		belongsTo : "ReceptionHeadcount"
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
			onkeydown : "key_down",
	    		bindTo : "weight",
	    		belongsTo : "ReceptionHeadcount"
		    } ]
		} ]
	    } ]
	} ], {
	    owner : this
	});
    },
    resetValues:function(){
	cacheMan.showScrim();
	this.inherited(arguments);
	
	crudRancher.get(this, "readCallBack");
	crudEnterpriseRancher.get(this, "readCallBack");
	crudCattle.get(this, "readCallBack");
    },
    readCounter:0,
    readCallBack:function(){
	this.readCounter++;
	if(this.readCounter ==3){
	    this.loadAutocompletes();
	    this.readCounter=0;
	}
    },
    loadAutocompletes:function(){
	var arrAllRanchers = crudRancher.getList().join(crudEnterpriseRancher.getList());
	this.$.rancher_id.setItems(arrAllRanchers);	
	this.$.cattype_id.setItems(crudCattle.getList());
	this.$.location_id.setItems(cacheMan.getAllLocationsForList());
	this.$.zone_id.setItems(cacheMan.getAllZonesForList());
	cacheMan.hideScrim();
    }
});
