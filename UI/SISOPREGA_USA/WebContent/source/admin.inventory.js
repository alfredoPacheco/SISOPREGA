enyo.kind({
	name: "admin.inventory",
	kind: "VFlexBox",
	className: "enyo-bg",
	arrData:null,
	events: {
		onSelect: "",
		onSale:"",
	},		
	components: [
		{kind: "Toolbar",
	     components:[
			{kind: "VFlexBox",content:"Inventario",flex:.17,onclick:"doSelect",style:"padding:0px;color:white"},
			{kind:"RowGroup", flex:.04, style:"margin:0px;",
			 components:[
				{kind: "VFlexBox",name: "lblPurSumInvHeads",style:"font-size: 0.7em;color:#999;",align:"center",
				 content: "",},	
			]},
			{kind: "Spacer",flex:.019},			
			{kind:"RowGroup",flex:.05, style:"margin:0px;",
			 components:[
				{kind: "VFlexBox",name: "lblPurSumInvWeight",style:"font-size: 0.7em;color:#999",align:"center",
				 content: ""},
			]},
			{kind: "Spacer",flex:.01},						
			{kind:"RowGroup",layoutKind: enyo.VFlexLayout, flex:.05, style:"margin:0px;",
			 components:[
				{kind: "VFlexBox",name: "lblSumInvAveWight",style:"font-size: 0.7em;color:#999",align:"center",
				 content: ""},
			]},
			
			{kind: "Spacer",flex:.05},				
			{kind: "Button",caption: "+",onclick:"doSale"}
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
				    content : 'Tipo',
				    flex:1
				},{
				    content : 'Clase',
				    flex:1
				},{
				    content : 'Cabezas',
				    flex:1, style:"text-align: right;"
				},{
				    content : 'Peso',
				    flex:1, style:"text-align: right;"
				},{
				    content : 'Promedio',
				    flex:1, style:"text-align: right;"
				},{
				    content : 'Alimento',
				    flex:.9, style:"text-align: right;"
				},]
		    },
		{kind: "Scroller", flex: 1, 
		 components:[
			{kind: enyo.VirtualRepeater, name: "listInventory", onSetupRow: "loadInventory", onclick: "doSelect",								
			components: [
				{kind: enyo.Item, style:"font-size: 14px;",
					components: [
					{layoutKind: enyo.HFlexLayout,components:[
						{name: "lblInvType",flex:1,
						 content: ""},
						{name: "lblInvClass",flex:1,
						 content: "Novillos"},						 
						{name: "lblInvHeads",flex:1,
						 content: "", style:"text-align: right;"},	
						{name: "lblInvWeight",flex:1,
						 content: "", style:"text-align: right;"},
						{name: "lblInvInvAverage",flex:1, 
						 content: "", style:"text-align: right;"},
						{name: "lblInvFeed",flex:.9, 
						 content: "", style:"text-align: right;"},						 
					]},
					{layoutKind: enyo.HFlexLayout,components:[
						{name: "lblInvBarnyards",style: "font-size: 0.85em;color:#008B8B",flex:1,content:""},						
						{name: "lblInvDescBuyer",style: "font-size: 0.85em;color:#008B8B",flex:1,content:""},
						{name: "lblInvDescTruck",style: "font-size: 0.85em;color:#008B8B",flex:1,content:""}						
						]}
					]}
				]}
		]},
		{kind: "Toolbar",
			components:[
				{kind: "VFlexBox", content:"Total",flex:.28,style:"color:white;margin:0"} ,
				{kind:"RowGroup", align: "center", flex:.1, style:"backgound-color:white;margin:0",
				 components:[
					{name: "lblInvSumHeadClass",kind: "VFlexBox",align:"center",style:"font-size: 0.75em;color:#999",
					 content: ""},
				]},
				{kind: "Spacer",flex:.01},
				{kind:"RowGroup", align: "center", flex:.1, style:"backgound-color:white;margin:0",
				 components:[
					{kind: "VFlexBox",name: "lblInvSumWeight",align:"center",style:"font-size: 0.75em;color:#999",
					 content: ""},
				]},
				{kind: "Spacer",flex:.01},
				{kind:"RowGroup", align: "center", flex:.1, style:"backgound-color:white;margin:0",
				 components:[
					{kind: "VFlexBox",name: "lblInvSumAvgWeight",align:"center",style:"font-size: 0.75em;color:#999",
					 content: ""},
				]},				
				{kind: "Spacer"	,flex:.01},				
				{kind:"RowGroup", align: "center", flex:.1, style:"backgound-color:white;margin:0",
				 components:[
					{kind: "VFlexBox",name: "lblInvSumFeed",align:"center",style:"font-size: 0.75em;color:#999",
					 content: ""},
				]},				
				{kind: "Spacer"	,flex:.01}				
			]},	
	],
	updateInventory:function(){
	},
	calcSummary:function(){
	},
	loadInventory:function(inSender, inIndex){
		var objData;
		if(objData=this.arrData[inIndex]){
			this.$.lblInvType.setContent(objData.cattle_type);
			this.$.lblInvClass.setContent(objData.cattle_class);		 
			this.$.lblInvHeads.setContent(gblUtils.numCD(objData.heads));
			this.$.lblInvWeight.setContent(gblUtils.numCD(objData.weight));
			this.$.lblInvInvAverage.setContent(objData.avgweight);
			this.$.lblInvFeed.setContent(objData.feed);
			var sTrucks="";
			for (var j=0;j<objData.trucks.length;j++){
				sTrucks+=objData.trucks[j]+", ";
			}
			if(sTrucks!=""){sTrucks=sTrucks.slice(0,-2);}
			var sBuyer="";			
			for (var i=0;i<objData.buyers.length;i++){
				sBuyer+=objData.buyers[i].name+" ("+objData.buyers[i].heads+"/"+
						(objData.avgweight*objData.buyers[i].heads).toFixed(2)+"), ";
			}		
			if(sBuyer!=""){sBuyer=sBuyer.slice(0,-2);}
			var sBY="";			
			for (var i=0;i<objData.barnyards.length;i++){
				sBY+=objData.barnyards[i]+", ";
			}					
			if(sBY!=""){sBY=sBY.slice(0,-2);}			
			//var sDesc;
			//sDesc=sBuyer;
			//if(sTrucks!=""){sDesc+=" - "+sTrucks}
			this.$.lblInvBarnyards.setContent(sBY);			
			this.$.lblInvDescBuyer.setContent(sBuyer);
			this.$.lblInvDescTruck.setContent(sTrucks);
			
			if(inIndex % 2 == 0)inSender.$.client.$.client.applyStyle("background-color","#DFC699");
//			if(inIndex % 2 == 0)inSender.$.client.$.client.applyStyle("background-color","#DCC190");
			return true;
		}else{
			return false;			
		}
	},
	updateSummary:function(){
		var iHeads=0;
		var iSumWeight=0;		
		var iSumAve=0;		
		var iSumFeed=0;
		var iSold=0;
		var iSoldAve=0;
		for (var j=0;j<this.arrData.length;j++){
			iHeads+=this.arrData[j].heads;
			iSumWeight+=this.arrData[j].weight;
			iSumAve+=this.arrData[j].avgweight;
			iSumFeed+=this.arrData[j].feed;
			for (var i=0;i<this.arrData[j].buyers.length;i++){
				iSold+=this.arrData[j].buyers[i].heads;				
				iSoldAve+=this.arrData[j].buyers[i].heads*this.arrData[j].avgweight;
			//alert((this.arrData[j].buyers[i].heads
			//		+"+"+this.arrData[j].avgweight)+"="+this.arrData[j].buyers[i].heads*this.arrData[j].avgweight);				
			}					
		}
		iSumAve=iSumAve/this.arrData.length;
		this.$.lblInvSumHeadClass.setContent(gblUtils.numCD(iHeads));
		this.$.lblInvSumWeight.setContent(gblUtils.numCD(iSumWeight));
		this.$.lblInvSumAvgWeight.setContent(iSumAve);
		this.$.lblInvSumFeed.setContent(iSumFeed);		
		
		this.$.lblPurSumInvHeads.setContent(gblUtils.numCD(iHeads-iSold));
		this.$.lblPurSumInvWeight.setContent(gblUtils.numCD((iSumWeight-iSoldAve).toFixed(2)));
		this.$.lblSumInvAveWight.setContent(((iSumWeight-iSoldAve)/(iHeads-iSold)).toFixed(2));
	},
	ready:function(){
		this.updateSummary();
	}
});
