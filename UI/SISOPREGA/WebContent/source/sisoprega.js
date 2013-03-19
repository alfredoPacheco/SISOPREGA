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
                                            {caption: "Carga de Pedimento", onclick: "open_view"},
                                            {caption: "Auxiliar depurador", onclick: "open_view"}
                                        ]},
              {
                name : 'btnGoBack',
                icon : "images/command-menu/menu-icon-back.png",
                onclick : "goBack",
//                flex : 2
              },
              {
                  name : 'btnMenu',
                  kind:"ButtonHeader",
                  content:"Menu",
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
          name : "accessPane",
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
              {kind:"receptions.weights", name:"weights"           	  
              }
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
      _goBackButton = this.$.btnGoBack;
    },
    goBack : function() {
      cacheMan.goBack();
//      if (_objMainHeader.getContent() == "Menu Principal") {
//        this.$.btnGoBack.setShowing(!1);
////        enyo.$.sisoprega_spacerSecond.setShowing(1);
//        _objMainHeader.setStyle("color:#FFF;border:none;font-size:15px; text-align:center;min-width:150px;");
//      } else {
//        this.$.btnGoBack.setShowing(1);
////        enyo.$.sisoprega_spacerSecond.setShowing(!1);
//      }
    },
    goAhead : function() {
      this.$.btnGoBack.setShowing(!1);
//      enyo.$.sisoprega_spacerSecond.setShowing(1);
      this.$.tbHeader.show();
      this.$.accessPane.selectViewByName("mainMenu");
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
//    addGoBackAction:function(nextView){
//    	if(_gobackStack.length > 0){
//			if(this.$.accessPane.getViewName()==nextView){
//				return;
//			}
//		}
//		_gobackStack.push({	caption:_objMainHeader.getContent(),
//							paneMan:this.$.accessPane,
//							paneName:this.$.accessPane.getViewName()});		
//	},
    open_view : function(InSender, InEvent){
    	var view = "";
    	if(InSender.caption){
    		view = InSender.caption;
    	}
    	switch(view){
    	case 'Operaciones':
//    		this.addGoBackAction("receptionsMap");	
    		this.$.mainMenu.$.mainPane.selectViewByName("receptionsMap");
//    		_objMainHeader.setContent('Corrales');
    		break;
    	case 'Reportes':
//    		this.addGoBackAction("reports");
//    		_objMainHeader.setContent('Reportes');		
    		this.$.mainMenu.$.mainPane.selectViewByName("reports");
    		break;
    	case 'Ganaderos':
//    		this.addGoBackAction("catRanchers");
//    		_objMainHeader.setContent('Ganaderos');
    		this.$.mainMenu.$.mainPane.validateView("catalogs");
    		this.$.mainMenu.$.catalogs.showRanchers();
    		this.$.mainMenu.$.mainPane.selectViewByName("catalogs");
//    		_gobackStack.pop();
//    		_gobackStack.pop();
//    		_navigatingBack=true;
    		break;
    	case 'Ganado':
//    		this.addGoBackAction("catCattle");
//    		_objMainHeader.setContent('Ganado');    				
    		this.$.mainMenu.$.mainPane.validateView("catalogs");
    		this.$.mainMenu.$.catalogs.showCattle();
    		this.$.mainMenu.$.mainPane.selectViewByName("catalogs");
    		break;
    	case 'Lista de Inspección':
//    		this.addGoBackAction("inspectionForecast");
//    		_objMainHeader.setContent('Lista de Inspección');    		
    		this.$.mainMenu.$.mainPane.selectViewByName("inspectionForecast");
//    		this.$.inspectionForecast.children[0].cambioDeFecha();
    		break;
    	case 'Usuarios':    		
//    		this.addGoBackAction("usersList");
//    		_objMainHeader.setContent('Lista de Usuarios');
    		this.$.mainMenu.$.mainPane.selectViewByName("usersList");
    		break;
    	case 'Carga de Pedimento':
//    		this.addGoBackAction("fileUploader");
//    		_objMainHeader.setContent('Cargar Pedimento');
    		this.$.mainMenu.$.mainPane.selectViewByName("fileUploader");
  	      	break;
    	
    	case 'Auxiliar depurador':
    		this.$.accessPane.selectViewByName("weights");
    	}
    },
//    showAddUser : function(){
//  	  	enyo.$.sisoprega_btnGoBack.setShowing(1);
//        _objMainHeader.setContent('Agregar Usuario');
//        this.addGoBackAction("addUser");
//        this.$.mainPane.selectViewByName("addUser");
//  	},
//  	showEditUser : function(){
//  		enyo.$.sisoprega_btnGoBack.setShowing(1);
//        _objMainHeader.setContent('Editar Usuario');
//        this.addGoBackAction("addUser");
//        this.$.mainPane.selectViewByName("addUser");
//  	},
//  	selectView:function(inSender, inView, inPreviousView) {
//  		switch(inView.name){
//  		case "inspectionForecast":
//  			inView.$.forecast.resetValues();
//  			break;
//  		case "usersList":
//  			inView.updateList();
//  			break;
//  		case "catalogs":
//  			for(var i=_gobackStack.length-1;i>-1;i--){
//  				console.debug(_gobackStack[i].paneName);
//  				if(_gobackStack[i].paneName!= "mainMenu"){
//  					_gobackStack.pop();
//  				}else{
//  					break;
//  				}
//  			}
//  			console.debug("seleccionando catMenu...");
//  			inView.$.mainPane.selectViewByName("catMenu");
//  			break;
//  		}
//  		
//		if(inPreviousView.name == "usersList" && inView.name == "addUser"){
//		  var selectedUser = inPreviousView.getSelectedUser();
//		  if(selectedUser)
//		    inView.setUser(selectedUser);
//		  else
//		    inView.toggleAdd();
//		}
//	}
  });