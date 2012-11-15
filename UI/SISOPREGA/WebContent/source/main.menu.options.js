enyo.kind({
	name: "main.menu.options",	
	kind: enyo.SlidingView,
	layoutKind: enyo.VFlexLayout,
	events: {
		onOperations:"",		
		onCatalogs:"",
		onReports:""
	},	
	components: [				
  		{kind: "Spacer"},
  		{kind: "Button",caption: "Operaciones",className: "enyo-button-blue",onclick:"doOperations"},
		{kind: "Button",caption: "Catalogos",className: "enyo-button-blue",onclick:"doCatalogs"},
		{kind: "Button",caption: "Reportes",className: "enyo-button-blue",onclick:"doReports"},  
		{kind: "Spacer"}]
});