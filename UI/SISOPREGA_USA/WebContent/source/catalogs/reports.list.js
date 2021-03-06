enyo.kind(
{
  name : "reports.list",
  kind : enyo.VFlexBox,
  selectedItem : null,
  arrList : [],
  allItems : [],
  events :
  {
	onSelectItem : ""
  },
  setItems : function(items) {
	this.allItems = items;
	this.arrList = this.allItems;
	this.updateList();
  },
  components : [
  {
	kind : enyo.Scroller,
	flex : 1,
	className : "listBG",
	name : "scroller",
	components : [
	{
	  kind : enyo.VirtualRepeater,
	  name : "list",
	  onSetupRow : "setupProductRow",
	  onclick : "selectItem",
	  components : [
	  {
		kind : "Divider"
	  },
	  {
		kind : enyo.SwipeableItem,
		name : "item",
		tapHighlight : false,
		components : [
		{
		  name : "importantInfo",
		  className : "listFirst",
		  content : ""
		},
		{
		  name : "secundaryInfo",
		  className : "listSecond",
		  content : ""
		} ]
	  } ]
	} ]
  },
  {
	kind : "Toolbar",
	height : '100px;',
	components : [
	{
	  kind : enyo.VFlexBox,
	  flex : 1,
	  components : [
	  {
		kind : enyo.HFlexBox,
		align : "center",
		components : [
		{
		  kind : "ToolInput",
		  name : "filter",
		  align : "left",
		  onkeyup : "key_up",
		  flex : 1,
		  hint : "Filter",
		  changeOnInput : true
		},
		{
		  kind : "Button",
		  name : "btnClearFilter",
		  className : "enyo-button-negative",
		  caption : "Clear Filter",
		  onclick : "clearFilter",
		  width : "115px;"
		} ]
	  },
	  {
		kind : enyo.HFlexBox,
		components : [
		{
		  kind : "enyo.IconButton",
		  style : "",
		  label : "New",
		  onclick : "add_click"
		} ]
	  } ]
	} ]
  } ],
  getSelected : function() {
	return this.selectedItem;
  },
  getGroupName : function(inIndex) {
	try {
	  // get previous record
	  var r0 = this.arrList[inIndex - 1];
	  // get (and memoized) first letter of last name
	  if (r0) {
		r0.letter = r0.sortStr.substr(0, 1).toUpperCase();
	  }
	  var a = r0 && r0.letter;
	  // get record
	  var r1 = this.arrList[inIndex];
	  r1.letter = r1.sortStr.substr(0, 1).toUpperCase();
	  var b = r1.letter;
	  // new group if first letter of last name has changed
	  return a != b ? b : null;
	} catch (e) {
	  return null;
	}
  },
  setupDivider : function(inIndex) {
	// use group divider at group transition, otherwise use item border for
	// divider
	var group = this.getGroupName(inIndex);
	this.$.divider.setCaption(group);
	this.$.divider.canGenerate = Boolean(group);
  },
  key_up : function(inSender, inEvent) {

	var value = "";
	var x = inEvent.keyCode;
	switch (true) {
	case (x == 8): // backspace
	case (x == 32): // space
	case (x >= 46 && x <= 90): // letters and numbers and delete
	  break;
	case (x == 16): // Shift
	case (x == 9): // tab
	case (x == 38): // up
	case (x == 40): // down
	case (x == 37): // left
	case (x == 39): // right
	case (x == 13): // enter
	  return true;
	}

	value = inSender.value;
	if (value.trim() != "") {
	  this.arrList = this.findItem(value);
	} else {
	  this.arrList = this.allItems;
	}
	this.updateList();
  },
  findItem : function(criteria) {
	var result = [];
	if (criteria != "") {
	  var items = this.allItems;
	  var pattern = new RegExp(criteria.trim(), "ig");
	  for (index in items) {
		for (prop in items[index]) {
		  pattern.lastIndex = 0;
		  if (pattern.test(items[index][prop])) {
			var elemento = items[index];
			result.push(elemento);
			break;
		  }
		}
	  }
	}
	return result;
  },
  clearFilter : function() {
	this.$.filter.setValue("");
	this.arrList = this.allItems;
	this.updateList();
  },
  reset : function() {
	this.$.filter.setValue("");
	this.loadData();
  },
  loadData : function() {
	this.allItems = rReportsUS.arrObj;
	this.arrList = this.allItems;
	this.updateList();
  },
  updateList : function() {
	this.arrList = this.arrList.sort(function(a, b) {
	  return (a.importantInfo < b.importantInfo) ? -1 : 1;
	});
	this.$.list.render();
	this.$.scroller.scrollIntoView();
  },
  setupProductRow : function(inSender, inIndex) {
	var objItem;
	if (objItem = this.arrList[inIndex]) {
	  this.setupDivider(inIndex);
	  this.$.importantInfo.setContent(objItem.importantInfo);
	  this.$.secundaryInfo.setContent(objItem.secundaryInfo);
	  return true;
	}
  },
  selectItem : function(inSender, inEvent) {
	if (this.arrList[inEvent.rowIndex]) {
	  this.selectedItem = this.arrList[inEvent.rowIndex];
	  this.doSelectItem(this.selectedItem);
	}
  },
});