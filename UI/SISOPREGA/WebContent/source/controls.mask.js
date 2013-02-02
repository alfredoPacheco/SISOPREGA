enyo
		.kind({
			name : "controls.mask",
			kind : enyo.Control,
			hint : "",
//			layoutKind : enyo.HFlexLayout,
			published : {
				hint : "",
				mask : ""
			},
			getValue : function() {
				return this.$.textField.getValue();
			},
			hintChanged : function(inOldValue) {
				this.$.textField.setHint(this.getHint());
			},
			maskChanged : function(inOldValue) {
				// this.$.drop_down.setItems(this.getItems());
				// this.allItems = this.getItems();
			},
			create : function() {
				this.inherited(arguments);
				this.hintChanged();
				this.maskChanged();
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
