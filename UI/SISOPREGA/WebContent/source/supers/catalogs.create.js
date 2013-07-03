enyo.kind({
    name : "catalogs.create",
    kind : enyo.SlidingView,
    layoutKind : enyo.VFlexLayout,
    iCreated : null,
    events : {
	onAdd : "",
	onUpdate : "",
	onCancel : "",
    },
    updatingEntityId : 0,
    errorMessage : "Error al validar datos",
    published : {
	entityKind : null,
	parentObject : null
    },
    components : [ {
	kind : enyo.Scroller,
	name:"mainScroller",
	autoHorizontal : false,
	horizontal : false,
	className : "listBG",
	flex : 1,
	components : []
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
	    delete obj[this.entityKind.entityIdName()]; // Delete id for create operation

	    if (this.parentObject != null) {
		if (this.parentObject[this.entityKind.entityName] === undefined) {
		    this.parentObject[this.entityKind.entityName] = [];
		}
		// Remove IdLess elements
		this.parentObject[this.entityKind.entityName] = this.removeIdLessArray(this.parentObject[this.entityKind.entityName], this.entityKind.entityIdName());
		this.parentObject[this.entityKind.entityName].push(obj);
		this.entityKind.update(this.parentObject, this, "afterAddEntity");
	    } else {
		this.entityKind.create(obj, this, "afterAddEntity");
	    }
	} else {
	    cacheMan.hideScrim();
	    cacheMan.setMessage('', this.errorMessage);
	}
    },
    removeIdLessArray : function(inArray, idName){
	var result = [];
	for(var i = 0; i<inArray.length; i++){
	    var idxObj = inArray[i];
	    if(idxObj[idName] && idxObj[idName]!=''){
		result.push(idxObj);
	    }
	}
	return result;
    },
    updateEntity : function() {
	cacheMan.showScrim();
	var updateObject = this.getEntity();
	if (this.beforeSave(updateObject)) {
	    if(this.parentObject != null){
		if(this.parentObject[this.entityKind.entityName] === undefined){
		    this.parentObject[this.entityKind.entityName] = [];
		}
		var itemIndex = this.findEntityIndexInParentById(updateObject[this.entityKind.entityIdName()]);
		if(itemIndex != null)
		    this.parentObject[this.entityKind.entityName][itemIndex] = updateObject;
		
		this.entityKind.update(this.parentObject, this, "afterUpdateEntity");
	    }else{
		this.entityKind.update(updateObject, this, "afterUpdateEntity");
	    }
	    
	} else {
	    cacheMan.hideScrim();
	    cacheMan.setMessage('', this.errorMessage);
	}
    },
    findEntityIndexInParentById : function(id){
	for(var i = 0; i < this.parentObject[this.entityKind.entityName].length; i++){
	    if(this.parentObject[this.entityKind.entityName][i][this.entityKind.entityIdName()]==id)
		return i;
	}
	
	return null;
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
    afterAddEntity : function(result) {
	// Update array based on parentObject
	if(this.parentObject!=null){
	    // Locate parent record in result array by id
	    var record = this.getRecordEntityById(result, this.parentObject[this.entityKind.entityIdName(this.parentObject)]);
	    // Change array
	    if(record != null){
		this.parentObject[this.entityKind.entityName] = record[this.entityKind.entityName];
	    }
	}
	this.doAdd();
    },
    getRecordEntityById: function(result, id){
	for(var i = 0; i < result.records.length; i++){
	    var recordId = result.records[i][this.entityKind.entityIdName(this.parentObject)];
	    if(recordId == id){
		return result.records[i];
	    }
	}
	return null;
    },
    afterUpdateEntity : function(updateResult) {
	this.doUpdate();
    },
    getEntity : function() {
	var objEntity = {};

	objEntity[this.entityKind.entityIdName()] = this.updatingEntityId;

	var controls = this.$;

	for ( var i in controls) {
	    if (controls[i].bindTo) {
		objEntity[controls[i].bindTo] = controls[i].getValue();
	    }
	}

	return objEntity;
    },
    setEntity : function(entity) {
	this.resetValues();
	var controls = this.$;

	for ( var i in controls) {
	    if (controls[i].hasOwnProperty("bindTo")) {
		var val = entity[controls[i].bindTo];
		if (val !== undefined) {
		    controls[i].setValue(val);
		}
	    }
	}

	this.updatingEntityId = entity[this.entityKind.entityIdName()];

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
    }
});