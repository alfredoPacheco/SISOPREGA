enyo.kind({
	name: "receptions.weights",
	kind: enyo.VFlexBox,
	arrReceptions:null,
	components:[	
	    {kind: "Header", content: "Page Header",
	    	className : "listFirst",
			style : "font-size:13px;background-color:#DABD8B;",
			layoutKind:enyo.HFlexLayout,
			align:"center",
			pack:"start",
			components:[
			            {
								    	content:'Fecha',
//								    	className : "listSecond",
								    	style:"width:80px;padding-right:20px;"
								    },
								    {
								    	content:'Ganadero',
//								    	className : "listSecond",
								    	style:"width:170px;padding-right:20px;"
								    },								    
									{
								    	content: "HC",
//								    	className : "listSecond",
								    	style:"width:70px;padding-right:20px;"
									},
									{
										content: "Peso", 
										width:"70px;"											
									},
									{
										style:"width:79px;margin-left:20px;"										
									}
			            ]
	    },
		{kind: enyo.Scroller,flex: 1,
    	 className:"listBG",			
 		 components: [
					{kind: enyo.VirtualRepeater, name: "weightsList", onSetupRow: "setupRow",						
						components: [
							{kind: enyo.Item,
							    layoutKind:enyo.HFlexLayout,
								align:"center",
								pack:"start",
								height:"65px",
								components: [								             
								    {
								    	name:'date',
								    	className : "listSecond",
								    	style:"width:80px;padding-right:20px;"
								    },
								    {
								    	name:'rancher',
								    	className : "listSecond",
								    	style:"width:170px;padding-right:20px;"
								    },								    
									{
								    	name: "hc",
								    	label:"HC",
								    	className : "listSecond",
								    	style:"width:70px;padding-right:20px;"
									},
									{
										name: "weight", 
										kind:"ToolInput",
										width:"70px;",
										hint:"Peso",
										oninput:"weight_changed"
									},
									{
										name:'btnSave',
										kind:enyo.Button,
										caption:"Guardar",
										onclick:"updateWeight",
										style:"width:55px;margin-left:20px;height:20px;"
										
									}]
							}]}]
		}
	],
	setupRow:function(inSender, inIndex) {	
		var obj;
		if(this.arrReceptions[inIndex]){
			if (obj=this.arrReceptions[inIndex]){
				if(obj.inspections.length > 0){
					this.$.date.setContent(obj.arrival_date);
					this.$.rancher.setContent(obj.rancher_name);	
					var sum_HCR = 0;
					for(var i=0; i<obj.inspections.length;i++){
						sum_HCR += parseInt(obj.inspections[i].rejected_count);
					}
					this.$.hc.setContent(sum_HCR);
					if(obj.weight_rejected && parseFloat(obj.weight_rejected)>0){
						this.$.weight.setValue(obj.weight_rejected);
						this.$.weight.$.input.applyStyle("color","#1E1C1B");
					}
					
					return true;
				}				
			}
		}
	},
//	setReception:function(objReception){
//		this.objReception=objReception;
//	}, 
//	deleteWeight:function(inSender, inIndex){
//		cacheReceptions.deleteWeight(this.objReception,
//		                             this.objReception.weights[inIndex],
//		                             this,"afterDelete");
//	},
//	afterDelete:function(){
//		this.resetValues();
//		this.$.weightsList.render();		
//	},
	
//	addWeight:function() {		
//		cacheReceptions.addWeight(this.objReception,this.getWeight(),this,"afterAdd");
//	},
//	afterAdd:function(){
//		this.updateList();
//		this.resetValues();
//	},
	
	afterUpdate:function(){
		this.updateList();		
	},
	ready:function(){
		this.$.weight.$.input.applyStyle("text-align","right");
		this.$.btnSave.hide();
		this.updateList();
	},
	updateList:function(){
		this.arrReceptions = cacheReceptions.get();
		
		for (var i=this.arrReceptions.length-1; i > 0;i--){
			if (this.arrReceptions[i].inspections.length ==0){
				this.arrReceptions.splice(i,1);
			}
		}
		this.arrReceptions.sort(function(a,b){
								return parseInt(a.reception_id)-parseInt(b.reception_id);
								});
		this.$.weightsList.render();
	},
	updateWeight:function(inSender, inEvent){
		var objReception = cacheReceptions.getByID(this.arrReceptions[inEvent.rowIndex].reception_id);
		cacheReceptions.updateRejectsWeight(objReception,this.$.weight.getValue(),
		                             this,"afterUpdate");
	},
	weight_changed:function(inSender, inEvent){
		if(parseFloat(this.arrReceptions[inEvent.rowIndex].weight_rejected) == parseFloat(this.$.weight.getValue())){
			this.$.btnSave.hide();
		}else{
			this.$.btnSave.show();
		}
		
	},
//	toggleUpdate:function(){
//		this.$.draAdd.setOpen(false);
//		this.$.draUpdate.setOpen(true);				
//	},	
//	toggleAdd:function(){
//		this.$.draAdd.setOpen(true);
//		this.$.draUpdate.setOpen(false);				
//		this.resetValues();	
//	},	
//	resetValues:function(){
//		this.$.hc.setValue("");
//		this.$.weight.setValue("");
//	},
});