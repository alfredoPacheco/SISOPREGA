enyo.kind({
	name: "login",	
	kind: enyo.VFlexBox,			  	
	events: {
		"onSucess":"",
		"onFail":"",
	},
	components: [	
		{kind: "Toolbar",name:"tbHeader",style:"height:10px;", 
			components: [
				{kind: "Spacer"},
				{kind: "VFlexBox", style:"color:#FFF;border:none",
				 content:"SISOPREGA"},
				{kind: "Spacer"},				
				 ]},	
		{kind: enyo.Scroller,
	     flex: 1, 
    	style: " background-size: cover;",		 
		 components: [
		 {kind:"VFlexBox",align: "center", pack: "center",components:[
		 				{kind: "Spacer"},
			{kind: "Image",
				    src: "images/sisoprega.png",style:"margin-top:20px; margin-bottom:20px"}]},						 
			{kind: "RowGroup", defaultKind: "HFlexBox", caption: "", style:"color:#FFF",
			 components: [
			  {kind: "Item",
				components: [
					{kind:"Input", name:"user", hint:"User",selectAllOnFocus: true, value:"mex_user"},
					{kind:"PasswordInput", name:"password", hint:"Password",selectAllOnFocus: true, value:"mex_user" }]}]},							 
			]},		
		{kind: "Toolbar",name:"tbFooter",style:"height:10px", 
			components: [
				{kind: "Button", className: "enyo-button-affirmative", 
				 flex:1, caption: "Entrar", onclick: "onLogIn"},				
				 ]},							  
	],
	onLogIn:function(){
		var consumirLogin = consumingGateway.Login(this.$.user.getValue(), this.$.password.getValue());
		if(consumirLogin.exceptionId == 0){
			cacheRanchers.get();
			cacheCattle.getCattleClass();
			cacheCattle.getCattleType();
			this.doSucess();
		}else{
			this.doFail();
		}
	}
});