enyo.kind({
	name: "main.menu",
	kind: enyo.VFlexBox,
	className:"buttonsBG",
	pack:"center",
	tempFixCom:null,
	isEditing : false,
	events:{
		onUpdateLabel:"",
	},	
	components:[
		{kind: enyo.Pane, onSelectView:"selectView",className:"buttonsBG", flex: 1, name: "mainPane", transitionKind: "enyo.transitions.LeftRightFlyin", 
	     style:"background-size: cover;",				 		
		 components:[	
			{kind:"main.menu.options", name:"menuOptions", className:"buttonsBG",style:"width:1030px;margin-left: auto;margin-right: auto;",
			flex: 1,
			onOperations:"showOperations",
			onReceptions:"showReceptionsMap",
			onCatalogs:"showCatalogs", 
			onReports:"showReports",
			onInspectionForecast:"showInspectionForecast",
			onUsers:"showUsersList",
			onFileUpload:"showFileUpload"},
	 		
			{kind:"operations.menu", name:"operations", onReceptions:"showReceptions", 
			 onInspections:"showInspections",lazy:true},
	 		{kind:"catalogs.main", name:"catalogs",lazy:true},
	 		{kind:"receptions.main", name:"receptions",lazy:true},				
	 		{kind:"receptions.barnyards.map", name:"receptionsMap",lazy:true, flex:1},	 		
	 		{kind:"reports.main", name:"reports",lazy:true},
	 		{kind:"inspections.list", name:"inspections"},
	 		{kind:"inspections.main.fs", name:"inspectionForecast", lazy:true},
	 		{kind:"users.list", name:"usersList", onAddUser:"showAddUser", onSelectUser:"showEditUser", lazy:true },
	 		{kind:"users.create", name:"addUser"},
	 		{kind:"file.uploader", name:"fileUploader",lazy:true}	 		
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
	},
	showFileUpload: function(){
		  enyo.$.sisoprega_btnGoBack.setShowing(1);
	      enyo.$.sisoprega_spacerSecond.setShowing(!1);
	      _objMainHeader.setContent('Subir Archivo');
	      this.addGoBackAction();
	      this.$.mainPane.selectViewByName("fileUploader");
	},	
	showAddUser : function(){
	  enyo.$.sisoprega_btnGoBack.setShowing(1);
      enyo.$.sisoprega_spacerSecond.setShowing(!1);
      _objMainHeader.setContent('Agregar Usuario');
      _gobackStack.push(
          {
            caption : _objMainHeader.getContent(),
            paneMan : this.$.mainPane,
            paneName : "usersList"
          });
      this.$.mainPane.selectViewByName("addUser");
	},
	showEditUser : function(){
	  enyo.$.sisoprega_btnGoBack.setShowing(1);
      enyo.$.sisoprega_spacerSecond.setShowing(!1);
      _objMainHeader.setContent('Editar Usuario');
      _gobackStack.push(
          {
            caption : _objMainHeader.getContent(),
            paneMan : this.$.mainPane,
            paneName : "usersList"
          });
      this.$.mainPane.selectViewByName("addUser");
	},
	addGoBackAction:function(){		
		_gobackStack.push({caption:"Menu Principal",paneMan:this.$.mainPane,paneName:"menuOptions"});		
	},
	selectView:function(inSender, inView, inPreviousView) {
		if(inView.name=="usersList"){
		  inView.updateList();
		}
		if(inPreviousView.name == "usersList" && inView.name != "menuOptions"){
		  var selectedUser = inPreviousView.getSelectedUser();
		  if(selectedUser)
		    inView.setUser(selectedUser);
		  else
		    inView.toggleAdd();
		}
	}
	
});

