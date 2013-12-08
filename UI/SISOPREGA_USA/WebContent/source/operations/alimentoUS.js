enyo.kind(
{
  name : "alimentoUS",
  kind : enyo.VFlexBox,
  obj : {},
  events :
  {
	onCancel : "",
	onGuardar : ""
  },
  style : "padding:10px;font-size:17px;background-color:#DABD8B;",
  components : [
  {
	kind : enyo.HFlexBox,
	align : "center",
	pack : "center",
	height : "40px;",
	components : [
	{
	  content : "Date/Time:",
	  width : "180px;",
	  style : "text-align: right;margin-right:10px;"
	},
	{
	  kind : "ToolInput",
	  name : "feedDate",
	  hint : "mm/dd/yyyy",
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
	} ]
  },
  {
	kind : enyo.HFlexBox,
	align : "center",
	pack : "center",
	height : "40px;",
	components : [
	{
	  content : "Feed Amount:",
	  width : "180px;",
	  style : "text-align: right;margin-right:10px;"
	},
	{
	  kind : "controls.numberBox",
	  inputKind : "ToolInput",
	  name : "feedQty",
	  height : "35px",
	  hint : '',
	  flex : 1,
	},
	{
	  content : "Lb",
	  width : "30px;",
	  style : "text-align: right;margin-right:10px;"
	} ]
  },
  {
	kind : enyo.HFlexBox,
	align : "center",
	height : "40px;",
	style : "font-size:14px;",
	components : [
	{
	  kind : enyo.Button,
	  caption : "1.5% pen weight",
	  onclick : "setDefaultPortion",
	  style : "background-color: #DABD8B;min-width:170px;"
	},
	{
	  kind : enyo.Spacer
	},
	{
	  kind : enyo.Button,
	  caption : "Save",
	  onclick : "save",
	  style : "background-color: #DABD8B;min-width:70px;"
	},
	{
	  kind : enyo.Button,
	  caption : "Cancel",
	  onclick : "doCancel",
	  style : "background-color: #DABD8B;min-width:70px;"
	}, ]
  } ],
  ready : function() {
	this.$.feedDate.setValue(utils.dateOut(new Date()));
	this.$.feedDate.$.input.applyStyle("text-align", "left");
	this.$.feedTime.setValue(new Date().toLocaleTimeString().substring(0, 5));
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
  setObj : function(objt) {
	this.obj = objt;
	this.setDefaultPortion();
  },
  getObj : function() {
	return this.obj;
  },
  validateForm : function() {
	var sError = "";
	var qty = utils.parseToNumber(this.$.feedQty.getValue().replace(",", ""));
	if (!qty || qty <= 0 || qty == '') {
	  sError = "Verify the amount.";
	}
	if (sError != "") {
	  cacheMan.setMessage("", sError);
	  return false;
	}
	return true;
  },
  save : function() {
	if (this.validateForm()) {
	  var objFeed = {};
	  objFeed.dateTime = new Date("" + this.$.feedDate.getValue() + " "
		  + this.$.feedTime.getValue());
	  objFeed.quantity = utils.parseToNumber(this.$.feedQty.getValue().replace(",", ""));
	  if (!this.obj.FeedUS) {
		this.obj.FeedUS = [];
	  }

	  this.obj.FeedUS.push(objFeed);

	  crudInventory.update(this.obj, this, "doGuardar");
	}

  },
  cancel : function() {

  },
  setDefaultPortion : function() {
	this.$.feedQty
		.setValue(utils.formatNumberThousands(this.obj.weight * .015));
  }
});