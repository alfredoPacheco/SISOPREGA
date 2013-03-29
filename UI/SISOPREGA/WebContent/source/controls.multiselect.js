enyo.kind({
	name : "controls.multiselect",
	kind : enyo.Control,
	navigatingOnList:false,
	layoutKind : enyo.HFlexLayout,
	allItems : [],	
	sColorHighlighted:"teal",
	sColorNormal:"black",
	published : {
		hint : "",
		value : -1,//normally an object id
		items : [],//items to be contained in the control, for on hold button
		filter: [],//sub items, for click button
		highLighted:true,
		filterCriteria:{} //object with fields for filter the array: this.filter
	},
	itemsSelected:[], //elements with true for every checked item by drop_down items index
	events:{
		"onSelectItem":"",
		"onEnter":""
	},
	getText : function(){
		return this.$.textField.getValue();
	},
	//setText: use carefully, use when index is not important,
	//         should not be used functions like: getValueByCaption TODO: revisar nombres de funciones
	setText: function(str){ 
		this.$.textField.setValue(str);
	},
	setFocus:	function(){
		this.$.textField.forceFocus();
	},
	highLightedChanged : function(inOldValue){
		if(this.highLighted){
			this.$.textField.$.input.applyStyle("color", this.sColorHighlighted);
		}else{
			this.$.textField.$.input.applyStyle("color", this.sColorNormal);
		}
	},
	hintChanged : function(inOldValue) {
		this.$.textField.setHint(this.getHint());
	},
	valueChanged : function(inOldValue) {
		if(this.items.length > 0){
			if(this.getValue()>-1){
				this.$.textField.setValue(this.getCaptionByValue(this.getValue()));
				this.setHighLighted(false);
			}else{
				this.$.textField.setValue("");	
			}
		}else{
			this.clear();
		}
		this.doSelectItem();
	},
	itemsChanged : function(inOldValue) {
		this.clear();
		this.$.drop_down.close();
		this.$.drop_down.setItems(this.getItems());
		this.allItems = this.getItems();
		this.filter = this.allItems;
	},
	create : function() {
		this.inherited(arguments);
		this.hintChanged();
		this.highLightedChanged();
	},
	components : [ 
	{kind: "Popup", name:"drop_down",
		layoutKind : enyo.VFlexLayout,
		items:[],
		width: "300px",height:"300px",
		setItems:function(items, filter){
			var newItems=[];
			var addItem = false;
			for(fieldFilter in filter){
				for (var j =0;j<items.length;j++){
					for(fieldItems in items[i]){
						if(fieldFilter == fieldItems){
							if(filter[fieldFilter] != items[i][fieldItems]){
								addItem = false;
							}
						}
					}
					if(addItem) newItems.push(items[j]);
				}
			}
			if(!filter){
				newItems = items;
			}
			this.items = newItems;			
		},
		selected:-1, //index selected in drop_down items
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
//					              {kind : "Divider"},
					              {kind: "CheckBox", name:"check_box"},
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
				onclick : "on_accept"
			}, {
				kind : "enyo.IconButton",
				flex : 1,
				label : "Cancelar",
				onclick : "on_cancel"
			}]
		}],
		select_item : function(inSender, inSelected) { //TODO see is it is possible to move this function below
			this.setValue(inSender.items[inSelected].value);
			this.$.textField.forceFocus();
		},		
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
		onclick : "click_button",
		onmousehold: "hold_button"
	} 
	],
	//on_accept function that select multiple elements in drop_down items
	on_accept:function(){ //TODO manage index as well
		var strValue = "";
		for (var i = 0;i<this.itemsSelected.length;i++){
			if(this.itemsSelected[i]){
				strValue += this.$.drop_down.items[i].caption + ", ";
			}			
		}
		if(strValue != ""){
			strValue = strValue.slice(0, -2);
		}
		this.$.textField.setValue(strValue);
		this.setHighLighted(false);
		this.$.drop_down.close();
	},
	on_cancel:function(){
		this.$.drop_down.close();
	},
	setupItem : function(inSender, inIndex){
		if(this.$.drop_down.selected == inIndex){
			inSender.$.client.$.client.applyStyle("background-color","white");
		}
		inSender.controls[1].controls[0].setChecked(this.itemsSelected[inIndex]);
		var objRan;
		if (objRan = this.$.drop_down.items[inIndex]) {
//			this.setupDivider(inIndex);
			this.$.caption.setContent(objRan.caption);
			return true;
		}
	},
	//TODO to be able to setup dividers:****************************************************
