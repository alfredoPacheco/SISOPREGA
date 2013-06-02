enyo.kind({
	name: "sales.screen",
	kind: enyo.VFlexBox,
	components: [		
		{name:"buy",kind:"sales.purchase.list", flex:.6, maxState:false,caption:"Compra de Ganado",
		 priceCaption:"Asignacion de Precio - Compra",
		 onAddPayment:"openPayment",arrData:cacheSP.readData(),onSavePrices:"savePrices",onSMS:"sendSMS",bSMS:true},
		{name:"sales",kind:"sales.purchase.list", flex:.6, maxState:false,caption:"Ventas de Ganado",
 		 priceCaption:"Asignacion de Precio - Venta",
		 onAddPayment:"openPayment",arrData:cacheSP.readData(),onSavePrices:"savePrices",bSMS:false},
	],
	addPayment:function(){
		alert('TODO: Add payment')
		this.closePopUp()
	},
	openPayment:function(){
		this.$.payment.toggleAdd();
		this.$.popMan.show();
		this.$.popMan.openAtCenter();		
	},
	closePopUp:function(){	
		this.$.popMan.close();
		this.$.popMan.hide();	
	},	
	savePrices:function(){
		alert('TODO: Save Prices')
		this.$.buy.resetValues()
		this.$.sales.resetValues()
	},
	sendSMS:function(){
		alert('TODO: SMS')
	}	
});