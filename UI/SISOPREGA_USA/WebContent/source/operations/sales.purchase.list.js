enyo.kind({
	name: "sales.purchase.list",
	kind: enyo.HFlexBox,
	style:"background-color:#FFF;",
	arrPayments:null,
	arrData:null,
	arrTemp:null,
	iRancher:null,
	iCharge:null,
	caption:"",
	bSMS:false,
	priceCaption:"",
	events: {
		onSavePrices:"",
		onSMS:""
	},		
	components: [
		{kind:enyo.VFlexBox, flex:.5, style:"border-right:2px solid;",components: [
		 {kind:enyo.Divider, name:"chargeCap",caption:"",
		 components:[{kind:"RowGroup", align: "center", flex:.1, style:"backgound-color:white;margin:0",
					 components:[
						{name: "purchaseSum",kind: "VFlexBox",align:"center",style:"font-size: 20px; color:#000",
						 content: ""},
					]}]},
		 {kind: "Scroller", flex: 1, 
		 components:[
			{kind: enyo.VirtualRepeater, name: "listInventory", onSetupRow: "loadBuyed", onclick: "selectPurchase",								
			components: [
				{kind: enyo.Item,
					onclick:"showDetails",
					components: [
						{layoutKind: enyo.HFlexLayout,components:[
							{name: "purchaseDate",flex:.15,
							 content: ""},
							{name: "rancherName",flex:.49,
							 content: ""},
							{name: "quantity",flex:.18, 
							 content: ""},		
							{name: "average",flex:.18, 
							 content: ""},									 				 
						]},
						{kind:"enyo.Drawer", name:"details",
						 open:false,
						 components:[			
						{kind: enyo.VirtualRepeater, name: "listCharges", onSetupRow: "loadCharges",								
						 components: [						 								
							{name:"charges",layoutKind:enyo.HFlexLayout, onclick:"",
							 components:[
								{name: "chType",flex:.02,style: "font-size: 0.85em;color:#999",
								 content: ""},							
								{name: "chDate",flex:.17,style: "font-size: 0.85em;color:#999",
								 content: ""},
								{name: "chDesc",flex:.58, style: "font-size: 0.85em;color:#999",
								 content: ""},
								{name: "chAmount",flex:.22, style: "font-size: 0.85em;color:#999",
								 content: ""},								 
							  ]}
							]}
						  ]}
						]}		
					]}
			]},
		]},
		{kind:enyo.VFlexBox,flex:.5,components: [		
	 		{name:"priceAssign",kind:"sales.price.assignment",flex:1, 
			 maxState:false,onSavePrices:"doSavePrices",onSMS:"doSMS"},		 
		 ]
		}
	],
	selectPurchase:function(inSender,inEvent){
		if(this.arrData[inEvent.rowIndex]){
			this.$.priceAssign.hideSave(true);			
			this.$.priceAssign.hideSMS(this.bSMS);			
			this.$.priceAssign.arrData = this.arrData[inEvent.rowIndex]
			this.$.priceAssign.refreshList()
			return true
		}
	},
	resetValues:function(){
		this.$.priceAssign.hideSave(false);
		this.$.priceAssign.hideSMS(false);	
		this.$.priceAssign.arrData =null
		this.$.priceAssign.refreshList()		
	},
	showDetails:function(inSender, inEvent){
		if (inSender.children[1].getOpen()){
			inSender.children[1].setOpen(false)
		}else{
			inSender.children[1].setOpen(true)			
		}
	},
	loadBuyed:function(inSender, inIndex){
		var objData;
		if(objData=this.arrData[inIndex]){
			this.$.purchaseDate.setContent(objData.purchase_date)			
			this.$.rancherName.setContent(objData.rancher_name)
			this.$.quantity.setContent(gblUtils.numCD(objData.heads)+"/"+gblUtils.numCD(objData.weight))
			this.$.average.setContent(gblUtils.numCD(objData.average))
			this.arrTemp=objData.charges
			this.$.listCharges.render()
			return true;
		}else{
			return false;			
		}		
	},
	updateSummary:function(){
		var iHeads=0;
		var iWeight=0;
		if(this.arrData){
			for (var j=0;j<this.arrData.length;j++){
				iHeads+=this.arrData[j].heads;
				iWeight+=this.arrData[j].weight;			
			}
			this.$.purchaseSum.setContent(gblUtils.numCD(iWeight) +"/"+ gblUtils.numCD(iHeads))
		}
	},
	ready:function(){
		this.$.chargeCap.setCaption(this.caption)
		this.$.priceAssign.setCaption(this.priceCaption)
		this.$.priceAssign.hideSMS(false);
		this.updateSummary()
	}
});
