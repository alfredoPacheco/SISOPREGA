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
  {
    kind: "Spacer"
  },
  {
    kind: "Button",
    className: "enyo-button-dark",
    caption: "Editar",
	onclick:"doEdit"
  },
  {
    kind: "Button",
    caption: "Contactos",
	className: "enyo-button-blue",	
	onclick:"doContacts"	
  },
  {
    kind: "Button",
    className: "enyo-button-dark",
    caption: "Facturacion",
	onclick:"doBilling"
  },  
  {
    kind: "Spacer"
  },
  {
    kind: "Toolbar",
    components: [
    ]
  }
]
});