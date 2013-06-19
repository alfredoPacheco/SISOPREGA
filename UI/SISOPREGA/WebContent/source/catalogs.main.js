enyo
	.kind({
	    name : "catalogs.main",
	    kind : enyo.VFlexBox,
	    iProduct : "",
	    events : {},
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
		    kind : "catalogs.list.ranchers",
		    name : "listRanchers",
		    label : "Ganaderos",
		    onSelectRancher : "showOptions"
		}, {
		    kind : "catalogs.ranchers.options",
		    name : "rancherOptions",
		    onEdit : "showEdit",
		    onContacts : "showContacts",
		    onBilling : "showBillings",
		    onRegister : "showUsers"
		}, {
		    kind : "catalogs.ranchers.enterprise.create",
		    name : "enterpriseRancherEdit",
		    onUpdate : "on_update_rancher",
		    onCancel : "on_cancel_edit",
		}, {
		    kind : "catalogs.ranchers.person.create",
		    name : "personRancherEdit",
		    onUpdate : "on_update_rancher",
		    onCancel : "on_cancel_edit",
		}, {
		    kind : "catalogs.list",
		    name : "rancherContactsList",
		    entity : cacheRancherContacts,
		    createKindName : "catalogs.ranchers.contact.create"
		}, {
		    kind : "catalogs.list",
		    name : "enterpriseContactsList",
		    entity : cacheEnterpriseContacts,
		    createKindName : "catalogs.enterprise.contact.create"
		},{
		    kind : "catalogs.list",
		    name : "rancherBillingList",
		    entity : cacheRancherBilling,
		    createKindName : "catalogs.ranchers.billing.create"
		},{
		    kind : "catalogs.list",
		    name : "enterpriseBillingList",
		    entity : cacheEnterpriseBilling,
		    createKindName : "catalogs.enterprise.billing.create"
		},{
		    kind : "catalogs.list",
		    name : "rancherUsersList",
		    entity : cacheRancherUsers,
		    createKindName : "catalogs.ranchers.users.create"
		},{
		    kind : "catalogs.list",
		    name : "enterpriseUsersList",
		    entity : cacheEnterpriseUsers,
		    createKindName : "catalogs.enterprise.users.create"
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
		    _objMainHeader
			    .setStyle("color:#FFF;border:none;font-size:15px; text-align:center;min-width:150px;");
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
