enyo.kind({
	name: "main.menu.options",	
	kind: enyo.SlidingView,
	layoutKind: enyo.VFlexLayout,
	events: {
		onReceptions:"",
		onOperations:"",		
		onCatalogs:"",
		onReports:"",
		onInspectionForecast:""
	},	
	components: [				
		{kind: enyo.HFlexBox,
		 className:"buttonsBG",		
	     flex: 1,
		 align:"left",	    
		 components: [
			{kind: "IconButton", caption: "Recepciones", className: "enyo-button-option", style:"width:100px;height:100px;", onclick:"doReceptions"},		
			{kind: "IconButton",caption: "Catalogos",className: "enyo-button-option", style:"width:100px;height:100px;", onclick:"doCatalogs",},
			{kind: "IconButton",caption: "Reportes",className: "enyo-button-option", style:"width:100px;height:100px;", onclick:"doReports"},
			{kind: "IconButton", caption:"Lista de Inspección", className:"enyo-button-option", style:"width:100px;height:100px;", onclick:"doInspectionForecast"},
			{kind: "Spacer"}]
		}]
});