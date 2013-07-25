enyo.kind({
	name: "sales.price.assignment",
	kind: "VFlexBox",
	arrData:null,
	objSelectedShipment:null,
	caption:"",
	sms:false,
	events: {		
		onSavePrices: "",
		onSMS:"",
	},			
	components: [
		{kind:enyo.Divider,name:"priceAssign",caption:"Asignacion de Precio",
		 components:[
		 {kind:"RowGroup", align: "center", flex:.1, style:"backgound-color:white;margin:0",
			 components:[ 
				{name: "purchaseSum",kind: "VFlexBox",align:"center",style:"font-size: 25px; color:#000",content: ""},
			 ]
		  },
		  {kind:enyo.Button,caption:"+",name:"btnSave",style:"margin-right:11px;",onclick:"doSavePrices"},	
		  {kind:enyo.Button,caption:"SMS",name:"btnSMS",style:"margin-right:11px;",onclick:"doSMS"},			  				 			
		  ]
		 },	
		{kind: "Scroller", flex: 1, 
		 components:[
			{kind: enyo.VirtualRepeater, name: "listPayments", onSetupRow: "loadPayments", onclick: "selectShipRow",								
			components: [
				{kind: enyo.Item,
					components: [
						{layoutKind: enyo.HFlexLayout,components:[
							{name: "lblCattle",flex:.15,
							 content: ""},
							{name: "lblWeight",
							 content: ""},
							{content: "/"},							 							 
							{name: "lblHeads",flex:.1,
							 content: ""},		
							 					 
							{name: "lblAve",flex:.15,
							 content: ""},
							{name: "lblTotal",flex:.15,
							 content: ""},							 
							{kind: "Input",name: "txtPrice",flex:.1, style:"border-width: 8px",onkeyup:"updatePrice",
							 inputType:"numeric",hint: "Precio"},
							{kind: "Input",name: "txtPrice300",flex:.1, style:"border-width: 8px",onkeyup:"updatePrice",
							 inputType:"numeric",hint: "Precio 300"},
						]},
					]}
				]}
		]},
	],
	updatePrice:function(inSender,inEvent){
		//TODO Validate Keystrokes @_@
		gblUtils.validateKeyStrokes(inSender, inEvent)
		this.$.lblTotal.setContent("$ "+gblUtils.numCD((Number(this.$.txtPrice.getValue())*
				Number(this.$.lblWeight.getContent().replace(",",""))/100).toFixed(2)));
		this.arrData.cattle[inEvent.rowIndex].price=Number(this.$.txtPrice.getValue())
		this.updateSummary()
	},
	loadPayments:function(inSender, inIndex){		
		var objData;
		var sDesc="";
		if (this.arrData){
			if(objData=this.arrData.cattle[inIndex]){
				this.$.lblCattle.setContent(objData.cattle_type);
				this.$.lblHeads.setContent(gblUtils.numCD(objData.heads));
				this.$.lblWeight.setContent(gblUtils.numCD(objData.weight));				
				this.$.lblAve.setContent(gblUtils.numCD(objData.average));
				this.$.lblTotal.setContent("$ "+((objData.weight*objData.price)/100).toFixed(2));
				if (objData.price>0){
					this.$.txtPrice.setValue(objData.price);				
				}
				return true;
			}else{
				this.updateSummary();
				return false;			
			}
		}
	},
	refreshList:function(){
		this.$.listPayments.render()
	},	
	updateSummary:function(){
		var iHeads=0;
		var iWeight=0;
		var iProfit=0;								
		for (var j=0;j<this.arrData.cattle.length;j++){
			iHeads+=this.arrData.cattle[j].heads;
			iWeight+=this.arrData.cattle[j].weight;			
			iProfit+=this.arrData.cattle[j].weight*this.arrData.cattle[j].price			
		}
		this.$.purchaseSum.setContent("$ "+gblUtils.numCD((iProfit/100).toFixed(2)))
	},
	selectShipRow:function(inSender, inEvent){
		if(this.bSelect){
			this.objSelectedShipment=this.arrData[inEvent.rowIndex];
			this.doSelectedShipment();
		}
		this.bSelect=false;
	},
	selectShipment:function(){
		this.bSelect=true;
	},
	getSelectedShipment:function(){
		return this.objSelectedShipment;
	},
	hideSMS:function(bSMS){
		if (bSMS==false){
			this.$.btnSMS.hide();
		}else{
			this.$.btnSMS.show();			
		}
	},
	hideSave:function(bShow){
		if (bShow==false){
			this.$.btnSave.hide();
			this.$.purchaseSum.setContent("")
		}else{
			this.$.btnSave.show();			
			this.$.purchaseSum.setContent("")			
		}		
	},
	setCaption:function(sCaption){
		this.$.priceAssign.setCaption(sCaption)		
	},
	ready:function(){
		this.$.btnSave.hide();
	}
});
