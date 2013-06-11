enyo.kind({
    name : "catalogs.create",
    kind : enyo.SlidingView,
    layoutKind : enyo.VFlexLayout,
    iCreated : null,
    events : {
	onAddEntity : "",
	onUpdateEntity : "",
	onCancel : "",
    },
    updatingEntityId : 0,
    parentObject : null,
    published : {
	entityKind : null
    },
    components : [ {
	kind : enyo.Scroller,
	autoHorizontal : false,
	horizontal : false,
	className : "listBG",
	flex : 1,
	components : [ {
	    kind : "RowGroup",
	    name : "rowGroup",
	    defaultKind : "HFlexBox",
	    caption : "",
	    components : []
	} ]
    }, {
	kind : "Drawer",
	name : "draAdd",
	components : [ {
	    layoutKind : "HFlexLayout",
	    style : "padding:0px 20px;",
	    align : "center",
	    pack : "center",
	    components : [ {
		kind : "Button",
		name : "btnAdd",
		className : "enyo-button-affirmative",
		flex : 1,
		caption : "Crear",
		onclick : "addEntity"
	    }, {
		kind : "Button",
		name : "btnCancelCreate",
		className : "enyo-button-negative",
		flex : 1,
		caption : "Cancelar",
		onclick : "cancel"
	    } ]
	} ]
    }, {
	kind : "Drawer",
	name : "draUpdate",
	components : [ {
	    layoutKind : "HFlexLayout",
	    style : "padding:0px 20px;",
	    align : "center",
	    pack : "center",
	    components : [ {
		kind : "Button",
		name : "btnUpdate",
		className : "enyo-button-affirmative",
		flex : 1,
		caption : "Actualizar",
		onclick : "updateEntity"
	    }, {
		kind : "Button",
		name : "btnCancelUpd",
		className : "enyo-button-negative",
		flex : 1,
		caption : "Cancelar",
		onclick : "cancel"
	    }, ]
	} ]
    } ],
    ready : function() {
	this.$.draAdd.setOpen(true);
	this.$.draUpdate.setOpen(false);
	this.resetValues();
    },
    resetValues : function() {
	var controls = this.$;

	for ( var i in controls) {
	    if (controls[i].bindTo) {
		controls[i].setValue("");
	    }
	}
    },
    addEntity : function() {
	cacheMan.showScrim();
	var obj = this.getEntity();
	if (this.beforeSave(obj)) {
	    delete obj[this.entityIdName()];
	    this.entityKind.create(obj, this, "afterAddEntity");
	}

	// if (this.parentObject != null) {
	// if (this.parentObject[this.entityKind] === undefined) {
	// this.parentObject[this.entityKind] = [];
	// }
	//
	// this.parentObject[this.entityKind].push(obj);
	// consumingGateway.Update(this.parentObject.entityName,
	// this.parentObject, this, "afterAddEntity",
	// this.updatingEntityId);
	// } else {
	// entityKind.create(obj,this, "afterAddEntity");
	// }
    },
    updateEntity : function() {
	cacheMan.showScrim();
	var updateObject = this.getEntity();
	if (this.beforeSave(updateObject)) {
	    this.entityKind.update(updateObject, this, "afterUpdateEntity");
	}

	// consumingGateway.Update(this.entityKind, updateObject, this,
	// "afterUpdateEntity", this.updatingEntityId);
    },
    beforeSave : function(obj) {
	// this function can be overriden in order to do something with obj
	// can do validations, if false, will cancel save operation.
	return true;
    },
    cancel : function() {
	this.resetValues();
	this.doCancel();
    },
    afterAddEntity : function() {
	this.doAddEntity();
	cacheMan.hideScrim();
    },
    afterUpdateEntity : function(updateResult) {
	this.doUpdateEntity();
	cacheMan.hideScrim();
    },
    getEntity : function() {
	var objEntity = {};

	objEntity[this.entityIdName()] = this.updatingEntityId;

	var controls = this.$;

	for ( var i in controls) {
	    if (controls[i].bindTo) {
		objEntity[controls[i].bindTo] = controls[i].getValue();
	    }
	}

	return objEntity;
    },
    setEntity : function(entity) {
	var controls = this.$;

	for ( var i in controls) {
	    if (controls[i].hasOwnProperty("bindTo")) {
		var val = entity[controls[i].bindTo];
		if (val !== undefined) {
		    controls[i].setValue(val);
		}
	    }
	}

	this.updatingEntityId = entity[this.entityIdName()];

	this.toggleUpdate();
    },
    toggleUpdate : function() {
	this.$.draAdd.setOpen(false);
	this.$.draUpdate.setOpen(true);
    },
    toggleAdd : function() {
	this.$.draAdd.setOpen(true);
	this.$.draUpdate.setOpen(false);
	this.resetValues();
    },
    entityIdName : function() {
	var lowerCaseFirstChar = this.entityKind.entityName.substring(0, 1)
		.toLowerCase();
	var entityNameCamelCase = this.entityKind.entityName.substring(1,
		this.entityKind.entityName.length);
	var idSuffix = "Id";
	var entityIdName = lowerCaseFirstChar + entityNameCamelCase + idSuffix;
	return entityIdName;
    }
});