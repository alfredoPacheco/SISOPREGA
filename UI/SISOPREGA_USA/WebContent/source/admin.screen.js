enyo.kind(
  {
    name : "admin.screen",
    kind : enyo.VFlexBox,
    components :
      [
        {
          kind : enyo.Popup,
          name : "popup_sales",
          width : "85%;",
          height : "85%;",
          dismissWithClick : true,
          layoutKind : "VFlexLayout",
          style : "overflow: hidden;border-width: 8px;",
          scrim : true,
          onSale : "save_sale",
          components :
            [
              {
                kind : "sales",
                name : "sales_kind",
                flex : 1
              } ]
        },
        {
          kind : enyo.Popup,
          name : "popup_map",
          width : "85%;",
          height : "85%;",
          dismissWithClick : true,
          layoutKind : "VFlexLayout",
          style : "overflow: hidden;border-width: 8px;",
          scrim : true,
          components :
            [
              {
                kind : "pen.map",
                name : "map_kind",
                flex : 1
              } ]
        },
        {
          kind : enyo.Popup,
          name : "popup_add",
          width : "400px;",
          height : "70px;",
          dismissWithClick : true,
          layoutKind : "VFlexLayout",
          style : "overflow: hidden;border-width: 8px;",
          scrim : true,
          components :
            [
              {
                kind : "addCattle",
                name : "addCattle_kind",
                onBuyCattle : "buy_cattle_click",
                onCaptureHermana : "capture_hermana_click",
                flex : 1
              } ]
        },
        {
          kind : enyo.Popup,
          name : "popup_purchases",
          width : "90%;",
          height : "90%;",
          dismissWithClick : true,
          layoutKind : "VFlexLayout",
          style : "overflow: hidden;border-width: 8px;",
          scrim : true,
          components :
            [
              {
                kind : "purchases",
                name : "purchases_kind",
                onPurchaseCompleted : "savePurchaseGroup",
                flex : 1
              } ]
        },
        {
          kind : enyo.Popup,
          name : "popup_hermana",
          width : "90%;",
          height : "90%;",
          dismissWithClick : true,
          layoutKind : "VFlexLayout",
          style : "overflow: hidden;border-width: 8px;",
          scrim : true,
          components :
            [
              {
                kind : "hermana.de",
                name : "hermana_kind",
                onSave : "savePurchaseGroup",
                flex : 1
              } ]
        },
        {
          kind : enyo.Popup,
          name : "popup_shipments",
          width : "670px",
          height : "210px;",
          dismissWithClick : true,
          layoutKind : "VFlexLayout",
          style : "overflow: hidden;border-width: 8px;",
          scrim : true,
          components :
            [
              {
                kind : "shipments.schedule",
                name : "shipments_kind",
                flex : 1,
                onProgram : "programShipment_click",
                onCancel : "cancelShipment_click"
              } ]
        },
        {
          kind : enyo.Popup,
          name : "popup_driver",
          width : "600px;",
          height : "230px;",
          dismissWithClick : true,
          layoutKind : "VFlexLayout",
          style : "overflow: hidden;border-width: 8px;",
          scrim : true,
          components :
            [
              {
                kind : "driver.select",
                name : "driver_kind",
                flex : 1,
                onCancel : "cancelDriver_click",
                onGuardar : "saveDriver_click"
              } ]
        },
        {
          name : "slidingPane",
          kind : "SlidingPane",
          flex : 1,
          onSelectView : "slidingSelected",
          components :
            [
              {
                flex : .3,
                components :
                  [
                    {
                      name : "inventory",
                      kind : "admin.inventory",
                      flex : 1,
                      maxState : false,
                      arrData : cachePen.get(),
                      onSale : "showSale",
                      onSelect : "inventory_select"
                    } ]
              },
              {
                peekWidth : "30%",
                flex : .3,
                components :
                  [
                    {
                      name : "purchased",
                      kind : "admin.purchased",
                      flex : 1,
                      maxState : false,
                      arrData : cachePur.get(),
                      onPurchase : "showPurchase"
                    } ]
              },
              {
                peekWidth : "60%",
                flex : .3,
                components :
                  [
                    {
                      name : "sales",
                      kind : "admin.sales",
                      flex : 1,
                      maxState : false,
                      arrData : cacheSales.readData(),
                      onShipment : "showShipment"
                    },
                    {
                      name : "shipment",
                      kind : "admin.shipments",
                      flex : 1,
                      maxState : false,
                      arrData : cacheShip.readData(),
                      onSelectedShipment : "showSelectShipment"
                    } ]
              }, ]
        } ],
    showSale : function() {
      this.$.popup_sales.openAtCenter();
    },
    showPurchase : function() {
      this.$.popup_add.openAtCenter();
    },
    showShipment : function() {
      this.$.popup_shipments.openAtCenter();
      this.$.shipments_kind.setArrShipment(this.$.sales.getSalesToShip());
    },
    showSelectShipment : function(arrShipment) {
      this.$.popup_driver.openAtCenter();
      enyo.log(this.$.shipment.getSelectedShipment());
    },
    capture_hermana_click : function() {
      this.$.popup_add.close();
      this.$.popup_hermana.openAtCenter();
    },
    buy_cattle_click : function() {
      this.$.popup_add.close();

      if (this.$.purchases_kind)
        this.$.purchases_kind.updateList();

      this.$.popup_purchases.openAtCenter();
    },
    inventory_select : function(inSender, inEvent) {
      console.debug(inSender);
      console.debug(inEvent);
      this.$.popup_map.openAtCenter();
    },
    programShipment_click : function() {
      this.$.popup_shipments.close();
      this.$.sales.updateList();
      this.$.shipment.updateList();
      this.$.shipment.moveToBottom();
    },
    cancelShipment_click : function() {
      this.$.popup_shipments.close();
    },
    cancelDriver_click : function() {
    },
    saveDriver_click : function() {
    },
    savePurchaseGroup : function() {
      this.$.purchased.updateList();
      
      if(this.$.popup_purchases){
        this.$.popup_purchases.close();
      }
      
      if(this.$.popup_hermana){
        this.$.popup_hermana.close();
      }
        
    },
    save_sale : function() {
      alert("venta realizada");
    }
  });
