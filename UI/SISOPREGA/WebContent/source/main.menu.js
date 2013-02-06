enyo.kind({
	name: "main.menu",
	kind: enyo.VFlexBox,
	className:"buttonsBG",
	pack:"center",
	tempFixCom:null,
	events:{
		onUpdateLabel:"",
	},	
//	     style:"background-image: url(images/practice_background.png); background-size: cover;",				 	
	components:[
		{kind: enyo.Pane, className:"buttonsBG", flex: 1, name: "mainPane", transitionKind: "enyo.transitions.LeftRightFlyin", 
	     style:"background-size: cover;",				 		
		 components:[	
			{kind:"main.menu.options", name:"menuOptions", className:"buttonsBG",style:"width:1030px;margin-left: auto;margin-right: auto;",
			flex: 1,
			onOperations:"showOperations",
			onReceptions:"showReceptionsMap",
			onCatalogs:"showCatalogs", 
			onReports:"showReports",
			onInspectionForecast:"showInspectionForecast",
			onUsers:"showUsersList"},
	 		
			{kind:"operations.menu", name:"operations", onReceptions:"showReceptions", 
			 onInspections:"showInspections",lazy:true},
	 		{kind:"catalogs.main", name:"catalogs",lazy:true},
	 		{kind:"receptions.main", name:"receptions",lazy:true},				
	 		{kind:"receptions.barnyards.map", name:"receptionsMap",lazy:true, flex:1},	 		
	 		{kind:"reports.main", name:"reports",lazy:true},
	 		{kind:"inspections.list", name:"inspections"},
	 		{kind:"inspections.main.fs", name:"inspectionForecast", lazy:true}
		 ]}
	],
	showReceptionsMap:function(){
		enyo.$.sisoprega_btnGoBack.setShowing(1);
		enyo.$.sisoprega_spacerSecond.setShowing(!1);
		_objMainHeader.setContent('Corrales');
		this.addGoBackAction();	
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
		enyo.$.sisoprega_spacerSecond.setShowing(!1);
		_objMainHeader.setContent('Lista de Inspección');
		this.addGoBackAction();
		this.$.mainPane.selectViewByName("inspectionForecast");
	},
	showUsersList : function(){
	  enyo.$.sisoprega_btnGoBack.setShowing(1);
      enyo.$.sisoprega_spacerSecond.setShowing(!1);
      _objMainHeader.setContent('Lista de Usuarios');
      this.addGoBackAction();
      this.$.mainPane.selectViewByName("usersList");
      if(this.tempFixCom==null){
    	  this.tempFixCom=this.$.mainPane.createComponent({kind:"users.list", name:"usersList"},{owner: this});    	  
      }
      this.$.usersList.updateList();
	},
	addGoBackAction:function(){		
		_gobackStack.push({caption:"Menu Principal",paneMan:this.$.mainPane,paneName:"menuOptions"});		
	}
});

