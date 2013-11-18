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
			  content : "Clase",
			  style : "width:150px;text-align:left;margin-left: 15px;"
			},
			{
			  content : "Corral",
			  style : "width:150px;text-align:center;"
			},
			{
			  content : "Cabezas",
			  style : "width:150px;text-align:right;"
			},
			{
			  content : "Peso",
			  style : "width:150px;text-align:right;"
			},
			{
			  content : "Promedio",
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
				label : "Eliminar",
				onclick : "onEliminar"
			  },
			  {
				kind : "enyo.IconButton",
				style : "width:150px;",
				label : "Cancelar",
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
			  .formatNumberThousands(objCorte.weight));

		  var avgWeight = Math.floor(objCorte.weight / objCorte.heads * 100) / 100;
		  this.$.listPromedio
			  .setContent(utils.formatNumberThousands(avgWeight));

		  if (this.iSelected == inIndex) {
			this.$.rowContainer.applyStyle("background-color", "wheat");
		  }

		  return true;
		}
		return false;
	  },
	  dropCorte : function(inSender, inIndex) {

		if (this.isForExporter){
		  cacheCorte.removeExpo(inIndex);
			this.cortes = cacheCorte.getExpo();
		} 
		else {
		  cacheCorte.remove(inIndex);
		  //this.parent.parent.$.listaCorteExpo.cortes = enyo.clone(this.cortes);
		  cacheCorte.cortesExpo = enyo.clone(this.cortes);
		  this.parent.parent.$.listaCorteExpo.loadCortes(cacheCorte.cortesExpo);
		}

		this.iSelected = -1;
		this.loadCortes();

		this.doRemoveCorte();
	  },
	  resetItem : function(inSender, inIndex) {
		var len = this.cortes.length;
		var firstFound = -1;
		var itemInIndex = this.cortes[inIndex];
		for ( var i = 0; i < len; i++) {
		  if (this.cortes[i].hasOwnProperty("identifier")) {
			if (this.cortes[i].identifier == itemInIndex.identifier) {
			  if (firstFound > -1) {
				this.cortes[firstFound].heads += Number(this.cortes[i].heads);
				this.cortes[firstFound].weight += Number(this.cortes[i].weight);
				this.cortes.splice(i, 1);
				i--;
				len--;
			  } else {
				firstFound = i;
			  }
			}
		  }
		}
		return firstFound;
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
		this.$.popup_split.close();
		var cortesExpoByGrouped = cacheCorte.getExpoCortesByGrouppedItem(objNew);
		
		var headsToSplit = Number(objNew.heads);
		var weightToSplit = Number(objNew.weight);
		
		for(var i=0;i<cortesExpoByGrouped.length;i++){
		  if((cortesExpoByGrouped[i].heads - headsToSplit) > 0){
			cortesExpoByGrouped[i].heads =cortesExpoByGrouped[i].heads - headsToSplit;
			cortesExpoByGrouped[i].weight =cortesExpoByGrouped[i].weight - weightToSplit;
			objNew.cutSeq = cortesExpoByGrouped[i].cutSeq;
			break;
		  }else{
			headsToSplit = headsToSplit - cortesExpoByGrouped[i].heads;
			objNew.cutSeq = cortesExpoByGrouped[i].cutSeq;
			cortesExpoByGrouped[i].heads = 0;
		  }
		}
		
		objNew.qualityId = -1;
		objNew.cattleClassName = "";
		cacheCorte.cortesExpo.push(objNew);
//		this.cortes.push(objNew);
		this.loadCortes(cacheCorte.getExpo());
	  },
	  on_cancel_split : function() {
		this.$.popup_split.close();
	  },
	});