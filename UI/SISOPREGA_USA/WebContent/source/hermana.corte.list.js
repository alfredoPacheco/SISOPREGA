enyo.kind(
  {
    name : "hermana.corte.list",
    kind : "VFlexBox",
    events :
      {
        onRemoveCorte : "",
        onCorteSelected : ""
      },
    cortes : [],
    iSelected : -1,
    isForExporter : false,
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
              } ]
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
                name : "corteList",
                onSetupRow : "setupCorteRow",
                onclick : "selectCorte",
                components :
                  [
                    {
                      kind : enyo.SwipeableItem,
                      name : "rowContainer",
                      onConfirm : "dropCorte",
                      layoutKind : enyo.HFlexLayout,
                      tapHighlight : true,
                      className : "listRow",
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
                          } ]
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
        }, ],
    setCortes : function(arrCorte) {
      this.loadCortes(arrCorte);
    },
    loadCortes : function(arrCorte) {
      if(arrCorte)
        this.cortes = arrCorte;
      
      this.$.corteList.render();
    },
    setupCorteRow : function(inSender, inIndex) {
      var objCorte = this.cortes[inIndex];
      if (objCorte) {
        this.$.listCorral.setContent(objCorte.pen_name);
        this.$.listClase.setContent(objCorte.cattleClassName);
        this.$.listCabezas.setContent(utils.formatNumberThousands(objCorte.heads));
        this.$.listPeso.setContent(utils.formatNumberThousands(objCorte.weight));

        var avgWeight = Math.floor(objCorte.weight / objCorte.heads * 100) / 100;
        this.$.listPromedio.setContent(utils.formatNumberThousands(avgWeight));

        if (this.iSelected == inIndex) {
          this.$.rowContainer.applyStyle("background-color", "brown");
          this.$.rowContainer.applyStyle("color", "#EBCE9C");
        }

        return true;
      }
      return false;
    },
    dropCorte : function(inSender, inIndex) {
      
      if(this.isForExporter)
        cacheCorte.remove(inIndex);
      else
        cacheCorte.removeExpo(inIndex);
      
      this.iSelected = -1;
      this.loadCortes();
      
      this.doRemoveCorte();
    },
    selectCorte : function(inSender, inEvent) {
      this.iSelected = inEvent.rowIndex;
      this.loadCortes();
      this.doCorteSelected();
    }
  });