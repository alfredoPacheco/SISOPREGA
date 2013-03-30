enyo.kind({
	name: "admin.shipments",
	kind: "VFlexBox",
	className: "enyo-bg",
	arrData:null,
	objSelectedShipment:null,
	events: {		
		onSelectedShipment: ""
	},			
	components: [
		{kind: "Toolbar",
			components:[
				{kind: "VFlexBox",content:"Envios",onclick:"doSelect",flex:.3,style:"color:white"}
			]},			
		{kind: "Scroller", flex: 1, 
		 components:[
			{kind: enyo.VirtualRepeater, name: "listShipments", onSetupRow: "loadShipments", onclick: "selectShipRow",								
			components: [
				{kind: enyo.Item,
					components: [
						{layoutKind: enyo.HFlexLayout,components:[
							{name: "lblSalesDate",flex:.9,
							 content: ""},
							{name: "lblSalesHeads",flex:1,
							 content: ""},	
							{name: "lblSalesWeight",flex:1,
							 content: ""},
							{name: "lblSalesAverage",flex:1, 
							 content: ""},
							{kind: "Button", name:"btn",caption:"-",style: "margin-right:0px",onclick:"selectShipment"},		 
						]},
						{layoutKind: enyo.HFlexLayout,
						 components:[
							{name: "lblSalesClient",flex:.45,style: "font-size: 0.85em;color:#999",content:""},
							{name: "lblSalesTruck",flex:.55,style: "font-size: 0.85em;color:#999",content:""},						
						]}
					]}
				]}
		]},
		{kind: "Toolbar",
			components:[
				{kind: "VFlexBox", content:"Total",flex:.20,style:"color:white;margin:0"},
				{kind: "Spacer",flex:.07},				
				{kind:"RowGroup", align: "center", flex:.1, style:"backgound-color:white;margin:0",
				 components:[
					{kind: "VFlexBox",name: "lblSalesSumHeads",align:"center",style:"font-size: 0.75em;color:#999",
					 content: ""},
				]},
				{kind: "Spacer",flex:.15},
				{kind:"RowGroup", align: "center", flex:.15, style:"backgound-color:white;margin:0",
				 components:[
					{kind: "VFlexBox",name: "lblSalesSumWeight",align:"center",
					 style:"font-size: 0.75em;color:#999",
					 content: ""},
				]},
				{kind: "Spacer",flex:.07},
				{kind:"RowGroup", align: "center", flex:.12, style:"backgound-color:white;margin:0",
				 components:[
					{kind: "VFlexBox",name: "lblSalesSumAveWeight",align:"center",
					 style:"font-size: 0.75em;color:#999",
					 content: ""},
				]},				
				{kind: "Spacer",flex:.28},				
			]},	
	],
	loadShipments:function(inSender, inIndex) {		
		var objData;
		if(objData=this.arrData[inIndex]){
			this.$.lblSalesDate.setContent(objData.depdate+" "+objData.deptime);
			this.$.lblSalesHeads.setContent(gblUtils.numCD(objData.heads));
			this.$.lblSalesWeight.setContent(gblUtils.numCD(objData.weight));
			this.$.lblSalesAverage.setContent(objData.aveweight);
			this.$.lblSalesClient.setContent(objData.buyer);	
			this.$.lblSalesTruck.setContent(objData.truck);																			
			return true;
		}else{
			return false;			
		}
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
	ready:function(){
		this.updateSummary();
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
