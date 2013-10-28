enyo.kind({
    name : "r.reports.us",
    kind : enyo.Object,
    arrObj : [ {
	importantInfo : "Lado Mexicano - Recepciones",
	secundaryInfo : "Muestra cantidades de cabezas y peso del ganado recibido filtrado por fechas y ganadero, si no especifica el ganadero se obtiene informacion de todos.",
	reportUrl: "/ReportingGateway/GanadoRecibido",
	reportTitle:"Reporte de Recepciones",
	reportType: "filter"
	
    },{
	importantInfo : "Lado Mexicano - Inspecciones",
	secundaryInfo : "Muestra informacion de rechazos, en las fechas y ganadero especificados, si no se indica ganadero se obtiene informacion de todos.",
	reportUrl: "/ReportingGateway/InspeccionGanado",
	reportTitle:"Reporte de Inspección",
	reportType: "filter"
	
    },{
	importantInfo : "Lado Mexicano - Alimento",
	secundaryInfo : "Resumen de alimento entregado, filtrado por fechas y ganadero, si no se especifica ganadero se obtiene informacion de todos.",
	reportUrl: "/ReportingGateway/ReporteAlimento",
	reportTitle:"Reporte de Alimento",
	reportType: "filter"
	
    },{
	importantInfo : "Lado Mexicano - Recepciones Activas",
	secundaryInfo : "Ganado que se actualmente se encuentra en los corrales del lado Mexicano.",
	reportUrl: "/ReportingGateway/GanadoActivoCorrales",
	reportTitle:"Reporte de Recepciones Activas",
	reportType: "direct"
	
    },{
	importantInfo : "Lado Mexicano - Lista de Cruce",
	secundaryInfo : "Muestra el orden en que cruzará ganado, (o cruzó si se especifican fechas pasadas)",
	reportUrl: "/ReportingGateway/ListaInspeccionHistorica",
	reportTitle:"Reporte de Lista de Cruce",
	reportType: "filterByDate"
	
    },{
	importantInfo : "Lado US - Hermana",
	secundaryInfo : "",
	reportUrl: "hermana",
	reportTitle:"Hermana",
	reportType: "direct"
    },{
	importantInfo : "Lado US - Ventas",
	secundaryInfo : "",
	reportUrl: "Ventas",
	reportTitle:"Ventas",
	reportType: "filter"
    },{
	importantInfo : "Lado US - Compras",
	secundaryInfo : "",
	reportUrl: "Compras",
	reportTitle:"Compras",
	reportType: "filter"
    },{
	importantInfo : "Lado US - Inventario",
	secundaryInfo : "",
	reportUrl: "Inventario",
	reportTitle:"Inventario",
	reportType: "filter"
    }],    
});
var rReportsUS = new r.reports.us();