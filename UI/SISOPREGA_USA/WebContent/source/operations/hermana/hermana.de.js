enyo.kind(
  {
    name : "hermana.de",
    kind : enyo.VFlexBox,
    selectedCattleId : 0,
    hermanaId : 0,
    deWhen : null,
    style : "background-color:#DABD8B;font-size:15px;",
    align : "left",
    events :
      {
        "onSave" : "",
        "onCancel" : ""
      },
    components : [
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
            kind : enyo.Popup,
            name : "popup_print",
            width : "270px",
            height : "80px",
            dismissWithClick : true,
            layoutKind : "VFlexLayout",
            style : "overflow: hidden;border-width: 8px;",
            scrim : true,
            components : [
                  {
                    kind : enyo.Button,
                    caption : "Exporter",
                    onclick : "printExportador",
                    flex : 1,
                    style : "display: table-cell;vertical-align: middle;height: 35px;margin-right: 15px;background-color: #DABD8B;",
                    width : "130px;",
                    name : "printExportadorButton"
                  },
                  {
                    kind : enyo.Button,
                    caption : "Agency",
                    onclick : "printAgencia",
                    flex : 1,
                    style : "display: table-cell;vertical-align: middle;height: 35px;margin-right: 15px;background-color: #DABD8B;",
                    width : "130px;",
                    name : "printAgenciaButton"
                  },
            ]
          },
          {
            kind : "Toolbar",
            name : "HermanaToolBar",
            align : "left",
            pack : "left",
            style : "background:#333;min-height:10px;height:45px;",
            components : [
                  {
                    name : 'btnOpen',
                    onclick : "showOpenHermana",
                    icon : "images/search.png"
                  },
                  {
                    name : 'btnSave',
                    onclick : "saveHermana",
                    icon : "images/save.png"
                  },
                  {
                    name : 'btnPrint',
                    onclick : "printHermana",
                    icon : "images/print.png"
                  },
                  {
                    name : 'btnSend',
                    onclick : "sendSMS",
                    icon : "images/envelope.png",
                  },
                  {
                    fit : true
                  },
                  {
                    name : 'btnClear',
                    onclick : "resetForm",
                    icon : "images/clear.png"
                  }
            ]
          },
          {
            kind : enyo.Scroller,
            flex : 1,
            components : [
                  {
                    kind : enyo.VFlexBox,
                    style : "padding:20px;",
                    pack : "center",
                    flex : 1,
                    components : [
                          {
                            kind : enyo.HFlexBox,
                            align : "center",
                            height : "32px",
                            style : "margin-bottom: 8px;",
                            components : [
                                  {
                                    content : "Entry No",
                                    width : "95px;",
                                    style : "text-align: right;margin-right:5px;"
                                  },
                                  {
                                    kind : "ToolInput",
                                    name : "entryNo",
                                    hint : "",
                                    width : "135px;",
                                    height : "35px;",
                                  },
                                  {
                                    content : "Ref #",
                                    width : "95px;",
                                    style : "text-align: right;margin-right:5px;"
                                  },
                                  {
                                    kind : "ToolInput",
                                    name : "refNo",
                                    hint : "",
                                    width : "135px",
                                    height : "35px",
                                  },
                            ]
                          },
                          {
                            kind : enyo.HFlexBox,
                            align : "center",
                            height : "32px",
                            style : "margin-bottom: 8px;",
                            components : [
                                  {
                                    content : "Consignee",
                                    width : "95px",
                                    style : "text-align: right;margin-right:5px;"
                                  },
                                  {
                                    kind : "ToolInput",
                                    name : "consignee",
                                    hint : "",
                                    width : "500px",
                                    height : "35px",
                                    onEnter : "emularTabulacionConEnter"
                                  }
                            ]
                          },
                          {
                            kind : enyo.HFlexBox,
                            align : "center",
                            height : "32px",
                            style : "margin-bottom: 8px;",
                            components : [
                                  {
                                    content : "Account of",
                                    width : "95px",
                                    style : "text-align: right;margin-right:5px;"
                                  },
                                  {
                                    kind : "ToolInput",
                                    name : "accountOf",
                                    hint : "",
                                    width : "500px",
                                    height : "35px",
                                    onEnter : "emularTabulacionConEnter"
                                  }
                            ]
                          },
                          {
                            kind : enyo.HFlexBox,
                            align : "center",
                            height : "32px",
                            style : "margin-bottom: 8px;",
                            components : [
                                  {
                                    content : "Exporter:",
                                    width : "95px;",
                                    style : "text-align: right;margin-right:5px;"
                                  },
                                  {
                                    kind : "controls.autocomplete",
                                    inputKind : "ToolInput",
                                    name : "rancher_id",
                                    hint : '',
                                    width : "500px;",
                                    height : "35px;",
                                    onEnter : "emularTabulacionConEnter"
                                  },
                                  {
                                    kind : enyo.IconButton,
                                    icon : "images/toolbar-icon-multiselect.png",
                                    onclick : "showAvailReleases",
                                    height : "23px",
                                    width : "23px",
                                    style : "padding: 2px;margin-top: 0px;background-color: #DABD8B;"
                                  }
                            ]
                          }
                    ]
                  },
                  {
                    kind : enyo.VFlexBox,
                    align : "left",
                    height : "40px",
                    width : "945px",
                    style : "margin-left: 20px;",
                    components : [
                        {
                          kind : "hermana.de.tabs",
                          name : "details",
                          onAddClass : "showAddClass"
                        }
                    ]
                  }
            
            ]
          }
    
    ],
    ready : function() {
      // Retrieve ranchers.
      cacheMan.showScrim();
      crudRancher.get(this, "readCallBack");
      crudEnterpriseRancher.get(this, "readCallBack");
      crudPen.get(this, "readCallBack");
      crudCattleQuality.get(this, "readCallBack");
      crudExpenseConcept.get(this, "readCallBack");
    },
    readCounter : 0,
    readCallBack : function() {
      this.readCounter++;
      if (this.readCounter == 5) {
        this.loadAutocompletes();
        this.readCounter = 0;
      }
    },
    loadAutocompletes : function() {
      var arrAllRanchers = crudRancher.getList().concat(crudEnterpriseRancher.getList());
      this.$.rancher_id.setItems(arrAllRanchers);
      this.$.details.$.penAutoComplete.setItems(crudPen.getListUsaPens());
      this.$.details.$.classAutoComplete.setItems(crudCattleQuality.getList());
      this.$.details.$.classAutoCompleteExpo.setItems(crudCattleQuality.getList());
      this.$.details.$.charge.setItems(crudExpenseConcept.getList());
      
      this.resetForm();
      
      cacheMan.hideScrim();
    },
    printHermana : function() {
      if (this.hermanaId) {
        this.$.popup_print.openAtCenter();
      } else {
        cacheMan.setMessage('', 'This record has not been saved on the database yet.');
      }
    },
    printExportador : function() {
      this.$.popup_print.close();
      utils.openReport('/ReportingGateway/Hermana?Id=' + this.hermanaId);
    },
    printAgencia : function() {
      this.$.popup_print.close();
      utils.openReport('/ReportingGateway/Hermana_agencia?Id=' + this.hermanaId);
    },
    sendSMS : function() {
      // Send report
      if (this.hermanaId) {
        var reportName = 'Hermana?HermanaId=' + this.hermanaId;
        consumingGateway.SendReport(this.$.rancher_id.getIndex(), reportName);
      } else {
    	cacheMan.setMessage('', 'This record has not been saved on database yet.');
      }
    },
    resetForm : function() {
      // Set cookied information
      this.$.entryNo.setValue(utils.getCookie('entryNo'));
      this.$.refNo.setValue(utils.getCookie('refNo'));
      this.$.consignee.setValue(utils.getCookie('consignee'));
      this.$.accountOf.setValue(utils.getCookie('accountOf'));
      this.$.rancher_id.setIndex(-1);
      
      // Clean lists from tabs.
      cacheCorte.clear();
      this.$.details.$.listaCorte.setCortes(cacheCorte.get());
      this.$.details.$.listaCorteExpo.setCortes(cacheCorte.getExpo());
      this.$.details.$.chargeList.arrData = [];
      this.$.details.$.chargeList.iSummary = 0;
      this.$.details.$.chargeList.updateList();
      this.$.details.resetSummaryTable();
      this.hermanaId = 0;
      
      this.$.details.$.detailDescription.setContent("");
      this.$.details.setSummary(null);
      this.$.details.tabClicked(this.$.details.$.btnCorte);
      
    },
    cleanPopUpContents : function() {
      if (this.$.releasesList) {
        this.$.releasesList.destroy();
      }
      if (this.$.cattleClass) {
        this.$.cattleClass.destroy();
      }
      if (this.$.hermanaList) {
        this.$.hermanaList.destroy();
      }
    },
    validateSelectedRancher : function() {
      var rancherId = this.$.rancher_id.getIndex();
      var rancherName = this.$.rancher_id.getValue();
      
      if (rancherId == -1 && rancherName == '') {
        cacheMan.setMessage("", "Please select an exporter from the list.");
        return false;
      }
      
      if (rancherId == -1 && rancherName != '') {
        cacheMan.setMessage("", "The typed exporter (" + rancherName
            + ") is not in the list, please select a valid exporter from the list.");
        return false;
      }
      
      cacheCorte.selectedRancherId = rancherId;
      cacheCorte.selectedRancherName = rancherName;
      
      return true;
    },
    showOpenHermana : function() {
      this.cleanPopUpContents();
      cacheMan.showScrim();
      crudHermana.getAll(this, "hermanaListRead");
    },
    hermanaListRead : function(result) {
      
      if (result.exceptionId != 0) {
    	cacheMan.setMessage('', 'There are no imported records on database.');
        cacheMan.hideScrim();
        return false;
      }
      
      this.$.popMan.createComponent(
        {
          kind : "hermana.list",
          name : 'hermanaList',
          entity : crudHermana,
          flex : 1,
          onSelected : "openHermana"
        },
        {
          owner : this
        });
      
      this.$.popMan.validateComponents();
      this.$.hermanaList.setItems(crudHermana.getCatalogsList());
      
      this.$.popMan.render();
      this.$.popMan.openAtCenter();
      cacheMan.hideScrim();
    },
    openHermana : function(sender, selectedItem) {
      // Fill up hermana form
      this.hermanaId = selectedItem.hermanaId;
      this.deWhen = utils.dateIn(selectedItem.deWhen);
      this.$.accountOf.setValue(selectedItem.accountOf);
      this.$.refNo.setValue(selectedItem.refNo);
      this.$.consignee.setValue(selectedItem.consignee);
      this.$.rancher_id.setIndex(selectedItem.rancherId);
      this.$.entryNo.setValue(selectedItem.entryNo);
      
      this.$.details.resetSummaryTable();
      this.setupReleases(selectedItem.Reception);
      
      cacheCorte.cortes = selectedItem.HermanaCorte;
      cacheCorte.cortesExpo = selectedItem.HermanaCorteExportador;
      
      
      this.$.details.$.chargeList.arrData = selectedItem.HermanaExpense;
      
      this.$.details.$.listaCorte.loadCortes(cacheCorte.get());
      this.$.details.$.listaCorteExpo.loadCortes(cacheCorte.getExpo());
      
      this.$.details.setCattleClass(selectedItem.cattleClass, selectedItem.cattleClassName);
      for ( var i = 0; i < cacheCorte.cortes.length; i++) {
        this.$.details.calculateSummaryFromCorte(cacheCorte.cortes[i]);
      }
      
      this.$.details.$.chargeList.iSummary = 0;
      this.$.details.$.chargeList.updateList();
      
      this.closePopUp();
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
          kind : "catalogs.quality.form",
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
      cacheMan.hideScrim();
      if (this.selectedCattleId != 0)
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
      this.setupReleases(this.$.releasesList.selectedReceptions);
      this.$.details.addCookiedCharges();
      
      this.closePopUp();
    },
    setupReleases : function(releasesArray) {
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
      
      for ( var selectionIndex = 0; selectionIndex < releasesArray.length; selectionIndex++) {
        releaseObj = releasesArray[selectionIndex];
        
        summary.hc += utils.parseToNumber(releaseObj.heads);
        summary.kg += utils.parseToNumber(releaseObj.weight);
        summary.rejects_hc += utils.parseToNumber(releaseObj.rejects_heads);
        summary.rejects_kgs += utils.parseToNumber(releaseObj.rejects_weight);
      }
      
      if (releaseObj != null) {
        this.selectedCattleId = releaseObj.cattleType;
        this.$.details.setCattleClass(releaseObj.cattleType, releaseObj.cattleName);
        cacheCorte.selectedCattleType = releaseObj.cattleName;
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
      
      cacheCorte.clear();
      this.$.details.$.listaCorte.setCortes(cacheCorte.get());
      this.$.details.$.listaCorteExpo.setCortes(cacheCorte.getExpo());
      
      this.$.details.setReleased(releasesArray);
      this.$.details.setSummary(summary);
      this.$.details.updateTableContents();
      
    },
    saveHermana : function() {
      cacheMan.showScrim();
      var hermana =
        {
          accountOf : this.$.accountOf.getValue(),
          consignee : this.$.consignee.getValue(),
          entryNo : this.$.entryNo.getValue(),
          hermanaBy : utils.getCookie("username"),
          rancherId : this.$.rancher_id.getIndex(),
          refNo : this.$.refNo.getValue(),
          HermanaCorte : [],
          HermanaCorteExportador : [],
          HermanaExpense : [],
          Reception : []
        };
      
      for ( var i = 0; i < this.$.details.released.length; i++) {
        hermana.Reception.push(this.$.details.released[i]);
      }
      
      for ( var i = 0; i < cacheCorte.cortes.length; i++) {
        var corte = this.CorteOutput(cacheCorte.cortes[i]);
        hermana.HermanaCorte.push(corte);
      }
      
      for ( var i = 0; i < cacheCorte.cortesExpo.length; i++) {
        var corte = this.CorteOutput(cacheCorte.cortesExpo[i]);
        hermana.HermanaCorteExportador.push(corte);
      }
      
      if(!this.$.details.$.chargeList.arrData)
    	this.$.details.$.chargeList.arrData = [];
      
      for ( var i = 0; i < this.$.details.$.chargeList.arrData.length; i++) {
        var expense = this.ExpenseOutput(this.$.details.$.chargeList.arrData[i]);
        hermana.HermanaExpense.push(expense);
      }
      
      if (this.hermanaId == 0) {
        consumingGateway.Create("Hermana", hermana, this, "createCallBack");
      } else {
        hermana.hermanaId = this.hermanaId;
        hermana.deWhen = utils.dateOut(this.deWhen);
        consumingGateway.Update("Hermana", hermana, this, "createCallBack");
      }
    },
    CorteOutput : function(corte) {
      var output =
        {
          barnyardId : corte.barnyardId,
          heads : corte.heads,
          qualityId : corte.qualityId,
          weight : corte.weight,
          cutSeq : corte.cutSeq
        };
      return output;
    },
    ExpenseOutput : function(expense) {
      var output =
        {
          conceptId : expense.expenseConceptId,
          amount : expense.price
        };
      return output;
    },
    createCallBack : function(result) {
      // Save cache information based on data entry.
      if (result.exceptionId != '0') {
    	cacheMan.setMessage('', 'An error has occurred during save process, please check your input.');
        cacheMan.hideScrim();
        return false;
      }
      
      var entryPrefix = this.$.entryNo.getValue().substr(0, 4);
      utils.setCookie("entryNo", entryPrefix, 15);
      
      var refPrefix = this.$.refNo.getValue().substr(0, 4);
      utils.setCookie("refNo", refPrefix, 15);
      utils.setCookie("consignee", this.$.consignee.getValue(), 15);
      utils.setCookie("accountOf", this.$.accountOf.getValue(), 15);
      utils.setCookie("expenses", this.chargesIndexString(this.$.details.$.chargeList.arrData), 15);
      
      this.doSave();
      cacheMan.hideScrim();
      alert('Hermana record has been successfully saved on database.');
    },
    chargesIndexString : function(chargesArray) {
      var result = '';
      for ( var i = 0; i < chargesArray.length; i++) {
        var charge = chargesArray[i];
        result += charge.expenseConceptId + ',';
      }
      return result;
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