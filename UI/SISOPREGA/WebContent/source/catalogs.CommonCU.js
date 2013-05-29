enyo.kind({
    name : "catalogs.CommonCU",
    kind : "Control",
    layoutKind : "VFlexLayout",
    events : {
	"onAddEntity" : "",
	"onUpdateEntity" : "",
	"onCancel" : ""
    },
    components : [ {
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
    },
    addEntity : function() {
//	cache.create(this.getEntity(), this, "afterAddEntity");
	this.getEntity();
	alert("add Entity");
    },
    updateEntity : function() {
//	cache.update(this.getEntity(), this, "afterUpdateEntity");
	alert("update Entity");
    },
    cancel :function(){
//	this.doCancel();
	alert("cancel");
    },
    afterAddEntity : function() {
	this.doAddEntity();
    },
    afterUpdateEntity : function() {
	this.doUpdateEntity();
    },
    getEntity : function() {
	var objEntity = {};
	var controls = this.parent.$;
	for(var i in controls){
	    if (controls[i].bindTo){
		console.debug(i);		
		objEntity[controls[i].bindTo] = controls[i].getValue();
	    }
	}
	return objEntity;
    },
    setEntity : function(entity) {
	var controls = this;
	for(var i in controls){
	    if (this[i].hasOwnProperty("bindTo")){
		this[i].setValue(entity[this[i].bindTo]); 
	    }
	}
    },
    toggleUpdate : function() {
	this.$.draAdd.setOpen(false);
	this.$.draUpdate.setOpen(true);
    },
    toggleAdd : function() {
	this.$.draAdd.setOpen(true);
	this.$.draUpdate.setOpen(false);
	// this.resetValues();
    }
});