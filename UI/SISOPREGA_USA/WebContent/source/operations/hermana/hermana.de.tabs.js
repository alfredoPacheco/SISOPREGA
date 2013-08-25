enyo.kind(
  {
    name : "hermana.de.tabs",
    kind : "VFlexBox",
    events :
      {
        onAddClass : ""
      },
    summary : null,
    releaseIds : [],
    cattleClassName : "",
    components :
      [
        {
          kind : "Popup",
          name : "popNewCharge",
          dismissWithClick : true,
          layoutKind : "VFlexLayout",
          style : "overflow: hidden",
          width : "95%",
          height : "30%",
          style:"max-width: 600px;max-height: 140px;",
          scrim : true,
          components :
            [
              {
                kind : "hermana.gastos.concepto",
                name : "concepto",
                onAddCharge : "addNewCharge",
                onCancel : "closePopUp",
                flex : 1
              } ]
        },
        {
          name : "tabButtons",
          kind : "TabGroup",
          width: "750px",
          components :
            [
              {
                kind : "TabButton",
                name : "btnCorte",
                tab:1,
                content : "Corte",
                onclick : "tabClicked",
                height:"30px",
                style:"-webkit-border-image: none;color: white;background-color: chocolate;border-style: solid;border-width: 1px 1px 0px 1px;border-color: #333;border-radius: 30px 10px 0px 0px;font-size:15px;padding: 5px 0px 0px 0px;"
                    
              },
              {
                kind : "TabButton",
                name : "btnCorteExportador",
                tab:2,
                content : "Corte Exportador",
                onclick : "tabClicked",
                height:"30px",
                style:"-webkit-border-image: none;color: white;background-color: chocolate;border-style: solid;border-width: 1px 1px 0px 1px;border-color: #333;border-radius: 30px 10px 0px 0px;font-size:15px;padding: 5px 0px 0px 0px;"
              },
              {
                kind : "TabButton",
                name : "btnGastos",
                tab:3,
                content : "Gastos",
                onclick : "tabClicked",
                height:"30px",
                style:"-webkit-border-image: none;color: white;background-color: chocolate;border-style: solid;border-width: 1px 1px 0px 1px;border-color: #333;border-radius: 30px 10px 0px 0px;font-size:15px;padding: 5px 0px 0px 0px;"
              },
              {
                kind : "TabButton",
                name : "btnSummary",
                tab:4,
                content : "Resumen",
                onclick : "tabClicked",
                height:"30px",
                style:"-webkit-border-image: none;color: white;background-color: chocolate;border-style: solid;border-width: 1px 1px 0px 1px;border-color: #333;border-radius: 30px 10px 0px 0px;font-size:15px;padding: 5px 0px 0px 0px;"	
              } ]
        },
        {
          kind : "VFlexBox",
          name : "tabCorte",
          className : "tab",
          showing : true,
          height: "285px",
          components :
            [
              {
                kind : "HFlexBox",
                components :
                  [
                    {
                      kind : "controls.autocomplete",
                      name : "penAutoComplete",
                      hint : "Corral",
                      inputKind : "ToolInput",
                      flex : 1,
                      contentPack : "end",
                      onEnter : "emularTabulacionConEnter",
                      height:"35px",
                      width:"200px"
                    },
                    {
                      kind : "controls.autocomplete",
                      name : "classAutoComplete",
                      hint : "Clase",
                      inputKind : "ToolInput",
                      flex : 1,
                      contentPack : "end",
                      onEnter : "emularTabulacionConEnter",
                      height:"35px",
                      width:"300px"
                    },
                    {
                      kind : enyo.IconButton,
                      icon : "../SISOPREGA_WEB_LIB/images/menu-icon-new.png",
                      onclick : "doAddClass",
                      height: "23px",
                      width: "23px",
                      style:"padding: 2px;margin-top: 0px;background-color: #DABD8B;"
                    },
                    {
                      kind : "ToolInput",
                      name : "headCount",
                      style : "width:20%",
                      hint : "Cabezas",
                      height:"35px",
                      width:"200px"
                    },
                    {
                      kind : "ToolInput",
                      name : "weight",
                      style : "width:20%",
                      hint : "Peso",
                      height:"35px",
                      width:"200px"
                    },
                    {
                      kind : enyo.IconButton,
                      icon : "../SISOPREGA_WEB_LIB/images/menu-icon-new.png",
                      className : "enyo-button-affirmative",
                      onclick : "agregarCorte",
                      height: "23px",
                      width: "23px",
                      style:"padding: 2px;margin-top: 0px;"
                    } ]
              },
              {
                kind : "HFlexBox",
                name : "detailDescription",                
                style : "font-size:13px;",
                height:"17px"
              },
              {
                kind : "hermana.corte.list",
                name : "listaCorte",
                onRemoveCorte : "corteRemoved",
//                style : "border: solid 1px black;",
//                height:"200px",
                flex:1
              } ]
        },
        {
          kind : "VFlexBox",
          name : "tabCorteExportador",
          className : "tab",
          showing : false,
          height: "285px",
          components :
            [
              {
                kind : "Toolbar",
                name : "ExpoToolBar",
                align : "left",
                pack : "left",
                style : "background-color:transparent;-webkit-border-image:none;min-height:10px;height:45px;",
                components :
                  [
                    {
                      name : 'btnPrint',
                      onclick : "printHermana",
                      icon : "images/print.png",
                    },
                    {
                      name : 'btnSave',
                      onclick : "saveHermana",
                      icon : "images/save.png",
                    },
                    {
                      name : 'btnCancel',
                      onclick : "resetForm",
                      icon : "images/clear.png",
                    },
                    {
                      fit : true,
                    },
                    {
                      name : 'btnSend',
                      onclick : "open",
                      icon : "images/envelope.png",
                    } ]
              },
              {
                kind : "HFlexBox",
                align:"stretch",
                height:"35px",
                components :
                  [
                    {
                	kind:"ToolInput",
                      name : "lblCorralExpo",
                      flex : 1,
                      contentPack : "end",
                      hint:"",
                      height:"35px",
                      disabled:true
                    },
                    {
                      kind : "controls.autocomplete",
                      name : "classAutoCompleteExpo",
                      inputKind:"ToolInput",
                      hint : "clase",
                      flex : 1,
                      contentPack : "end",
                      onEnter : "emularTabulacionConEnter",
                      height:"35px"
                    },
                    {
                	kind:"ToolInput",
                      name : "lblHeadsExpo",
                      flex : 1,
                      contentPack : "end",
                      hint:"",
                      height:"35px",
                      disabled:true
                    },
                    {
                	kind:"ToolInput",
                      name : "lblWeightExpo",
                      flex : 1,
                      contentPack : "end",
                      hint:"",
                      height:"35px",
                      disabled:true
                    },
                    {
                      kind : enyo.IconButton,
                      icon : "../SISOPREGA_WEB_LIB/images/menu-icon-new.png",
                      className : "enyo-button-affirmative",
                      onclick : "reClassify",
                      height:"20px",
                      style:"padding: 2px;margin-top: 0px;width: 23px;height: 23px;"
                    } ]
              },
              {
                kind : "hermana.corte.list",
//                style : "border: thin dotted black;", 
//                height:"200px",
                flex:1,
                name : "listaCorteExpo",
                onRemoveCorte : "clearCorteExpoDataEntry",
                onCorteSelected : "setupCorteSelected"
              } ]
        },
        {
          kind : "VFlexBox",
          name : "tabGastos",
          className : "tab",
          showing : false,
          height: "285px",
          components :
            [
              {
                kind : "HFlexBox",
                components :
                  [
                    {
                      kind : "controls.autocomplete",
                      name : "charge",
                      hint : "Concepto",
                      inputKind:"ToolInput",
                      flex : .4,
                      contentPack : "end",
                      onSelectItem : "chargeSelected",
                      onEnter : "chargeSelected",
                      height:"35px"                      
                    },
                    {
                      kind : enyo.IconButton,
                      icon : "../SISOPREGA_WEB_LIB/images/menu-icon-new.png",
                      onclick : "showNewCharge",
                      height:"23px",
                      width:"23px",
                      style:"padding: 2px;margin-top:0px;background-color: #DABD8B;"
                    },
                    {
                      kind : "ToolInput",
                      name : "charge_price",
                      hint : "Monto",
                      height:"35px"
                    },
                    {
                      kind : enyo.IconButton,
                      icon : "../SISOPREGA_WEB_LIB/images/menu-icon-new.png",
                      className : "enyo-button-affirmative",
                      onclick : "addCharge",
                      height:"23px",
                      width:"23px",
                      style:"padding: 2px;margin-top:0px;"
                    } ]
              },
              {
                kind : "hermana.gastos.list",
                name : "chargeList",
//                style : "border: thin dotted black;",
                flex:1
              } ]
        },
        {
          kind : "VFlexBox",
          name : "tabSummary",
          className : "tab",
          showing : false,
          height: "285px",
          components :
            [
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
                      name : "summaryTotal",
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
              } ]
        } ],
    ready : function() {
      this.$.penAutoComplete.setItems(cachePen.getList());
      this.$.classAutoComplete.setItems(cacheClasses.getList());
      this.$.classAutoCompleteExpo.setItems(cacheClasses.getList());
      this.$.charge.setItems(cacheCharges.getList());
      this.$.listaCorteExpo.$.rowContainer.setConfirmCaption("Reestablecer");
      this.$.listaCorteExpo.isForExporter = true;
      this.tabClicked(this.$.btnCorte);
      
      this.$.lblCorralExpo.$.input.applyStyle("-webkit-text-fill-color","black");
      this.$.lblCorralExpo.$.input.applyStyle("opacity","1");
      
      this.$.lblHeadsExpo.$.input.applyStyle("-webkit-text-fill-color","black");
      this.$.lblHeadsExpo.$.input.applyStyle("opacity","1");
      
      this.$.lblWeightExpo.$.input.applyStyle("-webkit-text-fill-color","black");
      this.$.lblWeightExpo.$.input.applyStyle("opacity","1");
      
    },
    tabClicked:function(inSender, inEvent){
	this.$.btnCorte.applyStyle("background-color", "chocolate");
	this.$.btnCorteExportador.applyStyle("background-color", "chocolate");
	this.$.btnGastos.applyStyle("background-color", "chocolate");
	this.$.btnSummary.applyStyle("background-color", "chocolate");
	
	inSender.applyStyle("background-color", "#333");
	
	switch(inSender.tab){
	case 1:
	    this.showCorte();
	    break;
	case 2:
	    this.showCorteExportador();
	    break;
	case 3:
	    this.showGastos();
	    break;
	case 4:
	    this.showSummary();
	    break;
	} 
    },
    showCorte : function() {
      this.$.tabCorte.setShowing(true);
      this.$.tabCorteExportador.setShowing(false);
      this.$.tabGastos.setShowing(false);
      this.$.tabSummary.setShowing(false);
    },
    showCorteExportador : function() {
      this.$.tabCorte.setShowing(false);
      this.$.tabCorteExportador.setShowing(true);
      this.$.tabGastos.setShowing(false);
      this.$.tabSummary.setShowing(false);
    },
    showGastos : function() {
      this.$.tabCorte.setShowing(false);
      this.$.tabCorteExportador.setShowing(false);
      this.$.tabGastos.setShowing(true);
      this.$.tabSummary.setShowing(false);
    },
    showSummary : function() {
      this.$.tabCorte.setShowing(false);
      this.$.tabCorteExportador.setShowing(false);
      this.$.tabGastos.setShowing(false);
      this.$.tabSummary.setShowing(true);
    },
    setCattleClass : function(cattleClass, cattleClassName) {
      this.$.classAutoComplete.setItems(cacheClasses.getList(cattleClass));
      this.cattleClassName = cattleClassName;
    },
    setSummary : function(summaryObj) {
      this.summary = summaryObj;
    },
    setReleaseIds : function(releaseIds) {
      this.releaseIds = releaseIds;
    },
    updateTableContents : function() {
      var data = [];

      var mx_dataRow = [];
      mx_dataRow.push(utils.formatNumberThousands(this.summary.hc));
      mx_dataRow.push(utils.formatNumberThousands(this.summary.kg));
      mx_dataRow.push(utils.formatNumberThousands(this.summary.lbs));
      mx_dataRow.push(utils.formatNumberThousands(this.summary.avg));
      data.push(mx_dataRow);

      var rejects_dataRow = [];
      rejects_dataRow.push(utils.formatNumberThousands(this.summary.rejects_hc));
      rejects_dataRow.push(utils.formatNumberThousands(this.summary.rejects_kgs));
      rejects_dataRow.push(utils.formatNumberThousands(this.summary.rejects_lbs));
      data.push(rejects_dataRow);

      var trade_dataRow = [];
      trade_dataRow.push(utils.formatNumberThousands(this.summary.trade_hc));
      trade_dataRow.push(utils.formatNumberThousands(this.summary.trade_kgs));
      trade_dataRow.push(utils.formatNumberThousands(this.summary.trade_lbs));
      trade_dataRow.push(utils.formatNumberThousands(this.summary.trade_avg));
      data.push(trade_dataRow);

      var net_dataRow = [];
      net_dataRow.push(utils.formatNumberThousands(this.summary.net_hc));
      net_dataRow.push(utils.formatNumberThousands(this.summary.net_kgs));
      net_dataRow.push(utils.formatNumberThousands(this.summary.net_lbs));
      net_dataRow.push(utils.formatNumberThousands(this.summary.net_avg));
      data.push(net_dataRow);

      this.$.summary.setData(data);

      var total_data = [];

      var total_deltaRow = [];
      total_deltaRow.push(utils.formatNumberThousands(this.summary.delta));
      total_data.push(total_deltaRow);

      var total_pctRow = [];
      total_pctRow.push(this.summary.delta_pct + ' %');
      total_data.push(total_pctRow);

      this.$.summaryTotal.setData(total_data);

      var corteDelta = this.summary.trade_hc - this.summary.net_hc;
      var detailDescription = "Cortando " + utils.formatNumberThousands(this.summary.trade_hc) + " " + this.cattleClassName + ", "
          + utils.formatNumberThousands(corteDelta) + " por cortar";

      this.$.detailDescription.setContent(detailDescription);
    },
    agregarCorte : function() {
      var cutRecord =
        {
          pen_id : this.$.penAutoComplete.getIndex(),
          pen_name : this.$.penAutoComplete.getValue(),
          cattleClassId : this.$.classAutoComplete.getIndex(),
          cattleClassName : this.$.classAutoComplete.getValue(),
          heads : this.$.headCount.getValue(),
          weight : this.$.weight.getValue()
        };

      cacheCorte.add(cutRecord);

      this.$.listaCorte.setCortes(cacheCorte.get());
      this.$.listaCorteExpo.setCortes(cacheCorte.getExpo());

      this.clearCorteDataEntry();
      this.calculateSummaryFromCorte(cutRecord);
    },
    calculateSummaryFromCorte : function(cutRecord) {
      this.summary.net_hc += Number(cutRecord.heads);
      this.summary.net_lbs += Number(cutRecord.weight);
      this.summary.net_kgs += Math.floor(cutRecord.weight * 45.3592) / 100;
      this.summary.net_avg = this.summary.net_hc == 0 ? 0 : Math.floor(this.summary.net_lbs / this.summary.net_hc * 100) / 100;

      this.summary.delta = this.summary.net_lbs - this.summary.trade_lbs;
      this.summary.delta_pct = Math.floor((this.summary.delta / this.summary.trade_lbs) * 100);

      this.updateTableContents();
    },
    clearCorteDataEntry : function() {
      this.$.penAutoComplete.clear();
      this.$.classAutoComplete.clear();
      this.$.headCount.setValue('');
      this.$.weight.setValue('');
      this.$.penAutoComplete.$.textField.forceFocus();
    },
    clearCorteExpoDataEntry : function() {
      this.$.lblCorralExpo.setValue("");
      this.$.lblHeadsExpo.setValue("");
      this.$.lblWeightExpo.setValue("");
      this.$.classAutoCompleteExpo.clear();
    },
    corteRemoved : function() {
      this.clearCorteSummary();
      var cortes = cacheCorte.get();
      for ( var i = 0; i < cortes.length; i++) {
        this.calculateSummaryFromCorte(cortes[i]);
      }
      this.$.listaCorte.loadCortes();
      this.$.listaCorteExpo.loadCortes();
    },
    clearCorteSummary : function() {
      this.summary.net_hc = 0;
      this.summary.net_lbs = 0.0;
      this.summary.net_kgs = 0.0;
      this.summary.net_avg = 0.0;

      this.summary.delta = this.summary.net_lbs - this.summary.trade_lbs;
      this.summary.delta_pct = Math.floor((this.summary.delta / this.summary.trade_lbs) * 100);

      this.updateTableContents();
    },
    chargeSelected : function() {
      if (this.$.charge.getIndex() > -1) {
        //this.$.charge_price.setValue(cacheCharges.getList()[this.$.charge.getIndex()-1].charge_price);
      }
    },
    addCharge : function() {
      if (this.$.charge.getIndex() > -1) {
        this.$.chargeList.addCharge(
          {
            charge_desc : this.$.charge.getValue(),
            charge_price : this.$.charge_price.getValue()
          });
        this.$.charge.setIndex(-1);
        this.$.charge_price.setValue("");
        this.$.charge.setValue("");
      } else {
        alert("Concepto no registrado");
      }
    },
    showNewCharge : function() {
      this.$.popNewCharge.openAtCenter();
    },
    closePopUp : function() {
      this.$.charge.setItems(cacheCharges.getList());
      this.$.charge.render();
      this.$.popNewCharge.close();
    },
    addNewCharge : function() {
      cacheCharges.addData(this.$.concepto.getCharge(), this, "closePopUp");
    },
    setupCorteSelected : function() {
      if (this.$.listaCorteExpo.iSelected == undefined) {
        this.$.lblCorralExpo.setValue("");
        this.$.lblHeadsExpo.setValue("");
        this.$.lblWeightExpo.setValue("");
        this.$.classAutoCompleteExpo.setIndex(-1);

        return false;
      }

      var cortes = cacheCorte.getExpo();
      var selectedCorte = cortes[this.$.listaCorteExpo.iSelected];

      this.$.lblCorralExpo.setValue("Corral: " + selectedCorte.pen_name);
      this.$.lblHeadsExpo.setValue("Cabezas: " + utils.formatNumberThousands(selectedCorte.heads));
      this.$.lblWeightExpo.setValue("Peso: " + utils.formatNumberThousands(selectedCorte.weight) + " lbs.");
      this.$.classAutoCompleteExpo.setIndex(selectedCorte.cattleClassId);
    },
    reClassify : function() {
      if (this.$.listaCorteExpo.iSelected == -1) {
        alert("No hay registro seleccionado para re clasificación");
        return false;
      }

      var selectedIdx = this.$.listaCorteExpo.iSelected;
      var selectedCorteExpo = cacheCorte.cortesExpo[selectedIdx];

      // Find a row where it can be re classified.
      var cortes = cacheCorte.getExpo();
      var reclassifiedInRecord = false;
      for ( var corteIdx = 0; corteIdx < cortes.length; corteIdx++) {
        if (selectedIdx != corteIdx && this.$.classAutoCompleteExpo.getIndex() == cortes[corteIdx].cattleClassId) {
          // found record, merge and delete
          cacheCorte.cortesExpo[corteIdx].pen_name += ", " + selectedCorteExpo.pen_name;
          cacheCorte.cortesExpo[corteIdx].heads = Number(cacheCorte.cortesExpo[corteIdx].heads) + Number(selectedCorteExpo.heads);
          cacheCorte.cortesExpo[corteIdx].weight = Number(cacheCorte.cortesExpo[corteIdx].weight) + Number(selectedCorteExpo.weight);

          for ( var rIdx = 0; rIdx < selectedCorteExpo.recordIds.length; rIdx++) {
            cacheCorte.cortesExpo[corteIdx].recordIds.push(selectedCorteExpo.recordIds[rIdx]);
          }

          reclassifiedInRecord = true;

          this.$.listaCorteExpo.iSelected = -1;
          cacheCorte.cortesExpo.splice(selectedIdx, 1);

          break;
        }
      }

      if (!reclassifiedInRecord) {
        // no record found for classification, reclassify in own record
        cacheCorte.cortesExpo[selectedIdx].cattleClassId = this.$.classAutoCompleteExpo.getIndex();
        cacheCorte.cortesExpo[selectedIdx].cattleClassName = this.$.classAutoCompleteExpo.getValue();
      }

      this.$.listaCorteExpo.setCortes(cacheCorte.getExpo());

    }
  });