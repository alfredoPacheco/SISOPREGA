enyo.kind({
    name : "controls.numberBox",
    kind : "Control",
    flex : 1,
    layoutKind : enyo.HFlexLayout,
    sColorWithOutIndex : "teal",
    sColorWithIndex : "black",
    published : {
	hint : "",
	highLighted : false,
	width : null,
	height : "25px",
	inputKind : "Input",
	bindTo : null
    },
    events : {
	// "onSelectItem" : "",
	"onEnter" : ""
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
	    this.$.textField.$.input.applyStyle("color",
		    this.sColorWithOutIndex);
	} else {
	    this.$.textField.$.input.applyStyle("color", this.sColorWithIndex);
	}
    },
    hintChanged : function(inOldValue) {
	this.$.textField.setHint(this.getHint());
    },
    create : function() {
	this.inherited(arguments);
	this.createComponent({
	    kind : enyo.HFlexBox,
	    name : "HFBoxContainer",
	    flex : 1,
	    components : [ {
		kind : this.inputKind,
		name : "textField",
		hint : "",
		flex : 1,
		oninput:"on_input" //TODO WORKING HERE
	    } ]
	});

	this.hintChanged();
	this.highLightedChanged();
	this.heightChanged();
	this.widthChanged();
    },
    lostFocus : function(inSender, inEvent) {
    },
    clear : function() {
	this.$.textField.setValue("");
	this.setHighLighted(false);
    },
    on_input : function(inSender, inEvent, keyPressed) {
	var x = keyPressed.charCodeAt(keyPressed.length-1);
	switch (true) {
	case (x == 8): // backspace
	case (x >= 46 && x <= 57): // numbers
	    return;
	}
	inSender.setValue(inSender.value.slice(0,-1));
    }
});
