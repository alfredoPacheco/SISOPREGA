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
	itemsSelected:[],
	events:{
		"onSelectItem":"",
		"onEnter":""
	},
	getValue : function(){
		return this.$.textField.getValue();
	},
	setValue: function(str){
		this.$.textField.setValue(str);
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
		this.clear();
		this.$.drop_down.close();
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
		selected:-1,
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
				onclick : "on_acept"
			}, {
				kind : "enyo.IconButton",
				flex : 1,
				label : "Cancelar",
				onclick : "on_cancel"
			}]
		}],
		checkboxClicked: function(inSender) {
		    if (inSender.getChecked()) {
		         this.log("I've been checked!");
		    }
		},
		select_item : function(inSender, inSelected) {
			this.setIndex(inSender.items[inSelected].value);
			this.$.textField.forceFocus();
		},		
		},
		
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
	on_acept:function(){
		var strValue = "";
		for (i in this.itemsSelected){
			if(this.itemsSelected[i]){
				strValue += this.allItems[i].caption + ", ";
			}			
		}
		if(strValue != ""){
			strValue = strValue.slice(0, -2);
		}
		this.$.textField.setValue(strValue);
		this.$.drop_down.close();
	},
	on_cancel:function(){
		this.$.drop_down.close();
	},
	setupItem : function(inSender, inIndex){
		if(this.$.drop_down.selected == inIndex){
			inSender.$.client.$.client.applyStyle("background-color","white");
		}
		inSender.controls[1].controls[1].setChecked(this.itemsSelected[inIndex]);
		var objRan;
		if (objRan = this.$.drop_down.items[inIndex]) {
			this.setupDivider(inIndex);
			this.$.caption.setContent(objRan.caption);
			return true;
		}
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
	select_item : function(inSender, inEvent) {		
		this.itemsSelected[inEvent.rowIndex]=this.$.item.controls[1].getChecked();
		this.$.drop_down.selected = inEvent.rowIndex;
		this.$.drop_down.render();
//		this.setIndex(this.items[inSelected.rowIndex].value);
		this.$.textField.forceFocus();
	},
	click_button : function(inSender, inEvent) {
		this.itemSelectedPopupAux=-1;
		this.$.drop_down.setItems(this.allItems);
		if(this.$.drop_down.items.length > 0){
			this.$.drop_down.selected = 0;
//			this.$.list.controlsToRow(this.$.drop_down.selected);
//			this.$.scroller.scrollIntoView(this.$.item.getBounds().top, 0);
			this.$.drop_down.openAtEvent(inEvent);
			this.$.drop_down.render();
		}
		this.$.textField.forceFocus();		
		return false;
	},
	key_down : function(inSender, inEvent){		
		switch(inEvent.keyCode){
		case 13:
			if (this.$.drop_down.isOpen && this.$.drop_down.selected > -1 && this.$.drop_down.selected != null) {
				this.itemSelectedPopupAux=-1;
				this.on_acept();
//				this.$.drop_down.close();
//				this.$.drop_down.selected = -1;
			}else{
				this.doEnter();
			}
			break;
		case 17: //ctrl
			this.itemsSelected[this.$.drop_down.selected]= !(this.itemsSelected[this.$.drop_down.selected]);
			this.$.drop_down.render();
			return true;
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
				}else{
					this.$.drop_down.selected = 0;
				}
				this.$.drop_down.render();
				this.$.list.controlsToRow(this.$.drop_down.selected);
				this.$.scroller.scrollIntoView(this.$.item.getBounds().top, 0);
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
				}else{
					this.$.drop_down.selected = this.$.drop_down.items.length - 1;
				}
				this.$.drop_down.render();
				this.$.list.controlsToRow(this.$.drop_down.selected);
				this.$.scroller.scrollIntoView(this.$.item.getBounds().top, 0);
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
		case (x==17): // ctrl
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
			this.$.drop_down.selected = 0;
			this.$.drop_down.setItems(arrAux);
			this.$.drop_down.render();
			this.$.drop_down.openAroundControl(this.$.textField, "", "left");
			this.$.list.controlsToRow(this.$.drop_down.selected);
			this.$.scroller.scrollIntoView(this.$.item.getBounds().top, 0);			
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
		this.$.drop_down.selected = -1;
	}
});