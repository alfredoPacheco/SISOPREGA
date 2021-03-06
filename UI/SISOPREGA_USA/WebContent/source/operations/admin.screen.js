enyo.kind(
{
  name : "admin.screen",
  kind : enyo.VFlexBox,
  components : [
  {
	kind : enyo.Popup,
	name : "popup_sales",
	width : "95%;",
	height : "95%;",
	dismissWithClick : true,
	layoutKind : "VFlexLayout",
	style : "overflow: hidden;border-width: 0px;",
	scrim : true,
	components : [
	{
	  kind : "operations.sales.form",
	  name : "sales_form",
	  onAdd : "on_sale",
	  onAfterLoad : "saleFormReady",
	  onCancel : "on_cancel_sale",
	  flex : 1
	} ]
  },
  {
	kind : enyo.Popup,
	name : "popup_purchases",
	width : "80%;",
	height : "85%;",
	dismissWithClick : true,
	layoutKind : "VFlexLayout",
	style : "overflow: hidden;border-width: 8px;",
	scrim : true,
	onClose : "savePurchaseGroup",
	components : [
	{
	  kind : "forms.list",
	  name : "purchase_list",
	  entity : crudPurchase,
	  flex : 1
	} ]
  },
  // {
  // kind : enyo.Popup,
  // name : "popup_purchases",
  // width : "85%;",
  // height : "85%;",
  // dismissWithClick : true,
  // layoutKind : "VFlexLayout",
  // style : "overflow: hidden;border-width: 8px;",
  // scrim : true,
  // components : [
  // {
  // kind : "operations.purchase.form",
  // name : "purchase_form",
  // onAdd : "savePurchaseGroup",
  // onAfterLoad : "purchaseFormReady",
  // onCancel : "onCancelPurchase",
  // flex : 1
  // }
  // ]
  // },
  {
	kind : enyo.Popup,
	name : "popup_hermana",
	width : "1000px;",
	height : "85%;",
	dismissWithClick : false,
	layoutKind : "VFlexLayout",
	style : "overflow: hidden;border-width: 8px;",
	scrim : true,
	components : [
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
	components : [
	{
	  kind : "driver.select",
	  name : "driver_kind",
	  flex : 1,
	  onCancel : "cancel_release",
	  onAfterSave : "releaseShipment"
	} ]
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
		arrData : [],
		onSale : "showSale",
		onLoadCompleted : "columnsLoadCompleted"
	  } ]
	},
	{
	  peekWidth : "30%",
	  flex : .3,
	  components : [
	  {
		name : "purchased",
		kind : "admin.purchased",
		flex : 1,
		onLoadCompleted : "columnsLoadCompleted",
		onAferUpdatePurchase : "after_update_purchase_list",
		onBuyCattle : "buy_cattle_click",
		onCaptureHermana : "capture_hermana_click",

	  } ]
	},
	{
	  peekWidth : "60%",
	  flex : .3,
	  components : [
	  {
		name : "sales",
		kind : "admin.sales",
		flex : 1,
		onShipment : "showShipment",
		onUpdateView : "on_update_sales_view",
		onLoadCompleted : "columnsLoadCompleted"
	  },
	  {
		name : "shipment",
		kind : "admin.shipments",
		flex : 1,
		arrData : [],
		onSelectedShipment : "showSelectShipment",
		onDeleteShipProgrammed : "deleteShipProgrammed",
		onLoadCompleted : "columnsLoadCompleted"
	  } ]
	}, ]
  } ],
  iColumnsLoaded : 0,
  columnsLoadCompleted : function() {
	this.iColumnsLoaded++;
	// counter for column group loads, each column group has a
	// "LoadCompleted" event that reports to this method
	// Counter: inventory, purchases, sales, shipments
	if (this.iColumnsLoaded == 4) {
	  this.iColumnsLoaded == 0;
	  cacheMan.hideScrim();
	}
  },
  showSale : function() {
	cacheMan.showScrim();

	if (!this.$.sales_form)
	  this.$.popup_sales.validateComponents();
	else
	  this.$.sales_form.ready();

  },
  showShipment : function() {
	this.$.popup_shipments.validateComponents();
	if (this.$.sales.getSelectedItems().length > 0) {
	  this.$.shipments_kind.setArrShipment(this.$.sales.getSelectedItems());
	  this.$.popup_shipments.openAtCenter();
	  this.$.shipments_kind.updateList();
	} else {
	  cacheMan.setMessage("", "No records selected.");
	}
  },
  showSelectShipment : function(arrShipment) {
	this.$.popup_driver.openAtCenter();
	this.$.driver_kind.setObj(this.$.shipment.getSelectedShipment());
  },
  capture_hermana_click : function() {
	cacheMan.showScrim();

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
	cacheMan.showScrim();
	this.$.purchased.updateView();
	if (this.$.popup_hermana) {
	  this.$.popup_hermana.close();
	}
  },
  after_update_purchase_list : function() {
	this.$.inventory.updateView();
	cacheMan.hideScrim();
  },
  saleFormReady : function() {
	this.$.sales_form.cancel();
	this.$.popup_sales.openAtCenter();
  },
  buy_cattle_click : function() {
	// cacheMan.showScrim();

	if (!this.$.purchase_form)
	  this.$.popup_purchases.validateComponents();

	this.$.popup_purchases.openAtCenter();
	this.$.purchase_list.reset();
	this.$.purchase_list.$.formPopUp.validateComponents();
  },
  inventory_select : function(inSender, inEvent) {
	
  },
  on_update_sales_view : function(sender, updateShipments) {
	if (updateShipments) {
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
  deleteShipProgrammed : function(inSender, shipment) {
	crudShipment.remove(shipment, this, "afterDeleteShip");
  },
  afterDeleteShip : function() {
	this.$.sales.updateSales = true;
	this.$.sales.updateView();
	this.$.inventory.updateView();
  },
  
});
