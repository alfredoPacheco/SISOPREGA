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
					name : "rancher_id",
					hint:"",
					flex:1,
					contentPack:"end"
				 } ]
			}, {
				kind : "VFlexBox",
				style : "",
				components : [ {
					content : "Fecha Inicial",
				}, {
					kind : "DatePicker",
					name : "start_date",
					label : "",
					inputClassName : "blankInput",
					focusClassName : "darkFocus",
					changeOnInput : true
				} ]
			}, {
				kind : "VFlexBox",
				style : "",
				components : [ {
					content : "Fecha Final",
				}, {
					kind : "DatePicker",
					name : "end_date",
					label : "",
					inputClassName : "blankInput",
					focusClassName : "darkFocus",
					changeOnInput : true
				} ],
			} ]
		}, {
			kind : "Button",
			className : "enyo-button-affirmative",
			flex : 1,
			caption : "Reporte",
			onclick : "doGetReport"
		}, ]
	} ],
	ready:function(){
		this.$.rancher_id.setItems(cacheRanchers.getAllForList());
		this.resetValues();
	},
	getParams : function() {
		var fmt = new enyo.g11n.DateFmt({
			format : "dd/MM/yyyy",
			locale : new enyo.g11n.Locale("es_es")
		});
		var params = {
			rancher_id : "",
			start_date : "",
			end_date : ""
		};
		params.rancher_id = this.$.rancher_id.getIndex();
		params.start_date = fmt.format(this.$.start_date.getValue());
		params.end_date = fmt.format(this.$.end_date.getValue());
		;
		return params;
	},
	resetValues : function() {
		this.$.rancher_id.setIndex(-1);
		this.$.start_date.setValue(new Date());
		this.$.end_date.setValue(new Date());
		this.$.rancher_id.setItems(cacheRanchers.ls());
	},
});