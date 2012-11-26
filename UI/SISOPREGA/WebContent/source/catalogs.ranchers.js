enyo.kind({
	name: "catalogs.ranchers",
	kind: enyo.VFlexBox,
	components:[
		{kind: enyo.Pane, flex: 1, name: "mainPane",
		 components:[	
			{kind:"catalogs.ranchers.list",name:"ranchersList",flex: 1,onSelectRancher:"showOptions",
			 onEnterprise:"showEnterprise", onPerson:"showPerson"},
	 		{kind:"catalogs.ranchers.person.create",name:"ranPerCreate",onAddRancher:"goBack",
			 onUpdateRancher:"goBack",onCancel:"goBack"},
	 		{kind:"catalogs.ranchers.enterprise.create",name:"ranEPCreate",onAddRancher:"goBack",
			 onUpdateRancher:"goBack",onCancel:"goBack"},			
	 		{kind:"catalogs.ranchers.options",name:"ranOptions",onGoback:"goBack",onEdit:"showEdit",
			 onContacts:"showContacts",onBilling:"showBilling"},
	 		{kind:"catalogs.ranchers.contact.list",name:"contactList",onGoback:"goBack",
			 onAddContact:"showAddContact",onSelect:"showEditContact"},			 
	 		{kind:"catalogs.ranchers.contact.create",name:"acontact",onGoback:"goBack",
			 onAddRancher:"goBack", onUpdateRancher:"goBack"},			 			
	 		{kind:"catalogs.ranchers.billing.create",name:"billing",onGoback:"goBack",
			onAddRancher:"goBack",onUpdateRancher:"goBack"},			 						
		 ]}				 			
	],
	showPerson:function(){
		this.addGoBackAction();
		this.$.ranPerCreate.toggleAdd();
		this.$.ranPerCreate.objList=cacheRanchers.get();
		this.$.mainPane.selectViewByName("ranPerCreate");		
	},
	showEnterprise:function(){
		this.addGoBackAction();
		this.$.ranEPCreate.toggleAdd();	
		this.$.ranEPCreate.objList=cacheRanchers.get();	
		this.$.mainPane.selectViewByName("ranEPCreate");		
	},	
	showCapacity:function(inSender, inEvent){
		this.addGoBackAction();
		this.$.capList._arrCapacity=_arrBarnyards[inEvent.rowIndex].barnyard_capacity;
		this.$.capList.render();
		this.$.mainPane.selectViewByName("capList");
		return true;					  
	},
	showOptions:function(){
		this.addGoBackAction();
		this.$.mainPane.selectViewByName("ranOptions");				
	},
	showContacts:function(){
		_gobackStack.push({caption:"Ganaderos",paneMan:this.$.mainPane,paneName:"ranOptions"});		
		this.$.contactList.setList(this.$.ranchersList.getSelected());
		this.$.contactList.updateList();	
		this.$.mainPane.selectViewByName("contactList");
	},
	showAddContact:function(){		
		_gobackStack.push({caption:"Ganaderos",paneMan:this.$.mainPane,paneName:"contactList"});	
		this.$.acontact.objList=_arrRancherList[this.$.ranchersList.iSelected].contacts;
		this.$.acontact.setRancher(this.$.ranchersList.getSelected());
		this.$.acontact.toggleAdd();
		this.$.mainPane.selectViewByName("acontact");
	},
	showEditContact:function(){
		_gobackStack.push({caption:"Ganaderos",paneMan:this.$.mainPane,paneName:"contactList"});			
		this.$.acontact.setContact(this.$.ranchersList.getSelected(),this.$.contactList.getContact());
		this.$.mainPane.selectViewByName("acontact");
	},
	showBilling:function(){
		_gobackStack.push({caption:"Ganaderos",paneMan:this.$.mainPane,paneName:"ranOptions"});			
		this.$.billing.setRancher(this.$.ranchersList.getSelected());
		this.$.billing.toggleUpdate();
		this.$.mainPane.selectViewByName("billing");		
	},
	showEdit:function(){
		_gobackStack.push({caption:"Ganaderos",paneMan:this.$.mainPane,paneName:"ranOptions"});			
//		var objRan=_arrRancherList[this.$.ranchersList.iSelected];
		 var objRan=this.$.ranchersList.getSelected();
		objRan.first_name=objRan.first_name;
		if (objRan.rancher_type==1){
			this.$.ranPerCreate.setRancher(objRan);
			this.$.ranPerCreate.toggleUpdate();
			this.$.mainPane.selectViewByName("ranPerCreate");	
		}else{
			this.$.ranEPCreate.setRancher(objRan);
			this.$.ranEPCreate.toggleUpdate();			
			this.$.mainPane.selectViewByName("ranEPCreate");	
		}
	},
	addGoBackAction:function(){
		_gobackStack.push({caption:"Ganaderos",paneMan:this.$.mainPane,paneName:"ranchersList"});		
	},
	goBack:function(){
		this.$.ranchersList.filterRanchers();
		this.$.contactList.updateList();
		cacheMan.goBack();
	}
});

