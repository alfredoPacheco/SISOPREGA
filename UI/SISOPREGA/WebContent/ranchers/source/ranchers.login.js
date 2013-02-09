enyo.kind({
	name: "ranchers.login",
	kind: "FittableRows",
	events:{
		onSucess:"",
		onFail:"",
	},
	fit: true,
	classes: "enyo-fit",
	style: "width:100%; height:100%; bottom:0px; top:0px; left:0px;right:0px",	
	components: [
	    {name: "popLogIn", classes: "onyx-sample-popup", kind: "onyx.Popup", centered: true, floating: true, onHide: "popupHidden", scrim: true, 
	    	components: [{content: "Credenciales Invalidas"}
	    ]},	             
		{kind: "FittableColumns",classes: "introMiddleBG", fit: true, components: [
			{style: "width: 79%;"},
			{kind: "FittableRows", style:"width:40%", components: [
				{style: "height: 41%; position: relative; z-index: 1;"},
				{tag:"input", kind:"enyo.Control",name:"user",attributes:{type:"text"},style:"height:6%;width:38%;border:0px;font-size:1.5rem;", onkeydown:"key_down"},
				{style: "height: 4%; width:10%; position: relative; z-index: 1;"},				
				{tag:"input",kind:"Control", name:"password",attributes:{type:"password"},style:"height:6%;width:38%;border:0px;font-size:1.5rem;", onkeydown:"key_down"},		
				{style: "height: 5%; position: relative; z-index: 1;"},	
				{ kind: "FittableColumns",components:[		
					{style: "width: 23%;"},						
					{kind:"onyx.Button", content: "Entrar", onclick:"checkLogIn", style:"width:15%"}		
					]
				}
			]}
		]}
	],
	checkLogIn:function(){
		var consumirLogin = consumingGateway.Login(this.$.user.hasNode().value, this.$.password.hasNode().value);
		if(consumirLogin.exceptionId == 0){
			this.doSucess();
		}else{
			this.$.popLogIn.show();
			this.doFail();
		}					
	},
	resetValues:function(){
		this.$.user.hasNode().value=""; 
		this.$.password.hasNode().value="";
	},
	key_down:function(inSender, inEvent){
		if(inEvent.keyCode == 13){			
			this.checkLogIn();
		}
	}	
});

