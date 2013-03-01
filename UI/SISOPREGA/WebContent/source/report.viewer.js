enyo.kind({
	name : "report.viewer",
	kind : enyo.VFlexBox,
	reportName : "",
	components : [ {
		kind : enyo.Pane,
		flex : 1,
		name : "mainPane",
		transitionKind : "enyo.transitions.LeftRightFlyin",
		components : [ {
			name : "reportContainer", allowHtml:true
		}]
	}, ],
	showReport : function(reportName){
//		this.addGoBackAction();
//		this.parent.selectViewByName("reportViewer");
		this.$.reportContainer.setContent("<object data= '" + reportName + "' type='application/pdf' width='100%' height='100%'>"+
		  "<p>It appears you don't have a PDF plugin for this browser." + 
		  "No biggie... you can <a href='" + reportName + "'>click here to" +
		  "download the PDF file.</a></p></object>");
		
	},
	addGoBackAction : function() {
		_gobackStack.push({
			caption : "Reportes",
			paneMan : this.$.mainPane,
			paneName : this.$.mainPane.getViewName(), //"selection",
//			cbObj:		this,
//			cbMethod:  "whenBack"
		});
	},
	whenBack:function(){
		this.$.reportContainer.setContent("");
	}
});




//function openReport(parentPane, reportName){
//	enyo.$.sisoprega.$.reportViewer.showReport(reportName);
////	_gobackStack.push({caption:_objMainHeader.getContent(),paneMan:parentPane,paneName:parentPane.getViewName()});
//	_gobackStack.push({caption:_objMainHeader.getContent(),paneMan:enyo.$.sisoprega.$.mainPane,paneName:this.$.mainPane.getViewName()});
//}


