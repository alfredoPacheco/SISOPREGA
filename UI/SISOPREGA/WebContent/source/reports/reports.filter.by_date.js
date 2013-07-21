enyo.kind({
	name : "reports.filter.by_date",
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
				    }
				 ]
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
	ready : function(){
	  this.resetValues();
	},
	getParams : function() {
	    var params = {
        	    start_date : "",
        	    end_date : ""
        	   };
		params.start_date = this.$.start_date.getValue();
		params.end_date = this.$.end_date.getValue();
		
		return params;
	},
	resetValues : function() {
		this.$.start_date.setValue(new Date());
		this.$.end_date.setValue(new Date());
	},
});