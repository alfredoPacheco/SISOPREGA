enyo
	.kind(
	{
	  name : "forms.masterDetail",
	  kind : "forms.simple",
	  objMaster : {},
	  arrDetail : [],
	  detailNumber : 0,
	  openOnce : false,
	  iSelected : -1,
	  style : "background-color:#DABD8B;font-size:15px;",
	  events :
	  {
		onAdd : "",
		onUpdate : "",
		onCancel : "",
		onAfterLoad : ""
	  },
	  components : [
		  {
			kind : enyo.VFlexBox,
			style : "padding:20px 60px;",
			pack : "center",
			name : "masterFields"
		  },
		  {
			kind : "HFlexBox",
			className : "listFirst",
			style : "padding-left:50px;",
			align : "center",
			pack : "start",
			components : [
				{
				  kind : "HFlexBox",
				  align : "center",
				  pack : "start",
				  name : "detailFields"
				},
				{
				  layoutKind : "HFlexLayout",
				  width : "140px;",
				  components : [
					  {
						kind : "Drawer",
						name : "drawAddDetail",
						animate : false,
						components : [
						{
						  layoutKind : "HFlexLayout",
						  align : "center",
						  flex : 1,
						  components : [
							  {
								content : '<button type="button" style="border: 0;background-color: transparent;margin: 0px;padding: 0px;color: #292929;font-size: 16px;">Add</button>',
								allowHtml : true,
								onclick : "addDetailItem",
								onmousedown : "buttonDown",
								onmouseup : "buttonUp",
								onmouseout : "buttonUp",
								onmouseover : "buttonDown",
								className : "enyo-button",
								style : "padding: 2px;margin-top: 0px;background-color: #DABD8B;margin-left:1px;height: 24px;"
							  }, ]
						} ]
					  },
					  {
						kind : "Drawer",
						name : "drawUpdateDetail",
						animate : false,
						open : false,
						components : [
						{
						  layoutKind : "HFlexLayout",
						  align : "center",
						  flex : 1,
						  components : [
						  {
							kind : "enyo.IconButton",
							name : "btnUpdateCorte",
							icon : "../SISOPREGA_WEB_LIB/images/btn_edit.png",
							// flex : 1,
							onclick : "updateDetailItem",
							style : "margin-top: 0px;"
						  },
						  {
							kind : "Button",
							name : "btnCancelUpdateCorte",
							className : "enyo-button-negative",
							flex : 1,
							caption : "Cancel",
							onclick : "cancel_updateDetailItem",
							style : "margin-top: 0px;"
						  } ]
						} ]
					  } ]
				}
			// {
			// content : '<button type="button" style="border:
			// 0;background-color: transparent;margin: 0px;padding: 0px;color:
			// #292929;font-size: 16px;">Add</button>',
			// allowHtml : true,
			// onclick : "addDetailItem",
			// onmousedown : "buttonDown",
			// onmouseup : "buttonUp",
			// onmouseout : "buttonUp",
			// onmouseover : "buttonDown",
			// className : "enyo-button",
			// style : "background-color: #DABD8B;"
			// }
			]
		  },
		  {// HEADER:
			kind : "HFlexBox",
			className : "listFirst",
			style : "font-size:13px;background-color:#DABD8B;border-bottom-style: solid;border-bottom-color: #482400;",
			height : "30px",
			align : "center",
			pack : "start",
			name : "detailHeader",
			components : [
			{// For detail_number
			  style : "width:62px;margin-left:30px",
			}, ]
		  },
		  {
			kind : enyo.Scroller,
			name : "detailScroller",
			flex : 1,
			style : "background-color: #482400;",
			autoHorizontal : false,
			horizontal : false,
			components : [
			{
			  kind : enyo.VirtualRepeater,
			  name : "list",
			  onSetupRow : "setupRow",
			  onclick : "on_select_item",
			  components : [
			  {
				kind : enyo.SwipeableItem,
				layoutKind : enyo.HFlexLayout,
				align : "center",
				pack : "start",
				height : "40px",
				className : "listBG",
				onConfirm : "delDetailItem",
				name : "detailItem",
				style : "padding:0px;",
				components : [
				{
				  name : 'detail_number',
				  className : "listSecond",
				  style : "width:62px;margin-left:30px;color:#5F0712",
				} ]
			  } ]
			} ]
		  },
		  {
			kind : enyo.VFlexBox,
			style : "padding:20px;border-top-style: solid;border-top-color:#482400",
			pack : "center",
			components : [
			{
			  kind : enyo.HFlexBox,
			  align : "center",
			  height : "40px;",
			  style : "font-size:14px;",
			  components : [
			  {
				kind : enyo.Spacer
			  },
			  {
				kind : enyo.Button,
				caption : "Save",
				onclick : "save",
				style : "background-color: #DABD8B;",
				name : "saveButton"
			  },
			  {
				kind : enyo.Button,
				caption : "Cancel",
				onclick : "cancel",
				style : "background-color: #DABD8B;"
			  } ]
			} ]
		  } ],
	  ready : function() {
		if (!this.openOnce) {
		  var dataFields = this.$.detailFields.children;
		  var count = 0;
		  for ( var i = 0; i < dataFields.length; i++) {
			if (dataFields[i].hasOwnProperty("bindTo")) {
			  var sStyle = "";
			  sStyle += "margin-left:15px;";
			  sStyle += "min-width:" + dataFields[i].width;
			  sStyle += "text-align:" + dataFields[i].textAlign || "left";
			  this.$.detailHeader.createComponent(
			  {
				content : dataFields[i].hint,
				style : sStyle,
				onclick : "on_sort",
				sortDirection : "DESC",
				sortType : dataFields[i].sortType,
				sortColumn : i
			  },
			  {
				owner : this
			  });

			  this.$.detailItem.createComponent(
			  {
				name : "detailItem" + count++,
				className : "listSecond",
				style : sStyle,
				bindTo : dataFields[i].bindTo,
				belongsTo : dataFields[i].belongsTo
			  },
			  {
				owner : this
			  });
			} else if (dataFields[i].hasOwnProperty("calculated")) {
			  var sStyle = "";
			  sStyle += "margin-left:15px;";
			  sStyle += "min-width:" + dataFields[i].width;
			  sStyle += "text-align:" + dataFields[i].textAlign || "left";
			  this.$.detailHeader.createComponent(
			  {
				content : dataFields[i].hint,
				style : sStyle,
			  },
			  {
				owner : this
			  });

			  this.$.detailItem.createComponent(
			  {
				name : "detailItem" + count++,
				className : "listSecond",
				style : sStyle,
				calculated : dataFields[i].calculated
			  },
			  {
				owner : this
			  });

			}
		  }
		  this.openOnce = true;
		}
	  },
	  resetValues : function() {
		this.inherited(arguments);
		this.arrDetail = [];
		this.iSelected = -1;
		this.updateList();
		this.toggleAddDetail();
	  },
	  buttonDown : function(inSender, inEvent) {
		if (inEvent.which) {
		  inSender.setClassName("enyo-button enyo-button-hot enyo-button-down");
		}
	  },
	  buttonUp : function(inSender, inEvent) {
		inSender.setClassName("enyo-button");
	  },
	  validateAdd : function() { // function to override if necessary validate
		// the item to be added.
		return true;
	  },
	  addDetailItem : function() {
		if (this.validateAdd()) {
		  var newObject =
		  {
			fields : {}
		  };

		  var detailFields = this.$.detailFields.children;
		  for ( var i = detailFields.length - 1; i >= 0; i--) {
			if (detailFields[i].hasOwnProperty("bindTo")
				|| detailFields[i].hasOwnProperty("calculated")) {
			  newObject.fields[i] = detailFields[i].getValue();
			  newObject[detailFields[i].bindTo] = this
				  .getValueFromControl(detailFields[i]);
			  if (detailFields[i].kind == 'controls.autocomplete')
				this.setValueForControl(detailFields[i], -1);
			  else
				this.setValueForControl(detailFields[i], '');
			}
		  }

		  detailFields[0].setFocus();

		  this.arrDetail.push(newObject);
		  this.updateList();
		  this.$.detailScroller.scrollTo(
			  this.$.detailScroller.getBoundaries().bottom, 0);
		}
	  },
	  getEntity : function() {
		var objEntity = this.inherited(arguments);
		var detail = [];

		for ( var i = 0; i < this.arrDetail.length; i++) {
		  var objItem = enyo.clone(this.arrDetail[i]);
		  delete objItem.fields;
		  detail.push(objItem);
		}
		objEntity[this.$.detailFields.children[0].belongsTo] = detail;
		return objEntity;
	  },
	  onDeleteItem : function() {

	  },
	  delDetailItem : function(inSender, inIndex) {
		this.arrDetail.splice(inIndex, 1);
		this.onDeleteItem();
		this.updateList();
	  },
	  setupRow : function(inSender, inIndex) {
		if (objItem = this.arrDetail[inIndex]) {
		  this.$.detail_number.setContent(inIndex + 1);
		  var i = 0;
		  for ( var field in objItem.fields) {
			if (objItem.fields.hasOwnProperty(field)) {
			  if (this.$["detailItem" + i] !== undefined) {
				this.$["detailItem" + i].content = objItem.fields[field];
				i++;
			  }
			}
		  }
		  if (this.iSelected == inIndex) {
			this.$.detailItem.applyStyle("background-color", "wheat");
		  } else {
			this.$.detailItem.applyStyle("background-color", null);
		  }
		  return true;
		}
	  },
	  afterUpdate : function() {
		this.updateList();
	  },
	  afterAddEntity : function() {
		this.arrDetail = [];
		this.updateList();
		this.inherited(arguments);
	  },
	  updateList : function() {
		this.$.list.render();
	  },
	  save : function() {
		var mode = this.$.saveButton.getCaption();
		if (mode == "Save" || mode == "Create") {
		  this.addEntity();
		} else {
		  this.updateEntity();
		}
	  },
	  validateEdit : function() { // function to override if necessary validate
		// the item to be edited.
		return true;
	  },
	  updateDetailItem : function() {
		if (this.validateEdit()) {
		  var editedObject = this.arrDetail[this.iSelected];

		  var detailFields = this.$.detailFields.children;
		  for ( var i = detailFields.length - 1; i >= 0; i--) {
			if (detailFields[i].hasOwnProperty("bindTo")
				|| detailFields[i].hasOwnProperty("calculated")) {
			  editedObject.fields[i] = detailFields[i].getValue();
			  editedObject[detailFields[i].bindTo] = this
				  .getValueFromControl(detailFields[i]);
			  if (detailFields[i].kind == 'controls.autocomplete')
				this.setValueForControl(detailFields[i], -1);
			  else
				this.setValueForControl(detailFields[i], '');
			}
		  }

		  detailFields[0].setFocus();
		  this.arrDetail[this.iSelected] = editedObject;
		  this.iSelected = -1;
		  this.updateList();
		  this.toggleAddDetail();
		}
	  },
	  cancel_updateDetailItem : function() {
		this.toggleAddDetail();
		this.iSelected = -1;
	  },
	  on_select_item : function(inSender, inEvent) {
		if (inEvent.rowIndex !== undefined) {
		  this.iSelected = inEvent.rowIndex;
		  var objSelected = this.arrDetail[this.iSelected];

		  var detailFields = this.$.detailFields.children;
		  for ( var i = 0; i < detailFields.length; i++) {
			if (detailFields[i].hasOwnProperty("bindTo")
				|| detailFields[i].hasOwnProperty("calculated")) {
			  if (detailFields[i].kind == 'controls.autocomplete')
				this.setValueForControl(detailFields[i],
					objSelected[detailFields[i]["bindTo"]]);
			  else
				this.setValueForControl(detailFields[i], objSelected.fields[i]);
			}
		  }

		  this.$.list.render();
		  this.toggleUpdateDetail();
		  detailFields[0].setFocus();

		}
	  },
	  toggleAddDetail : function() {
		this.$.drawUpdateDetail.setOpen(false);
		this.$.drawAddDetail.setOpen(true);
	  },
	  toggleUpdateDetail : function() {
		this.$.drawUpdateDetail.setOpen(true);
		this.$.drawAddDetail.setOpen(false);
	  },
	  on_sort : function(inSender) {
		switch (inSender.sortType) {
		case "Text":
		  if (inSender.sortDirection == "ASC") {
			inSender.sortDirection = "DESC";
			this.arrDetail.sort(function(a, b) {
			  var x = a.fields[inSender.sortColumn];
			  var y = b.fields[inSender.sortColumn];
			  return ((x < y) ? 1 : ((x > y) ? -1 : 0));
			});
		  } else {
			inSender.sortDirection = "ASC";
			this.arrDetail.sort(function(a, b) {
			  var x = a.fields[inSender.sortColumn];
			  var y = b.fields[inSender.sortColumn];
			  return ((x < y) ? -1 : ((x > y) ? 1 : 0));
			});
		  }
		  break;
		case "Number":
		  if (inSender.sortDirection == "ASC") {
			inSender.sortDirection = "DESC";
			this.arrDetail.sort(function(a, b) {
			  return utils.parseToNumber(b.fields[inSender.sortColumn])
				  - utils.parseToNumber(a.fields[inSender.sortColumn]);
			});
		  } else {
			inSender.sortDirection = "ASC";
			this.arrDetail.sort(function(a, b) {
			  return utils.parseToNumber(a.fields[inSender.sortColumn])
				  - utils.parseToNumber(b.fields[inSender.sortColumn]);
			});
		  }
		  break;
		}
		this.$.list.render();
	  },
	});