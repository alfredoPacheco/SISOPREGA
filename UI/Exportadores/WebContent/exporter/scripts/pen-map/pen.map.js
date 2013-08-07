enyo
	.kind({
	    name : "penMap",
	    kind : "Scroller",
	    touch : true,
	    style : "cursor:pointer;width:100%; height:100%; bottom:0px; top:0px; left:0px;right:0px;",
	    activeReceptions : [],
	    arrByMOver : {},
	    objSelected : null,
	    arrSelected : {},
	    arrSelectedOccupied : {},
	    sColorOccupied : "#ff7200",
	    sColorFree : "white",
	    sColorSelect : "lightgreen",
	    sColorSelectOccupied : "#9b7eb1",
	    published : {
		activeReceptions : null
	    },
	    components : [ {
		kind : "FittableRows",
		flex : 1,
		classes : "mapBG",
		components : [ {
		    components : [ {
			name : "cells",
			kind : "FittableRows",
			align : "middle",
			onclick : "cellsClick"
		    }, ]
		} ]
	    } ],
	    activeReceptionsChanged : function(inOldValue) {
		for ( var i = 0; i < this.activeReceptions.length; i++) {
		    var activeReception = this.activeReceptions[i];
		    for ( var j = 0; j < activeReception.Pens.length; j++) {
			var penObj = activeReception.Pens[j];
			var penCode = penObj.locationId + penObj.barnyardCode;
			this.$[penCode].applyStyle("background-color",
				this.sColorOccupied);
			this.$[penCode].occupied = 1;
			this.$[penCode].reception = activeReception;
		    }
		}
	    },
	    create : function() {
		this.inherited(arguments);
		this.last = this.$.cells;
		// this.addRow(true);
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
	    },
	    last : null,
	    addCustomCell : function(sName, sCaption, sWidth, sHeight, sClass) {
		if (!sClass) {
		    sClass = "customBYcell";
		}
		objBarn.createComponent({
		    kind : enyo.Control,
		    classes : sClass,
		    allowHtml : true,
		    style : "width:" + sWidth + ";height:" + sHeight + ";",
		    name : sName,
		    content : sCaption,
		}, {
		    owner : this
		});
	    },
	    addRowHeader : function() {
		this.inherited(arguments);
		this.last = objBarn = this.$.cells.createComponent({
		    kind : "FittableColumns"
		});
		this.addCustomCell("alatwo", "<strong>ZONA SUR</strong>",
			"200px", "30px", "customBYcellZone");
		this.splitRow();
		this.addCustomCell("alaone", "<strong>CHIHUAHUA</strong>",
			"815px", "30px", "customBYcellZone");
		this.addRow();
	    },
	    addRow : function(bDiv) {
		if (bDiv) {
		    this.$.cells.createComponent({
			classes : "divider"
		    });
		} else {
		    this.$.cells.createComponent({
			kind : "FittableColumns",
			style : "height:5px"
		    });
		}
		this.last = objBarn = this.$.cells.createComponent({
		    kind : "FittableColumns"
		});
	    },
	    splitRow : function(sHeight) {
		objBarn = this.last;
		objBarn.createComponent({
		    kind : enyo.Control,
		    style : "width:15px; height:" + sHeight + ";align:left"
			    + ""
		});
	    },
	    createCells : function(sLetter, iStart, iNumber, sWidth, sHeight) {
		objBarn = this.last;
		for ( var i = 0; i < iNumber; i++) {
		    objBarn.createComponent({
			kind : enyo.Control,
			classes : "byCell",
			style : "width:" + sWidth + ";height:" + sHeight
				+ ";align:left;",
			name : sLetter + Math.abs(iStart),
			bBY : true,
			occupied : 0,
			content : sLetter.substr(1) + Math.abs(iStart),
			onclick : "cellClick",
		    }, {
			owner : this
		    });
		    iStart = iStart + 2;
		}
	    },

	    cellOver : function(inSender, inEvent) {
		if (inSender.occupied != 0 && inSender.occupied != 2) {
		    this.highLightReception(inSender.reception.receptionId);
		}
	    },
	    highLightReception : function(iRecID) {
		for ( var i = 0; i < this.activeReceptions.length; i++) {
		    var objReception = this.activeReceptions[i];
		    for ( var j = 0; j < objReception.Pens.length; j++) {
			var objPen = objReception.Pens[j];
			var penCode = objPen.locationId + objPen.barnyardCode;
			if (objReception.receptionId == iRecID)
			    this.$[penCode].addClass("selectCell");
			else
			    this.$[penCode].removeClass("selectCell");
		    }
		}
	    },
	    cellClick : function(inSender, inEvent) {
		this.cellOver(inSender, inEvent);
		this.objSelected = inSender;
		this.setDesc(inSender);
	    },
	    setDesc : function(sBY) {
		var objRec = sBY.reception;
		var sBy = "";
		var iBy = 0;
		for ( var i = 0; i < objRec.Pens.length; i++) {
		    var objPen = objRec.Pens[i];
		    var penCode = objPen.barnyardCode;
		    iBy++;
		    sBy += penCode + ", ";
		}
		sBy = sBy.slice(0, -2);
		if (objRec.accepted_count != "") {
		    objRec.accepted_count;
		}
		var statusBar = document.getElementById("status-bar-content");
		var content = objRec.headcounts[0].hc
			+ " "
			+ objRec.cattype_name
			+ " de "
			+ objRec.location_name
			+ ". "
			+ objRec.headcounts[0].weight
			+ " Kg., "
			+ Math
				.round((objRec.headcounts[0].weight * 2.2046) * 100)
			/ 100
			+ " Lb. Promedio: "
			+ Math
				.round((objRec.headcounts[0].weight / objRec.headcounts[0].hc) * 100)
			/ 100
			+ "Kg.,"
			+ Math.round((objRec.headcounts[0].weight
				/ objRec.headcounts[0].hc * 2.2046) * 100)
			/ 100 + "Lb. </br> Corrales (" + iBy + ") - " + sBy;
		statusBar.innerHTML = content;
	    },
	});