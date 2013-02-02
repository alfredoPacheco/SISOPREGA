enyo.kind({
	name: "ranchers.reports",
	kind: "FittableRows",
	fit: true,
	classes: "enyo-fit",
	style: "width:100%; height:100%; bottom:0px; top:0px; left:0px;right:0px",	
	events: {	
		onMBYReport:"",
		onFeedReport:"",
		onInspectionReport:"",
		onHistoricalReport:"",
		onUpdateProfile:"",
		onGoBack:""
	},
	components: [
		{kind: "FittableColumns",classes: "reportsBG", fit: true, components: [
			{style: "width: 46%;"},
			{kind: "FittableRows", style:"width:50%", components: [
				{style: "height: 21%; position: relative; z-index: 1;"},
				{style: "height: 12%;width:100%", classes: "reportMapBYBG", onclick:"doMBYReport"},
				{style: "height: 1%; position: relative; z-index: 1;"},				
				{style: "height: 12%;width:88%",classes: "reportFeedBG", onclick:"doFeedReport"},
				{style: "height: 1%; position: relative; z-index: 1;"},				
				{style: "height: 12%;width:94%",classes: "reportInspectionBG", onclick:"doInspectionReport"},				
				{style: "height: 1%; position: relative; z-index: 1;"},								
				{style: "height: 12%;width:92%",classes: "reportHistoricalBG", onclick:"doHistoricalReport"},
				{style: "height: 1%; position: relative; z-index: 1;"},								
				{style: "height: 12%;width:94%",classes: "rancherProfileBG", onclick:"doUpdateProfile"},
				{style: "height: 3%; position: relative; z-index: 1;"},		
				{style: "height: 5%;",classes: "logOutBG", kind:"FittableColumns",
				 components:[
		 			{style: "width:85%"},
				 	{kind:"onyx.Button", fit:true, content: "Salir", onclick:"doGoBack"}
				]},																
			]}
		]}
	],
});