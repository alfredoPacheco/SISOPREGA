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
  });
var crudInspectionForecast = new crud.inspectionForecast();