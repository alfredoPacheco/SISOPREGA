enyo.kind({
	name : "controls.multiselect",
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
		if(this.items.length > 0){
			if(this.getIndex()>-1){
				this.$.textField.setValue(this.getCaptionByIndex(this.getIndex()));
			}else{
				this.$.textField.setValue("");	
			}
		}else{
			this.$.textField.setValue("");
			this.index = -1;
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
//		this.indexChanged();
	},
	components : [ 
	{kind: "Popup", name:"drop_down",
		layoutKind : enyo.VFlexLayout,
		items:[],
		width: "300px",height:"300px",
		setItems:function(items){
			this.items = items;			
		},
		components : [ {
			kind : enyo.Scroller,
			flex : 1,
			autoHorizontal: false, horizontal: false,
//			className : "listBG",
			components : [ {
				kind : enyo.VirtualRepeater,
				name : "list",
				onSetupRow : "setupItem",
				onclick : "select_item",
				components : [{kind: "Item", layoutKind: "HFlexLayout", components: [ 
				              {kind : "Divider"},
				              {kind: "CheckBox",onChange: "checkboxClicked", name:"check_box"},
				              {kind:"Spacer"},
				              {name : "caption",style: "font-size:12px;text-align:left;",content : "", flex:9}
				              ]}]
				}]
		}, {
			kind : "Toolbar",
			components : [ {
				kind : "enyo.IconButton",
				flex : 1,
				label : "Aceptar",
				onclick : "doPerson"
			}, {
				kind : "enyo.IconButton",
				flex : 1,
				label : "Cancelar",
				onclick : "doEnterprise"
			}]
		}],
		checkboxClicked: function(inSender) {
		    if (inSender.getChecked()) {
		         this.log("I've been checked!");
		    }
		},
		select_item : function(inSender, inEvent) {
			if (this.items[inEvent.rowIndex]) {
				this.iSelected = inEvent.rowIndex;
				this.doSelect_item();
			}
		},
		getSelected : function() {
			return this.items[this.iSelected];
		},
		
		setupProductRow : function(inSender, inIndex) {
			
		},
		
		deleteRancher : function(inSender, inIndex) {
			if (cacheRanchers.del(this.items[inIndex], this, "filterRanchers")) {
				return true;
			} else {
				return false;
			}
		},
		ready : function() {
			
//			this.updateList();
		},
		updateList : function() {
			this.$.list.render();
		}},
		
		
//		
//		
//		published:{items:[],selected:-1},
//		setItems:function(items){
//			this.$.p_multiselect.setItems(items);
//		},
//		create : function() {
//			this.inherited(arguments);			
////			this.indexChanged();
//		},
//		  layoutKind: "VFlexLayout",onSelect : "select_item", onSetupItem: "setupItem",
//		 width: "300px", components:[ {kind: "controls.multiselect.popuplist", 
//			 							name:"p_multiselect", flex: 1}]}, 
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
	setupItem : function(inSender, inIndex){
		var objRan;
		if (objRan = this.items[inIndex]) {
			this.setupDivider(inIndex);
			this.$.caption.setContent(objRan.caption);
			
//			this.$.info.setContent(objRan.phone_number);
			return true;
		}
		
		
		
//		this.itemSelectedPopupAux++;
//		if (this.index > -1 && !this.navigatingOnList){
//			if(this.getCaptionByIndex(this.index) == InIndex.$.item.getContent()){
//				InIndex.applyStyle("background-color", "white");
////				this.$.textField.setValue(InIndex.caption);
//				this.$.drop_down.selected = this.itemSelectedPopupAux;				
//			}
//		}
//		else if (!this.navigatingOnList && this.itemSelectedPopupAux == 0 ){
//			InIndex.applyStyle("background-color", "white");
//			this.$.drop_down.selected = 0;	
//		}
//		else if(this.$.drop_down.selected > -1 && this.$.drop_down.selected != null){
//			if(this.$.drop_down.items[this.$.drop_down.selected].caption == InIndex.$.item.getContent()){
//				InIndex.applyStyle("background-color", "white");
//				this.$.textField.setValue(InIndex.caption);
//			}
//		}
//		return false;
	},
	getGroupName : function(inIndex) {
		try {
			// get previous record
			var r0 = this.items[inIndex - 1];
			// get (and memoized) first letter of last name
			if (r0) {
				r0.letter = r0.sortStr.substr(0, 1).toUpperCase();
			}
			var a = r0 && r0.letter;
			// get record
			var r1 = this.items[inIndex];
			r1.letter = r1.sortStr.substr(0, 1).toUpperCase();
			var b = r1.letter;
			// new group if first letter of last name has changed
			return a != b ? b : null;
		} catch (e) {
			return null;
		};

	},
	setupDivider : function(inIndex) {
		// use group divider at group transition, otherwise use item border for
		// divider
		var group = this.getGroupName(inIndex);
		this.$.divider.setCaption(group);
		this.$.divider.canGenerate = Boolean(group);
	},
	lostFocus : function(inSender, inEvent) {
//		if (!this.navigatingOnList && this.$.drop_down.isOpen && this.$.drop_down.selected > -1 && this.$.drop_down.selected != null) {
//			this.setIndex(this.$.drop_down.items[this.$.drop_down.selected].value);
//			this.$.drop_down.close();
//		}		
	},
	select_item : function(inSender, inSelected) {
		this.setIndex(inSender.items[inSelected].value);
		this.$.textField.forceFocus();
	},
	click_button : function(inSender, inEvent) {
		this.itemSelectedPopupAux=-1;
		this.$.drop_down.setItems(this.allItems);
		if(this.$.drop_down.items.length > 0){
//			this.$.drop_down.scrollToSelected();
			this.$.drop_down.openAtEvent(inEvent);
			this.$.list.render();
		}
		this.$.textField.forceFocus();		
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
			if(this.$.drop_down.items.length > 0){
				this.$.drop_down.openAroundControl(this.$.textField, "", "left");
				this.$.drop_down.selected = 0;
				this.$.drop_down.scrollToSelected();
			}
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
	},
	clear:function(){
		this.$.textField.setValue("");
		this.index = -1;
	}
});