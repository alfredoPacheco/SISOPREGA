enyo.kind({
	name: "receptions.main.fs",
	kind: "SlidingPane",
	flex: 1, 
	multiViewMinWidth: 480, 
	components:[
		{kind: "receptions.barnyards.map"},			
	]
});
enyo.kind({
	name: "inspections.main.fs",
	kind: "Pane",
	flex: 1,
	components:[
		{kind: "inspection.forecast"},			
	]
});