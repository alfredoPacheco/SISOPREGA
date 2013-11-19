enyo
	.kind({
	    name : "catalogs.seller.form",
	    kind : "forms.simple",
	    entityKind : crudSeller,
	    create : function() {
		this.inherited(arguments);

		this.$.mainScroller.createComponents([ {
		    kind : "RowGroup",
		    name : "rowGroup",
		    defaultKind : "HFlexBox",
		    caption : "",
		    components : [ {
			kind : "Input",
			name : "seller_name",
			hint : "Company Name",
			inputClassName : "blankInput",
			focusClassName : "darkFocus",
			bindTo : "sellerName"
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