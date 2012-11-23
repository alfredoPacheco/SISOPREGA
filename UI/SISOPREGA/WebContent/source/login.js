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
					{kind:"Input", name:"user", hint:"User",selectAllOnFocus: true,},
					{kind:"PasswordInput", name:"password", hint:"Password",selectAllOnFocus: true, }]}]},							 
			]},		
		{kind: "Toolbar",name:"tbHeader",style:"height:10px", 
			components: [
				{kind: "Button", className: "enyo-button-affirmative", 
				 flex:1, caption: "Entrar", onclick: "doSucess"},				
				 ]},							  
	],
});