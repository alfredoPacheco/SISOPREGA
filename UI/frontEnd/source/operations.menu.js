enyo.kind({
	name: "operations.menu",	
	kind: enyo.SlidingView,
	layoutKind: enyo.VFlexLayout,
	events: {
		onReceptions:"",
		onInspections:""
		
	},	
	components: [
		{kind: "Spacer"},
		{kind: "Button", className: "enyo-button-blue", caption: "Recepciones",	onclick:"doReceptions"},
		{kind: "Button", className: "enyo-button-blue", caption: "Inspecciones",onclick:"doInspections"},
		{kind: "Spacer"}
]
});