enyo.kind(
  {
    name : "hermana.de",
    kind : enyo.SlidingView,
    layoutKind : enyo.VFlexLayout,
    selectedCattleId : 0,
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
          autoHorizontal : false,
          horizontal : false,
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
                      kind : "hermana.de.tabs",
                      name : "details",
                      onAddClass : "showAddClass"
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
      if (this.$.cattleClass) {
        this.$.cattleClass.destroy();
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
        alert('El exportador que usted ha capturado (' + rancherName + ') no se encuentra en la lista, por favor seleccione un exportador v�lido');
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
            onResolveSelected : "setupReleaseSelection",
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
    showAddClass : function() {
      this.cleanPopUpContents();
      this.$.popMan.createComponent(
        {
          kind : "catalogs.cattle",
          name : 'cattleClass',
          onCancel : "cancelCattle",
          onAdd : "addCattle",
          flex : 1
        },
        {
          owner : this
        });

      this.$.cattleClass.toggleAdd();

      this.$.popMan.render();
      this.$.popMan.openAtCenter();
    },
    cancelCattle : function() {
      this.closePopUp();
    },
    addCattle : function() {
      
      if(this.selectedCattleId!=0)
        this.$.details.setCattleClass(this.selectedCattleId);
      else
        this.$.details.setCattleClass();
      
      this.closePopUp();
    },
    cancelReleaseSelection : function() {
      this.closePopUp();
      this.$.rancher_id.$.textField.forceFocus();
    },
    setupReleaseSelection : function() {
      var summary =
        {
          hc : 0,
          kg : 0.0,
          lbs : 0.0,
          avg : 0.0,
          rejects_hc : 0,
          rejects_kgs : 0.0,
          rejects_lbs : 0.0,
          trade_hc : 0,
          trade_kgs : 0.0,
          trade_lbs : 0.0,
          trade_avg : 0.0,
          net_hc : 0,
          net_kgs : 0.0,
          net_lbs : 0.0,
          net_avg : 0.0,
          delta : 0.0,
          delta_pct : 0.0
        };

      var releaseObj = null;

      for ( var selectionIndex = 0; selectionIndex < this.$.releasesList.selectedIds.length; selectionIndex++) {
        var selectedId = this.$.releasesList.selectedIds[selectionIndex];
        releaseObj = releasesCache.getReleaseById(selectedId);

        summary.hc += releaseObj.heads;
        summary.kg += releaseObj.weight;
        summary.rejects_hc += releaseObj.rejects;
        summary.rejects_kgs += releaseObj.rejectsWeight;
      }

      if (releaseObj != null) {
        this.selectedCattleId = releaseObj.cattleType;
        this.$.details.setCattleClass(releaseObj.cattleType, releaseObj.cattleName);
      } else {
        this.selectedCattleId = 0;
      }

      summary.lbs = Math.floor((summary.kg * 2.2046) * 100) / 100;
      summary.avg = Math.floor((summary.lbs / summary.hc) * 100) / 100;
      summary.rejects_lbs = Math.floor((summary.rejects_kgs * 2.2046) * 100) / 100;

      summary.trade_hc = summary.hc - summary.rejects_hc;
      summary.trade_kgs = summary.kg - summary.rejects_kgs;
      summary.trade_lbs = Math.floor((summary.trade_kgs * 2.2046) * 100) / 100;
      summary.trade_avg = Math.floor((summary.trade_lbs / summary.trade_hc) * 100) / 100;

      this.$.details.setReleaseIds(this.$.releasesList.selectedIds);
      this.$.details.setSummary(summary);
      this.$.details.updateTableContents();
      this.closePopUp();
    },
    saveHermana : function(){
      // TODO: Save data to inner cache, then to database.
      for ( var recordIndex = 0; recordIndex < this.arrDetail.length; recordIndex++) {
        var purchase = this.purchaseFromRecord(recordIndex);
        cachePur.createPurchase(purchase);
      }

      this.arrDetail = [];
      this.doPurchaseCompleted();
    },
    closePopUp : function() {
      this.$.popMan.close();
      this.cleanPopUpContents();
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