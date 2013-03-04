enyo.kind(
  {
    name : "sisoprega",
    kind : enyo.VFlexBox,
    components :
      [
       		
        //SCRIM
        {
          kind : enyo.Scrim,
          name : "scrimMain",
          layoutKind : enyo.VFlexLayout,
          align : "center",
          pack : "center",
          components :
            [
              {
                kind : "SpinnerLarge"
              }, {
                kind:"LabeledContainer",
                label : "Cargando ...",
                style : "font-family:'Courier New', monospace;font-size:xx-large;color:white;"
              } ]
        },
        {
          kind : "Toolbar",
          name : "tbHeader",
          style : "max-height:10px",
          className : "headerMain",
          components :
            [
             {kind: "AppMenu", name:"menu", width:"300px", components: [
                                            {caption: "Operaciones", onclick: "open_view"},
                                            {caption: "Catálogos", components: [
                                                {caption: "Ganaderos", onclick: "open_view"},
                                                {caption: "Ganado", onclick: "open_view"}
                                            ]},
                                            {caption: "Reportes", onclick: "open_view"},
                                            {caption: "Lista de Inspección", onclick: "open_view"},
                                            {caption: "Usuarios", onclick: "open_view"},
                                            {caption: "Carga de Pedimento", onclick: "open_view"}
//                                            {caption: "Ver reporte embebido", onclick: "open_view"}
                                        ]},
              {
                name : 'btnGoBack',
                icon : "images/command-menu/menu-icon-back.png",
                onclick : "goBack",
//                flex : 2
              },
              {
                  name : 'btnMenu',
                  icon : "images/icon-arrows-down.png",                  
                  onclick : "open_menu",
//                  flex : 2
                },
//              {
//                kind : "Spacer",
////                flex : 1,
//                name : "spacerSecond"
//              },
              {
                kind : "VFlexBox",
                name : 'lblMainCap',
                allowHtml : true,
                flex : 1,
                style : "color:#FFF;border:none;font-size:15px; text-align:center;min-width:150px;",
                content : "Menu Principal"
              },
//              {
//                kind : "Spacer",
////                flex : 1,
//                name : "spacerThird"
//              },
              {
                name : 'btnLogOut',
//                flex : 1,
                onclick : "logOut",
                icon : "images/command-menu/icon-context.png"
              } ]
        },
        {
          kind : enyo.Pane,
          flex : 1,
          name : "mainPane",
          onSelectView:"selectView",
          transitionKind : "enyo.transitions.LeftRightFlyin",
          components :
            [
              {
                kind : "login",
                name : "login",
                onSucess : "goAhead",
                onFail : "noAccess"
              },
              {
                kind : "main.menu",
                name : "mainMenu"
              },
              {kind:"receptions.barnyards.map", name:"receptionsMap",lazy:true, flex:1},
              {kind:"catalogs.cattle",name:"catCattle", lazy:true},
              {kind:"catalogs.ranchers",name:"catRanchers", lazy:true},
              {kind:"reports.main", name:"reports",lazy:true},
              {kind:"inspections.main.fs", name:"inspectionForecast", lazy:true},
              {kind:"users.list", name:"usersList", onAddUser:"showAddUser", onSelectUser:"showEditUser", lazy:true },
              {kind:"users.create", name:"addUser", lazy:true},
              {kind:"file.uploader", name:"fileUploader",lazy:true},
//              {kind:"report.viewer", name:"report_viewer",lazy:false}
  			]
        },
        {
          kind : enyo.Dialog,
          name : "toastMain",
          flyInFrom : "bottom",
          lazy : false,
          scrim : true,
          components :
            [
              {
                style : "padding: 12px",
                content : "Alerta"
              },
              {
                name : "msgMain",
                style : "padding: 12px; font-size: 14px; width:100%;height:100%;",
                content : ""
              } ]
        } ],
    ready : function() {
      this.$.tbHeader.hide();
      cacheMan.setGlobalToaster(this.$);
      cacheMan.setGlobalScrim(this.$.scrimMain);
      cacheMan.setGlobalLabel(this.$.lblMainCap);
      _objMainHeader = this.$.lblMainCap;
//      reportViewer = this.$.report_viewer;
     
      
    },
    goBack : function() {
      cacheMan.goBack();
      if (_objMainHeader.getContent() == "Menu Principal") {
        this.$.btnGoBack.setShowing(!1);
//        enyo.$.sisoprega_spacerSecond.setShowing(1);
        _objMainHeader.setStyle("color:#FFF;border:none;font-size:15px; text-align:center;min-width:150px;");
      } else {
        this.$.btnGoBack.setShowing(1);
//        enyo.$.sisoprega_spacerSecond.setShowing(!1);
      }

    },
    goAhead : function() {
      this.$.btnGoBack.setShowing(!1);
//      enyo.$.sisoprega_spacerSecond.setShowing(1);
      this.$.tbHeader.show();
      this.$.mainPane.selectViewByName("mainMenu");
    },
    noAccess : function() {
      cacheMan.setMessage("", "Usuario o contraseña incorrecta.");
    },
    logOut : function() {
      consumingGateway.LogOut();
    },
    open_menu : function(){
    	this.$.menu.openAroundControl(this.$.btnMenu,"", "left");
    },
    addGoBackAction:function(){
		_gobackStack.push({caption:_objMainHeader.getContent(),paneMan:this.$.mainPane,paneName:this.$.mainPane.getViewName()});		
	},
    open_view : function(InSender, InEvent){
    	
    	switch(InSender.caption){
    	case 'Operaciones':
    		this.addGoBackAction();	
    		_objMainHeader.setContent('Corrales');    		
    		this.$.mainPane.selectViewByName("receptionsMap");
    		break;
    	case 'Reportes':
    		this.addGoBackAction();
    		_objMainHeader.setContent('Reportes');		
    		this.$.mainPane.selectViewByName("reports");
    		break;
    	case 'Ganaderos':
    		this.addGoBackAction();
    		_objMainHeader.setContent('Ganaderos');
    		this.$.mainPane.selectViewByName("catRanchers");
    		break;
    	case 'Ganado':
    		this.addGoBackAction();
    		_objMainHeader.setContent('Ganado');    				
    		this.$.mainPane.selectViewByName("catCattle");
    		break;
    	case 'Lista de Inspección':
    		this.addGoBackAction();
    		_objMainHeader.setContent('Lista de Inspección');    		
    		this.$.mainPane.selectViewByName("inspectionForecast");
//    		this.$.inspectionForecast.children[0].cambioDeFecha();
    		break;
    	case 'Usuarios':    		
    		this.addGoBackAction();
    		_objMainHeader.setContent('Lista de Usuarios');
  	      	this.$.mainPane.selectViewByName("usersList");
    		break;
    	case 'Carga de Pedimento':
    		this.addGoBackAction();
    		_objMainHeader.setContent('Cargar Pedimento');
  	      	this.$.mainPane.selectViewByName("fileUploader");
  	      	break;
//    	case 'Ver reporte embebido':
//    		this.addGoBackAction();
//    		_objMainHeader.setContent('Report Viewer');
//    		this.$.mainPane.selectViewByName("reportViewer");
//  	      	this.$.reportViewer.showReport();
//  	      	break;
    	}
    	enyo.$.sisoprega_btnGoBack.setShowing(1);
    },
    showAddUser : function(){
  	  	enyo.$.sisoprega_btnGoBack.setShowing(1);
        _objMainHeader.setContent('Agregar Usuario');
        this.addGoBackAction();
        this.$.mainPane.selectViewByName("addUser");
  	},
  	showEditUser : function(){
  		enyo.$.sisoprega_btnGoBack.setShowing(1);
        _objMainHeader.setContent('Editar Usuario');
        this.addGoBackAction();
        this.$.mainPane.selectViewByName("addUser");
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

//reportViewer = null;