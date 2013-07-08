/**
 * Provides a handler for rancher data options.
 * 
 * Revision History: - 02/03/2013 By Diego Torres: Initial Version.
 * 
 */
enyo.kind({
    name : "useradmin.user.form",
    kind : "forms.simple",
    objRancher : null,
    entityKind : crudUser,
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
    	    },{
                layoutKind : enyo.HFlexLayout,
                align : "center",
                components :
                  [
                    {
                      content : "Mex User",
                      className : "enyo-label",
                      flex : 1
                    },
                    {
                      kind : "CheckBox",
                      name : "isMexUser"
                    } ]
              },
              {
                layoutKind : enyo.HFlexLayout,
                align : "center",
                components :
                  [
                    {
                      content : "USA User",
                      className : "enyo-label",
                      flex : 1
                    },
                    {
                      kind : "CheckBox",
                      name : "isUsaUser"
                    } ]
              },
              {
                layoutKind : enyo.HFlexLayout,
                align : "center",
                components :
                  [
                    {
                      content : "Agency",
                      className : "enyo-label",
                      flex : 1
                    },
                    {
                      kind : "CheckBox",
                      name : "isAgency"
                    } ]
              },
              {
                layoutKind : enyo.HFlexLayout,
                align : "center",
                components :
                  [
                    {
                      content : "Dealer",
                      className : "enyo-label",
                      flex : 1
                    },
                    {
                      kind : "CheckBox",
                      name : "isDealer"
                    } ]
              },
              {
                layoutKind : enyo.HFlexLayout,
                align : "center",
                components :
                  [
                    {
                      content : "Accountant",
                      className : "enyo-label",
                      flex : 1
                    },
                    {
                      kind : "CheckBox",
                      name : "isAccountant"
                    } ]
              },
              {
                layoutKind : enyo.HFlexLayout,
                align : "center",
                components :
                  [
                    {
                      content : "Admin",
                      className : "enyo-label",
                      flex : 1
                    },
                    {
                      kind : "CheckBox",
                      name : "isAdmin"
                    } ]
              } ]
	} ], {
	    owner : this
	});
    },
    addEntity : function(){
	cacheMan.showScrim();
	var obj = this.getEntity();
	if (this.beforeSave(obj)) {
	    this.entityKind.create(obj, this, "afterAddEntity");
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
