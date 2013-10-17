enyo.kind(
  {
    name : "forms.simple",
    kind : enyo.VFlexBox,
    className : "formBG",
    events :
      {
        onAdd : "",
        onUpdate : "",
        onCancel : "",
        onAfterLoad : ""
      },
    updatingEntityId : 0,
    bUpdatingMode : false,
    objToSet : null,
    errorMessage : "Error al validar datos",
    published :
      {
        entityKind : null, // some crud, example: crudRancher
        parentObject : null
      },
    components : [
          {
            kind : enyo.Scroller,
            name : "mainScroller",
            autoHorizontal : false,
            horizontal : false,
            className : "listBG",
            flex : 1,
            components : []
          },
          {
            kind : "Drawer",
            name : "draAdd",
            components : [
                {
                  layoutKind : "HFlexLayout",
                  style : "padding:0px 20px;",
                  align : "center",
                  pack : "center",
                  components : [
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
                        }
                  ]
                }
            ]
          },
          {
            kind : "Drawer",
            name : "draUpdate",
            components : [
                {
                  layoutKind : "HFlexLayout",
                  style : "padding:0px 20px;",
                  align : "center",
                  pack : "center",
                  components : [
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
                        },
                  ]
                }
            ]
          }
    ],
    create : function() {
      this.inherited(arguments);
      if (this.$.draAdd && this.$.draUpdate) {
        this.$.draAdd.setOpen(true);
        this.$.draUpdate.setOpen(false);
      }
    },
    afterLoad : function() { // Called from subclass
      this.setEntity(this.objToSet, this.bUpdatingMode);
      this.render();
      this.doAfterLoad();
      cacheMan.hideScrim();
    },
    resetValues : function() {
      var controls = this.$;
      for ( var i in controls) {
        if (controls[i].bindTo && !controls[i].fixedValue) {
          this.setValueForControl(controls[i], "");
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
          this.parentObject[this.entityKind.entityName] = this.removeIdLessArray(this.parentObject[this.entityKind.entityName], this.entityKind
              .entityIdName());
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
    removeIdLessArray : function(inArray, idName) {
      var result = [];
      for ( var i = 0; i < inArray.length; i++) {
        var idxObj = inArray[i];
        if (idxObj[idName] && idxObj[idName] != '') {
          result.push(idxObj);
        }
      }
      return result;
    },
    updateEntity : function() {
      cacheMan.showScrim();
      var updateObject = this.getEntity();
      if (this.beforeSave(updateObject)) {
        if (this.parentObject != null) {
          if (this.parentObject[this.entityKind.entityName] === undefined) {
            this.parentObject[this.entityKind.entityName] = [];
          }
          var itemIndex = this.findEntityIndexInParentById(updateObject[this.entityKind.entityIdName()]);
          if (itemIndex != null) this.parentObject[this.entityKind.entityName][itemIndex] = updateObject;
          
          this.entityKind.update(this.parentObject, this, "afterUpdateEntity");
        } else {
          this.entityKind.update(updateObject, this, "afterUpdateEntity");
        }
        
      } else {
        cacheMan.hideScrim();
        cacheMan.setMessage('', this.errorMessage);
      }
    },
    findEntityIndexInParentById : function(id) {
      for ( var i = 0; i < this.parentObject[this.entityKind.entityName].length; i++) {
        if (this.parentObject[this.entityKind.entityName][i][this.entityKind.entityIdName()] == id) return i;
      }
      
      return null;
    },
    afterAddEntity : function(result) {
      // Update array based on parentObject
      if (this.parentObject != null) {
        // Locate parent record in result array by id
        var record = this.getRecordEntityById(result, this.parentObject[this.entityKind.entityIdName(this.parentObject)]);
        // Change array
        if (record != null) {
          this.parentObject[this.entityKind.entityName] = record[this.entityKind.entityName];
        }
      }
      this.entityKind.arrObj.push(this.entityKind.adapterToIn(result.records[0]));
      
      this.doAdd(result);
    },
    afterUpdateEntity : function(updateResult, objOld, objNew) {
      this.doUpdate(objOld, objNew);
    },    
    cancel : function() {
      this.resetValues();
      this.doCancel();
    },
    getRecordEntityById : function(result, id) {
      for ( var i = 0; i < result.records.length; i++) {
        var recordId = result.records[i][this.entityKind.entityIdName(this.parentObject)];
        if (recordId == id) { return result.records[i]; }
      }
      return null;
    },
    getEntity : function() {
      var objEntity = {};
      
      objEntity[this.entityKind.entityIdName()] = this.updatingEntityId;
      
      var controls = this.$;
      
      for ( var i = 0 in controls) {
        if (controls.hasOwnProperty(i)) {
          if (controls[i].belongsTo && controls[i].bindTo) {
            
            if (!objEntity.hasOwnProperty(controls[i].belongsTo)) {
              objEntity[controls[i].belongsTo] = []; // Reception.ReceptionHeadcount = []
              objEntity[controls[i].belongsTo][0] = {};
            }
            objEntity[controls[i].belongsTo][0][controls[i].bindTo] = this.getValueFromControl(controls[i]);
            
          } else if (controls[i].bindTo) {
            objEntity[controls[i].bindTo] = this.getValueFromControl(controls[i]);
          }
        }
      }
      
      return objEntity;
    },
    getValueFromControl : function(control) {
      if (control) {
        switch (control.kindName) {
          case "controls.autocomplete":
            return control.getIndex();
          case "enyo.Control":
            return control.getContent();
          case "enyo.CheckBox":
            return control.getChecked();              
          case "controls.bindedField":
          default:
            return control.getValue();
        }
      }
    },
    setValueForControl : function(control, value) {
      if (control && value !== undefined && value !== null) {
        switch (control.kindName) {
          case "controls.autocomplete":
            control.setIndex(value);
            break;
          case "enyo.Control":
            control.setContent(value);
            break;
          case "enyo.CheckBox":
            control.setChecked(String(value)=='true');
            break;
          case "controls.dateMask":
            if (!this.bUpdatingMode) {
              control.setToday();
              break;
            } // else continue to default case
          case "controls.bindedField":
          default:
            control.setValue(value);
        }
      }
    },
    setEntity : function(entity, bUpdatingMode) {
      if (bUpdatingMode) {
        this.toggleUpdate();
        this.resetValues();
      } else {
        this.toggleAdd();
      }
      
      if (entity) {
        var controls = this.$;
        for ( var i in controls) {
          if (controls[i].hasOwnProperty("belongsTo")) {
            if (entity[controls[i].belongsTo]) this.setValueForControl(controls[i], entity[controls[i].belongsTo][0][controls[i].bindTo]);
          } else if (controls[i].hasOwnProperty("bindTo")) {
            this.setValueForControl(controls[i], entity[controls[i].bindTo]);
          }
        }
        this.updatingEntityId = entity[this.entityKind.entityIdName()];
      }
    },
    toggleUpdate : function() {
      if (this.$.draAdd && this.$.draUpdate) {
        this.bUpdatingMode = true;
        this.$.draAdd.setOpen(false);
        this.$.draUpdate.setOpen(true);
      }
    },
    toggleAdd : function() {
      if (this.$.draAdd && this.$.draUpdate) {
        this.activateAddButtons();
        this.resetValues();
      }
      
    },
    activateAddButtons : function() {
      this.bUpdatingMode = false;
      this.$.draAdd.setOpen(true);
      this.$.draUpdate.setOpen(false);
    },beforeSave : function(obj) {
	// this function can be overriden in order to do something with obj
	// can do validations, if false, will cancel save operation.
	return true;
    }
  });