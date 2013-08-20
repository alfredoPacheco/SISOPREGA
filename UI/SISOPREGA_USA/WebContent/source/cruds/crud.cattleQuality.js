/**
 * Provides a handler for rancher data options.
 * 
 * Revision History: 
 * - [DATE] By Alan del Rio: Initial Version. 
 * - [DATE] By Alfredo Pacheco: Integrate with web services. 
 * - 02/03/2013 By Diego Torres: Add rancher user handlers.
 * - 05/27/2013 By Diego Torres: Adapt to crud.cache.
 * 
 */
enyo.kind(
  {
    name : "crud.cattleQuality",
    kind : "crud",
    published : {
	entityName : "CattleQuality",
	createKindName : "catalogs.cattleQuality.form",
    },
    adapterToList : function(entityObj) {
	var listObj = {
	    value : 0,
	    caption : ""
	};
	
	listObj.value = Number(entityObj.qualityId);
	listObj.caption = entityObj.qualityName;

	return listObj;
    },
    getCatalogsList : function() {

	var arrAdapterList = enyo.clone(this.arrObj);
	var result = [];

	for ( var i = 0; i < arrAdapterList.length; i++) {
	    var obj = arrAdapterList[i];
	    obj.importantInfo = "" + arrAdapterList[i].qualityName;
	    obj.secundaryInfo = "" + arrAdapterList[i].forHorses;
	    result.push(obj);
	}
	return result;
    },
    getByID : function(iID) {
	for ( var i = 0; i < this.arrObj.length; i++) {
	    if (Number(this.arrObj[i]["qualityId"]) == Number(iID)) {
		return this.arrObj[i];
	    }
	}
	return null;
    },
  });
var crudCattleQuality = new crud.cattleQuality();