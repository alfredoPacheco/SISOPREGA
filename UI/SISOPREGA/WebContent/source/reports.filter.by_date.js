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
			style : "color:#FFF",
			components : [ {
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
	getParams : function() {
		var fmt = new enyo.g11n.DateFmt({
			format : "dd/MM/yyyy",
			locale : new enyo.g11n.Locale("es_es")
		});
		var params = {
			start_date : "",
			end_date : ""
		};
		params.start_date = fmt.format(this.$.start_date.getValue());
		params.end_date = fmt.format(this.$.end_date.getValue());
		
		return params;
	},
	resetValues : function() {
		this.$.start_date.setValue(new Date());
		this.$.end_date.setValue(new Date());
	},
});