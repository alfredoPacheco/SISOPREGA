enyo.kind({
    name : "catalogs.quality.form",
    kind : "forms.simple",
    entityKind : crudCattleQuality,
    create : function() {
	this.inherited(arguments);

	this.$.mainScroller.createComponents([ {
	    kind : "RowGroup",
	    name : "rowGroup",
	    defaultKind : "HFlexBox",
	    caption : "",
	    components : [ {
		kind : "Input",
		name : "quality_name",
		hint : "Cattle Class Name",
		inputClassName : "blankInput",
		focusClassName : "darkFocus",
		bindTo : "qualityName"
	    }, {
		kind : enyo.Item,
		layoutKind : "HFlexLayout",
		components : [ {
		    content : "Min Weight",
		    width:"110px",
		    style : "margin-right:5px;"
		}, {
		    kind : "controls.numberBox",
		    inputKind : "ToolInput",
		    name : "min_weight",
		    hint : "Min Weight",
		    height : "35px;",
		    bindTo : "minWeight"
		}, ]
	    }, {
		kind : enyo.Item,
		layoutKind : "HFlexLayout",
		components : [ {
		    content : "Max Weight",
		    width:"110px",
		    style : "margin-right:5px;"
		}, {
		    kind : "controls.numberBox",
		    inputKind : "ToolInput",
		    name : "maxWeight",
		    hint : "Max Weight",
		    height : "35px;",
		    bindTo : "maxWeight"
		}, ]
	    }, {
		kind : enyo.Item,
		layoutKind : "HFlexLayout",
		components : [ {
		    kind : enyo.CheckBox,
		    name : "for_horses",
		    bindTo : "forHorses",
		    caption : "Equine"
		}, {
		    content : "Equine",
		    style : "margin-left:5px;"
		} ]
	    }, ]
	} ], {
	    owner : this
	});
    },

});