enyo.kind({
	name: "ranchers",
	kind: "FittableRows",
	classes: "mainBG enyo-fit",	
	style: "width:100%; height:100%; bottom:0px; top:0px; left:0px;right:0px",
	fit: true,	
	components: [
		{kind: "Panels", name:"main",fit: true,	draggable: false,components:[
			{kind: "ranchers.login",onSucess:"loadReports"},
			{kind: "ranchers.reports",onMBYReport:"loadBYMReport", onFeedReport:"loadFeedReport",
			 onInspectionReport:"loadInspectionReport", onHistoricalReport:"loadHistoricalReport",
			 onUpdateProfile:"loadUpdateProfile",onGoBack:"loadLogIn"},
			{kind: "receptions.barnyards.map",onGoBack:"stepBack"}
		]},
	],
	create:function(){
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
		var sURL="/ReportingGateway/RecibidoPorGanadero?fromDate=01/01/2010&toDate=01/01/2014&rancherId=692"
		window.open(sURL,"reception")
		//alert('TODO:Feed')
	},
	loadInspectionReport:function(){	
		var sURL="/ReportingGateway/CattleInspection?fromDate=01/01/2010&toDate=01/01/2014&rancherId=692"
		window.open(sURL,"inspection")
		//alert('TODO:Inspection')	
	},
	loadHistoricalReport:function(){
		sURL="/ReportingGateway/CattleInspection?fromDate=01/01/2010&toDate=01/01/2014&rancherId=692"
		alert('TODO:Historical')		
	},		
	stepBack:function(){
		this.$.main.setIndex(1);			
	}
});