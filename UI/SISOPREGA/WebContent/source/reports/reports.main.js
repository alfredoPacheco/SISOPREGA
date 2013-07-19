enyo
	.kind({
	    name : "reports.main",
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
		    onActiveReceptions : "showActiveReceptions",
		    onInspectionForecast : "showInspectionForecast"
		}, {
		    kind : "reports.filter",
		    name : "filter",
		    onGetReport : "showReportsResults"
		}, {
		    kind : "reports.filter.by_date",
		    name : "filterByDate",
		    onGetReport : "showReportsResults"
		} ]
	    }, ],
	    showActiveReceptions : function() {
		utils.openReport('/ReportingGateway/GanadoActivoCorrales');
	    },
	    showReceptions : function() {
		this.showGenericReport('reception', 'Reporte de Recepciones',
			'filter');
	    },
	    showInspections : function() {
		this.showGenericReport('inspection', 'Reporte de Inspección',
			'filter');
	    },
	    showFeed : function() {
		this.showGenericReport('feed', 'Reporte de Alimento', 'filter');
	    },
	    showInspectionForecast : function() {
		this.showGenericReport('inspectionForecast',
			'Listas de Inspección', 'filterByDate');
	    },
	    showGenericReport : function(reportName, title, viewName) {
		this.reportName = reportName;
		_objMainHeader.setContent(title);
		this.addGoBackAction();
		this.$.reportsPane.selectViewByName(viewName);
	    },

	    showReportsResults : function() {

		if (this.reportName == 'reception') {
		    var parameters = this.$.filter.getParams();
		    utils
			    .openReport('/ReportingGateway/GanadoRecibido?fromDate='
				    + parameters.start_date
				    + '&toDate='
				    + parameters.end_date
				    + '&Id='
				    + parameters.rancher_id);
		}
		if (this.reportName == 'inspection') {
		    var parameters = this.$.filter.getParams();
		    utils
			    .openReport('/ReportingGateway/InspeccionGanado?fromDate='
				    + parameters.start_date
				    + '&toDate='
				    + parameters.end_date
				    + '&rancherId='
				    + parameters.rancher_id);
		}
		if (this.reportName == 'feed') {
		    var parameters = this.$.filter.getParams();
		    utils
			    .openReport('/ReportingGateway/ReporteAlimento?fromDate='
				    + parameters.start_date
				    + '&toDate='
				    + parameters.end_date
				    + '&rancherId='
				    + parameters.rancher_id);
		}

		if (this.reportName == 'inspectionForecast') {
		    var parameters = this.$.filterByDate.getParams();
		    utils
			    .openReport('/ReportingGateway/ListaInspeccionHistorica?fromDate='
				    + parameters.start_date
				    + '&toDate='
				    + parameters.end_date);
		}
	    },
	    addGoBackAction : function() {
		try {
		    _gobackStack.push({
			caption : "Reportes",
			paneMan : this.$.reportsPane,
			paneName : this.$.reportsPane.getViewName(), // "selection",
		    });
		} catch (e) {
		    // in iteration 2, this code is not in use
		}

	    },
	});
