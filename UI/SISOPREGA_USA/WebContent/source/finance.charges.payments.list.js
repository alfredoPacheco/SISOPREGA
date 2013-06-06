enyo.kind({
	name: "finance.charges.payments.list",
	kind: "VFlexBox",
	className: "enyo-bg",
	arrData:null,
	objSelectedShipment:null,
	events: {		
		onSelectedShipment: ""
	},			
	components: [
		{kind: "Scroller", flex: 1, 
		 components:[
			{kind: enyo.VirtualRepeater, name: "listPayments", onSetupRow: "loadPayments", onclick: "selectShipRow",								
			components: [
				{kind: enyo.Item,
					components: [
						{layoutKind: enyo.HFlexLayout,components:[
							{name: "lblPaymentDate",flex:.4,
							 content: "01/20/13"},
							{name: "lblPaymentType",flex:.43,
							 content: "Deposito"},	
							{name: "lblPaymentAmount",flex:.17,
							 content: "25,000 MX"},
						]},
						{layoutKind: enyo.HFlexLayout,
						 components:[
							{name: "lblPaymentDesc",flex:.45,style: "font-size: 0.85em;color:#999",content:"Payment"},				
						]}
					]}
				]}
		]},
	],
	loadPayments:function(inSender, inIndex){		
		var objData;
		var sDesc=""
		if (this.arrData){
			if(objData=this.arrData.payments[inIndex]){
				this.$.lblPaymentDate.setContent(objData.paymentDate);
				this.$.lblPaymentType.setContent(objData.paymentType);
				this.$.lblPaymentAmount.setContent(gblUtils.numCD(objData.amount));
				if (objData.transactID){
					sDesc=objData.transactID+","+objData.paymentDesc
				}else{
					sDesc=objData.paymentDesc					
				}
				this.$.lblPaymentDesc.setContent(sDesc)
				return true;
			}else{
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
		var iAve=0;		
		
		for (var j=0;j<this.arrData.length;j++){
			iHeads+=this.arrData[j].heads;			
			iWeight+=this.arrData[j].weight;
			iAve+=this.arrData[j].aveweight;			
		}
		
		this.$.lblSalesSumHeads.setContent(gblUtils.numCD(iHeads));
		this.$.lblSalesSumWeight.setContent(gblUtils.numCD(iWeight));
		this.$.lblSalesSumAveWeight.setContent((iAve/this.arrData.length).toFixed(2));				
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
	}
});
