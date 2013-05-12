enyo.kind({
	name : "reports.us.main",
	kind : enyo.VFlexBox,
	reportName : "",
	components : [ {
		kind : enyo.Pane,
		flex : 1,
		name : "reportsPane",
		transitionKind : "enyo.transitions.LeftRightFlyin",
		components : [ {
			kind : "reports.select",
			name : "selection",
			onReceptions : "showReceptions",
			onInspections : "showInspections",
			onFeed : "showFeed",
			onActiveReceptions:"showActiveReceptions",
			onInspectionForecast : "showInspectionForecast"
		}, {
			kind : "reports.filter",
			name : "filter",
			onGetReport : "showReportsResults"
		},{
			kind : "reports.filter.by_date",
			name : "filterByDate",
			onGetReport : "showReportsResults"
		}]
	}, ],
	showActiveReceptions : function(){
//	  window.open('/ReportingGateway/GanadoActivoCorrales','_blank');
		
//		reportViewer.openReport('/ReportingGateway/GanadoActivoCorrales');
		utils.openReport('/ReportingGateway/GanadoActivoCorrales');
//		this.$.reportsPane.selectViewByName("reportViewer");
//    	this.$.reportViewer.showReport('/ReportingGateway/GanadoActivoCorrales');
//    	this.addGoBackAction();
	},
	showReceptions : function() {
		this.showGenericReport('reception', 'Reporte de Recepciones', 'filter');
	},
	showInspections : function() {
		this.showGenericReport('inspection', 'Reporte de Inspección', 'filter');
	},
	showFeed : function() {
		this.showGenericReport('feed', 'Reporte de Alimento', 'filter');
	},
	showInspectionForecast : function(){
	  this.showGenericReport('inspectionForecast', 'Listas de Inspección', 'filterByDate');
	},
	showGenericReport : function(reportName, title, viewName) {
		this.reportName = reportName;
		_objMainHeader.setContent(title);
		this.addGoBackAction();
		this.$.reportsPane.selectViewByName(viewName);
	},
	
	showReportsResults : function() {
		
		if (this.reportName == 'reception'){
			var parameters = this.$.filterByDate.getParams();
//			window.open('/ReportingGateway/GanadoRecibido?fromDate='+ parameters.start_date+'&toDate='+ parameters.end_date,'_blank');
//			window.focus();
//			this.$.reportsPane.selectViewByName("reportViewer");
//			this.$.reportViewer.showReport('/ReportingGateway/GanadoRecibido?fromDate='+ parameters.start_date+'&toDate='+ parameters.end_date);
			utils.openReport('/ReportingGateway/GanadoRecibido?fromDate='+ parameters.start_date+'&toDate='+ parameters.end_date +'&rancherId='+parameters.rancher_id);
		}
		if (this.reportName == 'inspection'){
			var parameters = this.$.filter.getParams();
//			window.open('/ReportingGateway/InspeccionGanado?fromDate='+ parameters.start_date+'&toDate='+ parameters.end_date +'&rancherId='+parameters.rancher_id, '_blank');
//			window.focus();
//			this.$.reportsPane.selectViewByName("reportViewer");
//			this.$.reportViewer.showReport('/ReportingGateway/InspeccionGanado?fromDate='+ parameters.start_date+'&toDate='+ parameters.end_date +'&rancherId='+parameters.rancher_id);
			utils.openReport('/ReportingGateway/InspeccionGanado?fromDate='+ parameters.start_date+'&toDate='+ parameters.end_date +'&rancherId='+parameters.rancher_id);
		}
		if (this.reportName == 'feed'){
			var parameters = this.$.filter.getParams();
//			window.open('/ReportingGateway/ReporteAlimento?fromDate='+ parameters.start_date+'&toDate='+ parameters.end_date +'&rancherId='+parameters.rancher_id,'_blank');
//			window.focus();
//			this.$.reportsPane.selectViewByName("reportViewer");
//			this.$.reportViewer.showReport('/ReportingGateway/ReporteAlimento?fromDate='+ parameters.start_date+'&toDate='+ parameters.end_date +'&rancherId='+parameters.rancher_id);
			utils.openReport('/ReportingGateway/ReporteAlimento?fromDate='+ parameters.start_date+'&toDate='+ parameters.end_date +'&rancherId='+parameters.rancher_id);
		}

		if(this.reportName == 'inspectionForecast'){
		  var parameters = this.$.filterByDate.getParams();
//          window.open('/ReportingGateway/ListaInspeccionHistorica?fromDate='+ parameters.start_date+'&toDate='+ parameters.end_date,'_blank');
//          window.focus();
//          	this.$.reportsPane.selectViewByName("reportViewer");
//			this.$.reportViewer.showReport('/ReportingGateway/ListaInspeccionHistorica?fromDate='+ parameters.start_date+'&toDate='+ parameters.end_date);
			utils.openReport('/ReportingGateway/ListaInspeccionHistorica?fromDate='+ parameters.start_date+'&toDate='+ parameters.end_date);
		}
//		cacheMan.goBack();
	},
	addGoBackAction : function() {
	    try{
		_gobackStack.push({
			caption : "Reportes",
			paneMan : this.$.reportsPane,
			paneName : this.$.reportsPane.getViewName(), //"selection",
//			cbObj:		this,
//			cbMethod:  "whenBack"
		});
	    }catch(e){
		//in iteration 2, this code is not in use
	    }
		
	},
//	addGoBackAction : function() {
//		_gobackStack.push({
//			caption : "Reportes",
//			paneMan : this.$.reportsPane,
//			paneName : "selection"
//		});
//	}
});
