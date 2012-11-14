enyo.kind({
	name: "reports.main",
	kind: enyo.VFlexBox,	
	iProduct:"",
	components: [
		{ kind: enyo.Pane, flex: 1, name: "mainPane",
		 components:[
			{kind:"reports.select",name:"selection", onReceptions:"showReceptions"},			
			{kind:"reports.receptions",name:"receptions",onGetReport:"showReceptionsResults"},	
			{kind:"reports.receptions.list",name:"receptionsList"},												
		 ]},		 
	],
	showReceptions:function(){
		_objMainHeader.setContent('Recepciones');		
		this.addGoBackAction();
		this.$.mainPane.selectViewByName("receptions");
	},	
	showReceptionsResults:function(){
		this.addGoBackAction();
		this.$.receptionsList.updateList();
		this.$.mainPane.selectViewByName("receptionsList");		
	},
	addGoBackAction:function(){
		_gobackStack.push({caption:"Reportes",paneMan:this.$.mainPane,paneName:"selection"});		
	}	
});
