enyo.kind({
	name: "reports.select",	
	kind: enyo.SlidingView,
	layoutKind: enyo.VFlexLayout,
	events: {
		"onReceptions":""
	},	
	className:"buttonsBG",
	components: [
		{kind: enyo.VFlexBox,
		 className:"buttonsBG",
	     flex: 1,
		 align:"center",	    
		 components: [			
			{kind: "Spacer"},
			{kind: "Button", className: "enyo-button-option", caption: "Ganado", onclick:"doReceptions"},
			{kind: "Spacer"}]}
	]
});