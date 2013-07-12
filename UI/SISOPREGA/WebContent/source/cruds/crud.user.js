enyo.kind({
    name : "crud.user",
    kind : "crud",
    published : {
	entityName : "User",
	createKindName : "useradmin.user.form"
    },
    get : function(callbackObject, callbackMethod) {
	if (callbackObject) {
	    this.callbackObject = callbackObject;
	    this.callbackMethod = callbackMethod;
	} else {
	    this.callbackObject = null;
	    this.callbackMethod = '';
	}

	consumingGateway.ReadAllUsers(this, "getCallBack");

    },
    getCallBack : function(result) {
	this.arrObj = [];
	for ( var i = 0; i < result.length; i++) {
	    var objAux = result[i];
	    var innerModelObj = this.adapterToIn(objAux);
	    if (innerModelObj != null)
		this.arrObj.push(innerModelObj);
	}
	this.callbackObject[this.callbackMethod](result);
    },
    create : function(userObject, callbackObject, callbackMethod) {
	this.callbackObject = callbackObject;
	this.callbackMethod = callbackMethod;
	consumingGateway.AddUser(userObject, this, "saveCallBack");
    },
    NO_CHANGED : '!$NoChanged$!',
    updCallBacks : 0,
    update : function(userObject, callbackObject, callbackMethod) {
	this.callbackObject = callbackObject;
	this.callbackMethod = callbackMethod;

	this.updCallBacks = this.getCallBacksCounter(userObject);

	if (userObject.password != this.NO_CHANGED)
	    consumingGateway.ResetPassword(userObject.userName,
		    userObject.password, this, "updateCallBack");

	if (userObject.groupsToAdd.length > 0)
	    this.addGroups(userObject);

	if (userObject.groupsToRemove.length > 0)
	    this.removeGroups(userObject);

    },
    getCallBacksCounter : function(userObject) {
	var result = 0;
	if (userObject.password != this.NO_CHANGED)
	    result++;

	result += userObject.groupsToAdd.length;
	result += userObject.groupsToRemove.length;

	return result;
    },
    addGroups : function(userObject) {
	for ( var i = 0; i < userObject.groupsToAdd.length; i++) {
	    consumingGateway.AddGroup(userObject.userName,
		    userObject.groupsToAdd[i], this, "updateCallBack");
	}
    },
    removeGroups : function(userObject) {
	for ( var i = 0; i < userObject.groupsToRemove.length; i++) {
	    consumingGateway.RemoveGroup(userObject.userName,
		    userObject.groupsToRemove[i], this, "updateCallBack");
	}
    },
    receivedCallBacks : 0,
    updateCallBack : function() {
	this.receivedCallBacks++;
	if (this.receivedCallBacks >= this.updCallBacks) {
	    this.receivedCallBacks = 0;
	    this.updCallBacks = 0;
	    this.saveCallBack();
	}
    },
    getCatalogsList : function() {

	var arrAdapterList = enyo.clone(this.arrObj);
	var result = [];

	for ( var i = 0; i < arrAdapterList.length; i++) {
	    var obj = arrAdapterList[i];
	    obj.importantInfo = "" + arrAdapterList[i].userName;
	    obj.secundaryInfo = this.getGroupsString(arrAdapterList[i].groups);
	    result.push(obj);
	}
	return result;
    },
    getGroupsString : function(groupsArray) {
	var sResult = "";
	for ( var i = 0; i < groupsArray.length; i++) {
	    sResult += groupsArray[i] + ", ";
	}
	sResult = sResult.substring(0, sResult.length - 2);
	return sResult;
    }, remove : function(entity, callbackObject, callbackMethod) {
	var removableId = entity[this.entityIdName()];
	var filterDef = {
	    id : removableId
	};
	this.callbackObject = callbackObject;
	this.callbackMethod = callbackMethod;
	consumingGateway.Delete(this.entityName, filterDef, this,
		"saveCallBack");
    },
});
var crudUser = new crud.user();