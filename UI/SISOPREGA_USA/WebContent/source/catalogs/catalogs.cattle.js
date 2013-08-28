enyo.kind(
  {
    name : "catalogs.cattle",
    kind : "VFlexBox",
    events :
      {
        onAdd : "",
        onCancel : ""
      },
    flex : 1,
    components :
      [
        {
          kind : "RowGroup",
          defaultKind : "HFlexBox",
          className : "formBG",
          components :
            [
              {
                name : "className",
                kind : "Input",
                hint : "Clase"
              },
              {
                name : "minWeight",
                kind : "Input",
                inputType : "number",
                hint : "Peso Mínimo"
              },
              {
                name : "maxWeight",
                kind : "Input",
                inputType : "number",
                hint : "Peso Máximo"
              },
              {
                layoutKind : enyo.HFlexLayout,
                align : "center",
                components :
                  [
                    {
                      content : "Novillos",
                      className : "enyo-label",
                      flex : 1
                    },
                    {
                      kind : "CheckBox",
                      name : "isForSteers"
                    } ]
              },
              {
                layoutKind : enyo.HFlexLayout,
                align : "center",
                components :
                  [
                    {
                      content : "Vaquillas",
                      className : "enyo-label",
                      flex : 1
                    },
                    {
                      kind : "CheckBox",
                      name : "isForHeifers"
                    } ]
              },
              {
                layoutKind : enyo.HFlexLayout,
                align : "center",
                components :
                  [
                    {
                      content : "Caballos",
                      className : "enyo-label",
                      flex : 1
                    },
                    {
                      kind : "CheckBox",
                      name : "isForHorses"
                    } ]
              },
              {
                kind : "Drawer",
                name : "draAdd",
                components :
                  [
                    {
                      layoutKind : "HFlexLayout",
                      align : "center",
                      components :
                        [
                          {
                            kind : "Button",
                            name : "btnAdd",
                            className : "enyo-button-affirmative",
                            caption : "Crear",
                            onclick : "add",
                            flex : 1
                          },
                          {
                            kind : "Button",
                            name : "btnCancel",
                            className : "enyo-button-negative",
                            flex : 1,
                            caption : "Cancelar",
                            onclick : "doCancel"
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
                      align : "center",
                      components :
                        [
                          {
                            kind : "Button",
                            name : "btnUpdate",
                            className : "enyo-button-affirmative",
                            flex : 1,
                            caption : "Actualizar",
                            onclick : "update"
                          },
                          {
                            kind : "Button",
                            name : "btnCancel",
                            className : "enyo-button-negative",
                            flex : 1,
                            caption : "Cancelar",
                            onclick : "doCancel"
                          }, ]
                    } ]
              } ]
        } ],
    toggleAdd : function() {
      this.$.draAdd.setOpen(true);
      this.$.draUpdate.setOpen(false);
    },
    toggleUpdate : function() {
      this.$.draAdd.setOpen(false);
      this.$.draUpdate.setOpen(true);
    },
    add : function() {
      var cattle_types = [];
      if(this.$.isForSteers.getChecked())
        cattle_types.push(1);
      
      if(this.$.isForHeifers.getChecked())
        cattle_types.push(2);
      
      if(this.$.isForHorses.getChecked())
        cattle_types.push(3);
        
      var newCattleClass =
        {
          name : this.$.className.value,
          min_weight : this.$.minWeight.value,
          max_weight : this.$.maxWeight.value,
          cattle_types : cattle_types
        };

      if(newCattleClass.cattle_types.length==0){
        cacheMan.setMessage("","Seleccione el tipo de ganado compatible con esta clasificación.");
        return false;
      }
      
      cacheClasses.add(newCattleClass);
      this.doAdd();
    }
  });