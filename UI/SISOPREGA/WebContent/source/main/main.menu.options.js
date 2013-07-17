enyo.kind({
	name: "main.menu.options",	
	kind: enyo.Scroller,
	layoutKind: enyo.VFlexLayout,	
	align:"center",
	//pack:"center",	
	style:"width:320px;",
	events: {
		onReceptions:"",	
		onCatalogs:"",
		onReports:"",
		onInspectionForecast:"",
		onUsers: ""
	},		
		components: [{style:"height:10px;"},
			{kind: enyo.HFlexBox,
			 className:"buttonsBG",		
		     flex: 1,
			 align:"center",	    
			 components: [
				{kind: "CustomButton", flex:1, content: "", className: "menuButton", style:"width:75px;height:75px;background-image:url('../SISOPREGA_WEB_LIB/images/cow-100px.png');", onclick:"doReceptions"},		
				{kind: "CustomButton",flex:1, content: "",className: "menuButton", style:"width:75px;height:75px;background-image:url('../SISOPREGA_WEB_LIB/images/catalogos.png');", onclick:"doCatalogs",},
				{kind: "CustomButton",flex:1, content: "",className: "menuButton", style:"width:75px;height:75px;background-image:url('../SISOPREGA_WEB_LIB/images/reportes.png');", onclick:"doReports"}]
			},
			{kind: enyo.HFlexBox,
				 className:"buttonsBG",		
				 style:"font-size:11px;height:15px",
				 align:"center",
				 components: [				
					{ content:"Operaciones" , flex:1, style:"text-align:center;vertical-align:top;"},
					{ content:"Catalogos" , flex:1,style:"text-align:center;vertical-align:top;"},
					{ content:"Reportes" , flex:1,style:"text-align:center;vertical-align:top;"},]
				},
			{kind: enyo.HFlexBox,
				 className:"buttonsBG",		
			     
				 align:"center",	    
				 components: [				
					{kind: "CustomButton",  className:"menuButton", style:"width:85px;height:75px;background-image:url('../SISOPREGA_WEB_LIB/images/inspeccion.png');", onclick:"doInspectionForecast"},
					{kind: "CustomButton", className:"menuButton", style:"width:85px;height:75px;background-image:url('../SISOPREGA_WEB_LIB/images/users.png');", onclick:"doUsers"},
					{kind: "Spacer"}
					]
				},
				{kind: enyo.HFlexBox,
					 className:"buttonsBG",		
					 style:"font-size:11px;height:15px",
					 align:"center",
					 
					 components: [				
						{ content:"Lista de Inspeccion" , flex:1, style:"text-align:center;vertical-align:top;"},
						{ content:"Usuarios" , flex:1, style:"text-align:center;vertical-align:top;"},
						{kind: "Spacer"}]
					},
				{kind: enyo.HFlexBox,
					 className:"buttonsBG",		
				     flex: 1,
					 align:"center",	    
					 components: [				
						{kind: "Spacer"},
						{kind: "Spacer"},
						{kind: "Spacer"}]
					}]
	
});