enyo.kind({
	name: "catalogs.menu",	
	kind: enyo.VFlexBox,
	events: {
		onRanchers:"",		
		onCattle:"",
		onContacts:""
		    
	},	
	components: [
		{kind: enyo.VFlexBox,
		 className:"buttonsBG",
	     flex: 1,
		 align:"center",	    
		 components: [		
			{kind: "Spacer"},
			{kind: "Button", className: "enyo-button-cat", caption: "Ganaderos",onclick:"doRanchers"},
			{kind: "Spacer"}
			]},
			
	]
});