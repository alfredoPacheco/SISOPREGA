enyo.kind(
  {
    name : "operations.purchase.form",
    kind : "forms.masterDetail",
    published :
      {
        entityKind : crudPurchase,
        parentObject : null
      },
    create : function() {
      this.inherited(arguments);
      this.$.masterFields.createComponents([
            {
              name : "addSellerDialog",
              kind : "Popup",
              showHideMode : "transition",
              openClassName : "zoomFadeIn",
              className : "transitioner2",
              layoutKind : "VFlexLayout",
              style : "overflow: hidden",
              width : "85%",
              height : "85%",
              scrim : true,
              components : []
            },
            {
              kind : enyo.HFlexBox,
              align : "center",
              height : "40px;",
              components : [
                    {
                      content : "Fecha:",
                      width : "80px;",
                      style : "text-align: right;margin-right:5px;"
                    },
                    {
                      kind : "controls.dateMask",
                      inputKind : "ToolInput",
                      name : "purchDate",
                      height : "35px;",
                      bindTo : "dateAllotted",
                      style : "max-width:130px;",
                      bindTo : "purchaseDate"
                    },
                    {
                      content : 'mes/dia/año',
                      className : "listFirst",
                      style : "background-color:#DABD8B;margin-left:2px;font-size:12px;",
                      width : "80px;"
                    }
              ]
            },
            {
              kind : enyo.HFlexBox,
              align : "center",
              height : "40px;",
              components : [
                    {
                      content : "Proveedor:",
                      width : "80px;",
                      style : "text-align: right;margin-right:5px;"
                    },
                    {
                      kind : "controls.autocomplete",
                      inputKind : "ToolInput",
                      name : "seller",
                      width : "275px;",
                      height : "35px;",
                      bindTo : "sellerId"
                    },
                    {
                      kind : enyo.IconButton,
                      icon : "../SISOPREGA_WEB_LIB/images/menu-icon-new.png",
                      onclick : "showSellerForm",
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
                      bindTo : "cattleTypeId"
                    }
              ]
            }
      ],
        {
          owner : this
        });
      this.$.detailFields.createComponents([
            {
              kind : "controls.autocomplete",
              inputKind : "ToolInput",
              height : "35px;",
              name : "cattleQuality",
              hint : 'Clase',
              width : "200px;",
              style : "margin-right: 15px;",
              bindTo : "qualityId",
              belongsTo : "PurchaseDetail"
            },
            {
              kind : "controls.autocomplete",
              inputKind : "ToolInput",
              height : "35px;",
              name : "pen",
              hint : "Corral",
              width : "150px;",
              style : "margin-right: 15px;",
              bindTo : "penId",
              belongsTo : "PurchaseDetail"
            },
            {
              kind : "ToolInput",
              name : "cabezas",
              hint : 'Cabezas',
              width : "125px;",
              style : "margin-right: 15px;",
              bindTo : "heads",
              belongsTo : "PurchaseDetail",
              textAlign : "right"
            
            },
            {
              kind : "ToolInput",
              name : "peso",
              hint : 'Peso',
              width : "125px;",
              style : "margin-right: 15px;",
              bindTo : "weight",
              belongsTo : "PurchaseDetail",
              textAlign : "right"
            }
      ],
        {
          owner : this
        });
    },
    ready : function() {
      this.inherited(arguments);
      crudSeller.get(this, "readCallBack");
      crudCattle.get(this, "readCallBack");
      crudCattleQuality.get(this, "readCallBack");
      crudPen.get(this, "readCallBack");
      
      this.$.purchDate.setToday();
    },
    readCounter : 0,
    readCallBack : function() {
      this.readCounter++;
      if (this.readCounter == 4) {
        this.loadAutocompletes();
        this.readCounter = 0;
      }
    },
    loadAutocompletes : function() {
      
      this.$.seller.setItems(crudSeller.getList());
      this.$.cattleType.setItems(crudCattle.getCattleTypeList());
      this.$.cattleType.setIndex(1); // Default value: Novillos
      
      this.$.pen.setItems(crudPen.getListUsaPens());
      
      this.$.cattleQuality.setItems(crudCattleQuality.getList());
      
      this.afterLoad();
    },
    showSellerForm : function() {
      if (this.$.sellerForm) {
        this.$.sellerForm.destroy();
      }
      this.$.addSellerDialog.createComponent(
        {
          kind : "catalogs.seller.form",
          onAdd : "addSeller",
          onCancel : "cancelCreateSeller",
          name : "sellerForm",
          flex : 1
        },
        {
          owner : this
        });
      this.$.addSellerDialog.render();
      this.$.addSellerDialog.openAtCenter();
    },
    addSeller : function(inSender, result) {
      this.$.seller.setItems(crudSeller.getList());
      
      var justCreated = result.records[0];
      this.$.seller.setIndex(justCreated.sellerId);
      this.$.addSellerDialog.close();
      cacheMan.hideScrim();
    },
    cancelCreateSeller : function() {
      this.$.addSellerDialog.close();
    }
  });
