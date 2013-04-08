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
			{kind: "VFlexBox",content:"Inventario",flex:.17,onclick:"doSelect",style:"padding:0px;color:white;font-size:15px;"},
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
				
				{kind:"RowGroup",contentFit:true, align: "center", flex:.1, style:"backgound-color:white;margin:0;",
				 components:[
					{name: "lblInvSumHeadClass",kind: "VFlexBox",align:"center",allowHtml:true, style:"text-align:center;font-size: 0.75em;color:#999;",
					 content: "", },
				]},
				{kind:"RowGroup",contentFit:true, align: "center", flex:.1, style:"backgound-color:white;margin:0",
				 components:[
					{kind: "VFlexBox",name: "lblInvSumWeight",align:"center",allowHtml:true, style:"text-align:center;font-size: 0.75em;color:#999;",
					 content: ""},
				]},
				{kind:"RowGroup",contentFit:true, align: "center", flex:.1, style:"backgound-color:white;margin:0",
				 components:[
					{kind: "VFlexBox",name: "lblInvSumAvgWeight",align:"center",allowHtml:true, style:"text-align:center;font-size: 0.75em;color:#999;",
					 content: ""},
				]},				
				{kind:"RowGroup", contentFit:true,align: "center", flex:.1, style:"backgound-color:white;margin:0",
				 components:[
					{kind: "VFlexBox",name: "lblInvSumFeed",align:"center",allowHtml:true, style:"text-align:center;font-size: 0.75em;color:#999;",
					 content: ""},
				]},				
			]},
			{kind: "Toolbar",
			     components:[
			                 {kind: "VFlexBox", content:"Ending Inv.",flex:1.5,style:"color:white;margin:0;font-size:15px;"},
					{kind:"RowGroup", flex:1, style:"margin:0px;", 
					 components:[
						{kind: "VFlexBox",name: "lblPurSumInvHeads",allowHtml:true, style:"text-align:center;font-size: 0.7em;color:#999;",align:"center",
						 content: "",},						 
					]},
					{kind:"RowGroup",flex:1, style:"margin:0px;",
					 components:[
						{kind: "VFlexBox",name: "lblPurSumInvWeight",allowHtml:true, style:"text-align:center;font-size: 0.7em;color:#999",align:"center",
						 content: ""},
					]},
					{kind:"RowGroup",layoutKind: enyo.VFlexLayout, flex:1, style:"margin:0px;",
					 components:[
						{kind: "VFlexBox",name: "lblSumInvAveWight",allowHtml:true, style:"text-align:center;font-size: 0.7em;color:#999",align:"center",
						 content: ""},
					]}
				]},
	],
	updateInventory:function(){
	},
	calcSummary:function(){
	},
	loadInventory:function(inSender, inIndex){
		var objData;
		if(objData=this.arrData[inIndex]){
		    	var cattle_name = cacheClasses.getByID(objData.cattleType);
		    	if(cattle_name){
		    	cattle_name = cattle_name.name;
		    	}
		    	else{
		    	cattle_name = "";   
		    	}
		    	
			this.$.lblInvType.setContent(cattle_name);
			this.$.lblInvClass.setContent(objData.cattleName);		 
			this.$.lblInvHeads.setContent(gblUtils.numCD(objData.heads));
			this.$.lblInvWeight.setContent(gblUtils.numCD(objData.weight));
			this.$.lblInvInvAverage.setContent(objData.avgweight);
			this.$.lblInvFeed.setContent(objData.feed.quantity);
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
			for (var i in objData.barnyard){
				sBY+=objData.barnyard[i]+", ";
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
			iSumFeed+=this.arrData[j].feed.quantity;
			for (var i=0;i<this.arrData[j].buyers.length;i++){
				iSold+=this.arrData[j].buyers[i].heads;				
				iSoldAve+=this.arrData[j].buyers[i].heads*this.arrData[j].avgweight;
			//alert((this.arrData[j].buyers[i].heads
			//		+"+"+this.arrData[j].avgweight)+"="+this.arrData[j].buyers[i].heads*this.arrData[j].avgweight);				
			}					
		}
		iSumAve=iSumAve/this.arrData.length;
		this.$.lblInvSumHeadClass.setContent("Cabezas<br />" + gblUtils.numCD(iHeads));
		this.$.lblInvSumWeight.setContent("Peso<br />" + gblUtils.numCD(iSumWeight));
		this.$.lblInvSumAvgWeight.setContent("Peso Prom.<br />" + iSumAve);
		this.$.lblInvSumFeed.setContent("Alimento<br />" + iSumFeed);		
		
		this.$.lblPurSumInvHeads.setContent("Cabezas<br />" + gblUtils.numCD(iHeads-iSold));
		this.$.lblPurSumInvWeight.setContent("Peso<br />" + gblUtils.numCD((iSumWeight-iSoldAve).toFixed(2)));
		this.$.lblSumInvAveWight.setContent("Peso Prom.<br />" + ((iSumWeight-iSoldAve)/(iHeads-iSold)).toFixed(2));
	},
	ready:function(){
		this.updateSummary();
	}
});
