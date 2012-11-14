enyo.kind({
	name: "main.menu",
	kind: enyo.VFlexBox,
	events:{
		onUpdateLabel:"",
	},	
	components:[
		{kind: enyo.Pane, flex: 1, name: "mainPane",
		 components:[	
			{kind:"main.menu.options", name:"menuOptions",flex: 1, onOperations:"showOperations",
			 onCatalogs:"showCatalogs", onReports:"showReports"},
	 		{kind:"operations.menu", name:"operations", onReceptions:"showReceptions", 
			 onInspections:"showInspections",lazy:true},
	 		{kind:"catalogs.main", name:"catalogs",lazy:true},
	 		{kind:"receptions.main", name:"receptions",lazy:true},	
	 		{kind:"reports.main", name:"reports",lazy:true},
	 		{kind:"inspections.list", name:"inspections"},									
		 ]}				 			
	],
	showOperations:function(){
		_objMainHeader.setContent('Operaciones');
		this.addGoBackAction();
		this.$.mainPane.selectViewByName("operations");
	},
	showCatalogs:function(){
		_objMainHeader.setContent('Catalogos');
		this.addGoBackAction();
		this.$.mainPane.selectViewByName("catalogs");		
	},	
	showReports:function(){
		_objMainHeader.setContent('Reportes');		
		this.addGoBackAction();
		this.$.mainPane.selectViewByName("reports");
		
	},		
	showReceptions:function(){
		_objMainHeader.setContent('Recepciones');
		_gobackStack.push({caption:"Operaciones",paneMan:this.$.mainPane,paneName:"operations"});	
		this.$.mainPane.selectViewByName("receptions");		
	},
	showInspections:function(){
		_objMainHeader.setContent('Inspecciones');
		_gobackStack.push({caption:"Operaciones",paneMan:this.$.mainPane,paneName:"operations"});
		this.$.inspections.updateList();
		this.$.mainPane.selectViewByName("inspections");		
	},
	addGoBackAction:function(){
		_gobackStack.push({caption:"Menu Principal",paneMan:this.$.mainPane,paneName:"menuOptions"});		
	}
});

