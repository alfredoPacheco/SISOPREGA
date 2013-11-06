enyo.kind(
{
  name : "operations.reception.form",
  kind : "forms.simple",
  entityKind : crudReception,
  create : function() {
	this.inherited(arguments);
	this.$.mainScroller.createComponents([
	{
	  name : "options",
	  kind : enyo.PopupSelect,
	  onSelect : "addNewRancher",
	  items : [
	  {
		caption : "Empresa/Sociedad",
		value : 1
	  },
	  {
		caption : "Persona Fisica",
		value : 2
	  }, ]
	},
	{
	  name : "addRancherDialog",
	  kind : "Popup",
	  showHideMode : "transition",
	  openClassName : "zoomFadeIn",
	  className : "transitioner2",
	  layoutKind : "VFlexLayout",
	  style : "overflow: hidden",
	  width : "85%",
	  height : "85%",
	  scrim : true,
	  components : [

	  ]
	},
	{
	  kind : "RowGroup",
	  name : "rowGroup",
	  defaultKind : "HFlexBox",
	  caption : "",
	  components : [
	  {
		kind : enyo.VFlexBox,
		style : "padding:20px;",
		pack : "center",
		components : [
		{
		  kind : "controls.bindedField",
		  value : null,
		  bindTo : "color",
		},
		{
		  layoutKind : enyo.HFlexLayout,
		  align : "center",
		  height : "50px;",
		  components : [
		  {
			content : "Corrales:",
			width : "120px;",
			style : "text-align: right;margin-right:5px;"
		  },
		  {
			name : 'sBYs',
			style : "color:black",
			flex : 1,
			content : "",
			bindTo : "penString"
		  },
		  {
			kind : "controls.bindedField",
			value : null,
			bindTo : "Pen",
		  },
		  {
			content : "Fecha de Llegada:",
			width : "160px;",
			style : "text-align: right;margin-right:5px;"
		  },
		  {
			kind : "controls.dateMask",
			inputKind : "ToolInput",
			name : "arrival_date",
			bindTo : "dateAllotted",
			style : "max-width:130px;"
		  } ]

		},
		{
		  kind : enyo.HFlexBox,
		  align : "center",
		  height : "50px;",
		  components : [
		  {
			content : "Sr. Ganadero:",
			width : "120px;",
			style : "text-align: right;margin-right:5px;"
		  },
		  {
			kind : "controls.autocomplete",
			inputKind : "ToolInput",
			name : "rancher_id",
			hint : '',
			width : "500px;",
			height : "35px;",
			flex : 1,
			onEnter : "emularTabulacionConEnter",
			bindTo : "rancherId"
		  },
		  {
			kind : enyo.IconButton,
			icon : "../SISOPREGA_WEB_LIB/images/menu-icon-new.png",
			onclick : "contextMenuClicked"
		  } ]
		},
		{
		  kind : enyo.HFlexBox,
		  align : "center",
		  height : "50px;",
		  components : [
		  {
			content : "Tipo de Ganado:",
			width : "120px;",
			style : "text-align: right;margin-right:5px;"
		  },
		  {
			kind : "controls.autocomplete",
			inputKind : "ToolInput",
			name : "cattype_id",
			hint : '',
			width : "200px;",
			height : "35px;",
			flex : 1,
			onEnter : "emularTabulacionConEnter",
			bindTo : "cattleType"
		  }, ]
		},
		{
		  kind : enyo.HFlexBox,
		  align : "center",
		  height : "50px;",
		  components : [
		  {
			content : "Procedencia:",
			width : "120px;",
			style : "text-align: right;margin-right:5px;"
		  },
		  {
			kind : "controls.autocomplete",
			inputKind : "ToolInput",
			name : "location_id",
			hint : '',
			width : "200px;",
			height : "35px;",
			flex : 1,
			onEnter : "emularTabulacionConEnter",
			bindTo : "locationId",
			onSelectItem : "locationChanged"
		  },
		  {
			content : "Zona de Inspección:",
			width : "160px;",
			style : "text-align: right;margin-right:5px;"
		  },
		  {
			kind : "controls.autocomplete",
			inputKind : "ToolInput",
			name : "zone_id",
			hint : '',
			width : "200px;",
			height : "35px;",
			flex : 1,
			onEnter : "emularTabulacionConEnter",
			bindTo : "zoneId"
		  }, ]
		},
		{
		  kind : enyo.HFlexBox,
		  align : "center",
		  height : "50px;",
		  entityName : "ReceptionHeadcount",
		  components : [
		  {
			content : "No. Cabezas:",
			width : "120px;",
			style : "text-align: right;margin-right:5px;"
		  },
		  {
			kind : "controls.numberBox",
			inputKind : "ToolInput",
			name : "hc_aprox",
			hint : "",
			flex : 1,
			height : "35px;",
			bindTo : "hc",
			belongsTo : "ReceptionHeadcount"
		  },
		  {
			content : "Peso:",
			width : "160px;",
			style : "text-align: right;margin-right:5px;"
		  },
		  {
			kind : "controls.numberBox",
			inputKind : "ToolInput",
			name : "weight",
			hint : "",
			flex : 1,
			height : "35px;",
			bindTo : "weight",
			belongsTo : "ReceptionHeadcount"
		  },
		  {
			value : 1,
			kind : "controls.bindedField",
			fixedValue : true,
			bindTo : "weightUom",
			belongsTo : "ReceptionHeadcount"
		  } ]
		} ]
	  } ]
	} ],
	{
	  owner : this
	});
  },
  ready : function() {
	this.inherited(arguments);
	crudRancher.get(this, "readCallBack");
	crudEnterpriseRancher.get(this, "readCallBack");
	crudCattle.get(this, "readCallBack");
	crudLocation.get(this, "readCallBack");
  },
  readCounter : 0,
  readCallBack : function() {
	this.readCounter++;
	if (this.readCounter == 4) {
	  this.loadAutocompletes();
	  this.readCounter = 0;
	}
  },
  loadAutocompletes : function() {

	var arrAllRanchers = crudRancher.getList().concat(
		crudEnterpriseRancher.getList());
	this.$.rancher_id.setItems(arrAllRanchers);

	this.$.cattype_id.setItems(crudCattle.getCattleTypeList());

	this.$.location_id.setItems(crudLocation.getList());
	this.$.zone_id.setItems(cacheMan.getAllZonesForList());

	this.afterLoad();

	if (!this.bUpdatingMode) {
	  this.$.cattype_id.setIndex(1); // Default value: Novillos

	  // Set location_id and zone_id based on pen.
	  var deductedZone = this.deduceZone();
	  if (deductedZone == 1)
		this.$.location_id.setIndex(1); // Default value: Chihuahua

	  this.$.zone_id.setIndex(deductedZone);
	}
  },
  deduceZone : function() {
	for ( var i = 0; i < this.getEntity().Pen.length; i++) {
	  var penAux = this.getEntity().Pen[i];
	  if (penAux.locationId == 1)
		return 1;
	}
	return 2;
  },
  locationChanged : function() {
	if (this.$.location_id.getIndex() == 1)
	  this.$.zone_id.setIndex(1);
	else
	  this.$.zone_id.setIndex(2);
  },
  contextMenuClicked : function(inSender, inEvent) {
	this.$.options.openAtEvent(inEvent);
	// inSender.stopPropagation();
	return false;
  },
  addNewRancher : function(inSender, inSelected) {
	if (this.$.dynoco) {
	  this.$.dynoco.destroy();
	}
	switch (inSelected.value) {
	case 1:
	  this.$.addRancherDialog.createComponent(
	  {
		kind : "catalogs.rancher.enterprise.form",
		onAdd : "adoken",
		onCancel : "cancelCreateRancher",
		name : 'dynoco',
		flex : 1
	  },
	  {
		owner : this
	  });
	  break;
	case 2:
	  this.$.addRancherDialog.createComponent(
	  {
		kind : "catalogs.rancher.person.form",
		onAdd : "adoken",
		onCancel : "cancelCreateRancher",
		name : 'dynoco',
		flex : 1
	  },
	  {
		owner : this
	  });
	  break;
	}
	this.$.addRancherDialog.render();
	this.$.addRancherDialog.openAtCenter();
  },
  adoken : function(inSender, result) {
	var arrAllRanchers = crudRancher.getList().concat(
		crudEnterpriseRancher.getList());
	this.$.rancher_id.setItems(arrAllRanchers);

	var justCreated = result.records[0];

	this.$.rancher_id.setIndex(justCreated.rancherId);
	this.$.addRancherDialog.close();
	cacheMan.hideScrim();
  },
  cancelCreateRancher : function() {
	this.$.addRancherDialog.close();
  }
});
