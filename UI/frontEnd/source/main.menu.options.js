enyo.kind({
	name: "main.menu.options",	
	kind: enyo.SlidingView,
	layoutKind: enyo.VFlexLayout,
	events: {
		onReceptions:"",	
		onOperations:"",				
		onCatalogs:"",
		onReports:""
	},	
	components: [				
		{kind: enyo.VFlexBox,
		 className:"buttonsBG",		
	     flex: 1,
		 align:"center",	    
		 components: [	
			{kind: "Spacer"},
			{kind: "Button",caption: "Recepciones",
			 className: "enyo-button-option",onclick:"doReceptions"},		
			{kind: "Button",caption: "Catalogos",className: "enyo-button-option",onclick:"doCatalogs",},
			{kind: "Button",caption: "Reportes",className: "enyo-button-option",onclick:"doReports"},  
			{kind: "Spacer"}]
		}]
});