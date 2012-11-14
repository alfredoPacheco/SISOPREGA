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
		{kind: "Spacer"},
		{kind: "Button", className: "enyo-button-blue", caption: "Ganaderos",onclick:"doRanchers"},
		{kind: "Button", className: "enyo-button-blue", caption: "Ganado",   onclick:"doCattle"},
		{kind: "Button", className: "enyo-button-blue", caption: "Corrales", onclick:"doBarnyards"},
		{kind: "Spacer"}
	]
});