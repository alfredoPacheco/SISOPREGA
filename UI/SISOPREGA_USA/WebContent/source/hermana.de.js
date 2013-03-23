enyo.kind(
  {
    name : "hermana.de",
    kind : enyo.VFlexBox,
    events :
      {
        "onSave" : "",
        "onCancel" : ""
      },
    components :
      [
        {
          kind : "Popup",
          name : "popMan",
          dismissWithClick : true,
          showHideMode : "transition",
          openClassName : "zoomFadeIn",
          className : "transitioner2",
          layoutKind : "VFlexLayout",
          style : "overflow: hidden",
          width : "85%",
          height : "85%",
          scrim : true
        },
        {
          kind : "Toolbar",
          name : "HermanaToolBar",
          align : "left",
          pack : "left",
          style : "background:#C9C9C9;min-height:10px;height:45px;",
          components :
            [
              {
                name : 'btnPrint',
                onclick : "printHermana",
                icon : "images/print.png"
              },
              {
                name : 'btnSave',
                onclick : "saveHermana",
                icon : "images/save.png"
              },
              {
                name : 'btnCancel',
                onclick : "resetForm",
                icon : "images/cancel.png"
              },
              {
                fit : true
              },
              {
                name : 'btnOpen',
                onclick : "open",
                icon : "images/search.png"
              } ]
        },
        {
          kind : enyo.Scroller,
          className : "formBG",
          flex : 1,
          components :
            [
              {
                kind : "RowGroup",
                defaultKind : "HFlexBox",
                components :
                  [
                    {
                      kind : "HFlexBox",
                      components :
                        [
                          {
                            kind : "Input",
                            name : "entryNo",
                            hint : "Entry No",
                          },
                          {
                            kind : "Input",
                            name : "refNo",
                            hint : "Ref #",
                          } ]
                    },
                    {
                      kind : "Input",
                      name : "consignee",
                      hint : "Consignatario",
                      flex : 1,
                      contentPack : "end",
                      onEnter : "emularTabulacionConEnter"
                    },
                    {
                      kind : "Input",
                      name : "accountOf",
                      hint : "Cobrar A",
                      flex : 1,
                      contentPack : "end",
                      onEnter : "emularTabulacionConEnter"
                    },
                    {
                      kind : "HFlexBox",
                      components :
                        [
                          {
                            kind : "controls.autocomplete",
                            name : "rancher_id",
                            hint : "Exportador",
                            flex : 1,
                            contentPack : "end",
                            onEnter : "emularTabulacionConEnter"
                          },
                          {
                            kind : enyo.IconButton,
                            icon : "images/search.png",
                            onclick : "showAvailReleases"
                          } ]
                    },
                    {
                      kind : "maklesoft.DataTable",
                      name : "summary",
                      rowCount : 5,
                      colCount : 5,
                      selectionMode : maklesoft.DataTable.SelectionMode.NONE,
                      editable : false,
                      columnNames :
                        [ "cabezas", "Peso (Kgs)", "Peso (Lbs)", "Prom Lbs" ],
                      showColumnNames : true,
                      showRowNumbers : true,
                      rowNames :
                        [ "Llegada en México", "Rechazos", "Cruce descontando desechos", "Peso Neto" ],
                      cellClass : function(rowIndex, colIndex, data) {
                        var className = "maklesoft-datatable-cell";
                        if (typeof data == "number") {
                          className += " maklesoft-datatable-number";
                        }
                        return className;
                      }
                    },
                    {
                      kind : "HFlexBox",
                      components :
                        [
                          {
                            kind : "Spacer"
                          },
                          {
                            kind : "Spacer"
                          },
                          {
                            kind : "maklesoft.DataTable",
                            name : "summary-total",
                            rowCount : 2,
                            colCount : 2,
                            selectionMode : maklesoft.DataTable.SelectionMode.NONE,
                            editable : false,
                            showColumnNames : false,
                            showRowNumbers : true,
                            rowNames :
                              [ "Aumento", "Porcentaje" ],
                            cellClass : function(rowIndex, colIndex, data) {
                              var className = "maklesoft-datatable-cell";
                              if (typeof data == "number") {
                                className += " maklesoft-datatable-number";
                              }
                              return className;
                            }
                          },
                          {
                            kind : "Spacer"
                          } ]
                    },
                    {
                      kind : "hermana.de.tabs"
                    } ]
              } ]
        } ],
    ready : function() {
      this.$.rancher_id.setItems(cacheRanchers.getAllForList());
    },
    resetForm : function() {
      this.$.entryNo.setValue('');
      this.$.refNo.setValue('');
      this.$.rancher_id.index = -1;
      this.$.rancher_id.setValue('');
    },
    cleanPopUpContents : function() {
      if (this.$.releasesList) {
        this.$.releasesList.destroy();
      }
    },
    validateSelectedRancher : function() {
      var rancherId = this.$.rancher_id.getIndex();
      var rancherName = this.$.rancher_id.getValue();

      if (rancherId == -1 && rancherName == '') {
        alert('Seleccione primero un exportador de la lista');
        return false;
      }

      if (rancherId == -1 && rancherName != '') {
        alert('El exportador que usted ha capturado (' + rancherName + ') no se encuentra en la lista, por favor seleccione un exportador válido');
        return false;
      }

      return true;
    },
    showAvailReleases : function() {

      if (this.validateSelectedRancher()) {
        this.cleanPopUpContents();
        this.$.popMan.createComponent(
          {
            kind : "releases.list",
            name : 'releasesList',
            onCancel : "cancelReleaseSelection",
            flex : 1
          },
          {
            owner : this
          });

        var rancherId = this.$.rancher_id.getIndex();
        var rancherName = this.$.rancher_id.getValue();

        this.$.releasesList.setRancher(rancherId, rancherName);

        this.$.popMan.render();
        this.$.popMan.openAtCenter();
      }

    },
    cancelReleaseSelection : function(){
      this.closePopUp();
      this.$.rancher_id.$.textField.forceFocus();
    },
    closePopUp : function() {
      this.$.popMan.close();
    },
    emularTabulacionConEnter : function(inSender) {
      switch (inSender.name) {
      case "rancher_id":
        this.showAvailReleases();
        break;
      case "cattype_id":
        this.$.location_id.setFocus();
        break;
      case "location_id":
        this.$.zone_id.setFocus();
        break;
      case "zone_id":
        this.$.hc_aprox.forceFocus();
        break;
      case "hc_aprox":
        this.$.weight.forceFocus();
        break;
      case "weight":
        if (this.$.draAdd.open == true) {
          this.addReception();
        } else if (this.$.draUpdate.open == true) {
          this.updateReception();
        }
        break;

      }
    },
    key_down : function(inSender, inEvent) {
      if (inEvent.keyCode == 13) {
        this.emularTabulacionConEnter(inSender);
      }
    }
  });