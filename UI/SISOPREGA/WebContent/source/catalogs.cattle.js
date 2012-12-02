enyo.kind({
	name: "catalogs.cattle",
	 kind: enyo.SlidingView,
	layoutKind: enyo.VFlexLayout,
	iProduct:"",
	objCat:null,
	components:[	
		{kind: enyo.Scroller,flex: 1,
		 style: "background-image: url(images/practice_background.png); background-size: cover;",			
		 components: [
					{kind: enyo.VirtualRepeater, name: "cattleList", onSetupRow: "setupProductRow", 
					 onclick: "setProduct",								
						components: [
							{kind: enyo.SwipeableItem,
							 onConfirm: "deleteProduct", 							 
							 tapHighlight: true,
							 components: [
								{name: "desc", 
								 style: "text-overflow: ellipsis; "+
										 "overflow: hidden; white-space:"+
										 "nowrap;color:#FFF;",
										 content: ""},								
								{name: "cattleClass", 
									 style: "font-size: 0.85em;color:#999",content: ""}
										 ]}
							]}		
			]
		},
		{kind: "Toolbar",	
		components: [					 
		{kind: "ToolInput", name:"cattype_name", align:"left",
		 width:"70%",  hint:"Ganado",changeOnInput: true},
		{kind: "Drawer", name:"draAdd", components: [ 				
		    {layoutKind: "HFlexLayout", align: "center",components: [
			{kind: "enyo.IconButton",name:"btnAdd",icon: "images/menu-icon-new.png", flex:1,
			 onclick: "addProduct"},
			 {name: 'catclass_id', kind: "ListSelector", contentPack:"end", items: []}
		    ]}
		]},
		{kind: "Drawer", name:"draUpdate", components: [		
			{layoutKind: "HFlexLayout", align: "center",components: [			
				{kind: "enyo.IconButton",name:"btnUpdate", 
				icon:"images/btn_edit.png",
				 flex:1, onclick: "updateProduct"},							
				{kind: "Button",name:"btnCancel", className: "enyo-button-negative", 
				 flex:1,caption: "X", onclick: "toggleAdd"},
				 {name: 'catclass_id', kind: "ListSelector", contentPack:"end", items: []}
			]}
		]},																		
		]},					 		
	],
	setupProductRow:function(inSender, inIndex) {		
//		var obj;
		if (objCattle=cacheCattle.getCattleType()[inIndex]){						
			this.$.desc.setContent(objCattle.cattype_name);			
			this.$.cattleClass.setContent(objCattle.catclass_name);
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
		this.toggleAdd();
		this.updateList();		
	},
	getCattle:function(){
	 	var objCat={cattype_id:"",cattype_name: "", catclass_name:name=""};
		objCat.cattype_name=this.$.cattype_name.getValue();
		objCat.catclass_name=this.$.catclass_name.getValue();
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
		this.resetValues();
	},
	updateList:function(){
		this.$.cattleList.render();					
	},
	setProduct:function(inSender, inEvent){		
		this.iProduct=inEvent.rowIndex;
		this.objCat=cacheCattle.getCattleType()[inEvent.rowIndex];	
		this.$.cattype_name.setValue(this.objCat.cattype_name);
		this.$.catclass_id.setValue(this.objCat.catclass_name);
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
		this.$.catclass_id.setValue(0);
		this.$.catclass_id.setItems(cacheCattle.getLS());
		this.$.cattype_name.setValue("");
	}
});

