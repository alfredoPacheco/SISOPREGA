enyo.kind({
	name : "hermana.gastos.concepto",
	kind : "Control",
	layoutKind : "VFlexLayout",
	iCreated : null,
	events : {
		"onAddCharge" : "",
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
			caption : "",
			components : [ {
				kind : "HFlexBox",
				components:[
					{kind : "Input",name : "charge_desc",hint : "Concept",flex:.7}, 
					]}
		]},
		{
			kind : "Drawer",
			name : "draAdd",
			components : [ {
				kind : "Button",
				name : "btnAdd",
				className : "enyo-button-affirmative",
				caption : "Create",
				onclick : "doAddCharge"
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
					caption : "Update",
					onclick : "updateRancher"
				}, {
					kind : "Button",
					name : "btnCancel",
					className : "enyo-button-negative",
					flex : 1,
					caption : "Cancel",
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
	getCharge:function(){
		return {charge_id:8,charge_desc:this.$.charge_desc.getValue()};
	}
});