enyo.kind({
    name : "operations.purchase.list",
    kind : "forms.list",
    create : function() {
	this.inherited(arguments);
	this.createComponents([{
	    kind : enyo.Popup,
	    width : "80%",
	    height : "80%",
	    dismissWithClick : true,
	    layoutKind : "VFlexLayout",
	    modal : true,
	    style : "overflow: hidden; border-width: 0px;",
	    scrim : true,
	    name : "frmPopUp",
	}], {owner: this});
    },
    addNewPurchase : function(inSender, inSelected) {

	this.$.frmPopUp.validateComponents();
	switch (inSelected.value) {
	case 1: // With purchase form
	    this.entity.setCreateKindName("operations.purchase.form");
	    break;
	case 2:// With hermana form
	    this.entity.setCreateKindName("hermana.form");
	    break;
	}

	this.resetCreateKind();

	this.$.create_kind.toggleAdd();
	this.$.frmPopUp.render();
	this.$.frmPopUp.openAtCenter();
    },
    resetCreateKind : function() {
	if(this.$.create_kind !== undefined)
	    this.$.create_kind.destroy();

	this.$.frmPopUp.createComponent({
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
//    selectItem : function(inSender, inEvent) {
//	this.selectedItem = this.arrList[inEvent.rowIndex];
//	this.doSelectRancher();
//    },
    reset : function() {
	this.$.filter.setValue("");
	cacheMan.showScrim();
	// Retrieve purchases
	crudPurchase.get(this, 'readCallback');
	// Retrieve hermanas
	crudHermana.get(this, 'readCallback');
    },
    readsReceived : 0,
    readCallback : function() {
	this.readsReceived++;
	if (this.readsReceived == 2) {
	    this.readsReceived = 0;
	    this.loadList();
	    
	    cacheMan.hideScrim();
	}
    },
    loadList : function() {
	this.allItems = [];
	this.allItems = crudPurchase.getCatalogsList().concat(
		crudHermana.getCatalogsList());
	this.arrList = this.allItems;
	this.updateList();
    },
//    deleteItem : function(inSender, inIndex) {
//	cacheMan.showScrim();
//	var obj = null;
//	if (obj = this.arrList[inIndex]) {
//	    var entityKind = null;
//	    if (obj.rancher_type == 1) {
//		entityKind = crudRancher;
//	    } else if (obj.rancher_type == 2) {
//		entityKind = crudEnterpriseRancher;
//	    }
//
//	    entityKind.remove(obj, this, "reset");
//	}
//    },
    on_add : function() {
	this.$.frmPopUp.close();
	this.reset();
    },
    on_upd : function() {
	this.$.frmPopUp.close();
	this.reset();
    },
    on_cancel : function() {
	this.$.frmPopUp.close();
    }
});