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
		_gobackStack.push({caption:"Ganaderos",paneMan:this.$.mainPane,paneName:"ranchersList"});
		this.$.ranPerCreate.toggleAdd();
		this.$.ranPerCreate.objList=cacheRanchers.get();
		_objMainHeader.setContent('Nuevo Ganadero - Persona Fisica');
		this.$.mainPane.selectViewByName("ranPerCreate");		
	},
	showEnterprise:function(){
		_gobackStack.push({caption:"Ganaderos",paneMan:this.$.mainPane,paneName:"ranchersList"});
		this.$.ranEPCreate.toggleAdd();	
		this.$.ranEPCreate.objList=cacheRanchers.get();
		_objMainHeader.setContent('Nuevo Ganadero - Empresa / Sociedad');
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
		_gobackStack.push({caption:"Ganaderos",paneMan:this.$.mainPane,paneName:"ranchersList"});
		var objRan=this.$.ranchersList.getSelected();
		if (objRan.rancher_type==2){
			_objMainHeader.setContent('Ganadero - Empresa / Sociedad');
			this.$.ranOptions.$.button3.setShowing(!1);
		}else{
			_objMainHeader.setContent('Ganadero - Persona Fisica');
			this.$.ranOptions.$.button3.setShowing(1);
		}
		this.$.mainPane.selectViewByName("ranOptions");		
	},
	showContacts:function(){
		
		var objRan=this.$.ranchersList.getSelected();
		if (objRan.rancher_type==2){
			_gobackStack.push({caption:"Ganadero - Empresa / Sociedad",paneMan:this.$.mainPane,paneName:"ranOptions"});
			_objMainHeader.setContent('Contacto - (Empresa / Sociedad)');
			this.$.ranOptions.$.button3.setShowing(!1);
		}else{
			_gobackStack.push({caption:"Ganadero - Persona Fisica",paneMan:this.$.mainPane,paneName:"ranOptions"});
			_objMainHeader.setContent('Contacto - (Persona Fisica)');
			this.$.ranOptions.$.button3.setShowing(1);
		}
		this.$.contactList.setList(this.$.ranchersList.getSelected());
		
		this.$.contactList.updateList();
		
		this.$.mainPane.selectViewByName("contactList");
	},
	showAddContact:function(){		
		
		var objRan=this.$.ranchersList.getSelected();
		if (objRan.rancher_type==2){
			_gobackStack.push({caption:"Contacto - (Empresa / Sociedad)",paneMan:this.$.mainPane,paneName:"contactList"});
		}else{
			_gobackStack.push({caption:"Contacto - (Persona Fisica)",paneMan:this.$.mainPane,paneName:"contactList"});
		}
		this.$.acontact.objList=_arrRancherList[this.$.ranchersList.iSelected].contacts;
		this.$.acontact.setRancher(this.$.ranchersList.getSelected());
		this.$.acontact.toggleAdd();
		_objMainHeader.setContent('Nuevo Contacto');
		this.$.mainPane.selectViewByName("acontact");
	},
	showEditContact:function(){
		var objRan=this.$.ranchersList.getSelected();
		if (objRan.rancher_type==2){
			_gobackStack.push({caption:"Contacto - (Empresa / Sociedad)",paneMan:this.$.mainPane,paneName:"contactList"});
		}else{
			_gobackStack.push({caption:"Contacto - (Persona Fisica)",paneMan:this.$.mainPane,paneName:"contactList"});
		}
		_gobackStack.push({caption:"Ganaderos",paneMan:this.$.mainPane,paneName:"contactList"});			
		this.$.acontact.setContact(this.$.ranchersList.getSelected(),this.$.contactList.getContact());
		_objMainHeader.setContent('Editar Contacto');
		this.$.mainPane.selectViewByName("acontact");
	},
	showBilling:function(){
		_gobackStack.push({caption:"Ganadero - Persona Fisica",paneMan:this.$.mainPane,paneName:"ranOptions"});			
		this.$.billing.setRancher(this.$.ranchersList.getSelected());
		this.$.billing.toggleUpdate();
		_objMainHeader.setContent('Datos de Facturación');
		this.$.mainPane.selectViewByName("billing");		
	},
	showEdit:function(){
					
//		var objRan=_arrRancherList[this.$.ranchersList.iSelected];
		 var objRan=this.$.ranchersList.getSelected();
		objRan.first_name=objRan.first_name;
		if (objRan.rancher_type==1){
			_gobackStack.push({caption:"Ganadero - Persona Fisica",paneMan:this.$.mainPane,paneName:"ranOptions"});
			this.$.ranPerCreate.setRancher(objRan);
			this.$.ranPerCreate.toggleUpdate();
			_objMainHeader.setContent('Editar Ganadero - Persona Fisica');
			this.$.mainPane.selectViewByName("ranPerCreate");	
		}else{
			_gobackStack.push({caption:"Ganadero - Empresa / Sociedad",paneMan:this.$.mainPane,paneName:"ranOptions"});
			this.$.ranEPCreate.setRancher(objRan);
			this.$.ranEPCreate.toggleUpdate();
			_objMainHeader.setContent('Editar Ganadero - Empresa / Sociedad');
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

