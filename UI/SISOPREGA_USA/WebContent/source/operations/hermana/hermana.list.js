enyo.kind(
  {
    name : "hermana.list",
    kind : "forms.list",
    events :
      {
        onSelected : ''
      },
    ready : function() {
      this.inherited(arguments);
      this.$.iconButton.hide();
    },
    selectItem : function(inSender, inEvent) {
      if (this.arrList[inEvent.rowIndex]) {
        this.doSelected(this.arrList[inEvent.rowIndex]);
      }
    },
  });