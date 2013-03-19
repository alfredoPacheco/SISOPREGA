enyo.kind({
	name: "receptions.weights",
	kind: enyo.VFlexBox,
	iSelected:null,
	arrReceptions:null,
	components:[				
		{kind: enyo.Scroller,flex: 1,
    	 className:"listBG",			
 		 components: [
					{kind: enyo.VirtualRepeater, name: "weightsList", onSetupRow: "setupRow", 
					 onclick: "selectWeight",
						components: [
							{kind: enyo.SwipeableItem,
							    onConfirm: "deleteWeight", 							 
								tapHighlight: true,
								layoutKind:enyo.HFlexLayout,
								align:"center",
								pack:"center",
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
								    	className : "listSecond",
								    	style:"width:70px;padding-right:20px;"
									},
									{
										name: "weight", 
										kind:"ToolInput",
										width:"70px;",
										hint:"Peso"	
									},
									{
										name:'btnSave',
										kind:enyo.Button,
										caption:"Guardar",
										style:"width:55px;margin-left:20px;"
										
									}]
							}]}]
		}
	],
	setupRow:function(inSender, inIndex) {	
//		if(inIndex < 10){
//			this.$.date.setContent("fecha");
//			this.$.rancher.setContent("ganadero");
//			this.$.hc.setContent("hc -r");
//			this.$.weight.setContent("peso");
//			return true;
//		}
		
		var obj;
		if(this.arrReceptions[inIndex]){
			if (obj=this.arrReceptions[inIndex]){
				this.$.date.setContent(obj.arrival_date);
				this.$.rancher.setContent(obj.rancher_name);
				var sum_HCR = 0;
				for(var i=0; i<obj.inspections.length;i++){
					sum_HCR += parseInt(obj.inspections[i].rejected_count);
				}
				this.$.hc.setContent(sum_HCR);
				
				return true;
			}
		}
	},
	setReception:function(objReception){
		this.objReception=objReception;
	}, 
	deleteWeight:function(inSender, inIndex){
		cacheReceptions.deleteWeight(this.objReception,
		                             this.objReception.weights[inIndex],
		                             this,"afterDelete");
	},
	afterDelete:function(){
		this.resetValues();
		this.$.weightsList.render();		
	},
	getWeight:function(){
	 	var hcw={hcw_id:null,hc:"",weight:""};
		hcw.hc=this.$.hc.getValue();
		hcw.weight=this.$.weight.getValue();
		return hcw;
	},
	addWeight:function() {		
		cacheReceptions.addWeight(this.objReception,this.getWeight(),this,"afterAdd");
	},
	afterAdd:function(){
		this.updateList();
		this.resetValues();
	},
	updateWeight:function(){
		cacheReceptions.updateWeight(this.objReception,this.objReception.weights[this.iSelected],
		                             this.getWeight(),this,"afterUpdate");
	},
	afterUpdate:function(){
		this.toggleAdd();
		this.updateList();		
	},
	ready:function(){
		this.arrReceptions = cacheReceptions.get();
		this.updateList();
	},
	updateList:function(){
		this.$.weightsList.render();
	},
	selectWeight:function(inSender, inEvent){		
		this.iSelected=inEvent.rowIndex;
		var hcw=this.objReception.weights[this.iSelected];
		this.$.hc.setValue(hcw.hc);
		this.$.weight.setValue(hcw.weight);
		this.toggleUpdate();
		return true;
	},	
	toggleUpdate:function(){
		this.$.draAdd.setOpen(false);
		this.$.draUpdate.setOpen(true);				
	},	
	toggleAdd:function(){
		this.$.draAdd.setOpen(true);
		this.$.draUpdate.setOpen(false);				
		this.resetValues();	
	},	
	resetValues:function(){
		this.$.hc.setValue("");
		this.$.weight.setValue("");
	},
});