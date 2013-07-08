enyo.kind({
    name : "catalogs.list.rancher",
    kind : "forms.list",
    events : {
	onSelectRancher : ""
    },
    selectedRancher : null,
    create : function() {
	this.inherited(arguments);
	this.createComponents([{
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
	},{
	    kind : enyo.Popup,
	    width : "80%",
	    height : "80%",
	    dismissWithClick : true,
	    layoutKind : "VFlexLayout",
	    modal : true,
	    style : "overflow: hidden; border-width: 0px;",
	    scrim : true,
	    name : "formPopUp",
	    
//	    components : [ {
//		kind : this.entity.getCreateKindName(),
//		name : "create_kind",
//		lazy : "true",
//		onAdd : "on_add",
//		onUpdate : "on_upd",
//		onCancel : "on_cancel",
//		flex : 1
//	    } ]
	
	}], {owner: this});
    },
    addNewRancher : function(inSender, inSelected) {

	this.$.formPopUp.validateComponents();
	switch (inSelected.value) {
	case 1: // Crear nueva empresa
	    this.entity.setCreateKindName("catalogs.rancher.enterprise.form");
	    break;
	case 2:// Crear nuevo ganadero
	    this.entity.setCreateKindName("catalogs.rancher.person.form");
	    break;
	}

	this.resetCreateKind();

	this.$.create_kind.toggleAdd();
	this.$.formPopUp.render();
	this.$.formPopUp.openAtCenter();
    },
    resetCreateKind : function() {
	if(this.$.create_kind !== undefined)
	    this.$.create_kind.destroy();

	this.$.formPopUp.createComponent({
	    kind : this.entity.getCreateKindName(),
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
	crudRancher.get(this, 'readCallback');
	// Retrieve enterprise ranchers
	crudEnterpriseRancher.get(this, 'readCallback');
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
	this.allItems = crudRancher.getCatalogsList().concat(
		crudEnterpriseRancher.getCatalogsList());
	this.arrList = this.allItems;
	this.updateList();
    },
    deleteItem : function(inSender, inIndex) {
	cacheMan.showScrim();
	var obj = null;
	if (obj = this.arrList[inIndex]) {
	    var entityKind = null;
	    if (obj.rancher_type == 1) {
		entityKind = crudRancher;
	    } else if (obj.rancher_type == 2) {
		entityKind = crudEnterpriseRancher;
	    }

	    entityKind.remove(obj, this, "reset");
	}
    }
});