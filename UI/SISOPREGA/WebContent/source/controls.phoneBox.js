enyo.kind({
    name : "controls.phoneBox",
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
		// onblur : "lostFocus",
		// onchange : "on_change",
		style:"border-width: 0px;",
		flex : 1,
		inputClassName : "blankInput",
		focusClassName : "darkFocus",
		onfocus : "applyMask"
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
    applyMask : function(inSender) {
	var _id = inSender.$.input.getId();
	jQuery(function(j) {
	    j(document.getElementById(_id)).mask('(999) 999-9999');
	});
    }
});
