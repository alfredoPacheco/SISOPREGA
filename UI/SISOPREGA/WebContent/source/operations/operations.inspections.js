enyo.kind({
	name: "operations.inspections",
	kind: enyo.VFlexBox,
	iSelect:null,
	_objRec:null,
	objReception:null,
	components:[
	   {kind: "Popup",name: "comment", lazy:false,showHideMode: "transition", className:"formBG",
	    openClassName: "zoomFadeIn", className: "transitioner2", layoutKind: "VFlexLayout",width: "90%",
	    style: "overflow: hidden",scrim: true,
	    getComment:function(){
	    	return this.$.comments.getValue();
	    },
	    setComment:function(sComment){
	    	this.$.comments.setValue(sComment);
	    },	    
	    components:[
	 	    {components:[
	 	        {content:"Comentarios"},
	 	        {kind: "Input", name:"comments",hint:"Agregar comentario"},
	 	        {layoutKind: "HFlexLayout",components:[
	 	    	 	{kind: "Button",className: "enyo-button-affirmative",caption: "OK",flex:1,onclick:"addComment"},	 	        
	 	   	 	    {kind: "Button",className: "enyo-button-negative",caption: "Cancel",flex:1,onclick:"closeComments"}	 	                     
	 	        ]}]}
		]},	            
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
		{kind: "ToolInput", name:"rejected_count", width:"23%",  hint:"Rechazados",changeOnInput: true,},	
		{kind : "Button",name : "btnComm",className : "enyo-button-affirmative",caption : "Comentario",onclick : "openComments"},
		{kind : "Button",name : "btnSms",className : "enyo-button-affirmative",caption : "SMS",onclick : "sendSMS"},		
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
		if(enyo.$.sisoprega_receptionsMap){
    		_objPopupHeader = enyo.$.sisoprega_receptionsMap.$.lblInfo;	
    	}else if(enyo.$.sisoprega_mainMenu_receptionsMap){
    		_objPopupHeader = enyo.$.sisoprega_mainMenu_receptionsMap.$.lblInfo;
    	}   
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
	getReject:function(){
		var objData=null;
		if (this.$.rejected_count.getValue()!=""){
			objData={rejected_id:null,rejected_count:"",reject_id:"",reject_desc:""};
			objData.rejected_count=this.$.rejected_count.getValue();
			objData.reject_id=this.$.reject_id.getValue();
			objData.reject_desc=crudInspectionCode.getByID(this.$.reject_id.getValue()).reject_desc;		
		}
		return objData; 
	},
	
	updatetList:function(){		
		this.$.productList.render();
		this.updateHeader();		
	},
	set:function(objRec){
	    this.objReception = enyo.clone(objRec);
	    this._objRec = this.adapterIn(this.objReception);
	    this.resetValues();
	},
	adapterIn : function(objRec) {
		var obj_Reception = {
		    inspections : []
		};

		if (objRec.Inpection) {
		    for ( var i = 0; i < objRec.Inspection.length; i++) {

			var inspectionAux = {
			    rejected_count : undefined,
			    reject_id : undefined,
			    feed_desc : undefined,
			    id : undefined,
			    weight : undefined,
			    weight_uom : undefined
			};

			inspectionAux.inspectionDate = objRec.Inspection[i].inspectionDate;
			inspectionAux.comments = objRec.Inspection[i].comments;
			inspectionAux.rejected_id = objRec.Inspection[i].inspectionId;

			objAux.weight_rejected = objRec.Inspection[i].weight; // append field weight_rejected
			objAux.weight_rejected_uom = objRec.Inspection[i].weightUom; // append  weight_rejected_uom field

			// inspectionsDetails::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
			if (objRec.Inspection[i].InspectionDetails) {
			    var arrInspectionDetailsAux = objRec.Inspection[i].InspectionDetails;

			    for ( var id = 0; id < arrInspectionDetailsAux.length; id++) {
				inspectionAux.rejected_count = arrInspectionDetailsAux[id].hc;
				inspectionAux.reject_id = arrInspectionDetailsAux[id].inspectionCodeId;
				inspectionAux.reject_desc = arrInspectionDetailsAux[id].note;
				inspectionAux.id = arrInspectionDetailsAux[id].inspectionDetailsId;
				inspectionAux.weight = arrInspectionDetailsAux[id].weight;
				inspectionAux.weight_uom = arrInspectionDetailsAux[id].weightUom;
				obj_Reception.inspections.push(enyo.clone(inspectionAux));
			    }
			}
		    }
		}
		return obj_Reception;

	    },
	    adapterOut : function(objNew, bUpdating) {
		var objInspection = {
			InspectionDetails : [],
			Pen : [],
			entityName : "Inspection",
			inspectionDate : objNew.inspectionDate,
			weight : objNew.weight,
			weightUom : objNew.weightUom,
			comments : objNew.comments
		    };
		
		if (bUpdating)
			objInspection.inspectionId = this.objReception.Inspection[this.iSelect].reject_id;
		
		for (inspection in objNew.inspections) {
		    var inspectionDetail = {
				entityName : "InspectionDetails",
				inspectionCodeId : objNew.inspections[inspection].reject_id,
				quantity : objNew.feed[inspection].feed_units
			    };
		    
		    if (objNew.inspections[inspection].inspectionDetailsId && bUpdating)
			feedDetail.feedOrderDetailsId = objNew.feed[inspection].inspectionDetailsId;
		    
		    objInspection.FeedOrderDetails.push(inspectionDetail);
		}

		return objInspection;
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
		this.$.reject_id.setItems(crudInspectionCode.getList());	
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
			for (var i = 0;i<this._objRec.inspections.length;i++){
				if (this._objRec.inspections[i]){					
					totalRejected = totalRejected + parseInt(this._objRec.inspections[i].rejected_count);					
				}	
			}
		}
		
		totalAccepted = totalHeads - totalRejected;
		_objPopupHeader.setContent("Total HC: [" + totalHeads + "]   Total Aceptados: [" + totalAccepted + "]   Total Rechazados: [" + totalRejected + "]");
	},
	closeComments:function(){			
		this.$.comment.close();				
	},
	openComments:function(){	
		if(this._objRec.inspections.length>0){
			if(this._objRec.inspections[this._objRec.inspections.length-1].comments){
				this.$.comments.setValue(this._objRec.inspections[this._objRec.inspections.length-1].comments);
			}
			this.$.comment.openAtCenter();	
		}else{
			cacheMan.setMessage("", "Para agregar comentarios es necesario agregar almenos un rechazo");
		}
				
	},	
	addComment:function(){			
		if(!cacheReceptions.addInspectionComment(this._objRec.reception_id,
					this._objRec.inspections[this._objRec.inspections.length-1].rejected_id,
					this._objRec.inspections[this._objRec.inspections.length-1].inspectionDate,this.$.comments.getValue())){					
			cacheMan.setMessage("", "Error al enviar commentario de inspeccion");
		}else{
			this._objRec.inspections[this._objRec.inspections.length-1].comments=this.$.comments.getValue();
			this.closeComments();
		}			
	},
	sendSMS:function(){
		cacheReceptions.sendInspectionReport(this._objRec.rancher_id);
	},
	addReject: function() {		
	    var objNew = this.getReject();
	    
	    if(this.objReception.Inspection === undefined) this.objReception.Inspection = [];
		
	    this.objReception.Inspection.push(this.adapterOut(objNew));
	    
	    crudReception.update(this.objReception,this,"afterAdd");
		
	},
	afterAdd:function(objResult, objOld, objNew){
		this.set(objNew);
	},
	deleteReject: function(inSender, inIndex) {
	    this.objReception.Inspection.splice(inIndex,1);
	    crudReception.update(this.objReception,this, "afterUpdate");
	},
	updateReject:function(){
	    var objNew = this.getReject();
	    var objInspection = this.adapterOut(objNew, true);
	    this.objReception.Inspection[this.iSelect] = objInspection;
	    crudReception.update(this.objReception, this, "afterUpdate");
	},
	afterUpdate:function(objResult, objOld, objNew){
	    this.set(objNew);
	    this.toggleAdd();
	},
});