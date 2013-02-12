enyo.kind({
	name: "inspections.list",
	kind: enyo.VFlexBox,
	events: {
		"onCreation":"",		
		"onSelectReception": "",
	},
	iSelected:null,
	objList:[],
	arrRec:{},	
	components:[
		{kind: enyo.Scroller,flex: 1,
//    	style: "background-image: url(images/practice_background.png); background-size: cover;",	
 		 components: [
		{kind: "ModalDialog", caption: "Receptiones Liberadas", 
			components: [
				{name: "dialogMessage", style: "text-align: center;"},
				{kind: "Button", className: "enyo-button-affirmative",
				 caption: "Affirmative Button",caption: "Close", popupHandler: true}]},			 
			{kind: enyo.VirtualRepeater, toggleSelected:true,
				name: "inspectionsList", onSetupRow: "setupRow", onclick:"selectReception",								
				components: [
					{kind: "Divider"},						
					{kind: enyo.SwipeableItem,
						onConfirm: "deleteReception", 							 
						tapHighlight: true,
						components: [
							{kind:enyo.HFlexBox,
							 components:[
								{kind:enyo.VFlexBox,width:"90%",
								 components:[
									{name: "name",									 
									 style: "text-overflow: ellipsis; "+
									 "overflow: hidden; white-space:"+
									 "nowrap;color:#FFF;", 
									 content: ""},
									{name: "cattle", 
									 style: "font-size: 0.85em;color:#999",
									 content: ""},
									{name: "weight", 
									 style: "font-size: 0.85em;color:#999",
									 content: ""},
									{name: "barnyards", 
									 style: "font-size: 0.85em;color:#999",
									 content: ""},									 														
									 ]},
									 {kind: "CheckBox",name:"chkAv"}		
									 ]}]}]}]},
		{kind: "Toolbar", 
		  components: [
				{kind: "enyo.IconButton", caption:"",width:"100%",
				icon: "images/command-menu/app_icon_grid.png",	 onclick: "releaseReceptions"}]},				
	],
	getGroupName: function(inIndex) {
		// get previous record
		var r0 = this.objList[inIndex -1];
		// get (and memoized) first letter of last name
		if (r0) {r0.letter = r0.arrival_date;}
		var a = r0 && r0.letter;
		// get record
		var r1 = this.objList[inIndex];
		r1.letter = r1.arrival_date;
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
		if(this.objList.length>0){
			if (this.objList[inIndex]) {
				this.setupDivider(inIndex);										
				var obj=this.objList[inIndex];
				this.$.name.setContent(obj.rancher_name);
				//TODO hc_aprox
				this.$.cattle.setContent(obj.cattype_name + " (" + obj.hc_aprox + ")   " + obj.location_name );			
				this.$.barnyards.setContent(this.getBarnyards(obj.barnyards));
				this.$.weight.setContent(this.calcNetWeight(obj.weights));
				if(obj.selected){
					this.$.chkAv.setChecked(true);
				}else{
					this.$.chkAv.setChecked(false);
				}
				return true;
			}
		}
	},
	deleteReception: function(inSender, inIndex){
		cacheReceptions.del(this.objList[inIndex],this,"updateList");
	},
	updateList:function(){
		this.objList=cacheReceptions.get();
		this.objList=eval(enyo.json.stringify(this.objList));
		this.objList.sort(function(inA, inB) {
		    return [inA.arrival_date.toLowerCase(), inA.rancher_name.toLowerCase()] < 
				   [inB.arrival_date.toLowerCase(), inB.rancher_name.toLowerCase()] ? -1 : 1;
		});				
		this.$.inspectionsList.render();					
	},
	selectReception:function(inSender, inEvent){
		var objReception=this.objList[inEvent.rowIndex];		
		if(this.arrRec[objReception.reception_id]){	
			delete this.arrRec[objReception.reception_id];
			objReception['selected']=false;			
		}else{
			this.arrRec[objReception.reception_id]=objReception.reception_id;
			objReception['selected']=true;						
		}
		this.$.inspectionsList.renderRow(inEvent.rowIndex);		
	},
	getReception:function(){
		return this.objList[this.iSelected];
	},
	calcNetWeight:function(arrW){
		var iHC=0;
		var iW=0;
		var objW;
		for (var i=0;i<arrW.length;i++){
			objW=arrW[i];
			iHC+=parseInt(objW.hc);
			iW+=parseInt(objW.weight);
		}
		if(iHC>0){
			return iHC+"/"+iW+"KG ("+(iW/iHC).toFixed(2)+")";			
		}else{
			return iHC+"/"+iW+"KG";			
		}
	},
	getBarnyards:function(arrBY){
		var sText="";
		var objBY;
		for (var i=0;i<arrBY.length;i++){
			objBY=arrBY[i];
			sText+=objBY.barnyard_code+", ";
		}
		sText=sText.slice(0,-2);
		return sText="("+arrBY.length+") "+sText;
	},
	releaseReceptions:function(){
		cacheReceptions.releaseReceptions(this.arrRec,this,"afterRelease");
	},
	afterRelease:function(){
		this.updateList();
		this.$.modalDialog.openAtCenter();
	}
});