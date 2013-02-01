enyo.kind({
	name: "ranchers",
	kind: "FittableRows",
	classes: "mainBG enyo-fit",	
	style: "width:100%; height:100%; bottom:0px; top:0px; left:0px;right:0px",
	reportID:0,
	fit: true,	
	components: [
 	    {kind: "onyx.Popup",classes: "onyx-sample-popup", name: "popRangeDates", centered: true, modal:true,	 floating: true, scrim: true, 
	    	components: [
	    	            {kind: "onyx.Groupbox", 
	    	             components: [
                             {kind: "onyx.GroupboxHeader", content :"Fecha Inicio"},
                             {kind:"onyx.DatePicker", name:'dFrom', minYear:2013, maxYear:2020, style:"border-width: 0 0px 0px 0px;"},
                             {kind: "onyx.GroupboxHeader", content :"Fecha Fin"},
                             {kind:"onyx.DatePicker", name:'dTo',minYear:2013, maxYear:2020,style:"border-width: 0 0px 0px 0px;"},
                             {kind: "FittableColumns", style:"border-width: 0 0px 0px 0px;",components:[
                                  {kind:"onyx.Button", fit:true, onclick:"launchReport",content:"OK",classes: "onyx-affirmative",style:"border-width: 0 0px 0px 0px;"},
                                  {kind:"onyx.Button", fit:true, onclick:"closePopUp",content:"Cancelar",classes: "onyx-negative",style:"border-width: 0 0px 0px 0px;"}
                             ]}
	    	            ]}
	    	            
	    	             
	    ]},		             
		{kind: "Panels", name:"main",fit: true,	draggable: false,components:[
			{kind: "ranchers.login",onSucess:"loadReports"},
			{kind: "ranchers.reports",onMBYReport:"loadBYMReport", onFeedReport:"loadFeedReport",
			 onInspectionReport:"loadInspectionReport", onHistoricalReport:"loadHistoricalReport",
			 onUpdateProfile:"loadUpdateProfile",onGoBack:"loadLogIn"},
			{kind: "receptions.barnyards.map",onGoBack:"stepBack"},			
		]},
	],
	rendered:function(){
		this.inherited(arguments);
		this.$.main.setIndex(0);		
	},
	loadLogIn:function(){
        this.inherited(arguments);
		this.$.main.setIndex(0);		
	},	
	loadUpdateProfile:function(){
		alert('TODO:Profile')
	},
	loadReports:function(){
        this.inherited(arguments);
		this.$.main.setIndex(1);		
	},
	loadBYMReport:function(){
        this.inherited(arguments);
		this.$.main.setIndex(2);		
	},
	loadFeedReport:function(){
		//alert('TODO:Feed')
		this.reportID=1;
		this.getParams();
	},
	loadInspectionReport:function(){
		this.reportID=2;
		this.getParams();		
		//alert('TODO:Inspection')	
	},
	loadHistoricalReport:function(){
		this.reportID=3;
		this.getParams();		
		//alert('TODO:Historical')		
	},		
	stepBack:function(){
		this.$.main.setIndex(1);			
	},
	getParams:function(){
		this.$.popRangeDates.show();
	},
	launchReport:function(){
		this.inherited(arguments);
		var sURL=""
		var sTitle=""
			
		var dFrom=this.$.dFrom.getValue();
		var sFrom=dFrom.getDate()+"/"+dFrom.getMonth()+1+"/"+dFrom.getFullYear();
		var dTo=this.$.dTo.getValue();
		var sTo=dTo.getDate()+"/"+dTo.getMonth()+1+"/"+dTo.getFullYear();
		
		switch(this.reportID){
			//Alimentacion
			case 1:
				sTitle="feed"
				sURL="/ReportingGateway/ReporteAlimento?fromDate="+sFrom+"&toDate="+sTo+"&rancherId=692";				
				break;
			//Inspeccion
			case 2:
				sTitle="inspection"				
				sURL="/ReportingGateway/CattleInspection?fromDate="+sFrom+"&toDate="+sTo+"&rancherId=692";				
				break;
			//Recepcion
			case 3:
				sTitle="reception"
				sURL="/ReportingGateway/RecibidoPorGanadero?fromDate="+sFrom+"&toDate="+sTo+"&rancherId=692";				
				break;				
		}
		window.open(sURL,sTitle);
		this.closePopUp();
	},
	closePopUp:function(){
		this.$.popRangeDates.hide();
	}
});