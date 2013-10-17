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
	createKindName : "catalogs.quality.form",
    },
    adapterToList : function(entityObj) {
	var listObj = {
	    value : 0,
	    caption : ""
	};
	
	listObj.value = Number(entityObj.cattleQualityId);
	listObj.caption = entityObj.qualityName;

	return listObj;
    },
    getCatalogsList : function() {

	var arrAdapterList = enyo.clone(this.arrObj);
	var result = [];

	for ( var i = 0; i < arrAdapterList.length; i++) {
	    var obj = arrAdapterList[i];
	    obj.importantInfo = "" + arrAdapterList[i].qualityName;
	    obj.secundaryInfo = (String(arrAdapterList[i].forHorses) == "true" ? "Equino":"");
	    result.push(obj);
	}
	return result;
    },
    getByID : function(iID) {
	for ( var i = 0; i < this.arrObj.length; i++) {
	    if (Number(this.arrObj[i]["cattleQualityId"]) == Number(iID)) {
		return this.arrObj[i];
	    }
	}
	return null;
    },
    getFilteredList : function(cattleClass){
      var arrList = [];
      for(var i=0; i < this.arrObj.length; i++){
        var listObject = this.adapterToList(this.arrObj[i]);
        if(cattleClass == 3){
          if(this.arrObj[i].forHorses)
            arrList.push(listObject);
        } else {
          arrList.push(listObject);
        }
      }
      
      return arrList;
      
    }
  });
var crudCattleQuality = new crud.cattleQuality();