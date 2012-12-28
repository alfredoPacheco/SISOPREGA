enyo.kind({
	name: "catalogs.barnyards.capacity",
	kind: enyo.VFlexBox,
	iSelect:null,
	_arrBY:null,	
	components:[
		{kind: enyo.Scroller, name:"scrollProductList",flex: 1,
    	style: "background-image: url(images/practice_background.png); background-size: cover;",			
 		 components: [
				{kind: "RowGroup", name: "listProducts", defaultKind: "HFlexBox", caption: "", 
				 components: [
					{kind: enyo.VirtualRepeater, name: "productList", onSetupRow: "setupRow", 
					 onclick: "setCapacity",								
						components: [
							{kind: enyo.SwipeableItem,
							    onConfirm: "deleteCapacity", 							 
								tapHighlight: true,
								components: [
									{kind:enyo.VFlexBox,width:"90%",components:[
										{name: "bycapacity",									 
										 style: "text-overflow: ellipsis; "+
												 "overflow: hidden; white-space:"+
												 "nowrap;color:#FFF;", 
										 content: ""									 
										}
									]}
								]
							}
						]
					}
				 ]},			
			]
		},
		{kind: "Toolbar",	
		components: [					 
		{kind: "ToolInput", name:"head_count", width:"23%",  hint:"Cabezas",changeOnInput: true,},			
		{kind: "ListSelector", name: 'cattype_id', label:"Ganado",hideItem:true,width:"50%",
		 style:"width:100%", contentPack:"end",
			items: [] ,flex: 1,contentPack:"end"},							
		{kind: "Drawer", name:"draAdd", components: [ 										
			{kind: "enyo.IconButton",name:"btnAdd",icon:"images/menu-icon-new.png",
			 onclick: "addCapacity"},
		]},
		{kind: "Drawer", name:"draUpdate", components: [		
			{layoutKind: "HFlexLayout", align: "center",components: [			
				{kind: "enyo.IconButton",name:"btnUpdate", 
				icon:"images/btn_edit.png",
				 flex:1, onclick: "updateCapacity"},							
				{kind: "Button",name:"btnCancel", className: "enyo-button-negative", 
				 flex:1,caption: "X", onclick: "toggleAdd"},
			]}
		]}
		]},					 		
	],
	setupRow:function(inSender, inIndex){	
		var objCap;
		if (this._arrBY){
			if (objCap=this._arrBY.barnyard_capacity[inIndex]){
				this.$.bycapacity.setContent(cacheCattle.getByID(objCap.cattype_id).cattype_name+
											 " ("+objCap.head_count+")");
				return true;
			}
		}
	},
	deleteCapacity: function(inIndex) {		
		cacheBY.deleteCapcity(this._arrBY,this._arrBY.barnyard_capacity[inIndex],this,"updatetList");
	},
	afterDelete:function(){
		this.resetValues();
		this.$.productList.render();
	},
	 addCapacity: function() {		
		cacheBY.addCapacity(this._arrBY,this.getCapacity(),this,"resetValues");
	},
	getCapacity:function(){
		var objCap={cattype_id:"",cattype_name:"",head_count:""};
		objCap.head_count=this.$.head_count.getValue();
		objCap.cattype_id=this.$.cattype_id.getValue();
		objCap.cattype_name=cacheCattle.getByID(this.$.cattype_id.getValue()).cattype_name;		
		return objCap; 
	},
	updateCapacity:function(){
		cacheBY.updateCapacity(this._arrBY.barnyard_capacity[this.iSelect],
		                           this.getCapacity(),this,"afterUpdate");
	},
	afterUpdate:function(){
		this.toggleAdd();
		this.updatetList();		
	},
	updatetList:function(){
		this.$.productList.render();					
	},
	set:function(objVar){
		this._arrBY=objVar;
	},
	setCapacity:function(inSender, inEvent){
		var ObjCap;
		if(ObjCap=this._arrBY.barnyard_capacity[inEvent.rowIndex]){
			this.iSelect=inEvent.rowIndex;
			this.$.head_count.setValue(ObjCap.head_count);
			this.$.cattype_id.setValue(ObjCap.cattype_id);
			this.toggleUpdate();		
		}
		
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
		this.$.head_count.setValue("");
		this.$.cattype_id.setItems(cacheCattle.getLS());
		this.$.cattype_id.setValue(0);
		this.updatetList();
	}
});

