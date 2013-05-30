enyo.kind(
  {
    name : "catalogs.commonButtons",
    kind : "Control",
    layoutKind : "VFlexLayout",
    events :
      {
        "onAddEntity" : "",
        "onUpdateEntity" : "",
        "onCancel" : "",
        "onResetValues" : "resetValues",
        "onBeforeSave" : ""
      },
    published :
      {
        entityType : ""
      },
    components :
      [
        {
          kind : "Drawer",
          name : "draAdd",
          components :
            [
              {
                layoutKind : "HFlexLayout",
                style : "padding:0px 20px;",
                align : "center",
                pack : "center",
                components :
                  [
                    {
                      kind : "Button",
                      name : "btnAdd",
                      className : "enyo-button-affirmative",
                      flex : 1,
                      caption : "Crear",
                      onclick : "addEntity"
                    },
                    {
                      kind : "Button",
                      name : "btnCancelCreate",
                      className : "enyo-button-negative",
                      flex : 1,
                      caption : "Cancelar",
                      onclick : "cancel"
                    } ]
              } ]
        },
        {
          kind : "Drawer",
          name : "draUpdate",
          components :
            [
              {
                layoutKind : "HFlexLayout",
                style : "padding:0px 20px;",
                align : "center",
                pack : "center",
                components :
                  [
                    {
                      kind : "Button",
                      name : "btnUpdate",
                      className : "enyo-button-affirmative",
                      flex : 1,
                      caption : "Actualizar",
                      onclick : "updateEntity"
                    },
                    {
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
    resetValues:function(){
	var controls = this.parent.$;
	for(var i in controls){
	    if (controls[i].bindTo){
		
		controls[i].setValue("");
	    }
	}
	this.doResetValues();
    },
    addEntity : function() {
      var obj = this.getEntity();
      this.doBeforeSave(obj);
      //	cache.create(this.getEntity(), this, "afterAddEntity");
    },
    updateEntity : function() {
      //	cache.update(this.getEntity(), this, "afterUpdateEntity");
      alert("update Entity");
    },
    cancel : function() {
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
      for ( var i in controls) {
        if (controls[i].bindTo) {
          console.debug(i);
          objEntity[controls[i].bindTo] = controls[i].getValue();
        }
      }
      this.resetValues();
      return objEntity;
    },
    setEntity : function(entity) {
      var controls = this.parent.$;

      for ( var i in controls) {
        if (controls[i].hasOwnProperty("bindTo")) {
          var val = entity[controls[i].bindTo];
          if(val !== undefined)
            controls[i].setValue(val);
        }
      }
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
