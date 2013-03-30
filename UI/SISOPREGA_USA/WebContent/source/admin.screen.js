enyo.kind({
	name: "admin.screen",
	kind: enyo.VFlexBox,
	components: [
		{name: "slidingPane", kind: "SlidingPane", flex: 1, onSelectView: "slidingSelected", components: [
			{flex:.3,components:[{name:"inventory",kind:"admin.inventory", flex:1, maxState:false,
			 arrData:cacheInv.readData(),onSale:"showSale"}]},
			{peekWidth:"30%",flex:.3,components:[{name:"purchased",kind:"admin.purchased", flex:1, maxState:false,
			 arrData:cachePur.readData(),onPurchase:"showPurchase"}]},
			{peekWidth:"60%",flex:.3,
			 components:[
			 	{name:"sales",kind:"admin.sales", flex:1, maxState:false,arrData:cacheSales.readData(),
				 onShipment:"showShipment"},
				{name:"shipment",kind:"admin.shipments", flex:1, maxState:false,arrData:cacheShip.readData(),
				 onSelectedShipment:"showSelectShipment"}]},
		]}
	],
	showSale:function(){
		alert('TODO: Sale');
	},
	showPurchase:function(){
		alert('TODO: Purchase');		
	},
	showShipment:function(){
		alert('TODO: Shipment');		
		enyo.log(this.$.sales.getSalesToShip());		
	},
	showSelectShipment:function(arrShipment){
		alert('TODO: Select Shipment');		
		enyo.log(this.$.shipment.getSelectedShipment());				
	}
});