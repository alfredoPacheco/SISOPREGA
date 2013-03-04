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
		{kind: enyo.Pane, onSelectView:"selectView",className:"buttonsBG", flex: 1, name: "mainPane", transitionKind: "enyo.transitions.LeftRightFlyin", 
	     style:"background-size: cover;",				 		
		 components:[	
			{kind:"main.menu.options", name:"menuOptions", className:"buttonsBG",style:"width:1030px;margin-left: auto;margin-right: auto;",
			flex: 1,
			onReceptions:"showReceptionsMap",
			onCatalogs:"showCatalogs", 
			onReports:"showReports",
			onInspectionForecast:"showInspectionForecast",
			onUsers:"showUsersList",
			onFileUpload:"showExpRequest"},
	 		
//			{kind:"catalogs.main", name:"catalogs",lazy:true},
//	 		{kind:"receptions.main", name:"receptions",lazy:true},				
//	 		{kind:"receptions.barnyards.map", name:"receptionsMap",lazy:true, flex:1},	 		
//	 		{kind:"reports.main", name:"reports",lazy:true},
//	 		{kind:"inspections.list", name:"inspections"},
//	 		{kind:"inspections.main.fs", name:"inspectionForecast", lazy:true},
//	 		{kind:"users.list", name:"usersList", onAddUser:"showAddUser", onSelectUser:"showEditUser", lazy:true },
//	 		{kind:"users.create", name:"addUser"},
//	 		{kind:"file.uploader", name:"fileUploader",lazy:true}	 		
		 ]}
	],
	showReceptionsMap:function(){
//		doReceptionsMap();
		enyo.$.sisoprega_btnGoBack.setShowing(1);
		_objMainHeader.setContent('Corrales');
		this.addGoBackAction("receptionsMap");	
		this.parent.selectViewByName("receptionsMap");		
	},	
	showCatalogs:function(){
		enyo.$.sisoprega_btnGoBack.setShowing(1);
//		enyo.$.sisoprega_spacerSecond.setShowing(!1);
		_objMainHeader.setContent('Catalogos');
		this.addGoBackAction("catalogs");
		this.parent.selectViewByName("catalogs");		
	},
	showReports:function(){
		enyo.$.sisoprega_btnGoBack.setShowing(1);
//		enyo.$.sisoprega_spacerSecond.setShowing(!1);
		_objMainHeader.setContent('Reportes');		
		this.addGoBackAction("reports");
		this.parent.selectViewByName("reports");
	},
	showInspectionForecast:function(){
		enyo.$.sisoprega_btnGoBack.setShowing(1);
//		enyo.$.sisoprega_spacerSecond.setShowing(!1);
		_objMainHeader.setContent('Lista de Inspección');
		this.addGoBackAction("inspectionForecast");
		this.parent.selectViewByName("inspectionForecast");
	},
	showUsersList : function(){
	  enyo.$.sisoprega_btnGoBack.setShowing(1);
//      enyo.$.sisoprega_spacerSecond.setShowing(!1);
      _objMainHeader.setContent('Lista de Usuarios');
      this.addGoBackAction("usersList");
      this.parent.selectViewByName("usersList");
	},
	showExpRequest: function(){
		  enyo.$.sisoprega_btnGoBack.setShowing(1);
//	      enyo.$.sisoprega_spacerSecond.setShowing(!1);
	      _objMainHeader.setContent('Cargar Pedimento');
	      this.addGoBackAction("fileUploader");
	      this.parent.selectViewByName("fileUploader");
	},	
	showAddUser : function(){
	  enyo.$.sisoprega_btnGoBack.setShowing(1);
//      enyo.$.sisoprega_spacerSecond.setShowing(!1);
      _objMainHeader.setContent('Agregar Usuario');
      _gobackStack.push(
          {
//            caption : _objMainHeader.getContent(),
        	  caption : "Menu Principal",
            paneMan : this.parent,
            paneName : "usersList"
          });
      this.parent.selectViewByName("addUser");
	},
	showEditUser : function(){
	  enyo.$.sisoprega_btnGoBack.setShowing(1);
//      enyo.$.sisoprega_spacerSecond.setShowing(!1);
      _objMainHeader.setContent('Editar Usuario');
      _gobackStack.push(
          {
//            caption : _objMainHeader.getContent(),
        	  caption : "Menu Principal",
            paneMan : this.parent,
            paneName : "usersList"
          });
      this.parent.selectViewByName("addUser");
	},
	addGoBackAction:function(nextView){		
		if(_gobackStack.length > 0){
			if(this.parent.getViewName()==nextView){
				return;
			}
		}
		_gobackStack.push({caption:"Menu Principal",paneMan:this.parent,paneName:"mainMenu"});	
		
	},
	selectView:function(inSender, inView, inPreviousView) {
		if(inView.name=="usersList"){
		  inView.updateList();
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

