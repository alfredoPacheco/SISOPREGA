enyo.kind(
  {
    name : "hermana.de.tabs",
    kind : "VFlexBox",
    summary : null,
    releaseIds : [],
    components :
      [
        {
          name : "tabButtons",
          kind : "TabGroup",
          components :
            [
              {
                kind : "TabButton",
                name : "btnCorte",
                content : "Corte",
                onclick : "showCorte"
              },
              {
                kind : "TabButton",
                name : "btnCorteExportador",
                content : "Corte Exportador",
                onclick : "showCorteExportador"
              },
              {
                kind : "TabButton",
                name : "btnGastos",
                content : "Gastos",
                onclick : "showGastos"
              },
              {
                kind : "TabButton",
                name : "btnSummary",
                content : "Resumen",
                onclick : "showSummary"
              } ]
        },
        {
          kind : "VFlexBox",
          name : "tabCorte",
          className : "tab",
          showing : true,
          components :
            [
              {
                kind : "HFlexBox",
                components :
                  [
                    {
                      kind : "controls.autocomplete",
                      name : "penAutocomplete",
                      hint : "corral",
                      flex : 1,
                      contentPack : "end",
                      onEnter : "emularTabulacionConEnter"
                    },
                    {
                      kind : "controls.autocomplete",
                      name : "classAutoComplete",
                      hint : "clase",
                      flex : 1,
                      contentPack : "end",
                      onEnter : "emularTabulacionConEnter"
                    },
                    {
                      kind : enyo.IconButton,
                      icon : "../SISOPREGA/images/menu-icon-new.png",
                      onclick : "addClass"
                    },
                    {
                      kind : "Input",
                      style : "width:20%",
                      hint : "Cabezas"
                    },
                    {
                      kind : "Input",
                      style : "width:20%",
                      hint : "Peso"
                    },
                    {
                      kind : enyo.IconButton,
                      icon : "../SISOPREGA/images/menu-icon-new.png",
                      onclick : "contextMenuClicked"
                    } ]
              },
              {
                kind : "hermana.corte.list",
                style : "border: thin dotted black; height:250px;"
              } ]
        },
        {
          kind : "VFlexBox",
          name : "tabCorteExportador",
          className : "tab",
          showing : false,
          components :
            [
              {
                kind : "HFlexBox",
                components :
                  [
                    {
                      kind : "controls.autocomplete",
                      name : "corral",
                      hint : "corral",
                      flex : 1,
                      contentPack : "end",
                      onEnter : "emularTabulacionConEnter",
                      style : "width:20%"
                    },
                    {
                      kind : "Input",
                      style : "width:20%",
                      hint : "Clase"
                    },
                    {
                      kind : "Input",
                      style : "width:20%",
                      hint : "Cabezas"
                    },
                    {
                      kind : "Input",
                      style : "width:20%",
                      hint : "Peso"
                    },
                    {
                      kind : enyo.IconButton,
                      icon : "../SISOPREGA/images/menu-icon-new.png",
                      onclick : "contextMenuClicked"
                    } ]
              },
              {
                kind : "hermana.corte.list",
                style : "border: thin dotted black; height:250px;"
              } ]
        },
        {
          kind : "VFlexBox",
          name : "tabGastos",
          className : "tab",
          showing : false,
          components :
            [
              {
                kind : "HFlexBox",
                components :
                  [
                    {
                      kind : "Input",
                      hint : "Concepto"
                    },
                    {
                      kind : "Input",
                      hint : "Monto"
                    },
                    {
                      kind : enyo.IconButton,
                      icon : "../SISOPREGA/images/menu-icon-new.png",
                      onclick : "contextMenuClicked"
                    } ]
              },
              {
                kind : "hermana.gastos.list",
                style : "border: thin dotted black; height:250px;"
              } ]
        },
        {
          kind : "VFlexBox",
          name : "tabSummary",
          className : "tab",
          showing : false,
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
              } ]
        } ],
    ready : function() {
      this.$.penAutocomplete.setItems(cachePen.getList());
      this.$.classAutoComplete.setItems(cacheClasses.getList());
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
    setCattleClass : function(cattleClass){
      this.$.classAutoComplete.setItems(cacheClasses.getList(cattleClass));
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
      mx_dataRow.push(this.summary.hc);
      mx_dataRow.push(this.summary.kg);
      mx_dataRow.push(this.summary.lbs);
      mx_dataRow.push(this.summary.avg);
      data.push(mx_dataRow);

      var rejects_dataRow = [];
      rejects_dataRow.push(this.summary.rejects_hc);
      rejects_dataRow.push(this.summary.rejects_kgs);
      rejects_dataRow.push(this.summary.rejects_lbs);
      data.push(rejects_dataRow);

      var trade_dataRow = [];
      trade_dataRow.push(this.summary.trade_hc);
      trade_dataRow.push(this.summary.trade_kgs);
      trade_dataRow.push(this.summary.trade_lbs);
      trade_dataRow.push(this.summary.trade_avg);
      data.push(trade_dataRow);

      var net_dataRow = [];
      net_dataRow.push(this.summary.net_hc);
      net_dataRow.push(this.summary.net_kgs);
      net_dataRow.push(this.summary.net_lbs);
      net_dataRow.push(this.summary.net_avg);
      data.push(net_dataRow);

      this.$.summary.setData(data);

      var total_data = [];

      var total_deltaRow = [];
      total_deltaRow.push(this.summary.delta);
      total_data.push(total_deltaRow);

      var total_pctRow = [];
      total_pctRow.push(this.summary.delta_pct);
      total_data.push(total_pctRow);

    }
  });