enyo.kind(
  {
    name : "hermana.gastos.list",
    kind : "VFlexBox",
    components :
      [
        {
          kind : "Header",
          name : "encabezado",
          style : "font-size:13px;background-color:#DABD8B;",
          components :
            [
              {
                content : "Concepto",
                style : "width:450px;text-align:center;"
              },
              {
                content : "Monto",
                style : "width:150px;text-align:center;"
              }
            ]
        },
        {
          kind : enyo.Scroller,
          name : "listaScroller",
          horizontal : false,
          autoHorizontal : false,
          flex : 1,
          onScroll : "scroll",
          components :
            [
              {
                kind : enyo.VirtualRepeater,
                name : "forecastList",
                onSetupRow : "setupForecastRow",
                onclick : "selectForecast",
                components :
                  [
                    {
                      kind : enyo.RowItem,
                      onConfirm : "dropForecast",
                      layoutKind : enyo.HFlexLayout,
                      tapHighlight : true,
                      style : "font-size:13px;",
                      components :
                        [
                          {
                            name : "listCorral",
                            style : "width:450px;text-align:left;",
                            content : ""
                          },
                          {
                            name : "listClase",
                            style : "width:150px;text-align:center;",
                            content : ""
                          }]
                    } ]
              } ]
        },
        {
          kind : "Drawer",
          name : "draDel",
          open : false,
          components :
            [
              {
                kind : "Toolbar",
                components :
                  [
                    {
                      kind : "enyo.IconButton",
                      style : "width:150px;",
                      label : "Eliminar",
                      onclick : "onEliminar"
                    },
                    {
                      kind : "enyo.IconButton",
                      style : "width:150px;",
                      label : "Cancelar",
                      onclick : "onCancel"
                    }, ]
              }

            ]
        }, ]
  });