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
			{kind: "VFlexBox",content:"Compras",style:"font-size:15px;",flex:.1,onclick:"doSelect"} ,
			{kind: "Spacer",flex:.02},				
			{kind: "Button",caption: "+",onclick:"doPurchase"}
		]},
		{//HEADER:
			kind : "HFlexBox",
			className : "listFirst",
			style : "font-size:13px;background-color:#DABD8B;border-bottom-style: solid;border-bottom-color: black;padding: 0px 10px;border-width: 1px;",
			height : "30px",
			align : "center",
			pack : "start",
			components : [
				{
				    content : 'Fecha',
				    flex:1
				},{
				    content : 'Cabezas',
				    flex:1.5, style:"text-align: right;"
				},{
				    content : 'Peso',
				    flex:1.5, style:"text-align: right;"
				},{
				    content : 'Promedio',
				    flex:1.5, style:"text-align: right;"
				}]
		    },
		{kind: "Scroller", flex: 1, 
		 components:[
			{kind: enyo.VirtualRepeater, name: "listPurchased", onSetupRow: "loadPurchased", onclick: "doSelect",								
			components: [
				{kind: enyo.Item, style:"font-size:14px;",	
					components: [
					{layoutKind: enyo.HFlexLayout,components:[
						{name: "lblPurDate",flex:1,
						 content: ""},	
						{name: "lblPurHeads",flex:1.5,
						 content: "", style:"text-align: right;"},	
						{name: "lblPurWeight",flex:1.5,
						 content: "", style:"text-align: right;"},
						{name: "lblPurAveWeight",flex:1.5, 
						 content: "", style:"text-align: right;"},
					]},
					{layoutKind: enyo.HFlexLayout,
					 components:[
						{name: "lblPurSeller",flex:.45,style: "font-size: 0.85em;color:#008B8B",content:""},
						{kind: "VFlexBox",name: "lblPurRew",flex:.1,style: "font-size: 0.85em;color:#008B8B",align:"center",content:""},				
						{kind: "Spacer",flex:.4}						
					]}
					]}
				]}
		]},
		{kind: "Toolbar",
			components:[
				{kind:"RowGroup", align: "center", flex:.1, style:"backgound-color:white;margin:0",contentFit:true,
				 components:[
					{kind: "VFlexBox",name: "lblPurSumHeads",align:"center",allowHtml:true, 
					 className:"listSecond",style:"text-align:center;font-size: 0.75em;color:#999",
					 content: ""},
				]},
				{kind:"RowGroup", align: "center", flex:.15, style:"backgound-color:white;margin:0",contentFit:true,
				 components:[
					{kind: "VFlexBox",name: "lblPurSumWeight",align:"center",style:"text-align:center;font-size: 0.75em;color:#999",
					 content: "",allowHtml:true },
				]},
				{kind:"RowGroup", align: "center", flex:.12, style:"backgound-color:white;margin:0",contentFit:true,
				 components:[
					{kind: "VFlexBox",name: "lblSumAveWeight",align:"center",style:"text-align:center;font-size: 0.75em;color:#999",allowHtml:true, 
					 content: ""},
				]},				
			]},	
			{kind: "Toolbar",layoutKind: enyo.HFlexLayout,style:"padding:0px;color:white",
				 components:[
				         {kind: "VFlexBox", content:"Ending Inv.",flex:1.5,style:"color:white;margin:0;font-size:15px;"},
					{kind:"RowGroup",layoutKind: enyo.VFlexLayout, flex:1, style:"margin:0px;",
					 components:[
						{kind:"VFlexBox",name: "lblPurSumInvHeads",style:"text-align:center;font-size: 0.7em;color:#999;",align:"center",allowHtml:true, 
						 content: "",},
					]},
					{kind:"RowGroup",layoutKind: enyo.VFlexLayout, flex:1, style:"margin:0px;",
					 components:[
						{kind:"VFlexBox",name: "lblPurSumInvWeight",style:"text-align:center;font-size: 0.7em;color:#999",align:"center",allowHtml:true, 
						 content: ""},
					]},
					{kind:"RowGroup",layoutKind: enyo.VFlexLayout, flex:1, style:"margin:0px;",
					 components:[
						{kind:"VFlexBox",name: "lblSumInvAveWight",style:"text-align:center;font-size: 0.7em;color:#999",align:"center",allowHtml:true, 
						 content: ""},
					]},
				]},

	],
	loadPurchased:function(inSender, inIndex) {		
		var objData;
		//{seller:"Inventory",cattleName:"Novillos",heads:109,weight:40650,aveweight:372.9,reweight:536}
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
			if(inIndex % 2 == 0)inSender.$.client.$.client.applyStyle("background-color","#DFC699");
//			if(inIndex % 2 == 0)inSender.$.client.$.client.applyStyle("background-color","#DCC190");
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
		
		this.$.lblPurSumInvHeads.setContent("Cabezas<br />" + "+"+gblUtils.numCD(iHeadHeads));
		this.$.lblPurSumInvWeight.setContent("Peso<br />" + "+"+gblUtils.numCD(iHeadWeight));
		this.$.lblSumInvAveWight.setContent("Peso Prom.<br />" + "+"+gblUtils.numCD(((iFotAve/this.arrData.length)-
												(iHeadAve/this.arrData.length)).toFixed(2)));

		this.$.lblPurSumHeads.setContent("Cabezas<br />" + gblUtils.numCD(iFotHeads));
		this.$.lblPurSumWeight.setContent("Peso<br />" + gblUtils.numCD(iFotWeight));
		this.$.lblSumAveWeight.setContent("Peso Prom.<br />" + (iFotAve/this.arrData.length).toFixed(2));				
	},
	ready:function(){
		this.updateSummary();
	}
});
