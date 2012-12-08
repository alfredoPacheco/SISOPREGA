enyo.kind({
	name: "catalogs.menu",	
	kind: enyo.SlidingView,
	layoutKind: enyo.VFlexLayout,
	events: {
		onRanchers:"",
		onBarnyards:"",
		onCattle:""
	},	
	components: [
		{kind: enyo.VFlexBox,
		 className:"buttonsBG",
	     flex: 1,
		 align:"center",	    
		 components: [		
			{kind: "Spacer"},
			{kind: "Button", className: "enyo-button-cat", caption: "Ganaderos",onclick:"doRanchers"},
			{kind: "Button", className: "enyo-button-cat", caption: "Ganado",   onclick:"doCattle"},
			{kind: "Button", className: "enyo-button-cat", caption: "Corrales", onclick:"doBarnyards"},
			{kind: "Spacer"}]}
	]
});