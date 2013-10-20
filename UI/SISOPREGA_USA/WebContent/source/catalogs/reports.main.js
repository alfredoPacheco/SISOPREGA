enyo
	.kind({
	    name : "reports.main",
	    kind : enyo.VFlexBox,
	    reportSelected:null,
	    _gobackStack:[],
	    _navigatingBack:false,
	    components : [ {
	            kind : "Toolbar",
	            name : "tbHeaderReports",
	            style : "max-height:10px",
	            className : "headerMain",
	            components : [	                  
	                  {
	                    name : 'btnGoBack',
	                    icon : "../SISOPREGA_WEB_LIB/images/command-menu/menu-icon-back.png",
	                    onclick : "goBack",
	                    showing: false	                    
	                  },
	                  {
	                    kind : "VFlexBox",
	                    name : 'lblTitle',
	                    allowHtml : true,
	                    flex : 1,
	                    style : "color:#FFF;border:none;font-size:15px; text-align:center;min-width:150px;",
	                    content : "Reportes"
	                  }
	                  
	            ]
	          },{
		kind : enyo.Pane,
		flex : 1,
		name : "reportsPane",
		transitionKind : "enyo.transitions.LeftRightFlyin",
		onSelectView: "selectView",
		components : [ {
		    kind : "reports.list",
		    name : "reportsList",
		    onSelectItem : "openReport",
		    label : "Reportes"
		}, {
		    kind : "reports.filter",
		    name : "filter",
		    onGetReport : "showReportFiltered",
		    label: ""
		}, {
		    kind : "reports.filter.by_date",
		    name : "filterByDate",
		    onGetReport : "showReportFilteredByDate",
		    label: ""
		}]
	    }, ],
	    ready:function(){
		this.$.reportsList.reset();
	    },
	    openReport:function(sender, report){
		this.addGoBackAction();
		this.reportSelected = report;
		switch(report.reportType){
		case "direct":
		    utils.openReport(report.reportUrl);
		    break;
		case "filter":
		    this.$.filter.label = report.reportTitle;
		    this.$.reportsPane.selectViewByName('filter');
		    break;
		case "filterByDate":
		    this.$.filterByDate.label = report.reportTitle;
		    this.$.reportsPane.selectViewByName('filterByDate');
		    break;		   
		}
	    },
	    showReportFiltered:function(){
		var parameters = this.$.filter.getParams();
		utils.openReport(this.reportSelected.reportUrl + "?fromDate="
			+ parameters.start_date
			+ '&toDate='
			+ parameters.end_date
			+ '&Id='
			+ parameters.rancher_id
			+ '&rancherId='
			+ parameters.rancher_id);
	    },
	    showReportFilteredByDate:function(){
		var parameters = this.$.filterByDate.getParams();
		utils.openReport(this.reportSelected.reportUrl + "?fromDate="
			+ parameters.start_date
			+ '&toDate='
			+ parameters.end_date);
	    },
	    goBack : function() {
		this._navigatingBack = true;
		if (this._gobackStack.length > 0) {
		    var objGB = this._gobackStack.pop();
		    objGB.paneMan.selectViewByName(objGB.paneName);
		    this._navigatingBack = false;
		    this.$.lblTitle.setContent(objGB.caption);
		    if (objGB.cbObj) {
			objGB.cbObj[objGB.cbMethod]();
		    }
		}
	    },
	    addGoBackAction : function() {
		this._gobackStack.push({
		    caption : this.$.lblTitle.getContent(),
		    paneMan : this.$.reportsPane,
		    paneName : this.$.reportsPane.getViewName()
		});
	    },
	    selectView : function(inSender, inView, inPreviousView) {

		if (inView.name == inPreviousView.name) {
		    return;
		}
		if (this._navigatingBack == false) {
		    this._gobackStack.push({
			caption : inPreviousView.label,
			paneMan : inPreviousView.parent,
			paneName : inPreviousView.name
		    });
		}
		this.$.lblTitle.setContent(inView.label);
		
		if (inView.name == "reportsList") {
		    this.$.btnGoBack.hide();
		} else {		
		    this.$.btnGoBack.show();
		}		
	    }
	});
