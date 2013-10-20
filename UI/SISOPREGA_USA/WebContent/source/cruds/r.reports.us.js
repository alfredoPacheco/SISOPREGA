enyo.kind({
    name : "r.reports.us",
    kind : enyo.Object,
    arrObj : [ {
	importantInfo : "Recepciones",
	secundaryInfo : "Muestra cantidades de cabezas y peso del ganado recibido filtrado por fechas y ganadero, si no especifica el ganadero se obtiene informacion de todos.",
	reportUrl: "/ReportingGateway/GanadoRecibido",
	reportTitle:"Reporte de Recepciones",
	reportType: "filter"
	
    },{
	importantInfo : "Inspecciones",
	secundaryInfo : "Muestra informacion de rechazos, en las fechas y ganadero especificados, si no se indica ganadero se obtiene informacion de todos.",
	reportUrl: "/ReportingGateway/InspeccionGanado",
	reportTitle:"Reporte de Inspección",
	reportType: "filter"
	
    },{
	importantInfo : "Alimento",
	secundaryInfo : "Resumen de alimento entregado, filtrado por fechas y ganadero, si no se especifica ganadero se obtiene informacion de todos.",
	reportUrl: "/ReportingGateway/ReporteAlimento",
	reportTitle:"Reporte de Alimento",
	reportType: "filter"
	
    },{
	importantInfo : "Recepciones Activas",
	secundaryInfo : "Ganado que se actualmente se encuentra en los corrales del lado Mexicano.",
	reportUrl: "/ReportingGateway/GanadoActivoCorrales",
	reportTitle:"Reporte de Recepciones Activas",
	reportType: "direct"
	
    },{
	importantInfo : "Lista de Cruce",
	secundaryInfo : "Muestra el orden en que cruzará ganado, (o cruzó si se especifican fechas pasadas)",
	reportUrl: "/ReportingGateway/ListaInspeccionHistorica",
	reportTitle:"Reporte de Lista de Cruce",
	reportType: "filterByDate"
	
    },{
	importantInfo : "Hermana",
	secundaryInfo : "",
	reportUrl: "hermana",
	reportTitle:"Hermana",
	reportType: "filter"
	
    },{
	importantInfo : "Proforma",
	secundaryInfo : "",
	reportUrl: "Proforma",
	reportTitle:"Proforma",
	reportType: "filter"
    },{
	importantInfo : "Ventas",
	secundaryInfo : "",
	reportUrl: "Ventas",
	reportTitle:"Ventas",
	reportType: "filter"
    },{
	importantInfo : "Compras",
	secundaryInfo : "",
	reportUrl: "Compras",
	reportTitle:"Compras",
	reportType: "filter"
    },{
	importantInfo : "Inventario",
	secundaryInfo : "",
	reportUrl: "Inventario",
	reportTitle:"Inventario",
	reportType: "filter"
    }],    
});
var rReportsUS = new r.reports.us();