enyo.kind({
	name: "reports.receptions.list",
	kind: enyo.SlidingView,
	layoutKind: enyo.VFlexLayout,
	events: {
		"onSelect": "",
	},
	iSelected:null,
	objList:[],	
	components:[
		{kind: enyo.Scroller,flex: 1,
		 className:"listBG",
 		 components: [
			{kind: enyo.VirtualRepeater, toggleSelected:true,
				name: "receptionList", onSetupRow: "setupRow", onclick:"selectReception",								
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
									className:"listFirst",
									 content: ""},
									{name: "cattle", 
									 className:"listSecond",
									 content: ""},
									{name: "weight", 
									 className:"listSecond",
									 content: ""},
									{name: "barnyards", 
									className:"listSecond",
									 content: ""},									 									
									 ]}]}]}]}]},				
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
				this.$.cattle.setContent(obj.cattype_name + " (" + obj.hc_aprox + ")   " + obj.city_name );			
				this.$.barnyards.setContent(this.getBarnyards(obj.barnyards));
				this.$.weight.setContent(this.calcNetWeight(obj.weights));
				return true;
			}
		}
	},
	deleteReception: function(inSender, inIndex){
		cacheReceptions.del(this.objList[inIndex],this,"updateList");
	},
	updateList:function(){
		this.objList=cacheReceptions.get();
		this.objList.sort(function(inA, inB) {
		    return [inA.arrival_date.toLowerCase(), inA.rancher_name.toLowerCase()] < 
				   [inB.arrival_date.toLowerCase(), inB.rancher_name.toLowerCase()] ? -1 : 1;
		});				
		this.$.receptionList.render();					
	},
	selectReception:function(inSender, inEvent){
		this.iSelected=inEvent.rowIndex;
		this.doSelectReception();
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
});