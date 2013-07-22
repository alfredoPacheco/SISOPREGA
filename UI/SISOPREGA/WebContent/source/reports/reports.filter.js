enyo.kind({
    name : "reports.filter",
    kind : enyo.VFlexBox,
    events : {
	"onGetReport" : ""
    },
    components : [ {
	kind : enyo.Scroller,
	className : "formBG",
	flex : 1,
	components : [ {
	    kind : "RowGroup",
	    defaultKind : "HFlexBox",
	    caption : "",
	    style : "color:black",
	    components : [ {
		kind : "Item",
		components : [ {
		    content : "Ganadero",
		    className : "",
		    flex : 1
		}, {
		    kind : "controls.autocomplete",
		    inputKind : "ToolInput",
		    name : "rancher_id",
		    hint : "",
		    flex : 1
		} ]
	    }, {
		kind : "HFlexBox",
		style : "",
		align:"center",
		components : [ {
		    content : "Fecha Inicial",
		}, 
		{
		    kind : "controls.dateMask",
		    inputKind : "ToolInput",
		    name : "start_date",
		    bindTo : "birthDate",
		    style:"max-width:130px;"
		    } ]
	    }, {
		kind : "HFlexBox",
		style : "",
		align:"center",
		components : [ {
		    content : "Fecha Final",
		}, 
		{
		    kind : "controls.dateMask",
		    inputKind : "ToolInput",
		    name : "end_date",
		    bindTo : "birthDate",
		    style:"max-width:130px;"
		    } 
		],
	    } ]
	}, {
	    kind : "Button",
	    className : "enyo-button-affirmative",
	    flex : 1,
	    caption : "Reporte",
	    onclick : "doGetReport"
	}, ]
    } ],
    ready : function() {
	cacheMan.showScrim();
	crudRancher.get(this, "crudsCallBack");
	crudEnterpriseRancher.get(this, "crudsCallBack");
    },
    crudResponses : 0,
    crudsCallBack : function(){
	this.crudResponses++;
	if(this.crudResponses == 2){
	    this.crudResponses = 0;
	    this.loadAutoCompletes();
	}
    },
    loadAutoCompletes : function(){
	var allRanchers = crudRancher.getList().concat(crudEnterpriseRancher.getList());
	this.$.rancher_id.setItems(allRanchers);
	
	this.resetValues();
    },
    getParams : function() {
	var params = {
	    rancher_id : "",
	    start_date : "",
	    end_date : ""
	};
	params.rancher_id = this.$.rancher_id.getIndex();
	params.start_date = this.$.start_date.getValue();
	params.end_date = this.$.end_date.getValue();
	;
	return params;
    },
    resetValues : function() {
	this.$.rancher_id.setIndex(-1);
	this.$.start_date.setValue(new Date());
	this.$.end_date.setValue(new Date());
	cacheMan.hideScrim();
    },
});