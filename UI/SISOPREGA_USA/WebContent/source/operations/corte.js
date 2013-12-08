enyo.kind(
{
  name : "corte",
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
	  width : "166px;",
	  style : "text-align: right;margin-right:10px;"
	},
	{
	  kind : "ToolInput",
	  name : "corteDate",
	  hint : "mm/dd/yyyy",
	  flex : 1,
	  height : "35px;",
	  onfocus : "applyMask",
	},
	{
	  kind : "ToolInput",
	  name : "corteTime",
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
	  content : "Adjusted heads:",
	  width : "166px;",
	  style : "text-align: right;margin-right:10px;"
	},
	{
	  kind : "ToolInput",
	  name : "CabezaMerma",
	  hint : 'Heads',
	  flex : 1,
	} ]
  },
  {
	kind : enyo.HFlexBox,
	align : "center",
	pack : "center",
	height : "40px;",
	components : [
	{
	  content : "Comment:",
	  width : "166px;",
	  style : "text-align: right;margin-right:10px;",

	},
	{
	  kind : "ToolInput",
	  name : "MermaComent",
	  hint : 'Comment',
	  flex : 1,
	} ]
  },
  {
	kind : enyo.HFlexBox,
	align : "center",
	height : "40px;",
	style : "font-size:14px;",
	components : [
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
  }
  // ]},
  ],
  ready : function() {
	this.$.corteDate.setValue(utils.dateOut(new Date()));
	this.$.corteDate.$.input.applyStyle("text-align", "left");
	this.$.corteTime.setValue(new Date().toLocaleTimeString().substring(0, 5));
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
  },
  getObj : function() {
	return this.obj;
  },
  save : function() {

	var objInventory = enyo.clone(this.obj);
	var objShrinkage = {};
	objShrinkage.dateTime = new Date("" + this.$.corteDate.getValue() + " "
		+ this.$.corteTime.getValue());
	objShrinkage.comment = this.$.MermaComent.getValue();
	objShrinkage.heads = utils.parseToNumber(this.$.CabezaMerma.getValue());
	objShrinkage.weight = utils.parseToNumber(objInventory.weight)
		/ utils.parseToNumber(objInventory.heads) * objShrinkage.heads;

	if (!objInventory.Shrinkage) {
	  objInventory.Shrinkage = [];
	}

	objInventory.Shrinkage.push(objShrinkage);

	objInventory.heads = objInventory.heads - objShrinkage.heads;
	objInventory.weight = objInventory.weight - objShrinkage.weight;

	crudInventory.update(objInventory, this, "doGuardar");
  },
  cancel : function() {

  }

});