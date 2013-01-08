enyo.kind({
	name: "main.menu.options",	
	kind: enyo.SlidingView,
	layoutKind: enyo.VFlexLayout,
	align:"center",
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
			{kind: "IconButton", caption: "Operaciones", className: "enyo-button-option", style:"width:75px;height:75px;", onclick:"doReceptions"},		
			{kind: "IconButton",caption: "Catalogos",className: "enyo-button-option", style:"width:75px;height:75px;", onclick:"doCatalogs",},
			{kind: "IconButton",caption: "Reportes",className: "enyo-button-option", style:"width:75px;height:75px;", onclick:"doReports"}]
		},
		{kind: enyo.HFlexBox,
			 className:"buttonsBG",		
		     flex: 1,
			 align:"left",	    
			 components: [				
				{kind: "IconButton", caption:"Lista de Inspección", className:"enyo-button-option", style:"width:75px;height:75px;", onclick:"doInspectionForecast"},
				{kind: "Spacer"},
				{kind: "Spacer"}]
			},
			{kind: enyo.HFlexBox,
				 className:"buttonsBG",		
			     flex: 1,
				 align:"left",	    
				 components: [				
					{kind: "Spacer"},
					{kind: "Spacer"},
					{kind: "Spacer"}]
				}]
});