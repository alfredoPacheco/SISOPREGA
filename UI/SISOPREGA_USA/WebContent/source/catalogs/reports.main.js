enyo
	.kind({
	    name : "reports.main",
	    kind : enyo.VFlexBox,
	    reportSelected:null,
	    _gobackStack:[],
	    components : [ {
	            kind : "Toolbar",
	            name : "tbHeaderReports",
	            style : "max-height:10px",
	            className : "headerMain",
	            components : [	                  
	                  {
	                    name : 'btnGoBack',
	                    icon : "../SISOPREGA_WEB_LIB/images/command-menu/menu-icon-back.png",
	                    onclick : "goBack"
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
		components : [ {
		    kind : "reports.list",
		    name : "reportsList",
		    onSelectItem : "openReport",
		    label : "Reportes"
		}, {
		    kind : "reports.filter",
		    name : "filter",
		    onGetReport : "showReportFiltered"
		}, {
		    kind : "reports.filter.by_date",
		    name : "filterByDate",
		    onGetReport : "showReportFilteredByDate"
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
		    this.$.reportsPane.selectViewByName('filter');
		    break;
		case "filterByDate":
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
		_navigatingBack = true;
		if (this._gobackStack.length > 0) {
		    var objGB = this._gobackStack.pop();
		    objGB.paneMan.selectViewByName(objGB.paneName);
		    _navigatingBack = false;
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
		if (_navigatingBack == false) {
		    this._gobackStack.push({
			caption : inPreviousView.label,
			paneMan : inPreviousView.parent,
			paneName : inPreviousView.name
		    });
		}
		this.$.lblTitle.setContent(inView.label);
		if (this._gobackStack.length == 0) {
		    _goBackButton.setShowing(!1);		    
		} else {
		    _goBackButton.setShowing(1);
		}
		if (inView.name == "reportsList") {
		    inView.reset();
		}		
	    }
	});
