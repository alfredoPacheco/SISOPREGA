enyo.kind({
	name : "controls.autocomplete",
	kind : enyo.Item,
	itemSelectedPopup : -1,
	hint : "assdfs",
	layoutKind : enyo.HFlexLayout,
	allItems : [],
	published : {
		hint : "",
		value : "",
		items : [],
		objSelected : {}
	},
	hintChanged : function(inOldValue) {
		this.$.textField.setHint(this.getHint());
	},
	valueChanged : function(inOldValue) {
		this.$.textField.setValue(this.getValue());
	},
	itemsChanged : function(inOldValue) {
		this.$.drop_down.setItems(this.getItems());
		this.allItems = this.getItems();
	},
	create : function() {
		this.inherited(arguments);
		this.hintChanged();
		this.valueChanged();
	},
	components : [ {
		name : "drop_down",
		kind : enyo.PopupList,
		style : "width:300px;",
		modal : false,
		onSelect : "select_item",
		onBeforeOpen : "setupItem",
		items : []
	}, {
		layoutKind : enyo.HFlexLayout,
		components : [ {
			kind : "Input",
			name : "textField",
			hint : "",
			onkeyup : "key_up",
			onblur : "lostFocus",
			flex : 1
		}, {
			style : "background-color:#DABD8B;",
			kind : "IconButton",
			icon : "images/icon-arrows-down.png",
			onclick : "click_button"
		} ]
	}

	],

	controlSelectionItem : function(direction) {
		if (direction == "down") {
			if (d) {
			}
		}
	},
	lostFocus : function(inSender, inEvent) {
		if (this.$.drop_down.isOpen) {
			this.$.textField.setValue(this.$.drop_down.items[0].caption);
			this.objSelected = this.$.drop_down.items[0];
		}
		this.$.drop_down.close();
	},
	select_item : function(inSender, inSelected) {
		this.$.textField.setValue(inSender.items[inSelected].caption);
		this.objSelected = inSender.items[inSelected];
	},
	click_button : function(inSender, inEvent) {
		this.$.drop_down.setItems(this.allItems);
		this.$.drop_down.openAtEvent(inEvent);
		return false;
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
		case (x == 16): //Shift
		case (x == 9): // tab
			return true;
		}
		value = inSender.value;
		arrAux = this.findItem(value);
		if (arrAux.length > 0) {
			this.$.drop_down.setItems(arrAux);
			// this.$.drop_down.$.list.$.client.controls[0].setStyle("background-color:yellow;");
			this.$.drop_down.openAroundControl(this.$.textField, "", "left");
		} else {
			// this.$.drop_down.setItems(cacheRanchers.getAllForList());
			this.$.drop_down.close();
		}

	},
	findItem : function(criteria) {
		var result = [];
		if (criteria != "") {
			var items = this.getItems();
			var pattern = new RegExp(criteria.trim(), "ig");
			for (index in items) {
				for (prop in items[index]) {
					pattern.lastIndex = 0;
					if (pattern.test(items[index][prop])) {
						var elemento = {
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
	}
});
