enyo.kind({
	name: "reports.select",	
	kind: enyo.SlidingView,
	layoutKind: enyo.VFlexLayout,
	events: {
		onReceptions : "",
		onInspections : "",
		onFeed: "",
		onActiveReceptions : ""
	},	
	className:"buttonsBG",
	components: [
		{kind: enyo.VFlexBox,
		 className:"buttonsBG",
	     flex: 1,
		 align:"center",	    
		 components: [			
			{kind: "Spacer"},
			{kind: "Button", className: "enyo-button-option", caption: "Ganado Recibido", onclick:"doReceptions"},
			{kind: "Button", className: "enyo-button-option", caption: "Ganado en Corrales", onclick:"doActiveReceptions"},
			{kind: "Button", className: "enyo-button-option", caption: "Ganado Inspeccionado", onclick:"doInspections"},
			{kind: "Button", className: "enyo-button-option", caption: "Reporte de Alimento", onclick:"doFeed"},
			{kind: "Spacer"}]}
	]
});