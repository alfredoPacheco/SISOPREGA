enyo.kind({
    name : "r.reports.us",
    kind : enyo.Object,
    arrObj : [ {
	importantInfo : "Mexico - Arrivals",
	secundaryInfo : "Show heads and weight of arrivals at Mexico stock corrals, if you don't specify an exporter, you will receive global information.",
	reportUrl: "/ReportingGateway/GanadoRecibido",
	reportTitle:"Receptions",
	reportType: "filter"
	
    },{
	importantInfo : "Mexico - Inspections",
	secundaryInfo : "Show rejects information given an exporter and date range, if you don't specify an exporter, you will receive global information.",
	reportUrl: "/ReportingGateway/InspeccionGanado",
	reportTitle:"Inspection",
	reportType: "filter"
	
    },{
	importantInfo : "Mexico - Feeding",
	secundaryInfo : "Food delivery summary, you can filter by date and exporter, if you don't specify an exporter, you will receive global information.",
	reportUrl: "/ReportingGateway/ReporteAlimento",
	reportTitle:"Feeding on Mexico",
	reportType: "filter"
	
    },{
	importantInfo : "Mexico - Current state",
	secundaryInfo : "Gives an status of current state of Mexico stock corrals.",
	reportUrl: "/ReportingGateway/GanadoActivoCorrales",
	reportTitle:"Active received cattle in Mexico",
	reportType: "direct"
	
    },{
	importantInfo : "Mexico - Cross List",
	secundaryInfo : "Shows the typed list of inspection.",
	reportUrl: "/ReportingGateway/ListaInspeccionHistorica",
	reportTitle:"Crossing List",
	reportType: "filterByDate"
	
    },{
	importantInfo : "USA - Hermana",
	secundaryInfo : "",
	reportUrl: "hermana",
	reportTitle:"Hermana",
	reportType: "direct"
    },{
	importantInfo : "USA - Sales",
	secundaryInfo : "",
	reportUrl: "/ReportingGateway/Sales",
	reportTitle:"Sales",
	reportType: "filterByDate"
    },{
	importantInfo : "USA - Purchases",
	secundaryInfo : "",
	reportUrl: "/ReportingGateway/Purchase",
	reportTitle:"Purchases",
	reportType: "filterByDate"
    },{
	importantInfo : "USA - Inventory",
	secundaryInfo : "",
	reportUrl: "/ReportingGateway/Inventory",
	reportTitle:"Inventory",
	reportType: "filterByDate"
    }],    
});
var rReportsUS = new r.reports.us();