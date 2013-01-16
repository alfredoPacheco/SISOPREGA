enyo.kind({
	name: "receptions.inspections",
	kind: enyo.VFlexBox,
	iSelect:null,
	_objRec:null,		
	components:[
		{kind: enyo.Scroller, name:"scrollProductList",flex: 1,
		 className:"listBG",			
 		 components: [
					{kind: enyo.VirtualRepeater, name: "productList", onSetupRow: "setupRow", 
					 onclick: "setReject",								
						components: [
							{kind: enyo.SwipeableItem,
							    onConfirm: "deleteReject", 							 
								tapHighlight: true,
								components: [
									{kind:enyo.VFlexBox,width:"90%",components:[
										{name: "info",									 
										 style: "text-overflow: ellipsis; "+
												 "overflow: hidden; white-space:"+
												 "nowrap;color:#FFF;", 
										 content: ""									 
										}
									]}
								]
							}
						]}		
			]
		},
		{kind: "Toolbar",	
		components: [					 
		{kind: "ToolInput", name:"accepted_count", width:"23%",  hint:"Aceptados",changeOnInput: true,},					
		{kind: "ToolInput", name:"rejected_count", width:"23%",  hint:"Rechazados",changeOnInput: true,},			
		{kind: "ListSelector", name: 'reject_id', width:"50%",
		 style:"width:100%;color:white", contentPack:"end",
			items: [] ,flex: 1,contentPack:"end"},							
		{kind: "Drawer", name:"draAdd", components: [ 										
			{kind: "enyo.IconButton",name:"btnAdd",icon:"images/menu-icon-new.png",
			 onclick: "addReject"},
		]},
		{kind: "Drawer", name:"draUpdate", components: [		
			{layoutKind: "HFlexLayout", align: "center",components: [			
				{kind: "enyo.IconButton",name:"btnUpdate", 
				icon:"images/btn_edit.png",
				 flex:1, onclick: "updateReject"},							
				{kind: "Button",name:"btnCancel", className: "enyo-button-negative", 
				 flex:1,caption: "X", onclick: "toggleAdd"},
			]}
		]}
		]},					 		
	],
	ready:function(){
		_objPopupHeader = enyo.$.sisoprega_mainMenu_receptionsMap_map_lblInfo;
	},
	setupRow:function(inSender, inIndex){		
		var objInspection;
		if (this._objRec){
			if (objInspection=this._objRec.inspections[inIndex]){
				this.$.info.setContent(objInspection.reject_desc+
											 " ( "+objInspection.rejected_count+" )");
				this._totalRejected = this._totalRejected + parseInt(objInspection.rejected_count);
				return true;
			}
		}
	},
	deleteReject: function(inSender, inIndex) {		
		cacheReceptions.deleteReject(this._objRec.inspections,this._objRec.inspections[inIndex],this,"updatetList");
	},
	afterDelete:function(){
		this.resetValues();
		this.$.productList.render();
	},
	addReject: function() {		
		cacheReceptions.addReject(this.$.accepted_count.getValue(),
		                          this._objRec,this.getReject(),this,"resetValues");
	},
	getReject:function(){
		var objData=null;
		if (this.$.rejected_count.getValue()!=""){
			objData={rejected_id:null,rejected_count:"",reject_id:"",reject_desc:""};
			objData.rejected_count=this.$.rejected_count.getValue();
			objData.reject_id=this.$.reject_id.getValue();
			objData.reject_desc=cacheRejects.getByID(this.$.reject_id.getValue()).reject_desc;		
		}
		return objData; 
	},
	updateReject:function(){
		cacheReceptions.updateReject(this.$.accepted_count.getValue(),
		                     this._objRec,this.iSelect,this.getReject(),
							 this,"afterUpdate");
	},
	afterUpdate:function(){
		this.toggleAdd();
		this.updatetList();		
	},
	updatetList:function(){		
		this.$.productList.render();
		this.updateHeader();		
	},
	set:function(objVar){
		this.$.accepted_count.setValue(objVar.accepted_count);
		this._objRec=objVar;
	},
	setReject:function(inSender, inEvent){
		var ObjCap;
		if(ObjCap=this._objRec.inspections[inEvent.rowIndex]){
			this.iSelect=inEvent.rowIndex;
			this.$.rejected_count.setValue(ObjCap.rejected_count);
			this.$.reject_id.setValue(ObjCap.reject_id);
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
		this.$.rejected_count.setValue(this._objRec.accepted_count);
		this.$.reject_id.setItems(cacheRejects.getLS());	
		this.$.reject_id.setValue(0);
		this.$.rejected_count.setValue("");		
		this.updatetList();
	},
	updateHeader:function(){
		
		var totalRejected = 0;
		var totalHeads = 0;		
		var totalAccepted = 0;
		
		if (this._objRec){
			totalHeads = parseInt(this._objRec.hc_aprox);
			for (i in this._objRec.inspections){
				if (this._objRec.inspections[i]){					
					totalRejected = totalRejected + parseInt(this._objRec.inspections[i].rejected_count);					
				}	
			}
		}
		
		totalAccepted = totalHeads - totalRejected;
		_objPopupHeader.setContent("Total HC: [" + totalHeads + "]   Total Aceptados: [" + totalAccepted + "]   Total Rechazados: [" + totalRejected + "]");
	}
});