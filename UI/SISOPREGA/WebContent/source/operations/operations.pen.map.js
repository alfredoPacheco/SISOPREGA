enyo
	.kind({
	    name : "operations.pen.map",
	    arrReception : [ {
		caption : "Recepcion",
		value : 1
	    }, {
		caption : "Deseleccionar",
		value : 2
	    } ],
	    arrPostReception : [ {
		caption : "Editar",
		value : 5
	    }, {
		caption : "Enviar Mensaje",
		value : 11
	    }, {
		caption : "Alimento",
		value : 3
	    }, {
		caption : "Inspeccion",
		value : 4
	    }, {
		caption : "Liberar Corral",
		value : 6
	    }, {
		caption : "Cruce sin rechazos",
		value : 10
	    }, {
		caption : "Deseleccionar",
		value : 8
	    }, {
		caption : "Imprimir",
		value : 9
	    } ],
	    kind : enyo.VFlexBox,
	    flex : 1,
	    arrByMOver : {},
	    objSelected : null,
	    arrSelected : {},
	    arrSelectedOccupied : {},
	    arrBYbyRancherSelected : {},
	    sColorOccupied : "#ff7200",
	    sColorFree : "white",
	    sColorSelect : "lightgreen",
	    sColorSelectOccupied : "#9b7eb1",
	    className : "mapBG",
	    create : function() {
		this.inherited(arguments);
		this.$.rancherFilter.setItems(crudReception
			.getRanchersByReceptions());
	    },
	    components : [
		    {
			name : "options",
			kind : enyo.PopupSelect,
			onSelect : "actionSelected",
			items : []
		    },
		    {
			kind : enyo.BasicScroller,
			flex : 1,
			components : [ {
			    name : "cells",
			    kind : "VFlexBox",
			    align : "center",
			    pack : "center",
			    onclick : "cellsClick"
			}, ]
		    },
		    {
			kind : "Popup",
			name : "popMan",
			modal : true,
			dismissWithClick : false,
			layoutKind : "VFlexLayout",
			style : "overflow: hidden;max-height:360px;max-width:1000px;background-color:#DABD8B;font-size:15px;",
			height : "95%",
			width : "95%",
			scrim : true
		    },

		    {
			kind : "Toolbar",
			style : "height:20px;",
			components : [ {
			    kind : "controls.autocomplete",
			    flex : 1,
			    height : "36px;",
			    name : "rancherFilter",
			    hint : "Filtro por Ganadero",
			    onSelectItem : "rancherFilterChanged"
			}, {
			    kind : "Button",
			    name : "btnClearFilter",
			    className : "enyo-button-negative",
			    caption : "Remover Filtro / Selección",
			    onclick : "clearFilter"
			}

			]
		    } ],
	    ready : function() {
		this.last = this.$.cells;
		// this.addRow(true);
		this.addRow();
		this.addRowHeader();
		this.createCells("2E", -7, 4, "50px", "50px");
		this.splitRow();
		this.addCustomCell("corraman", "Corrales de <br/> Manejo",
			"100px", "50px");
		this.createCells("1E", 5, 6, "50px", "50px");
		this.splitRow();
		this.createCells("1E", 17, 8, "50px", "50px");

		this.addRow();
		this.createCells("2E", -8, 4, "50px", "50px");
		this.splitRow();
		this.createCells("1E", 2, 8, "50px", "50px");
		this.splitRow();
		this.createCells("1E", 18, 8, "50px", "50px");

		this.addRow(true);
		this.createCells("2D", -11, 1, "50px", "50px");
		this.createCells("2D", -7, 2, "50px", "50px");
		this.createCells("2D", -1, 1, "50px", "50px");
		this.splitRow();
		this.createCells("1D", 1, 8, "50px", "50px");
		this.splitRow();
		this.createCells("1D", 17, 8, "50px", "50px");

		this.addRow();
		this.createCells("2D", -12, 6, "33.33px", "25px");
		this.splitRow();
		this.createCells("1D", 2, 12, "33.33px", "25px");
		this.splitRow();
		this.createCells("1D", 26, 4, "100px", "25px");

		this.addRow(true);
		this.createCells("2C", -11, 6, "33.33px", "25px");
		this.splitRow();
		this.createCells("1C", 1, 12, "33.33px", "25px");
		this.splitRow();
		this.createCells("1C", 25, 4, "100px", "25px");

		this.addRow();
		this.createCells("2C", -12, 6, "33.33px", "25px");
		this.splitRow();
		this.createCells("1C", 2, 12, "33.33px", "25px");
		this.splitRow();
		this.createCells("1C", 26, 4, "100px", "25px");

		this.addRow(true);
		this.createCells("2B", -11, 6, "33.33px", "25px");
		this.splitRow();
		this.createCells("1B", 1, 12, "33.33px", "25px");
		this.splitRow();
		this.createCells("1B", 25, 4, "100px", "25px");

		this.addRow(true);
		this.createCells("2B", -8, 4, "50px", "50px");
		this.splitRow();
		this.createCells("1B", 2, 8, "50px", "50px");
		this.splitRow();
		this.createCells("1B", 18, 6, "50px", "50px");
		this.addCustomCell("lagoxi", "Laguna de <br/> Oxidacion",
			"98px", "50px");

		this.addRow(true);
		this.createCells("2A", -7, 4, "50px", "50px");
		this.splitRow();
		this.createCells("1A", 1, 8, "50px", "50px");
		this.splitRow();
		this.createCells("1A", 17, 8, "50px", "50px");

		this.addRow();
		this.createCells("2A", -8, 4, "50px", "50px");
		this.splitRow();
		this.addCustomCell("cabaA", "Caballerizas A", "99px", "50px");
		this.addCustomCell("cabaB", "Caballerizas B", "100px", "50px");
		this.createCells("1A", 10, 4, "50px", "50px");
		this.splitRow();
		this.createCells("1A", 18, 8, "50px", "50px");

		this.addRow();
		this.createCells("2R", -7, 4, "50px", "50px");
		this.splitRow();
		this.addCustomCell("spacerone", "", "813px", "50px",
			"customBYCellDesc");

		this.addRow();
		this.createCells("2R", -8, 4, "50px", "50px");
		this.splitRow();
		this.addCustomCell("spacertwo", "", "813px", "50px");

		this.$.rancherFilter.$.textField.applyStyle("border-width",
			"7px");

	    },
	    last : null,
	    addCustomCell : function(sName, sCaption, sWidth, sHeight, sClass) {
		if (!sClass) {
		    sClass = "customBYcell";
		}
		objBarn.createComponent({
		    kind : enyo.Control,
		    className : sClass,
		    allowHtml : true,
		    style : "width:" + sWidth + ";height:" + sHeight + ";"
			    + "text-align: center;" + "vertical-align: middle;"
			    + "background-color:#DABD8B;"
			    + "display: table-cell;",
		    name : sName,
		    content : sCaption,
		}, {
		    owner : this
		});
	    },
	    addRowHeader : function() {
		this.last = objBarn = this.$.cells.createComponent({
		    kind : "HFlexBox"
		});
		this.addCustomCell("alatwo", "<strong>ZONA SUR</strong>",
			"200px", "30px", "customBYcellZone");
		this.splitRow();
		this.addCustomCell("alaone", "<strong>CHIHUAHUA</strong>",
			"765px", "30px", "customBYcellZone");
		this.addRefreshButton();
		this.addRow();
	    },
	    addRefreshButton : function(sName, sCaption, sWidth, sHeight,
		    sClass) {
		if (!sClass) {
		    sClass = "customBYcell";
		}
		objBarn.createComponent({
		    kind : "IconButton",
		    onclick : "refreshMap",
		    icon : "images/command-menu/menu-icon-music-repeat.png",
		    style : "height:23px; width:45px; padding:0;margin:0px",
		}, {
		    owner : this
		});
	    },
	    addRow : function(bDiv) {
		if (bDiv) {
		    this.$.cells.createComponent({
			kind : "Divider",
			caption : "",
			style : "margin-left:-15px;width: 1040px;"
		    });
		} else {
		    this.$.cells.createComponent({
			kind : "HFlexBox",
			style : "height:5px;"
		    });
		}
		this.last = objBarn = this.$.cells.createComponent({
		    kind : "HFlexBox"
		});
	    },
	    splitRow : function(sHeight) {
		objBarn = this.last;
		objBarn.createComponent({
		    kind : enyo.Control,
		    style : "width:15px; height:" + sHeight + ";align:center"
		});
	    },
	    createCells : function(sLetter, iStart, iNumber, sWidth, sHeight) {
		// this.createCells("1E",5,6,"50px","50px");
		objBarn = this.last;
		var sColor;
		for ( var i = 0; i < iNumber; i++) {
		    var iOccupied;
		    if (crudPen.isOccupied(sLetter + Math.abs(iStart))) {
			iOccupied = 1;
			sColor = this.sColorOccupied;
		    } else {
			iOccupied = 0;
			sColor = this.sColorFree;
		    }
		    objBarn.createComponent({
			kind : enyo.Control,
			className : "byCell",
			style : "width:" + sWidth + ";height:" + sHeight
				+ ";align:left" + ";background-color:" + sColor
				+ ";",
			name : sLetter + Math.abs(iStart),
			occupied : iOccupied,
			bBY : true,
			content : sLetter.substr(1) + Math.abs(iStart),
			onclick : "cellClick",
			onmousehold : "cellHold",
		    }, {
			owner : this
		    });
		    iStart = iStart + 2;
		}
	    },
	    cellOver : function(inSender, inEvent) {
		if (inSender.occupied != 0 && inSender.occupied != 2) {
		    this
			    .highLightReception(crudPen.inUse()[inSender.name].receptionId);
		}
	    },
	    highLightReception : function(iRecID) {
		this.arrByMOver = crudPen.getBYbyRecID(iRecID);
		for (sKey in this.arrByMOver) {
		    this.$[sKey].addClass("selectCell");
		}
	    },
	    cellOut : function() {
		for (sKey in this.arrByMOver) {
		    this.$[sKey].removeClass("selectCell");
		}
		this.arrByMOver = {};
	    },
	    cellClick : function(inSender, inEvent) {
		this.cellOut();
		this.cellOver(inSender, inEvent);
		this.objSelected = inSender;
		switch (inSender.occupied) {
		case 0: // Seleccionar corral disponible
		    this.clearDesc();
		    this.unselectBY();
		    if (enyo.json.stringify(this.arrSelectedOccupied) != "{}") {
			for ( var sKey in this.arrSelectedOccupied) {
			    if (crudPen.isOccupied(sKey)) {
				this.$[sKey].occupied = 1;
			    }
			}
			this.arrSelectedOccupied = {};
		    }
		    inSender.occupied = 2;
		    this.arrSelected[inSender.name] = inSender.name;
		    inSender.applyStyle("background-color", this.sColorSelect);
		    break;
		case 1: // Seleccionar corral ocupado
		    this.setDesc(inSender.name);
		    this.unselectBY();
		    if (enyo.json.stringify(this.arrSelected) != "{}") {
			this.$.options.setItems([ {
			    caption : "Anexar",
			    value : 7
			} ]);
			this.$.options.render();
			this.$.options.openAtEvent(inEvent);
		    } else {
			for ( var sKey in this.arrSelectedOccupied) {
			    if (crudPen.inUse()[sKey].receptionId != crudPen
				    .inUse()[inSender.name].receptionId) {
				for ( var sKey in this.arrSelectedOccupied) {
				    this.$[sKey].occupied = 1;
				    this.$[sKey].applyStyle("background-color",
					    this.sColorOccupied);
				}
				this.arrSelectedOccupied = {};
			    }
			    break;
			}
			// crudPen.get
			inSender.occupied = 3;
			this.arrSelectedOccupied[inSender.name] = inSender.name;
			this
				.colorBYbyRancherSelected(crudReception
					.getByID(crudPen
						.getRecIDbyBY(inSender.name)).rancherId);

		    }
		    break;
		case 2: // Deseleccionar corral libre
		    delete this.arrSelected[this.objSelected.name];
		    this.objSelected.occupied = 0;
		    this.objSelected.applyStyle("background-color",
			    this.sColorFree);
		    break;

		case 3:// Deseleccionar corral ocupado
		    delete this.arrSelectedOccupied[this.objSelected.name];
		    this.objSelected.occupied = 1;
		    this.objSelected
			    .applyStyle(
				    "background-color",
				    crudReception
					    .getByID(crudPen
						    .getRecIDbyBY(this.objSelected.name)).color);
		    break;

		}
	    },
	    cellHold : function(inSender, inEvent) {
		inEvent.stopPropagation();
		this.objSelected = inSender;
		switch (inSender.occupied) {
		case 0:
		    this.clearDesc();
		    this.unselectBY();
		    if (enyo.json.stringify(this.arrSelectedOccupied) != "{}") {
			for ( var sKey in this.arrSelectedOccupied) {
			    if (crudPen.isOccupied(sKey)) {
				this.$[sKey].occupied = 1;
				// this.$[sKey].applyStyle("background-color",crudReception.getByID(crudPen.getRecIDbyBY(sKey)).color);
			    }
			}
			this.arrSelectedOccupied = {};
		    }
		    inSender.occupied = 2;
		    this.arrSelected[inSender.name] = inSender.name;
		    inSender.applyStyle("background-color", this.sColorSelect);
		    this.cellHold(inSender, inEvent);
		    break;
		case 1:
		    this.setDesc(inSender.name);
		    this.unselectBY();
		    if (enyo.json.stringify(this.arrSelected) != "{}") {
			this.$.options.setItems([ {
			    caption : "Anexar",
			    value : 7
			} ]);
			this.$.options.render();
			this.$.options.openAtEvent(inEvent);
		    } else {
			this.cellOut();
			this.cellOver(inSender, inEvent);
			for ( var sKey in this.arrSelectedOccupied) {
			    if (crudPen.inUse()[sKey].receptionId != crudPen
				    .inUse()[inSender.name].receptionId) {
				for ( var sKey in this.arrSelectedOccupied) {
				    this.$[sKey].occupied = 1;
				    this.$[sKey].applyStyle("background-color",
					    crudReception.getByID(crudPen
						    .getRecIDbyBY(sKey)).color);
				}
				this.arrSelectedOccupied = {};
			    }
			    break;
			}
			// crudPen.get
			inSender.occupied = 3;
			this.arrSelectedOccupied[inSender.name] = inSender.name;
			this
				.colorBYbyRancherSelected(crudReception
					.getByID(crudPen
						.getRecIDbyBY(inSender.name)).rancherId);
			this.cellHold(inSender, inEvent);
		    }
		    break;
		case 2: // Abrir opciones para corral libre
		    this.$.options.setItems(this.arrReception);
		    this.$.options.render();
		    this.$.options.openAtEvent(inEvent);
		    break;
		case 3: // Abrir opciones para corral ocupado
		    if (enyo.json.stringify(this.arrSelected) == "{}") {
			this.$.options.setItems(this.arrPostReception);
		    } else {
			this.$.options.setItems(this.arrPostReception.concat({
			    caption : "Anexar",
			    value : 7
			}));
		    }
		    this.$.options.render();
		    this.$.options.openAtEvent(inEvent);
		    break;
		}
	    },
	    clearDesc : function() {
		_objMainHeader.setContent("");
		this.$.spacerone.setContent("");
	    },
	    setDesc : function(sBY) {
		_objMainHeader
			.setStyle("color:#FFF;border:none;font-size:12px; text-align:center;min-width:150px;");
		try {
		    var objRec = crudReception
			    .getByID(crudPen.inUse()[sBY].receptionId);
		    var sBy = "";
		    var iBy = 0;
		    for ( var sKey in objRec.barnyards) {
			iBy++;
			sBy += sKey + ", ";
		    }
		    sBy = sBy.slice(0, -2);

		    var personRancher = crudRancher.getByID(objRec.rancherId);
		    var rancherName = "[Anónimo]";
		    if (personRancher)
			rancherName = personRancher.name;
		    else {
			var enterpriseRancher = crudEnterpriseRancher
				.getByID(objRec.rancherId);
			if (enterpriseRancher)
			    rancherName = enterpriseRancher.legalName;
		    }

		    var locationName = crudLocation.getByID(objRec.locationId).locationName;
		    var cattleTypeName = crudCattle
			    .getCattleTypeById(objRec.cattleType).cattypeName;

		    _objMainHeader.setContent(rancherName + " - "
			    + locationName + "<BR>" + cattleTypeName + "  ("
			    + objRec.ReceptionHeadcount[0].hc + "/"
			    + objRec.ReceptionHeadcount[0].weight + "kg)" + " "
			    + objRec.dateAllotted.toLocaleDateString());
		} catch (e) {
		    _objMainHeader.setContent("");
		}
	    },
	    actionSelected : function(inSender, inSelected) {
		switch (inSelected.value) {
		case 1: // Crear Recepcion
		    if (this.$.dynocon) {
			this.$.dynocon.destroy();
		    }
		    if (this.$.tbHeaderRec) {
			this.$.tbHeaderRec.destroy();
		    }

		    this.$.popMan.createComponent({
			kind : "operations.reception.form",
			onAdd : "updateBY",
			onCancel : "closePopUp",
			name : 'dynocon',
			flex : 1
		    }, {
			owner : this
		    });

		    var objReception = {};
		    objReception.penString = "";
		    objReception.Pen = [];
		    for (pen in this.arrSelected) {
			if (this.arrSelected.hasOwnProperty(pen)) {
			    objReception.penString += pen.substr(1) + ", ";
			    var objPen = crudPen.getByBarnyard(pen);
			    objReception.Pen.push(objPen);
			}
		    }
		    if (objReception.penString != "")
			objReception.penString = objReception.penString.slice(
				0, -2);

		    this.$.dynocon.setEntity(objReception);
		    this.$.dynocon.activateAddButtons();
		    this.$.popMan.render();
		    this.$.popMan.openAtCenter();
		    break;
		case 2: // Deseleccionar
		    delete this.arrSelected[this.objSelected.name];
		    this.objSelected.occupied = 0;
		    this.objSelected.applyStyle("background-color",
			    this.sColorFree);
		    break;
		case 3: // Alimento
		    if (this.$.dynocon) {
			this.$.dynocon.destroy();
		    }
		    if (this.$.tbHeaderRec) {
			this.$.tbHeaderRec.destroy();
		    }
		    this.$.popMan
			    .createComponent(
				    {
					kind : "Toolbar",
					name : "tbHeaderRec",
					style : "height:10px",
					components : [
						{
						    kind : "VFlexBox",
						    name : 'lblBYselected',
						    allowHtml : true,
						    style : "color:#FFF;border:none;font-size:12px",
						    content : ""
						},
						{
						    kind : "Spacer"
						},
						{
						    kind : "VFlexBox",
						    name : 'lblInfo',
						    allowHtml : true,
						    style : "color:#FFF;border:none;font-size:12px;text-align:center;",
						    content : ""
						},
						{
						    kind : "Spacer"
						},
						{
						    name : 'btnLogOut',
						    onclick : "closePopUp",
						    icon : "images/command-menu/icon-context.png"
						} ]
				    }, {
					owner : this
				    });
		    this.$.popMan.createComponent({
			kind : "operations.feed",
			onAddFeed : "closePopUp",
			onCancel : "closePopUp",
			name : 'dynocon',
			flex : 1
		    }, {
			owner : this
		    });
		    var objRec = crudReception
			    .getByID(crudPen.inUse()[this.objSelected.name].receptionId);
		    this.$.dynocon.set(objRec, this.arrSelectedOccupied);
		    this.$.dynocon.toggleAdd();
		    this.$.popMan.render();
		    this.$.popMan.openAtCenter();
		    break;
		case 4: // Inspeccion
		    if (this.$.dynocon) {
			this.$.dynocon.destroy();
		    }
		    if (this.$.tbHeaderRec) {
			this.$.tbHeaderRec.destroy();
		    }
		    this.$.popMan.createComponent({
			kind : "Toolbar",
			name : "tbHeaderRec",
			style : "height:10px",
			components : [ {
			    kind : "Spacer"
			}, {
			    kind : "VFlexBox",
			    name : 'lblInfo',
			    allowHtml : true,
			    style : "color:#FFF;border:none;font-size:15px",
			    content : "Texto"
			}, {
			    kind : "Spacer"
			}, {
			    name : 'btnLogOut',
			    onclick : "closePopUp",
			    icon : "images/command-menu/icon-context.png"
			} ]
		    }, {
			owner : this
		    });
		    this.$.popMan.createComponent({
			kind : "operations.inspections",
			onAddReception : "closePopUp",
			onCancel : "closePopUp",
			name : 'dynocon',
			flex : 1
		    }, {
			owner : this
		    });
		    var objRec = crudReception
			    .getByID(crudPen.inUse()[this.objSelected.name].receptionId);
		    this.$.dynocon.set(objRec);
		    this.$.dynocon.toggleAdd();
		    this.$.popMan.render();
		    this.$.popMan.openAtCenter();
		    break;
		case 5: // Editar
		    if (this.$.dynocon) {
			this.$.dynocon.destroy();
		    }
		    if (this.$.tbHeaderRec) {
			this.$.tbHeaderRec.destroy();
		    }
		    var objRec = crudReception
			    .getByID(crudPen.inUse()[this.objSelected.name].receptionId);
		    this.$.popMan.createComponent({
			kind : "operations.reception.form",
			onUpdate : "onReceptionUpdate",
			onCancel : "closePopUp",
			name : 'dynocon',
			flex : 1,
			objReception : objRec
		    }, {
			owner : this
		    });

		    this.$.popMan.render();
		    this.$.popMan.openAtCenter();
		    break;
		case 6: // Liberar corral
		    var objRec = crudReception
			    .getByID(crudPen.inUse()[this.objSelected.name].receptionId);
		    crudReception.releasePens(objRec, this.arrSelectedOccupied,
			    this, "releaseBY");
		    break;
		case 7: // Añadir corral
		    var objRec = crudReception
			    .getByID(crudPen.inUse()[this.objSelected.name].receptionId);
		    crudReception.appendBY(objRec, this.arrSelected, this,
			    "updateBY");
		    break;
		case 8: // Deseleccionar
		    delete this.arrSelectedOccupied[this.objSelected.name];
		    this.objSelected.occupied = 1;
		    this.objSelected
			    .applyStyle(
				    "background-color",
				    crudReception
					    .getByID(crudPen
						    .getRecIDbyBY(this.objSelected.name)).color);
		    break;
		case 9: // Imprimir
		    this.showReport();
		    break;
		case 10: // Liberar lote
		    this.releaseAllPensInReception();
		    break;
		case 11: // Enviar Reporte
		    this.sendReport();
		    break;
		}
	    },
	    showReport : function(){
		var recId = crudPen.inUse()[this.objSelected.name].receptionId;
		var reportName = '/ReportingGateway/ReportePromedios?Id=' + recId;
		utils.openReport(reportName);
	    },
	    releaseAllPensInReception : function() {
		var recId = crudPen.inUse()[this.objSelected.name].receptionId;
		var objRec = crudReception.getByID(recId);
		crudReception.releaseAllPensInReception(objRec, this,
			"releaseBY");
	    },
	    sendReport : function() {
		// Send report
		var recId = crudPen.inUse()[this.objSelected.name].receptionId;
		var objRec = crudReception.getByID(recId);
		var reportName = 'ReportePromedios?Id=' + recId;
		consumingGateway.SendReport(objRec.rancherId, reportName);
	    },
	    onReceptionUpdate : function(inSender, objOld, objNew) {
		objNew.color = objOld.color;
		this.closePopUp();
	    },
	    closePopUp : function() {
		for ( var sKey in this.arrSelectedOccupied) {
		    this.setDesc(sKey);
		    break;
		}
		this.deselect();
		this.$.popMan.close();
		cacheMan.hideScrim();
	    },
	    updateBY : function(result) {

		crudPen.updateOccupiedBarnyards();

		this.$.popMan.close();
		this.cellOut();

		for ( var sKey in this.arrSelected) {
		    this.setDesc(sKey);
		    this.highLightReception(crudPen.inUse()[sKey].receptionId);
		    break;
		}
		for ( var sKey in this.arrSelected) {
		    this.$[sKey].occupied = 1;
		}
		this.colorBYbyRancherSelected(crudReception.getByID(crudPen
			.getRecIDbyBY(sKey)).rancherId);
		this.arrSelected = {};
		this.$.rancherFilter.setItems(crudReception
			.getRanchersByReceptions());
		cacheMan.hideScrim();
	    },
	    releaseBY : function() {
		crudPen.updateOccupiedBarnyards();
		for (by in this.arrByMOver) {
		    this.$[by].occupied = 0;
		    this.$[by].applyStyle("background-color", this.sColorFree);
		    this.$[by].removeClass("selectCell");
		}

		this.arrBYbyRancherSelected = {};
		this.arrByMOver = {};
		this.objSelected = null;
		this.arrSelected = {};
		this.arrSelectedOccupied = {};
		this.clearFilter();

	    },
	    deselect : function() {
		for ( var sKey in this.arrSelected) {
		    delete this.arrSelected[sKey];
		    this.$[sKey].occupied = 0;
		    this.$[sKey]
			    .applyStyle("background-color", this.sColorFree);
		}
		for ( var sKey in this.arrSelectedOccupied) {
		    delete this.arrSelectedOccupied[sKey];
		    this.$[sKey].occupied = 1;
		    this.$[sKey].applyStyle("background-color", crudReception
			    .getByID(crudPen.getRecIDbyBY(sKey)).color);
		}
	    },

	    rancherFilterChanged : function(inSender) {
		if (this.$.rancherFilter.getIndex() > -1) {
		    var receptions = crudReception
			    .getActiveBYForListByRancherID(this.$.rancherFilter
				    .getIndex());
		    if (receptions.length > 0) {
			for ( var i = 0, a; (a = this.$.cells.children[i]); i++) {
			    for ( var j = 0, b; (b = a.children[j]); j++) {
				if (b.bBY == true) {
				    this.$[b.name].removeClass("selectCell");
				    this.$[b.name].occupied = 0;
				    this.$[b.name]
					    .applyStyle("background-color",
						    this.sColorFree);
				    for (x in receptions) {
					var byFinded = crudPen
						.getByBarnyard(b.name);
					if (byFinded) {
					    if (byFinded.barnyard_id == receptions[x].value) {
						this.$[b.name].occupied = 1;
						this.$[b.name]
							.applyStyle(
								"background-color",
								crudReception
									.getByID(crudPen
										.getRecIDbyBY(b.name)).color);
						break;
					    }
					}
				    }
				}
			    }
			}
		    } else {
			for ( var i = 0, a; (a = this.$.cells.children[i]); i++) {
			    for ( var j = 0, b; (b = a.children[j]); j++) {
				if (b.bBY == true) {
				    this.$[b.name].removeClass("selectCell");
				    this.$[b.name].occupied = 0;
				    this.$[b.name]
					    .applyStyle("background-color",
						    this.sColorFree);
				}
			    }
			}
		    }
		} else {
		    for ( var i = 0, a; (a = this.$.cells.children[i]); i++) {
			for ( var j = 0, b; (b = a.children[j]); j++) {
			    if (b.bBY == true) {
				this.$[b.name].removeClass("selectCell");
				if (crudPen.isOccupied(b.name)) {
				    // alert(b.name)
				    this.$[b.name].occupied = 1;
				    this.$[b.name].applyStyle(
					    "background-color",
					    this.sColorOccupied);
				} else {
				    this.$[b.name].occupied = 0;
				    this.$[b.name]
					    .applyStyle("background-color",
						    this.sColorFree);
				}
			    }
			}
		    }
		}
		this.arrByMOver = {};
		this.objSelected = null;
		this.arrSelected = {};
		this.arrSelectedOccupied = {};
	    },
	    colorBYbyRancherSelected : function(rancher_id) {
		this.arrBYbyRancherSelected = crudReception
			.getActiveBYForListByRancherID(rancher_id);

		for (i in this.arrBYbyRancherSelected) {
		    var activeBY = "" + this.arrBYbyRancherSelected[i].zone_id
			    + this.arrBYbyRancherSelected[i].barnyard_code;
		    this.$[activeBY].applyStyle("background-color",
			    crudReception.getByID(crudPen
				    .getRecIDbyBY(activeBY)).color);
		}
		for (i in this.arrSelectedOccupied) {
		    this.$[i].applyStyle("background-color",
			    this.sColorSelectOccupied);
		}

	    },
	    unselectBY : function() {

		for (i in this.arrBYbyRancherSelected) {
		    var activeBY = "" + this.arrBYbyRancherSelected[i].zone_id
			    + this.arrBYbyRancherSelected[i].barnyard_code;
		    this.$[activeBY].applyStyle("background-color",
			    this.sColorOccupied);
		}
		this.arrBYbyRancherSelected = {};

	    },
	    clearFilter : function() {
		this.$.rancherFilter.clear();
		this.rancherFilterChanged();
		this.clearDesc();
	    },
	    refreshMap : function() {
		cacheMan.showScrim();
		crudReception.get(this, "refreshMapCallBack");
	    },

	    refreshMapCallBack : function() {
		this.$.rancherFilter.setItems(crudReception
			.getRanchersByReceptions());

		for ( var i = 0, a; (a = this.$.cells.children[i]); i++) {
		    for ( var j = 0, b; (b = a.children[j]); j++) {
			if (b.bBY == true) {
			    this.$[b.name].removeClass("selectCell");
			    if (crudPen.isOccupied(b.name)) {
				// alert(b.name)
				this.$[b.name].occupied = 1;
				this.$[b.name].applyStyle("background-color",
					this.sColorOccupied);
			    } else {
				this.$[b.name].occupied = 0;
				this.$[b.name].applyStyle("background-color",
					this.sColorFree);
			    }
			}
		    }
		}
		this.arrByMOver = {};
		this.objSelected = null;
		this.arrSelected = {};
		this.arrSelectedOccupied = {};
		cacheMan.hideScrim();
	    }
	});