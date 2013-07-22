enyo.kind(
  {
    name : "crud.inspectionForecast",
    kind : "crud",
    published: {
	entityName : "InspectionForecast"
    },
    adapterToIn : function(entityObj) {
	if (entityObj.forecastDate) {
	    entityObj.forecastDate = utils.dateIn(entityObj.forecastDate);
	}
	return this.inherited(arguments);
    },
    adapterToOut : function(entityObj) {
	entityObj.forecastDate = utils.dateOut(entityObj.forecastDate);
	return entityObj;
    },
    getByDate:function(date){
	var fmt = new enyo.g11n.DateFmt({
	    format : "yyyy/MM/dd",
	    locale : new enyo.g11n.Locale("es_es")
	});
	
	for(var i=0;i<this.arrObj.length;i++){
	    if (fmt.format(date) == fmt.format(this.arrObj[i].forecastDate)) {
		return this.arrObj[i];
	    }
	}
	return null;
    }
  });
var crudInspectionForecast = new crud.inspectionForecast();