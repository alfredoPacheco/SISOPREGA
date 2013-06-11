enyo.kind({
    name : "catalogs.list.ranchers",
    kind : "catalogs.list",
    create : function() {
	this.inherited(arguments);
	this.createComponent({
	    name : "options",
	    kind : enyo.PopupSelect,
	    onSelect : "addNewRancher",
	    items : [ {
		caption : "Empresa/Sociedad",
		value : 1
	    }, {
		caption : "Persona Fisica",
		value : 2
	    } ]
	});
    },
    addNewRancher : function(inSender, inSelected) {

	this.$.popup.validateComponents();
	var entityKind = "";
	switch (inSelected.value) {
	case 1: // Crear nueva empresa
	    this.setCreateKindName("catalogs.ranchers.enterprise.create");
	    entityKind = cacheEnterpriseRanchers;
	    break;
	case 2:// Crear nuevo ganadero
	    this.setCreateKindName("catalogs.ranchers.person.create");
	    entityKind = cacheRanchers;
	    break;
	}

	this.resetCreateKind(entityKind);

	this.$.create_kind.toggleAdd();
	this.$.popup.render();
	this.$.popup.openAtCenter();
    },
    resetCreateKind : function(entityKind) {
	this.$.create_kind.destroy();

	this.$.popup.createComponent({
	    kind : this.getCreateKindName(),
	    name : "create_kind",
	    lazy : "true",
	    entityKind : entityKind,
	    onAddEntity : "on_add",
	    onUpdateEntity : "on_upd",
	    onCancel : "on_cancel",
	    flex : 1
	}, {
	    owner : this
	});
    },
    add_click : function(inSender, inEvent) {
	this.$.options.openAtEvent(inEvent);
	return false;
    },
    selectItem : function(inSender, inEvent) {
	var obj = null;
	if (obj = this.arrList[inEvent.rowIndex]) {
	    this.iSelected = inEvent.rowIndex;

	    this.$.popup.validateComponents();
	    var entityKind = "";
	    if (obj.rancher_type == 1) {
		this.setCreateKindName("catalogs.ranchers.person.create");
		entityKind = cacheRanchers;
	    } else if (obj.rancher_type == 2) {
		this.setCreateKindName("catalogs.ranchers.enterprise.create");
		entityKind = cacheEnterpriseRanchers;
	    }

	    this.resetCreateKind(entityKind);
	    this.$.create_kind.setEntity(obj);
	    this.$.popup.render();
	    this.$.popup.openAtCenter();
	}
    },
    reset : function() {
	this.$.filter.setValue("");
	cacheMan.showScrim();
	// Retrieve ranchers
	cacheRanchers.get(this, 'readCallback');
	// Retrieve enterprise ranchers
	cacheEnterpriseRanchers.get(this, 'readCallback');
    },
    readsReceived : 0,
    readCallback : function() {
	this.readsReceived++;
	if (this.readsReceived == 2) {
	    this.readsReceived = 0;
	    this.loadList();
	}
    },
    loadList : function() {
	this.allItems = [];
	this.allItems = cacheRanchers.getCatalogsList().concat(
		cacheEnterpriseRanchers.getCatalogsList());
	this.arrList = this.allItems;
	this.updateList();
	cacheMan.hideScrim();
    },
    deleteItem : function(inSender, inIndex) {
	cacheMan.showScrim();
	var obj = null;
	if (obj = this.arrList[inIndex]) {
	    var entityKind = "";
	    var removeId = 0;
	    if (obj.rancher_type == 1) {
		entityKind = cacheRanchers;
		removeId = obj.rancherId;
	    } else if (obj.rancher_type == 2) {
		entityKind = cacheEnterpriseRanchers;
		removeId = obj.enterpriseId;
	    }

	    if (entityKind.remove(removeId, this, "reset")) {
		return true;
	    } else {
		return false;
	    }
	}
    }
});