enyo.kind(
  {
    name : "catalogs.ranchers.list",
    kind : enyo.SlidingView,
    layoutKind : enyo.VFlexLayout,
    cacheRanchers : new cache.ranchers(),
    enterpriseRanchers : new cache.enterpriseRanchers(),
    events :
      {
        "onPerson" : "",
        "onEnterprise" : "",
        "onSelectRancher" : ""
      },
    iSelected : null,
    objList : [],
    allItems : [],
    components :
      [
        {
          name : "options",
          kind : enyo.PopupSelect,
          onSelect : "addNewRancher",
          items :
            [
              {
                caption : "Empresa/Sociedad",
                value : 1
              },
              {
                caption : "Persona Fisica",
                value : 2
              } ]
        },
        {
          kind : enyo.Scroller,
          flex : 1,
          className : "listBG",
          name : "scroller",
          components :
            [
              {
                kind : enyo.VirtualRepeater,
                name : "rancherList",
                onSetupRow : "setupProductRow",
                onclick : "selectRancher",
                components :
                  [
                    {
                      kind : "Divider"
                    },
                    {
                      kind : enyo.SwipeableItem,
                      onConfirm : "deleteRancher",
                      tapHighlight : true,
                      components :
                        [
                          {
                            name : "name",
                            className : "listFirst",
                            content : ""
                          },
                          {
                            name : "info",
                            className : "listSecond",
                            content : ""
                          } ]
                    } ]
              } ]
        },
        {
          kind : "Toolbar",
          height : '100px;',
          components :
            [
              {
                kind : enyo.VFlexBox,
                flex : 1,
                components :
                  [
                    {
                      kind : enyo.HFlexBox,
                      components :
                        [

                          {
                            kind : enyo.IconButton,
                            icon : "images/menu-icon-new.png",
                            onclick : "contextMenuClicked"
                          },
                          {
                            kind : enyo.Spacer
                          },
                          {
                            kind : "ListSelector",
                            name : 'filter_id',
                            label : "Filtro",
                            hideItem : true,
                            onChange : "filterRanchers",
                            items :
                              [
                                {
                                  caption : "Persona Fisica",
                                  value : 1
                                },
                                {
                                  caption : "Empresa/Sociedad",
                                  value : 2
                                },
                                {
                                  caption : "Todo",
                                  value : 3
                                } ],
                            contentPack : "end"
                          } ]
                    },
                    {
                      kind : enyo.HFlexBox,
                      align : "center",
                      components :
                        [
                          {
                            kind : "ToolInput",
                            name : "rancherFilter",
                            align : "left",
                            onkeyup : "key_up",
                            flex : 1,
                            hint : "Filtro de ganadero",
                            changeOnInput : true
                          },
                          {
                            kind : "Button",
                            name : "btnClearFilter",
                            className : "enyo-button-negative",
                            caption : "Remover Filtro",
                            onclick : "clearFilter",
                            width : "115px;"
                          } ]
                    }

                  ]
              } ]
        }, ],
    ready : function() {
      // Reset filter
      this.$.rancherFilter.setValue("");
      this.$.filter_id.setValue(3);

      this.retrieveLists();
    },
    retrieveLists : function() {
      // Retrieve ranchers
      cacheMan.showScrim();
      this.cacheRanchers.get(this, 'readCallback');
      // Retrieve enterprise ranchers
      this.enterpriseRanchers.get(this, 'readCallback');
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

      // Manually concat rancher array
      for ( var i = 0; i < this.cacheRanchers.arrObj.length; i++) {
        this.allItems.push(this.cacheRanchers.arrObj[i]);
      }

      // Manually concat enterprise array
      for ( var i = 0; i < this.enterpriseRanchers.arrObj.length; i++) {
        this.allItems.push(this.enterpriseRanchers.arrObj[i]);
      }

      this.filterRanchers();
    },
    contextMenuClicked : function(inSender, inEvent) {
      this.$.options.openAtEvent(inEvent);
      return false;
    },
    addNewRancher : function(inSender, inSelected) {

      switch (inSelected.value) {
      case 1: //Crear nueva empresa
        this.doEnterprise();
        break;
      case 2://Crear nuevo ganadero 
        this.doPerson();
        break;
      }
    },
    selectRancher : function(inSender, inEvent) {
      if (this.objList[inEvent.rowIndex]) {
        this.iSelected = inEvent.rowIndex;
        this.doSelectRancher();
      }
    },
    getSelected : function() {
      return this.objList[this.iSelected];
    },
    getGroupName : function(inIndex) {
      try {
        // get previous record
        var r0 = this.objList[inIndex - 1];
        // get (and memoized) first letter of last name
        if (r0) {
          r0.letter = r0.sortStr.substr(0, 1).toUpperCase();
        }
        var a = r0 && r0.letter;
        // get record
        var r1 = this.objList[inIndex];
        r1.letter = r1.sortStr.substr(0, 1).toUpperCase();
        var b = r1.letter;
        // new group if first letter of last name has changed
        return a != b ? b : null;
      } catch (e) {
        return null;
      }

    },
    setupDivider : function(inIndex) {
      // use group divider at group transition, otherwise use item border for
      // divider
      var group = this.getGroupName(inIndex);
      this.$.divider.setCaption(group);
      this.$.divider.canGenerate = Boolean(group);
    },
    setupProductRow : function(inSender, inIndex) {
      var objRan;
      if (objRan = this.objList[inIndex]) {
        this.setupDivider(inIndex);
        if (objRan.entityName == 'Rancher') {
          // Diego: Change label to sort order (lastname, name/alias).
          var mother_name = objRan.motherName ? ' ' + objRan.motherName : '';
          if (objRan.aka != "") {
            this.$.name.setContent(objRan.lastName + mother_name + ', ' + objRan.firstName + ' / ' + objRan.aka);
          } else {
            this.$.name.setContent(objRan.lastName + mother_name + ', ' + objRan.firstName);
          }
        } else {
          this.$.name.setContent(objRan.legalName);
        }
        this.$.info.setContent(objRan.phoneNumber);
        return true;
      }
    },
    deleteRancher : function(inSender, inIndex) {
      if (cacheRanchers.del(this.objList[inIndex], this, "filterRanchers")) {
        return true;
      } else {
        return false;
      }
    },
    updateList : function() {
      this.objList = this.objList.sort(function(inA, inB) {
        if (inA.entityName == 'Rancher') {
          var mother_name = inA.motherName ? ' ' + inA.motherName : ' ';
          inA['sortStr'] = inA.lastName.toLowerCase() + mother_name.toLowerCase() + ', ' + inA.firstName.toLowerCase();
        } else if (inA.entityName == 'EnterpriseRancher') {
          inA['sortStr'] = inA.legalName.toLowerCase();
        }

        if (inB.entityName == 'Rancher') {
          var mother_name = inB.motherName ? ' ' + inB.motherName : ' ';
          inB['sortStr'] = inB.lastName.toLowerCase() + mother_name.toLowerCase() + ', ' + inB.firstName.toLowerCase();
        } else if (inB.entityName == 'EnterpriseRancher') {
          inB['sortStr'] = inB.legalName.toLowerCase();
        }

        return inA['sortStr'] < inB['sortStr'] ? -1 : 1;
      });
      this.$.rancherList.render();
      this.$.scroller.scrollIntoView();
    },
    filterRanchers : function() {
      this.objList = [];
      var objRan;

      var arrRanchersAux = this.allItems;
      for ( var i = 0; i < arrRanchersAux.length; i++) {
        objRan = arrRanchersAux[i];
        if (this.$.filter_id.getValue() == 3 || objRan.rancher_type == this.$.filter_id.getValue()) {
          this.objList.push(arrRanchersAux[i]);
        }
      }

      this.updateList();
    },
    key_up : function(inSender, inEvent) {

      var value = "";
      var x = inEvent.keyCode;
      switch (true) {
      case (x == 8): // backspace
      case (x == 32): // space
      case (x >= 46 && x <= 90): // letters and numbers and delete
        break;
      case (x == 16): //Shift
      case (x == 9): // tab
      case (x == 38): // up
      case (x == 40): // down
      case (x == 37): // left
      case (x == 39): // right
      case (x == 13): // enter
        return true;
      }

      value = inSender.value;
      if (value.trim() != "") {
        this.objList = this.findItem(value);
      } else {
        this.objList = this.allItems;
      }
      this.updateList();
    },
    findItem : function(criteria) {
      var result = [];
      if (criteria != "") {
        var items = this.allItems;
        var pattern = new RegExp(criteria.trim(), "ig");
        for (index in items) {
          for (prop in items[index]) {
            pattern.lastIndex = 0;
            if (pattern.test(items[index][prop])) {
              var elemento = items[index];
              result.push(elemento);
              break;
            }
          }
        }
      }
      return result;
    },
    clearFilter : function() {
      this.$.rancherFilter.setValue("");
      this.objList = this.allItems;
      this.updateList();
    }
  });