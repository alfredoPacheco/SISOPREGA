enyo.kind({
	name: "catalogs.barnyards.list",
	events: {
		"onSelectBY":"",	
	},
	kind: enyo.VFlexBox,
	iSelected:"",
	components:[
		{kind: enyo.Pane, flex: 1, name: "mainPane",
		 components:[	
			{kind: enyo.Scroller, name:"barnyardList",flex: 1,
			className:"listBG",			
			 components: [
				{kind: enyo.VirtualRepeater, name: "productList", onSetupRow: "setupProductRow", 
				 onclick: "setSelected",								
				 components: [
					{kind: enyo.SwipeableItem, onConfirm: "deleteBarnyard", tapHighlight: true,
					 components: [
						{kind:enyo.VFlexBox,width:"90%",
						 components:[
							{name: "code",									 
							className:"listFirst", 							 
							 content: ""},
							{name: "info", 
								className:"listSecond",							 
							 content: "",},	
						 ]}
					 ]}
				 ]}
			]},
		]},
		{kind: "Toolbar",	
		components: [					 
			{kind: "ToolInput", name:"barnyard_code", width:"30%", hint:"Nombre",changeOnInput: true},													
			{kind: "Drawer", name:"draAdd", components: [ 										
				{kind: "enyo.IconButton",icon:"images/menu-icon-new.png",
				 onclick: "addBarnyard"},
			]},
			{kind: "Drawer", name:"draUpd", components: [		
				{layoutKind: "HFlexLayout", align: "center",components: [			
					{kind: "enyo.IconButton",
					icon:"images/btn_edit.png",
					 flex:1, onclick: "updateBarnyard"},				
					{kind: "enyo.IconButton",
					icon:"images/menu-icon-new.png",
					 flex:1, onclick: "doSelectBY"},												 			
					{kind: "Button", className: "enyo-button-negative", 
					 flex:1,caption: "X", onclick: "toggleCancel"},
				]}
			]}
		]},							 		
	],
	setupProductRow:function(inSender, inIndex) {	
		var objBY;
		var sText;	
//		var objCap;
		
		if (objBY=cacheBY.get()[inIndex]) {						
			this.$.code.setContent(objBY.barnyard_code);
			if(objBY.barnyard_capacity.length>0){
				sText="";
				for (var i=0;i<objBY.barnyard_capacity.length;i++){
					sText+=cacheCattle.getByID(objBY.barnyard_capacity[i].cattype_id).cattype_name
					       +"("+objBY.barnyard_capacity[i].head_count+"), ";
				}
				sText=sText.slice(0,-2);
				this.$.info.setContent(sText);
			}
			return true;
		}
	},
	deleteBarnyard: function(inSender, inIndex){
		return cacheBY.del(cacheBY.get()[inIndex],this,"afterDelete");
	},
	afterDelete:function(){
		this.resetValues();
		this.$.productList.render();		
	},
	getBY:function(){
	 	var objBY={barnyard_id:"",barnyard_code:"",
		           barnyard_capacity:[]};
		objBY.barnyard_code=this.$.barnyard_code.getValue();	
		return objBY;
	},
	 addBarnyard: function() {				
		cacheBY.create(this.getBY(),this,"updateList");
	},
	afterUpdate:function(){
		this.toggleAdd();
		this.updateList();
		this.resetValues();		
	},
	ready:function(){
		this.$.draAdd.setOpen(true);
		this.$.draUpd.setOpen(false);
		this.updateList();
	},
	updateList:function(){
		this.$.productList.render();			
	},
	setSelected:function(inSender, inEvent){
		if(cacheBY.get()[inEvent.rowIndex]){			
			this.$.draAdd.setOpen(false);
			this.$.draUpd.setOpen(true);
			this.iSelected=inEvent.rowIndex;
			this.$.barnyard_code.setValue(cacheBY.get()[this.iSelected].barnyard_code);
		}
	},
	getSelected:function(){
		return cacheBY.get()[this.iSelected];
		
	},	
	resetValues:function(){
		this.$.barnyard_code.setValue("");
	},
	toggleAdd:function(){
		this.$.draAdd.setOpen(true);
		this.$.draUpd.setOpen(false);
	},
	updateBarnyard:function(){
		cacheBY.upd(cacheBY.get()[this.iSelected],this.getBY(),this,"afterUpdate");
	},
	toggleCancel:function(){
		this.toggleAdd();
		this.resetValues();
	}
});

