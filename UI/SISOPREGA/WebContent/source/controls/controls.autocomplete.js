enyo
	.kind(
	{
	  name : "controls.autocomplete",
	  kind : enyo.Control,
	  itemSelectedPopupAux : -1,
	  navigatingOnList : false,
	  layoutKind : enyo.HFlexLayout,
	  allItems : [],
	  sColorWithOutIndex : "teal",
	  sColorWithIndex : "black",
	  usingFilter : false,
	  mouseStatus:0,
	  published :
	  {
		hint : "",
		index : -1,
		items : [], // items to be contained in the control, for on hold
		// button
		filter : [],// sub items, for click button
		highLighted : true,
		width : null,
		height : "50px",
		inputKind : "Input",
		disabled : false
	  },
	  events :
	  {
		"onSelectItem" : "",
		"onEnter" : "",
		"onChangeValue" : ""
	  },
	  getValue : function() {
		return this.$.textField.getValue();
	  },
	  setValue : function(value) {
		this.$.textField.setValue(value);
	  },
	  setFocus : function() {
		this.$.textField.forceFocus();
	  },
	  widthChanged : function(inOldValue) {
		this.$.HFBoxContainer.applyStyle("width", this.getWidth());
		this.$.drop_down.applyStyle("width", this.getWidth());
	  },
	  heightChanged : function(inOldValue) {
		this.$.HFBoxContainer.applyStyle("height", this.getHeight());
		// this.$.btnIcon.applyStyle("height",this.getHeight());
	  },
	  highLightedChanged : function(inOldValue) {
		if (this.highLighted) {
		  this.$.textField.$.input.applyStyle("color", this.sColorWithOutIndex);
		} else {
		  this.$.textField.$.input.applyStyle("color", this.sColorWithIndex);
		}
	  },
	  hintChanged : function(inOldValue) {
		this.$.textField.setHint(this.getHint());
	  },
	  disabledChanged : function(inOldValue) {
		if (this.disabled) {
		  this.$.btnIcon.hide();
		  try {
			document.getElementById(this.$.textField.$.input.id).disabled = true;
		  } catch (e) {
		  }
		  ;

		} else {
		  this.$.btnIcon.show();
		  try {
			document.getElementById(this.$.textField.$.input.id).disabled = false;
		  } catch (e) {
		  }
		  ;

		}
	  },
	  indexChanged : function(inOldValue) {
		if (this.items.length > 0) {
		  if (this.getIndex() > -1 && String(this.getIndex()).trim() != "") {
			this.$.textField.setValue(this.getCaptionByIndex(this.getIndex()));
			this.setHighLighted(false);
		  } else {
			this.$.textField.setValue("");
		  }
		} else {
		  this.clear();
		}
		this.doSelectItem();
	  },
	  itemsChanged : function(inOldValue) {
		this.clear();
		this.$.drop_down.close();
		this.allItems = [];
		var arrItemsAux = this.getItems();
		for ( var i = 0; i < arrItemsAux.length; i++) {
		  if (arrItemsAux[i]) {
			this.allItems.push(arrItemsAux[i]);
		  }
		}
		this.allItems.sort(function(a, b) {
		  return a.caption > b.caption;
		});
		this.filter = this.allItems;
		this.$.drop_down.setItems(this.allItems);
	  },
	  setFilter : function(items) {
		this.filter = [];
		var arrItemsAux = items;
		for ( var i = 0; i < arrItemsAux.length; i++) {
		  if (arrItemsAux[i]) {
			this.filter.push(arrItemsAux[i]);
		  }
		}
		this.filter.sort(function(a, b) {
		  return a.caption > b.caption;
		});
		// this.$.drop_down.setItems(this.allItems);
	  },
	  create : function() {
		this.inherited(arguments);
		this.createComponent(
		{
		  kind : enyo.HFlexBox,
		  name : "HFBoxContainer",
		  flex : 1,
		  components : [
		  {
			kind : this.inputKind,
			name : "textField",
			hint : "",
			onkeyup : "key_up",
			onkeydown : "key_down",
			onblur : "lostFocus",
			flex : 1
		  },
		  {
			style : "background-color:#DABD8B;margin: 0px 0px 0px -2px;",
			kind : "IconButton",
			icon : "../SISOPREGA_WEB_LIB/images/icon-arrows-down.png",
			//onclick : "click_button",
			onmousehold : "hold_button",
			onmouseup: "mouseUp_button",
			onmousedown:"mouseDown_button",
			name : "btnIcon"

		  } ]
		});

		this.hintChanged();
		this.highLightedChanged();
		this.heightChanged();
		this.widthChanged();
		// this.indexChanged();
	  },
	  components : [
	  {
		name : "drop_down",
		kind : enyo.PopupList,
		width : "300px",
		modal : false,
		onSelect : "select_item",
		onSetupItem : "setupItem",
		items : []
	  } ],
	  lostFocus : function(inSender, inEvent) {
		// if (!this.navigatingOnList && this.$.drop_down.isOpen &&
		// this.$.drop_down.selected > -1 && this.$.drop_down.selected
		// != null) {
		// this.setIndex(this.$.drop_down.items[this.$.drop_down.selected].value);
		// this.$.drop_down.close();
		// }
	  },
	  setupItem : function(inSender, InIndex) {
		this.itemSelectedPopupAux++;
		if (this.index > -1 && !this.navigatingOnList) {
		  if (this.getCaptionByIndex(this.index) == InIndex.$.item.getContent()) {
			InIndex.applyStyle("background-color", "white");
			// this.$.textField.setValue(InIndex.caption);
			this.$.drop_down.selected = this.itemSelectedPopupAux;
		  }
		} else if (!this.navigatingOnList && this.itemSelectedPopupAux == 0) {
		  InIndex.applyStyle("background-color", "white");
		  this.$.drop_down.selected = 0;
		} else if (this.$.drop_down.selected > -1
			&& this.$.drop_down.selected != null) {
		  if (this.$.drop_down.items[this.$.drop_down.selected].caption == InIndex.$.item
			  .getContent()) {
			InIndex.applyStyle("background-color", "white");
			this.$.textField.setValue(InIndex.caption);
		  }
		}
		return false;
	  },
	  select_item : function(inSender, inSelected) {
		this.setIndex(inSender.items[inSelected].value);
		this.$.textField.forceFocus();
	  },
	  useFilter : function() {
		this.$.drop_down.setItems(this.filter);
		this.usingFilter = true;
	  },
	  useAllItems : function() {
		this.$.drop_down.setItems(this.allItems);
		this.usingFilter = false;
	  },
	  click_button : function(inSender, inEvent) {
		if (this.$.drop_down.isOpen)
		  this.$.drop_down.close();
		this.itemSelectedPopupAux = -1;
		this.$.drop_down.setItems(this.filter);
		if (this.$.drop_down.items.length > 0) {
		  this.$.drop_down.openAroundControl(this.$.textField, "", "left");
		  this.$.drop_down.scrollToSelected();
		}
		this.$.textField.forceFocus();
		return true;
	  },
	  hold_button : function(inSender, inEvent) {
		this.mouseStatus = 2;
		if (this.$.drop_down.isOpen)
		  this.$.drop_down.close();
		this.itemSelectedPopupAux = -1;
		this.$.drop_down.setItems(this.allItems);
		if (this.$.drop_down.items.length > 0) {
		  this.$.drop_down.openAroundControl(this.$.textField, "", "left");
		  this.$.drop_down.scrollToSelected();
		}
		this.$.textField.forceFocus();
		return true;
	  },
	  mouseDown_button:function(){
		this.mouseStatus = 1;
		return true;
	  },
	  mouseUp_button:function(InSender, InEvent){
		if(this.mouseStatus == 1){
		  if (this.$.drop_down.isOpen)
			  this.$.drop_down.close();
			this.itemSelectedPopupAux = -1;
			this.$.drop_down.setItems(this.filter);
			if (this.$.drop_down.items.length > 0) {
			  this.$.drop_down.openAroundControl(this.$.textField, "", "left");
			  this.$.drop_down.scrollToSelected();
			}
			this.$.textField.forceFocus();
			return false;  
		}
	  },
	  key_down : function(inSender, inEvent) {
		switch (inEvent.keyCode) {
		case 13:
		  if (this.$.drop_down.isOpen && this.$.drop_down.selected > -1
			  && this.$.drop_down.selected != null) {
			this.itemSelectedPopupAux = -1;
			this
				.setIndex(this.$.drop_down.items[this.$.drop_down.selected].value);
			// this.$.drop_down.close();
			// this.$.drop_down.selected = -1;
		  } else {
			this.doEnter();
		  }
		  break;
		case 38:// up
		  this.selectUp();
		  return true;
		  break;
		case 40:// down
		  this.selectDown();
		  return true;
		  break;
		case 37:// left
		  break;
		case 39:// right
		  break;
		case 9: // tab
		  return true;
		default:
		  // console.info(inEvent.keyCode);
		}
		this.$.drop_down.close();
		return true;
	  },
	  selectDown : function() {
		if (this.$.drop_down.isOpen) {
		  this.navigatingOnList = true;
		  if (this.$.drop_down.items.length > 0) {
			if (this.$.drop_down.selected < this.$.drop_down.items.length - 1) {
			  this.$.drop_down.selected++;
			  // this.$.drop_down.selected =
			  // this.itemSelectedPopup;
			  this.$.drop_down.scrollToSelected();
			} else {
			  this.$.drop_down.selected = 0;
			  // this.$.drop_down.selected =
			  // this.itemSelectedPopup;
			  this.$.drop_down.scrollToSelected();
			}
			this.$.drop_down.render();
		  } else {
			this.$.drop_down.selected = -1;
		  }
		  this.navigatingOnList = false;
		} else {

		  if (this.$.drop_down.items.length > 0) {
			if (this.$.drop_down.selected < this.$.drop_down.items.length - 1) {
			  this.$.drop_down.selected++;
			} else {
			  this.$.drop_down.selected = 0;
			}
			this
				.setIndex(this.$.drop_down.items[this.$.drop_down.selected].value);
		  }
		}
	  },
	  selectUp : function() {
		if (this.$.drop_down.isOpen) {
		  this.navigatingOnList = true;
		  if (this.$.drop_down.items.length > 0) {
			if (this.$.drop_down.selected > 0) {
			  this.$.drop_down.selected--;
			  // this.$.drop_down.selected =
			  // this.itemSelectedPopup;
			  this.$.drop_down.scrollToSelected();
			} else {
			  this.$.drop_down.selected = this.$.drop_down.items.length - 1;
			  // this.$.drop_down.selected =
			  // this.itemSelectedPopup;
			  this.$.drop_down.scrollToSelected();
			}
			this.$.drop_down.render();
		  } else {
			this.$.drop_down.selected = -1;
		  }
		  this.navigatingOnList = false;
		} else {
		  if (this.$.drop_down.items.length > 0) {
			if (this.$.drop_down.selected > 0) {
			  this.$.drop_down.selected--;
			} else {
			  this.$.drop_down.selected = this.$.drop_down.items.length - 1;
			}
			this
				.setIndex(this.$.drop_down.items[this.$.drop_down.selected].value);
		  }
		}
	  },
	  key_up : function(inSender, inEvent) {
		var arrAux = [];
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
		this.setHighLighted(true);
		this.index = -1;

		value = inSender.value;
		arrAux = this.findItem(value);
		this.itemSelectedPopupAux = -1;
		if (arrAux.length > 0) {
		  this.index = -1;
		  this.$.drop_down.setItems(arrAux);
		  if (this.$.drop_down.items.length > 0) {
			this.$.drop_down.openAroundControl(this.$.textField, "", "left");
			this.$.drop_down.selected = 0;
			this.$.drop_down.scrollToSelected();
		  }
		} else {
		  this.$.drop_down.close();
		}
		this.doChangeValue();
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
				var elemento =
				{
				  caption : items[index].caption,
				  value : items[index].value
				};
				result.push(elemento);
				break;
			  }
			}
		  }
		}
		return result;
	  },
	  getCaptionByIndex : function(index) {
		for ( var i = 0; i < this.allItems.length; i++) {
		  if (this.allItems[i].value == index) {
			return this.allItems[i].caption;
		  }
		}
	  },
	  getValueByCaption : function(caption) {
		for ( var i = 0; i < this.allItems.length; i++) {
		  if (this.allItems[i].caption == caption) {
			return this.allItems[i].value;
		  }
		}
	  },
	  getValueByIndex : function(index) {
		if (this.allItems.length > 0) {
		  return this.allItems[index].value;
		}
	  },
	  getFirstOne : function() {
		var lowerValue = undefined;
		var index = -1;
		if (this.allItems.length > 0) {
		  for ( var i = 0; i < this.allItems.length; i++) {
			if (!lowerValue || lowerValue > parseInt(this.allItems[i].value)) {
			  lowerValue = parseInt(this.allItems[i].value);
			  index = i;
			}
		  }
		  return this.allItems[index];
		}
	  },
	  getItemSelected : function() {
		if (this.usingFilter) {
		  for ( var i = 0; i < this.filter.length; i++) {
			if (this.filter[i].value == this.getIndex()) {
			  return this.filter[i];
			}
		  }
		} else {
		  for ( var i = 0; i < this.allItems.length; i++) {
			if (this.allItems[i].value == this.getIndex()) {
			  return this.allItems[i];
			}
		  }
		}
	  },
	  clear : function() {
		this.$.textField.setValue("");
		this.index = -1;
		this.$.drop_down.selected = -1;
		this.setHighLighted(true);
	  }
	});
