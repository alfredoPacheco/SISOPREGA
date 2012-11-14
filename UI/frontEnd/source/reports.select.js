enyo.kind({
	name: "reports.select",	
	kind: enyo.SlidingView,
	layoutKind: enyo.VFlexLayout,
	events: {
		"onReceptions":""
	},	
	components: [
		{kind: "Spacer"},
		{kind: "Button", className: "enyo-button-blue", caption: "Ganado", onclick:"doReceptions"},
		{kind: "Spacer"}
	]
});