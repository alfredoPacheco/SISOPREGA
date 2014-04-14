enyo.kind(
{
  name : "controls.numberBox",
  kind : "Control",
  // flex:null,
  layoutKind : enyo.HFlexLayout,
  sColorWithOutIndex : "teal",
  sColorWithIndex : "black",
  published :
  {
	hint : "",
	highLighted : false,
	width : null,
	height : "25px",
	inputKind : "Input",
	bindTo : null,
	fontColor : "black"
  },
  events :
  {
	// "onSelectItem" : "",
	"onEnter" : "",
	onInput : ""
  },
  getValue : function() {
	return this.$.textField.getValue();
  },
  setValue : function(value) {
	this.$.textField.setValue(value);
  },
  setFocus : function() {
	this.$.textField.forceFocus();
  },
  widthChanged : function(inOldValue) {
	this.$.HFBoxContainer.applyStyle("width", this.getWidth());
  },
  heightChanged : function(inOldValue) {
	this.$.HFBoxContainer.applyStyle("height", this.getHeight());
	// this.$.btnIcon.applyStyle("height",this.getHeight());
  },
  highLightedChanged : function(inOldValue) {
	if (this.highLighted) {
	  this.$.textField.$.input.applyStyle("color", this.sColorWithOutIndex);
	} else {
	  this.$.textField.$.input.applyStyle("color", this.sColorWithIndex);
	}
  },
  hintChanged : function(inOldValue) {
	this.$.textField.setHint(this.getHint());
  },
  create : function() {
	this.inherited(arguments);
	this.createComponent(
	{
	  kind : enyo.HFlexBox,
	  name : "HFBoxContainer",
	  flex : 1,
	  components : [
	  {
		kind : this.inputKind,
		name : "textField",
		hint : "",
		flex : 1,
		oninput : "on_input",
		onfocus : "on_focus",
		onblur : "on_lost_focus"
	  } ]
	});

	this.hintChanged();
	this.highLightedChanged();
	this.heightChanged();
	this.widthChanged();
	this.on_lost_focus();
  },
  on_lost_focus : function(inSender, inEvent) {
	this.$.textField.$.input.applyStyle("color", this.getFontColor());
  },
  on_focus : function() {
	this.$.textField.$.input.applyStyle("color", "black");
  },
  clear : function() {
	this.$.textField.setValue("");
	this.setHighLighted(false);
  },
  on_input : function(inSender, inEvent, keyPressed) {
	var x = keyPressed.charCodeAt(keyPressed.length - 1);
	if (!isNaN(x)) {
	  switch (true) {
	  case (x == 8): // backspace
	  case (x >= 46 && x <= 57): // numbers
		this.doInput(inSender, inEvent, keyPressed);
		return;
	  }
	}else{
	  this.doInput(inSender, inEvent, keyPressed);
	}

	inSender.setValue(inSender.value.slice(0, -1));

  }
});
