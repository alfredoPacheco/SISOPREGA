enyo.kind({
	name : "reports.main",
	kind : enyo.VFlexBox,
	reportName : "",
	components : [ {
		kind : enyo.Pane,
		flex : 1,
		name : "mainPane",
		transitionKind : "enyo.transitions.LeftRightFlyin",
		components : [ {
			kind : "reports.select",
			name : "selection",
			onReceptions : "showReceptions",
			onInspections : "showInspections",
			onFeed : "showFeed"
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
	showReceptions : function() {
		this.showGenericReport('reception', 'Reporte de Recepciones', 'filterByDate');
	},
	showInspections : function() {
		this.showGenericReport('inspection', 'Reporte de Inspección', 'filter');
	},
	showFeed : function() {
		this.showGenericReport('feed', 'Reporte de Alimento', 'filter');
	},
	showGenericReport : function(reportName, title, viewName) {
		this.reportName = reportName;
		_objMainHeader.setContent(title);
		this.addGoBackAction();
		this.$.mainPane.selectViewByName(viewName);
	},
	
	showReportsResults : function() {
		
		if (this.reportName == 'reception'){
			var parameters = this.$.filterByDate.getParams();
			window.open('/ReportingGateway/GanadoRecibido?fromDate='+ parameters.start_date+'&toDate='+ parameters.end_date,'_blank');
			window.focus();
		}
		if (this.reportName == 'inspection'){
			var parameters = this.$.filter.getParams();
			window.open('/ReportingGateway/CattleInspection?fromDate='+ parameters.start_date+'&toDate='+ parameters.end_date +'&rancherId='+parameters.rancher_id, '_blank');
			window.focus();
		}
		if (this.reportName == 'feed'){
			var parameters = this.$.filter.getParams();
			window.open('/ReportingGateway/ReporteAlimento?fromDate='+ parameters.start_date+'&toDate='+ parameters.end_date +'&rancherId='+parameters.rancher_id,'_blank');
			window.focus();
		}
		cacheMan.goBack();
	},
	addGoBackAction : function() {
		_gobackStack.push({
			caption : "Reportes",
			paneMan : this.$.mainPane,
			paneName : "selection"
		});
	}
});
