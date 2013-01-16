enyo.kind({
	name: "ranchers.login",
	kind: "FittableRows",
	events:{
		onSucess:"",
	},
	fit: true,
	classes: "enyo-fit",
	style: "width:100%; height:100%; bottom:0px; top:0px; left:0px;right:0px",	
	components: [
		{kind: "FittableColumns",classes: "introMiddleBG", fit: true, components: [
			{style: "width: 79%;"},
			{kind: "FittableRows", style:"width:40%", components: [
				{style: "height: 41%; position: relative; z-index: 1;"},
				{tag:"input", attributes:{},style:"height:6%;width:38%;border:0px"},
				{style: "height: 4%; width:10%; position: relative; z-index: 1;"},				
				{tag:"input", attributes:{type:"password"},style:"height:6%;width:38%;border:0px"},		
				{style: "height: 5%; position: relative; z-index: 1;"},	
				{ kind: "FittableColumns",components:[		
					{style: "width: 23%;"},						
					{kind:"onyx.Button", content: "Entrar", onclick:"doSucess", style:"width:15%"}		
					]
				}
			]}
		]}
	]
});