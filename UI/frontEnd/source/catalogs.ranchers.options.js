enyo.kind({
	name: "catalogs.ranchers.options",	
	kind: enyo.SlidingView,
	layoutKind: enyo.VFlexLayout,
	events: {
		"onEdit":"",
		"onContacts":"",		
		"onBilling": "",
	},	
	components: [
		{kind: enyo.VFlexBox,
		 className:"buttonsBG",
	     flex: 1,
		 align:"center",	    
		 components: [		
			{kind: "Spacer"},
			{kind: "Button",className: "enyo-button-option",caption: "Editar",onclick:"doEdit"},
			{kind: "Button",caption: "Contactos",className: "enyo-button-option",	onclick:"doContacts"},
			{kind: "Button",className: "enyo-button-option",caption: "Facturacion",onclick:"doBilling"},  
			{kind: "Spacer"}]}]
});