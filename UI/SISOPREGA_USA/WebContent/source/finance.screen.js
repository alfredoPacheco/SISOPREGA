enyo.kind({
	name: "finance.screen",
	kind: enyo.VFlexBox,
	components: [	
		{kind: "Popup",name: "popMan", dismissWithClick:false,showHideMode: "transition", openClassName: "zoomFadeIn",
		 className: "transitioner2", layoutKind: "VFlexLayout",style: "overflow: hidden", width: "95%", 
		 height: "35%",scrim: true,lazy:false,components:[{kind: "finance.payments.form",
									   onAddPayment:"addPayment",onCancel:"closePopUp", 
									   name:"payment",onUpdatePayment:"upatePaymentEvent",flex: 1}]},	
		{naame: "slidingPane", kind: "SlidingPane", flex: 1, onSelectView: "slidingSelected", components: [
			{peekWidth:"30%",flex:.3,
			 components:[
			 	{name:"buy",kind:"finance.charges.list", flex:.6, maxState:false,caption:"Compras",
			     captionPayments:"Pagos a exportadores",onAddPayment:"openPayment",arrData:cacheFin.readData(),}]},
			{peekWidth:"30%",flex:.3,
			 components:[
				{name:"expenses",kind:"finance.charges.list", flex:.6, maxState:false,caption:"Gastos de Operacion",
			      captionPayments:"Pagos a gastos de operacion",onAddPayment:"openPayment",arrData:cacheFin.readData(),}
			 	]},
			{peekWidth:"60%",flex:.3,
			 components:[
			 	{name:"sales",kind:"finance.charges.list", flex:.6, maxState:false,caption:"Ventas",
			     captionPayments:"Abonos de clientes",onAddPayment:"openPayment",arrData:cacheFin.readData(),}]}
		]},		
	],
	addPayment:function(){
		alert('TODO: Add payment')
		this.closePopUp()
	},
	openPayment:function(){
	//	this.$.popMan.createComponent({kind: "finance.payments.form",
	//								   onAddPayment:"addPayment",onCancel:"closePopUp", 
	//								   name:"dynocon",onUpdatePayment:"upatePaymentEvent",flex: 1},{owner:this});
		this.$.payment.toggleAdd();
		this.$.popMan.show();
		this.$.popMan.openAtCenter();		
	},
	closePopUp:function(){	
		this.$.popMan.close();
		this.$.popMan.hide();	
	},	
});