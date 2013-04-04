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
					    flex:1.5, style:"text-align: right;margin-right:10px;"
					},{
					    content : '',
					    width:"34px;"
					}]
			    },
		{kind: "Scroller", flex: 1, name:"scroller",
		 components:[
			{kind: enyo.VirtualRepeater, name: "listShipments", onSetupRow: "loadShipments", onclick: "selectShipRow",								
			components: [
				{kind: enyo.Item, style:"font-size:14px;",
					components: [
						{layoutKind: enyo.HFlexLayout, align:"center", components:[
							{name: "lblSalesDate",flex:1,
							 content: ""},
							{name: "lblSalesHeads",flex:1.5,
							 content: "", style:"text-align: right;"},	
							{name: "lblSalesWeight",flex:1.5,
							 content: "", style:"text-align: right;"},
							{name: "lblSalesAverage",flex:1.5, 
							 content: "", style:"text-align: right;margin-right:10px;"},
							{kind: "Button", width:"26px", height:"24px",name:"btn",caption:"-",style: "margin-right:0px;padding:0px;",onclick:"selectShipment"},		 
						]},
						{layoutKind: enyo.HFlexLayout,
						 components:[
							{name: "lblSalesClient",flex:.45,style: "font-size: 0.85em;color:#008B8B",content:""},
							{name: "lblSalesTruck",flex:.55,style: "font-size: 0.85em;color:#008B8B",content:""},						
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
			if(inIndex % 2 == 0)inSender.$.client.$.client.applyStyle("background-color","#DFC699");
//			if(inIndex % 2 == 0)inSender.$.client.$.client.applyStyle("background-color","#DCC190");
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
	},
	updateList:function(){
	    this.arrData = [];
	    var items = cacheShip.readData();
	    var len = items.length;
	    for(var i = 0; i<len;i++){
		//TODO FILTER BY date == today
		this.arrData.push(items[i]);
	    }
	    this.$.listShipments.render();
	},
	moveToBottom:function(){
	    this.$.scroller.scrollTo(this.$.scroller
			.getBoundaries().bottom, 0);
	}
});