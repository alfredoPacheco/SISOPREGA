enyo.kind({
    name : "cache.receptions",
    kind : "crud.cache",
    entityName : "Reception",
    getCallBack : function(resultArray) {

	this.arrObj = [];
	for ( var i = 0; i < resultArray.records.length; i++) {
	    var objAux = resultArray.records[i];
	    var innerModelObj = this.adapterToIn(objAux);
	    if (innerModelObj != null)
		this.arrObj.push(innerModelObj);
	}
	
	
	
	

	if (this.callbackObject != null) {
	    var milis = ((Math.random() * 1000) + 500);
	    setTimeout(this.callbackObject[this.callbackMethod](resultArray),
		    milis);
	}
    },
    


});
var cacheReceptions = new cache.receptions();