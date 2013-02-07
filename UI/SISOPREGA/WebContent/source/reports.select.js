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
			{kind: "Button", className: "enyo-button-option", caption: "Ganado Recibido", onclick:"doReceptions"},
			{kind: "Button", className: "enyo-button-option", caption: "Ganado Inspecionado", onclick:"doReceptions"},
			{kind: "Button", className: "enyo-button-option", caption: "Ganado Recibido por Ganadero", onclick:"doReceptions"},
			{kind: "Button", className: "enyo-button-option", caption: "Reporte de Alimento", onclick:"doReceptions"},
			{kind: "Spacer"}]}
	]
});