/**
 * Provides a handler for rancher data options.
 * 
 * Revision History: - 02/03/2013 By Diego Torres: Initial Version.
 * 
 */
enyo.kind(
{
  name : "useradmin.user.form",
  kind : "forms.simple",
  entityKind : crudUser,
  NO_CHANGED : '!$NoChanged$!',
  create : function() {
	this.inherited(arguments);
	this.$.mainScroller.createComponents([
	{
	  kind : "RowGroup",
	  name : "rowGroup",
	  defaultKind : "HFlexBox",
	  caption : "",
	  components : [
	  {
		kind : "controls.bindedField",
		bindTo : "groups"
	  },
	  {
		kind : "Input",
		name : "user_name",
		hint : "Usuario",
		maxlength : "30",
		bindTo : "userName"
	  },
	  {
		kind : "PasswordInput",
		name : "password",
		hint : "Contraseña",
		bindTo : "password"
	  },
	  {
		kind : "PasswordInput",
		name : "confirm_password",
		hint : "Confirmar",
		bindTo : "password"
	  },
	  {
		layoutKind : enyo.HFlexLayout,
		align : "center",
		components : [
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
		components : [
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
		components : [
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
		components : [
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
		components : [
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
		components : [
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
	} ],
	{
	  owner : this
	});
  },
  resetValues : function() {
	this.inherited(arguments);

	// Remove groups selection
	this.$.isMexUser.setChecked(false);
	this.$.isUsaUser.setChecked(false);
	this.$.isAgency.setChecked(false);
	this.$.isDealer.setChecked(false);
	this.$.isAccountant.setChecked(false);
	this.$.isAdmin.setChecked(false);
  },
  setEntity : function(obj) {
	this.inherited(arguments);

	this.$.isMexUser.setChecked(obj.groups.indexOf('mex_user') > -1);
	this.$.isUsaUser.setChecked(obj.groups.indexOf('usa_user') > -1);
	this.$.isAgency.setChecked(obj.groups.indexOf('agency') > -1);
	this.$.isDealer.setChecked(obj.groups.indexOf('dealer') > -1);
	this.$.isAccountant.setChecked(obj.groups.indexOf('accountant') > -1);
	this.$.isAdmin.setChecked(obj.groups.indexOf('admin') > -1);

  },
  addEntity : function() {
	cacheMan.showScrim();
	var obj = this.getEntity();
	if (this.beforeSave(obj)) {
	  this.entityKind.create(obj, this, "afterAddEntity");
	} else {
	  cacheMan.hideScrim();
	  cacheMan.setMessage('', this.errorMessage);
	}
  },
  updateEntity : function() {
	cacheMan.showScrim();
	var updateObject = this.getEntity();
	if (this.beforeSave(updateObject)) {
	  this.entityKind.update(updateObject, this, "afterUpdateEntity");
	} else {
	  cacheMan.hideScrim();
	  cacheMan.setMessage('', this.errorMessage);
	}
  },
  beforeSave : function(obj) {

	if (this.$.password.value == "") {
	  this.errorMessage = 'Debe proveer una contraseña.';
	  return false;
	}

	if (this.$.password.value != this.$.confirm_password.value) {
	  this.errorMessage = 'La contraseña y su confirmación no coinciden.';
	  return false;
	}

	obj.groupsToAdd = [];
	obj.groupsToRemove = [];
	if (this.$.isMexUser.getChecked()) {
	  if (obj.groups.indexOf('mex_user') == -1)
		obj.groupsToAdd.push('mex_user');
	} else {
	  if (obj.groups.indexOf('mex_user') > -1)
		obj.groupsToRemove.push('mex_user');
	}

	if (this.$.isUsaUser.getChecked()) {
	  if (obj.groups.indexOf('usa_user') == -1)
		obj.groupsToAdd.push('usa_user');
	} else {
	  if (obj.groups.indexOf('usa_user') > -1)
		obj.groupsToRemove.push('usa_user');
	}

	if (this.$.isAgency.getChecked()) {
	  if (obj.groups.indexOf('agency') == -1)
		obj.groupsToAdd.push('agency');
	} else {
	  if (obj.groups.indexOf('agency') > -1)
		obj.groupsToRemove.push('agency');
	}

	if (this.$.isDealer.getChecked()) {
	  if (obj.groups.indexOf('dealer') == -1)
		obj.groupsToAdd.push('dealer');
	} else {
	  if (obj.groups.indexOf('dealer') > -1)
		obj.groupsToRemove.push('dealer');
	}

	if (this.$.isAccountant.getChecked()) {
	  if (obj.groups.indexOf('accountant') == -1)
		obj.groupsToAdd.push('accountant');
	} else {
	  if (obj.groups.indexOf('accountant') > -1)
		obj.groupsToRemove.push('accountant');
	}

	if (this.$.isAdmin.getChecked()) {
	  if (obj.groups.indexOf('admin') == -1)
		obj.groupsToAdd.push('admin');
	} else {
	  if (obj.groups.indexOf('admin') > -1)
		obj.groupsToRemove.push('admin');
	}

	return true;
  }
});
