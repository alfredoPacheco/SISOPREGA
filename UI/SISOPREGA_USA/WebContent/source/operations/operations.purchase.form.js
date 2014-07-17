enyo
	.kind(
	{
	  name : "operations.purchase.form",
	  kind : "forms.masterDetail",
	  published :
	  {
		entityKind : crudPurchase,
		parentObject : null
	  },
	  create : function() {
		this.inherited(arguments);
		this.$.masterFields.createComponents([
		{
		  name : "addSellerDialog",
		  kind : "Popup",
		  showHideMode : "transition",
		  openClassName : "zoomFadeIn",
		  className : "transitioner2",
		  layoutKind : "VFlexLayout",
		  style : "overflow: hidden",
		  width : "85%",
		  height : "85%",
		  scrim : true,
		  components : []
		},
		{
		  kind : enyo.HFlexBox,
		  align : "center",
		  height : "40px;",
		  components : [
		  {
			content : "Date:",
			width : "80px;",
			style : "text-align: right;margin-right:5px;"
		  },
		  {
			kind : "controls.dateMask",
			inputKind : "ToolInput",
			name : "purchDate",
			height : "35px;",
			bindTo : "dateAllotted",
			style : "max-width:130px;",
			bindTo : "purchaseDate"
		  },
		  {
			content : 'mm/dd/yyyy',
			className : "listFirst",
			style : "background-color:#DABD8B;margin-left:2px;font-size:12px;",
			width : "80px;"
		  } ]
		},
		{
		  kind : enyo.HFlexBox,
		  align : "center",
		  height : "40px;",
		  components : [
		  {
			content : "Supplier:",
			width : "80px;",
			style : "text-align: right;margin-right:5px;"
		  },
		  {
			kind : "controls.autocomplete",
			inputKind : "ToolInput",
			name : "seller",
			width : "275px;",
			height : "35px;",
			bindTo : "sellerId"
		  },
		  {
			kind : enyo.IconButton,
			icon : "../SISOPREGA_WEB_LIB/images/menu-icon-new.png",
			onclick : "showSellerForm",
			height : "23px",
			width : "31px",
			style : "padding: 2px;margin-top: 3px;background-color: #DABD8B;"
		  } ]
		} ],
		{
		  owner : this
		});
		this.$.detailFields.createComponents([
		{
		  kind : "controls.autocomplete",
		  inputKind : "ToolInput",
		  height : "35px",
		  name : "cattleType",
		  hint : "Type",
		  width : "200px;",
		  style : "margin-right: 15px;",
		  bindTo : "cattleTypeId",
		  belongsTo : "PurchaseDetail",
		  onSelectItem : "on_select_cattleType",
		  sortType:"Text"
		},
		{
		  kind : "controls.autocomplete",
		  inputKind : "ToolInput",
		  height : "35px;",
		  name : "cattleQuality",
		  hint : 'Class',
		  width : "200px;",
		  style : "margin-right: 15px;",
		  bindTo : "qualityId",
		  belongsTo : "PurchaseDetail",
		  onSelectItem : "clase_select",
		  sortType:"Text"
		},
		{
		  kind : "controls.autocomplete",
		  inputKind : "ToolInput",
		  height : "35px;",
		  name : "pen",
		  hint : "Pen",
		  width : "150px;",
		  style : "margin-right: 15px;",
		  bindTo : "penId",
		  belongsTo : "PurchaseDetail",
		  sortType:"Text"
		},
		{
		  kind : "controls.numberBox",
		  inputKind : "ToolInput",
		  name : "cabezas",
		  hint : 'Heads',
		  width : "125px;",
		  height : "35px",
		  style : "margin-right: 15px;",
		  bindTo : "heads",
		  belongsTo : "PurchaseDetail",
		  textAlign : "right",
		  onInput : "on_input",
		  sortType:"Number"
		},
		{
		  kind : "controls.numberBox",
		  inputKind : "ToolInput",
		  name : "peso",
		  hint : 'Weight',
		  width : "125px;",
		  height : "35px",
		  style : "margin-right: 15px;",
		  bindTo : "weight",
		  belongsTo : "PurchaseDetail",
		  textAlign : "right",
		  onInput : "on_input",
		  sortType:"Number"
		},
		{
		  kind : "ToolInput",
		  name : "txtAvgWeight",
		  hint : 'Average',
		  width : "125px;",
		  height : "35px",
		  style : "margin-right: 15px;",
		  textAlign : "right",
		  bindTo : "avgWeight",
		  belongsTo : "PurchaseDetail",
		  sortType:"Number"
		} ],
		{
		  owner : this
		});
	  },
	  ready : function() {
		this.inherited(arguments);
		cacheMan.showScrim();
		this.$.cabezas.$.textField.$.input.applyStyle("text-align", "right");
		this.$.peso.$.textField.$.input.applyStyle("text-align", "right");
		this.$.txtAvgWeight.$.input.applyStyle("text-align", "right");
		crudSeller.get(this, "readCallBack");
		crudCattle.get(this, "readCallBack");
		crudCattleQuality.get(this, "readCallBack");
		crudPen.get(this, "readCallBack");

		this.$.purchDate.setToday();
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

		this.$.seller.setItems(crudSeller.getList());
		this.$.cattleType.setItems(crudCattle.getCattleTypeList());
		this.$.cattleType.setIndex(1); // Default value: Novillos
		this.$.pen.setItems(crudPen.getListUsaPens());
		this.on_select_cattleType();
		this.afterLoad();
	  },
	  validateAdd : function() { // function to override if necessary
		// validate the item to be added.
		var sError = "";

		if (this.$.cattleQuality.getIndex() == -1
			|| this.$.pen.getIndex() == -1 || this.$.cabezas.getValue() == ""
			|| this.$.peso.getValue() == "") {
		  sError = "Error. Verify that all fields have a value.";
		}

		var occupiedPens = crudInventory.getPensList();
		for ( var i = 0; i < occupiedPens.length; i++) {
		  var isPenOccupied = this.$.pen.getIndex() == utils
			  .parseToNumber(occupiedPens[i].value);
		  var isSameQuality = occupiedPens[i].object.qualityId == this.$.cattleQuality
			  .getIndex();
		  if (isPenOccupied && !isSameQuality) {
			var cattleQuality = crudCattleQuality
				.getByID(occupiedPens[i].object.qualityId);
			if (!confirm("The Pen " + occupiedPens[i].caption
				+ " is already occupied by cattle class "
				+ cattleQuality.qualityName
				+ "\nDo you really want to continue?"))
			  return false;
			break;
		  }
		}

		if (sError != "") {
		  cacheMan.setMessage("", sError);
		  return false;
		}

		return true;
	  },
	  showSellerForm : function() {
		if (this.$.sellerForm) {
		  this.$.sellerForm.destroy();
		}
		this.$.addSellerDialog.createComponent(
		{
		  kind : "catalogs.seller.form",
		  onAdd : "addSeller",
		  onCancel : "cancelCreateSeller",
		  name : "sellerForm",
		  flex : 1
		},
		{
		  owner : this
		});
		this.$.addSellerDialog.render();
		this.$.addSellerDialog.openAtCenter();
	  },
	  addSeller : function(inSender, result) {
		this.$.seller.setItems(crudSeller.getList());

		var justCreated = result.records[0];
		this.$.seller.setIndex(justCreated.sellerId);
		this.$.addSellerDialog.close();
		cacheMan.hideScrim();
	  },
	  cancelCreateSeller : function() {
		this.$.addSellerDialog.close();
	  },
	  clase_select : function(inSender) {
		if (this.iSelected > -1)
		  return;

		var filter = [];
		var occupied = {};
		var allPens = enyo.clone(crudPen.getListUsaPens());
		var items = crudInventory.getPensList();
		for ( var i = 0; i < items.length; i++) {
		  occupied[items[i].value] = items[i];
		  if (items[i].object.qualityId == this.$.cattleQuality.getIndex()) {
			filter.push(items[i]);
		  }
		}

		for ( var j = 0; j < allPens.length; j++) {
		  if (!occupied.hasOwnProperty(allPens[j].value)) {
			filter.push(allPens[j]);
		  }
		}

		this.$.pen.setFilter(filter);
		this.$.pen.clear();
		this.$.pen.useFilter();
	  },
	  on_select_cattleType : function(inSender) {
		if (this.$.cattleType.getValue() == "Caballos") {
		  this.$.cattleQuality.setItems(crudCattleQuality
			  .getHorseQualitiesList());
		} else {
		  this.$.cattleQuality.setItems(crudCattleQuality.getList());
		}
	  },
	  beforeSave : function(obj) {
		this.errorMessage = "";
		if (this.$.purchDate.getValue() == "") {
		  this.errorMessage = "Error. Date field is required.";
		} else {
		  if (new Date() - new Date(this.$.purchDate.getValue()) < 0) {
			this.errorMessage = "Error. You are not allowed to purchase on future dates.";
		  }
		  if (new Date() - new Date(this.$.purchDate.getValue()) > 676787584) {
			this.errorMessage = "Error. You are not allowed to purchase on dates previous to one week.";
		  }
		}
		if (this.errorMessage != "") {
		  return false;
		}
		return true;
	  },
	  setEntity : function(entity, bUpdatingMode) {
		if (bUpdatingMode) {
		  this.toggleUpdate();
		  this.resetValues();
		} else {
		  this.toggleAdd();
		}

		this.arrDetail = [];
		if (entity) {
		  var controls = this.$;
		  for ( var i in controls) {
			if (controls[i].hasOwnProperty("belongsTo")) {
			  // if (entity[controls[i].belongsTo])
			  // this.setValueForControl(controls[i],
			  // entity[controls[i].belongsTo][0][controls[i].bindTo]);
			} else if (controls[i].hasOwnProperty("bindTo")) {
			  this.setValueForControl(controls[i], entity[controls[i].bindTo]);
			}
		  }
		  this.updatingEntityId = entity[this.entityKind.entityIdName()];

		  if (entity.PurchaseDetail) {
			for ( var i = 0; i < entity.PurchaseDetail.length; i++) {
			  var obj =
			  {
				heads : entity.PurchaseDetail[i].heads,
				penId : entity.PurchaseDetail[i].penId,
				cattleTypeId: entity.PurchaseDetail[i].cattleTypeId,
				qualityId : entity.PurchaseDetail[i].qualityId,
				weight : entity.PurchaseDetail[i].weight,
				avgWeight : entity.PurchaseDetail[i].avgWeight,
				entityName : entity.PurchaseDetail[i].entityName,
				paidAmount : entity.PurchaseDetail[i].paidAmount,
				purchaseDetailId : entity.PurchaseDetail[i].purchaseDetailId,
				purchasePrice : entity.PurchaseDetail[i].purchasePrice,
				settled : entity.PurchaseDetail[i].settled,
				fields :
				{
				  0 : crudCattle.getCattleTypeById(entity.PurchaseDetail[i].cattleTypeId).cattypeName,
				  1 : crudCattleQuality.getByID(entity.PurchaseDetail[i].qualityId).qualityName,
				  2 : crudPen.adapterToList(crudPen.getByID(entity.PurchaseDetail[i].penId)).caption,
				  3 : entity.PurchaseDetail[i].heads,
				  4 : entity.PurchaseDetail[i].weight,
				  5 : entity.PurchaseDetail[i].avgWeight
				}
			  };
			  this.arrDetail.push(obj);
			}
			this.updateList();
			this.$.detailScroller.scrollTo(this.$.detailScroller
				.getBoundaries().bottom, 0);
		  }
		}
	  },
	  toggleUpdate : function() {
		this.$.saveButton.setCaption("Update");
	  },
	  toggleAdd : function() {
		this.$.saveButton.setCaption("Create");
		this.$.cattleType.setIndex(1); // Default value: Novillos
	  },
	  on_input : function(inSender, inEvent) {

		this.$.txtAvgWeight.setValue(utils.formatNumberThousands(utils
			.parseToNumber(this.$.peso.getValue())
			/ utils.parseToNumber(this.$.cabezas.getValue())));
		return true;
	  }
	});