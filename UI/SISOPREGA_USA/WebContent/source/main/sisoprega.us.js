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
				    kind : "Image",
				    src : "../SISOPREGA_WEB_LIB/images/ajax-loader.gif",
				    style : "width:250px;"
				},
				{
				    kind : "LabeledContainer",
				    label : "Cargando ...",
				    style : "font-family:'Courier New', monospace;font-size:xx-large;color:white;"
				}, ]
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
					caption : "Inicio",
					onclick : "open_view"
				    }, {
					caption : "Reportes",
					onclick : "open_view"
				    }, {
					caption : "Mapa Mexicano",
					onclick : "open_view"
				    }, {
					caption : "Lista de Inspecci�n",
					onclick : "open_view"
				    }, {
					caption : "Cat�logos",
					components : [ {
					    caption : "Clases",
					    onclick : "open_view"
					}, {
					    caption : "Clientes",
					    onclick : "open_view"
					}, {
					    caption : "Transportistas",
					    onclick : "open_view"
					}, {
					    caption : "Proveedores",
					    onclick : "open_view"
					}, {
					    caption : "Usuarios",
					    onclick : "open_view"
					}, {
					    caption : "Conceptos de Gastos",
					    onclick : "open_view"
					}, ]
				    } ]
				},
				{
				    name : 'btnGoBack',
				    icon : "../SISOPREGA_WEB_LIB/images/command-menu/menu-icon-back.png",
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
				    icon : "../SISOPREGA_WEB_LIB/images/command-menu/menu-icon-logout.png"
				} ]
		    },
		    {
			kind : enyo.Pane,
			flex : 1,
			name : "mainPane",
			onSelectView : "selectView",
			transitionKind : "enyo.transitions.LeftRightFlyin",
			style : "margin-left:auto;margin-right:auto",
			components : [ {
			    kind : "login",
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
			    lazy : true
			}, {
			    kind : "Scroller",
			    name : "reports_kind",
			    lazy : true,
			    layoutKind : "VFlexLayout",
			    components : [ {
				kind : "reports.main",
				name : "reportsMain",
				style : "min-height:377px;",
				components : [ {
				    kind : "reports.us.select",
				    flex : 1,
				    style : "margin-top: 43px;"
				} ]
			    } ]
			}, {
			    kind : "operations.pen.map",
			    name : "mexMap_kind",
			    lazy : true
			}, {
			    kind : "inspection.forecast",
			    name : "inspection_kind",
			    lazy : true
			}, {
			    kind : "forms.list",
			    name : "customersList_kind",
			    entity : crudCustomer
			}, {
			    kind : "catalogs.drivers.list",
			    name : "driversList_kind",
			    lazy : true
			}, {
			    kind : "catalogs.providers.list",
			    name : "providersList_kind",
			    lazy : true
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
		    _objMainHeader.applyStyle("font-size", "15px");
		} else {
		    this.$.btnGoBack.setShowing(1);
		}
	    },
	    readCounter : 0,
	    readCallBack : function() {
		this.readCounter++;
		if (this.readCounter == 4) {
		    this.readCounter = 0;

		    this.$.btnGoBack.setShowing(!1);
		    this.$.tbHeader.show();
		    this.$.mainPane.selectViewByName(cacheMan.mainView);
		    if (cacheMan.mainView == 'mainAgency')
			this.$.btnMenu.hide();
		}
	    },
	    goAhead : function() {
		crudSeller.get(this, "readCallBack");
		crudCattle.get(this, "readCallBack");
		crudCattleQuality.get(this, "readCallBack");
		crudPen.get(this, "readCallBack");
	    },
	    noAccess : function() {
		cacheMan.setMessage("", "Usuario o contrase�a incorrecta.");
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
		case 'Inicio':
		    // this.addGoBackAction("receptionsMap");
		    _objMainHeader.setContent('Administraci�n');
		    this.$.mainPane.selectViewByName("mainAdmin");
		    break;
		case 'Reportes':
		    // this.addGoBackAction("receptionsMap");
		    _objMainHeader.setContent('Reportes');
		    this.$.mainPane.selectViewByName("reports_kind");
		    this.$.reportsMain.$.reportsPane.selectViewByIndex(0);
		    break;
		case 'Mapa Mexicano':
		    // this.addGoBackAction("reports");
		    _objMainHeader.setContent('Corrales M�xico');
		    this.$.mainPane.selectViewByName("mexMap_kind");
		    break;
		case 'Lista de Inspecci�n':
		    // this.addGoBackAction("catRanchers");
		    _objMainHeader.setContent('Lista de Inspecci�n');
		    this.$.mainPane.selectViewByName("inspection_kind");
		    break;
		case 'Clases':
		    // this.addGoBackAction("catCattle");
		    // _objMainHeader.setContent('Programaci�n de Embarques');
		    // this.$.mainPane.selectViewByName("shipments_kind");
		    break;
		case 'Clientes':
		    // this.addGoBackAction("catCattle");
		    _objMainHeader.setContent('Clientes');
		    this.$.mainPane.selectViewByName("customersList_kind");
		    break;
		case 'Transportistas':
		    // this.addGoBackAction("catCattle");
		    _objMainHeader.setContent('Transportistas');
		    this.$.mainPane.selectViewByName("driversList_kind");
		    break;
		case 'Proveedores':
		    // this.addGoBackAction("catCattle");
		    _objMainHeader.setContent('Proveedores');
		    this.$.mainPane.selectViewByName("providersList_kind");
		    break;
		case 'Usuarios':
		    // this.addGoBackAction("catCattle");
		    // _objMainHeader.setContent('Elegrir Transportista');
		    // this.$.mainPane.selectViewByName("driverSelect_kind");
		    break;
		case 'Conceptos de Gastos':
		    // this.addGoBackAction("catCattle");
		    // _objMainHeader.setContent('Mapa');
		    // this.$.mainPane.selectViewByName("penMap_kind");
		    break;
		}
		// enyo.$.sisoprega_btnGoBack.setShowing(1);
	    },
	});
