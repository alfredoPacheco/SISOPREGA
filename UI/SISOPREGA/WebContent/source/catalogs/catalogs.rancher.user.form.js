/**
 * Provides a handler for rancher data options.
 * 
 * Revision History: - 02/03/2013 By Diego Torres: Initial Version.
 * 
 */
enyo.kind({
    name : "catalogs.rancher.user.form",
    kind : "forms.simple",
    objRancher : null,
    entityKind : crudRancherUser,
    NO_CHANGED : '!$NoChanged$!',
    create : function() {
	this.inherited(arguments);
	this.$.mainScroller.createComponents([{
	    kind : "RowGroup",
    	    name : "rowGroup",
    	    defaultKind : "HFlexBox",
    	    caption : "",
    	    components : [ {
    		kind : "Input",
    		name : "user_name",
    		hint : "Usuario",
    		maxlength : "30",
    		bindTo : "user_name"
    	    }, {
    		kind : "PasswordInput",
    		name : "password",
    		hint : "Contraseña",
    		bindTo : "password"
    	    }, {
    		kind : "PasswordInput",
    		name : "confirm_password",
    		hint : "Confirmar",
    		bindTo : "password"
    	    } ]
	} ], {
	    owner : this
	});
    },
    addEntity : function(){
	cacheMan.showScrim();
	var obj = this.getEntity();
	if (this.beforeSave(obj)) {
	    delete obj[this.entityKind.entityIdName()]; // Delete id for create operation

	    this.entityKind.create(this.parentObject.rancherId, obj.user_name, obj.password, this, "afterAddEntity");
	} else {
	    cacheMan.hideScrim();
	    cacheMan.setMessage('', this.errorMessage);
	}
    },
    updateEntity : function(){
	cacheMan.showScrim();
	var updateObject = this.getEntity();
	if (this.beforeSave(updateObject)) {
	    this.entityKind.update(updateObject.user_name, updateObject.password, this, "afterUpdateEntity");
	} else {
	    cacheMan.hideScrim();
	    cacheMan.setMessage('', this.errorMessage);
	}
    },
    beforeSave : function(){
	if(this.$.password.value != this.$.confirm_password.value){
	    this.errorMessage = 'La contraseña y su confirmación no coinciden.';
	    return false;
	}
	return true;
    }
});
