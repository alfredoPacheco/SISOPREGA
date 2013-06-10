enyo.kind({
    name : "catalogs.ranchersList",
    kind : "catalogs.list",
    create:function(){
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
	    this.setCreateKindName("catalogs.ranchers.contact.create");
	    entityKind = cacheEnterpriseRanchers;
	    break;
	case 2:// Crear nuevo ganadero
	    this.setCreateKindName("catalogs.ranchers.person.create");
	    entityKind = cacheRanchers;
	    break;
	}
	
	this.$.create_kind.destroy();
	
	this.$.popup.createComponent({
		kind : this.getCreateKindName(),
		name : "create_kind",
		lazy : "true",
		entityKind: entityKind,
		onAdd : "on_add",
		onUpdate : "on_upd",
		onCancel : "on_cancel",
		flex : 1
	},{owner:this});
	
	this.$.create_kind.toggleAdd();
	this.$.popup.render();
	this.$.popup.openAtCenter();
    },
    add_click : function(inSender, inEvent) {
	this.$.options.openAtEvent(inEvent);
	return false;
    },
    selectItem : function(inSender, inEvent) {
	console.debug(inSender);
	console.debug(inEvent);
    },
    reset : function() {
	this.$.filter.setValue("");
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
    },
});