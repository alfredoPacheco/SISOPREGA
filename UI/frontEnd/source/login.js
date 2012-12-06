enyo.kind({
	name: "login",	
	kind: enyo.VFlexBox,			  	
	events: {
		"onSucess":"",
		"onFail":"",
	},	
	components: [	
		{kind: "Toolbar",name:"tbHeader",
			components: [
				{kind: "Spacer"},
				{kind: "VFlexBox", style:"color:#FFF;border:none",
				 content:"SISOPREGA"},
				{kind: "Spacer"},				
				 ]},	
		{kind: enyo.Scroller,
		 className:"loginBG",		
	     flex: 1,	    
		 components: [
		 	{kind:"VFlexBox",align: "center", pack: "center",
		 		components:[
		 			{kind: "Spacer"},						
					{kind: "Image",
				     src: "images/eastman.png"},					
					{kind: "RowGroup", layoutKind:enyo.VFlexLayout, caption: "", 
					 width:"50%;",
			 	 	 style:"color:#FFF;margin-top:10%",
			 	 	 components: [	
						{kind:"Input", name:"user", hint:"User",selectAllOnFocus: true,},
						{kind:"PasswordInput", name:"password", hint:"Password",selectAllOnFocus: true,}
					]},
					{kind: "Spacer"}					 
			]}]},		
		{kind: "Toolbar",name:"tbHeader",style:"", 
			components: [
				{kind: "Button", className: "enyo-button-affirmative",style:"background-color:#5f0712",
				 flex:1, caption: "Entrar", onclick: "checkLogIn"},				
				 ]},							  
	],
	checkLogIn:function(){
		cacheMan.showScrim();		
		cacheMan.hideScrim();
		this.doSucess();				
	}
});