//	getGroupName : function(inIndex) {
//		try {
//			// get previous record
//			var r0 = this.items[inIndex - 1];
//			// get (and memoized) first letter of last name
//			if (r0) {
//				r0.letter = r0.sortStr.substr(0, 1).toUpperCase();
//			}
//			var a = r0 && r0.letter;
//			// get record
//			var r1 = this.items[inIndex];
//			r1.letter = r1.sortStr.substr(0, 1).toUpperCase();
//			var b = r1.letter;
//			// new group if first letter of last name has changed
//			return a != b ? b : null;
//		} catch (e) {
//			return null;
//		};
//	},
//	setupDivider : function(inIndex) {
//		// use group divider at group transition, otherwise use item border for
//		// divider
//		var group = this.getGroupName(inIndex);
//		this.$.divider.setCaption(group);
//		this.$.divider.canGenerate = Boolean(group);
//	},
//******************************************************************************************	
	
	
	
//	lostFocus : function(inSender, inEvent) {
////		if (!this.navigatingOnList && this.$.drop_down.isOpen && this.$.drop_down.selected > -1 && this.$.drop_down.selected != null) {
////			this.setValue(this.$.drop_down.items[this.$.drop_down.selected].value);
////			this.$.drop_down.close();
////		}		
//	},
	select_item : function(inSender, inEvent) {		
		this.itemsSelected[inEvent.rowIndex]=this.$.item.controls[0].getChecked();
		this.$.drop_down.selected = inEvent.rowIndex;
		this.$.drop_down.render(); //TODO see if it is possible to render only the actual row
		this.$.textField.forceFocus();
	},
	click_button : function(inSender, inEvent) {
		if(this.$.drop_down.isOpen)this.$.drop_down.close();
		this.itemsSelected=[];
		this.$.drop_down.setItems(this.filter);
		if(this.$.drop_down.items.length > 0){
			this.$.drop_down.selected = 0;
			//TODO is this code used?:
//			this.$.list.controlsToRow(this.$.drop_down.selected);
//			this.$.scroller.scrollIntoView(this.$.item.getBounds().top, 0);
			this.$.drop_down.openAtEvent(inEvent);
			this.$.drop_down.render();
		}
		this.$.textField.forceFocus();		
		return false;
	},
	hold_button : function(inSender, inEvent) {
		inEvent.stopPropagation();
		this.itemsSelected=[];
		if(this.$.drop_down.isOpen)this.$.drop_down.close();
		this.$.drop_down.setItems(this.allItems);
		if(this.$.drop_down.items.length > 0){
			this.$.drop_down.selected = 0;
			this.$.drop_down.openAtEvent(inEvent);
			this.$.drop_down.render();
		}
		this.$.textField.forceFocus();		
		return true;
	},
	key_down : function(inSender, inEvent){		
		switch(inEvent.keyCode){
		case 13:
			if (this.$.drop_down.isOpen && this.$.drop_down.selected > -1 && this.$.drop_down.selected != null) {
				this.on_accept();
			}else{
				this.doEnter();
			}
			break;
		case 17: //ctrl 		this key checks or unchecks the selected element in drop_down
			this.itemsSelected[this.$.drop_down.selected]= !(this.itemsSelected[this.$.drop_down.selected]);
			this.$.drop_down.render(); //TODO see if it is possible to render only the actual row
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
		}else{
			if(this.$.drop_down.items.length >0){
				if(this.$.drop_down.selected < this.$.drop_down.items.length - 1){
					this.$.drop_down.selected ++;
				}else{
					this.$.drop_down.selected = 0;
				}
				this.setValue(this.$.drop_down.items[this.$.drop_down.selected].value);
			}
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
		}else{
			if(this.$.drop_down.items.length >0){
				if(this.$.drop_down.selected > 0){
					this.$.drop_down.selected --;
				}else{
					this.$.drop_down.selected = this.$.drop_down.items.length - 1;
				}
				this.setValue(this.$.drop_down.items[this.$.drop_down.selected].value);
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
		case (x==27): // esc
			this.$.drop_down.close();
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

		this.value = -1;
		this.$.drop_down.selected = -1;
		this.setHighLighted(true);
		this.itemsSelected=[];
		
		value = inSender.value;
		arrAux = this.findItem(value);
		if (arrAux.length > 0) {		
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
			var items = this.getItems(); //see if it should be this.allItems instead this.getItems
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
	getCaptionByValue:function(value){
		for(i in this.allItems){
			if(this.allItems[i].value==value){
				return this.allItems[i].caption;
			}
		}
	},
	getValueByCaption:function(caption){
		for(i in this.allItems){
			if(this.allItems[i].caption==caption){
				return this.allItems[i].value;
			}
		}
	},
	getValueByIndex:function(index){
		if(this.allItems.length > 0){
			return this.allItems[index].value;
		}
	},
	clear:function(){
		this.$.textField.setValue("");
		this.value = -1;
		this.$.drop_down.selected = -1;
		this.setHighLighted(true);
		this.itemsSelected=[];
	}
});