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
			{kind:"catalogs.menu",name:"catMenu",onRanchers:"showRanchers",
			 label:"Catálogos"},			
			{kind:"catalogs.ranchers",name:"catRanchers",label:"Ganaderos"},			
		 ]},		 
	],
	showRanchers:function(){
		this.addGoBackAction();
		_objMainHeader.setContent('Ganaderos');
		this.$.catalogsPane.validateView("catRanchers");
		this.$.catRanchers.$.ranchersList.retrieveLists();
		this.$.catalogsPane.selectViewByName("catRanchers");		
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
