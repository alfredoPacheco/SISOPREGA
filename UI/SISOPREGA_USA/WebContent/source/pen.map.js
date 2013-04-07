enyo
	.kind({
	    name : "pen.map",
	    arrOptions : [ {
		caption : "Mover Corral",
		value : 1
	    }, {
		caption : "Alimento",
		value : 2
	    }, {
		caption : "Corte",
		value : 3
	    } ],
	    arrMovingPen : [ {
		caption : "Mover aqui",
		value : 4
	    }, ],
	    style : "background-color:#DABD8B;",
	    kind : enyo.VFlexBox,
	    last : null,
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
	    movingPen : false,
	    movingFrom : null,
	    movingTo : null,
	    className : "mapBG",
	    create : function() {
		this.inherited(arguments);
	    },

	    components : [ {
		kind : enyo.Popup,
		name : "popup_movePen",
		width : "50%;",
		height : "190px;",
		dismissWithClick : false,
		layoutKind : "VFlexLayout",
		style : "overflow : hiddin; border-with:8px;",
		scrim : true,
		components : [ {
		    kind : "movePen",
		    name : "movePen_kind",
		    onCancel : "cancelMoving",
		    onGuardar : "saveMoving",
		    flex : 1
		} ]
	    }, {
		kind : enyo.Popup,
		name : "popup_alimentoUS",
		width : "50%;",
		height : "190px;",
		dismissWithClick : false,
		layoutKind : "VFlexLayout",
		style : "overflow : hiddin; border-with:8px;",
		scrim : true,
		components : [ {
		    kind : "alimentoUS",
		    name : "alimento_kind",
		    onCancel : "cancelFeed",
		    onGuardar : "saveFeed",
		    flex : 1
		} ]
	    },

	    {
		kind : enyo.BasicScroller,
		flex : 1,
		components : [ {
		    name : "options",
		    kind : enyo.PopupSelect,
		    onSelect : "actionSelected",
		    items : []
		}, {

		    name : "cells",
		    kind : "VFlexBox",
		    align : "center",
		    pack : "center"

		} ],
	    }, {
		kind : enyo.Toolbar,
		name : "toolbar",
		pack : "center",
		align : "center",
		components : [ {
		    kind : "VFlexBox",
		    name : "lblInfo",
		    style : "color : white;",
		    pack : "center",
		    align : "center",
		    allowHtml : true,
		    flex : 1,
		    content : ""
		}, {
		    kind : enyo.Button,
		    onclick : "cancelMoving",
		    name : "btnCancelMoving",
		    caption : "Cancelar",
		    showing : false

		} ],

	    }

	    ],
	    ready : function() {
		this.last = this.$.cells;
		// this.addRow(true);
		this.addRow();
		this.addRowHeader();
		this.createCells("2A", 1, 4, "50px", "50px", 1);
		this.splitRow();
		this.createCells("1A", 1, 8, "50px", "50px", 1);
		this.splitRow();
		this.createCells("1A", 9, 6, "50px", "50px", 1);
		this.createCells("1A", 15, 1, "100px", "50px", 1);

		this.addRow(true);
		this.createCells("2B", 1, 2, "100px", "50px", 2);
		this.splitRow();
		this.createCells("1B", 1, 4, "100px", "50px", 6);
		this.splitRow();
		this.createCells("1B", 25, 1, "100px", "50px", 2);
		this.createCells("1B", 27, 3, "100px", "50px", 2);

		this.addRow();
		this.createCells("2B", -12, 6, "33.33px", "25px");
		this.splitRow();
		this.createCells("1B", 2, 12, "33.33px", "25px");
		this.splitRow();
		this.createCells("1B", 26, 4, "100px", "25px");

		this.addRow(true);
		this.createCells("2C", 1, 6, "33.33px", "25px");
		this.splitRow();
		this.createCells("1C", 1, 12, "33.33px", "25px");
		this.splitRow();
		this.createCells("1C", 25, 3, "100px", "25px");
		this.createCells("1C", 31, 2, "50px", "25px");

		this.addRow();
		this.createCells("2C", 2, 4, "50px", "50px");
		this.splitRow();
		this.createCells("1C", 2, 2, "50px", "50px");
		this.createCells("1C", 8, 2, "50px", "50px");
		this.createCells("1C", 14, 3, "50px", "50px");
		this.createCells("1C", 22, 1, "50px", "50px");
		this.splitRow();
		this.createCells("1C", 26, 3, "100px", "50px");
		this.createCells("1C", 32, 2, "50px", "50px");

		this.addRow(true);
		this.createCells("2D", 1, 4, "50px", "50px");
		this.splitRow();

		this.createCells("1D", 1, 8, "50px", "50px");
		this.splitRow();
		this.createCells("1D", 17, 8, "50px", "50px");

		this.addRow();
		this.createCells("2D", 2, 4, "50px", "50px");
		this.splitRow();
		this.createCells("1D", 2, 8, "50px", "50px");
		this.splitRow();
		this.createCells("1D", 18, 4, "100px", "50px");

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
	    addRowHeader : function() {
		this.last = objBarn = this.$.cells.createComponent({
		    kind : "HFlexBox"
		});
		this.addCustomCell("alatwo", "<strong>WEST</strong>", "200px",
			"30px", "customBYcellZone");
		this.splitRow();
		this.addCustomCell("alaone", "<strong>EAST</strong>", "765px",
			"30px", "customBYcellZone");
		this.addRefreshButton();
		this.addRow();
	    },
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
	    splitRow : function(sHeight) {
		objBarn = this.last;
		objBarn.createComponent({
		    kind : enyo.Control,
		    style : "width:15px; height:" + sHeight + ";align:center"
		});
	    },
	    addRefreshButton : function(sName, sCaption, sWidth, sHeight,
		    sClass) {
		if (!sClass) {
		    sClass = "customBYcell";
		}
		objBarn
			.createComponent(
				{
				    kind : "IconButton",
				    onclick : "refreshMap",
				    icon : "../SISOPREGA/images/command-menu/menu-icon-music-repeat.png",
				    style : "height:23px; width:45px; padding:0;margin:0px",
				}, {
				    owner : this
				});
	    },
	    refreshMap : function() {
		for ( var i = 0, a; (a = this.$.cells.children[i]); i++) {
		    for ( var j = 0, b; (b = a.children[j]); j++) {
			if (b.bBY == true) {
			    this.$[b.name].removeClass("selectCell");
			    if (cachePen.isOccupied(b.name)) {
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
	    },
	    createCells : function(sLetter, iStart, iNumber, sWidth, sHeight,
		    iStep) {
		// this.createCells("1E",5,6,"50px","50px");
		objBarn = this.last;
		var sColor;
		for ( var i = 0; i < iNumber; i++) {
		    var iOccupied;
		    if (cachePen.isOccupied(sLetter + Math.abs(iStart))) {
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
		    iStep = iStep ? iStep : 2;
		    iStart = iStart + iStep;
		}
	    },
	    cellOver : function(inSender, inEvent) {
		if (inSender.occupied != 0 && inSender.occupied != 2) {
		    this
			    .highLightReception(cacheBy.inUse()[inSender.name].reception_id);
		}
	    },
	    highLightReception : function(iRecID) {
		this.arrByMOver = cachePen.getBYbyRecID(iRecID);
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
		this.objSelected = inSender;
		switch (inSender.occupied) {
		case 0: // Seleccionar corral disponible, 0= corral sin
		    // recepcion y sin seleccion
		    if (this.movingPen) {
			this.movingTo = inSender;
			if (this.movingFrom.name != this.movingTo.name){
			this.$.options.setItems(this.arrMovingPen);
			this.$.options.render();
			this.$.options.openAtEvent(inEvent);}
		    } else {
			this.clearDesc();
			inSender.occupied = 2;
		    }
		    break;
		case 1: // Seleccionar corral ocupado, 1= corral con recepcion y
		    // sin seleccion.
		    if (this.movingPen) {
			this.movingTo = inSender;
			if (this.movingFrom.name != this.movingTo.name){
			this.$.options.setItems(this.arrMovingPen);
			this.$.options.render();
			this.$.options.openAtEvent(inEvent);}
		    } else {
			this.setDesc(inSender.name);
		    }
		    break;
		case 2: // Deseleccionar corral libre, 2= corral sin recepcion
		    // pero seleccionado.

		    delete this.arrSelected[this.objSelected.name];
		    this.objSelected.occupied = 0;
		    this.objSelected.applyStyle("background-color",
			    this.sColorFree);
		    break;

		case 3:// Deseleccionar corral ocupado, 3= corral con recepcion
		    // y seleccionado.
		    delete this.arrSelectedOccupied[this.objSelected.name];
		    this.objSelected.occupied = 1;
		    // this.objSelected
		    // .applyStyle(
		    // "background-color",
		    // cacheReceptions
		    // .getByID(cachePen
		    // .getRecIDbyBY(this.objSelected.name)).color);
		    break;

		}
	    },
	    actionSelected : function(inSender, inEvent) {
		switch (inEvent.value) {
		case 1:
		    this.movingPen = true;
		    this.$.toolbar.applyStyle("background-color", "#800000");
		    this.$.lblInfo.setContent("Seleccione el corral destino");
		    this.$.btnCancelMoving.show();
		    break;
		case 2:
		    this.$.popup_alimentoUS.validateComponents();
		    this.$.alimento_kind.setObj(cachePen
			    .getByBarnyard(this.objSelected.name));
		    this.$.popup_alimentoUS.openAtCenter();
		    break;
		case 3:
		    break;
		case 4:

		    var objFrom = enyo.clone(cachePen
			    .getByBarnyard(this.movingFrom.name));
		    var objTo = cachePen.getByBarnyard(this.movingTo.name);

		    if (objFrom.cattleName == objTo.cattleName)
			    {

			if (objFrom) {
			    var byName = this.movingTo.name;
			    objFrom.barnyard = [];
			    objFrom.barnyard[byName] = byName;
			    this.$.popup_movePen.validateComponents();
			    this.$.movePen_kind.setObj(objFrom);
			    this.$.popup_movePen.openAtCenter();
			} else {
			    alert("actionSelected Error");
			}
		    } else {
			alert("No es posible mezclar clases de ganado en un corral");
		    }

		    break;
		}
	    },
	    cellHold : function(inSender, inEvent) {
		inEvent.stopPropagation();
		this.objSelected = inSender;
		switch (inSender.occupied) {
		case 0:
		    if (this.movingPen) {
			this.movingTo = inSender;
			if (this.movingFrom.name != this.movingTo.name){
			this.$.options.setItems(this.arrMovingPen);
			this.$.options.render();
			this.$.options.openAtEvent(inEvent);}
		    }
		    break;
		case 1:
		    if (this.movingPen) {
			this.movingTo = inSender;
			if (this.movingFrom.name != this.movingTo.name){
			this.$.options.setItems(this.arrMovingPen);
			this.$.options.render();
			this.$.options.openAtEvent(inEvent);}
		    } else {
			inSender.occupied = 3;
			this.cellHold(inSender, inEvent);
		    }
		    break;
		case 2: // Abrir opciones para corral libre
		    break;
		case 3: // Abrir opciones para corral ocupado
		    this.movingFrom = inSender;
		    this.$.options.setItems(this.arrOptions);
		    this.$.options.render();
		    this.$.options.openAtEvent(inEvent);
		    break;
		}
	    },
	    clearDesc : function() {
		_objMainHeader.setContent("");
	    },
	    setDesc : function(sBY) {
		_objMainHeader
			.setStyle("color:#FFF;border:none;font-size:12px; text-align:center;min-width:150px;");
		var obj = cachePen.getByBarnyard(sBY);
		if (obj) {
		    var dateAux = "";
		    if (obj.feed.dateAndTime) {
			dateAux = obj.feed.dateAndTime.toLocaleString();
		    }
		    this.$.lblInfo.setContent("Ganado: " + obj.cattleName
			    + " Cabezas: " + obj.heads + " Peso: " + obj.weight
			    + "<br /> Almento: " + dateAux + " "
			    + obj.feed.quantity + " Lb");
		} else
		    this.$.lblInfo.setContent("");
	    },
	    cancelMoving : function() {
		this.movingPen = false;
		this.$.popup_movePen.close();
		this.$.toolbar.applyStyle("background-color", null);
		this.$.btnCancelMoving.hide();
		this.setDesc(this.movingFrom.name);
	    },
	    saveMoving : function() {
		var movingFrom = cachePen.getByBarnyard(this.movingFrom.name);
		var movingTo = cachePen.getByBarnyard(this.movingTo.name);
		var objMovement = this.$.movePen_kind.getObj();
		if (cachePen.movePen(movingFrom, movingTo, objMovement)) {
		    this.movingPen = false;
		    this.$.popup_movePen.close();
		    this.refreshMap();
		    this.$.toolbar.applyStyle("background-color", null);
		    this.$.btnCancelMoving.hide();
		    this.setDesc(this.movingTo.name);
		} else {
		    alert("saveMoving Error");
		}
	    },
	    cancelFeed : function() {
		this.$.popup_alimentoUS.close();
	    },
	    saveFeed : function() {
		this.$.popup_alimentoUS.close();
		this.refreshMap();
		this.setDesc(this.objSelected.name);
	    }
	});
