enyo
	.kind(
	{
	  kind : "HFlexBox",
	  name : "release.rejects.weight",
	  events :
	  {
		onSelected : "",
		onSaved : ""
	  },
	  rejectedRecord : 0,
	  cancelSelection : false,
	  listIndex : 0,
	  components : [
		  {
			kind : "controls.numberBox",
			inputKind : "ToolInput",
			name : "weightInput",
			height : "35px",
			hint : '',
			width : "40px",
			style : "text-align:right;"
		  },
		  {
			kind : "IconButton",
			style : "padding:0px;height:0px;margin-top:10px;border:0px;background-color:#482400;",
			name : "weightButton",
			icon : "images/save.png",
			onclick : "saveRejectedWeight"
		  },
		  {
			kind : "CheckBox",
			name : "checkBoxSelected",
			onclick : "cancelCheckBoxEvent",
			style : "margin-left:50px;margin-top: 1px;"
		  } ],
	  saveRejectedWeight : function() {

		cacheMan.showScrim();

		var receptionQuery =
		{
		  id : this.rejectedRecord
		};

		consumingGateway.Read('Reception', receptionQuery, this,
			'readReceptionCallBack');
	  },
	  readReceptionCallBack : function(result) {
		if (result.exceptionId == 0) {
		  var reception = crudReception.adapterToIn(result.records[0]);
		  reception.Inspection[0].weight = this.$.weightInput.getValue();
		  crudReception.update(reception, this, 'saveCallBack');
		} else {
		  cacheMan.hideScrim();
		  cacheMan.setMessage("",
			  'Unable to read the reject inspection record. '
				  + result.exceptionDescription);
		}
	  },
	  saveCallBack : function(result) {
		if (result.exceptionId == 0) {
		  this.doSaved(this.rejectedRecord, this.$.weightInput.getValue());
		  cacheMan.hideScrim();
		  alert("Reject's weight has been successfully saved on the database.");
		} else {
		  cacheMan.hideScrim();
		  cacheMan.setMessage("",
			  "Unable to update the reject's weight on the database. "
				  + result.exceptionDescription);
		}
	  },
	  setRejectedRecord : function(recordId) {
		this.rejectedRecord = recordId;
	  },
	  hideEditors : function(){
		this.$.weightInput.applyStyle('visibility', 'hidden');
		this.$.weightButton.applyStyle('visibility', 'hidden');
	  },
	  setWeight : function(weight) {
		this.$.weightInput.setValue(weight);
	  },
	  setSelected : function(isSelected) {
		this.$.checkBoxSelected.setChecked(isSelected);
	  },
	  isSelected : function() {
		return this.$.checkBoxSelected.getChecked();
	  },
	  cancelCheckBox : function() {
		if (this.cancelSelection)
		  this.$.checkBoxSelected.setChecked(!this.$.checkBoxSelected
			  .getChecked());
	  },
	  cancelCheckBoxEvent : function(inSender, inEvent) {
		this.doSelected(inEvent);
	  },
	  ready : function() {
		this.$.weightInput.$.textField.$.input
			.applyStyle("text-align", "right");
	  }
	});