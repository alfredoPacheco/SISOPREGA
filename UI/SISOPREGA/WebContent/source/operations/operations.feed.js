enyo
	.kind({
	    name : "operations.feed",
	    kind : enyo.VFlexBox,
	    iSelect : null,
	    _arrBY : null,
	    _arrBYSelect : null,
	    _objRec : null,
	    objReception : null,
	    bySelected : "",
	    events:{
		onAfterLoad:"",
		onClosePopUp:"closePopUp"
	    },
	    afterLoad:function(){
		this.render();
		this.doAfterLoad();
		cacheMan.hideScrim();
	    },
	    components : [
		    {
			kind : "Popup",
			name : "manejo",
			lazy : false,
			cbMethod : "",
			showHideMode : "transition",
			className : "formBG",
			openClassName : "zoomFadeIn",
			className : "transitioner2",
			layoutKind : "VFlexLayout",
			width : "80%",
			style : "overflow: hidden;background-color: #DABD8B;padding:10px;",
			scrim : true,
			components : [ {
			    components : [ {
				kind : enyo.HFlexBox,
				align : "center",
				pack : "center",
				height : "40px;",
				style:"margin-bottom: 10px;",
				components : [
                                        {
                                            content : "Fecha y Hora:",
                                            width : "166px;",
                                            style : "text-align: right;margin-right:10px;"
                                        }, {
                                            kind : "ToolInput",
                                            name : "feedDate",
                                            hint : "mes/dia/año",
                                            flex : 1,
                                            height : "35px;",
                                            onfocus : "applyMask",
                                        },
                                        {
                                            kind : "ToolInput",
                                            name : "feedTime",
                                            hint : "HH:MM",
                                            flex : 1,
                                            height : "35px;",
                                            onfocus : "applyTimeMask",
                                        } 
                                        ]},{
				content : "Manejo"
			    }, {
				kind : "Input",
				name : "handling",
				hint : "Agregar comentario"
			    },
			    {
				kind : "Button",
				className : "enyo-button-affirmative",
				caption : "OK",
				onclick : "closeHandling"
			    } ]
			} ]
		    },
		    {
			kind : "Toolbar",
			name : "tbHeaderRec",
			style : "height:10px",
			pack:"center",
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
				    onclick : "doClosePopUp",
				    icon : "../SISOPREGA_WEB_LIB/images/command-menu/icon-context.png"
				} ]
		    },
		    {
			kind : enyo.Scroller,
			name : "scrollProductList",
			flex : 1,
			className : "listBG",
			components : [ {
			    kind : enyo.VirtualRepeater,
			    name : "productList",
			    onSetupRow : "setupRow",
			    onclick : "setFeed",
			    components : [ {
				kind : enyo.SwipeableItem,
				layoutKind : "VFlexLayout",
				onConfirm : "deleteFeed",
				tapHighlight : true,
				components : [ {
				    name : "by",
				    className : "listFirst",
				    style : "font-size:12px;",
				    content : "BY",
				    allowHtml : true
				}, {
				    layoutKind : enyo.HFlexLayout,
				    components : [ {
					name : "lblground",
					flex : 1,
					feed_id : 1,
					className : "listSecond",
					content : "MOLIDA(0)",
					fod_id : null
				    }, {
					name : "lblalfalfa",
					flex : 1,
					feed_id : 2,
					className : "listSecond",
					content : "ALFALFA(0)",
					fod_id : null
				    }, {
					name : "lbloat",
					flex : 1,
					feed_id : 3,
					className : "listSecond",
					content : "AVENA(0)",
					fod_id : null
				    }, {
					name : "lblconcentrated",
					flex : 1.3,
					feed_id : 4,
					className : "listSecond",
					content : "COCENTRADO(0)",
					fod_id : null
				    }, {
					name : "lblcorn",
					flex : 1,
					feed_id : 5,
					className : "listSecond",
					content : "MAIZ(0)",
					fod_id : null
				    }, ]
				}, {
				    name : "lblhandling",
				    className : "listSecond",
				    style : "font-size:12px",
				    content : ""
				} ]
			    }, ]
			}, ],
		    },
		    {
			kind : "Toolbar",
			components : [
				{
				    kind : "controls.numberBox",
				    inputKind : "ToolInput",
				    name : "ground",
				    flex : 1,
				    width : "10%",
				    height : "35px;",
				    inputType : "number",
				    hint : "Molida",
				    changeOnInput : true,
				    fod_id : null,
				    fontColor:"#e5e5e5"
				},
				{
				    kind : "controls.numberBox",
				    inputKind : "ToolInput",
				    name : "alfalfa",
				    flex : 1,
				    width : "10%",
				    height : "35px;",
				    inputType : "number",
				    hint : "Alfalfa",
				    changeOnInput : true,
				    fontColor:"#e5e5e5"
				},
				{
				    kind : "controls.numberBox",
				    inputKind : "ToolInput",
				    name : "oat",
				    flex : 1,
				    width : "10%",
				    height : "35px;",
				    inputType : "number",
				    hint : "Avena",
				    changeOnInput : true,
				    fontColor:"#e5e5e5"
				},
				{
				    kind : "controls.numberBox",
				    inputKind : "ToolInput",
				    name : "concentrated",
				    flex : 1.3,
				    width : "12%",
				    height : "35px;",
				    inputType : "number",
				    hint : "Concentrado",
				    changeOnInput : true,
				    fontColor:"#e5e5e5"
				},
				{
				    kind : "controls.numberBox",
				    inputKind : "ToolInput",
				    name : "corn",
				    flex : 1,
				    width : "10%",
				    height : "35px;",
				    inputType : "number",
				    hint : "corn",
				    changeOnInput : true,
				    fontColor:"#e5e5e5"
				},
				{
				    kind : "Spacer"
				},
				{
				    kind : "Drawer",
				    name : "draAdd",
				    components : [ {
					layoutKind : "HFlexLayout",
					align : "center",
					components : [
						{
						    kind : "enyo.IconButton",
						    name : "btnReport",
						    icon : "../SISOPREGA_WEB_LIB/images/menu-icon-cards.png",
						    onclick : "openFeedingReport"
						},
						{
						    kind : "enyo.IconButton",
						    name : "btnAdd",
						    icon : "../SISOPREGA_WEB_LIB/images/menu-icon-new.png",
						    onclick : "addFeedHandling"
						} ]
				    } ]
				},
				{
				    kind : "Drawer",
				    name : "draUpdate",
				    components : [ {
					layoutKind : "HFlexLayout",
					align : "center",
					components : [
						{
						    kind : "enyo.IconButton",
						    name : "btnUpdate",
						    icon : "../SISOPREGA_WEB_LIB/images/btn_edit.png",
						    flex : 1,
						    onclick : "updateFeedHandling"
						},
						{
						    kind : "Button",
						    name : "btnCancel",
						    className : "enyo-button-negative",
						    flex : 1,
						    caption : "X",
						    onclick : "toggleAdd"
						}, ]
				    } ]
				} ]
		    }, ],
	    ready : function(InSender, InEvent) {
		this.bySelected = this.$.lblBYselected;
		this.$.lblInfo.setContent(_objMainHeader.getContent());
	    },
	    setupRow : function(inSender, inIndex) {
		var objFeed;
		if (this._objRec.feed) {
		    if (objFeed = this._objRec.feed[inIndex]) {
			var objFeedfeed;
			var sBy = "";
			for ( var sKey in objFeed.barnyards) {
			    sBy += sKey.slice(1) + ", ";
			}
			sBy = sBy.slice(0, -2);
			this.$.lblhandling.setContent(objFeed.handling);
			this.$.by
				.setContent(""
					+ objFeed.dateAndTime.toLocaleString()
					+ "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Corrales: ["
					+ sBy + "]");

			if (objFeedfeed = objFeed.feed[this.$.lblground.feed_id]) {
			    if (objFeedfeed.feed_units) {
				this.$.lblground
					.setContent(objFeedfeed.feed_desc
						+ " ( "
						+ objFeedfeed.feed_units + " )");
				this.$.lblground.fod_id = objFeedfeed.fod_id;
			    }
			}
			if (objFeedfeed = objFeed.feed[this.$.lblalfalfa.feed_id]) {
			    if (objFeedfeed.feed_units) {
				this.$.lblalfalfa
					.setContent(objFeedfeed.feed_desc
						+ " ( "
						+ objFeedfeed.feed_units + " )");
				this.$.lblalfalfa.fod_id = objFeedfeed.fod_id;
			    }
			}
			if (objFeedfeed = objFeed.feed[this.$.lbloat.feed_id]) {
			    if (objFeedfeed.feed_units) {
				this.$.lbloat
					.setContent(objFeedfeed.feed_desc
						+ " ( "
						+ objFeedfeed.feed_units + " )");
				this.$.lbloat.fod_id = objFeedfeed.fod_id;
			    }
			}
			if (objFeedfeed = objFeed.feed[this.$.lblconcentrated.feed_id]) {
			    if (objFeedfeed.feed_units) {
				this.$.lblconcentrated
					.setContent(objFeedfeed.feed_desc
						+ " ( "
						+ objFeedfeed.feed_units + " )");
				this.$.lblconcentrated.fod_id = objFeedfeed.fod_id;
			    }
			}
			if (objFeedfeed = objFeed.feed[this.$.lblcorn.feed_id]) {
			    if (objFeedfeed.feed_units) {
				this.$.lblcorn
					.setContent(objFeedfeed.feed_desc
						+ " ( "
						+ objFeedfeed.feed_units + " )");
				this.$.lblcorn.fod_id = objFeedfeed.fod_id;
			    }
			}
			return true;
		    }
		}
	    },
	    closeHandling : function() {
		this.$.manejo.close();
		this[this.$.manejo.cbMethod]();
	    },
	    addFeedHandling : function() {
		this.$.manejo.cbMethod = "addFeed";
		this.$.feedDate.setValue(utils.dateOut(new Date()));
		this.$.feedTime.setValue(new Date().toTimeString().replace(/.*(\d{2}:\d{2})(:\d{2}).*/, "$1"));
		this.$.manejo.openAtCenter();
	    },
	    updateFeedHandling : function() {
		this.$.manejo.cbMethod = "updateFeed";
		this.$.manejo.openAtCenter();
	    },
	    getFeed : function(sOp) {
		var objData = {
		    feeding_id : null,
		    barnyards : {},
		    feed : {},
		    handling : "",
		    dateAndTime : ""
		};

		var objFeed = {
		    feed_id : "",
		    feed_desc : "",
		    feed_units : "",
		    fod_id : null
		};
		objFeed.feed_id = 1;
		objFeed.feed_desc = cacheFeed.getByID(objFeed.feed_id).feed_desc;
		objFeed.feed_units = this.$.ground.getValue();
		objFeed.fod_id = this.$.ground.fod_id;
		objData.feed[objFeed.feed_id] = objFeed;

		objFeed = {
		    feed_id : "",
		    feed_desc : "",
		    feed_units : "",
		    fod_id : null
		};
		objFeed.feed_id = 2;
		objFeed.feed_desc = cacheFeed.getByID(objFeed.feed_id).feed_desc;
		objFeed.feed_units = this.$.alfalfa.getValue();
		objFeed.fod_id = this.$.alfalfa.fod_id;
		objData.feed[objFeed.feed_id] = objFeed;

		objFeed = {
		    feed_id : "",
		    feed_desc : "",
		    feed_units : "",
		    fod_id : null
		};
		objFeed.feed_id = 3;
		objFeed.feed_desc = cacheFeed.getByID(objFeed.feed_id).feed_desc;
		objFeed.feed_units = this.$.oat.getValue();
		objFeed.fod_id = this.$.oat.fod_id;
		objData.feed[objFeed.feed_id] = objFeed;

		objFeed = {
		    feed_id : "",
		    feed_desc : "",
		    feed_units : "",
		    fod_id : null
		};
		objFeed.feed_id = 4;
		objFeed.feed_desc = cacheFeed.getByID(objFeed.feed_id).feed_desc;
		objFeed.feed_units = this.$.concentrated.getValue();
		objFeed.fod_id = this.$.concentrated.fod_id;
		objData.feed[objFeed.feed_id] = objFeed;

		objFeed = {
		    feed_id : "",
		    feed_desc : "",
		    feed_units : "",
		    fod_id : null
		};
		objFeed.feed_id = 5;
		objFeed.feed_desc = cacheFeed.getByID(objFeed.feed_id).feed_desc;
		objFeed.feed_units = this.$.corn.getValue();
		objFeed.fod_id = this.$.corn.fod_id;
		objData.feed[objFeed.feed_id] = objFeed;

		objData.handling = this.$.handling.getValue();
		objData.dateAndTime = new Date("" + this.$.feedDate.getValue() + " " + this.$.feedTime.getValue());
		
		if (sOp == "add") {
		    objData.barnyards = enyo.clone(this._arrBY);
		} else {
		    objData.barnyards = enyo.clone(this._arrBYSelected);
		}
		return this.validateFeed(objData);
	    },
	    validateFeed:function(objFeed){
		if(objFeed.dateAndTime.toString() == "Invalid Date"){
		    cacheMan.setMessage("","Error. Fecha u hora incorrecta.");
		    return null;
		    
		}
		return objFeed;
	    },
	    updatetList : function() {
		this._objRec.feed.sort(function(a,b){return a.feeding_id >b.feeding_id;});
		//this.filter.sort(function(a,b){return a.caption >b.caption;});
		this.$.productList.render();
		this.updateHeader();
	    },
	    setFeed : function(inSender, inEvent) {
		this.resetValues();
		this.iSelect = inEvent.rowIndex;
		var objFeed;
		if (objFeed = this._objRec.feed[inEvent.rowIndex]) {
		    if (objFeedfeed = objFeed.feed[this.$.lblground.feed_id]) {
			this.$.ground.setValue(objFeedfeed.feed_units);
			this.$.ground.fod_id = objFeedfeed.fod_id;
		    }
		    if (objFeedfeed = objFeed.feed[this.$.lblalfalfa.feed_id]) {
			this.$.alfalfa.setValue(objFeedfeed.feed_units);
			this.$.alfalfa.fod_id = objFeedfeed.fod_id;
		    }
		    if (objFeedfeed = objFeed.feed[this.$.lbloat.feed_id]) {
			this.$.oat.setValue(objFeedfeed.feed_units);
			this.$.oat.fod_id = objFeedfeed.fod_id;
		    }
		    if (objFeedfeed = objFeed.feed[this.$.lblconcentrated.feed_id]) {
			this.$.concentrated.setValue(objFeedfeed.feed_units);
			this.$.concentrated.fod_id = objFeedfeed.fod_id;
		    }
		    if (objFeedfeed = objFeed.feed[this.$.lblcorn.feed_id]) {
			this.$.corn.setValue(objFeedfeed.feed_units);
			this.$.corn.fod_id = objFeedfeed.fod_id;
		    }
		    this.toggleUpdate();
		    this._arrBYSelected = objFeed.barnyards;
		    this.$.handling.setValue(objFeed.handling);
		    this.$.feedDate.setValue(utils.dateOut(new Date(objFeed.dateAndTime)));
		    this.$.feedTime.setValue(new Date(objFeed.dateAndTime).toLocaleTimeString().substring(0, 5));
		}

	    },
	    toggleUpdate : function() {
		this.$.draAdd.setOpen(false);
		this.$.draUpdate.setOpen(true);
	    },
	    toggleAdd : function() {
		this.$.draAdd.setOpen(true);
		this.$.draUpdate.setOpen(false);
	    },
	    resetValues : function(bLoad) {
		// get last formula
		// same by?
		var bLast = true;
		// var feedLast;
		if (bLoad === true && this._objRec.feed.length > 0) {
		    for ( var sKey in this._arrBY) {
			try {
			    if (!this._objRec.feed[this._objRec.feed.length - 1].barnyards[sKey]) {
				bLast = false;
				break;
			    }
			} catch (e) {
			    console.error(e.message);
			}
			;

		    }
		    if (bLast == true) {
			for ( var sKey in this._objRec.feed[this._objRec.feed.length - 1].barnyards) {
			    if (!this._arrBY[sKey]) {
				bLast = false;
				break;
			    }
			}
		    }
		} else {
		    bLast = false;
		}
		if (bLoad === true && bLast === true) {
		    var objFeed = this._objRec.feed[this._objRec.feed.length - 1].feed;
		    var objFeedF;
		    this.$.handling
			    .setValue(this._objRec.feed[this._objRec.feed.length - 1].handling);
		    if (objFeedF = objFeed[1]) {
			this.$.ground.setValue(objFeedF.feed_units);
		    }
		    if (objFeedF = objFeed[2]) {
			this.$.alfalfa.setValue(objFeedF.feed_units);
		    }
		    if (objFeedF = objFeed[3]) {
			this.$.oat.setValue(objFeedF.feed_units);
		    }
		    if (objFeedF = objFeed[4]) {
			this.$.concentrated.setValue(objFeedF.feed_units);
		    }
		    if (objFeedF = objFeed[5]) {
			this.$.corn.setValue(objFeedF.feed_units);
		    }
		} else {

		    this.$.ground.setValue("");
		    this.$.alfalfa.setValue("");
		    this.$.oat.setValue("");
		    this.$.concentrated.setValue("");
		    this.$.corn.setValue("");
		    this.$.handling.setValue("");
		    this.$.feedDate.setValue(utils.dateOut(new Date()));
		    this.$.feedTime.setValue(new Date().toLocaleTimeString().substring(0, 5));
		    
		}
		this.updatetList();
	    },
	    updateHeader : function() {
		var corralesSeleccionados = "";
		var arrAux = this._arrBY;
		for ( var i in arrAux) {
		    if (arrAux.hasOwnProperty(i)) {
			corralesSeleccionados = "" + corralesSeleccionados
				+ " " + arrAux[i].slice(1) + " ";
		    }
		}
		corralesSeleccionados.slice(-2);
		this.bySelected.setContent("Alimentando corrales: "
			+ corralesSeleccionados);
	    },
	    openFeedingReport : function() {
		var feedOrderId = this._objRec.feed[this._objRec.feed.length - 1].feeding_id;
		var reportName = '/ReportingGateway/OrdenDeAlimento?Id='
			+ feedOrderId;
		utils.openReport(reportName);

	    },
	    set : function(objRec, arrBY) {
		this.objReception = enyo.clone(objRec);
		this._objRec = this.adapterIn(this.objReception);
		this._arrBY = arrBY;
		this.resetValues(true);
		this.afterLoad();
	    },
	    adapterOut : function(objNew, bUpdating) {

		var objFeed = {
		    FeedOrderDetails : [],
		    Pen : [],
		    entityName : "FeedOrder",
		    feedDate : objNew.dateAndTime,
		    feedOriginator : "",
		    handling : objNew.handling
		};

		if (bUpdating)
		    objFeed.feedOrderId = this.objReception.FeedOrder[this.iSelect].feedOrderId;

		for (by in objNew.barnyards) {
		    if (objNew.barnyards.hasOwnProperty(by)) {
			objFeed.Pen.push(crudPen.getByBarnyard(by));
		    }
		}

		for (feed in objNew.feed) {
		    if (objNew.feed.hasOwnProperty(feed)
			    && objNew.feed[feed].feed_units != "") {
			var feedDetail = {
			    entityName : "FeedOrderDetails",
			    foodId : objNew.feed[feed].feed_id,
			    quantity : objNew.feed[feed].feed_units
			};
			if (objNew.feed[feed].fod_id && bUpdating)
			    feedDetail.feedOrderDetailsId = objNew.feed[feed].fod_id;
			objFeed.FeedOrderDetails.push(feedDetail);
		    }
		}

		return objFeed;
	    },
	    adapterIn : function(objRec) {
		var obj_Reception = {
		    feed : []
		};

		if (objRec.FeedOrder) {
		    for ( var i = 0; i < objRec.FeedOrder.length; i++) {

			// feedOrder:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
			var feedAux = {};
			feedAux.feeding_id = objRec.FeedOrder[i].feedOrderId;
			feedAux.handling = objRec.FeedOrder[i].handling;
			feedAux.dateAndTime = objRec.FeedOrder[i].feedDate;

			// feedOrderDetails:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
			if (objRec.FeedOrder[i].FeedOrderDetails) {
			    var arrFeedDetailsAux = objRec.FeedOrder[i].FeedOrderDetails;
			    var feedDetailsAux = {};
			    for ( var fd = 0; fd < arrFeedDetailsAux.length; fd++) {
				feedDetailsAux[arrFeedDetailsAux[fd].foodId] = {};
				feedDetailsAux[arrFeedDetailsAux[fd].foodId].feed_desc = cacheFeed
					.getByID(arrFeedDetailsAux[fd].foodId).feed_desc;
				feedDetailsAux[arrFeedDetailsAux[fd].foodId].feed_units = arrFeedDetailsAux[fd].quantity;
				feedDetailsAux[arrFeedDetailsAux[fd].foodId].fod_id = arrFeedDetailsAux[fd].feedOrderDetailsId;
			    }
			    feedAux.feed = feedDetailsAux;
			}

			// feedOrderBarnyard::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
			if (objRec.FeedOrder[i].Pen) {
			    var arrFeedBarnyardAux = objRec.FeedOrder[i].Pen;
			    var feedBarnyardAux = {
				barnyards : {}
			    };
			    for ( var fb = 0; fb < arrFeedBarnyardAux.length; fb++) {

				var barnyardAux = arrFeedBarnyardAux[fb];
				feedBarnyardAux.barnyards[""
					+ barnyardAux.locationId
					+ barnyardAux.barnyardCode] = ""
					+ barnyardAux.locationId
					+ barnyardAux.barnyardCode;

			    }
			    feedAux.barnyards = feedBarnyardAux.barnyards;
			}

			obj_Reception.feed.push(feedAux);
		    }
		}
		return obj_Reception;
	    },
	    addFeed : function() {
		var objNew = this.getFeed("add");

		if(objNew){
		    if (this.objReception.FeedOrder === undefined)
			    this.objReception.FeedOrder = [];
			this.objReception.FeedOrder.push(this.adapterOut(objNew));

			crudReception.update(this.objReception, this, "afterAdd");    
		}
	    },
	    afterAdd : function(objResult, objOld, objNew) {
		this.set(objNew, this._arrBY);
	    },
	    deleteFeed : function(inSender, inIndex) {
		this.objReception.FeedOrder.splice(inIndex, 1);
		crudReception.update(this.objReception, this, "afterUpdate");
	    },
	    updateFeed : function() {
		var objNew = this.getFeed();
		if(objNew){
		    var objFeed = this.adapterOut(objNew, true);

			this.objReception.FeedOrder[this.iSelect] = objFeed;

			crudReception.update(this.objReception, this, "afterUpdate");    
		}
	    },
	    afterUpdate : function(objResult, objOld, objNew) {
		this.set(objNew, this._arrBY);
		this.toggleAdd();
	    },
	    applyMask : function(inSender) {
		var _id = inSender.$.input.getId();
		jQuery(function(j) {
		    j(document.getElementById(_id)).mask('99/99/9999');
		});
	    },
	    applyTimeMask : function(inSender) {
		var _id = inSender.$.input.getId();
		jQuery(function(j) {
		    j(document.getElementById(_id)).mask('99:99');
		});
	    },
	});