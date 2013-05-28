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
                                                                   //{caption: "Auxiliar depurador", onclick: "open_view"}
                                                               ]},
        {
          kind : "Toolbar",
          name : "tbHeader",
          style : "max-height:10px",
          className : "headerMain",
          components :
            [
             
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
//                icon : "images/command-menu/icon-context.png"
                icon : "images/command-menu/menu-icon-logout.png"
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
                kind : "catalogs.ranchers.person.create",
                name : "mainMenu"
              },
              
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
    },
    goAhead : function() {
      this.$.btnGoBack.setShowing(!1);
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
    open_view : function(InSender, InEvent){
    	var view = "";
    	if(InSender.caption){
    		view = InSender.caption;
    	}
    	switch(view){
    	case 'Operaciones':
    		this.$.mainMenu.$.mainPane.selectViewByName("receptionsMap");
    		break;
    	case 'Reportes':
    		this.$.mainMenu.$.mainPane.selectViewByName("reports");
    		break;
    	case 'Ganaderos':
    		this.$.mainMenu.$.mainPane.validateView("catalogs");
    		this.$.mainMenu.$.catalogs.showRanchers();
    		this.$.mainMenu.$.mainPane.selectViewByName("catalogs");
    		break;
    	case 'Ganado':
    		this.$.mainMenu.$.mainPane.validateView("catalogs");
    		this.$.mainMenu.$.catalogs.showCattle();
    		this.$.mainMenu.$.mainPane.selectViewByName("catalogs");
    		break;
    	case 'Lista de Inspección':
    		this.$.mainMenu.$.mainPane.selectViewByName("inspectionForecast");
    		break;
    	case 'Usuarios':    		
    		this.$.mainMenu.$.mainPane.selectViewByName("usersList");
    		break;
    	case 'Carga de Pedimento':
    		this.$.mainMenu.$.mainPane.selectViewByName("fileUploader");
  	      	break;
    	
    	//case 'Auxiliar depurador':
    	//	this.$.accessPane.selectViewByName("weights");
    	}
    },
  });