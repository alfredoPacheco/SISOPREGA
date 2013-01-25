enyo.kind({
	name : "controls.autocomplete",
	kind : enyo.Item,
	itemSelectedPopup : -1,
	arrItems : [],
	layoutKind : enyo.HFlexLayout,
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
			kind : "IconButton",
			icon : "images/menu-icon-new.png",
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
			this.objRan = this.$.drop_down.items[0];
		}
		this.$.drop_down.close();
	},
	select_item : function(inSender, inSelected) {
		this.$.textField.setValue(inSender.items[inSelected].caption);
		this.objRan = inSender.items[inSelected];
	},
	click_button : function(inSender, inEvent) {
		this.$.drop_down.setItems(cacheRanchers.getAllForList());
		this.$.drop_down.openAtEvent(inEvent);		
		return false;
	},
	key_up : function(inSender, inEvent) {

		console.debug("Se entro a key_up");
		console.debug(inEvent.keyCode);
		var arrAux = [];
		var value = "";
		switch (inEvent.keyCode) {
		// case 8: // backspace
		// value = inSender.value = inSender.value.slice(0,
		// inSender.value.length - 1);
		// break;
		// case 46: // delete
		// return false;
		// case 9: // tab
		// case 32: //space
		// return;
		// default:
		// value = "" + inSender.value + String.fromCharCode(inEvent.keyCode);
		//
		}
		value = inSender.value;
		arrAux = cacheRanchers.findRancher(value);
		if (arrAux.length > 0) {
			this.$.drop_down.setItems(arrAux);
			// this.$.drop_down.$.list.$.client.controls[0].setStyle("background-color:yellow;");
			this.$.drop_down.openAroundControl(this.$.textField, "", "left");
		} else {
			// this.$.drop_down.setItems(cacheRanchers.getAllForList());
			this.$.drop_down.close();
		}

	},

});
