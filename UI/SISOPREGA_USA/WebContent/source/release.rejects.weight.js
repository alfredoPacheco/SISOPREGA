enyo.kind(
  {
    kind : "HFlexBox",
    name : "release.rejects.weight",
    events:{onSelected:"", onSaved:""},
    rejectedRecord:0,
    cancelSelection:false,
    listIndex : 0,
    components :
      [
        {
          kind : "Input",
          name : "weightInput",
          style : "width:80px;",
          onclick:"cancelCheckBox"
        },
        {
          kind : "IconButton",
          name : "weightButton",
          icon : "images/save.png",
          onclick: "saveRejectedWeight"
        },
        {
          kind : "CheckBox",
          name : "checkBoxSelected",
          onChange : "cancelCheckBoxEvent"
        } ],
        saveRejectedWeight : function(){
          // TODO: Save using web service.
          alert('El registro de peso de rechazos ha sido grabado exitosamente.');
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
        }
  });