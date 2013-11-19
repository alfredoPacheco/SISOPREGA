enyo
	.kind({
	    name : "catalogs.carrier.contacts",
	    kind : enyo.VFlexBox,
	    className : "formBG",
	    obj : {
		contacts : []
	    },
	    iSelected : null,
	    events : {
		onOk : ""
	    },
	    components : [
		    {
			kind : "HFlexBox",
			className : "listFirst",
			style : "background-color:#DABD8B;border-bottom-style:solid;border-bottom-color: #482400;"
				+ "border-bottom-width:5px;",
			align : "center",
			pack : "start",
			components : [
				{
				    kind : "ToolInput",
				    name : "contact",
				    hint : 'Contact',
				    flex : 1
				// style : "margin-right: 15px;"
				},
				{
				    kind : "ToolInput",
				    name : "phone",
				    hint : "Telephone",
				    width : "150px;",
				    onfocus : "applyMask"
				// style : "margin-right: 15px;"
				},
				{
				    layoutKind : "HFlexLayout",
				    width : "140px;",
				    components : [
					    {
						kind : "Drawer",
						name : "draAdd",
						animate : false,
						components : [ {
						    layoutKind : "HFlexLayout",
						    align : "center",
						    flex : 1,
						    components : [ {
							kind : "enyo.IconButton",
							name : "btnAdd",
							icon : "../SISOPREGA_WEB_LIB/images/menu-icon-new.png",
							onclick : "agregar_click",
							flex : 1
						    } ]
						} ]
					    },
					    {
						kind : "Drawer",
						name : "draUpdate",
						animate : false,
						components : [ {
						    layoutKind : "HFlexLayout",
						    align : "center",
						    flex : 1,
						    components : [
							    {
								kind : "enyo.IconButton",
								name : "btnUpdate",
								icon : "../SISOPREGA_WEB_LIB/images/btn_edit.png",
								// flex : 1,
								onclick : "update_click"
							    },
							    {
								kind : "Button",
								name : "btnCancel",
								className : "enyo-button-negative",
								flex : 1,
								caption : "Cancel",
								onclick : "cancel_click"
							    } ]
						} ]
					    } ]
				} ]
		    },
		    {
			kind : enyo.Scroller,
			name : "detailScroller",
			flex : 1,
			style : "background-color: #482400;",
			components : [ {
			    kind : enyo.VirtualRepeater,
			    name : "list",
			    onSetupRow : "setupRow",
			    onclick : "selectItem",
			    components : [ {
				kind : enyo.SwipeableItem,
				onConfirm : "deleteItem",
				layoutKind : enyo.HFlexLayout,
				align : "center",
				pack : "start",
				height : "40px",
				className : "listBG",
				name : "swipeable_item",
				components : [
					{
					    name : 'detail_contact',
					    className : "listSecond",
					    style : "margin-right:15px;margin-left:30px;",
					    flex : 1
					},
					{
					    name : 'detail_phone',
					    className : "listSecond",
					    style : "max-width: 115px;margin-right:15px;margin-left:23px;",
					} ]
			    } ]
			} ]
		    }, {
			layoutKind : "HFlexLayout",
			align : "center",
			components : [ {
			    kind : enyo.Spacer
			}, {
			    kind : "Button",
			    name : "ok_button",
			    className : "enyo-button-affirmative",
			    caption : "Close",
			    onclick : "ok_click",
			    width : "120px;"
			} ]
		    } ],
	    agregar_click : function() {
		var newContact = {
		    contactName : this.$.contact.getValue(),
		    phone : this.$.phone.getValue(),
		};
		if (newContact.contactName != "" && newContact.phone != "") {
		    this.resetValues();
		    if (!this.obj.CarrierContact) {
			this.obj.CarrierContact = [];
		    }
		    this.obj.CarrierContact.push(newContact);
		    crudCarrier.update(this.obj, this, "updateList");
		    this.$.detailScroller.scrollToBottom();
		} else
		    cacheMan.setMessage("", "Please check on data entry.");
	    },
	    deleteItem : function(inSender, inIndex) {
		this.obj.CarrierContact.splice(inIndex,1);
		crudCarrier.update(this.obj,this,"updateList");
		this.resetValues();
	    },
	    setupRow : function(inSender, inIndex) {
		if (this.obj.CarrierContact && this.obj.CarrierContact[inIndex]) {
		    this.$.detail_contact
			    .setContent(this.obj.CarrierContact[inIndex].contactName);
		    this.$.detail_phone
			    .setContent(this.obj.CarrierContact[inIndex].phone);
		    if (this.iSelected == inIndex) {
			this.$.swipeable_item.applyStyle("background-color",
				"wheat");
		    } else {
			this.$.swipeable_item.applyStyle("background-color",
				null);
		    }

		    return true;
		}
	    },
	    selectItem : function(inSender, inEvent) {
		if (this.obj.CarrierContact[inEvent.rowIndex]) {
		    this.iSelected = inEvent.rowIndex;
		    this.updateList();
		    this.toggleUpdate();
		    this.$.contact.setValue(this.obj.CarrierContact[this.iSelected].contactName);
		    this.$.phone.setValue(this.obj.CarrierContact[this.iSelected].phone);
		}
	    },	    
	    ready : function() {
		this.$.contact.setFocusClassName(null);
		this.$.phone.setFocusClassName(null);
		this.updateList();
		this.resetValues();
	    },
	    toggleAdd : function() {
		this.$.draUpdate.setOpen(false);
		this.$.draAdd.setOpen(true);
	    },
	    toggleUpdate : function() {
		this.$.draAdd.setOpen(false);
		this.$.draUpdate.setOpen(true);
	    },
	    update_click : function() {
		this.obj.CarrierContact[this.iSelected].contactName = this.$.contact
			.getValue();
		this.obj.CarrierContact[this.iSelected].phone = this.$.phone
			.getValue();
		crudCarrier.update(this.obj, this, "updateList");
		this.resetValues();
	    },
	    cancel_click : function() {
		this.resetValues();
		this.updateList();
	    },
	    resetValues : function() {
		this.$.contact.setValue("");
		this.$.phone.setValue("");
		this.iSelected = null;
		this.toggleAdd();
		this.$.contact.forceFocus();
	    },
	    updateList : function() {
		this.$.list.render();		
	    },
	    setObj : function(obj) {
		this.obj = obj;
		this.updateList();
	    },
	    ok_click : function() {
		this.doOk();
	    },
	    applyMask : function(inSender) {
		var _id = inSender.$.input.getId();
		jQuery(function(j) {
		    j(document.getElementById(_id)).mask('(999) 999-9999');
		});
	    }
	});