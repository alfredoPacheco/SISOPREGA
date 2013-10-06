enyo.kind(
  {
    name : "admin.screen",
    kind : enyo.VFlexBox,
    components : [
          {
            kind : enyo.Popup,
            name : "popup_sales",
            width : "85%;",
            height : "85%;",
            dismissWithClick : true,
            layoutKind : "VFlexLayout",
            style : "overflow: hidden;border-width: 8px;",
            scrim : true,
            components : [
                {
                  kind : "operations.sales.form",
                  name : "sales_form",
                  onAdd : "on_sale",
                  onAfterLoad : "saleFormReady",
                  onCancel : "on_cancel_sale",
                  flex : 1
                }
            ]
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
            onClose : "on_popup_map_close",
            components : [
                {
                  kind : "pen.map",
                  name : "map_kind",
                  flex : 1
                }
            ]
          },
          {
            kind : enyo.Popup,
            name : "popup_add",
            width : "343px;",
            height : "70px;",
            dismissWithClick : true,
            layoutKind : "VFlexLayout",
            style : "overflow: hidden;border-width: 8px;",
            scrim : true,
            components : [
                {
                  kind : "admin.addCattle",
                  name : "addCattle_kind",
                  onBuyCattle : "buy_cattle_click",
                  onCaptureHermana : "capture_hermana_click",
                  flex : 1
                }
            ]
          },
          {
            kind : enyo.Popup,
            name : "popup_purchases",
            width : "85%;",
            height : "85%;",
            dismissWithClick : true,
            layoutKind : "VFlexLayout",
            style : "overflow: hidden;border-width: 8px;",
            scrim : true,
            components : [
                {
                  kind : "operations.purchase.form",
                  name : "purchase_form",
                  onAdd : "savePurchaseGroup",
                  onAfterLoad : "purchaseFormReady",
                  onCancel : "onCancelPurchase",
                  flex : 1
                }
            ]
          },
          {
            kind : enyo.Popup,
            name : "popup_hermana",
            width : "1000px;",
            height : "85%;",
            dismissWithClick : true,
            layoutKind : "VFlexLayout",
            style : "overflow: hidden;border-width: 8px;",
            scrim : true,
            components : [
                {
                  kind : "hermana.de",
                  name : "hermana_kind",
                  onSave : "savePurchaseGroup",
                  flex : 1
                }
            ]
          },
          {
            kind : enyo.Popup,
            name : "popup_shipments",
            width : "1024px",
            height : "80%",
            dismissWithClick : true,
            layoutKind : "VFlexLayout",
            style : "overflow: hidden;border-width: 8px;",
            scrim : true,
            components : [
                {
                  kind : "shipments.schedule",
                  name : "shipments_kind",
                  flex : 1,
                  onProgram : "programShipment_click",
                  onCancel : "cancelShipment_click"
                }
            ]
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
            components : [
                {
                  kind : "driver.select",
                  name : "driver_kind",
                  flex : 1,
                  onCancel : "cancel_release",
                  onAfterSave : "releaseShipment"
                }
            ]
          },
          {
            name : "slidingPane",
            kind : "SlidingPane",
            flex : 1,
            onSelectView : "slidingSelected",
            components : [
                  {
                    flex : .3,
                    components : [
                        {
                          name : "inventory",
                          kind : "admin.inventory",
                          flex : 1,
                          maxState : false,
                          arrData : [],
                          onSale : "showSale",
                          onSelect : "inventory_select"
                        }
                    ]
                  },
                  {
                    peekWidth : "30%",
                    flex : .3,
                    components : [
                        {
                          name : "purchased",
                          kind : "admin.purchased",
                          flex : 1,
                          maxState : false,
                          // arrData : crudPurchase.get(),
                          onPurchase : "showPurchase"
                        }
                    ]
                  },
                  {
                    peekWidth : "60%",
                    flex : .3,
                    components : [
                          {
                            name : "sales",
                            kind : "admin.sales",
                            flex : 1,
                            maxState : false,
                            // arrData : cacheSales.readData(),
                            onShipment : "showShipment",
                            onUpdateView: "on_update_sales_view"
                          },
                          {
                            name : "shipment",
                            kind : "admin.shipments",
                            flex : 1,
                            maxState : false,
                            arrData : cacheShip.readData(),
                            onSelectedShipment : "showSelectShipment",
                            onDeleteShipProgrammed : "deleteShipProgrammed"
                          }
                    ]
                  },
            ]
          }
    ],
    showSale : function() {
      cacheMan.showScrim();
      
      if (!this.$.sales_form)
        this.$.popup_sales.validateComponents();
      else
        this.$.sales_form.ready();
      
    },
    showPurchase : function() {
      this.$.popup_add.validateComponents();
      this.$.popup_add.openAtCenter();
    },
    showShipment : function() {
	this.$.popup_shipments.validateComponents();
	if (this.$.sales.getSelectedItems().length > 0) {
	    this.$.shipments_kind.setArrShipment(this.$.sales.getSelectedItems());
	    this.$.popup_shipments.openAtCenter();
	    this.$.shipments_kind.updateList();
	} else {
	    cacheMan.setMessage("","No hay registros seleccionados.");
	}
    },
    showSelectShipment : function(arrShipment) {
      this.$.popup_driver.openAtCenter();
      this.$.driver_kind.setObj(this.$.shipment.getSelectedShipment());
    },
    capture_hermana_click : function() {
      cacheMan.showScrim();
      this.$.popup_add.close();
      
      if (!this.$.hermana_kind)
        this.$.popup_hermana.validateComponents();
      else
        this.$.hermana_kind.ready();
      
      
      this.$.popup_hermana.openAtCenter();
    },
    onCancelPurchase : function() {
      this.$.popup_purchases.close();
    },
    purchaseFormReady : function() {
      this.$.popup_purchases.openAtCenter();
    },
    on_sale : function() {
      this.$.popup_sales.close();
      this.$.inventory.updateView();
      this.$.sales.updateView();
      this.$.sales.moveToBottom();
      cacheMan.hideScrim();
    },
    on_cancel_sale : function() {
      this.$.popup_sales.close();
    },
    savePurchaseGroup : function() {
      this.$.purchased.updateView();
      if (this.$.popup_purchases) {
        this.$.popup_purchases.close();
      }
      if (this.$.popup_hermana) {
        this.$.popup_hermana.close();
      }
      this.$.inventory.updateView();
      cacheMan.hideScrim();
    },
    saleFormReady : function() {
      this.$.popup_sales.openAtCenter();
    },
    buy_cattle_click : function() {
      this.$.popup_add.close();
      cacheMan.showScrim();
      
      if (!this.$.purchase_form)
        this.$.popup_purchases.validateComponents();
      else
        this.$.purchase_form.ready();
    },
    inventory_select : function(inSender, inEvent) {
      this.$.popup_map.openAtCenter();
    },
    on_update_sales_view:function(sender, updateShipments){
	if(updateShipments){
	    this.$.shipment.loadAutocompletes();
	}
    },
    programShipment_click : function() {
	this.$.popup_shipments.close();
	this.$.sales.arrToShip = {};
	this.$.sales.updateSales = true;
	this.$.sales.updateView();	
	this.$.shipment.moveToBottom();
    },
    cancelShipment_click : function() {
      this.$.popup_shipments.close();
    },
    releaseShipment : function() {
      this.$.popup_driver.close();
      this.$.shipment.updateView();
      this.$.inventory.updateView();
    },
    cancel_release : function() {
      this.$.popup_driver.close();
    },
    on_popup_map_close : function() {
      this.$.inventory.updateView();
    },
    deleteShipProgrammed : function(inSender, shipment) {
      crudShipment.remove(shipment, this,"afterDeleteShip");	      
    },
    afterDeleteShip:function(){	
	this.$.sales.updateSales = true;
	this.$.sales.updateView();
	this.$.inventory.updateView();
    }
  });
