enyo.kind(
  {
    name : "hermana.de.tabs",
    kind : "VFlexBox",
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
              }, ]
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
                      kind : "Input",
                      style : "width:20%",
                      hint : "Corral"
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
        }, ],
    showCorte : function() {
      this.$.tabGastos.setShowing(false);
      this.$.tabCorte.setShowing(true);
    },
    showGastos : function() {
      this.$.tabCorte.setShowing(false);
      this.$.tabGastos.setShowing(true);
    }
  });