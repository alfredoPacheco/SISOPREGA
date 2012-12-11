enyo.kind({
	name: "catalogs.barnyards",
	kind: enyo.VFlexBox,
	iProduct:"",
	components:[
		{kind: enyo.Pane, flex: 1, name: "mainPane",
		 components:[	
			{kind:"catalogs.barnyards.list",name:"barnyardList",flex: 1,onSelectBY:"showCapacity"},
	 		{kind:"catalogs.barnyards.capacity",name:"capList"},
		 ]}				 			
	],
  showCapacity:function(inSender, inEvent){
 	 _gobackStack.push({caption:"Corrales",paneMan:this.$.mainPane,
	 					paneName:"barnyardList",cbObj:this.$.barnyardList,cbMethod:"updateList"});
	this.$.capList.set(this.$.barnyardList.getSelected());
	this.$.capList.toggleAdd();
	this.$.mainPane.selectViewByName("capList");
	return true;					  
  }
});

