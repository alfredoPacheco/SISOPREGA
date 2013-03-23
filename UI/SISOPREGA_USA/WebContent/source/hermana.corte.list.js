enyo.kind(
  {
    name : "hermana.corte.list",
    kind : "VFlexBox",
    components :
      [
        {
          kind : "Header",
          name : "encabezado",
          //className : "listFirst",
          style : "font-size:13px;background-color:#DABD8B;",
          components :
            [
              {
                content : "Corral",
                style : "width:150px;text-align:center;"
              },
              {
                content : "Clase",
                style : "width:150px;text-align:center;"
              },
              {
                content : "Cabezas",
                style : "width:150px;text-align:center;"
              },
              {
                content : "Peso",
                style : "width:150px;text-align:center;"
              },
              {
                content : "Promedio",
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
          //className : "listBG",
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
                            style : "width:150px;text-align:left;",
                            content : ""
                          },
                          {
                            name : "listClase",
                            style : "width:150px;text-align:center;",
                            content : ""
                          },
                          {
                            name : "listCabezas",
                            style : "width:150px;text-align:center;",
                            content : ""
                          },
                          {
                            name : "listPeso",
                            style : "width:150px;text-align:center;",
                            content : ""
                          },
                          {
                            name : "listPromedio",
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