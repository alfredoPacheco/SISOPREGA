enyo.kind(
  {
    kind : "HFlexBox",
    name : "release.rejects.weight",
    events:{onSelected:"", onSaved:""},
    rejectedRecord:0,
    cancelSelection:false,
    listIndex : 0,
    components :
      [{
	    kind : "controls.numberBox",
	    inputKind:"ToolInput",
	    name : "weightInput",
	    height:"35px",
	    hint : '',
	    width:"40px",
	    onclick:"cancelCheckBox",
	    style:"text-align:right;"
	},
        {
          kind : "IconButton",
          style:"padding:0px;height:0px;margin-top:10px;border:0px;background-color:#482400;",
          name : "weightButton",
          icon : "images/save.png",
          onclick: "saveRejectedWeight"
        },
        {
          kind : "CheckBox",
          name : "checkBoxSelected",
          onChange : "cancelCheckBoxEvent",
          style:"margin-left:50px;margin-top: 1px;"
        } ],
        saveRejectedWeight : function(){
          // TODO: Save using web service.
          releasesCache.updateRejectsWeight(this.rejectedRecord, this.$.weightInput.value);
          cacheMan.setMessage("",'El registro de peso de rechazos ha sido grabado exitosamente.');
          this.cancelCheckBox();
          this.doSaved();
        },
        setRejectedRecord : function(recordId){
          this.rejectedRecord = recordId;
        },
        setWeight : function(weight){
          this.$.weightInput.setValue(weight);
        },
        setSelected : function(isSelected){
          this.$.checkBoxSelected.setChecked(isSelected);
          this.doSelected();
        },
        isSelected : function(){
          return this.$.checkBoxSelected.getChecked();
        },
        cancelCheckBox : function(){
          if(this.cancelSelection)
            this.$.checkBoxSelected.setChecked(!this.$.checkBoxSelected.getChecked());
        },
        cancelCheckBoxEvent : function(){
          this.cancelCheckBox();
          this.doSelected();
        },
        ready:function(){
            this.$.weightInput.$.textField.$.input.applyStyle("text-align","right");
        }
  });