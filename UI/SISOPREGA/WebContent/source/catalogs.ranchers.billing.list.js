enyo.kind({
	name: "catalogs.ranchers.billing.list",
	kind: enyo.SlidingView,
	layoutKind: enyo.VFlexLayout,
	events: {
		"onSelect":"",
		"onAddBilling":"",		
	},
	iSelected:"",
	objRancher:null,
	components:[
		{kind: enyo.Scroller, name:"scrollProductList",flex: 1,
			className:"listBG",
 		 components: [
					{kind: enyo.VirtualRepeater, name: "productList", onSetupRow: "setupRow", 
					 onclick: "selectBilling",								
					 components: [
						{kind: "Divider"},						
						{kind: enyo.SwipeableItem,
							onConfirm: "deleteBilling", 							 
							tapHighlight: true,
							components: [
								{name: "billing_name", 
								 style: "text-overflow: ellipsis; overflow: hidden;"+
								        "white-space: nowrap;color:#FFF;", 
								 content: ""},
								{name: "billing_info", 
								 style: "font-size: 0.85em;color:#999",
								 content: ""},											
								{kind: "BasicRichText",
								 name: "description", 
								 style: "font-size: 0.75em;color:#DDD",
								 content: ""}									
							]}
				 ]},			
			]
		},
		{kind: "Toolbar",	
		components: [					 
			{kind: "enyo.IconButton", flex:1,icon: "images/menu-icon-new.png",
			 onclick: "doAddBilling"},
		]},		
	],
	setList:function(objRancher){
		this.objRancher=objRancher;
		this.updateList();
	},
	getGroupName: function(inIndex) {
		// get previous record
		var r0 = this.objRancher.billings[inIndex -1];
		// get (and memoized) first letter of last name
		if (r0) {
			r0.letter = r0.last_name.substr(0,1).toUpperCase();
		}
		var a = r0 && r0.letter;
		// get record
		var r1 = this.objRancher.billings[inIndex];
		r1.letter = r1.last_name.substr(0,1).toUpperCase();
		var b = r1.letter;
		// new group if first letter of last name has changed
		return a != b ? b : null;
		
	},
	setupDivider: function(inIndex) {
		// use group divider at group transition, otherwise use item border for divider
		var group = this.getGroupName(inIndex);
		this.$.divider.setCaption(group);
		this.$.divider.canGenerate = Boolean(group);
	},	
	setupRow:function(inSender, inIndex) {		
		var objRan;
		if(this.objRancher!=null){
			if (objRan=this.objRancher.billings[inIndex]) {
				this.setupDivider(inIndex);
				this.$.billing_name.setContent(objRan.last_name+', '+objRan.first_name);
				this.$.billing_info.setContent(objRan.phone_number);			
				return true;
			}
		}
	},
	deleteBilling: function(inSender, inIndex){
		return cacheRanchers.deleteBilling(this.objRancher,this.objRancher.billings[inIndex],this,"updateList");		
	},
	updateList:function(){
		if(this.objRancher!=null){
			var arrBillingsAux = cacheRanchers.getBillings(this.objRancher);
			if(arrBillingsAux.length>0){
				this.objRancher.billings.sort(function(inA, inB) {
					return [inA.last_name.toLowerCase()] < 
						   [inB.last_name.toLowerCase()] ? -1 : 1;
				});												
			}
		}
		this.$.productList.render();
	},
	selectBilling:function(inSender, inEvent) {
		this.iSelected=inEvent.rowIndex;
		this.doSelect();
	},
	getBilling:function(){
		return this.objRancher.billings[this.iSelected];
	}
});