enyo.kind({
	name : "controls.autocomplete",
	kind : enyo.Control,
	itemSelectedPopup : -1,
	layoutKind : enyo.HFlexLayout,
	allItems : [],
	published : {
		hint : "",
		index : -1,
		items : [],
	},
	events:{
		"onSelectItem":"",
		"onEnter":""
	},
	getValue : function(){
		return this.$.textField.getValue();
	},
	setFocus:	function(){
		this.$.textField.forceFocus();
	},
	hintChanged : function(inOldValue) {
		this.$.textField.setHint(this.getHint());
	},
	indexChanged : function(inOldValue) {
		if(this.getIndex()>-1){
			this.$.textField.setValue(this.getCaptionByIndex(this.getIndex()));
		}else{
			this.$.textField.setValue("");
		}
		this.doSelectItem();
	},
	itemsChanged : function(inOldValue) {
		this.$.drop_down.setItems(this.getItems());
		this.allItems = this.getItems();
	},
	create : function() {
		this.inherited(arguments);
		this.hintChanged();
		this.indexChanged();
	},
	components : [ {
		name : "drop_down",
		kind : enyo.PopupList,
		style : "width:300px;",
		modal : false,
		onSelect : "select_item",
		onBeforeOpen : "setupItem",
		items : []
	}, 
//	{layoutKind : enyo.HFlexLayout,	components : [ 
		               {
			kind : "Input",
			name : "textField",
			hint : "",
			onkeyup : "key_up",
			onkeydown: "key_down",
			onblur : "lostFocus",
			flex : 1
		}, {
			style : "background-color:#DABD8B;",
			kind : "IconButton",
			icon : "images/icon-arrows-down.png",
			onclick : "click_button"
		} 
		
//		]	}

	],

	controlSelectionItem : function(direction) {
		if (direction == "down") {
			if (d) {
			}
		}
	},
	lostFocus : function(inSender, inEvent) {
		if (this.$.drop_down.isOpen) {
			this.setIndex(this.$.drop_down.items[0].value);
		}
		this.$.drop_down.close();
	},
	select_item : function(inSender, inSelected) {
		this.setIndex(inSender.items[inSelected].value);
	},
	click_button : function(inSender, inEvent) {
		this.$.drop_down.setItems(this.allItems);
		this.$.drop_down.openAtEvent(inEvent);
		return false;
	},
	key_down : function(inSender, inEvent){
		
		if(inEvent.keyCode == 13){			
			this.doEnter();
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
		case (x == 16): //Shift
		case (x == 9): // tab
		case (x == 13): // enter
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
	},
	getCaptionByIndex:function(index){
		for(i in this.allItems){
			if(this.allItems[i].value==index){
				return this.allItems[i].caption;
			}
		}
	}
});
