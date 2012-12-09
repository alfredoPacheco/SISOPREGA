/* Copyright 2009-2011 Hewlett-Packard Development Company, L.P. All rights reserved. */
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
				{kind: "Button", className: "enyo-button-cat", 	caption: "Editar", 		onclick:"doEdit" },
				{kind: "Button", className: "enyo-button-cat",	caption: "Contactos",	onclick:"doContacts"},
				{kind: "Button", className: "enyo-button-cat", 	caption: "Facturacion", onclick:"doBilling"},  
				{kind: "Spacer"}]}
	 ]
});