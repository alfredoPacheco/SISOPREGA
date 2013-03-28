enyo.kind({
	name: "admin.shipments",
	kind: "VFlexBox",
	className: "enyo-bg",
	events: {
		onSelect: ""
	},			
	components: [
		{kind: "Toolbar",
			components:[
				{kind: "VFlexBox",content:"Envios",onclick:"doSelect",flex:.3,style:"color:white"}
			]},			
		{kind: "Scroller", flex: 1, 
		 components:[
			{kind: enyo.VirtualRepeater, name: "listInventorys", onSetupRow: "loadInventory", onclick: "doSelectProduct",								
			components: [
				{kind: enyo.Item,
					components: [
					{layoutKind: enyo.HFlexLayout,components:[
						{name: "lblSalesDate",flex:.9,
						 content: "01/01 14:30"},
						{name: "lblSalesHeads",flex:1,
						 content: "100"},	
						{name: "lblSalesWeight",flex:1,
						 content: "100000"},
						{name: "lblSalesAverage",flex:1, 
						 content: "200"},
						{kind: "Button", name:"btn",caption:"-",style: "margin-right:0px"},		 
					]},
					{name: "lblSalesClient",style: "font-size: 0.85em;color:#999",
					 content:"Comprador"}								
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
					 content: "241"},
				]},
				{kind: "Spacer",flex:.15},
				{kind:"RowGroup", align: "center", flex:.15, style:"backgound-color:white;margin:0",
				 components:[
					{kind: "VFlexBox",name: "lblSalesSumWeight",align:"center",
					 style:"font-size: 0.75em;color:#999",
					 content: "1234"},
				]},
				{kind: "Spacer",flex:.07},
				{kind:"RowGroup", align: "center", flex:.12, style:"backgound-color:white;margin:0",
				 components:[
					{kind: "VFlexBox",name: "lblSumAveWeight",align:"center",
					 className:"listSecond",style:"font-size: 0.75em;color:#999",
					 content: "1233"},
				]},				
				{kind: "Spacer",flex:.28},				
			]},	
	],
	loadInventory:function(inSender, inIndex) {		
		if (inIndex<100) {
			return true;
		}
	},			
});
