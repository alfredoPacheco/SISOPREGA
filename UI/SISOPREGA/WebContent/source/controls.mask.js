enyo
		.kind({
			name : "controls.mask",
			kind : enyo.Control,
//			layoutKind : enyo.HFlexLayout,
			published : {
				hint : "",
				mask : "",
				value : ""
			},
			getValue : function() {
				return this.$.textField.getValue();
			},
			setValue : function(value){
				this.$.textField.setValue(value);
			},
			hintChanged : function(inOldValue) {
				this.$.textField.setHint(this.getHint());
			},
			maskChanged : function(inOldValue) {
				// this.$.drop_down.setItems(this.getItems());
				// this.allItems = this.getItems();
			},
			valueChanged : function(inOldValue) {
				this.$.textField.setValue(this.$.textField.getValue());
			},
			create : function() {
				this.inherited(arguments);
				this.hintChanged();
				this.maskChanged();
				this.valueChanged();
			},
			components : [ {
				kind : "Input",
				name : "textField",
				hint : "",
				onfocus:"listo"
			} ],			
			listo : function() {				
				var _id = this.$.textField.$.input.getId(); 
				jQuery(function(j) {
					j(document.getElementById(_id)).mask('(999) 999-9999');
				});
			}			
		});
