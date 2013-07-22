enyo
	.kind({
	    name : "inspection.forecast",
	    kind : enyo.SlidingView,
	    layoutKind : enyo.VFlexLayout,
	    iSelected : null,
	    bMoving:false,
	    _id : undefined,
	    objInspection : null,
	    objList : [],
	    arrBY : [],
	    arrTempPopupSelection : [],
	    itemSelectedPopup : -1,
	    fecha : undefined,
	    totalItems : 0,
	    arrReceptions : [],
	    arrActiveReceptions : [],
	    arrFilter : [],
	    arrAutocompleteFilter : [],
	    defaultZone : undefined,
	    defaultCattle : undefined,
	    // barnyardsFilter:undefined,
	    actualFilter : {
		rancherId : "",
		zoneId : "",
		locationId : "",
		cattleType : "",
		receptionId : "", // reception for barnyards
	    },
	    actualAutocompleteFilter : {
		rancherId : undefined,
		zoneId : undefined,
		locationId : undefined,
		cattleType : undefined,
		receptionId : undefined, // reception for barnyards
	    },
	    arrPopupMenu : [ {
		caption : "Mover a mañana",
		value : 1
	    } ],
	    components : [ {
		name : "options",
		kind : enyo.PopupSelect,
		onSelect : "actionSelected",
		items : []
	    },
	    {
		kind : "SlidingPane",
		flex : 1,
		name : "slidingpane",
		components : [
			{
			    name : "left",
			    width : "300px",
			    kind : enyo.SlidingView,
			    components : [
				    {
					kind : "Header",
					name : "encabezadoFecha",
					style : "background-color:#DABD8B;",
					pack : "center",
					components : [
						{
						    kind : "Button",
						    content : "Hoy",
						    style : "background-color:#DABD8B;",
						    onclick : "cambiarAHoy"
						},
						{
						    kind : "controls.dateMask",
						    inputKind : "ToolInput",
						    name : "fechaPicker",
						    bindTo : "birthDate",
						    style : "max-width:130px;"
						},
						{
						    kind : "Button",
						    content : "Ir",
						    style : "background-color:#DABD8B;",
						    onclick : "cambioDeFecha"
						}, ]
				    },
				    {
					kind : enyo.Scroller,
					name : "FormScroller",
					horizontal : false,
					autoHorizontal : false,
					flex : 1,
					onScroll : "scroll",
					components : [ {
					    kind : "RowGroup",
					    defaultKind : "HFlexBox",
					    caption : "",
					    components : [
						    {
							kind : "Item",
							components : [ {
							    layoutKind : enyo.HFlexLayout,
							    components : [ {
								kind : "controls.autocomplete",
								name : "rancher",
								hint : "Ganadero",
								onSelectItem : "on_select_item",
								onEnter : "emularTabulacionConEnter",
								width : "270px;"
							    } ]
							} ]
						    },
						    {
							kind : "Item",
							components : [ {
							    layoutKind : enyo.HFlexLayout,
							    components : [ {
								kind : "controls.autocomplete",
								name : "zone",
								hint : "Localidad",
								onSelectItem : "on_select_item",
								onEnter : "emularTabulacionConEnter",
								width : "270px;"
							    } ]
							} ]
						    },
						    {
							kind : "Item",
							components : [ {
							    layoutKind : enyo.HFlexLayout,
							    components : [ {
								kind : "Input",
								name : "autorizacion",
								hint : "Autorizacion",
								flex : 1,
								onkeydown : "key_down"
							    } ]
							} ]
						    },
						    {
							kind : "Item",
							components : [ {
							    layoutKind : enyo.HFlexLayout,
							    components : [ {
								kind : "controls.autocomplete",
								name : "origin",
								hint : "Origen",
								onSelectItem : "on_select_item",
								onEnter : "emularTabulacionConEnter",
								width : "270px;"
							    } ]
							} ]
						    },
						    {
							kind : "Item",
							components : [ {
							    layoutKind : enyo.HFlexLayout,
							    components : [ {
								kind : "controls.autocomplete",
								name : "cattleType",
								hint : "Ganado",
								onSelectItem : "on_select_item",
								onEnter : "emularTabulacionConEnter",
								width : "270px;"
							    } ]
							} ]
						    },
						    {
							kind : "Item",
							components : [ {
							    layoutKind : enyo.HFlexLayout,
							    components : [ {
								kind : "controls.numberBox",
								name : "cantidad",
								hint : "Cantidad",
								height : "50px",
								flex : 1,
								onkeydown : "key_down"
							    } ]
							} ]
						    },
						    {
							kind : "Item",
							components : [ {
							    layoutKind : enyo.HFlexLayout,
							    components : [ {
								kind : "controls.multiselect",
								name : "barnyards",
								hint : "Corrales",
								onSelectItem : "on_select_item",
								onEnter : "emularTabulacionConEnter",
								width : "270px;"
							    } ]
							} ]
						    },
					    // {
					    // kind : "Item",
					    // components : [ {
					    // layoutKind : enyo.HFlexLayout,
					    // components : [ {
					    // kind : "Input",
					    // name : "corrales",
					    // hint : "Corrales",
					    // flex : 1
					    // } ]
					    // } ]
					    // }
					    ]
					} ]
				    },
				    {
					kind : "Drawer",
					name : "draAdd",
					animate : false,
					components : [ {
					    kind : "Button",
					    name : "btnAdd",
					    className : "enyo-button-affirmative",
					    caption : "Agregar",
					    onclick : "saveInspectionForecast"
					} ]
				    },
				    {
					kind : "Drawer",
					name : "draUpdate",
					animate : false,
					open : false,
					components : [ {
					    layoutKind : "HFlexLayout",
					    align : "center",
					    components : [
						    {
							kind : "Button",
							name : "btnUpdate",
							className : "enyo-button-affirmative",
							flex : 1,
							caption : "Actualizar",
							onclick : "updateForecast"

						    },
						    {
							kind : "Button",
							name : "btnCancel",
							className : "enyo-button-negative",
							flex : 1,
							caption : "Cancelar",
							onclick : "onCancel"
						    } ]
					} ]
				    } ]

			},
			{
			    name : "middle",
			    kind : enyo.SlidingView,
			    edgeDragging : true,
			    peekwidth : 58,
			    components : [
				    {
					kind : "Header",
					name : "encabezado",
					className : "listFirst",
					style : "font-size:13px;background-color:#DABD8B;",
					components : [
						{
						    kind : "enyo.IconButton",
						    name : "btnReport",
						    icon : "../SISOPREGA_WEB_LIB/images/menu-icon-cards.png",
						    onclick : "enviar_aviso",
						    style : "width:30px;"
						},
						{
						    content : "Ganadero",
						    style : "width:150px;text-align:right;margin-right:35px;"
						},
						{
						    content : "Autorización",
						    style : "width:100px;text-align:center;"
						},
						{
						    content : "Origen",
						    style : "width:100px;text-align:center;"
						},
						{
						    content : "Clase",
						    style : "width:100px;text-align:center;"
						},
						{
						    content : "Cantidad",
						    style : "width:100px;text-align:center;"
						},
						{
						    content : "Localidad",
						    style : "width:150px;text-align:center;"
						},
						{
						    content : "Corrales",
						    style : "width:100px;text-align:left;"
						}

					]
				    },
				    {
					kind : enyo.Scroller,
					name : "listaScroller",
					horizontal : false,
					autoHorizontal : false,
					flex : 1,
					className : "listBG",
					onScroll : "scroll",
					components : [ {
					    kind : enyo.VirtualRepeater,
					    name : "forecastList",
					    onSetupRow : "setupForecastRow",
					    onclick : "selectForecast",
					    components : [ {
						kind : enyo.RowItem,
						onConfirm : "dropForecast",
						onmousehold : "rowHold",
						layoutKind : enyo.HFlexLayout,
						tapHighlight : true,
						style : "font-size:13px;",
						components : [
							{
							    name : "listRancher",
							    style : "width:215px;text-align:right;margin-right:35px;",
							    content : ""
							},
							{
							    name : "listAuth",
							    style : "width:100px;text-align:center;",
							    content : ""
							},
							{
							    name : "listOrigin",
							    style : "width:100px;text-align:center;",
							    content : ""
							},
							{
							    name : "listCattleType",
							    style : "width:100px;text-align:center;",
							    content : ""
							},
							{
							    name : "listQuantity",
							    style : "width:100px;text-align:center;",
							    content : ""
							},
							{
							    name : "listZone",
							    style : "width:150px;text-align:center;",
							    content : ""
							},
							{
							    name : "listBarnyards",
							    style : "width:100px;text-align:left;",
							    content : ""
							} ]
					    } ]
					} ]
				    }, {
					kind : "Drawer",
					name : "draDel",
					open : false,
					components : [ {
					    kind : "Toolbar",
					    components : [ {
						kind : "enyo.IconButton",
						style : "width:100px;",
						label : "Eliminar",
						onclick : "onEliminar"
					    }, {
						kind : "enyo.IconButton",
						style : "width:100px;",
						label : "Cancelar",
						onclick : "onCancel"
					    }, {
						kind : "enyo.IconButton",
						style : "width:100px;",
						label : "Mover arriba",
						onclick : "onMoverArriba"
					    }, {
						kind : "enyo.IconButton",
						style : "width:100px;",
						label : "Mover abajo",
						onclick : "onMoverAbajo"
					    }, ]
					}

					]
				    }, ]
			} ]
	    } ],
	    enviar_aviso : function() {

		if (confirm("¿Desea enviar los avisos ahora?")) {
		    // Send communication to customers
		    var customers_set = [];
		    if (this.objList.length > 0) {
			for ( var i = 0; i < this.objList.length; i++) {
			    if (!(customers_set[this.objList[i].rancherId] in customers_set)) {
				customers_set[this.objList[i].rancherId] = this.objList[i].rancherId;
				var report_name = 'ListaInspeccion?rancherId='
					+ this.objList[i].rancherId
					+ '&amp;Id='
					+ this.objInspection.inspectionForecastId;
				consumingGateway.SendReport(
					this.objList[i].rancherId, report_name);
			    }
			}
		    } else {
			cacheMan
				.setMessage("",
					"Error. No se ha creado la lista de inspección.");
		    }
		}

	    },
	    ready : function() {
		cacheMan.showScrim();
		this.inherited(arguments);
		crudRancher.get(this, "readCallBack");
		crudEnterpriseRancher.get(this, "readCallBack");
		crudCattle.get(this, "readCallBack");
		crudLocation.get(this, "readCallBack");
		crudReception.get(this, "readCallBack");
		crudPen.get(this, "readCallBack");
	    },
	    readCounter : 0,
	    readCallBack : function() {
		this.readCounter++;
		if (this.readCounter == 6) {
		    this.loadAutocompletes();
		    this.readCounter = 0;
		}
	    },
	    loadAutocompletes : function() {
		this.arrActiveReceptions = crudReception.arrObj;

		var arrAllRanchers = crudRancher.getList().concat(
			crudEnterpriseRancher.getList());
		this.$.rancher.setItems(arrAllRanchers);

		this.$.origin.setItems(crudLocation.getList());

		this.$.cattleType.setItems(crudCattle.getCattleTypeList());

		for ( var i = 0; i < this.arrActiveReceptions.length; i++) {
		    var objRanch = null;
		    var objLocation = null;
		    var objCattle = null;

		    if (objRanch = crudRancher
			    .getByID(this.arrActiveReceptions[i].rancherId)
			    || crudEnterpriseRancher
				    .getByID(this.arrActiveReceptions[i].rancherId))
			this.arrActiveReceptions[i].rancherName = objRanch.name;

		    if (objLocation = crudLocation
			    .getByID(this.arrActiveReceptions[i].locationId))
			this.arrActiveReceptions[i].locationName = objLocation.locationName;

		    if (objCattle = crudCattle
			    .getCattleTypeById(this.arrActiveReceptions[i].cattleType))
			this.arrActiveReceptions[i].cattype_name = objCattle.cattypeName;

		}

		this.arrFilter = this.arrActiveReceptions;

		this.$.zone.setItems(cacheMan.getAllZonesForList());

		// if(this.$.zone.getItems().length > 0 ){
		// this.defaultZone = this.$.zone.getFirstOne().value;
		// }
		// if(this.$.cattleType.getItems().length > 0 ){
		// this.defaultCattle = this.$.cattleType.getFirstOne().value;
		// }
		//				
		// this.load_barnyards();
		// this.$.barnyards.setItems(this.$.barnyards.getFilter());

		this.$.fechaPicker.setValue(new Date());
		this.cambioDeFecha();

		cacheMan.hideScrim();
	    },
	    scroll : function(inSender, inEvent) {
		switch (inSender.name) {
		case "FormScroller":
		    if (this.$.FormScroller.getScrollTop() < -20) {
			this.$.FormScroller.scrollTo(30, 0);
		    }
		    break;
		case "listaScroller":
		    if (this.$.listaScroller.getScrollTop() < -20) {
			this.$.listaScroller.scrollTo(0, 0);
		    }
		}
	    },
	    emularTabulacionConEnter : function(inSender) {
		switch (inSender.name) {
		case "rancher":
		    this.$.rancher.setIndex(this.$.rancher.getIndex());
		    this.$.zone.setFocus();
		    break;
		case "zone":
		    this.$.zone.setIndex(this.$.zone.getIndex());
		    this.$.autorizacion.forceFocus();
		    break;
		case "autorizacion":
		    this.$.origin.setFocus();
		    break;
		case "origin":
		    this.$.origin.setIndex(this.$.origin.getIndex());
		    this.$.cattleType.setFocus();
		    break;
		case "cattleType":
		    this.$.cattleType.setIndex(this.$.cattleType.getIndex());
		    this.$.cantidad.setFocus();
		    break;
		case "cantidad":
		    this.$.barnyards.setFocus();
		    break;
		case "barnyards":
		    if (this.$.draAdd.open) {
			this.saveInspectionForecast();
		    } else if (this.$.draUpdate.open) {
			this.updateForecast();
		    }
		    this.$.rancher.setFocus();
		    break;
		}
	    },
	    key_down : function(inSender, inEvent) {
		if (inEvent.keyCode == 13) {
		    this.emularTabulacionConEnter(inSender);
		}
	    },
	    resetValues : function() {
		// cleaning fileds:
		this.$.rancher.clear();
		this.$.autorizacion.setValue("");
		this.$.origin.clear();
		this.$.cattleType.clear();
		this.$.cantidad.setValue("");
		this.$.zone.clear();
		this.$.barnyards.clear();

		// cleaning filter:
		this.actualFilter.rancherId = "";
		this.actualFilter.zoneId = "";
		this.actualFilter.locationId = "";
		this.actualFilter.cattleType = "";
		this.actualFilter.receptionId = "";

		this.arrFilter = this.arrActiveReceptions;

		if (this.$.zone.getItems().length > 0) {
		    this.defaultZone = this.$.zone.getFirstOne().value;
		}
		if (this.$.cattleType.getItems().length > 0) {
		    this.defaultCattle = this.$.cattleType.getFirstOne().value;
		}

		this.load_combos();
		this.$.barnyards.setItems(this.$.barnyards.getFilter());
		this.autoCompleteFields();
	    },
	    cambioDeFecha : function() {
		this.$.fechaPicker.setValue(new Date(this.$.fechaPicker.getValue()));
		this.fecha = this.$.fechaPicker.getDate();

		// this.$.cattleType.setIndex(1);
		// this.$.zone.setIndex(1);

		this.updateList();

	    },
	    cambiarAHoy : function() {
		this.$.fechaPicker.setValue(new Date());
		this.cambioDeFecha();
	    },
	    autoCompleteFields : function() {
		if (this.arrAutocompleteFilter.length == 0)
		    this.arrAutocompleteFilter = this.arrFilter;

		if (this.$.rancher.getHighLighted()
			&& !this.actualAutocompleteFilter.rancherId) {
		    if (this.arrAutocompleteFilter.length == 1) {
			this.actualAutocompleteFilter.rancherId = true;
			this.$.rancher.index = this.arrAutocompleteFilter[0].rancherId;
			this.$.rancher
				.setValue(this.arrAutocompleteFilter[0].rancherName);
			// this.arrAutocompleteFilter
			// =this.filterByRancher(this.$.rancher.index,
			// this.arrAutocompleteFilter);
			// this.autoCompleteFields();
			// return;
		    } else {
			this.$.rancher.index = -1;
			this.$.rancher.setValue("");
		    }
		}

		if (this.$.zone.getHighLighted()
			&& !this.actualAutocompleteFilter.zoneId) {
		    if (this.defaultZone) {
			this.$.zone.index = this.defaultZone;
			this.actualAutocompleteFilter.zoneId = true;
			var oZone = cacheMan.getZoneByID(this.$.zone.index);
			if (oZone) {
			    this.$.zone.setValue(oZone.zone_name);
			} else {
			    this.$.zone.setValue("");
			}
		    } else {
			if (this.arrAutocompleteFilter.length == 1) {
			    this.actualAutocompleteFilter.zoneId = true;
			    this.$.zone.index = this.arrAutocompleteFilter[0].zoneId;
			    var oZone = cacheMan.getZoneByID(this.$.zone.index);
			    if (oZone) {
				this.$.zone.setValue(oZone.zone_name);
			    } else {
				this.$.zone.setValue("");
			    }
			} else {
			    this.$.zone.index = -1;
			    this.$.zone.setValue("");
			}
		    }
		}

		if (this.$.origin.getHighLighted()
			&& !this.actualAutocompleteFilter.locationId) {
		    if (this.arrAutocompleteFilter.length == 1) {
			this.actualAutocompleteFilter.locationId = true;
			this.$.origin.index = this.arrAutocompleteFilter[0].locationId;
			this.$.origin
				.setValue(this.arrAutocompleteFilter[0].locationName);
			// this.arrAutocompleteFilter
			// =this.filterByOrigin(this.$.origin.index,
			// this.arrAutocompleteFilter);
			// this.autoCompleteFields();
		    } else {
			this.$.origin.index = -1;
			this.$.origin.setValue("");
		    }
		}
		if (this.$.cattleType.getHighLighted()
			&& !this.actualAutocompleteFilter.cattleType) {
		    if (this.arrAutocompleteFilter.length == 1) {
			this.actualAutocompleteFilter.cattleType = true;
			this.$.cattleType.index = this.arrAutocompleteFilter[0].cattleType;
			this.$.cattleType
				.setValue(this.arrAutocompleteFilter[0].cattype_name);
			// this.arrAutocompleteFilter
			// =this.filterByCattle(this.$.cattleType.index,
			// this.arrAutocompleteFilter);
			// this.autoCompleteFields();
		    } else {
			if (this.defaultCattle) {
			    this.actualAutocompleteFilter.cattleType = true;
			    this.$.cattleType.index = this.defaultCattle;
			    var oCattle = crudCattle
				    .getCattleTypeById(this.$.cattleType.index);
			    if (oCattle) {
				this.$.cattleType.setValue(oCattle.cattypeName);
			    } else {
				this.$.cattleType.setValue("");
			    }
			} else {
			    this.$.cattleType.index = -1;
			    this.$.cattleType.setValue("");
			}
		    }
		}
		if (this.$.barnyards.getHighLighted()
			&& !this.actualAutocompleteFilter.receptionId) {
		    this.$.barnyards.value = -1;
		    this.$.barnyards.setText("");
		    if (this.arrAutocompleteFilter.length == 1) {
			var arrBY = this.$.barnyards.getFilter();
			for ( var i = 0; i < arrBY.length; i++) {
			    if (arrBY[i].value == this.arrAutocompleteFilter[0].receptionId) {
				this.actualAutocompleteFilter.receptionId = true;
				this.$.barnyards.value = arrBY[i].value;
				this.$.barnyards.setText(arrBY[i].caption);
			    }
			}
		    }
		}

		this.arrAutocompleteFilter = [];
		this.actualAutocompleteFilter = {
		    rancherId : undefined,
		    zoneId : undefined,
		    locationId : undefined,
		    cattleType : undefined,
		    receptionId : undefined, // reception for barnyards
		};
	    },
	    on_select_item : function(InSender, InEvent) {
		switch (InSender.name) {
		case "rancher":
		    this.actualFilter.rancherId = InSender.index;
		    break;
		case "zone":
		    this.actualFilter.zoneId = InSender.index;
		    this.defaultZone = InSender.index;
		    this.load_barnyards();
		    // this.barnyardsFilter.zoneId = this.defaultZone;
		    // this.$.barnyards.setFilterCriteria(this.barnyardsFilter);
		    break;
		case "origin":
		    this.actualFilter.locationId = InSender.index;
		    break;
		case "cattleType":
		    this.actualFilter.cattleType = InSender.index;
		    this.defaultCattle = InSender.index;
		    // this.barnyardsFilter.cattleType = this.defaultCattle;
		    // this.$.barnyards.setFilterCriteria(this.barnyardsFilter);
		    break;
		case "barnyards":
		    this.actualFilter.receptionId = InSender.index;
		    break;
		}
		this.applyFilter();

		this.autoCompleteFields();

	    },
	    applyFilter : function() {
		this.arrFilter = this.arrActiveReceptions;
		if (this.actualFilter.rancherId != ""
			&& this.actualFilter.rancherId > -1) {
		    this.arrFilter = this.filterByRancher(
			    this.actualFilter.rancherId, this.arrFilter);
		}
		if (this.actualFilter.zoneId != ""
			&& this.actualFilter.zoneId > -1) {
		    // this.arrFilter =
		    // this.filterByZone(this.actualFilter.zoneId,
		    // this.arrFilter);
		}
		if (this.actualFilter.locationId != ""
			&& this.actualFilter.locationId > -1) {
		    this.arrFilter = this.filterByOrigin(
			    this.actualFilter.locationId, this.arrFilter);
		}
		if (this.actualFilter.cattleType != ""
			&& this.actualFilter.cattleType > -1) {
		    this.arrFilter = this.filterByCattle(
			    this.actualFilter.cattleType, this.arrFilter);
		}
		if (this.actualFilter.receptionId != ""
			&& this.actualFilter.receptionId > -1) {
		    this.arrFilter = this.filterByReception(
			    this.actualFilter.receptionId, this.arrFilter);
		}
	    },
	    filterByRancher : function(rancherId, arrAfected) {
		var arrResult = [];
		if (rancherId > -1) {
		    if (arrAfected.length > 0) {
			for ( var i = 0; i < arrAfected.length; i++) {
			    if (arrAfected[i].rancherId == rancherId) {
				arrResult.push(arrAfected[i]);
			    }
			}
		    } else {
			for ( var i = 0; i < this.arrActiveReceptions.length; i++) {
			    if (this.arrActiveReceptions[i].rancherId == rancherId) {
				arrResult.push(this.arrActiveReceptions[i]);
			    }
			}
		    }
		}
		return arrResult;
	    },
	    filterByZone : function(zoneId, arrAfected) {
		var arrResult = [];
		if (parseInt(zoneId) > -1) {
		    if (arrAfected.length > 0) {
			for ( var i = 0; i < arrAfected.length; i++) {
			    if (parseInt(arrAfected[i].zoneId) == parseInt(zoneId)) {
				arrResult.push(arrAfected[i]);
			    }
			}
		    } else {
			for ( var i = 0; i < this.arrActiveReceptions.length; i++) {
			    if (parseInt(this.arrActiveReceptions[i].zoneId) == parseInt(zoneId)) {
				arrResult.push(this.arrActiveReceptions[i]);
			    }
			}
		    }
		}
		return arrResult;
	    },
	    filterByOrigin : function(locationId, arrAfected) {
		var arrResult = [];
		if (locationId > -1) {
		    if (arrAfected.length > 0) {
			for ( var i = 0; i < arrAfected.length; i++) {
			    if (arrAfected[i].locationId == locationId) {
				arrResult.push(arrAfected[i]);
			    }
			}
		    } else {
			for ( var i = 0; i < this.arrActiveReceptions.length; i++) {
			    if (this.arrActiveReceptions[i].locationId == locationId) {
				arrResult.push(this.arrActiveReceptions[i]);
			    }
			}
		    }
		}
		return arrResult;
	    },
	    filterByCattle : function(cattleType, arrAfected) {
		var arrResult = [];
		if (cattleType > -1) {
		    if (arrAfected.length > 0) {
			for ( var i = 0; i < arrAfected.length; i++) {
			    if (arrAfected[i].cattleType == cattleType) {
				arrResult.push(arrAfected[i]);
			    }
			}
		    } else {
			for ( var i = 0; i < this.arrActiveReceptions.length; i++) {
			    if (this.arrActiveReceptions[i].cattleType == cattleType) {
				arrResult.push(this.arrActiveReceptions[i]);
			    }
			}
		    }
		}
		return arrResult;
	    },
	    filterByReception : function(receptionId, arrAfected) {
		var arrResult = [];
		if (receptionId > -1) {
		    if (arrAfected.length > 0) {
			for ( var i = 0; i < arrAfected.length; i++) {
			    if (arrAfected[i].receptionId == receptionId) {
				arrResult.push(arrAfected[i]);
			    }
			}
		    } else {
			for ( var i = 0; i < this.arrActiveReceptions.length; i++) {
			    if (this.arrActiveReceptions[i].receptionId == receptionId) {
				arrResult.push(this.arrActiveReceptions[i]);
			    }
			}
		    }
		}
		return arrResult;
	    },
	    load_combos : function() {
		this.load_ranchers();
		this.load_zones();
		this.load_origins();
		this.load_cattles();
		this.load_barnyards();
	    },
	    load_ranchers : function() {
		var arrResult = [];
		var result = [];
		if (this.arrFilter.length > 0) {
		    for ( var i = 0; i < this.arrFilter.length; i++) {
			var obj = {
			    value : this.arrFilter[i].rancherId,
			    caption : this.arrFilter[i].rancherName
			};
			if (!(arrResult[obj.value] in arrResult)) {
			    arrResult[obj.value] = obj;
			}
		    }
		}

		for ( var i = 0; i < arrResult.length; i++) {
		    result.push(arrResult[i]);
		}

		this.$.rancher.setFilter(result);
	    },
	    load_zones : function() {
		var arrResult = [];
		var result = [];
		if (this.arrFilter.length > 0) {
		    for ( var i = 0; i < this.arrFilter.length; i++) {
			var obj = {
			    value : this.arrFilter[i].zoneId,
			    caption : ""
			};
			var oZone = cacheMan
				.getZoneByID(this.arrFilter[i].zoneId);
			if (oZone) {
			    obj.caption = oZone.zone_name;
			}
			if (!(arrResult[obj.value] in arrResult)) {
			    arrResult[obj.value] = obj;
			}
		    }
		}
		for ( var i = 0; i < arrResult.length; i++) {
		    result.push(arrResult[i]);
		}
		this.$.zone.setFilter(result);
	    },
	    load_origins : function() {
		var arrResult = [];
		var result = [];
		if (this.arrFilter.length > 0) {
		    for ( var i = 0; i < this.arrFilter.length; i++) {
			var obj = {
			    value : this.arrFilter[i].locationId,
			    caption : this.arrFilter[i].locationName
			};
			if (!(arrResult[obj.value] in arrResult)) {
			    arrResult[obj.value] = obj;
			}
		    }
		}
		for ( var i = 0; i < arrResult.length; i++) {
		    result.push(arrResult[i]);
		}
		this.$.origin.setFilter(result);
	    },
	    load_cattles : function() {
		var arrResult = [];
		var result = [];
		if (this.arrFilter.length > 0) {
		    for ( var i = 0; i < this.arrFilter.length; i++) {
			var obj = {
			    value : this.arrFilter[i].cattleType,
			    caption : this.arrFilter[i].cattype_name
			};
			if (!(arrResult[obj.value] in arrResult)) {
			    arrResult[obj.value] = obj;
			}
		    }
		}
		for ( var i = 0; i < arrResult.length; i++) {
		    result.push(arrResult[i]);
		}
		this.$.cattleType.setFilter(result);
	    },
	    load_barnyards : function() {
		var arrResult = [];
		var result = [];
		if (this.arrActiveReceptions.length > 0) {
		    for ( var i = 0; i < this.arrActiveReceptions.length; i++) {
			var auxCaption = "";
			if (this.arrActiveReceptions[i].Pen) {

			    for ( var j = 0; j < this.arrActiveReceptions[i].Pen.length; j++) {

				if (parseInt(this.arrActiveReceptions[i].Pen[j].locationId) == parseInt(this.defaultZone)) {
				    auxCaption += this.arrActiveReceptions[i].Pen[j].barnyardCode
					    + ", ";
				}
			    }
			}
			if (auxCaption.length > 0) {
			    auxCaption = auxCaption.slice(0, -2);
			    var obj = {
				value : this.arrActiveReceptions[i].receptionId,
				caption : auxCaption
			    // cattleType: this.arrFilter[i].cattleType,
			    // zoneId: this.arrFilter[i].zoneId
			    };
			    if (!(arrResult[obj.value] in arrResult)) {
				arrResult[obj.value] = obj;
			    }
			}
		    }
		}
		for ( var i = 0; i < arrResult.length; i++) {
		    result.push(arrResult[i]);
		}
		this.$.barnyards.setFilter(result);
	    },
	    // addRancherSelected : function(rancherId) {
	    // if (rancherId > -1) {
	    // for ( var i = 0; i < this.arrReceptions.length; i++) {
	    // if (this.arrReceptions[i].rancherId == rancherId) {
	    // return;
	    // }
	    // }
	    //
	    // var objRancherSelected = {
	    // rancherId : rancherId,
	    // receptions : crudReception
	    // .getReceptionsByRancherID(rancherId),
	    // origins : [],
	    // cattleTypes : [],
	    // zones : [],
	    // barnyards : []
	    // };
	    //
	    // this.arrReceptions.push(objRancherSelected);
	    // }
	    // },
	    selectForecast : function(inSender, inEvent) {
		var objFore = null;
		if (objFore = this.objList[inEvent.rowIndex]) {
		    this.$.rancher.setIndex(objFore.rancherId);
		    this.$.autorizacion.setValue(objFore.auth || "");
		    this.$.origin.setIndex(objFore.origin);
		    this.$.cattleType.setIndex(objFore.cattleType);

		    this.$.cantidad.setValue(objFore.quantity);
		    this.$.zone.setIndex(objFore.zoneId);
		    if (objFore.Pen.length > 0) {
			var strBarnyards = "";
			for ( var i = 0; i < objFore.Pen.length; i++) {
			    strBarnyards += objFore.Pen[i].barnyardCode + ", ";
			}
			strBarnyards = strBarnyards.slice(0, -2);
			this.$.barnyards.setText(strBarnyards);
		    } else {
			this.$.barnyards.setText("");
		    }
		    this.$.barnyards.setHighLighted(false);
		    this.iSelected = inEvent.rowIndex;
		    this.totalItems = 0;
		    this.$.forecastList.render();
		    this.$.draDel.render();
		    this.$.draDel.setOpen(true);
		    this.$.draAdd.setOpen(false);
		    this.$.draUpdate.setOpen(true);
		}
	    },
	    setupForecastRow : function(inSender, inIndex) {
		var objFore;
		if (objFore = this.objList[inIndex]) {
		    var auxRancher = crudRancher.getByID(objFore.rancherId)
			    || crudEnterpriseRancher.getByID(objFore.rancherId);
		    if (auxRancher) {
			this.$.listRancher.setContent(auxRancher.name);
		    }
		    this.$.listAuth.setContent(objFore.auth || "");
		    var oOrigin = crudLocation.getByID(objFore.origin);
		    if (oOrigin) {
			this.$.listOrigin.setContent(oOrigin.locationName);
		    } else {
			this.$.listOrigin.setContent("");
		    }

		    var oCattle = crudCattle
			    .getCattleTypeById(objFore.cattleType);
		    if (oCattle) {
			this.$.listCattleType.setContent(oCattle.cattypeName);
		    } else {
			this.$.listCattleType.setContent("");
		    }

		    this.$.listQuantity.setContent(objFore.quantity);

		    var oZone = cacheMan.getZoneByID(objFore.zoneId);
		    if (oZone) {
			this.$.listZone.setContent(oZone.zone_name);
		    } else {
			this.$.listZone.setContent("");
		    }

		    if (objFore.Pen.length > 0) {
			var strBarnyards = "";
			for ( var i = 0; i < objFore.Pen.length; i++) {
			    strBarnyards += objFore.Pen[i].barnyardCode + ", ";
			}
			strBarnyards = strBarnyards.slice(0, -2);
			this.$.listBarnyards.setContent(strBarnyards);
		    } else {
			this.$.listBarnyards.setContent("");
		    }
		    if (inIndex == this.iSelected) {
			this.$.rowItem.applyStyle("background-color",
				"cadetblue");
			this.$.listRancher.applyStyle("color", "white");
			this.$.listAuth.applyStyle("color", "white");
			this.$.listOrigin.applyStyle("color", "white");
			this.$.listCattleType.applyStyle("color", "white");
			this.$.listQuantity.applyStyle("color", "white");
			this.$.listZone.applyStyle("color", "white");
			this.$.listBarnyards.applyStyle("color", "white");
		    } else {
			this.$.rowItem.applyStyle("background-color", null);
			this.$.listRancher.applyStyle("color", null);
			this.$.listRancher.applyStyle("color", null);
			this.$.listAuth.applyStyle("color", null);
			this.$.listOrigin.applyStyle("color", null);
			this.$.listCattleType.applyStyle("color", null);
			this.$.listQuantity.applyStyle("color", null);
			this.$.listZone.applyStyle("color", null);
			this.$.listBarnyards.applyStyle("color", null);
		    }
		    this.totalItems++;
		    return true;
		}
		return false;
	    },
	    getSelected : function() {
		return this.objList[this.iSelected];
	    },
	    onCancel : function() {
		this.iSelected = null;
		this.$.draDel.setOpen(false);
		this.$.draAdd.setOpen(true);
		this.$.draUpdate.setOpen(false);
		this.totalItems = 0;
		this.resetValues();
		this.$.forecastList.render();
	    },
	    onEliminar : function() {
		if (this.dropForecast() == true) {
		    this.onCancel();
		}
	    },
	    saveInspectionForecast : function() {
		this.addInspectionForecast();
	    },
	    getInspectionForecastDetail : function(bUpdating) {

		var objInspectionDetail = {
		    Pen : [],
		    cattleType : this.$.cattleType.getIndex(),
		    entityName : "InspectionForecastDetail",
		    origin : this.$.origin.getIndex(),
		    quantity : this.$.cantidad.getValue(),
		    rancherId : this.$.rancher.getIndex(),
		    zoneId : this.$.zone.getIndex(),
		    auth : this.$.autorizacion.getValue()
		};

		if (bUpdating) {
		    objInspectionDetail.inspectionForecastDetailId = this.objList[this.iSelected].inspectionForecastDetailId;
		    objInspectionDetail.inspection_seq = this.objList[this.iSelected].inspection_seq || 0;
		} else {
		    if (this.objList.length > 0) {
			objInspectionDetail.inspection_seq = Number(this.objList[this.objList.length - 1].inspection_seq) + 1;
		    } else {
			objInspectionDetail.inspection_seq = 0;
		    }
		}

		var barnyardsAux = this.$.barnyards.getText().split(",");
		for ( var i = 0; i < barnyardsAux.length; i++) {
		    barnyardsAux[i] = barnyardsAux[i].replace(" ", "");
		    barnyardsAux[i] = this.$.zone.getIndex()
			    + barnyardsAux[i].toUpperCase();
		    var auxBarn = crudPen.getByBarnyard(barnyardsAux[i]);
		    if (auxBarn == undefined) {
			cacheMan.setMessage("", "[Exception ID: LOCAL"
				+ "] Descripción: No existe el corral: "
				+ barnyardsAux[i].slice(1)
				+ " para la localidad: "
				+ this.$.zone.getValue());
			return null;
		    }
		    objInspectionDetail.Pen.push(auxBarn);
		}

		return objInspectionDetail;
	    },
	    addInspectionForecast : function() {
		var objForecastDetail = this.getInspectionForecastDetail();
		if (objForecastDetail) {
		    if (!this.objInspection.InspectionForecastDetail)
			this.objInspection.InspectionForecastDetail = [];

		    this.objInspection.InspectionForecastDetail
			    .push(objForecastDetail);

		    if (this.objInspection.inspectionForecastId) {
			crudInspectionForecast.update(this.objInspection, this,
				"updateList");
		    } else {
			crudInspectionForecast.create(this.objInspection, this,
				"updateList");
		    }
		}
	    },
	    updateForecast : function() {
		var objForecastDetail = this.getInspectionForecastDetail(true);
		if (objForecastDetail) {
		    for ( var i = 0; i < this.objInspection.InspectionForecastDetail.length; i++) {
			if (this.objInspection.InspectionForecastDetail[i].inspectionForecastDetailId == objForecastDetail.inspectionForecastDetailId) {
			    this.objInspection.InspectionForecastDetail[i] = objForecastDetail;
			    crudInspectionForecast.update(this.objInspection,
				    this, "updateList");
			    return;
			}
		    }
		    cacheMan
			    .setMessage("Error. No se ha podido actualizar el registro seleccionado.");
		}
	    },
	    dropForecast : function() {
		for ( var i = 0; i < this.objInspection.InspectionForecastDetail.length; i++) {
		    if (this.objInspection.InspectionForecastDetail[i].inspectionForecastDetailId == this.objList[this.iSelected].inspectionForecastDetailId) {
			this.objInspection.InspectionForecastDetail.splice(i, 1);
			crudInspectionForecast.update(this.objInspection, this,
				"updateList");
			return;
		    }
		}
		cacheMan
			.setMessage("Error. No se ha podido eliminar el registro seleccionado.");
	    },
	    updateList : function() {
		cacheMan.showScrim();
		// initializing forecast master values***********************
		this._id = undefined;
		this.totalItems = 0;
		this.objList = [];
		this.objInspection = null;
		if(this.bMoving ==false) this.iSelected = null;
		// **********************************************************

		// add mode buttons
		this.$.draDel.setOpen(false);
		this.$.draUpdate.setOpen(false);
		this.$.draAdd.setOpen(true);

		// reset values and load combos
		this.resetValues();
		crudInspectionForecast.get(this, "getInspectionForecastDone");
	    },
	    getInspectionForecastDone : function() {
		var arrAllForecasts = [];
		var fmt = new enyo.g11n.DateFmt({
		    format : "yyyy/MM/dd",
		    locale : new enyo.g11n.Locale("es_es")
		});

		// filling up right side**************************************
		arrAllForecasts = crudInspectionForecast.arrObj;
		for ( var i = 0; i < arrAllForecasts.length; i++) {
		    if (fmt.format(arrAllForecasts[i].forecastDate) == fmt.format(this.fecha)) {
			this._id = arrAllForecasts[i].inspectionForecastId;
			this.objInspection = arrAllForecasts[i];
			if (arrAllForecasts[i].InspectionForecastDetail) {
			    for ( var j = 0; j < arrAllForecasts[i].InspectionForecastDetail.length; j++) {
				if (arrAllForecasts[i].InspectionForecastDetail[j].inspectionForecastDetailId) {
				    this.objList
					    .push(arrAllForecasts[i].InspectionForecastDetail[j]);
				}
			    }
			} else {
			    this.objInspection.InspectionForecastDestail = [];
			}
			break;
		    }
		}

		if (!this.objInspection) {
		    this.objInspection = {
			InspectionForecastDetail : [],
			entityName : "InspectionForecast",
			forecastDate : this.fecha,
			locked : "false"
		    };
		}

		this.objList.sort(function(a, b) {
		    return a.inspection_seq > b.inspection_seq;
		});

		this.$.forecastList.render();
		// ***********************************************************
		
		if(this.bMoving == true){
		    var inEventEmulated = {};
		    inEventEmulated.rowIndex = this.iSelected;
		    this.selectForecast(null, inEventEmulated);
		}
		
		cacheMan.hideScrim();
	    },
	    onMoverArriba : function() {
		if (this.objList.length > 0) {
		    if (this.iSelected > 0) {
			var tempInspectionSeq = this.objList[this.iSelected].inspection_seq;
			this.objList[this.iSelected].inspection_seq = this.objList[this.iSelected-1].inspection_seq;
			this.objList[this.iSelected - 1].inspection_seq = tempInspectionSeq;
			this.objInspection.InspectionForecastDetail = this.objList;
			this.bMoving = true;
			this.iSelected--;
			crudInspectionForecast.update(this.objInspection, this,
				"updateList");
		    }
		}
	    },
	    onMoverAbajo : function() {
		if (this.objList.length > 0) {
		    if (this.iSelected < this.objList.length - 1) {
			var tempInspectionSeq = this.objList[this.iSelected].inspection_seq;
			this.objList[this.iSelected].inspection_seq = this.objList[this.iSelected+1].inspection_seq;
			this.objList[this.iSelected + 1].inspection_seq=tempInspectionSeq;
			
			this.objInspection.InspectionForecastDetail = this.objList;
			this.bMoving = true;
			this.iSelected++;
			
			crudInspectionForecast.update(this.objInspection, this,
				"updateList");
		    }
		}
	    },
	    rowHold : function(inSender, inEvent) {
		inEvent.stopPropagation();
		this.iSelected = inEvent.rowIndex;
		this.$.options.setItems(this.arrPopupMenu);
		this.$.options.render();
		this.$.options.openAtEvent(inEvent);
	    },
	    actionSelected : function(inSender, inSelected) {
		switch (inSelected.value) {
		case 1: //Mover a mañana
		    var tomorrow = new Date();
		    tomorrow.setDate(tomorrow.getDate()+1);
		    
		    if(tomorrowInspection = crudInspectionForecast.getByDate(tomorrow)){
			
		    }else{
			tomorrowInspection = {
				InspectionForecastDetail : [],
				entityName : "InspectionForecast",
				forecastDate : tomorrow,
				locked : "false"
			    };
			var objForecastDetail = null;
			
			for ( var i = 0; i < this.objInspection.InspectionForecastDetail.length; i++) {
			    if (this.objInspection.InspectionForecastDetail[i].inspectionForecastDetailId == this.objList[this.iSelected].inspectionForecastDetailId) {
				objForecastDetail =  this.objInspection.InspectionForecastDetail[i];
				this.objInspection.InspectionForecastDetail.splice(i, 1);
			    }
			}
			if (objForecastDetail) {
			    objForecastDetail.inspection_seq = 0;
			    tomorrowInspection.InspectionForecastDetail.push(objForecastDetail);
			    
			    var arrEntity = [];
			    arrEntity.push(crudInspectionForecast.adapterToOut(tomorrowInspection));
			    arrEntity.push(crudInspectionForecast.adapterToOut(this.objInspection));
			    
			    consumingGateway.UpdateArrayParents("InspectionForecast", arrEntity, this, "updateList");
			}
		    }
		    
		    cacheMan.showScrim();
		    break;
		}
	    },
	});
