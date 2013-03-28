enyo
	.kind({
	    name : "sisoprega.us",
	    kind : enyo.VFlexBox,
	    components : [
		    // SCRIM
		    {
			kind : enyo.Scrim,
			name : "scrimMain",
			layoutKind : enyo.VFlexLayout,
			align : "center",
			pack : "center",
			components : [
				{
				    kind : "SpinnerLarge"
				},
				{
				    kind : "LabeledContainer",
				    label : "Cargando ...",
				    style : "font-family:'Courier New', monospace;font-size:xx-large;color:white;"
				} ]
		    },
		    {
			kind : "Toolbar",
			name : "tbHeader",
			style : "max-height:10px",
			className : "headerMain",
			components : [
				{
				    kind : "AppMenu",
				    name : "menu",
				    width : "300px",
				    components : [ {
					caption : "Capturar Hermana",
					onclick : "open_view"
				    },
				    // {
				    // caption : "Inventario",
				    // onclick : "open_view"
				    // },
				    {
					caption : "Ventas",
					onclick : "open_view"
				    }, {
					caption : "Programación de Embarques",
					onclick : "open_view"
				    }, {
					caption : "Elegir Transportista",
					onclick : "open_view"
				    }, {
					caption : "Mapa",
					onclick : "open_view"
				    }, {
					caption : "Catálogos",
					components : [ {
					    caption : "Clientes",
					    onclick : "open_view"
					}, {
					    caption : "Proveedores",
					    onclick : "open_view"
					}, {
					    caption : "Transportistas",
					    onclick : "open_view"
					} ]
				    }
				    // {
				    // caption : "Lista de Inspección",
				    // onclick : "open_view"
				    // }, {
				    // caption : "Usuarios",
				    // onclick : "open_view"
				    // }
				    //									
				    ]
				},
				{
				    name : 'btnGoBack',
				    icon : "../SISOPREGA/images/command-menu/menu-icon-back.png",
				    onclick : "goBack"
				},
				{
				    name : 'btnMenu',
				    kind : "ButtonHeader",
				    content : "Menu",
				    onclick : "open_menu"
				},
				{
				    kind : "VFlexBox",
				    name : 'lblMainCap',
				    allowHtml : true,
				    flex : 1,
				    style : "color:#FFF;border:none;font-size:15px; text-align:center;min-width:150px;",
				    content : "Menu Principal"
				},
				{
				    name : 'btnLogOut',
				    onclick : "logOut",
				    icon : "../SISOPREGA/images/command-menu/menu-icon-logout.png"
				} ]
		    },
		    {
			kind : enyo.Pane,
			flex : 1,
			name : "mainPane",
			onSelectView : "selectView",
			transitionKind : "enyo.transitions.LeftRightFlyin",
			components : [ {
			    kind : "login",
			    // to test visibility with no login activity,
			    // change the kind for your own component.
			    // kind : "hermana.de",
			    name : "login",
			    onSucess : "goAhead",
			    onFail : "noAccess"
			}, {
			    kind : "main.admin",
			    name : "mainAdmin",
			    lazy : true
			}, {
			    kind : "main.agency",
			    name : "mainAgency",
			    lazy : "true"
			}, {
			    kind : "sales",
			    name : "sales_kind",
			    lazy : "true"
			}, {
			    kind : "shipments",
			    name : "shipments_kind",
			    lazy : "true"
			}, {
			    kind : "catalogs.customers.list",
			    name : "customersList_kind",
			    lazy : "true"
			}, {
			    kind : "catalogs.providers.list",
			    name : "providersList_kind",
			    lazy : "true"
			}, {
			    kind : "catalogs.drivers.list",
			    name : "driversList_kind",
			    lazy : "true"
			}, {
			    kind : "driver.select",
			    name : "driverSelect_kind",
			    lazy : "true"
			}, {
			    kind : "pen.map",
			    name : "penMap_kind",
			    lazy : "true"
			}, {
			    kind : "admin.screen",
			    name : "mainAdmin",
			    lazy : "true"
			} ]
		    },
		    {
			kind : enyo.Dialog,
			name : "toastMain",
			flyInFrom : "bottom",
			lazy : false,
			scrim : true,
			components : [
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
		if (_objMainHeader.getContent() == "Menu Principal") {
		    this.$.btnGoBack.setShowing(!1);
		    _objMainHeader
			    .setStyle("color:#FFF;border:none;font-size:15px; text-align:center;min-width:150px;");
		} else {
		    this.$.btnGoBack.setShowing(1);
		}
	    },
	    goAhead : function() {
		this.$.btnGoBack.setShowing(!1);
		this.$.tbHeader.show();
		this.$.mainPane.selectViewByName(cacheMan.mainView);
		// this.$.mainPane.selectViewByName("main_kind");
	    },
	    noAccess : function() {
		cacheMan.setMessage("", "Usuario o contraseña incorrecta.");
	    },
	    logOut : function() {
		consumingGateway.LogOut();
	    },
	    open_menu : function() {
		this.$.menu.openAroundControl(this.$.btnMenu, "", "left");
	    },
	    addGoBackAction : function(nextView) {
		if (_gobackStack.length > 0) {
		    if (this.$.mainPane.getViewName() == nextView) {
			return;
		    }
		}
		_gobackStack.push({
		    caption : _objMainHeader.getContent(),
		    paneMan : this.$.mainPane,
		    paneName : this.$.mainPane.getViewName()
		});
	    },
	    open_view : function(InSender, InEvent) {
		var view = "";
		if (InSender.caption) {
		    view = InSender.caption;
		}
		switch (view) {
		case 'Capturar Hermana':
		    // this.addGoBackAction("receptionsMap");
		    _objMainHeader.setContent('Hermana');
		    this.$.mainPane.selectViewByName("hermana_kind");
		    break;
		case 'Inventario':
		    // this.addGoBackAction("reports");
		    _objMainHeader.setContent('Inventario');
		    this.$.mainPane.selectViewByName("inventario");
		    break;
		case 'Ventas':
		    // this.addGoBackAction("catRanchers");
		    _objMainHeader.setContent('Ventas');
		    this.$.mainPane.selectViewByName("sales_kind");
		    break;
		case 'Programación de Embarques':
		    // this.addGoBackAction("catCattle");
		    _objMainHeader.setContent('Programación de Embarques');
		    this.$.mainPane.selectViewByName("shipments_kind");
		    break;
		case 'Clientes':
		    // this.addGoBackAction("catCattle");
		    _objMainHeader.setContent('Clientes');
		    this.$.mainPane.selectViewByName("customersList_kind");
		    break;
		case 'Proveedores':
		    // this.addGoBackAction("catCattle");
		    _objMainHeader.setContent('Proveedores');
		    this.$.mainPane.selectViewByName("providersList_kind");
		    break;
		case 'Transportistas':
		    // this.addGoBackAction("catCattle");
		    _objMainHeader.setContent('Transportistas');
		    this.$.mainPane.selectViewByName("driversList_kind");
		    break;
		case 'Elegir Transportista':
		    // this.addGoBackAction("catCattle");
		    _objMainHeader.setContent('Elegrir Transportista');
		    this.$.mainPane.selectViewByName("driverSelect_kind");
		    break;
		case 'Mapa':
		    // this.addGoBackAction("catCattle");
		    _objMainHeader.setContent('Mapa');
		    this.$.mainPane.selectViewByName("penMap_kind");
		    break;
		}
		// enyo.$.sisoprega_btnGoBack.setShowing(1);
	    },
	// showAddUser : function() {
	// enyo.$.sisoprega_btnGoBack.setShowing(1);
	// _objMainHeader.setContent('Agregar Usuario');
	// this.addGoBackAction("addUser");
	// this.$.mainPane.selectViewByName("addUser");
	// },
	// showEditUser : function() {
	// enyo.$.sisoprega_btnGoBack.setShowing(1);
	// _objMainHeader.setContent('Editar Usuario');
	// this.addGoBackAction("addUser");
	// this.$.mainPane.selectViewByName("addUser");
	// },
	// selectView : function(inSender, inView, inPreviousView) {
	// if (inView.name == "inspectionForecast") {
	// inView.$.forecast.resetValues();
	// }
	// if (inView.name == "usersList") {
	// inView.updateList();
	// }
	// if (inPreviousView.name == "usersList" && inView.name !=
	// "menuOptions") {
	// var selectedUser = inPreviousView.getSelectedUser();
	// if (selectedUser)
	// inView.setUser(selectedUser);
	// else
	// inView.toggleAdd();
	// }
	// }
	});
