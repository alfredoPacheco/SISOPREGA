enyo.kind({
	name: "receptions.weights",
	kind: enyo.SlidingView,
	layoutKind: enyo.VFlexLayout,
	iSelected:null,
	objReception:null,
	components:[				
		{kind: enyo.Scroller,flex: 1,
    	 style: "background-image: url(images/practice_background.png); background-size: cover;",			
 		 components: [
					{kind: enyo.VirtualRepeater, name: "weightsList", onSetupRow: "setupRow", 
					 onclick: "selectWeight",								
						components: [
							{kind: enyo.SwipeableItem,
							    onConfirm: "deleteWeight", 							 
								tapHighlight: true,
								components: [
									{name: "hc_weight", 
									 style: "text-overflow: ellipsis; "+
									 		 "overflow: hidden; white-space:"+
											 "nowrap;color:#FFF;", 
									},
									{name: "weight", 
									 style: "text-overflow: ellipsis; "+
									 		 "overflow: hidden; white-space:"+
											 "nowrap;color:#FFF;", 
									}]}]}]
		},
		{kind: "Toolbar",	
		components: [					 
		{kind: "ToolInput", name:"hc", width:"23%",  hint:"Cabezas",changeOnInput: true},
		{kind: "ToolInput", name:"weight", width:"35%",  hint:"KG",changeOnInput: true},
		{kind: "Drawer", name:"draAdd", components: [ 										
			{kind: "enyo.IconButton",name:"btnAdd",icon: "images/menu-icon-new.png",
			 onclick: "addWeight"},
		]},
		{kind: "Drawer", name:"draUpdate", components: [		
			{layoutKind: "HFlexLayout", align: "center",components: [			
				{kind: "enyo.IconButton",name:"btnUpdate", 
				icon:"images/btn_edit.png",
				 flex:1, onclick: "updateWeight"},							
				{kind: "Button",name:"btnCancel", className: "enyo-button-negative", 
				 flex:1,caption: "X", onclick: "toggleAdd"},
			]}
		]},																		
		]},					 		
	],
	setupRow:function(inSender, inIndex) {	
		var obj;
		if(this.objReception){
			if (obj=this.objReception.weights[inIndex]){
				this.$.hc_weight.setContent(obj.hc+ " / "+
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
		this.toggleAdd()
		this.updateList();		
	},
	ready:function(){
		this.$.draAdd.setOpen(true);
		this.$.draUpdate.setOpen(false);		
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