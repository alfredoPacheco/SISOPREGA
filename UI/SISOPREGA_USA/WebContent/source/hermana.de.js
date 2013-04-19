enyo
	.kind({
	    name : "hermana.de",
	    kind : enyo.VFlexBox,
	    selectedCattleId : 0,
	    style : "background-color:#DABD8B;font-size:15px;",
	    align:"left",
	    events : {
		"onSave" : "",
		"onCancel" : ""
	    },
	    components : [ {
		kind : "Popup",
		name : "popMan",
		dismissWithClick : true,
		showHideMode : "transition",
		openClassName : "zoomFadeIn",
		className : "transitioner2",
		layoutKind : "VFlexLayout",
		style : "overflow: hidden",
		width : "85%",
		height : "85%",
		scrim : true
	    }, {
		kind : "Toolbar",
		name : "HermanaToolBar",
		align : "left",
		pack : "left",
		style : "background:#C9C9C9;min-height:10px;height:45px;",
		components : [ {
		    name : 'btnPrint',
		    onclick : "printHermana",
		    icon : "images/print.png"
		}, {
		    name : 'btnSave',
		    onclick : "saveHermana",
		    icon : "images/save.png"
		}, {
		    name : 'btnCancel',
		    onclick : "resetForm",
		    icon : "images/cancel.png"
		}, {
		    fit : true
		}, {
		    name : 'btnOpen',
		    onclick : "open",
		    icon : "images/search.png"
		} ]
	    },
	    {
		kind : enyo.VFlexBox,
		style : "padding:20px;",
		pack : "center",		
		components : [
	    {
		kind : enyo.HFlexBox,
		align : "center",
		height : "40px;",
		components : [ {
		    content : "Entry No",
		    width : "95px;",
		    style : "text-align: right;margin-right:5px;"
		}, {
		    kind : "ToolInput",
		    name : "entryNo",
		    hint : "Entry No",
		    width : "135px;",
		    height : "35px;",
		}, {
		    content : "Ref #",
		    width : "95px;",
		    style : "text-align: right;margin-right:5px;"
		}, {
		    kind : "ToolInput",
		    name : "refNo",
		    hint : "Ref #",
		    width : "135px",
		    height : "35px",
		}, ]
	    }, {
		kind : enyo.HFlexBox,
		align : "center",
		height : "40px;",
		components : [ {
		    content : "Consignatario",
		    width : "95px",
		    style : "text-align: right;margin-right:5px;"
		}, {
		    kind : "ToolInput",
		    name : "consignee",
		    hint : "Consignatario",
		    width : "500px",
		    height : "35px",
		    // contentPack : "end",
		    onEnter : "emularTabulacionConEnter"
		} ]
	    }, {
		kind : enyo.HFlexBox,
		align : "center",
		height : "40px;",
		components : [ {
		    content : "Cobrar A",
		    width : "95px",
		    style : "text-align: right;margin-right:5px;"
		}, {
		    kind : "ToolInput",
		    name : "accountOf",
		    hint : "Cobrar A",
		    width : "500px",
		    height : "35px",
		    // contentPack : "end",
		    onEnter : "emularTabulacionConEnter"
		} ]
	    }, {
		kind : enyo.HFlexBox,
		align : "center",
		height : "40px;",
		components : [ {
		    content : "Exportador:",
		    width : "95px;",
		    style : "text-align: right;margin-right:5px;"
		}, {
		    kind : "controls.autocomplete",
		    inputKind : "ToolInput",
		    name : "rancher_id",
		    hint : 'Exportador',
		    width : "500px;",
		    height : "35px;",
		    // contentPack : "end",
		    onEnter : "emularTabulacionConEnter"
		}, {
		    kind : enyo.IconButton,
		    icon : "images/search.png",
		    onclick : "showAvailReleases"
		} ]
	    }]}, {
		kind : enyo.VFlexBox,
		align : "left",
		height : "40px",
		components : [ {
		    kind : "hermana.de.tabs",
		    name : "details",
		    onAddClass : "showAddClass"
		} ]
	    } ],
	    ready : function() {
		this.$.rancher_id.setItems(cacheRanchers.getAllForList());
	    },
	    resetForm : function() {
		this.$.entryNo.setValue('');
		this.$.refNo.setValue('');
		this.$.rancher_id.index = -1;
		this.$.rancher_id.setValue('');
	    },
	    cleanPopUpContents : function() {
		if (this.$.releasesList) {
		    this.$.releasesList.destroy();
		}
		if (this.$.cattleClass) {
		    this.$.cattleClass.destroy();
		}
	    },
	    validateSelectedRancher : function() {
		var rancherId = this.$.rancher_id.getIndex();
		var rancherName = this.$.rancher_id.getValue();

		if (rancherId == -1 && rancherName == '') {
		    alert('Seleccione primero un exportador de la lista');
		    return false;
		}

		if (rancherId == -1 && rancherName != '') {
		    alert('El exportador que usted ha capturado ('
			    + rancherName
			    + ') no se encuentra en la lista, por favor seleccione un exportador válido');
		    return false;
		}

		cacheCorte.selectedRancherId = rancherId;
		cacheCorte.selectedRancherName = rancherName;

		return true;
	    },
	    showAvailReleases : function() {

		if (this.validateSelectedRancher()) {
		    this.cleanPopUpContents();
		    this.$.popMan.createComponent({
			kind : "releases.list",
			name : 'releasesList',
			onCancel : "cancelReleaseSelection",
			onResolveSelected : "setupReleaseSelection",
			flex : 1
		    }, {
			owner : this
		    });

		    var rancherId = this.$.rancher_id.getIndex();
		    var rancherName = this.$.rancher_id.getValue();

		    this.$.releasesList.setRancher(rancherId, rancherName);

		    this.$.popMan.render();
		    this.$.popMan.openAtCenter();
		}

	    },
	    showAddClass : function() {
		this.cleanPopUpContents();
		this.$.popMan.createComponent({
		    kind : "catalogs.cattle",
		    name : 'cattleClass',
		    onCancel : "cancelCattle",
		    onAdd : "addCattle",
		    flex : 1
		}, {
		    owner : this
		});

		this.$.cattleClass.toggleAdd();

		this.$.popMan.render();
		this.$.popMan.openAtCenter();
	    },
	    cancelCattle : function() {
		this.closePopUp();
	    },
	    addCattle : function() {

		if (this.selectedCattleId != 0)
		    this.$.details.setCattleClass(this.selectedCattleId);
		else
		    this.$.details.setCattleClass();

		this.closePopUp();
	    },
	    cancelReleaseSelection : function() {
		this.closePopUp();
		this.$.rancher_id.$.textField.forceFocus();
	    },
	    setupReleaseSelection : function() {
		var summary = {
		    hc : 0,
		    kg : 0.0,
		    lbs : 0.0,
		    avg : 0.0,
		    rejects_hc : 0,
		    rejects_kgs : 0.0,
		    rejects_lbs : 0.0,
		    trade_hc : 0,
		    trade_kgs : 0.0,
		    trade_lbs : 0.0,
		    trade_avg : 0.0,
		    net_hc : 0,
		    net_kgs : 0.0,
		    net_lbs : 0.0,
		    net_avg : 0.0,
		    delta : 0.0,
		    delta_pct : 0.0
		};

		var releaseObj = null;

		for ( var selectionIndex = 0; selectionIndex < this.$.releasesList.selectedIds.length; selectionIndex++) {
		    var selectedId = this.$.releasesList.selectedIds[selectionIndex];
		    releaseObj = releasesCache.getReleaseById(selectedId);

		    summary.hc += releaseObj.heads;
		    summary.kg += releaseObj.weight;
		    summary.rejects_hc += releaseObj.rejects;
		    summary.rejects_kgs += releaseObj.rejectsWeight;
		}

		if (releaseObj != null) {
		    this.selectedCattleId = releaseObj.cattleType;
		    this.$.details.setCattleClass(releaseObj.cattleType,
			    releaseObj.cattleName);
		    cacheCorte.selectedCattleType = releaseObj.cattleName;
		} else {
		    this.selectedCattleId = 0;
		}

		summary.lbs = Math.floor((summary.kg * 2.2046) * 100) / 100;
		summary.avg = Math.floor((summary.lbs / summary.hc) * 100) / 100;
		summary.rejects_lbs = Math
			.floor((summary.rejects_kgs * 2.2046) * 100) / 100;

		summary.trade_hc = summary.hc - summary.rejects_hc;
		summary.trade_kgs = summary.kg - summary.rejects_kgs;
		summary.trade_lbs = Math
			.floor((summary.trade_kgs * 2.2046) * 100) / 100;
		summary.trade_avg = Math
			.floor((summary.trade_lbs / summary.trade_hc) * 100) / 100;

		this.$.details.setReleaseIds(this.$.releasesList.selectedIds);
		this.$.details.setSummary(summary);
		this.$.details.updateTableContents();
		this.closePopUp();
	    },
	    saveHermana : function() {
		// TODO: Save data to database.
		var arrCortes = this.$.details.$.listaCorte.cortes;
		for ( var recordIndex = 0; recordIndex < arrCortes.length; recordIndex++) {
		    var purchase = this
			    .purchaseFromCorte(arrCortes[recordIndex]);
		    cachePur.createPurchase(purchase);
		}

		this.doSave();
	    },
	    purchaseFromCorte : function(corte) {

		var selected = false;
		var purchaseId = 0;

		while (!selected) {
		    var possibleId = Math.floor((Math.random() * 100) + 1);
		    var purchases = cachePur.get().purchased;
		    for ( var i = 0; i < purchases.length; i++) {
			if (purchases[i].id == possibleId)
			    break;
		    }
		    purchaseId = possibleId;
		    selected = true;
		}

		var objPurchase = {
		    id : purchaseId,
		    purdate : utils.dateOut(new Date()),
		    seller : corte.rancherName,
		    cattleId : corte.cattleClassId,
		    cattleName : corte.cattleType,
		    heads : Number(corte.heads),
		    weight : Number(corte.weight),
		    aveweight : Number(corte.weight) / Number(corte.heads)
		};

		return objPurchase;
	    },
	    closePopUp : function() {
		this.$.popMan.close();
		this.cleanPopUpContents();
	    },
	    emularTabulacionConEnter : function(inSender) {
		switch (inSender.name) {
		case "rancher_id":
		    this.showAvailReleases();
		    break;
		case "cattype_id":
		    this.$.location_id.setFocus();
		    break;
		case "location_id":
		    this.$.zone_id.setFocus();
		    break;
		case "zone_id":
		    this.$.hc_aprox.forceFocus();
		    break;
		case "hc_aprox":
		    this.$.weight.forceFocus();
		    break;
		case "weight":
		    if (this.$.draAdd.open == true) {
			this.addReception();
		    } else if (this.$.draUpdate.open == true) {
			this.updateReception();
		    }
		    break;

		}
	    },
	    key_down : function(inSender, inEvent) {
		if (inEvent.keyCode == 13) {
		    this.emularTabulacionConEnter(inSender);
		}
	    }
	});