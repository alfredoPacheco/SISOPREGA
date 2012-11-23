enyo.kind({
	name: "receptions.barnyards",
	kind: enyo.SlidingView,
	events: {
		"onCreation":"",		
		"onSelectProduct": "",
		"onDeleteProduct": "",		
	},
	objList:[],
	arrBY:{},
	objReception:null,
	components:[
		{kind: "ModalDialog", caption: "Corrales Asignados", 
			components: [
				{name: "dialogMessage", style: "text-align: center;"},
				{kind: "Button", className: "enyo-button-affirmative",
				 caption: "Affirmative Button",caption: "Close", popupHandler: true}]},	
		{kind: enyo.Scroller,flex: 1,
    	 style: "background-image: url(images/practice_background.png); background-size: cover;",	
 		 components: [
					{kind: enyo.VirtualRepeater, 
						name: "barnyardList", onSetupRow: "setupRow", onclick:"checkBY",								
						components: [
							{kind: "Divider"},						
							{kind: enyo.SwipeableItem,
							    onConfirm: "doDeleteProduct", 							 
								tapHighlight: true,
								components: [																							
									{kind:enyo.HFlexBox,components:[
											{kind:enyo.VFlexBox,width:"90%",
											 components:[
												{name: "name",									 
												 style: "text-overflow: ellipsis; "+
														 "overflow: hidden; white-space:"+
														 "nowrap;color:#FFF;", 
												 content: ""},
												{name: "info", 
												 style: "font-size: 0.85em;color:#999",
												 content: ""},
												]},
												{kind: "CheckBox",name:"chkAv"}													
												]}]}]}]},
		{kind: "Toolbar", 
		  components: [
				{kind: "enyo.IconButton", caption:"",width:"100%",
				icon: "images/command-menu/app_icon_grid.png",	 onclick: "addBarnyards"}]},				
	],
	getGroupName: function(inIndex) {
		// get previous record
		var r0 = this.objList[inIndex -1];
		// get (and memoized) first letter of last name
		if (r0 && !r0.letter) {
			r0.letter = r0.barnyard_code.substr(0,1).toUpperCase();
		}
		var a = r0 && r0.letter;
		// get record
		var r1 = this.objList[inIndex];
		if (!r1.letter) {
			r1.letter = r1.barnyard_code.substr(0,1).toUpperCase();
		}
		var b = r1.letter;
		// new group if first letter of last name has changed
		return a != b ? b : null;
	},
	setupDivider: function(inIndex) {
		// use group divider at group transition, otherwise use item border for divider
		var group = this.getGroupName(inIndex);
		this.$.divider.setCaption(group);
		this.$.divider.canGenerate = Boolean(group);
		//this.$.item.applyStyle("border-top", Boolean(group) ? "none" : "1px solid silver;");
	},	
	setupRow:function(inSender, inIndex) {		
		var objBY;
		var sText="";
		if (objBY=this.objList[inIndex]) {
			this.setupDivider(inIndex);			
			this.$.name.setContent(objBY.barnyard_code);
			if(objBY.barnyard_capacity.length>0){
				for (var i=0;i<objBY.barnyard_capacity.length;i++){
					sText+=cacheCattle.getByID(objBY.barnyard_capacity[i].cattype_id).cattype_name
					       +"("+objBY.barnyard_capacity[i].head_count+"), ";
				}
				sText=sText.slice(0,-2);
				this.$.info.setContent(sText);	
			}	
			if(objBY.occupied){
				this.$.chkAv.setChecked(true);
			}	
			return true;
		}
	},
	updateList:function(){	
		this.objList=[];
		this.objList=this.objList.concat(this.objReception.barnyards).concat(cacheBY.getAvailable());
		this.objList=enyo.clone(this.objList);
		this.objList.sort(function(inA, inB) {
					return [inA.barnyard_code.toLowerCase()] < 
						   [inB.barnyard_code.toLowerCase()] ? -1 : 1;
				});			
		this.$.barnyardList.render();					
	},
	addBarnyards:function(){
		cacheBY.setOccupied(this.objReception,this.arrBY,this,"afterAdd");
	},
	afterAdd:function(){
		this.arrBY={};
		this.updateList();		
		this.$.modalDialog.openAtCenter()		
	},
	setReception:function(objReception){
		this.objReception=objReception;
	},
	checkBY:function(inSender, inEvent){
		var objBY=this.objList[inEvent.rowIndex];
		if(this.arrBY[objBY.barnyard_id]){	
			delete this.arrBY[objBY.barnyard_id];			
			this.objList[inEvent.rowIndex]['occupied']=false;			
		}else{
			this.objList[inEvent.rowIndex]['occupied']=true;
			this.arrBY[objBY.barnyard_id]=objBY.barnyard_id;
		}
		this.$.barnyardList.renderRow(inEvent.rowIndex);
	}
});