enyo.kind({
	name: "receptions.options",	
	kind: enyo.SlidingView,
	layoutKind: enyo.VFlexLayout,
	events: {
		"onWeights":"",		
		"onBarnyards": "",
		"onGoback":"",
		"onEdit":""
	},	
	components: [
	  {kind: "Spacer"},
      {kind: "Button", className: "enyo-button-blue", caption: "Editar",onclick:"doEdit"},
  	  {kind: "Button", className: "enyo-button-blue", caption: "Asignar Pesos", onclick:"doWeights"},
      {kind: "Button", className: "enyo-button-blue", caption: "Asignar Corrales",onclick:"doBarnyards"},
  	  {kind: "Spacer"}]
});