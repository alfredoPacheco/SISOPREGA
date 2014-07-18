enyo
	.kind(
	{
	  name : "hermana.corte.list",
	  kind : "VFlexBox",
	  events :
	  {
		onRemoveCorte : "",
		onCorteSelected : "",
		onPenSelect : ""
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
			  style : "width:150px;text-align:left;margin-left: 15px;",
			  onclick : "on_sort",
			  sortDirection : "DESC"
			},
			{
			  content : "Pen",
			  style : "width:150px;text-align:center;",
			  onclick : "on_sort",
			  sortDirection : "DESC"
			},
			{
			  content : "Heads",
			  style : "width:150px;text-align:right;",
			  onclick : "on_sort",
			  sortDirection : "DESC"
			},
			{
			  content : "Weight",
			  style : "width:150px;text-align:right;",
			  onclick : "on_sort",
			  sortDirection : "DESC"
			},
			{
			  content : "Average",
			  style : "width:150px;text-align:right;",
			  onclick : "on_sort",
			  sortDirection : "DESC"
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
				  showing : false
				// style : "width:150px;text-align:center;",
				// content : ""
				},
				{
				  kind : "HFlexBox",
				  name : "pensContainer",
				  style : "width:225px;"
				},
				{
				  name : "listCabezas",
				  style : "width:75px;text-align:right;",
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
		  } ],
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

		  // this.$.pensContainer.destroyComponents();
		  // this.$.pensContainer.render();
		  if (objCorte.pen_name !== null) {
			this.$.pensContainer.destroyControls();
			var arrPens = objCorte.pen_name.split(",");
			for ( var i = 0; i < arrPens.length; i++) {
			  this.$.pensContainer.createComponent(
			  // [
			  // {
			  // kind : enyo.Button,
			  // onclick : "on_pen_click",
			  // caption : arrPens[i],
			  // style : "height:20px;background-color: transparent;margin:
			  // 0px;padding: 0px;color: #292929;font-size: 16px;"
			  // }, ],

			  {
				content : '<a href="javascript:penClick('
					+ objCorte.sequences[i] + ');">' + arrPens[i]
					+ '</a>&nbsp;',
				allowHtml : true,
			  // onclick : "on_pen_click",
			  // onmousedown : "buttonDown",
			  // onmouseup : "buttonUp",
			  // onmouseout : "buttonUp",
			  // onmouseover : "buttonDown",
			  // className : "enyo-button",
			  // style : "padding: 2px;margin-top:
			  // 0px;background-color:#DABD8B;margin-left:1px;height: 20px;"
			  },
			  {
				owner : this
			  });
			}
		  }
		  this.$.listCorral.setContent(objCorte.pen_name);
		  this.$.listClase.setContent(objCorte.cattleClassName);
		  this.$.listCabezas.setContent(utils
			  .formatNumberThousands(objCorte.heads));
		  this.$.listPeso.setContent(utils.formatNumberThousands(Number(
			  objCorte.weight).toFixed(0)));

		  var avgWeight = Math.floor(objCorte.weight / objCorte.heads * 100) / 100;
		  this.$.listPromedio.setContent(utils.formatNumberThousands(Number(
			  avgWeight).toFixed(1)));

		  if (this.iSelected == inIndex) {
			this.$.rowContainer.applyStyle("background-color", "wheat");
		  }
		  // this.$.pensContainer.render();
		  return true;
		}
		return false;
	  },
	  dropCorte : function(inSender, inIndex) {

		if (this.isForExporter) {
		  cacheCorte.removeExpo(this.cortes[inIndex]);
		  this.cortes = cacheCorte.getExpo();
		  this.loadCortes(cacheCorte.getExpo());
		} else {
		  cacheCorte.remove(this.cortes[inIndex]);
		  this.cortes = cacheCorte.get();
		  this.parent.parent.$.listaCorteExpo.loadCortes(cacheCorte.getExpo());
		}

		this.iSelected = -1;
		this.doRemoveCorte();
	  },
	  selectCorte : function(inSender, inEvent) {
		if (this.isForExporter) {
		  if (inEvent.rowIndex !== undefined) {
			this.iSelected = inEvent.rowIndex;
			this.loadCortes();
			this.doCorteSelected();
		  }
		}
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

		this.reduceSplittedHeads(inSender.objToSplit, utils
			.parseToNumber(objNew.heads), utils.parseToNumber(objNew.weight));
		objNew.qualityId = -1;
		objNew.cattleClassName = "";
		cacheCorte.cortesExpo.push(objNew);
		cacheCorte.simplifyCortesExpo();

		this.loadCortes(cacheCorte.getExpo());
		this.$.popup_split.close();
	  },
	  reduceSplittedHeads : function(cutGroup, headsToSplit, weightToSplit) {
		for ( var i = 0; i < cutGroup.sequences.length; i++) {
		  var expoCut = cacheCorte.getExpoBySeqNQuality(cutGroup.sequences[i],
			  cutGroup.qualityId);
		  if (expoCut != null) {
			if (headsToSplit > expoCut.heads) {
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
	  getObj : function() {
		return this.cortes[this.iSelected];
	  },
	  on_pen_click : function(iCutSeq) {
		this.doPenSelect(iCutSeq);
	  },
	  on_sort : function(inSender) {
		switch (inSender.content) {
		case "Class":
		  if (inSender.sortDirection == "ASC") {
			inSender.sortDirection = "DESC";
			this.cortes.sort(function(a, b) {
			  var x = a.cattleClassName;
			  var y = b.cattleClassName;
			  return ((x < y) ? 1 : ((x > y) ? -1 : 0));
			});
		  } else {
			inSender.sortDirection = "ASC";
			this.cortes.sort(function(a, b) {
			  var x = a.cattleClassName;
			  var y = b.cattleClassName;
			  return ((x < y) ? -1 : ((x > y) ? 1 : 0));
			});
		  }
		  break;
		case "Pen":
		  if (inSender.sortDirection == "ASC") {
			inSender.sortDirection = "DESC";
			this.cortes.sort(function(a, b) {
			  var x = a.pen_name;
			  var y = b.pen_name;
			  return ((x < y) ? 1 : ((x > y) ? -1 : 0));
			});
		  } else {
			inSender.sortDirection = "ASC";
			this.cortes.sort(function(a, b) {
			  var x = a.pen_name;
			  var y = b.pen_name;
			  return ((x < y) ? -1 : ((x > y) ? 1 : 0));
			});
		  }
		  break;
		case "Heads":
		  if (inSender.sortDirection == "ASC") {
			inSender.sortDirection = "DESC";
			this.cortes.sort(function(a, b) {
			  return utils.parseToNumber(b.heads) - utils
				  .parseToNumber(a.heads);
			});
		  } else {
			inSender.sortDirection = "ASC";
			this.cortes.sort(function(a, b) {
			  return utils.parseToNumber(a.heads) - utils
				  .parseToNumber(b.heads);
			});
		  }
		  break;
		case "Weight":
		  if (inSender.sortDirection == "ASC") {
			inSender.sortDirection = "DESC";
			this.cortes.sort(function(a, b) {
			  return utils.parseToNumber(b.weight) - utils
				  .parseToNumber(a.weight);
			});
		  } else {
			inSender.sortDirection = "ASC";
			this.cortes.sort(function(a, b) {
			  return utils.parseToNumber(a.weight) - utils
				  .parseToNumber(b.weight);
			});
		  }
		  break;
		case "Average":
		  if (inSender.sortDirection == "ASC") {
			inSender.sortDirection = "DESC";
			this.cortes.sort(function(a, b) {
			  return utils.parseToNumber((b.weight / b.heads)) - utils
				  .parseToNumber((a.weight / a.heads));
			});
		  } else {
			inSender.sortDirection = "ASC";
			this.cortes.sort(function(a, b) {
			  return utils.parseToNumber((a.weight / a.heads)) - utils
				  .parseToNumber((b.weight / b.heads));
			});
		  }
		  break;
		}
		this.$.corteList.render();
	  }
	});

function penClick(iCutSeq) {
  enyo.$.us_mainAdmin_screen_hermana_kind_details_listaCorte
	  .on_pen_click(iCutSeq);
}