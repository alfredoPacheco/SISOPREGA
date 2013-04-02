enyo.kind({
	name : "hermana.gastos.concepto",
	kind : "Control",
	layoutKind : "VFlexLayout",
	iCreated : null,
	events : {
		"onAddRancher" : "",
		"onUpdateRancher" : "",
		"onCancel" : ""
	},
	objRan : {},
	components : [ {
		kind : enyo.Scroller,
		flex : 1,
		className : "formBG",
		components : [ {
			kind : "RowGroup",
			defaultKind : "HFlexBox",
			caption : "",
			components : [ {
				kind : "Input",
				name : "charge_desc",
				hint : "Concepto",
				inputClassName : "blankInput",
				focusClassName : "darkFocus"
			}, {
				kind : "Input",
				name : "charge_price",
				hint : "Costo",
				inputClassName : "blankInput",
				focusClassName : "darkFocus"
			}
		]},
		{
			kind : "Drawer",
			name : "draAdd",
			components : [ {
				kind : "Button",
				name : "btnAdd",
				className : "enyo-button-affirmative",
				caption : "Crear",
				onclick : "addRancher"
			}, ]
		}, {
			kind : "Drawer",
			name : "draUpdate",
			components : [ {
				layoutKind : "HFlexLayout",
				align : "center",
				components : [ {
					kind : "Button",
					name : "btnUpdate",
					className : "enyo-button-affirmative",
					flex : 1,
					caption : "Actualizar",
					onclick : "updateRancher"
				}, {
					kind : "Button",
					name : "btnCancel",
					className : "enyo-button-negative",
					flex : 1,
					caption : "Cancelar",
					onclick : "doCancel"
				} ]
			} ]
		} ]
	}],
	ready : function() {
		this.$.draAdd.setOpen(true);
		this.$.draUpdate.setOpen(false);
	},
	toggleUpdate : function() {
		this.$.draAdd.setOpen(false);
		this.$.draUpdate.setOpen(true);
	},
	toggleAdd : function() {
		this.$.draAdd.setOpen(true);
		this.$.draUpdate.setOpen(false);
		this.resetValues();
	},
});