enyo
	.kind({
	    name : "catalogs.main",
	    kind : enyo.VFlexBox,
	    iProduct : "",
	    components : [ {
		kind : enyo.Pane,
		flex : 1,
		name : "catalogsPane",
		transitionKind : "enyo.transitions.LeftRightFlyin",
		components : [ {
		    kind : "catalogs.menu",
		    name : "catMenu",
		    onRanchers : "showRanchers",
		    label : "Catálogos"
		}, {
		    kind : "catalogs.list.rancher",
		    name : "listRanchers",
		    label : "Ganaderos",
		    onSelectRancher : "showOptions",
		    entity : crudRancher
		}, {
		    kind : "catalogs.ranchers.options",
		    name : "rancherOptions",
		    onEdit : "showEdit",
		    onContacts : "showContacts",
		    onBilling : "showBillings",
		    onRegister : "showUsers"
		}, {
		    kind : "catalogs.rancher.enterprise.form",
		    name : "enterpriseRancherEdit",
		    onUpdate : "on_update_rancher",
		    onCancel : "on_cancel_edit",
		}, {
		    kind : "catalogs.rancher.person.form",
		    name : "personRancherEdit",
		    onUpdate : "on_update_rancher",
		    onCancel : "on_cancel_edit",
		}, {
		    kind : "forms.list",
		    name : "rancherContactsList",
		    entity : crudRancherContact
		}, {
		    kind : "forms.list",
		    name : "enterpriseContactsList",
		    entity : crudEnterpriseContact
		},{
		    kind : "forms.list",
		    name : "rancherBillingList",
		    entity : crudRancherBilling
		},{
		    kind : "forms.list",
		    name : "enterpriseBillingList",
		    entity : crudEnterpriseBilling
		},{
		    kind : "forms.list",
		    name : "rancherUsersList",
		    entity : crudRancherUser
		},{
		    kind : "forms.list",
		    name : "enterpriseUsersList",
		    entity : crudEnterpriseUser
		}   ]
	    }, ],
	    showOptions : function() {
		this.addGoBackAction();

		var rancher = this.$.listRanchers.getSelected();
		if (rancher) {
		    _objMainHeader.setContent(rancher.importantInfo);
		    this.$.catalogsPane.validateView("rancherOptions");
		    this.$.catalogsPane.selectViewByName("rancherOptions");
		}
	    },
	    showRanchers : function() {
		this.addGoBackAction();
		_objMainHeader.setContent('Ganaderos');
		this.$.catalogsPane.validateView("listRanchers");
		this.$.catalogsPane.selectViewByName("listRanchers");
		this.$.listRanchers.reset();
	    },
	    showEdit : function() {
		this.addGoBackAction();

		var view = null;
		var rancher = null;
		if (rancher = this.$.listRanchers.getSelected()) {
		    if (rancher.rancher_type == 1) {
			view = "personRancherEdit";
		    }
		    if (rancher.rancher_type == 2) {
			view = "enterpriseRancherEdit";
		    }
		    this.$.catalogsPane.validateView(view);
		    this.$.catalogsPane.selectViewByName(view);
		    this.$[view].setEntity(rancher);
		    _objMainHeader.setContent(rancher.importantInfo);
		}
	    },
	    on_update_rancher : function() {
		this.$.listRanchers.reset();
		this.goBack();
	    },
	    on_cancel_edit : function() {
		this.goBack();
	    },
	    showContacts : function() {
		this.addGoBackAction();

		var view = null;
		var rancher = null;
		if (rancher = this.$.listRanchers.getSelected()) {
		    if (rancher.rancher_type == 1) {
			view = "rancherContactsList";
		    }
		    if (rancher.rancher_type == 2) {
			view = "enterpriseContactsList";
		    }
		    this.$.catalogsPane.validateView(view);
		    this.$.catalogsPane.selectViewByName(view);
		    this.$[view].setParentObject(rancher);
		    _objMainHeader.setContent(rancher.importantInfo + ' - Contactos');
		    this.$[view].reset();
		}
	    },
	    showBillings:function(){
		this.addGoBackAction();

		var view = null;
		var rancher = null;
		if (rancher = this.$.listRanchers.getSelected()) {
		    if (rancher.rancher_type == 1) {
			view = "rancherBillingList";
		    }
		    if (rancher.rancher_type == 2) {
			view = "enterpriseBillingList";
		    }
		    this.$.catalogsPane.validateView(view);
		    this.$.catalogsPane.selectViewByName(view);
		    this.$[view].setParentObject(rancher);
		    _objMainHeader.setContent(rancher.importantInfo + ' - Facturación');
		    this.$[view].reset();
		}
	    },
	    showUsers:function(){
		this.addGoBackAction();

		var view = null;
		var rancher = null;
		if (rancher = this.$.listRanchers.getSelected()) {
		    if (rancher.rancher_type == 1) {
			view = "rancherUsersList";
		    }
		    if (rancher.rancher_type == 2) {
			view = "enterpriseUsersList";
		    }
		    this.$.catalogsPane.validateView(view);
		    this.$.catalogsPane.selectViewByName(view);
		    this.$[view].setParentObject(rancher);
		    _objMainHeader.setContent(rancher.importantInfo + ' - Usarios');
		    this.$[view].reset();
		}
	    },
	    goBack : function() {
		cacheMan.goBack();
	    },
	    addGoBackAction : function() {
		_gobackStack.push({
		    caption : _objMainHeader.getContent(),
		    paneMan : this.$.catalogsPane,
		    paneName : this.$.catalogsPane.getViewName()
		});
	    },
	    selectView : function(inSender, inView, inPreviousView) {

		if (inView.name == inPreviousView.name) {
		    return;
		}
		if (_navigatingBack == false) {
		    _gobackStack.push({
			caption : inPreviousView.label,
			paneMan : inPreviousView.parent,
			paneName : inPreviousView.name
		    });
		}
		_objMainHeader.setContent(inView.label);
		if (_gobackStack.length == 0) {
		    _goBackButton.setShowing(!1);
		    _objMainHeader.applyStyle("font-size","15px");
		} else {
		    _goBackButton.setShowing(1);
		}
		if (inView.name == "usersList") {
		    inView.updateList();
		}
		if (inPreviousView) {
		    if (inPreviousView.name == "usersList"
			    && inView.name != "menuOptions") {
			var selectedUser = inPreviousView.getSelectedUser();
			if (selectedUser)
			    inView.setUser(selectedUser);
			else
			    inView.toggleAdd();
		    }
		}
	    }
	});
