enyo
	.kind({
	    name : "operations.inspections",
	    kind : enyo.VFlexBox,
	    iSelect : null,
	    _objRec : null,
	    objReception : null,
	    components : [
		    {
			kind : "Popup",
			name : "comment",
			lazy : false,
			showHideMode : "transition",
			className : "formBG",
			openClassName : "zoomFadeIn",
			className : "transitioner2",
			layoutKind : "VFlexLayout",
			width : "90%",
			style : "overflow: hidden",
			scrim : true,
			getComment : function() {
			    return this.$.comments.getValue();
			},
			setComment : function(sComment) {
			    this.$.comments.setValue(sComment);
			},
			components : [ {
			    components : [ {
				content : "Comentarios"
			    }, {
				kind : "Input",
				name : "comments",
				hint : "Agregar comentario"
			    }, {
				layoutKind : "HFlexLayout",
				components : [ {
				    kind : "Button",
				    className : "enyo-button-affirmative",
				    caption : "OK",
				    flex : 1,
				    onclick : "addComment"
				}, {
				    kind : "Button",
				    className : "enyo-button-negative",
				    caption : "Cancel",
				    flex : 1,
				    onclick : "closeComments"
				} ]
			    } ]
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
			    onclick : "setReject",
			    components : [ {
				kind : enyo.SwipeableItem,
				onConfirm : "deleteReject",
				tapHighlight : true,
				components : [ {
				    kind : enyo.VFlexBox,
				    width : "90%",
				    components : [ {
					name : "info",
					style : "text-overflow: ellipsis; "
						+ "overflow: hidden; white-space:"
						+ "nowrap;color:#FFF;",
					content : ""
				    } ]
				} ]
			    } ]
			} ]
		    },
		    {
			kind : "Toolbar",
			components : [
				{
				    kind : "ToolInput",
				    name : "rejected_count",
				    width : "23%",
				    hint : "Rechazados",
				    changeOnInput : true,
				},
				{
				    kind : "Button",
				    name : "btnComm",
				    className : "enyo-button-affirmative",
				    caption : "Comentario",
				    onclick : "openComments"
				},
				{
				    kind : "Button",
				    name : "btnSms",
				    className : "enyo-button-affirmative",
				    caption : "SMS",
				    onclick : "sendSMS"
				},
				{
				    kind : "ListSelector",
				    name : 'reject_id',
				    width : "50%",
				    style : "width:100%;color:white",
				    contentPack : "end",
				    items : [],
				    flex : 1,
				    contentPack : "end"
				},
				{
				    kind : "Drawer",
				    name : "draAdd",
				    components : [
					    {
						kind : "enyo.IconButton",
						name : "btnAdd",
						icon : "../SISOPREGA_WEB_LIB/images/menu-icon-new.png",
						onclick : "addReject"
					    }, ]
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
						    onclick : "updateReject"
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
	    ready : function() {
		if (enyo.$.sisoprega_receptionsMap) {
		    _objPopupHeader = enyo.$.sisoprega_receptionsMap.$.lblInfo;
		} else if (enyo.$.sisoprega_mainMenu_receptionsMap) {
		    _objPopupHeader = enyo.$.sisoprega_mainMenu_receptionsMap.$.lblInfo;
		}
		this.$.reject_id.setItems(crudInspectionCode.getList());
	    },
	    setupRow : function(inSender, inIndex) {
		var objInspection;
		if (this._objRec) {
		    if (objInspection = this._objRec.inspections[inIndex]) {
			this.$.info.setContent(objInspection.reject_desc
				+ " ( " + objInspection.rejected_count + " )");
			this._totalRejected = this._totalRejected
				+ parseInt(objInspection.rejected_count);
			return true;
		    }
		}
	    },
	    getReject : function() {
		var objData = null;
		if (this.$.rejected_count.getValue() != "") {
		    objData = {
			rejected_id : null,
			rejected_count : "",
			reject_id : "",
			reject_desc : ""
		    };
		    objData.rejected_count = this.$.rejected_count.getValue();
		    objData.reject_id = this.$.reject_id.getValue();
		    objData.reject_desc = crudInspectionCode
			    .getByID(this.$.reject_id.getValue()).inspectionCodeDescription;
		}
		return this.validateReject(objData);
	    },
	    validateReject:function(objRej){
		var result = this.summarizeTotals();
		if(result.totalRejected >= result.totalHeads){
		    cacheMan.setMessage("","Error. No se pueden rechazar mas cabezas de las existentes.");
		    return false;
		}
		return objRej;
	    },
	    updatetList : function() {
		this.$.productList.render();
		this.setHeader();
	    },
	    set : function(objRec) {
		this.objReception = enyo.clone(objRec);
		this._objRec = this.adapterIn(this.objReception);
		this.resetValues();
	    },

	    setReject : function(inSender, inEvent) {
		var ObjCap;
		if (ObjCap = this._objRec.inspections[inEvent.rowIndex]) {
		    this.iSelect = inEvent.rowIndex;
		    this.$.rejected_count.setValue(ObjCap.rejected_count);
		    this.$.reject_id.setValue(ObjCap.reject_id);
		    this.toggleUpdate();
		}
	    },
	    toggleUpdate : function() {
		this.$.draAdd.setOpen(false);
		this.$.draUpdate.setOpen(true);
	    },
	    toggleAdd : function() {
		this.$.draAdd.setOpen(true);
		this.$.draUpdate.setOpen(false);
		this.resetValues();
	    },
	    resetValues : function() {
		this.$.reject_id.setValue(0);
		this.$.rejected_count.setValue("");
		this.updatetList();
	    },
	    summarizeTotals : function() {

		var totalRejected = 0;
		var totalHeads = 0;
		var totalAccepted = 0;

		if (this._objRec) {
		    totalHeads = parseInt(this._objRec.hc_aprox);
		    for ( var i = 0; i < this._objRec.inspections.length; i++) {
			if (this._objRec.inspections[i]) {
			    totalRejected = totalRejected
				    + parseInt(this._objRec.inspections[i].rejected_count);
			}
		    }
		}

		totalAccepted = totalHeads - totalRejected;
		
		var result = {};
		result.totalHeads = 	totalHeads;
		result.totalAccepted = 	totalAccepted;
		result.totalRejected = 	totalRejected;
		
		
		
		return result;
		
	    },
	    setHeader:function(){
		var result = this.summarizeTotals();
		_objPopupHeader.setContent("Total HC: [" + result.totalHeads
			+ "]   Total Aceptados: [" + result.totalAccepted
			+ "]   Total Rechazados: [" + result.totalRejected + "]");
	    },
	    closeComments : function() {
		this.$.comment.close();
	    },
	    openComments : function() {
		if (this._objRec.inspections.length > 0) {
		    if (this._objRec.inspections[this._objRec.inspections.length - 1].comments) {
			this.$.comments
				.setValue(this._objRec.inspections[this._objRec.inspections.length - 1].comments);
		    }
		    this.$.comment.openAtCenter();
		} else {
		    cacheMan
			    .setMessage("",
				    "Para guardar un comentario es necesario agregar al menos un rechazo");
		}

	    },
	    addComment : function() {
		this.objReception.Inspection[0].comments = this.$.comments
			.getValue();
		crudReception.update(this.objReception, this, "afterUpdate");
	    },
	    sendSMS : function() {
		// Send report
		if (this._objRec.inspections.length > 0) {
		    var reportName = 'ResultadosDeInspeccion?Id='
			    + this.objReception.receptionId;
		    consumingGateway.SendReport(this.objReception.rancherId,
			    reportName);
		} else {
		    cacheMan
		    .setMessage("",
			    "Para enviar un resumen de inspección es necesario agregar al menos un rechazo");
		}
	    },
	    addReject : function() {
		var objNew = this.getReject();
		if(objNew){
		    if (this.objReception.Inspection === undefined) {
			    this.objReception.Inspection = [];

			    var objInspection = {
				InspectionDetails : [],
				Pen : this.objReception.Pen,
				entityName : "Inspection",
				inspectionDate : objNew.inspectionDate || new Date(),
				weight : 0,
				weightUom : 1,
				comments : objNew.comments || ""
			    };

			    this.objReception.Inspection.push(objInspection);
			}
			if (!this.objReception.Inspection[0].InspectionDetails)
			    this.objReception.Inspection[0].InspectionDetails = [];

			this.objReception.Inspection[0].InspectionDetails.push(this
				.adapterOut(objNew));

			crudReception.update(this.objReception, this, "afterAdd");    
		}
		
	    },
	    afterAdd : function(objResult, objOld, objNew) {
		this.set(objNew);
	    },
	    deleteReject : function(inSender, inIndex) {
		this.objReception.Inspection[0].InspectionDetails.splice(
			inIndex, 1);
		crudReception.update(this.objReception, this, "afterUpdate");
	    },
	    updateReject : function() {
		var objNew = this.getReject();
		if(objNew){
		    var objInspection = this.adapterOut(objNew, true);
			this.objReception.Inspection[0].InspectionDetails[this.iSelect] = objInspection;
			crudReception.update(this.objReception, this, "afterUpdate");    
		}
	    },
	    afterUpdate : function(objResult, objOld, objNew) {
		this.set(objNew);
		this.closeComments();
		this.toggleAdd();
	    },
	    adapterIn : function(objRec) {
		var obj_Reception = {
		    inspections : [],
		    hc_aprox : null
		};

		if (objRec.ReceptionHeadcount)
		    obj_Reception.hc_aprox = objRec.ReceptionHeadcount[0].hc;
		if (objRec.Inspection) {
		    for ( var i = 0; i < objRec.Inspection.length; i++) {

			var inspectionAux = {
			    rejected_count : undefined,
			    reject_id : undefined,
			    feed_desc : undefined,
			    id : undefined,
			    weight : undefined,
			    weight_uom : undefined
			};

			inspectionAux.inspectionDate = objRec.Inspection[i].inspectionDate;
			inspectionAux.comments = objRec.Inspection[i].comments;
			inspectionAux.rejected_id = objRec.Inspection[i].inspectionId;
			inspectionAux.weight_rejected = objRec.Inspection[i].weight;
			inspectionAux.weight_rejected_uom = objRec.Inspection[i].weightUom;

			// inspectionsDetails::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
			if (objRec.Inspection[i].InspectionDetails) {
			    var arrInspectionDetailsAux = objRec.Inspection[i].InspectionDetails;

			    for ( var id = 0; id < arrInspectionDetailsAux.length; id++) {
				inspectionAux.rejected_count = arrInspectionDetailsAux[id].hc;
				inspectionAux.reject_id = arrInspectionDetailsAux[id].inspectionCodeId;
				inspectionAux.reject_desc = crudInspectionCode
					.getByID(arrInspectionDetailsAux[id].inspectionCodeId).inspectionCodeDescription;
				inspectionAux.id = arrInspectionDetailsAux[id].inspectionDetailsId;
				inspectionAux.weight = arrInspectionDetailsAux[id].weight;
				inspectionAux.weight_uom = arrInspectionDetailsAux[id].weightUom;
				obj_Reception.inspections.push(enyo
					.clone(inspectionAux));
			    }
			}
		    }
		}
		return obj_Reception;

	    },
	    adapterOut : function(objNew, bUpdating) {

		var inspectionDetail = {
		    entityName : "InspectionDetails",
		    inspectionCodeId : objNew.reject_id,
		    hc : objNew.rejected_count,
		    note : "",
		    weight : 0,
		    weightUom : 1
		};

		if (bUpdating)
		    inspectionDetail.inspectionDetailsId = this.objReception.Inspection[0].InspectionDetails[this.iSelect].inspectionDetailsId;

		return inspectionDetail;
	    },
	});