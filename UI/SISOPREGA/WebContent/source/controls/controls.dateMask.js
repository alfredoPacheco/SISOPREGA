enyo.kind({
    name : "controls.dateMask",
    kind : "Control",
    flex : 1,
    layoutKind : enyo.HFlexLayout,
    sColorWithOutIndex : "teal",
    sColorWithIndex : "black",
    internalValue : null,
    published : {
	hint : "mes/dia/año",
	highLighted : false,
	width : null,
	height : null,
	inputKind : "Input",
	bindTo : null
    },
    events : {
	"onEnter" : ""
    },
    getDate : function() {
	return this.internalValue;
    },
    getValue : function() {
	return this.$.textField.getValue();
    },
    setValue : function(value) {
	this.internalValue = value;
	if (this.internalValue)
	    this.$.textField.setValue(utils.dateOut(this.internalValue));
    },
    setToday : function() {
	this.setValue(new Date());
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
    ready : function() {
	this.$.textField.$.input.applyStyle("text-align", "center");
    },
    applyMask : function(inSender) {
	var _id = inSender.$.input.getId();
	jQuery(function(j) {
	    j(document.getElementById(_id)).mask('99/99/9999');
	});
    }
});
