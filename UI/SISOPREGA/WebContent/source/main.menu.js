enyo.kind({
	name: "main.menu",
	kind: enyo.VFlexBox,
	className:"buttonsBG",
	pack:"center",
	tempFixCom:null,
	isEditing : false,
	events:{
		onUpdateLabel:"",
		onReceptionsMap:""
	},	
	components:[
		{kind: enyo.Pane,className:"buttonsBG", flex: 1, name: "mainPane", onSelectView:"selectView", transitionKind: "enyo.transitions.LeftRightFlyin", 
	     style:"background-size: cover;",				 		
		 components:[	
			{kind:"main.menu.options", name:"menuOptions", label:"Menu Principal", className:"buttonsBG",style:"width:1030px;margin-left: auto;margin-right: auto;",
			flex: 1,
			onReceptions:"showReceptionsMap",
			onCatalogs:"showCatalogs", 
			onReports:"showReports",
			onInspectionForecast:"showInspectionForecast",
			onUsers:"showUsersList",
			onFileUpload:"showExpRequest"},
	 		
			{kind:"catalogs.main", name:"catalogs", label:"Catálogos",lazy:true},
	 		{kind:"receptions.main", name:"receptions", label:"Recepciones",lazy:true},				
	 		{kind:"receptions.barnyards.map", name:"receptionsMap",label:"Corrales",lazy:true, flex:1},	 		
	 		{kind:"reports.main", name:"reports", label:"Reportes", lazy:true},
	 		{kind:"inspections.list", name:"inspections", label:"Inspecciones", },
	 		{kind:"inspections.main.fs", name:"inspectionForecast", label:"Lista de Inspección", lazy:true},
	 		{kind:"users.list", name:"usersList", label:"Lista de Usuarios", onAddUser:"showAddUser", onSelectUser:"showEditUser", lazy:true },
	 		{kind:"users.create", name:"addUser", label:"" },
	 		{kind:"file.uploader", name:"fileUploader",label:"Cargar Pedimento", lazy:true}	 		
		 ]}
	],
	showReceptionsMap:function(){
//		doReceptionsMap();
//		enyo.$.sisoprega_btnGoBack.setShowing(1);
//		_objMainHeader.setContent('Corrales');
//		this.addGoBackAction("receptionsMap");	
		this.$.mainPane.selectViewByName("receptionsMap");		
	},	
	showCatalogs:function(){
//		enyo.$.sisoprega_btnGoBack.setShowing(1);
//		enyo.$.sisoprega_spacerSecond.setShowing(!1);
//		_objMainHeader.setContent('Catalogos');
//		this.addGoBackAction("catalogs");
		this.$.mainPane.validateView("catalogs");
		this.$.catalogs.$.catalogsPane.selectViewByIndex(0);
		this.$.mainPane.selectViewByName("catalogs");	
		
	},
	showReports:function(){
//		enyo.$.sisoprega_btnGoBack.setShowing(1);
//		enyo.$.sisoprega_spacerSecond.setShowing(!1);
//		_objMainHeader.setContent('Reportes');		
//		this.addGoBackAction("reports");
		this.$.mainPane.selectViewByName("reports");
	},
	showInspectionForecast:function(){
//		enyo.$.sisoprega_btnGoBack.setShowing(1);
//		enyo.$.sisoprega_spacerSecond.setShowing(!1);
//		_objMainHeader.setContent('Lista de Inspección');
//		this.addGoBackAction("inspectionForecast");
		this.$.mainPane.selectViewByName("inspectionForecast");
	},
	showUsersList : function(){
//	  enyo.$.sisoprega_btnGoBack.setShowing(1);
//      enyo.$.sisoprega_spacerSecond.setShowing(!1);
//      _objMainHeader.setContent('Lista de Usuarios');
//      this.addGoBackAction("usersList");
      this.$.mainPane.selectViewByName("usersList");
	},
	showExpRequest: function(){
//		  enyo.$.sisoprega_btnGoBack.setShowing(1);
//	      enyo.$.sisoprega_spacerSecond.setShowing(!1);
//	      _objMainHeader.setContent('Cargar Pedimento');
//	      this.addGoBackAction("fileUploader");
	      this.$.mainPane.selectViewByName("fileUploader");
	},	
	showAddUser : function(){
//	  enyo.$.sisoprega_btnGoBack.setShowing(1);
//      enyo.$.sisoprega_spacerSecond.setShowing(!1);
      
//      _gobackStack.push(
//          {
////            caption : _objMainHeader.getContent(),
//        	  caption : "Menu Principal",
//            paneMan : this.$.mainPane,
//            paneName : "usersList"
//          });
      this.$.mainPane.selectViewByName("addUser");
      _objMainHeader.setContent('Agregar Usuario');
	},
	showEditUser : function(){
//	  enyo.$.sisoprega_btnGoBack.setShowing(1);
//      enyo.$.sisoprega_spacerSecond.setShowing(!1);
      
//      _gobackStack.push(
//          {
////            caption : _objMainHeader.getContent(),
//        	  caption : "Menu Principal",
//            paneMan : this.$.mainPane,
//            paneName : "usersList"
//          });
      this.$.mainPane.selectViewByName("addUser");
      _objMainHeader.setContent('Editar Usuario');
	},
//	addGoBackAction:function(nextView){		
//		if(_gobackStack.length > 0){
//			if(this.$.mainPane.getViewName()==nextView){
//				return;
//			}
//		}
//		_gobackStack.push({caption:"Menu Principal",paneMan:this.$.mainPane,paneName:"mainMenu"});	
//		
//	},
	selectView:function(inSender, inView, inPreviousView) {
		
		if(inView.name == inPreviousView.name){
			return;
		}
		if(_navigatingBack==false){
			_gobackStack.push({	caption: inPreviousView.label,
								paneMan:  inPreviousView.parent,
								paneName: inPreviousView.name     });
			
		}
		_navigatingBack = false;
		_objMainHeader.setContent(inView.label);
		if(inView.label == "Menu Principal"){
			_goBackButton.setShowing(!1);
			_objMainHeader.setStyle("color:#FFF;border:none;font-size:15px; text-align:center;min-width:150px;");
			_gobackStack = [];
		}else{
			_goBackButton.setShowing(1);
		}
		
		switch(inView.name){
		case "inspectionForecast":
			inView.$.forecast.resetValues();
			break;
		case "usersList":
			inView.updateList();
			break;
		case "catalogs":
			_objMainHeader.setContent(inView.$.catalogsPane.getView().label);
			break;
		}
		if(inPreviousView){
			if(inPreviousView.name == "usersList" && inView.name != "menuOptions"){
			  var selectedUser = inPreviousView.getSelectedUser();
			  if(selectedUser)
			    inView.setUser(selectedUser);
			  else
			    inView.toggleAdd();
			}
		}
	}
	
});

