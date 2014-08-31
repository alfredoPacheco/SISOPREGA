enyo
	.kind(
	{
	  name : "operations.sales.form",
	  kind : "forms.masterDetail",
	  published :
	  {
		entityKind : crudSale,
		parentObject : null
	  },
	  create : function() {
		this.inherited(arguments);
		this.$.masterFields.createComponents([
		{
		  name : "addCustomerDialog",
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
			width : "50px;",
			style : "text-align: right;margin-right:5px;"
		  },
		  {
			kind : "controls.dateMask",
			inputKind : "ToolInput",
			name : "saleDate",
			height : "35px;",
			bindTo : "dateAllotted",
			style : "max-width:130px;",
			bindTo : "saleDate"
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
			content : "Client:",
			width : "50px;",
			style : "text-align: right;margin-right:5px;"
		  },
		  {
			kind : "controls.autocomplete",
			inputKind : "ToolInput",
			name : "customer",
			width : "275px;",
			height : "35px;",
			bindTo : "customerId"
		  },
		  {
			kind : enyo.IconButton,
			icon : "../SISOPREGA_WEB_LIB/images/menu-icon-new.png",
			onclick : "showCustomerForm",
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
		  width : "150px;",
		  style : "margin-right: 15px;",
		  bindTo : "cattleTypeId",
		  belongsTo : "SaleDetail",
		  onSelectItem : "cattleSelected",
		  sortType:"Text"
		},
		{
		  kind : "controls.autocomplete",
		  inputKind : "ToolInput",
		  height : "35px;",
		  name : "cattleQuality",
		  hint : 'Class',
		  width : "150px;",
		  style : "margin-right: 15px;",
		  bindTo : "qualityId",
		  belongsTo : "SaleDetail",
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
		  belongsTo : "SaleDetail",
		  onSelectItem : "pen_select",
		  onEnter : "pen_enter",
		  onChangeValue : "pen_change",
		  sortType:"Text"
		},
		{
		  kind : enyo.Button,
		  caption : "Available: 0",
		  onclick : "",
		  style : "margin-right: 15px;background-color: #DABD8B;",
		  allowHtml : true,
		  width : "120px;",
		  name : "qtyAvailable"
		},
		{
		  kind : "controls.numberBox",
		  inputKind : "ToolInput",
		  name : "cabezas",
		  hint : 'Heads',
		  width : "80px;",
		  height : "35px",
		  style : "margin-right: 15px;",
		  bindTo : "heads",
		  belongsTo : "SaleDetail",
		  textAlign : "right",
		  onInput : "calculateAverageInput",
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
		  belongsTo : "SaleDetail",
		  textAlign : "right",
		  onInput : "calculateAverageInput",
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
		  belongsTo : "SaleDetail",
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
		crudCustomer.get(this, "readCallBack");
		crudCattle.get(this, "readCallBack");
		crudCattleQuality.get(this, "readCallBack");
		crudPen.get(this, "readCallBack");
		crudInventory.get(this, "readCallBack");

		this.$.saleDate.setToday();
	  },
	  readCounter : 0,
	  readCallBack : function() {
		this.readCounter++;
		if (this.readCounter == 5) {
		  this.readCounter = 0;
		  this.loadAutocompletes();
		}
	  },
	  loadAutocompletes : function() {
		this.$.customer.setItems(crudCustomer.getList());
		this.$.cattleType.setItems(crudInventory.getActiveCattlesList());
		this.$.cattleType.setIndex(1); // Default value: Novillos
		this.$.pen.setItems(crudInventory.getPensList());
		this.$.cattleQuality.setItems(crudInventory.getActiveQualitiesList());
		this.afterLoad();
	  },
	  validateAdd : function() { // function to override if necessary validate
		// the item to be added.
		var sError = "";
		if (this.$.qtyAvailable.getCaption() != "") {
		  var arrSplit = this.$.qtyAvailable.getCaption().split(":");
		  var headsAvailable = utils.parseToNumber(arrSplit[1]);
		  if (headsAvailable < utils.parseToNumber(this.$.cabezas.getValue())) {
			sError = "Error. Heads quantity is higher than available heads.";
		  }
		}
		if (this.$.cattleQuality.getIndex() == -1
			|| this.$.pen.getIndex() == -1 || this.$.cabezas.getValue() == ""
			|| this.$.peso.getValue() == "") {
		  sError = "Error. Verify that all fields have a value.";
		}

		for ( var i = 0; i < this.arrDetail.length; i++) {
		  if (this.arrDetail[i].penId == this.$.pen.getItemSelected().value) {
			sError = "Error. The pen is already in the list.";
			break;
		  }
		}
		if (sError != "") {
		  cacheMan.setMessage("", sError);
		  return false;
		}

		var x = utils.parseToNumber(this.$.peso.getValue());
		var weightRounded;

		if (x < 5 && x > 1)
		  weightRounded = 5;
		else
		  weightRounded = Math.round(x / 5.0) * 5;

		this.$.peso.setValue(weightRounded);

		return true;

	  },
	  showCustomerForm : function() {
		if (this.$.customerForm) {
		  this.$.customerForm.destroy();
		}
		this.$.addCustomerDialog.createComponent(
		{
		  kind : "catalogs.customer.form",
		  onAdd : "addCustomer",
		  onCancel : "cancelCreateCustomer",
		  name : "customerForm",
		  flex : 1
		},
		{
		  owner : this
		});
		this.$.addCustomerDialog.render();
		this.$.addCustomerDialog.openAtCenter();
	  },
	  addCustomer : function(inSender, result) {
		this.$.customer.setItems(crudCustomer.getList());

		var justCreated = result.records[0];
		this.$.customer.setIndex(justCreated.customerId);
		this.$.addCustomerDialog.close();
		cacheMan.hideScrim();
	  },
	  cancelCreateCustomer : function() {
		this.$.addCustomerDialog.close();
	  },
	  cattleSelected : function(inSender) {
		var filter = [];
		var items = this.$.cattleQuality.getItems();
		for ( var i = 0; i < items.length; i++) {
		  if (items[i].cattleTypeId == inSender.getIndex()) {
			filter.push(items[i]);
		  }
		}
		this.$.cattleQuality.setFilter(filter);
		this.$.cattleQuality.clear();
		this.$.cattleQuality.useFilter();
		if (filter.length > 0) {
		  this.$.cattleQuality.setIndex(filter[0].value);
		} else {
		  this.$.qtyAvailable.setCaption("Available: 0");
		}
		this.$.cabezas.setValue("");
		this.$.peso.setValue("");
	  },
	  clase_select : function(inSender) {
		var filter = [];
		var items = this.$.pen.getItems();
		for ( var i = 0; i < items.length; i++) {
		  if (items[i].object.qualityId == this.$.cattleQuality.getIndex()) {
			filter.push(items[i]);
		  }
		}
		this.$.pen.setFilter(filter);
		this.$.pen.clear();
		this.$.pen.useFilter();
		if (filter.length > 0) {
		  this.$.pen.setIndex(filter[0].value);
		} else {
		  this.$.qtyAvailable.setCaption("Available: 0");
		  var itemSelected = inSender.getItemSelected();
		  if (itemSelected && itemSelected.object) {
			this.$.cattleType.index = inSender.getItemSelected().cattleTypeId;
			this.$.cattleType.setValue(this.$.cattleType
				.getCaptionByIndex(this.$.cattleType.index));
		  }
		}
		this.$.cabezas.setValue("");
		this.$.peso.setValue("");
	  },
	  pen_select : function(inSender) {
		var itemSelected = null;
		if (this.$.cattleType.getIndex() == ''
			|| this.$.cattleType.getIndex() < 0) {
		  itemSelected = inSender.getItemSelected();
		} else {
		  for ( var i = 0; i < inSender.items.length; i++) {
			if (inSender.items[i].object) {
			  if (inSender.items[i].object.cattypeId == this.$.cattleType
				  .getIndex()) {
				if (inSender.items[i].value == inSender.index) {
				  itemSelected = inSender.items[i];
				}
			  }
			}
		  }
		}
		if (itemSelected) {
		  var qtyAvailable = itemSelected.object.availableToSell;
		  this.$.qtyAvailable.setCaption("Available: " + qtyAvailable);

		  // Not using setter for index because we don't want to raise event
		  // so we have to set value manually
		  this.$.cattleQuality.index = itemSelected.object.qualityId;
		  this.$.cattleQuality.setValue(this.$.cattleQuality
			  .getCaptionByIndex(this.$.cattleQuality.index));
		  this.$.cattleType.index = itemSelected.object.cattypeId;
		  this.$.cattleType.setValue(this.$.cattleType
			  .getCaptionByIndex(this.$.cattleType.index));

		} else {
		  this.$.qtyAvailable.setCaption("Available: 0");
		}

	  },
	  pen_change : function(inSender) {
		if (inSender.index < 0) {
		  this.$.qtyAvailable.setContent("Available: 0");
		  this.$.cabezas.setValue("");
		  this.$.peso.setValue("");
		}
	  },
	  beforeSave : function(obj) {
		var items = crudInventory.getPensList();
		if (obj.SaleDetail) {
		  for ( var i = 0; i < obj.SaleDetail.length; i++) {
			obj.SaleDetail[i].inventoryId = -1;
			for ( var j = 0; j < items.length; j++) {
			  if (items[j].value == obj.SaleDetail[i].penId) {
				obj.SaleDetail[i].inventoryId = items[j].object.inventoryId;
				break;
			  }
			}
		  }
		}
		return true;
	  },
	  on_input : function(inSender, inEvent) {
		var objPen = this.$.pen.getItemSelected();
		var objInPen = objPen.object;
		if (objInPen !== undefined) {
		  this.$.peso.setValue(utils.formatNumberThousands((utils
			  .parseToNumber(inEvent.value)
			  * utils.parseToNumber(objInPen.weight) / utils
			  .parseToNumber(objInPen.heads))));
		  return true;
		}
	  },
	  // setEntity : function(entity, bUpdatingMode) {
	  // if (bUpdatingMode) {
	  // this.toggleUpdate();
	  // this.resetValues();
	  // } else {
	  // this.toggleAdd();
	  // }
	  // this.arrDetail = [];
	  // if (entity) {
	  // var controls = this.$;
	  // for ( var i in controls) {
	  // if (controls[i].hasOwnProperty("belongsTo")) {
	  // // if (entity[controls[i].belongsTo])
	  // // this.setValueForControl(controls[i],
	  // // entity[controls[i].belongsTo][0][controls[i].bindTo]);
	  // } else if (controls[i].hasOwnProperty("bindTo")) {
	  // this.setValueForControl(controls[i], entity[controls[i].bindTo]);
	  // }
	  // }
	  // this.updatingEntityId = entity[this.entityKind.entityIdName()];
	  //
	  // if (entity.PurchaseDetail) {
	  // for ( var i = 0; i < entity.PurchaseDetail.length; i++) {
	  // var obj =
	  // {
	  // heads : entity.PurchaseDetail[i].heads,
	  // penId : entity.PurchaseDetail[i].penId,
	  // cattleTypeId : entity.PurchaseDetail[i].cattleTypeId,
	  // qualityId : entity.PurchaseDetail[i].qualityId,
	  // weight : entity.PurchaseDetail[i].weight,
	  // avgWeight : entity.PurchaseDetail[i].avgWeight,
	  // entityName : entity.PurchaseDetail[i].entityName,
	  // paidAmount : entity.PurchaseDetail[i].paidAmount,
	  // purchaseDetailId : entity.PurchaseDetail[i].purchaseDetailId,
	  // purchasePrice : entity.PurchaseDetail[i].purchasePrice,
	  // settled : entity.PurchaseDetail[i].settled,
	  // fields :
	  // {
	  // 0 : crudCattle
	  // .getCattleTypeById(entity.PurchaseDetail[i].cattleTypeId).cattypeName,
	  // 1 : crudCattleQuality
	  // .getByID(entity.PurchaseDetail[i].qualityId).qualityName,
	  // 2 : crudPen.adapterToList(crudPen
	  // .getByID(entity.PurchaseDetail[i].penId)).caption,
	  // 3 : entity.PurchaseDetail[i].heads,
	  // 4 : entity.PurchaseDetail[i].weight,
	  // 5 : entity.PurchaseDetail[i].avgWeight
	  // }
	  // };
	  // this.arrDetail.push(obj);
	  // }
	  // this.updateList();
	  // this.$.detailScroller.scrollTo(this.$.detailScroller
	  // .getBoundaries().bottom, 0);
	  // }
	  // }
	  // },
	  // toggleUpdate : function() {
	  // this.$.saveButton.setCaption("Update");
	  // },
	  // toggleAdd : function() {
	  // this.$.saveButton.setCaption("Create");
	  // this.$.cattleType.setIndex(1); // Default value: Novillos
	  // },
	  calculateAverageInput : function(inSender, inEvent) {

		this.$.txtAvgWeight.setValue((utils
			.parseToNumber(this.$.peso.getValue())
			/ utils.parseToNumber(this.$.cabezas.getValue())).toFixed(1));
		return true;
	  }
	});
