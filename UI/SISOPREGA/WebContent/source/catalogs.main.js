enyo.kind({
	name: "catalogs.main",
	kind: enyo.VFlexBox,	
	iProduct:"",
	events:{
	},
	components: [
		{ kind: enyo.Pane, flex: 1, 
		  name: "catalogsPane",
		  transitionKind: "enyo.transitions.LeftRightFlyin",
		 components:[
			{	kind:"catalogs.menu",
			    	name:"catMenu",
			    	onRanchers:"showRanchers",
			    	onContacts:"showContacts",
			    	label:"Catálogos"
			},
			{	kind:"catalogs.ranchersList",
			    	name:"listRanchers",
			    	label:"Ganaderos"
			},
			{	kind:"catalogs.list",
			    	name:"listRancherContacts",
			    	entity:cacheRancherContacts,
			    	label:"Contactos",
			    	createKindName:"catalogs.ranchers.contact.create",
			    	lazy: true
			},
		 ]},		 
	],
	ready:function(){
//	    cacheMan.showScrim();
////	    // Retrieve ranchers
//	    cacheRanchers.get(this, 'readCallback');
////	    //Retrieve enterprise ranchers
////	    cacheEnterpriseRanchers.get(this, 'readCallback');
	},
//	readsReceived : 0,
//	readCallback : function() {
//	    this.readsReceived++;
//	    if (this.readsReceived == 1) {
//		this.readsReceived = 0;
////		this.loadList();
//		cacheMan.hideScrim();
//	    }
//	},
//	loadList : function() {
//	    var allItems = [];
//	    
//	    // Manually concat rancher array
//	    for ( var i = 0; i < cacheRanchers.arrObj.length; i++) {
//		var rancher = cacheRanchers.arrObj[i];
//		rancher.importantInfo = "" + rancher.name;
//		rancher.secundaryInfo = "" + rancher.phone_number || "";
//		allItems.push(rancher);
//	    }
//
//	    // Manually concat enterprise array
//	    for ( var i = 0; i < cacheEnterpriseRanchers.arrObj.length; i++) {
//		var rancher = cacheEnterpriseRanchers.arrObj[i];
//		rancher.importantInfo = "" + rancher.legalName;
//		rancher.secundaryInfo = "" + rancher.phone_number + "";
//		allItems.push(rancher);
//	    }
//
//	    this.$.listRanchers.setItems(allItems);
//	},
	showContacts:function(){
	    this.$.catalogsPane.validateView("listRancherContacts");
	    this.$.catalogsPane.selectViewByName("listRancherContacts");
//	    this.$.listRancherContacts.reset();
	},
	showRanchers:function(){
		this.addGoBackAction();
		_objMainHeader.setContent('Ganaderos');
//		this.$.catalogsPane.validateView("catRanchers");
//		this.$.catRanchers.$.ranchersList.retrieveLists();
//		this.$.catalogsPane.selectViewByName("catRanchers");		
		this.$.catalogsPane.validateView("listRanchers");
//		this.$.catRanchers.$.ranchersList.retrieveLists();
		this.$.catalogsPane.selectViewByName("listRanchers");
		this.$.listRanchers.reset();
	},	
	addGoBackAction:function(){
		_gobackStack.push({caption:_objMainHeader.getContent(),paneMan:this.$.catalogsPane,paneName:this.$.catalogsPane.getViewName()});		
	},
	selectView:function(inSender, inView, inPreviousView) {
		
		if(inView.name == inPreviousView.name){
			return;
		}
		if(_navigatingBack==false){
			_gobackStack.push({	caption: inPreviousView.label,
								paneMan:  inPreviousView.parent,
								paneName: inPreviousView.name     });
			
		}
		_objMainHeader.setContent(inView.label);
		if(_gobackStack.length == 0){
			_goBackButton.setShowing(!1);
			_objMainHeader.setStyle("color:#FFF;border:none;font-size:15px; text-align:center;min-width:150px;");
		}else{
			_goBackButton.setShowing(1);
		}
		if(inView.name=="usersList"){
		  inView.updateList();
		}
		if(inPreviousView){
			if(inPreviousView.name == "usersList" && inView.name != "menuOptions"){
			  var selectedUser = inPreviousView.getSelectedUser();
			  if(selectedUser)
			    inView.setUser(selectedUser);
			  else
			    inView.toggleAdd();
			}
		}
	}
});
