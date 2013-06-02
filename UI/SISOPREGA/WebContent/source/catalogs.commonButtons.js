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
    updatingEntityId : 0,
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
    resetValues : function() {
      var controls = this.parent.$;

      for ( var i in controls) {
        if (controls[i].bindTo) {

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
      cacheMan.showScrim();
      var updateObject = this.getEntity();
      this.doBeforeSave(updateObject);
      consumingGateway.Update(this.entityType, updateObject, this, "afterUpdateEntity", this.updatingEntityId);
    },
    cancel : function() {
      this.doResetValues();
      this.doCancel();
    },
    afterAddEntity : function() {
      this.doAddEntity();
    },
    afterUpdateEntity : function(updateResult) {
      if (updateResult.exceptionId != 0) {
        cacheMan.hideScrim();
        cacheMan.setMessage("", "Error al actualizar datos: " + updateResult.exceptionDescription + ".");
      } else {
        this.resetValues();
        this.doUpdateEntity();
        cacheMan.hideScrim();
      }
    },
    getEntity : function() {
      var objEntity = {};

      objEntity[this.entityIdName()] = this.updatingEntityId;

      var controls = this.parent.$;

      for ( var i in controls) {
        if (controls[i].bindTo) {
          objEntity[controls[i].bindTo] = controls[i].getValue();
        }
      }

      return objEntity;
    },
    setEntity : function(entity) {
      var controls = this.parent.$;

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
      var lowerCaseFirstChar = this.entityType.substring(0, 1).toLowerCase();
      var entityNameCamelCase = this.entityType.substring(1, this.entityType.length);
      var idSuffix = "Id";
      var entityIdName = lowerCaseFirstChar + entityNameCamelCase + idSuffix;
      return entityIdName;
    }
  });
