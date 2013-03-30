enyo.kind({
	name: "admin.purchased",
	kind: "VFlexBox",
	className: "enyo-bg",
	events: {
		onSelect: "",
		onPurchase:""
	},	
	ready:function(){
	},	
	components: [
		{kind: "Toolbar",layoutKind: enyo.HFlexLayout,style:"padding:0px;color:white",
		 components:[
			{kind: "VFlexBox",content:"Compras",flex:.1,onclick:"doSelect"} ,
			{kind:"RowGroup",layoutKind: enyo.VFlexLayout, flex:.08, style:"margin:0px;",
			 components:[
				{kind:"VFlexBox",name: "lblPurSumInvHeads",style:"font-size: 0.7em;color:#999;",align:"center",
				 content: "",},
			]},
			{kind:"RowGroup",layoutKind: enyo.VFlexLayout, flex:.14, style:"margin:0px;",
			 components:[
				{kind:"VFlexBox",name: "lblPurSumInvWeight",style:"font-size: 0.7em;color:#999",align:"center",
				 content: ""},
			]},
			{kind:"RowGroup",layoutKind: enyo.VFlexLayout, flex:.08, style:"margin:0px;",
			 components:[
				{kind:"VFlexBox",name: "lblSumInvAveWight",style:"font-size: 0.7em;color:#999",align:"center",
				 content: ""},
			]},
			
			{kind: "Spacer",flex:.02},				
			{kind: "Button",caption: "+",onclick:"doPurchase"}
		]},
		{kind: "Scroller", flex: 1, 
		 components:[
			{kind: enyo.VirtualRepeater, name: "listPurchased", onSetupRow: "loadPurchased", onclick: "doSelect",								
			components: [
				{kind: enyo.Item,		
					components: [
					{layoutKind: enyo.HFlexLayout,components:[
						{name: "lblPurDate",flex:.8,
						 content: ""},	
						{name: "lblPurHeads",flex:1,
						 content: ""},	
						{name: "lblPurWeight",flex:1,
						 content: ""},
						{name: "lblPurAveWeight",flex:1, 
						 content: ""},
					]},
					{layoutKind: enyo.HFlexLayout,
					 components:[
						{name: "lblPurSeller",flex:.45,style: "font-size: 0.85em;color:#999",content:""},
						{kind: "VFlexBox",name: "lblPurRew",flex:.1,style: "font-size: 0.85em;color:#999",align:"center",content:""},				
						{kind: "Spacer",flex:.4}						
					]}
					]}
				]}
		]},
		{kind: "Toolbar",
			components:[
				{kind: "VFlexBox", content:"Total",flex:.18,style:"color:white;margin:0"},
				{kind: "Spacer",flex:.08},				
				{kind:"RowGroup", align: "center", flex:.1, style:"backgound-color:white;margin:0",
				 components:[
					{kind: "VFlexBox",name: "lblPurSumHeads",align:"center",
					 className:"listSecond",style:"font-size: 0.75em;color:#999",
					 content: ""},
				]},
				{kind: "Spacer",flex:.12},
				{kind:"RowGroup", align: "center", flex:.15, style:"backgound-color:white;margin:0",
				 components:[
					{kind: "VFlexBox",name: "lblPurSumWeight",align:"center",style:"font-size: 0.75em;color:#999",
					 content: ""},
				]},
				{kind: "Spacer",flex:.10},
				{kind:"RowGroup", align: "center", flex:.12, style:"backgound-color:white;margin:0",
				 components:[
					{kind: "VFlexBox",name: "lblSumAveWeight",align:"center",style:"font-size: 0.75em;color:#999",
					 content: ""},
				]},				
				{kind: "Spacer",flex:.17},				
			]},	

	],
	loadPurchased:function(inSender, inIndex) {		
		var objData;
		//{seller:"Inventory",cattle_class:"Novillos",heads:109,weight:40650,aveweight:372.9,reweight:536}
		if(objData=this.arrData[inIndex]){
			this.$.lblPurDate.setContent(objData.purdate);
			this.$.lblPurHeads.setContent(objData.heads);
			this.$.lblPurWeight.setContent(gblUtils.numCD(objData.weight));
			this.$.lblPurAveWeight.setContent(objData.aveweight);
			this.$.lblPurSeller.setContent(objData.seller);	
			if(objData.reweight){
				if(objData.reweight>0){
					this.$.lblPurRew.setContent("(+"+objData.reweight+")");					
				}else{
					this.$.lblPurRew.setContent("("+objData.reweight+")");
				}
			}
			return true;
		}else{
			return false;			
		}
	},
	updateSummary:function(){
		var iHeadHeads=0;		
		var iHeadWeight=0;
		var iHeadAve=0;		
		var iFotHeads=0;				
		var iFotWeight=0;	
		var iFotAve=0;				
		
		for (var j=0;j<this.arrData.length;j++){
			iFotHeads+=this.arrData[j].heads;			
			iFotWeight+=this.arrData[j].weight;
			iFotAve+=this.arrData[j].aveweight;
			if(!this.arrData[j].rtype || this.arrData[j].rtype!="inv"){
				iHeadHeads+=this.arrData[j].heads;			
				iHeadWeight+=this.arrData[j].weight;
				iHeadAve+=this.arrData[j].aveweight;				
			}
			
		}
		
		this.$.lblPurSumInvHeads.setContent("+"+gblUtils.numCD(iHeadHeads));
		this.$.lblPurSumInvWeight.setContent("+"+gblUtils.numCD(iHeadWeight));
		this.$.lblSumInvAveWight.setContent("+"+gblUtils.numCD(((iFotAve/this.arrData.length)-
												(iHeadAve/this.arrData.length)).toFixed(2)));

		this.$.lblPurSumHeads.setContent(gblUtils.numCD(iFotHeads));
		this.$.lblPurSumWeight.setContent(gblUtils.numCD(iFotWeight));
		this.$.lblSumAveWeight.setContent((iFotAve/this.arrData.length).toFixed(2));				
	},
	ready:function(){
		this.updateSummary();
	}
});
