enyo.kind({
	name: "sisoprega",
	kind: enyo.VFlexBox,
	components: [
		{kind: "Toolbar",name:"tbHeader",style:"max-height:10px", className:"headerMain", 
			components: [
				{name:'btnGoBack',icon:"images/command-menu/menu-icon-back.png", onclick:"goBack", flex:1},				
				{kind: "Spacer", flex:1, name:"spacerFirst"},
				{kind: "Spacer", flex:1, name:"spacerSecond"},
				{kind: "VFlexBox", name:'lblMainCap', allowHtml:true, flex:1,
				 style:"color:#FFF;border:none;font-size:15px; text-align:center;min-width:150px;", content: "Menu Principal"},  
				{kind: "Spacer", flex:1, name:"spacerThird"},
				{name:'btnLogOut', flex:1, onclick:"logOut",icon:"images/command-menu/icon-context.png"}]
		},
		{kind: enyo.Pane, flex: 1, name: "mainPane", transitionKind: "enyo.transitions.LeftRightFlyin",
				 components:[
				 {kind:"login", name:"login",onSucess:"goAhead",onFail:"noAccess"},
				 {kind:"main.menu",name:"mainMenu"}
				 ]},
		 //SCRIM
		 {kind: enyo.Scrim,name:"scrimMain",layoutKind:enyo.VFlexLayout, align: "center", pack: "center",
		  components: [{kind: enyo.SpinnerLarge}]},
		 {kind: enyo.Dialog, name:"toastMain",flyInFrom: "bottom",lazy: false, scrim:true, 
		  components:[{style: "padding: 12px", content: "Alerta"},
					  {name:"msgMain",style: "padding: 12px; font-size: 14px; width:100%;height:100%;", 
					   content: ""}]}
	],
	ready:function(){
		this.$.tbHeader.hide();
		cacheMan.setGlobalToaster(this.$);
		cacheMan.setGlobalScrim(this.$.scrimMain);
		cacheMan.setGlobalLabel(this.$.lblMainCap);
		_objMainHeader=this.$.lblMainCap;
	},
	goBack:function(){
		cacheMan.goBack();
		if (_objMainHeader.getContent() =="Menu Principal"){
			this.$.btnGoBack.setShowing(!1);
			enyo.$.sisoprega_spacerSecond.setShowing(1);
			_objMainHeader.setStyle("color:#FFF;border:none;font-size:15px; text-align:center;min-width:150px;");
		}
		else{
			this.$.btnGoBack.setShowing(1);
			enyo.$.sisoprega_spacerSecond.setShowing(!1);
		}
			
	},
	goAhead:function(){			
		this.$.btnGoBack.setShowing(!1);
		enyo.$.sisoprega_spacerSecond.setShowing(1);
		this.$.tbHeader.show();	
		this.$.mainPane.selectViewByName("mainMenu");
	},
	noAccess:function(){
		cacheMan.setMessage("", "Usuario o contraseņa incorrecta.");
	},
	logOut:function(){
		consumingGateway.LogOut();
	}
});
