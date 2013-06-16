enyo.kind({
    name : "catalogs.list.ranchers",
    kind : "catalogs.list",
    events : {
	onSelectRancher : ""
    },
    selectedRancher : null,
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
	switch (inSelected.value) {
	case 1: // Crear nueva empresa
	    this.setCreateKindName("catalogs.ranchers.enterprise.create");
	    break;
	case 2:// Crear nuevo ganadero
	    this.setCreateKindName("catalogs.ranchers.person.create");
	    break;
	}

	this.resetCreateKind();

	this.$.create_kind.toggleAdd();
	this.$.popup.render();
	this.$.popup.openAtCenter();
    },
    resetCreateKind : function() {
	this.$.create_kind.destroy();

	this.$.popup.createComponent({
	    kind : this.getCreateKindName(),
	    name : "create_kind",
	    lazy : "true",
	    onAdd : "on_add",
	    onUpdate : "on_upd",
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
	this.selectedItem = this.arrList[inEvent.rowIndex];
	this.doSelectRancher();
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

	    if (this.selectedItem != null) {
		var idName = this.selectedItem.idName;
		this.selectedItem = this.getItemById(this.selectedItem[idName]);
		
		// Update main screen title
		_objMainHeader.setContent(this.selectedItem.importantInfo);
	    }
	    
	    cacheMan.hideScrim();
	}
    },
    loadList : function() {
	this.allItems = [];
	this.allItems = cacheRanchers.getCatalogsList().concat(
		cacheEnterpriseRanchers.getCatalogsList());
	this.arrList = this.allItems;
	this.updateList();
    },
    deleteItem : function(inSender, inIndex) {
	cacheMan.showScrim();
	var obj = null;
	if (obj = this.arrList[inIndex]) {
	    var entityKind = null;
	    if (obj.rancher_type == 1) {
		entityKind = cacheRanchers;
	    } else if (obj.rancher_type == 2) {
		entityKind = cacheEnterpriseRanchers;
	    }

	    entityKind.remove(obj, this, "reset");
	}
    }
});