enyo.kind({
	name: "finance.payments.form",	
	kind: enyo.SlidingView,	
	layoutKind: enyo.VFlexLayout,
	paymentTypes:[{caption:"Effectivo",value:1},
				  {caption:"Transferencia",value:2},
				  {caption:"Cheque",value:3}],
	events: {
		onAddPayment:"",
		onUpdatePayment:"",
		onCancel:""	
	},
	components: [	
			{kind: enyo.Scroller, flex: 1,	
				className:"formBG",
			 components:[
			{kind: "HFlexBox", caption: "", style:"color:#FFF", 
			 components:[
	 			{kind: "RowGroup",caption: "Tipo de Pago",flex:.3,components:[
					{kind: "ListSelector", name: "lstPaymentType",  contentPack:"left"}]
				},
	 			{kind: "RowGroup",caption: "ID de Pago",flex:.3,components:[
					{kind: "Input", name: "paymentID",hint:""}]
				},
	 			{kind: "RowGroup",caption: "Cantidad",flex:.3,components:[
					{kind: "Input", name: "paymentAmount",hint:""}]
				},
			  ]
			 },
			{kind: "RowGroup",caption: "Comentario",
		     components: [{kind: "Input",hint:""}]
			},
	]},
	{kind: "Drawer", name:"draAdd",
	 components: [ 					
		{layoutKind: "HFlexLayout", align: "center",
		 components: [						 
			{kind: "Button",name:"btnAdd", className: "enyo-button-affirmative", 
			 flex:1,caption: "Crear", onclick: "doAddPayment"},
			{kind: "Button", className: "enyo-button-negative", 
			 flex:1,caption: "Cancelar", onclick: "doCancel"}				 
		 ]
		}
	 ]
	},
	{kind: "Drawer", name:"draUpdate", components: [		
		{layoutKind: "HFlexLayout", align: "center",
		 components: [			
			{kind: "Button",name:"btnUpdate", className: "enyo-button-affirmative", 
			 flex:1, caption: "Actualizar", onclick: "doUpdatePayment"},							
			{kind: "Button", className: "enyo-button-negative", 
			 flex:1,caption: "Cancelar", onclick: "doCancel"}]}]}		
],
ready:function(){
	this.$.lstPaymentType.setItems(this.paymentTypes)
},
toggleUpdate : function() {
	this.$.draAdd.setOpen(false);
	this.$.draUpdate.setOpen(true);
},
toggleAdd : function() {
	this.$.draAdd.setOpen(true);
	this.$.draUpdate.setOpen(false);
//	this.resetValues();
},
	
});