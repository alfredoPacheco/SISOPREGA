enyo.kind(
  {
    name : "purchases",
    kind : enyo.VFlexBox,
    events :
      {
        onPurchaseCompleted : ""
      },
    arrDetail : [],
    totalHC : 0,
    totalWeight : 0,
    style : "background-color:#DABD8B;font-size:15px;",
    components :
      [
        {
          kind : enyo.VFlexBox,
          style : "padding:20px;",
          pack : "center",
          components :
            [
              {
                kind : enyo.Popup,
                width : "80%;",
                height : "80%;",
                dismissWithClick : false,
                layoutKind : "VFlexLayout",
                style : "overflow: hidden;  border-width: 8px;",
                scrim : true,
                components :
                  [
                    {
                      kind : "catalogs.providers.create",
                      name : "providersCreate_kind",
                      lazy : "true",
                      onAdd : "supplierCreated",
                      onCancel : "closePopUp",
                      flex : 1
                    } ]
              },
              {
                kind : "Toolbar",
                name : "PurchaseToolBar",
                align : "left",
                pack : "left",
                flex : 1,
                style : "background:#333;min-height:10px;height:45px",
                components :
                  [
                    {
                      name : 'btnPrint',
                      onclick : "printPurchase",
                      icon : "images/print.png"
                    },
                    {
                      name : 'btnSave',
                      onclick : "savePurchase",
                      icon : "images/save.png"
                    },
                    {
                      name : 'btnClear',
                      onclick : "resetPurchase",
                      icon : "images/clear.png"
                    },
                    {
                      fit : true
                    },
                    {
                      name : 'btnOpen',
                      onclick : "open",
                      icon : "images/search.png"
                    },
                    {
                      fit : true
                    },
                    {
                      name : 'btnClose',
                      onclick : "open",
                      icon : "images/search.png"
                    }]
              },
              {
                kind : enyo.HFlexBox,
                align : "center",
                height : "40px;",
                components :
                  [
                    {
                      content : "Fecha:",
                      width : "80px;",
                      style : "text-align: right;margin-right:5px;"
                    },
                    {
                      kind : "ToolInput",
                      name : "purchaseDate",
                      width : "135px;",
                      height : "35px;",
                      onfocus : "applyMask"
                    },
                    {
                      content : 'mes/dia/año',
                      className : "listFirst",
                      style : "background-color:#DABD8B;margin-left:2px;font-size:12px;",
                      width : "80px;"
                    }, ]
              },
              {
                kind : enyo.HFlexBox,
                align : "center",
                height : "40px;",
                components :
                  [
                    {
                      content : "Proveedor:",
                      width : "80px;",
                      style : "text-align: right;margin-right:5px;"
                    },
                    {
                      kind : "controls.autocomplete",
                      inputKind : "ToolInput",
                      name : "provider",
                      width : "275px;",
                      height : "35px;",
                    },
                    {
                      kind : enyo.IconButton,
                      icon : "../SISOPREGA/images/menu-icon-new.png",
                      onclick : "doAddSupplier",
                      height : "23px",
                      width : "23px",
                      style : "padding: 2px;margin-top: 0px;background-color: #DABD8B;"
                    },
                    {
                      content : "Ganado:",
                      width : "80px;",
                      style : "text-align: right;margin-right:5px;"
                    },
                    {
                      kind : "controls.autocomplete",
                      inputKind : "ToolInput",
                      name : "cattleType",
                      width : "200px;",
                      height : "35px;",
                    } ]
              } ]
        },
        {
          kind : enyo.Divider,
          caption : ""
        },
        {
          kind : "HFlexBox",
          className : "listFirst",
          style : "padding-left:100px;",
          align : "center",
          pack : "start",
          components :
            [
              {
                kind : "controls.autocomplete",
                inputKind : "ToolInput",
                height : "35px;",
                name : "clase",
                hint : 'Clase',
                width : "150px;",
                style : "margin-right: 15px;"
              },
              {
                kind : "controls.autocomplete",
                inputKind : "ToolInput",
                height : "35px;",
                name : "corral",
                hint : "corral",
                width : "150px;",
                style : "margin-right: 15px;"
              },
              {
                kind : "ToolInput",
                name : "cabezas",
                hint : 'Cabezas',
                width : "125px;",
                style : "margin-right: 15px;"
              },
              {
                kind : "ToolInput",
                name : "peso",
                hint : 'Peso Promedio',
                width : "125px;",
                style : "margin-right: 15px;"
              },
              {
                kind : enyo.IconButton,
                icon : "../SISOPREGA/images/menu-icon-new.png",
                className : "enyo-button-affirmative",
                onclick : "agregar_click",
                height : "23px",
                width : "23px",
                style : "padding: 2px;margin-top: 0px;"
              } ]
        },
        {
          kind : enyo.Divider,
          caption : ""
        },
        {
          kind : "HFlexBox",
          className : "listFirst",
          style : "font-size:13px;background-color:#DABD8B;border-bottom-style: solid;border-bottom-color: #482400;",
          height : "30px",
          align : "center",
          pack : "start",
          components :
            [
              {
                content : "Corral",
                style : "width:100px;margin-right:15px;margin-left:107px;"
              },
              {
                content : 'Clase',
                style : "width:153px;margin-right:15px;",
              },
              {
                content : 'Cantidad',
                style : "width:153px;margin-right:15px;"
              },
              {
                content : "Peso",
                style : "width:150px;margin-right:15px;"
              },
              {
                content : "Promedio",
                style : "width:79px;margin-left:20px;"
              } ]
        },
        {
          kind : enyo.Scroller,
          name : "detailScroller",
          flex : 1,
          style : "background-color: #482400;",
          components :
            [
              {
                kind : enyo.VirtualRepeater,
                name : "list",
                onSetupRow : "setupRow",
                components :
                  [
                    {
                      kind : enyo.SwipeableItem,
                      layoutKind : enyo.HFlexLayout,
                      align : "center",
                      pack : "start",
                      height : "40px",
                      onConfirm : "dropPurchase",
                      className : "listBG",
                      components :
                        [
                          {
                            name : 'detail_number',
                            className : "listSecond",
                            style : "width:30px;margin-right:15px;margin-left:30px;color:#5F0712",
                          },
                          {
                            name : "detail_corral",
                            className : "listSecond",
                            style : "width:100px;margin-right:15px;margin-left:23px;"
                          },
                          {
                            name : 'detail_clase',
                            className : "listSecond",
                            style : "width:153px;margin-right:15px;",
                          },
                          {
                            name : 'detail_cabezas',
                            className : "listSecond",
                            style : "width:153px;margin-right:15px;"
                          },
                          {
                            name : "detail_weight",
                            className : "listSecond",
                            style : "width:200px;"
                          },
                          {
                            name : "detail_weight_avg",
                            className : "listSecond",
                            style : "width:200px;"
                          }, ]
                    } ]
              } ]
        },
        {
          kind : enyo.VFlexBox,
          style : "padding:20px;border-top-style: solid;border-top-color:#482400",
          pack : "center",

          components :
            [
              {
                kind : enyo.HFlexBox,
                align : "center",
                height : "40px;",
                style : "font-size:14px;",
                components :
                  [
                    {
                      content : "Total Cabezas:",
                    },
                    {
                      content : '0',
                      name : "totalHC",
                      className : "listFirst",
                      style : "background-color:#DABD8B;margin-left:10px",
                      width : "60px;"
                    },
                    {
                      content : "Total Peso:",
                    },
                    {
                      content : '0',
                      name : "totalWeight",
                      className : "listFirst",
                      style : "background-color:#DABD8B;margin-left:10px;",
                      width : "80px;"
                    },
                    {
                      kind : enyo.Spacer
                    },
                    {
                      kind : enyo.Button,
                      caption : "Efectuar Compra",
                      onclick : "purchase_click",
                      style : "background-color: #DABD8B;"
                    },
                    {
                      kind : enyo.Button,
                      caption : "Cancelar",
                      onclick : "cancel_click",
                      style : "background-color: #DABD8B;"
                    } ]
              } ]
        } ],
    ready : function() {
      this.$.purchaseDate.setValue(utils.dateOut(new Date()));
      this.$.purchaseDate.$.input.applyStyle("text-align", "center");
      this.$.provider.setItems(cacheProviders.getAllForList());
      this.$.corral.setItems(cachePen.getList());
      this.$.clase.setItems(cacheClasses.getList());
      
      this.$.cattleType.setItems([]); //TODO for the while
//      this.$.cattleType.setItems(cacheCattle.getAllCattleType());
      this.$.cattleType.setIndex(1);

    },
    clearDataEntry : function() {
      this.$.corral.clear();
      this.$.clase.clear();
      this.$.cabezas.setValue("");
      this.$.peso.setValue("");
      this.$.corral.$.textField.forceFocus();
    },
    agregar_click : function() {

      var newObject =
        {
          purdate : this.$.purchaseDate.getValue(),
          cattleTypeId : this.$.clase.getIndex(),
          cattleTypeName : this.$.clase.getValue(),
          clase : this.$.cattleType.getValue(),
          cabezas : Number(this.$.cabezas.getValue()),
          seller : this.$.provider.getValue(),
          sellerId : this.$.provider.getIndex(),
          corral : this.$.corral.getValue(),
          pesoPromedio : Number(this.$.peso.getValue())
        };

      this.arrDetail.push(newObject);
      this.updateList();

      this.$.detailScroller.scrollTo(this.$.detailScroller.getBoundaries().bottom, 0);
      this.clearDataEntry();
    },
    setupRow : function(inSender, inIndex) {
      if (this.arrDetail[inIndex]) {
        this.$.detail_number.setContent(inIndex + 1);
        this.$.detail_clase.setContent(this.arrDetail[inIndex].cattleTypeName);
        this.$.detail_cabezas.setContent(this.arrDetail[inIndex].cabezas);
        this.$.detail_corral.setContent(this.arrDetail[inIndex].corral);
        this.$.detail_weight.setContent(utils.formatNumberThousands(Number(this.arrDetail[inIndex].pesoPromedio)
            * Number(this.arrDetail[inIndex].cabezas)));
        this.$.detail_weight_avg.setContent(utils.formatNumberThousands(Number(this.arrDetail[inIndex].pesoPromedio)));
        this.totalHC += parseFloat(this.$.detail_cabezas.getContent());
        this.totalWeight += parseFloat(Number(this.arrDetail[inIndex].pesoPromedio) * Number(this.arrDetail[inIndex].cabezas));
        return true;
      }
      return false;
    },
    afterUpdate : function() {
      this.updateList();
    },

    updateList : function() {
      this.totalHC = 0;
      this.totalWeight = 0;
      this.$.list.render();
      this.$.totalHC.setContent(utils.formatNumberThousands(this.totalHC));
      this.$.totalWeight.setContent(utils.formatNumberThousands(this.totalWeight));

      this.$.provider.setItems(cacheProviders.getAllForList());
    },
    dropPurchase : function(inSender, inIndex) {
      // TODO: Remove corte from cache
      this.arrDetail.splice(inIndex, 1);

      this.updateList();
      this.$.detailScroller.scrollTo(this.$.detailScroller.getBoundaries().bottom, 0);
    },
    purchase_click : function() {
      // TODO: Fill cache and report event to close pop up.
      for ( var recordIndex = 0; recordIndex < this.arrDetail.length; recordIndex++) {
        var purchase = this.purchaseFromRecord(recordIndex);
        crudPurchase.createPurchase(purchase);
      }

      this.arrDetail = [];
      this.doPurchaseCompleted();
    },
    cancel_click : function() {
      // TODO: Clear data entry
      this.closePopUp();
    },
    purchaseFromRecord : function(recordIndex) {

      var selected = false;
      var purchaseId = 0;

      while (!selected) {
        var possibleId = Math.floor((Math.random() * 100) + 1);
        var purchases = crudPurchase.get().purchased;
        for ( var i = 0; i < purchases.length; i++) {
          if (purchases[i].id == possibleId)
            break;
        }
        purchaseId = possibleId;
        selected = true;
      }

      var objPurchase =
        {
          id : purchaseId,
          purdate : this.arrDetail[recordIndex].purdate,
          seller : this.arrDetail[recordIndex].seller,
          cattleId : this.arrDetail[recordIndex].cattleTypeId,
          cattleName : this.arrDetail[recordIndex].clase,
          heads : Number(this.arrDetail[recordIndex].cabezas),
          weight : Number(this.arrDetail[recordIndex].pesoPromedio) * Number(this.arrDetail[recordIndex].cabezas),
          aveweight : Number(this.arrDetail[recordIndex].pesoPromedio)
        };

      return objPurchase;
    },
    applyMask : function(inSender) {
      var _id = inSender.$.input.getId();
      jQuery(function(j) {
        j(document.getElementById(_id)).mask('99/99/9999');
      });
    },
    doAddSupplier : function() {
      this.$.popup.validateComponents();
      this.$.providersCreate_kind.toggleAdd();
      this.$.popup.openAtCenter();
    },
    closePopUp : function() {
      this.$.popup.close();
    },
    supplierCreated : function() {
      this.$.popup.close();
      this.$.provider.clear();
      this.$.provider.setItems(cacheProviders.getAllForList());
    }
  });