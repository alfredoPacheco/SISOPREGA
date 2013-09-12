enyo.kind({
	name: "admin.shipments",
	kind: "VFlexBox",
	className: "enyo-bg",
	arrData:null,
	objSelectedShipment:null,
	events: {		
		onSelectedShipment: "",
		onDeleteShipProgrammed: ""
	},			
	components: [
		{kind: "Toolbar",
			components:[
				{kind: "VFlexBox",content:"Embarques",onclick:"doSelect",flex:.3,style:"color:white;font-size:15px;"}
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
					    content : 'Fecha programada',
					    flex:1
					},{
					    content : 'Cabezas',
					    flex:1.5, style:"text-align: right;"
					},{
					    content : 'Peso',
					    flex:1.5, style:"text-align: right;"
					},{
					    content : 'Promedio',
					    flex:1.5, style:"text-align: right;margin-right:13px;"
					},{
					    content : '',
					    width:"34px;"
					}]
			    },
		{kind: "Scroller", flex: 1, name:"scroller",
		 components:[
			{kind: enyo.VirtualRepeater, name: "listShipments", onSetupRow: "loadShipments",								
			components: [
				{kind: enyo.SwipeableItem, style:"font-size:14px;",
				    confirmCaption:"Eliminar",
				    onConfirm:"onDeleteShip",
					components: [
						{layoutKind: enyo.HFlexLayout, align:"center", components:[
							{name: "lblShipProgramDate",flex:1.5,
							 content: ""},
							{name: "lblShipHeads",flex:1,
							 content: "", style:"text-align: right;"},	
							{name: "lblShipWeight",flex:1.5,
							 content: "", style:"text-align: right;"},
							{name: "lblShipAverage",flex:1.5, 
							 content: "", style:"text-align: right;margin-right:10px;"},
							{kind: "Button", width:"26px", height:"24px",name:"btnRelease",caption:"-",style: "margin-right:0px;padding:0px;",onclick:"selectShipment"},		 
						]},
						{layoutKind: enyo.HFlexLayout,
						 components:[
							{name: "lblShipClient",style: "font-size: 0.85em;color:#008B8B",content:""},
							{name:"lblShipReleased",flex:1, style:"color:gray;font-size:0.85em;text-align:right;", content:"Liberado", showing:false}
						]}
					]}
				]}
		]},
		{kind: "Toolbar",
			components:[
                        	{kind:"RowGroup",contentFit:true, align: "center", flex:.1, style:"backgound-color:white;margin:0;",
                        	 components:[
                        		{name: "lblShipSumHeads",kind: "VFlexBox",align:"center",allowHtml:true, style:"text-align:center;font-size: 0.75em;color:#999;",
                        		 content: "", },
                        	]},
                        	{kind:"RowGroup",contentFit:true, align: "center", flex:.1, style:"backgound-color:white;margin:0",
                        	 components:[
                        		{kind: "VFlexBox",name: "lblShipSumWeight",align:"center",allowHtml:true, style:"text-align:center;font-size: 0.75em;color:#999;",
                        		 content: ""},
                        	]},
                        	{kind:"RowGroup",contentFit:true, align: "center", flex:.1, style:"backgound-color:white;margin:0",
                        	 components:[
                        		{kind: "VFlexBox",name: "lblShipSumAveWeight",align:"center",allowHtml:true, style:"text-align:center;font-size: 0.75em;color:#999;",
                        		 content: ""},
                        	]},	
							
			]},	
	],
	loadShipments:function(inSender, inIndex) {
		var objData;
		if(objData=this.arrData[inIndex]){
			this.$.lblShipProgramDate.setContent(objData.dateTimeProgrammed.toLocaleDateString()+ " " +objData.dateTimeProgrammed.toLocaleTimeString().substring(0,5));
			this.$.lblShipHeads.setContent(utils.formatNumberThousands(objData.totalHeads));
			this.$.lblShipWeight.setContent(utils.formatNumberThousands(objData.totalWeight));
			this.$.lblShipAverage.setContent(utils.formatNumberThousands(objData.totalAvgWeight));
			this.$.lblShipClient.setContent(objData.customer);	
			if(inIndex % 2 == 0)inSender.$.client.$.client.applyStyle("background-color","#DFC699");
//			if(inIndex % 2 == 0)inSender.$.client.$.client.applyStyle("background-color","#DCC190");
			if(objData.hasOwnProperty("ShipmentRelease")){
			    this.$.btnRelease.hide();
			    this.$.lblShipReleased.show();
			    this.$.lblShipReleased.setContent("Liberado el " + objData.ShipmentRelease[0].dateTime.toLocaleString());
			    this.$.lblShipAverage.applyStyle("margin-right","47px");
			}else{
			    this.$.lblShipReleased.hide();
			    this.$.btnRelease.show();
			    this.$.lblShipAverage.applyStyle("margin-right","10px");
			}
			return true;
		}else{
			return false;
		}
	},
	updateSummary:function(){
	    var iHeads=0;	
	    var iWeight=0;
	    var iAve=0;
	    
	    for (var j=0;j<this.arrData.length;j++) {
		iHeads+=this.arrData[j].totalHeads;
		iWeight+=this.arrData[j].totalWeight;
		iAve+=this.arrData[j].totalAvgWeight;
	    }
	    
	    this.$.lblShipSumHeads.setContent("Cabezas<br />"
		    + utils.formatNumberThousands(iHeads.toFixed(2)));
	    this.$.lblShipSumWeight.setContent("Peso<br />"
		    + utils.formatNumberThousands(iWeight.toFixed(2)));
	    var avg = null;
	    if(avg=(iAve/this.arrData.length)){
		this.$.lblShipSumAveWeight.setContent("Peso Prom.<br />"
			+ utils.formatNumberThousands(avg.toFixed(2)));
	    }else{
		this.$.lblShipSumAveWeight.setContent("Peso Prom.<br />0.00");
	    }
	},
	ready:function(){
	    this.updateSummary();
	},
	selectShipRow:function(inSender, inEvent){
	    
	},
	selectShipment:function(inSender, inEvent){
	    this.objSelectedShipment=this.arrData[inEvent.rowIndex];
	    this.doSelectedShipment();
	},
	getSelectedShipment:function(){
	    
	    return crudShipment.getByID(this.objSelectedShipment.shipmentId);
	},
	moveToBottom:function(){
	    this.$.scroller.scrollTo(this.$.scroller
			.getBoundaries().bottom, 0);
	},
	onDeleteShip:function(inSender, inIndex){
	    this.doDeleteShipProgrammed(this.arrData[inIndex]);
	},
	ready : function() {
	    //this.updateView(); //Has been disabled because it must be updated when admin.sales already has done it.
	},
	updateView : function() {
	    crudShipment.get(this, "readCallBack");
	},
	readCounter : 0,
	readCallBack : function() {
	    this.readCounter++;
	    if (this.readCounter == 1) {
		this.readCounter = 0;
		this.loadAutocompletes();
	    }
	},
	loadAutocompletes : function() {
	    this.arrSelectedItems = {};
	    this.arrData = crudShipment.arrObj;		
	    this.$.listShipments.render();
	    this.updateSummary();
	}
});