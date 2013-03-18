enyo.kind({
	name: "receptions.weights",
	kind: enyo.VFlexBox,
	iSelected:null,
	objReception:null,
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
								components: [
								    {
								    	flex:1,
								    	name:'date',
								    	style: "text-overflow: ellipsis; "+
								 		 "overflow: hidden; white-space:"+
										 "nowrap;color:#FFF;",
								    },
								    {
								    	flex:1,
								    	name:'rancher',
								    	style: "text-overflow: ellipsis; "+
								 		 "overflow: hidden; white-space:"+
										 "nowrap;color:#FFF;",
								    },								    
									{
								    	flex:1,
								    	name: "hc",
								    	style: "text-overflow: ellipsis; "+
								 		 "overflow: hidden; white-space:"+
										 "nowrap;color:#FFF;"									  
									},
									{
										flex:1,
										name: "weight", 
										kind:enyo.input
									},
									{
										flex:1,
										name:'btnSave',
										kind:enyo.Button,
										caption:"Guardar"
										
									}]
							}]}]
		}
	],
	setupRow:function(inSender, inIndex) {	
		if(inIndex < 10){
			this.$.date.setContent("test");
			this.$.rancher.setContent("test");
			this.$.hc.setContent("test");
			this.$.weight.setContent("test");
			return true;
		}
		
		var obj;
		if(this.objReception){
			if (obj=this.objReception.weights[inIndex]){
				this.$.hc.setContent(obj.hc+ " / "+
											obj.weight + " KG");
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