enyo.kind({
	name: "sisoprega",
	kind: enyo.VFlexBox,
	components: [
		{kind: "Toolbar",name:"tbHeader",style:"height:10px", 
			components: [
				{name:'btnGoBack',icon:"images/command-menu/menu-icon-back.png", onclick:"goBack"},
				{kind: "Spacer"},
				{kind: "VFlexBox", name:'lblMainCap', className:"",
				 style:"color:#FFF;border:none", content: "Recepciones"},  
				{kind: "Spacer"},
				{name:'btnLogOut', onclick:"logOut",icon:"images/command-menu/icon-context.png"}]},
				
				{kind: enyo.Pane, flex: 1, name: "mainPane",
				 components:[
				 {kind:"login", name:"login",onSucess:"goAhead",onFail:"noAccess"},
				 {kind:"main.menu",name:"mainMenu"}
				 ]},
		 //SCRIM
		 {kind: enyo.Scrim,name:"scrimMain",layoutKind:enyo.VFlexLayout, align: "center", pack: "center",
		  components: [{kind: enyo.SpinnerLarge}]},
		 {kind: enyo.Dialog, name:"toastMain",flyInFrom: "bottom",lazy: false, scrim:true, 
		  components:[{style: "padding: 12px", content: "Alerta"},
					  {name:"msgMain",style: "padding: 12px; font-size: 14px: width:100%:height:100%", 
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
	},
	goAhead:function(){
		this.$.tbHeader.show();
		this.$.mainPane.selectViewByName("mainMenu");		
	},
	noAccess:function(){
		cacheMan.setMessage("","", "Usuario o contraseña incorrecta.");
	},
	logOut:function(){
		consumingGateway.LogOut();
		this.$.tbHeader.hide();
		cacheMan.clearBack();		
		this.$.mainPane.selectViewByName("login");
	}
});
