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
		hint : "Nombre de Calidad",
		inputClassName : "blankInput",
		focusClassName : "darkFocus",
		bindTo : "qualityName"
	    }, {
		kind : enyo.Item,
		layoutKind : "HFlexLayout",
		components : [ {
		    content : "Peso Mínimo",
		    width:"110px",
		    style : "margin-right:5px;"
		}, {
		    kind : "controls.numberBox",
		    inputKind : "ToolInput",
		    name : "min_weight",
		    hint : "Peso Mínimo",
		    height : "35px;",
		    bindTo : "minWeight"
		}, ]
	    }, {
		kind : enyo.Item,
		layoutKind : "HFlexLayout",
		components : [ {
		    content : "Peso Máximo",
		    width:"110px",
		    style : "margin-right:5px;"
		}, {
		    kind : "controls.numberBox",
		    inputKind : "ToolInput",
		    name : "maxWeight",
		    hint : "Peso Máximo",
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
		    caption : "Equino"
		}, {
		    content : "Equino",
		    style : "margin-left:5px;"
		} ]
	    }, ]
	} ], {
	    owner : this
	});
    },

});