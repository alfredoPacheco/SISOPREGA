enyo
	.kind({
	    name : "catalogs.consignee.form",
	    kind : "forms.simple",
	    entityKind : crudConsignee,
	    create : function() {
		this.inherited(arguments);

		this.$.mainScroller.createComponents([ {
		    kind : "RowGroup",
		    name : "rowGroup",
		    defaultKind : "HFlexBox",
		    caption : "",
		    components : [ {
			kind : "Input",
			name : "consignee_name",
			hint : "Consignee Name",
			inputClassName : "blankInput",
			focusClassName : "darkFocus",
			bindTo : "consigneeName"
		    }, {
			kind : "Input",
			name : "address_one",
			hint : "Address One",
			inputClassName : "blankInput",
			focusClassName : "darkFocus",
			bindTo : "addressOne"
		    }, {
			kind : "Input",
			name : "address_two",
			hint : "Address Two",
			inputClassName : "blankInput",
			focusClassName : "darkFocus",
			bindTo : "addressTwo"
		    }, {
			kind : "Input",
			name : "city",
			hint : "City",
			inputClassName : "blankInput",
			focusClassName : "darkFocus",
			bindTo : "city"
		    }, {
			kind : "Input",
			name : "state",
			hint : "State",
			inputClassName : "blankInput",
			focusClassName : "darkFocus",
			bindTo : "addressState"
		    }, {
			kind : "Input",
			name : "zip_code",
			hint : "Zip Code",
			inputClassName : "blankInput",
			focusClassName : "darkFocus",
			bindTo : "zipCode"
		    }, {
			kind : "controls.phoneBox",
			name : "phone_number",
			hint : "Telephone",
			bindTo : "phone"
		    }, {
			kind : "Input",
			name : "email_add",
			hint : "Email",
			inputType : "email",
			inputClassName : "blankInput",
			focusClassName : "darkFocus",
			bindTo : "email"
		    } ]
		} ], {
		    owner : this
		});
		this.$.btnAdd.caption = "Add";
		this.$.btnCancelCreate.caption = "Cancel";
	    },
	    beforeSave : function(obj) {
		var email = this.$.email_add.getValue();
		if (email != '' && !/\S+@\S+\.\S+/.test(email)) {
		    this.errorMessage = "Unknown email format (email@server.ext).";
		    return false;
		}
		return true;
	    }
	});