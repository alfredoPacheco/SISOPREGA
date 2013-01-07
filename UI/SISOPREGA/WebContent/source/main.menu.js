enyo.kind({
	name: "main.menu",
	kind: enyo.VFlexBox,
	events:{
		onUpdateLabel:"",
	},	
	     style:"background-image: url(images/practice_background.png); background-size: cover;",				 	
	components:[
		{kind: enyo.Pane, flex: 1, name: "mainPane",
	     style:"background-image: url(images/practice_background.png); background-size: cover;",				 		
		 components:[	
			{kind:"main.menu.options", name:"menuOptions",
	     style:"background-image: url(images/practice_background.png); background-size: cover;",				 			
			flex: 1, 
			onOperations:"showOperations",
			onReceptions:"showReceptionsMap",
			onCatalogs:"showCatalogs", 
			onReports:"showReports",
			onInspectionForecast:"showInspectionForecast"},
	 		{kind:"operations.menu", name:"operations", onReceptions:"showReceptions", 
			 onInspections:"showInspections",lazy:true},
	 		{kind:"catalogs.main", name:"catalogs",lazy:true},
	 		{kind:"receptions.main", name:"receptions",lazy:true},				
	 		{kind:"receptions.main.fs", name:"receptionsMap",lazy:true},	
	 		{kind:"reports.main", name:"reports",lazy:true},
	 		{kind:"inspections.list", name:"inspections"},
	 		{kind:"inspection.forecast", name:"inspectionForecast", lazy:true}
		 ]}
	],
	showReceptionsMap:function(){
		enyo.$.sisoprega_btnGoBack.setShowing(1);
		enyo.$.sisoprega_spacerSecond.setShowing(!1);
		_objMainHeader.setContent('Corrales');
		_gobackStack.push({caption:"Menu Principal",paneMan:this.$.mainPane,paneName:"menuOptions"});	
		this.$.mainPane.selectViewByName("receptionsMap");		
	},	
	showCatalogs:function(){
		enyo.$.sisoprega_btnGoBack.setShowing(1);
		enyo.$.sisoprega_spacerSecond.setShowing(!1);
		_objMainHeader.setContent('Catalogos');
		this.addGoBackAction();
		this.$.mainPane.selectViewByName("catalogs");		
	},
	showReports:function(){
		enyo.$.sisoprega_btnGoBack.setShowing(1);
		enyo.$.sisoprega_spacerSecond.setShowing(!1);
		_objMainHeader.setContent('Reportes');		
		this.addGoBackAction();
		this.$.mainPane.selectViewByName("reports");
	},
	showInspectionForecast:function(){
		enyo.$.sisoprega_btnGoBack.setShowing(1);
		_objMainHeader.setContent('Lista de Inspección');
		this.addGoBackAction();
		this.$.mainPane.selectViewByName("inspectionForecast");
	},
	addGoBackAction:function(){		
		_gobackStack.push({caption:"Menu Principal",paneMan:this.$.mainPane,paneName:"menuOptions"});		
	}
});

