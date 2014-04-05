enyo
	.kind(
	{
	  name : "hermana.de.tabs",
	  kind : "VFlexBox",
	  events :
	  {
		onAddClass : ""
	  },
	  summary : null,
	  released : [],
	  cattleClassName : "",
	  components : [
		  {
			kind : "Popup",
			name : "popNewCharge",
			dismissWithClick : true,
			layoutKind : "VFlexLayout",
			style : "overflow: hidden",
			width : "95%",
			height : "30%",
			style : "max-width: 600px;max-height: 140px;",
			scrim : true,
			components : [
			{
			  kind : "catalogs.expenseConcept.form",
			  name : "concepto",
			  onAdd : "addNewCharge",
			  onCancel : "closePopUp",
			  flex : 1
			} ]
		  },
		  {
			name : "tabButtons",
			kind : "TabGroup",
			width : "750px",
			components : [
				{
				  kind : "TabButton",
				  name : "btnCorte",
				  tab : 1,
				  content : "Sort",
				  onclick : "tabClicked",
				  height : "30px",
				  style : "-webkit-border-image: none;color: white;background-color: chocolate;border-style: solid;border-width: 1px 1px 0px 1px;border-color: #333;border-radius: 30px 10px 0px 0px;font-size:15px;padding: 5px 0px 0px 0px;"

				},
				{
				  kind : "TabButton",
				  name : "btnCorteExportador",
				  tab : 2,
				  content : "Exporter Sort",
				  onclick : "tabClicked",
				  height : "30px",
				  style : "-webkit-border-image: none;color: white;background-color: chocolate;border-style: solid;border-width: 1px 1px 0px 1px;border-color: #333;border-radius: 30px 10px 0px 0px;font-size:15px;padding: 5px 0px 0px 0px;"
				},
				{
				  kind : "TabButton",
				  name : "btnGastos",
				  tab : 3,
				  content : "Expenses",
				  onclick : "tabClicked",
				  height : "30px",
				  style : "-webkit-border-image: none;color: white;background-color: chocolate;border-style: solid;border-width: 1px 1px 0px 1px;border-color: #333;border-radius: 30px 10px 0px 0px;font-size:15px;padding: 5px 0px 0px 0px;"
				},
				{
				  kind : "TabButton",
				  name : "btnSummary",
				  tab : 4,
				  content : "Summary",
				  onclick : "tabClicked",
				  height : "30px",
				  style : "-webkit-border-image: none;color: white;background-color: chocolate;border-style: solid;border-width: 1px 1px 0px 1px;border-color: #333;border-radius: 30px 10px 0px 0px;font-size:15px;padding: 5px 0px 0px 0px;"
				} ]
		  },
		  {
			kind : "VFlexBox",
			name : "tabCorte",
			className : "tab",
			showing : true,
			height : "285px",
			style : "border: 1px solid;padding-top: 10px;",
			components : [
				{
				  kind : "HFlexBox",
				  components : [
					  {
						kind : "controls.autocomplete",
						name : "classAutoComplete",
						hint : "Class",
						inputKind : "ToolInput",
						flex : 1,
						contentPack : "end",
						onEnter : "emularTabulacionConEnter",
						height : "35px",
						width : "300px",
						style : "margin-left:5px;",
						onSelectItem : "clase_select"
					  },
					  {
						kind : enyo.IconButton,
						icon : "../SISOPREGA_WEB_LIB/images/menu-icon-new.png",
						onclick : "doAddClass",
						height : "23px",
						width : "32px",
						style : "padding: 2px;margin-top: 0px;background-color: #DABD8B;margin-left:1px;"
					  },
					  {
						kind : "controls.autocomplete",
						name : "penAutoComplete",
						hint : "Pen",
						inputKind : "ToolInput",
						flex : 1,
						contentPack : "end",
						onEnter : "emularTabulacionConEnter",
						height : "35px",
						width : "200px",
						style : "margin-left:10px;"
					  },
					  {
						kind : "ToolInput",
						name : "headCount",
						style : "width:20%",
						hint : "Heads",
						height : "35px",
						width : "200px",
						style : "margin-left:10px;"
					  },
					  {
						kind : "ToolInput",
						name : "weight",
						style : "width:20%",
						hint : "Weight",
						height : "35px",
						width : "200px",
						style : "margin-left:10px;"
					  },
					  {
                        content : '<button type="button" style="border: 0;background-color: transparent;margin: 0px;padding: 0px;color: #292929;font-size: 16px;">Add</button>',
                        allowHtml : true,
                        onclick : "agregarCorte",
                        onmousedown : "buttonDown",
                        onmouseup : "buttonUp",
                        onmouseout : "buttonUp",
                        onmouseover : "buttonDown",
                        className : "enyo-button",
                        style : "padding: 2px;margin-top: 0px;background-color: #DABD8B;margin-left:1px;height: 24px;"
                      }
//					  {
//						kind : enyo.IconButton,
//						icon : "../SISOPREGA_WEB_LIB/images/menu-icon-new.png",
//						className : "enyo-button-affirmative",
//						onclick : "agregarCorte",
//						height : "22px",
//						width : "23px",
//						style : "padding: 2px;margin-top: 0px;margin-right:5px;margin-left:10px;"
//					  } 
					  
					  ]
				},
				{
				  kind : "HFlexBox",
				  name : "detailDescription",
				  style : "font-size:13px;margin-left: 9px;",
				  height : "17px"
				},
				{
				  kind : "hermana.corte.list",
				  name : "listaCorte",
				  onRemoveCorte : "corteRemoved",
				  flex : 1
				} ]
		  },
		  {
			kind : "VFlexBox",
			name : "tabCorteExportador",
			className : "tab",
			showing : false,
			height : "285px",
			style : "border: 1px solid;padding-top: 10px;",
			components : [
				{
				  kind : "HFlexBox",
				  align : "stretch",
				  height : "35px",
				  components : [
					  {
						kind : "controls.autocomplete",
						name : "classAutoCompleteExpo",
						inputKind : "ToolInput",
						hint : "Class",
						flex : 1,
						contentPack : "end",
						onEnter : "emularTabulacionConEnter",
						height : "35px"
					  },
					  {
						kind : "ToolInput",
						name : "lblCorralExpo",
						flex : 1,
						contentPack : "end",
						hint : "",
						height : "35px",
						disabled : true
					  },
					  {
						kind : "ToolInput",
						name : "lblHeadsExpo",
						flex : 1,
						contentPack : "end",
						hint : "",
						height : "35px",
						disabled : true
					  },
					  {
						kind : "ToolInput",
						name : "lblWeightExpo",
						flex : 1,
						contentPack : "end",
						hint : "",
						height : "35px",
						disabled : true
					  },
					  {
                        content : '<button type="button" style="border: 0;background-color: transparent;margin: 0px;padding: 0px;color: #292929;font-size: 16px;">Update</button>',
                        allowHtml : true,
                        onclick : "reClassify",
                        onmousedown : "buttonDown",
                        onmouseup : "buttonUp",
                        onmouseout : "buttonUp",
                        onmouseover : "buttonDown",
                        className : "enyo-button",
                        style : "padding: 2px;margin-top: 0px;background-color: #DABD8B;margin-left:1px;height: 23px;"
                      },
//					  {
//						kind : enyo.IconButton,
//						icon : "../SISOPREGA_WEB_LIB/images/menu-icon-new.png",
//						className : "enyo-button-affirmative",
//						onclick : "reClassify",
//						style : "padding: 2px;margin-top: 0px;width: 23px;height: 22px;"
//					  }
                      ]
				},
				{
				  kind : "hermana.corte.list",
				  flex : 1,
				  name : "listaCorteExpo",
				  onRemoveCorte : "clearCorteExpoDataEntry",
				  onCorteSelected : "setupCorteSelected"
				} ]
		  },
		  {
			kind : "VFlexBox",
			name : "tabGastos",
			className : "tab",
			showing : false,
			height : "285px",
			style : "border: 1px solid;padding-top: 10px;",
			components : [
				{
				  kind : "HFlexBox",
				  components : [
					  {
						kind : "controls.autocomplete",
						name : "charge",
						hint : "Concept",
						inputKind : "ToolInput",
						flex : .4,
						contentPack : "end",
						onSelectItem : "chargeSelected",
						onEnter : "chargeSelected",
						height : "35px"
					  },
					  {
						kind : enyo.IconButton,
						icon : "../SISOPREGA_WEB_LIB/images/menu-icon-new.png",
						onclick : "showNewCharge",
						height : "22px",
						width : "23px",
						style : "padding: 2px;margin-top:0px;background-color: #DABD8B;"
					  },
					  {
						kind : "ToolInput",
						name : "charge_price",
						hint : "Amount",
						height : "35px"
					  },
					  {
						kind : enyo.IconButton,
						icon : "../SISOPREGA_WEB_LIB/images/menu-icon-new.png",
						className : "enyo-button-affirmative",
						onclick : "addCharge",
						height : "22px",
						width : "23px",
						style : "padding: 2px;margin-top:0px;"
					  } ]
				},
				{
				  kind : "hermana.gastos.list",
				  name : "chargeList",
				  flex : 1
				} ]
		  },
		  {
			kind : "VFlexBox",
			name : "tabSummary",
			className : "tab",
			showing : false,
			height : "300px",
			style : "border: 1px solid;padding-top: 10px;font-size:14px;",
			components : [
				{
				  kind : "maklesoft.DataTable",
				  name : "summary",
				  rowCount : 5,
				  colCount : 5,
				  selectionMode : maklesoft.DataTable.SelectionMode.NONE,
				  editable : false,
				  columnNames : [ "Heads", "Weight (Kg)", "Weight (Lb)",
					  "Avg Pounds" ],
				  showColumnNames : true,
				  showRowNumbers : true,
				  rowNames : [ "Mexico Arrival", "Rejects",
					  "Imported after rejects", "Net Weight" ],
				  cellClass : function(rowIndex, colIndex, data) {
					var className = "maklesoft-datatable-cell";
					if (typeof data == "number") {
					  className += " maklesoft-datatable-number";
					}
					return className;
				  }
				},
				{
				  kind : "HFlexBox",
				  components : [
				  {
					width : "473px"
				  },
				  {
					kind : "maklesoft.DataTable",
					name : "summaryTotal",
					width : "270px",
					rowCount : 2,
					colCount : 2,
					selectionMode : maklesoft.DataTable.SelectionMode.NONE,
					editable : false,
					showColumnNames : false,
					showRowNumbers : true,
					rowNames : [ "Increase", "Percentage" ],
					cellClass : function(rowIndex, colIndex, data) {
					  var className = "maklesoft-datatable-cell";
					  if (typeof data == "number") {
						className += " maklesoft-datatable-number";
					  }
					  return className;
					}
				  }

				  ]
				} ]
		  } ],
	  ready : function() {
		this.$.listaCorteExpo.$.rowContainer.setConfirmCaption("Restore");
		this.$.listaCorteExpo.isForExporter = true;
		this.tabClicked(this.$.btnCorte);

		this.$.lblCorralExpo.$.input.applyStyle("-webkit-text-fill-color",
			"black");
		this.$.lblCorralExpo.$.input.applyStyle("opacity", "1");

		this.$.lblHeadsExpo.$.input.applyStyle("-webkit-text-fill-color",
			"black");
		this.$.lblHeadsExpo.$.input.applyStyle("opacity", "1");

		this.$.lblWeightExpo.$.input.applyStyle("-webkit-text-fill-color",
			"black");
		this.$.lblWeightExpo.$.input.applyStyle("opacity", "1");

	  },
	  tabClicked : function(inSender, inEvent) {

		if (!this.summary && inSender.tab == 3) {
		  cacheMan.setMessage('',
			  'There is no sort record selected yet.');
		  return false;
		}

		this.$.btnCorte.applyStyle("background-color", "chocolate");
		this.$.btnCorteExportador.applyStyle("background-color", "chocolate");
		this.$.btnGastos.applyStyle("background-color", "chocolate");
		this.$.btnSummary.applyStyle("background-color", "chocolate");

		inSender.applyStyle("background-color", "#333");

		switch (inSender.tab) {
		case 1:
		  this.showCorte();
		  break;
		case 2:
		  this.showCorteExportador();
		  this.$.lblCorralExpo.applyStyle("visibility", "hidden");
		  this.$.listaCorteExpo.$.control2.applyStyle("visibility","hidden");
		  break;
		case 3:
		  this.showGastos();
		  break;
		case 4:
		  this.showSummary();
		  break;
		}
	  },
	  showCorte : function() {
		this.$.tabCorte.setShowing(true);
		this.$.tabCorteExportador.setShowing(false);
		this.$.tabGastos.setShowing(false);
		this.$.tabSummary.setShowing(false);
	  },
	  showCorteExportador : function() {
		this.$.tabCorte.setShowing(false);
		this.$.tabCorteExportador.setShowing(true);
		this.$.tabGastos.setShowing(false);
		this.$.tabSummary.setShowing(false);
	  },
	  showGastos : function() {
		this.$.tabCorte.setShowing(false);
		this.$.tabCorteExportador.setShowing(false);
		this.$.tabGastos.setShowing(true);
		this.$.tabSummary.setShowing(false);
	  },
	  showSummary : function() {
		this.$.tabCorte.setShowing(false);
		this.$.tabCorteExportador.setShowing(false);
		this.$.tabGastos.setShowing(false);
		this.$.tabSummary.setShowing(true);
	  },
	  setCattleClass : function(cattleClass, cattleClassName) {
		this.$.classAutoComplete.setItems(crudCattleQuality
			.getFilteredList(cattleClass));
		this.cattleClassName = cattleClassName;
	  },
	  setSummary : function(summaryObj) {
		this.summary = summaryObj;
	  },
	  setReleased : function(released) {
		this.released = released;
	  },
	  resetSummaryTable : function() {
		var data = [];
		var mx_dataRow = [ 0, 0, 0, 0 ];
		data.push(mx_dataRow);

		var rejects_dataRow = [ 0, 0, 0 ];
		data.push(rejects_dataRow);

		var trade_dataRow = [ 0, 0, 0, 0 ];
		data.push(trade_dataRow);

		var net_dataRow = [ 0, 0, 0, 0 ];
		data.push(net_dataRow);

		this.$.summary.setData(data);

		var total_data = [];

		var total_deltaRow = [];
		total_deltaRow.push(0);
		total_data.push(total_deltaRow);

		var total_pctRow = [];
		total_pctRow.push(0 + ' %');
		total_data.push(total_pctRow);

		this.$.summaryTotal.setData(total_data);

	  },
	  updateTableContents : function() {
		var data = [];

		var mx_dataRow = [];
		mx_dataRow.push(utils.formatNumberThousands(this.summary.hc));
		mx_dataRow.push(utils.formatNumberThousands(this.summary.kg));
		mx_dataRow.push(utils.formatNumberThousands(this.summary.lbs.toFixed(1)));
		mx_dataRow.push(utils.formatNumberThousands(this.summary.avg.toFixed(1)));
		data.push(mx_dataRow);

		var rejects_dataRow = [];
		rejects_dataRow.push(utils
			.formatNumberThousands(this.summary.rejects_hc));
		rejects_dataRow.push(utils
			.formatNumberThousands(this.summary.rejects_kgs));
		rejects_dataRow.push(utils
			.formatNumberThousands(this.summary.rejects_lbs.toFixed(1)));
		data.push(rejects_dataRow);

		var trade_dataRow = [];
		trade_dataRow.push(utils.formatNumberThousands(this.summary.trade_hc));
		trade_dataRow.push(utils.formatNumberThousands(this.summary.trade_kgs.toFixed(1)));
		trade_dataRow.push(utils.formatNumberThousands(this.summary.trade_lbs.toFixed(1)));
		trade_dataRow.push(utils.formatNumberThousands(this.summary.trade_avg.toFixed(1)));
		data.push(trade_dataRow);

		var net_dataRow = [];
		net_dataRow.push(utils.formatNumberThousands(this.summary.net_hc));
		net_dataRow.push(utils.formatNumberThousands(this.summary.net_kgs.toFixed(1)));
		net_dataRow.push(utils.formatNumberThousands(this.summary.net_lbs.toFixed(1)));
		net_dataRow.push(utils.formatNumberThousands(this.summary.net_avg.toFixed(1)));
		data.push(net_dataRow);

		this.$.summary.setData(data);

		var total_data = [];

		var total_deltaRow = [];
		total_deltaRow.push(utils.formatNumberThousands(this.summary.delta));
		total_data.push(total_deltaRow);

		var total_pctRow = [];
		total_pctRow.push(this.summary.delta_pct + ' %');
		total_data.push(total_pctRow);

		this.$.summaryTotal.setData(total_data);

		var corteDelta = this.summary.trade_hc - this.summary.net_hc;
		var detailDescription = "Sorting "
			+ utils.formatNumberThousands(this.summary.trade_hc) + " "
			+ this.cattleClassName + ", "
			+ utils.formatNumberThousands(corteDelta) + " to sort.";

		this.$.detailDescription.setContent(detailDescription);
	  },
	  agregarCorte : function() {
		var sError = "";
		var occupiedPens = crudInventory.getPensList();
		for ( var i = 0; i < occupiedPens.length; i++) {
		  var isPenOccupied = this.$.penAutoComplete.getIndex() == utils.parseToNumber(occupiedPens[i].value);
		  var isSameQuality = occupiedPens[i].object.qualityId == this.$.classAutoComplete.getIndex();
		  if (isPenOccupied && !isSameQuality) {
			var cattleQuality = crudCattleQuality
				.getByID(occupiedPens[i].object.qualityId);
			sError = "Error. The Pen " + occupiedPens[i].caption
				+ " is already occupied by cattle class "
				+ cattleQuality.qualityName;
			break;
		  }
		}
		
		if(utils.parseToNumber(this.summary.net_hc) + utils.parseToNumber(this.$.headCount.getValue()) > utils.parseToNumber(this.summary.trade_hc)){
		  sError = "Error. You are trying to sort more heads than imported.";
		}
		
		if(sError != ""){
		  cacheMan.setMessage("",sError);
		  return;
		}
		
		var cutRecord =
		{
		  barnyardId : this.$.penAutoComplete.getIndex(),
		  pen_name : this.$.penAutoComplete.getValue(),
		  qualityId : this.$.classAutoComplete.getIndex(),
		  cattleClassName : this.$.classAutoComplete.getValue(),
		  heads : this.$.headCount.getValue(),
		  weight : this.$.weight.getValue()
		};

		cacheCorte.add(cutRecord);

		this.$.listaCorte.setCortes(cacheCorte.get());
		this.$.listaCorteExpo.setCortes(cacheCorte.getExpo());

		this.clearCorteDataEntry();
		this.calculateSummaryFromCorte(cutRecord);
		this.$.classAutoComplete.setFocus();
	  },
	  calculateSummaryFromCorte : function(cutRecord) {
		this.summary.net_hc += utils.parseToNumber(cutRecord.heads);
		this.summary.net_lbs += utils.parseToNumber(cutRecord.weight);
		this.summary.net_kgs += Math.floor(cutRecord.weight * 45.3592) / 100;
		this.summary.net_avg = this.summary.net_hc == 0 ? 0 : Math
			.floor(this.summary.net_lbs / this.summary.net_hc * 100) / 100;

		this.summary.delta = (this.summary.net_lbs - this.summary.trade_lbs).toFixed(0);
		//TODO
		this.summary.delta_pct = ((this.summary.delta / this.summary.trade_lbs) * 100).toFixed(1);
		if((this.summary.net_lbs - this.summary.trade_lbs) < 0){
		  this.$.summaryTotal.setRowNames(["Shrink","Percentage"]);
		}
		else{
		  this.$.summaryTotal.setRowNames(["Increase","Percentage"]);
		}
		this.updateTableContents();
	  },
	  clearCorteDataEntry : function() {
		this.$.penAutoComplete.clear();
		this.$.classAutoComplete.clear();
		this.$.headCount.setValue('');
		this.$.weight.setValue('');
		this.$.penAutoComplete.$.textField.forceFocus();
	  },
	  clearCorteExpoDataEntry : function() {
		this.$.lblCorralExpo.setValue("");
		this.$.lblHeadsExpo.setValue("");
		this.$.lblWeightExpo.setValue("");
		this.$.classAutoCompleteExpo.clear();
	  },
	  corteRemoved : function() {
		this.clearCorteSummary();
		var cortes = cacheCorte.get();
		for ( var i = 0; i < cortes.length; i++) {
		  this.calculateSummaryFromCorte(cortes[i]);
		}
		this.$.listaCorte.loadCortes();
		this.$.listaCorteExpo.loadCortes(cacheCorte.getExpo());
	  },
	  clearCorteSummary : function() {
		this.summary.net_hc = 0;
		this.summary.net_lbs = 0.0;
		this.summary.net_kgs = 0.0;
		this.summary.net_avg = 0.0;

		this.summary.delta = (this.summary.net_lbs - this.summary.trade_lbs).toFixed(0);
		this.summary.delta_pct = ((this.summary.delta / this.summary.trade_lbs) * 100).toFixed(1);
		if((this.summary.net_lbs - this.summary.trade_lbs) < 0){
		  this.$.summaryTotal.setRowNames(["Shrink","Percentage"]);
		}
		else{
		  this.$.summaryTotal.setRowNames(["Increase","Percentage"]);
		}
		  
		this.updateTableContents();
	  },
	  chargeSelected : function() {
		if (this.$.charge.getIndex() > -1) {
		  // Calculate price from formula
		  var charge = crudExpenseConcept.getByID(this.$.charge.getIndex());
		  this.$.charge_price.setValue(this.calcularGasto(charge));
		}
	  },
	  calcularGasto : function(charge) {
		var formula = '';
		if (charge)
		  formula = charge.expenseFormula;
		// Replace arrived to Mexico
		formula = formula.replace('[heads]', this.summary.hc);
		formula = formula.replace('[pounds]', this.summary.lbs);
		formula = formula.replace('[kilos]', this.summary.kg);

		// Replace rejects
		formula = formula.replace('[rejectHeads]', this.summary.rejects_hc);
		formula = formula.replace('[rejectPounds]', this.summary.rejects_lbs);
		formula = formula.replace('[rejectKilos]', this.summary.rejects_kgs);

		// Replace cross left over
		formula = formula.replace('[importedHeads]', this.summary.trade_hc);
		formula = formula.replace('[importedPounds]', this.summary.trade_lbs);
		formula = formula.replace('[importedKilos]', this.summary.trade_kgs);

		// Replace net
		formula = formula.replace('[netHeads]', this.summary.net_hc);
		formula = formula.replace('[netPounds]', this.summary.net_lbs);
		formula = formula.replace('[netKilos]', this.summary.net_kg);

		// Evaluate expresion
		var calculated = null;
		if (formula != "") {
		  calculated = eval(formula);
		}

		return calculated;

	  },
	  addCharge : function() {
		if (this.$.charge.getIndex() > -1) {
		  var charge = crudExpenseConcept.getByID(this.$.charge.getIndex());
		  charge.price = this.$.charge_price.getValue();
		  this.$.chargeList.addCharge(charge);
		  this.$.charge.setIndex(-1);
		  this.$.charge_price.setValue("");
		  this.$.charge.setValue("");
		} else {
		  cacheMan.setMessage("", "Unknown expense concept.");
		}
	  },
	  addCookiedCharges : function() {
		// Clean up charges
		this.$.chargeList.arrData = [];
		this.$.chargeList.iSummary = 0;
		this.$.chargeList.updateList();

		var charges = this.chargesArrayFromIndexString(utils
			.getCookie('expenses'));
		for ( var i = 0; i < charges.length; i++) {
		  var charge = charges[i];
		  if (charge) {
			charge.price = this.calcularGasto(charge);
			this.$.chargeList.addCharge(charge);
		  }
		}
	  },
	  chargesArrayFromIndexString : function(indexString) {
		var chargesArray = [];

		if (indexString == null || indexString == '')
		  return chargesArray;

		var indexes = indexString.split(",");
		for ( var i = 0; i < indexes.length; i++) {
		  var expenseConceptId = indexes[i];
		  if (expenseConceptId != '') {
			var charge = crudExpenseConcept.getByID(expenseConceptId);
			chargesArray.push(charge);
		  }
		}

		return chargesArray;
	  },
	  showNewCharge : function() {
		this.$.popNewCharge.openAtCenter();
	  },
	  closePopUp : function() {
		this.$.charge.setIndex(-1);
		this.$.charge_price.setValue(''), this.$.popNewCharge.close();
	  },
	  addNewCharge : function(inSender, result) {
		this.$.charge.setItems(crudExpenseConcept.getList());

		var justCreated = result.records[0];
		this.$.charge.setIndex(justCreated.expenseConceptId);

		this.$.popNewCharge.close();
		cacheMan.hideScrim();
	  },
	  setupCorteSelected : function() {
		if (this.$.listaCorteExpo.iSelected == undefined) {
		  this.$.lblCorralExpo.setValue("");
		  this.$.lblHeadsExpo.setValue("");
		  this.$.lblWeightExpo.setValue("");
		  this.$.classAutoCompleteExpo.setIndex(-1);

		  return false;
		}

		var cortes = this.$.listaCorteExpo.cortes;
		var selectedCorte = cortes[this.$.listaCorteExpo.iSelected];

		this.$.lblCorralExpo.setValue("Pen: " + selectedCorte.pen_name);
		this.$.lblHeadsExpo.setValue("Heads: "
			+ utils.formatNumberThousands(selectedCorte.heads));
		this.$.lblWeightExpo.setValue("Weight: "
			+ utils.formatNumberThousands(selectedCorte.weight) + " lbs.");
		this.$.classAutoCompleteExpo.setIndex(selectedCorte.qualityId);
	  },
	  reClassify : function() {
		if (this.$.listaCorteExpo.iSelected == -1) {
		  cacheMan.setMessage("",
			  "There is no a selected record for reclassification");
		  return false;
		}

		// set the new class quality Id and name in the corteExportador cached record
		var selectedIdx = this.$.listaCorteExpo.iSelected;
		var selectedExpoRecord = this.$.listaCorteExpo.cortes[selectedIdx];
		
		if(selectedExpoRecord.qualityId == -1) {
		  // New record classified, set the new quality to it's expo sort sequences
		  for(var i = 0; i<selectedExpoRecord.sequences.length; i++){
			var expoCut = cacheCorte.getExpoBySeqNQuality(selectedExpoRecord.sequences[i], -1);
			expoCut.qualityId = this.$.classAutoCompleteExpo.getIndex();
			expoCut.cattleClassName = this.$.classAutoCompleteExpo.getValue();
		  }
		} else {
		  // Reclassify classified record.
		  for(var i=0; i<selectedExpoRecord.sequences.length; i++){
			var expoCut = cacheCorte.getExpoBySeqNQuality(selectedExpoRecord.sequences[i], selectedExpoRecord.qualityId);
			expoCut.qualityId = this.$.classAutoCompleteExpo.getIndex();
			expoCut.cattleClassName = this.$.classAutoCompleteExpo.getValue();
		  }
		}
		
		cacheCorte.simplifyCortesExpo();
		this.$.listaCorteExpo.setCortes(cacheCorte.getExpo());
		this.clearCorteExpoDataEntry();
	  },
	  clase_select : function(inSender) {
		var filter = [];
		var occupied = {};
		var allPens = enyo.clone(crudPen.getListUsaPens());
		var items = crudInventory.getPensList();
		for ( var i = 0; i < items.length; i++) {
		  occupied[items[i].value] = items[i];
		  if (items[i].object.qualityId == this.$.classAutoComplete.getIndex()) {
			filter.push(items[i]);
		  }
		}

		for ( var j = 0; j < allPens.length; j++) {
		  if (!occupied.hasOwnProperty(allPens[j].value)) {
			filter.push(allPens[j]);
		  }
		}

		this.$.penAutoComplete.setFilter(filter);
		this.$.penAutoComplete.clear();
		this.$.penAutoComplete.useFilter();
	  },buttonDown : function(inSender, inEvent) {
        if (inEvent.which) {
          inSender.setClassName("enyo-button enyo-button-hot enyo-button-down");
        }
      },
      buttonUp : function(inSender, inEvent) {
        inSender.setClassName("enyo-button");
      },
	});