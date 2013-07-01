enyo.kind({
    name : "cache.barnyards",
    kind : "crud.cache",
    entityName : "Barnyards",
    arrObjInUse : {},
    isOccupied : function(sID) {
	if (this.arrObjInUse[sID]) {
	    return true;
	} else {
	    return false;
	}
    },

});
var cacheBY = new cache.barnyards();