enyo.kind({
    name : "catalogs.carrier.list",
    kind : enyo.VFlexBox,
    iSelected : null,
    arrList : [],
    allItems : [],
    components : [ {
	kind : enyo.Popup,
	name : "popupEdit",
	width : "80%;",
	height : "80%;",
	dismissWithClick : false,
	layoutKind : "VFlexLayout",
	style : "overflow: hidden;border-width: 8px;",
	scrim : true,
	components : [ {
	    kind : "catalogs.carrier.form",
	    name : "carrierFormKind",
	    lazy : "true",
	    onAdd : "on_add",
	    onUpdate : "on_upd",
	    onCancel : "on_cancel",
	    flex : 1
	} ]
    }, {
	kind : enyo.Popup,
	name : "popupContacts",
	width : "80%",
	height : "80%",
	dismissWithClick : false,
	layoutKind : "VFlexLayout",
	style : "overflow: hidden;	border-width: 8px;",
	scrim : true,
	components : [ {
	    kind : "catalogs.carrier.contacts",
	    name : "driversContacts_kind",
	    lazy : "true",
	    flex : 1,
	    onOk : "on_ok_contacts"
	} ]
    }, {
	kind : enyo.Scroller,
	flex : 1,
	className : "listBG",
	name : "scroller",
	components : [ {
	    kind : enyo.VirtualRepeater,
	    name : "list",
	    onSetupRow : "setupProductRow",
	    onclick : "selectItem",
	    components : [ {
		kind : "Divider"
	    }, {
		kind : enyo.SwipeableItem,
		onConfirm : "deleteItem",
		tapHighlight : true,
		layoutKind : "HFlexLayout",
		height:"60px",
		components : [ {
		    kind : enyo.VFlexBox,
		    components : [ {
			name : "importantInfo",
			className : "listFirst",
			content : ""
		    }, {
			name : "secundaryInfo",
			className : "listSecond",
			content : ""
		    }, ]
		}, {
		    kind : "Spacer"
		}, {
		    kind : enyo.HFlexBox,
		    components : [ {
			kind : enyo.Button,
			name : "edit_button",
			onclick : "edit_click",
			caption : "Edit",
			showing : false,
			style : "min-width:95px;"

		    }, {
			kind : enyo.Button,
			name : "contacts_button",
			onclick : "contacts_click",
			caption : "Contacts",
			showing : false,
			style : "min-width:95px;"

		    } ]
		}

		]
	    } ]
	} ]
    }, {
	kind : "Toolbar",
	height : '100px;',
	components : [ {
	    kind : enyo.VFlexBox,
	    flex : 1,
	    components : [ {
		kind : enyo.HFlexBox,
		align : "center",
		components : [ {
		    kind : "ToolInput",
		    name : "filter",
		    align : "left",
		    onkeyup : "key_up",
		    flex : 1,
		    hint : "Filter",
		    changeOnInput : true
		}, {
		    kind : "Button",
		    name : "btnClearFilter",
		    className : "enyo-button-negative",
		    caption : "Clear Filter",
		    onclick : "clearFilter",
		    width : "115px;"
		} ]
	    }, {
		kind : enyo.HFlexBox,
		components : [ {
		    kind : "enyo.IconButton",
		    style : "",
		    label : "New",
		    onclick : "add_click"
		} ]
	    }

	    ]
	}

	]
    }, ],
    selectItem : function(inSender, inEvent) {
	if (this.arrList[inEvent.rowIndex]) {
	    this.iSelected = inEvent.rowIndex;
	    this.updateList();
	}
    },
    getSelected : function() {
	return this.arrList[this.iSelected];
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
    updateList : function() {
	this.arrList = this.arrList.sort(function(a, b) {
	    return (a.importantInfo < b.importantInfo) ? -1 : 1;
	});
	this.$.list.render();
	this.$.scroller.scrollIntoView();
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
	this.iSelected = null;
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
    ready : function() {
	this.updateView();
    },
    updateView : function() {
	crudCarrier.get(this, "readCallBack");
    },
    readCounter : 0,
    readCallBack : function() {
	this.readCounter++;
	if (this.readCounter == 1) {
	    this.readCounter = 0;
	    this.afterRetrieveData();
	}
    },
    afterRetrieveData : function() {
	this.$.filter.setValue("");
	this.arrList = crudCarrier.getCatalogsList();
	this.updateList();
    },
    setupProductRow : function(inSender, inIndex) {
	var objItem;
	if (objItem = this.arrList[inIndex]) {
	    this.setupDivider(inIndex);
	    this.$.importantInfo.setContent(objItem.importantInfo);
	    this.$.secundaryInfo.setContent(objItem.secundaryInfo);
	    if (this.iSelected == inIndex) {
		this.$.contacts_button.show();
		this.$.edit_button.show();
	    } else {
		this.$.contacts_button.hide();
		this.$.edit_button.hide();
	    }

	    return true;
	}
    },
    deleteItem : function(inSender, inIndex) {
	crudCarrier.remove(this.arrList[inIndex], this, "updateView");
    },
    add_click : function(inSender, inEvent) {
	// this.parent.selectViewByName("customersCreate_kind");
	this.$.popupEdit.validateComponents();
	this.$.carrierFormKind.toggleAdd();
	this.$.popupEdit.openAtCenter();
    },
    on_add : function() {
	this.$.popupEdit.close();
	this.updateView();
	cacheMan.hideScrim();
    },
    on_upd : function() {
	this.$.popupEdit.close();
	this.updateView();
	cacheMan.hideScrim();
    },
    on_cancel : function() {
	this.$.popupEdit.close();
    },
    contacts_click : function(inSender) {
	this.$.popupContacts.validateComponents();
	this.$.driversContacts_kind.setObj(this.arrList[this.iSelected]);
	this.$.popupContacts.openAtCenter();
    },
    edit_click : function() {
	this.$.popupEdit.validateComponents();
	this.$.carrierFormKind.setEntity(this.arrList[this.iSelected],true);
	this.$.popupEdit.openAtCenter();
    },
    on_ok_contacts : function() {
	this.$.popupContacts.close();
    }
});