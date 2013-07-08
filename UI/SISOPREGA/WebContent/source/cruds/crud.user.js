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
    getGroupsString : function(groupsArray){
	var sResult = "";
	for(var i=0; i<groupsArray.length; i++){
	    sResult += groupsArray[i] + ", ";
	}
	sResult = sResult.substring(0,sResult.length-2);
	return sResult;
    }
});
var crudUser = new crud.user();