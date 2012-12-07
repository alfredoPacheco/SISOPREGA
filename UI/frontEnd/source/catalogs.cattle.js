enyo.kind({
	name: "catalogs.cattle",
	 kind: enyo.SlidingView,
	layoutKind: enyo.VFlexLayout,
	iProduct:"",
	objCat:null,
	components:[	
		{kind: enyo.Scroller,flex: 1,
		 className:"listBG",
		 components: [
					{kind: enyo.VirtualRepeater, name: "cattleList", onSetupRow: "setupProductRow", 
					 onclick: "setProduct",								
						components: [
							{kind: enyo.SwipeableItem,
							 onConfirm: "deleteProduct", 							 
							 tapHighlight: true,
							 components: [
								{name: "desc", 
								 className:"listFirst"
								}]}]}		
			]
		},
		{kind: "Toolbar",	
		components: [					 
		{kind: "ToolInput", name:"cattype_name", align:"left",
		 width:"70%",  hint:"Ganado",changeOnInput: true},
		{kind: "Drawer", name:"draAdd", components: [ 										
			{kind: "enyo.IconButton",name:"btnAdd",icon: "images/menu-icon-new.png",
			 onclick: "addProduct"},
		]},
		{kind: "Drawer", name:"draUpdate", components: [		
			{layoutKind: "HFlexLayout", align: "center",components: [			
				{kind: "enyo.IconButton",name:"btnUpdate", 
				icon:"images/btn_edit.png",
				 flex:1, onclick: "updateProduct"},							
				{kind: "Button",name:"btnCancel", className: "enyo-button-negative", 
				 flex:1,caption: "X", onclick: "toggleAdd"},
			]}
		]},																		
		]},					 		
	],
	setupProductRow:function(inSender, inIndex) {		
		var obj;
		if (objCattle=cacheCattle.get()[inIndex]){						
			this.$.desc.setContent(objCattle.cattype_name);
			return true;
		}
	},
	deleteProduct: function(inSender, inIndex){
		if(cacheCattle.del(cacheCattle.get()[inIndex],this,"afterDelete")){
			return true;
		}else{
			return false;
		}
	},
	addProduct: function() {		
		cacheCattle.create(this.getCattle(),this,"afterCreate");		
	},
	afterDelete:function(){
		this.updateList();	
		this.resetValues();
		this.toggleAdd();		
	},
	afterCreate:function(){
		this.updateList();		
		this.resetValues();		
	},
	afterUpdate:function(){
		this.toggleAdd()
		this.updateList();		
	},
	getCattle:function(){
	 	var objCat={cattype_id:"",cattype_name: ""};
		objCat.cattype_name=this.$.cattype_name.getValue();		
		return objCat;
	},
	getProduct:function(inIndex){
		return _arrCattle[inIndex];
	},
	updateProduct:function(){
		cacheCattle.upd(this.objCat,this.getCattle(),this,"afterUpdate");
		return true;
	},
	ready:function(){
		this.$.draAdd.setOpen(true);
		this.$.draUpdate.setOpen(false);		
		this.updateList();
	},
	updateList:function(){
		this.$.cattleList.render();					
	},
	setProduct:function(inSender, inEvent){		
		this.iProduct=inEvent.rowIndex;
		this.objCat=cacheCattle.get()[inEvent.rowIndex];	
		this.$.cattype_name.setValue(this.objCat.cattype_name);
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
		this.$.cattype_name.setValue("");
	}
});

