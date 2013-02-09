enyo.kind({
	name : "controls.autocomplete",
	kind : enyo.Control,
	itemSelectedPopupAux : -1,
	navigatingOnList:false,
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
		onSetupItem: "setupItem",
		items : []
	}, 
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
	],
	lostFocus : function(inSender, inEvent) {
		if (!this.navigatingOnList && this.$.drop_down.isOpen && this.$.drop_down.selected > -1 && this.$.drop_down.selected != null) {
//			this.itemSelectedPopupAux=-1;
			this.setIndex(this.$.drop_down.items[this.$.drop_down.selected].value);
			this.$.drop_down.close();
//			this.$.drop_down.selected = -1;
		}		
	},
	setupItem : function(inSender, InIndex){
		this.itemSelectedPopupAux++;
		if (this.index > -1 && !this.navigatingOnList){
			if(this.items[i].caption == InIndex.$.item.getContent()){
				InIndex.applyStyle("background-color", "white");
//				this.$.textField.setValue(InIndex.caption);
				this.$.drop_down.selected = this.itemSelectedPopupAux;				
			}
		}
		else if (!this.navigatingOnList && this.itemSelectedPopupAux == 0 ){
			InIndex.applyStyle("background-color", "white");
			this.$.drop_down.selected = 0;	
		}
		else if(this.$.drop_down.selected > -1 && this.$.drop_down.selected != null){
			if(this.$.drop_down.items[this.$.drop_down.selected].caption == InIndex.$.item.getContent()){
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
	click_button : function(inSender, inEvent) {
		this.itemSelectedPopupAux=-1;
		this.$.drop_down.setItems(this.allItems);
		this.$.drop_down.openAtEvent(inEvent);
		this.$.textField.forceFocus();
		this.$.drop_down.scrollToSelected();
		return false;
	},
	key_down : function(inSender, inEvent){		
		switch(inEvent.keyCode){
		case 13:
			if (this.$.drop_down.isOpen && this.$.drop_down.selected > -1 && this.$.drop_down.selected != null) {
				this.itemSelectedPopupAux=-1;
				this.setIndex(this.$.drop_down.items[this.$.drop_down.selected].value);
//				this.$.drop_down.close();
//				this.$.drop_down.selected = -1;
			}else{
				this.doEnter();
			}
			break;
		case 38://up
			this.selectUp();
			return true;
			break;
		case 40://down
			this.selectDown();
			return true;
			break;
		case 37://left
			break;
		case 39://right
			break;
		case 9: //tab
			return true;
		default:
//			console.info(inEvent.keyCode);
		}
		this.$.drop_down.close();
		
		return true;
	},
	selectDown:function(){
		if (this.$.drop_down.isOpen) {
			this.navigatingOnList = true;
			if(this.$.drop_down.items.length >0){
				if(this.$.drop_down.selected < this.$.drop_down.items.length - 1){
					this.$.drop_down.selected ++;
//					this.$.drop_down.selected = this.itemSelectedPopup;
					this.$.drop_down.scrollToSelected();					
				}else{
					this.$.drop_down.selected = 0;
//					this.$.drop_down.selected = this.itemSelectedPopup;
					this.$.drop_down.scrollToSelected();
				}
				this.$.drop_down.render();
			}else{
				this.$.drop_down.selected = -1;
			}	
			this.navigatingOnList = false;
		}
	},
	selectUp:function(){
		if (this.$.drop_down.isOpen) {
			this.navigatingOnList = true;
			if(this.$.drop_down.items.length >0){
				if(this.$.drop_down.selected > 0){
					this.$.drop_down.selected --;
//					this.$.drop_down.selected = this.itemSelectedPopup;
					this.$.drop_down.scrollToSelected();
				}else{
					this.$.drop_down.selected = this.$.drop_down.items.length - 1;
//					this.$.drop_down.selected = this.itemSelectedPopup;
					this.$.drop_down.scrollToSelected();
				}
				this.$.drop_down.render();
			}else{
				this.$.drop_down.selected = -1;
			}	
			this.navigatingOnList = false;
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
		case (x == 38): // up
		case (x == 40): // down
		case (x == 37): // left
		case (x == 39): // right
		case (x == 13): // enter
			return true;
		}
		value = inSender.value;
		arrAux = this.findItem(value);
		this.itemSelectedPopupAux=-1;
		if (arrAux.length > 0) {		
			this.index = -1;
			this.$.drop_down.setItems(arrAux);			
			this.$.drop_down.openAroundControl(this.$.textField, "", "left");
			this.$.drop_down.selected = 0;
			this.$.drop_down.scrollToSelected();
		} else {
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
	},
	getIndexByCaption:function(caption){
		for(i in this.items){
			if(this.items[i].caption==caption){
				return this.items[i].value;
			}
		}
	}
});
