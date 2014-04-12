enyo
	.kind(
	{
	  name : "hermana.corte.list",
	  kind : "VFlexBox",
	  events :
	  {
		onRemoveCorte : "",
		onCorteSelected : ""
	  },
	  cortes : [],
	  iSelected : -1,
	  isForExporter : false,
	  identifier : 0,
	  components : [
		  {
			kind : enyo.Popup,
			name : "popup_split",
			width : "330px",
			height : "120px",
			dismissWithClick : true,
			layoutKind : "VFlexLayout",
			style : "overflow: hidden;border-width: 8px;",
			scrim : true,
			components : [
			{
			  kind : "shipments.popup.split",
			  name : "split_kind",
			  flex : 1,
			  onAccept : "on_accept_split",
			  onCancel : "on_cancel_split"
			} ]
		  },
		  {
			kind : "HFlexBox",
			className : "listFirst",
			style : "font-size:13px;background-color:#DABD8B;border-bottom-style: solid;border-bottom-color: #482400;",
			height : "30px",
			align : "center",
			pack : "start",
			components : [
			{
			  content : "Class",
			  style : "width:150px;text-align:left;margin-left: 15px;"
			},
			{
			  content : "Pen",
			  style : "width:150px;text-align:center;"
			},
			{
			  content : "Heads",
			  style : "width:150px;text-align:right;"
			},
			{
			  content : "Weight",
			  style : "width:150px;text-align:right;"
			},
			{
			  content : "Average",
			  style : "width:150px;text-align:right;"
			} ]
		  },
		  {
			kind : enyo.Scroller,
			name : "listaScroller",
			horizontal : false,
			autoHorizontal : false,
			flex : 1,
			style : "background-color: #482400;",
			components : [
			{
			  kind : enyo.VirtualRepeater,
			  name : "corteList",
			  onSetupRow : "setupCorteRow",
			  onclick : "selectCorte",
			  components : [
			  {
				kind : enyo.SwipeableItem,
				name : "rowContainer",
				onConfirm : "dropCorte",
				onmousehold : "on_hold_item",
				layoutKind : enyo.HFlexLayout,
				tapHighlight : true,
				className : "listBG",
				style : "font-size:15px;",
				height : "40px",
				components : [
				{
				  name : "listClase",
				  style : "width:150px;text-align:left;",
				  content : ""
				},
				{
				  name : "listCorral",
				  style : "width:150px;text-align:center;",
				  content : ""
				},
				{
				  name : "listCabezas",
				  style : "width:150px;text-align:right;",
				  content : ""
				},
				{
				  name : "listPeso",
				  style : "width:150px;text-align:right;",
				  content : ""
				},
				{
				  name : "listPromedio",
				  style : "width:150px;text-align:right;",
				  content : ""
				} ]
			  } ]
			} ]
		  },
		  {
			kind : "Drawer",
			name : "draDel",
			open : false,
			components : [
			{
			  kind : "Toolbar",
			  components : [
			  {
				kind : "enyo.IconButton",
				style : "width:150px;",
				label : "Remove",
				onclick : "onEliminar"
			  },
			  {
				kind : "enyo.IconButton",
				style : "width:150px;",
				label : "Cancel",
				onclick : "onCancel"
			  }, ]
			}

			]
		  }, ],
	  setCortes : function(arrCorte) {
		this.loadCortes(arrCorte);
	  },
	  loadCortes : function(arrCorte) {
		if (arrCorte)
		  this.cortes = arrCorte;

		this.$.corteList.render();
	  },
	  setupCorteRow : function(inSender, inIndex) {
		var objCorte = this.cortes[inIndex];
		if (objCorte) {
		  this.$.listCorral.setContent(objCorte.pen_name);
		  this.$.listClase.setContent(objCorte.cattleClassName);
		  this.$.listCabezas.setContent(utils
			  .formatNumberThousands(objCorte.heads));
		  this.$.listPeso.setContent(utils
			  .formatNumberThousands(Number(objCorte.weight).toFixed(0)));

		  var avgWeight = Math.floor(objCorte.weight / objCorte.heads * 100) / 100;
		  this.$.listPromedio
			  .setContent(utils.formatNumberThousands(Number(avgWeight).toFixed(1)));

		  if (this.iSelected == inIndex) {
			this.$.rowContainer.applyStyle("background-color", "wheat");
		  }

		  return true;
		}
		return false;
	  },
	  dropCorte : function(inSender, inIndex) {

		if (this.isForExporter){
		  cacheCorte.removeExpo(this.cortes[inIndex]);
		  this.cortes = cacheCorte.getExpo();
		  this.loadCortes(cacheCorte.getExpo());
		} 
		else {
		  cacheCorte.remove(this.cortes[inIndex]);
		  this.cortes = cacheCorte.get();
		  this.parent.parent.$.listaCorteExpo.loadCortes(cacheCorte.getExpo());
		}

		this.iSelected = -1;
		this.doRemoveCorte();
	  },
	  selectCorte : function(inSender, inEvent) {
		this.iSelected = inEvent.rowIndex;
		this.loadCortes();
		this.doCorteSelected();
	  },
	  on_hold_item : function(inSender, inEvent) {
		if (this.isForExporter) {
		  this.$.popup_split.validateComponents();
		  var objCorte = this.cortes[inEvent.rowIndex];
		  objCorte.aveWeight = objCorte.weight / objCorte.heads;

		  if (!objCorte.hasOwnProperty("identifier")) {
			objCorte.identifier = this.identifier++;
		  }
		  this.$.split_kind.setObjToSplit(objCorte);
		  this.$.popup_split.openAtCenter();
		}
	  },
	  on_accept_split : function(inSender, objNew) {
		
		this.reduceSplittedHeads(inSender.objToSplit, utils.parseToNumber(objNew.heads), utils.parseToNumber(objNew.weight));
		objNew.qualityId = -1;
		objNew.cattleClassName = "";
		cacheCorte.cortesExpo.push(objNew);
		cacheCorte.simplifyCortesExpo();
		
		this.loadCortes(cacheCorte.getExpo());
		this.$.popup_split.close();
	  },
	  reduceSplittedHeads : function(cutGroup, headsToSplit, weightToSplit){
		for(var i=0;i<cutGroup.sequences.length; i++){
		  var expoCut = cacheCorte.getExpoBySeqNQuality(cutGroup.sequences[i], cutGroup.qualityId);
		  if(expoCut != null) {
			if(headsToSplit > expoCut.heads){
			  headsToSplit -= expoCut.heads;
			  weightToSplit -= expoCut.weight;
			  expoCut.heads == 0;
			  expoCut.weight == 0;
			} else {
			  expoCut.heads -= headsToSplit;
			  expoCut.weight -= weightToSplit;
			  headsToSplit = 0;
			  weightToSplit = 0;
			  break;
			}
		  }
		}
	  },
	  on_cancel_split : function() {
		this.$.popup_split.close();
	  },
	});