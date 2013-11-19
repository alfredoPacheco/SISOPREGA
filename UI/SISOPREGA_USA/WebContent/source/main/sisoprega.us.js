enyo.kind(
  {
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
                  },
            ]
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
                    components : [
                          {
                            caption : "Home",
                            onclick : "open_view"
                          },
                          {
                            caption : "Reports",
                            onclick : "open_view"
                          },
                          {
                            caption : "Mexican Map",
                            onclick : "open_view"
                          },
                          {
                            caption : "Inspection List",
                            onclick : "open_view"
                          },
                          {
                            caption : "Catalogs",
                            components : [
                                  {
                                    caption : "Classes",
                                    onclick : "open_view"
                                  },
                                  {
                                    caption : "Clients",
                                    onclick : "open_view"
                                  },
                                  {
                                    caption : "Freighters",
                                    onclick : "open_view"
                                  },
                                  {
                                    caption : "Suppliers",
                                    onclick : "open_view"
                                  },
                                  {
                                    caption : "Users",
                                    onclick : "open_view"
                                  },
                                  {
                                    caption : "Expense Concepts",
                                    onclick : "open_view"
                                  },
                            ]
                          }
                    ]
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
                    content : "Main Menu"
                  },
                  {
                    name : 'btnLogOut',
                    onclick : "logOut",
                    icon : "../SISOPREGA_WEB_LIB/images/command-menu/menu-icon-logout.png"
                  }
            ]
          },
          {
            kind : enyo.Pane,
            flex : 1,
            name : "mainPane",
            onSelectView : "selectView",
            transitionKind : "enyo.transitions.LeftRightFlyin",
            style : "margin-left:auto;margin-right:auto",
            components : [
                  {
                    kind : "login",
                    name : "login",
                    onSucess : "goAhead",
                    onFail : "noAccess"
                  },
                  {
                    kind : "main.admin",
                    name : "mainAdmin",
                    lazy : true
                  },
                  {
                    kind : "main.agency",
                    name : "mainAgency",
                    lazy : true
                  },
                  {
                      kind : "reports.main",
                      name : "reportsMain",
                      lazy : true
                  },
                  {
                    kind : "operations.pen.map",
                    name : "mexMap_kind",
                    lazy : true
                  },
                  {
                    kind : "inspection.forecast",
                    name : "inspection_kind",
                    lazy : true
                  },
                  {
                    kind : "forms.list",
                    name : "customersList_kind",
                    entity : crudCustomer,
                    lazy : true
                  },
                  {
                    kind : "catalogs.carrier.list",
                    name : "driversList_kind",
                    lazy : true
                  },
                  {
                    kind : "forms.list",
                    name : "providersList_kind",
                    entity : crudSeller,
                    lazy : true
                  },
                  {
                    kind : "forms.list",
                    name : "expenseConceptsList",
                    entity : crudExpenseConcept,
                    lazy : true
                  },
                  {
                    kind : "forms.list",
                    name : "userList",
                    entity : crudUser,
                    lazy : true
                  },
                  {
                    kind : "forms.list",
                    name : "qualityList",
                    entity : crudCattleQuality,
                    lazy : true
                  }
            ]
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
                  }
            ]
          }
    ],
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
      if (_objMainHeader.getContent() == "Main Menu") {
        this.$.btnGoBack.setShowing(!1);
        _objMainHeader.applyStyle("font-size", "15px");
      } else {
        this.$.btnGoBack.setShowing(1);
      }
    },
    goAhead : function() {
      crudSeller.get(this, "readCallBack");
      crudCustomer.get(this, "readCallBack");
      crudCarrier.get(this, "readCallBack");
      crudCattle.get(this, "readCallBack");
      crudCattleQuality.get(this, "readCallBack");
      crudPen.get(this, "readCallBack");
    },
    readCounter : 0,
    readCallBack : function() {
      this.readCounter++;
      if (this.readCounter == 6) {
        this.readCounter = 0;
        
        this.$.btnGoBack.setShowing(!1);
        this.$.tbHeader.show();
        this.$.mainPane.selectViewByName(cacheMan.mainView);
        if (cacheMan.mainView == 'mainAgency') this.$.btnMenu.hide();
      }
    },
    noAccess : function() {
      cacheMan.setMessage("", "Incorrect user name or password.");
    },
    logOut : function() {
      consumingGateway.LogOut();
    },
    open_menu : function() {
      this.$.menu.openAroundControl(this.$.btnMenu, "", "left");
    },
    addGoBackAction : function(nextView) {
      if (_gobackStack.length > 0) {
        if (this.$.mainPane.getViewName() == nextView) { return; }
      }
      _gobackStack.push(
        {
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
        case 'Home':
          // this.addGoBackAction("receptionsMap");
          _objMainHeader.setContent('Administration Home');
          this.$.mainPane.selectViewByName("mainAdmin");
          break;
        case 'Reports':
          // this.addGoBackAction("receptionsMap");
          _objMainHeader.setContent('Reports');
          this.$.mainPane.selectViewByName("reportsMain");          
          break;
        case 'Mexican Map':
          _objMainHeader.setContent('Mexican Pens');
          this.$.mainPane.selectViewByName("mexMap_kind");
          break;
        case 'Inspection List':
          // this.addGoBackAction("catRanchers");
          _objMainHeader.setContent('Inspection List');
          this.$.mainPane.selectViewByName("inspection_kind");
          break;
        case 'Classes':
          _objMainHeader.setContent('Cattle Classes');
          this.$.mainPane.validateView("qualityList");
          this.$.mainPane.selectViewByName("qualityList");
          this.$.qualityList.reset();
          break;
        case 'Clients':
          // this.addGoBackAction("catCattle");
          _objMainHeader.setContent('Clients');
          this.$.mainPane.selectViewByName("customersList_kind");
          this.$.customersList_kind.reset();
          break;
        case 'Freighters':
          // this.addGoBackAction("catCattle");
          _objMainHeader.setContent('Freighters');
          this.$.mainPane.selectViewByName("driversList_kind");
          break;
        case 'Suppliers':
          // this.addGoBackAction("catCattle");
          _objMainHeader.setContent('Suppliers');
          this.$.mainPane.selectViewByName("providersList_kind");
          this.$.providersList_kind.reset();
          break;
        case 'Expense Concepts':
          // this.addGoBackAction("catCattle");
          _objMainHeader.setContent('Expense Concepts (Hermana)');
          this.$.mainPane.validateView("expenseConceptsList");
          this.$.mainPane.selectViewByName("expenseConceptsList");
          this.$.expenseConceptsList.reset();
          break;
        case 'Users':
          // this.addGoBackAction("catCattle");
          _objMainHeader.setContent('Users');
          this.$.mainPane.validateView("userList");
          this.$.mainPane.selectViewByName("userList");
          this.$.userList.reset();
          break;
      }
      // enyo.$.sisoprega_btnGoBack.setShowing(1);
    },
  });
